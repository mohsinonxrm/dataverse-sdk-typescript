import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { ConcurrencyOptions, DataverseClientOptions } from "../abstractions/options.js";
import { DataverseInvalidRequestError } from "../errors/NamedErrors.js";
import { abortError } from "../utils/signals.js";

class Semaphore {
  private queue: Array<() => void> = [];
  private used = 0;

  constructor(private max: number) {}

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
  private min: number;
  private max: number;

  constructor(private options: DataverseClientOptions) {
    const { start, min, max } = resolveConcurrency(options.concurrency);
    this.min = min;
    this.max = max;
    this.adaptive = options.concurrency?.adaptiveFromDopHint ?? true;
    this.sem = new Semaphore(start);
  }

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const perRequest = ctx.middlewareOptions?.get("concurrency");
    if (perRequest?.bypass) return next(request, ctx);
    const release = await this.sem.acquire(request.signal);
    try {
      const res = await next(request, ctx);
      if (this.adaptive) {
        const hint = res.headers.get("x-ms-dop-hint");
        if (hint) {
          const n = Number(hint);
          if (Number.isFinite(n) && n > 0) {
            this.sem.setMax(clamp(n, this.min, this.max));
          }
        }
      }
      return res;
    } finally {
      release();
    }
  }
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.floor(n)));
}
