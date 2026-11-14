import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { ConcurrencyOptions, DataverseClientOptions } from "../abstractions/options.js";
import { DataverseInvalidRequestError } from "../errors/NamedErrors.js";
import { abortError } from "../utils/signals.js";
import { TelemetryEvents } from "../telemetry/events.js";
import { redactRequestUrl } from "../utils/redact.js";
import { requestTelemetry, type SafeTelemetry } from "../utils/telemetry.js";
import { DataverseQueueFullError } from "../errors/DataverseQueueFullError.js";
import { parseRetryAfter } from "../utils/HeaderUtils.js";
import { CONCURRENT_REQUESTS_CODE, throttleErrorCode } from "../utils/serviceProtection.js";

class Semaphore {
  private queue: Array<() => void> = [];
  private used = 0;

  constructor(private max: number) {}

  /** The limit now in effect. */
  get limit(): number {
    return this.max;
  }

  /** Requests waiting for a slot. */
  get waiting(): number {
    return this.queue.length;
  }

  /** Requests holding a slot. */
  get inFlight(): number {
    return this.used;
  }

  /** Whether `acquire()` would have to wait now. */
  get full(): boolean {
    return this.used >= this.max;
  }

  setMax(max: number) {
    this.max = max;
    this.drain();
  }

  /**
   * Wait for a slot. Rejects, and leaves the queue, if `signal` aborts: with its `TimeoutError`
   * when it timed out, otherwise with an `AbortError`.
   */
  async acquire(signal?: AbortSignal): Promise<() => void> {
    if (signal?.aborted) throw abortError(signal);
    if (this.used < this.max) {
      this.used++;
      return () => {
        this.release();
      };
    }
    return new Promise((resolve, reject) => {
      const onAbort = () => {
        this.queue = this.queue.filter((w) => w !== waiter);
        reject(abortError(signal));
      };
      const waiter = () => {
        signal?.removeEventListener("abort", onAbort);
        this.used++;
        resolve(() => {
          this.release();
        });
      };
      signal?.addEventListener("abort", onAbort, { once: true });
      this.queue.push(waiter);
    });
  }

  private release() {
    this.used--;
    this.drain();
  }

  private drain() {
    while (this.used < this.max && this.queue.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const next = this.queue.shift()!;
      next();
    }
  }
}

const DEFAULT_START = 8;
const DEFAULT_MIN = 2;
const DEFAULT_MAX = 16;

/** The limits a client's concurrency settings resolve to (see `ConcurrencyOptions`). */
export interface ResolvedConcurrency {
  start: number;
  min: number;
  max: number;
}

/**
 * Resolve `ConcurrencyOptions`: an explicit `maxConcurrentRequests` is used exactly and caps the
 * DOP hint unless `max` is set (#356). Throws `DataverseInvalidRequestError` for values that
 * aren't positive integers or don't fit `min <= maxConcurrentRequests <= max`.
 */
export function resolveConcurrency(options: ConcurrencyOptions = {}): ResolvedConcurrency {
  for (const name of ["maxConcurrentRequests", "min", "max"] as const) {
    const value = options[name];
    if (value !== undefined && !(Number.isInteger(value) && value >= 1)) {
      throw DataverseInvalidRequestError.invalidParameter(
        `concurrency.${name}`,
        `must be a whole number of at least 1 (got ${String(value)})`
      );
    }
  }
  const max = options.max ?? options.maxConcurrentRequests ?? DEFAULT_MAX;
  const start = options.maxConcurrentRequests ?? Math.min(DEFAULT_START, max);
  const min = options.min ?? Math.min(DEFAULT_MIN, start);
  if (!(min <= start && start <= max)) {
    throw DataverseInvalidRequestError.invalidParameter(
      "concurrency",
      `needs min <= maxConcurrentRequests <= max (got min ${String(min)}, maxConcurrentRequests ${String(start)}, max ${String(max)})`
    );
  }
  return { start, min, max };
}

export class ConcurrencyMiddleware implements Middleware {
  name = "ConcurrencyMiddleware";
  private sem: Semaphore;
  private adaptive: boolean;
  private reduceOnThrottle: boolean;
  private maxQueue: number;
  private min: number;
  private max: number;
  /** The limit without throttle reductions: the start, then what the DOP hint sets. */
  private target: number;
  /** After a reduction, the limit isn't raised again before this time (ms since the epoch). */
  private holdUntil = 0;
  /** Counts reductions; a 429 lowers the limit only if its request started after the last one. */
  private generation = 0;

  constructor(private options: DataverseClientOptions) {
    const { start, min, max } = resolveConcurrency(options.concurrency);
    this.min = min;
    this.max = max;
    this.target = start;
    this.adaptive = options.concurrency?.adaptiveFromDopHint ?? true;
    this.reduceOnThrottle = options.concurrency?.reduceOnThrottle ?? true;
    this.maxQueue = resolveMaxQueue(options.concurrency?.maxQueue);
    this.sem = new Semaphore(start);
  }

  /** The concurrency limit now in effect. */
  get limit(): number {
    return this.sem.limit;
  }

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const perRequest = ctx.middlewareOptions?.get("concurrency");
    if (perRequest?.bypass) return next(request, ctx);
    const telemetry = requestTelemetry(this.options, ctx);
    if (this.sem.full && this.sem.waiting >= this.maxQueue) {
      throw new DataverseQueueFullError(
        `Concurrency queue is full: ${String(this.sem.inFlight)} in flight (limit ${String(this.sem.limit)}) and ${String(this.sem.waiting)} waiting (maxQueue ${String(this.maxQueue)})`,
        "concurrency",
        {
          maxQueue: this.maxQueue,
          queued: this.sem.waiting,
          inFlight: this.sem.inFlight,
          limit: this.sem.limit,
        }
      );
    }
    const queued = this.sem.full ? this.sem.waiting + 1 : 0;
    const waitStart = Date.now();
    const release = await this.sem.acquire(request.signal);
    const generation = this.generation;
    if (telemetry && queued > 0) {
      telemetry.trackEvent(
        TelemetryEvents.concurrencyWait,
        {
          "correlation.id": ctx.correlationId ?? "",
          "request.method": request.method,
          "request.url": redactRequestUrl(request, this.options.redactUrl),
        },
        {
          wait_ms: Date.now() - waitStart,
          "concurrency.limit": this.sem.limit,
          "concurrency.queued": queued,
        }
      );
    }
    try {
      const res = await next(request, ctx);
      await this.adapt(res, generation, ctx, telemetry);
      return res;
    } finally {
      release();
    }
  }

  /** Follow the response: halve on the concurrent-requests 429, otherwise the DOP hint. */
  private async adapt(
    res: Response,
    generation: number,
    ctx: MiddlewareContext,
    telemetry: SafeTelemetry | undefined
  ): Promise<void> {
    const hint = this.adaptive ? dopHint(res) : undefined;
    if (hint !== undefined) this.target = clamp(hint, this.min, this.max);
    const previous = this.sem.limit;

    if (
      this.reduceOnThrottle &&
      res.status === 429 &&
      (await throttleErrorCode(res)) === CONCURRENT_REQUESTS_CODE
    ) {
      // A request sent before the last reduction says nothing about the lowered limit: one burst
      // of these 429s halves the limit once, not once per request.
      if (generation !== this.generation) return;
      this.generation++;
      const retryAfterMs = parseRetryAfter(res.headers.get("retry-after")) ?? 0;
      this.holdUntil = Math.max(this.holdUntil, Date.now() + retryAfterMs);
      const limit = Math.max(this.min, Math.floor(this.sem.limit / 2));
      if (limit !== this.sem.limit) this.change(limit, "throttle", ctx, telemetry, hint);
      return;
    }

    let limit = previous;
    if (previous > this.target) {
      // The hint went down: lower at once, even while a reduction holds.
      limit = this.target;
    } else if (previous < this.target && Date.now() >= this.holdUntil) {
      // Back up after a reduction: to the hint when the response has one, otherwise (browsers
      // can't read the header; adaptiveFromDopHint: false ignores it) one step per success.
      if (hint !== undefined) limit = this.target;
      else if (res.status < 400) limit = previous + 1;
    }
    if (limit !== previous) {
      this.change(limit, hint !== undefined ? "dop_hint" : "recovery", ctx, telemetry, hint);
    }
  }

  private change(
    limit: number,
    reason: "dop_hint" | "throttle" | "recovery",
    ctx: MiddlewareContext,
    telemetry: SafeTelemetry | undefined,
    hint?: number
  ): void {
    const previous = this.sem.limit;
    this.sem.setMax(limit);
    ctx.logger?.debug("Concurrency limit changed", { limit, previous, reason });
    telemetry?.trackEvent(
      TelemetryEvents.concurrencyLimit,
      { "correlation.id": ctx.correlationId ?? "", "concurrency.reason": reason },
      {
        "concurrency.limit": limit,
        "concurrency.previous_limit": previous,
        ...(hint !== undefined ? { dop_hint: hint } : {}),
      }
    );
  }
}

/** The `x-ms-dop-hint` header as a positive number, when the response has a valid one. */
function dopHint(res: Response): number | undefined {
  const value = res.headers.get("x-ms-dop-hint");
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

function resolveMaxQueue(value: number | undefined): number {
  if (value === undefined) return Infinity;
  if (!(value === Infinity || (Number.isInteger(value) && value >= 0))) {
    throw DataverseInvalidRequestError.invalidParameter(
      "concurrency.maxQueue",
      `must be a whole number of at least 0, or Infinity (got ${String(value)})`
    );
  }
  return value;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.floor(n)));
}
