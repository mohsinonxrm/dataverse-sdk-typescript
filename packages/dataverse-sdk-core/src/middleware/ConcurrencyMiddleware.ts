import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";

class Semaphore {
  private queue: Array<() => void> = [];
  private used = 0;

  constructor(private max: number) {}

  setMax(max: number) {
    this.max = max;
    this.drain();
  }

  async acquire(): Promise<() => void> {
    if (this.used < this.max) {
      this.used++;
      return () => {
        this.release();
      };
    }
    return new Promise((resolve) => {
      this.queue.push(() => {
        this.used++;
        resolve(() => {
          this.release();
        });
      });
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

const DEFAULT_MAX_NODE = 8;

export class ConcurrencyMiddleware implements Middleware {
  name = "ConcurrencyMiddleware";
  private sem: Semaphore;
  private adaptive: boolean;
  private min: number;
  private max: number;

  constructor(private options: DataverseClientOptions) {
    const configured = options.concurrency?.maxConcurrentRequests;
    const initial = configured ?? DEFAULT_MAX_NODE;
    this.min = options.concurrency?.min ?? 2;
    this.max = options.concurrency?.max ?? 16;
    this.adaptive = options.concurrency?.adaptiveFromDopHint ?? true;
    this.sem = new Semaphore(clamp(initial, this.min, this.max));
  }

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const perRequest = ctx.middlewareOptions?.get("concurrency");
    if (perRequest?.bypass) return next(request, ctx);
    const release = await this.sem.acquire();
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
