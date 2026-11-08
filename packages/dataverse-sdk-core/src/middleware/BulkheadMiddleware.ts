import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { MiddlewareOptions } from "./RequestOptions.js";
import { DataverseBulkheadRejectedError } from "../errors/DataverseResilienceErrors.js";
import { DataverseInvalidRequestError } from "../errors/NamedErrors.js";
import { abortError } from "../utils/signals.js";

/** Settings of `BulkheadMiddleware`. Set `limits`, `defaultLimit`, or both. */
export interface BulkheadOptions {
  /** Most requests in flight at once per category, e.g. `{ read: 8, write: 2 }`. */
  limits?: Record<string, number>;
  /** Most requests in flight for a category that isn't in `limits`. @default no limit */
  defaultLimit?: number;
  /**
   * The category of a request; `undefined` leaves the request unlimited.
   * @default `"read"` for GET and HEAD, `"write"` for everything else (a `$batch` POST included)
   */
  categorize?: (request: RequestInformation) => string | undefined;
  /**
   * Most requests waiting per category. A request beyond it is refused at once with
   * `DataverseBulkheadRejectedError`. `0` refuses every request over the limit instead of queueing it.
   * @default Infinity
   */
  maxQueue?: number;
}

/**
 * Per-request settings of `BulkheadMiddleware`:
 * `new MiddlewareRequestOptions([{ type: "bulkhead", category: "import" }])`.
 */
export interface BulkheadRequestOptions extends MiddlewareOptions {
  /** Count this request in this category instead of the one `categorize` gives. */
  category?: string;
  /** Send this request without a bulkhead slot. */
  bypass?: boolean;
}

function defaultCategorize(request: RequestInformation): string {
  const method = request.method.toUpperCase();
  return method === "GET" || method === "HEAD" ? "read" : "write";
}

/** One category: a slot count and the requests waiting for a slot, oldest first. */
class Compartment {
  inFlight = 0;
  readonly queue: Array<() => void> = [];
  constructor(readonly limit: number) {}
}

/**
 * A bulkhead: limits how many requests of each category are in flight at once, on top of the
 * client's overall concurrency limit, so one kind of work can't take every slot. For example,
 * separate limits for reads and writes keep a bulk import from starving the reads an app's UI
 * needs; a `categorize` function can instead limit each entity set. Requests over a category's
 * limit wait for a slot (cancelled with their `signal`), up to `maxQueue` waiting.
 *
 * Opt-in: it isn't part of the default pipeline. Add it with `middleware.prepend`, so a request
 * keeps its slot across its retries and the limit counts requests rather than attempts. With
 * `middleware.append` it counts attempts instead, like the concurrency limit.
 *
 * @example
 * ```typescript
 * const client = new DataverseClient({
 *   baseUrl,
 *   tokenProvider,
 *   middleware: { prepend: [new BulkheadMiddleware({ limits: { read: 8, write: 2 } })] },
 * });
 *
 * // A limit per entity set: at most 2 requests at once for each.
 * new BulkheadMiddleware({
 *   defaultLimit: 2,
 *   categorize: (request) => new URL(request.url).pathname.split("/").pop()?.split("(")[0],
 * });
 * ```
 */
export class BulkheadMiddleware implements Middleware {
  name = "BulkheadMiddleware";
  private readonly compartments = new Map<string, Compartment>();
  private readonly categorize: (request: RequestInformation) => string | undefined;
  private readonly maxQueue: number;

  constructor(private readonly options: BulkheadOptions) {
    if (options.limits === undefined && options.defaultLimit === undefined) {
      throw DataverseInvalidRequestError.missingParameter(
        "bulkhead.limits or bulkhead.defaultLimit"
      );
    }
    for (const [category, limit] of Object.entries(options.limits ?? {})) {
      checkLimit(`bulkhead.limits.${category}`, limit);
    }
    if (options.defaultLimit !== undefined)
      checkLimit("bulkhead.defaultLimit", options.defaultLimit);
    this.maxQueue = options.maxQueue ?? Infinity;
    if (!(this.maxQueue === Infinity || (Number.isInteger(this.maxQueue) && this.maxQueue >= 0))) {
      throw DataverseInvalidRequestError.invalidParameter(
        "bulkhead.maxQueue",
        `must be a whole number of at least 0, or Infinity (got ${String(this.maxQueue)})`
      );
    }
    this.categorize = options.categorize ?? defaultCategorize;
  }

  /** Requests of `category` in flight now. */
  inFlight(category: string): number {
    return this.compartments.get(category)?.inFlight ?? 0;
  }

  /** Requests of `category` waiting for a slot now. */
  queued(category: string): number {
    return this.compartments.get(category)?.queue.length ?? 0;
  }

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const perRequest: BulkheadRequestOptions | undefined = ctx.middlewareOptions?.get("bulkhead");
    if (perRequest?.bypass) return next(request, ctx);
    const category = perRequest?.category ?? this.categorize(request);
    const compartment = category === undefined ? undefined : this.compartment(category);
    if (category === undefined || !compartment) return next(request, ctx);

    await this.acquire(compartment, category, request.signal);
    try {
      return await next(request, ctx);
    } finally {
      compartment.inFlight--;
      compartment.queue.shift()?.();
    }
  }

  /** The category's compartment, or `undefined` when the category has no limit. */
  private compartment(category: string): Compartment | undefined {
    let compartment = this.compartments.get(category);
    if (!compartment) {
      const limit = Object.hasOwn(this.options.limits ?? {}, category)
        ? this.options.limits?.[category]
        : this.options.defaultLimit;
      if (limit === undefined) return undefined;
      compartment = new Compartment(limit);
      this.compartments.set(category, compartment);
    }
    return compartment;
  }

  /** Take a slot, waiting for one if needed; rejects when the queue is full or `signal` aborts. */
  private acquire(
    compartment: Compartment,
    category: string,
    signal: AbortSignal | undefined
  ): Promise<void> {
    if (signal?.aborted) return Promise.reject(abortError(signal));
    if (compartment.inFlight < compartment.limit) {
      compartment.inFlight++;
      return Promise.resolve();
    }
    if (compartment.queue.length >= this.maxQueue) {
      return Promise.reject(
        new DataverseBulkheadRejectedError(
          `Bulkhead "${category}" is full: ${String(compartment.inFlight)} in flight and ${String(compartment.queue.length)} waiting`,
          category
        )
      );
    }
    return new Promise((resolve, reject) => {
      const onAbort = () => {
        const i = compartment.queue.indexOf(waiter);
        if (i >= 0) compartment.queue.splice(i, 1);
        reject(abortError(signal));
      };
      // Called by a finishing request, after it gave its slot back.
      const waiter = () => {
        signal?.removeEventListener("abort", onAbort);
        compartment.inFlight++;
        resolve();
      };
      signal?.addEventListener("abort", onAbort, { once: true });
      compartment.queue.push(waiter);
    });
  }
}

function checkLimit(name: string, limit: number): void {
  if (!(Number.isInteger(limit) && limit >= 1)) {
    throw DataverseInvalidRequestError.invalidParameter(
      name,
      `must be a whole number of at least 1 (got ${String(limit)})`
    );
  }
}
