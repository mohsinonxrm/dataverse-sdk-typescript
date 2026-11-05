import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { DataverseClientOptions, RetryOptions } from "../abstractions/options.js";
import { DataverseNetworkError } from "../errors/NamedErrors.js";
import { withJitter } from "../utils/jitter.js";
import { sleep } from "../utils/sleep.js";
import { isStreamBody } from "../utils/body.js";
import { parseRetryAfter, isStreamContent } from "../utils/HeaderUtils.js";

const DEFAULTS = {
  maxRetries: 6,
  baseDelayMs: 3000,
  maxDelayMs: 30000,
  jitter: true,
  retryableStatusCodes: [429, 502, 503, 504],
  retryNonIdempotent: false,
  retryNetworkErrors: false,
};

export class RetryMiddleware implements Middleware {
  name = "RetryMiddleware";

  constructor(private options: DataverseClientOptions) {}

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const opt = resolveOptions(this.options.retry, ctx.middlewareOptions?.get("retry"));

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

      let res: Response;
      try {
        res = await next(request, ctx);
      } catch (err) {
        if (attempt >= opt.maxRetries || !this.shouldRetryError(err, request, opt)) throw err;
        const delay = computeBackoff(opt, attempt);
        ctx.logger?.debug("Retrying request after a network error", {
          attempt: attempt + 1,
          maxRetries: opt.maxRetries,
          delayMs: delay,
        });
        await sleep(delay, request.signal);
        attempt++;
        continue;
      }

      // Check if content is a stream - don't retry streams
      const contentType = res.headers.get("Content-Type");
      if (isStreamContent(contentType)) {
        ctx.logger?.debug("Skipping retry for stream content", { contentType });
        return res;
      }

      if (opt.shouldRetry) {
        if (!opt.shouldRetry(res.status)) {
          return res;
        }
      } else if (!opt.retryableStatusCodes.includes(res.status)) {
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
      if (retryAfterMs !== undefined && retryAfterMs > opt.maxRetryAfterMs) {
        // Don't sleep for minutes behind the caller's back: hand the response (and its
        // Retry-After) back so the caller can decide to wait.
        ctx.logger?.debug("Not retrying: Retry-After is longer than maxRetryAfterMs", {
          retryAfterMs,
          maxRetryAfterMs: opt.maxRetryAfterMs,
          statusCode: res.status,
        });
        return res;
      }
      const delay = retryAfterMs ?? computeBackoff(opt, attempt);

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

  private shouldRetryError(err: unknown, request: RequestInformation, opt: ResolvedOptions) {
    // Never retry what the caller cancelled, or a request that ran out of time.
    if (request.signal?.aborted) return false;
    if (!(err instanceof DataverseNetworkError) || err.name !== "ConnectionFailed") return false;
    if (opt.shouldRetry) return opt.shouldRetry(0, err);
    return (
      opt.retryNetworkErrors &&
      (opt.retryNonIdempotent || isIdempotent(request.method, request.headers))
    );
  }
}

type ResolvedOptions = typeof DEFAULTS &
  Pick<RetryOptions, "shouldRetry"> & {
    maxRetryAfterMs: number;
  };

/** Defaults, then the client's options, then the request's; undefined never overrides. */
function resolveOptions(client?: RetryOptions, perRequest?: RetryOptions): ResolvedOptions {
  const merged: typeof DEFAULTS & RetryOptions = {
    ...DEFAULTS,
    ...definedOnly(normalize(client)),
    ...definedOnly(normalize(perRequest)),
  };
  return { ...merged, maxRetryAfterMs: merged.maxRetryAfterMs ?? merged.maxDelayMs };
}

/** Map the deprecated `delay` alias onto `baseDelayMs`. */
function normalize(o?: RetryOptions): RetryOptions {
  if (!o) return {};
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- still honoured for compatibility
  const { delay, useExponentialBackoff: _ignored, ...rest } = o;
  return { ...rest, baseDelayMs: rest.baseDelayMs ?? delay };
}

/** `min(maxDelayMs, baseDelayMs * 2^attempt)`, with ±20% jitter when enabled. */
function computeBackoff(opt: ResolvedOptions, attempt: number): number {
  const v = Math.min(opt.maxDelayMs, opt.baseDelayMs * 2 ** attempt);
  return opt.jitter ? Math.min(opt.maxDelayMs, withJitter(v)) : v;
}

/** Drop undefined values so they don't override client-level settings when spread. */
function definedOnly<T extends object>(o: T): Partial<T> {
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
