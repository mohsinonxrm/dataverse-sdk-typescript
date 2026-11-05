import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";
import { withJitter } from "../utils/jitter.js";
import { sleep } from "../utils/sleep.js";
import { isStreamBody } from "../utils/body.js";
import { parseRetryAfter, isStreamContent } from "../utils/HeaderUtils.js";

const DEFAULTS = {
  maxRetries: 6,
  baseDelayMs: 3000,
  maxDelayMs: 30000,
  jitter: true,
  retryNonIdempotent: false,
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
    const perRequestOptions = ctx.middlewareOptions?.get("retry");
    const opt = {
      ...DEFAULTS,
      ...this.options.retry,
      ...definedOnly({
        maxRetries: perRequestOptions?.maxRetries,
        // The per-request type calls the base delay `delay`.
        baseDelayMs: perRequestOptions?.delay,
        retryableStatusCodes: perRequestOptions?.retryableStatusCodes,
        useExponentialBackoff: perRequestOptions?.useExponentialBackoff,
        retryNonIdempotent: perRequestOptions?.retryNonIdempotent,
      }),
    };

    // A stream body can be read only once, so a request carrying one is never retried.
    if (isStreamBody(request.body)) {
      return next(request, ctx);
    }

    let attempt = 0;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      ctx.attempt = attempt;

      // Add Retry-Attempt header for server-side diagnostics
      if (attempt > 0) {
        request.headers["retry-attempt"] = attempt.toString();
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
      } else if (
        res.status !== 429 &&
        !opt.retryNonIdempotent &&
        !isIdempotent(request.method, request.headers)
      ) {
        // A 5xx from a gateway can arrive after Dataverse applied the request; replaying a
        // create, an action or an unconditional PATCH could apply it twice.
        ctx.logger?.debug("Not retrying a non-idempotent request after a server error", {
          method: request.method,
          statusCode: res.status,
        });
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

/** Drop undefined values so they don't override client-level settings when spread. */
function definedOnly<T extends Record<string, unknown>>(o: T): Partial<T> {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as Partial<T>;
}

/**
 * Whether replaying the request can't apply it twice: GET, HEAD, OPTIONS, PUT and DELETE are
 * idempotent; PATCH is when it carries `If-Match` (so a replay can only update the same version).
 */
function isIdempotent(method: string, headers: Record<string, string>): boolean {
  const m = method.toUpperCase();
  if (m === "GET" || m === "HEAD" || m === "OPTIONS" || m === "PUT" || m === "DELETE") return true;
  return m === "PATCH" && Boolean(headers["if-match"]);
}
