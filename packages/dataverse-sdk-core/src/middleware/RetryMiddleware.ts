import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";
import type { RetryOptions } from "./RequestOptions.js";
import { withJitter } from "../utils/jitter.js";
import { sleep } from "../utils/sleep.js";
import { parseRetryAfter, isStreamContent } from "../utils/HeaderUtils.js";

const DEFAULTS = {
  maxRetries: 6,
  baseDelayMs: 3000,
  maxDelayMs: 30000,
  jitter: true,
};

export class RetryMiddleware implements Middleware {
  name = "RetryMiddleware";

  constructor(private options: DataverseClientOptions) {}

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    // Check for per-request retry options override
    const perRequestOptions = ctx.middlewareOptions?.get("retry") as RetryOptions | undefined;
    const opt = {
      ...DEFAULTS,
      ...this.options.retry,
      ...perRequestOptions,
    };

    let attempt = 0;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      ctx.attempt = attempt;

      // Add Retry-Attempt header for server-side diagnostics
      if (attempt > 0) {
        request.headers["Retry-Attempt"] = attempt.toString();
      }

      const res = await next(request, ctx);

      // Check if content is a stream - don't retry streams
      const contentType = res.headers.get("Content-Type");
      if (isStreamContent(contentType)) {
        ctx.logger?.debug("Skipping retry for stream content", { contentType });
        return res;
      }

      // Check custom shouldRetry function if provided
      if (perRequestOptions?.shouldRetry) {
        if (!perRequestOptions.shouldRetry(res.status)) {
          return res;
        }
      } else if (!shouldRetry(res.status, opt.retryableStatusCodes)) {
        return res;
      }

      if (attempt >= opt.maxRetries) {
        return res;
      }

      const retryAfterMs = parseRetryAfter(res.headers.get("retry-after"));
      let delay = retryAfterMs ?? backoff(opt.baseDelayMs, attempt, opt.maxDelayMs);

      if (opt.useExponentialBackoff && opt.jitter) {
        delay = withJitter(delay);
      }

      ctx.logger?.debug("Retrying request", {
        attempt: attempt + 1,
        maxRetries: opt.maxRetries,
        delayMs: delay,
        statusCode: res.status,
      });

      // Important: for 429/5xx, we wait and retry.
      await sleep(delay, request.signal);
      attempt++;
    }
  }
}

function shouldRetry(status: number, retryableStatusCodes?: number[]): boolean {
  const defaultCodes = [429, 502, 503, 504];
  const codes = retryableStatusCodes ?? defaultCodes;
  return codes.includes(status);
}

function backoff(base: number, attempt: number, max: number): number {
  const v = Math.min(max, base * 2 ** attempt);
  return v;
}
