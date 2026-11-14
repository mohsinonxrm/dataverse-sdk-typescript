import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import { resolveDiagnosticHeaders } from "../utils/diagnosticHeaders.js";
import type {
  DataverseClientOptions,
  RetryAttempt,
  RetryBackoff,
  RetryOptions,
  ShouldRetryInfo,
} from "../abstractions/options.js";
import { DataverseNetworkError } from "../errors/NamedErrors.js";
import { withJitter } from "../utils/jitter.js";
import { systemClock } from "../utils/clock.js";
import { isStreamBody } from "../utils/body.js";
import { parseRetryAfter, isStreamContent } from "../utils/HeaderUtils.js";
import { TelemetryEvents } from "../telemetry/events.js";
import { redactRequestUrl } from "../utils/redact.js";
import { requestTelemetry } from "../utils/telemetry.js";

const attemptsByResponse = new WeakMap<Response, readonly RetryAttempt[]>();

function attemptEntry(attempt: number, status: number, retryAfterMs?: number): RetryAttempt {
  return retryAfterMs === undefined ? { attempt, status } : { attempt, status, retryAfterMs };
}

function recordAttempts(res: Response, history: RetryAttempt[]): void {
  attemptsByResponse.set(res, Object.freeze([...history]));
}

/**
 * The attempts the retry middleware made for the request that produced `res`, oldest first: one
 * entry when there was no retry. `undefined` for a response that did not come through a client.
 *
 * @example
 * ```typescript
 * const res = await client.send({ method: "GET", url: "WhoAmI", headers: {} });
 * const retries = (getRetryAttempts(res)?.length ?? 1) - 1;
 * ```
 */
export function getRetryAttempts(res: Response): readonly RetryAttempt[] | undefined {
  return attemptsByResponse.get(res);
}

const DEFAULTS = {
  maxRetries: 6,
  baseDelayMs: 3000,
  maxDelayMs: 30000,
  backoff: "exponential" as RetryBackoff,
  jitter: true as boolean | "decorrelated",
  retryAfterJitterMs: 0,
  retryableStatusCodes: [429, 502, 503, 504],
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
    const opt = resolveOptions(this.options.retry, ctx.middlewareOptions?.get("retry"));

    // A stream body can be read only once, so a request carrying one is never retried.
    if (isStreamBody(request.body)) {
      const res = await next(request, ctx);
      recordAttempts(res, [{ attempt: 0, status: res.status }]);
      return res;
    }

    let attempt = 0;
    const history: RetryAttempt[] = [];
    // Decorrelated jitter carries a value from one delay to the next, per request (as Polly does).
    const backoff: BackoffState = { prev: 0 };
    const telemetry = requestTelemetry(this.options, ctx);
    // The client's clock (DataverseClientOptions.clock): the waits and deadline checks use it.
    const clock = ctx.clock ?? systemClock;
    /** Record the attempt, tell telemetry and `onRetry`, then wait. */
    const waitBeforeRetry = async (entry: RetryAttempt, delayMs: number) => {
      history.push({ ...entry, delayMs });
      if (telemetry) {
        const measurements: Record<string, number> = {
          "retry.attempt": attempt + 1,
          "retry.max": opt.maxRetries,
          "retry.delay_ms": delayMs,
          status: entry.status,
        };
        if (entry.retryAfterMs !== undefined) measurements["retry.after_ms"] = entry.retryAfterMs;
        telemetry.trackEvent(
          TelemetryEvents.retry,
          {
            "correlation.id": ctx.correlationId ?? "",
            "request.method": request.method,
            "request.url": redactRequestUrl(request, this.options.redactUrl),
            "retry.reason": entry.error ? "network_error" : "status",
            ...(entry.error ? { "error.type": entry.error.name } : {}),
          },
          measurements
        );
      }
      if (opt.onRetry) {
        try {
          opt.onRetry({
            attempt: attempt + 1,
            maxRetries: opt.maxRetries,
            status: entry.status,
            error: entry.error,
            delayMs,
            retryAfterMs: entry.retryAfterMs,
            request,
            correlationId: ctx.correlationId,
          });
        } catch (hookError) {
          ctx.logger?.warn("onRetry threw; ignoring", { error: String(hookError) });
        }
      }
      await clock.sleep(delayMs, request.signal);
      attempt++;
    };
    const done = (res: Response): Response => {
      const retryAfterMs = parseRetryAfter(res.headers.get("retry-after"));
      history.push(attemptEntry(attempt, res.status, retryAfterMs));
      recordAttempts(res, history);
      return res;
    };

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      ctx.attempt = attempt;

      // Add Retry-Attempt header for server-side diagnostics (unless turned off, #13)
      if (attempt > 0 && resolveDiagnosticHeaders(this.options.diagnosticHeaders).retryAttempt) {
        request.headers["retry-attempt"] = attempt.toString();
      }

      let res: Response;
      try {
        res = await next(request, ctx);
      } catch (err) {
        if (attempt >= opt.maxRetries || !this.shouldRetryError(err, request, opt, attempt)) {
          throw err;
        }
        const delay = computeBackoff(opt, attempt, backoff);
        // Waiting would only end in a timeout: report the network error itself (#471).
        if (endsAfterDeadline(ctx, clock.now(), delay)) throw err;
        ctx.logger?.debug("Retrying request after a network error", {
          attempt: attempt + 1,
          maxRetries: opt.maxRetries,
          delayMs: delay,
        });
        await waitBeforeRetry({ attempt, status: 0, error: err as Error }, delay);
        continue;
      }

      // Check if content is a stream - don't retry streams
      const contentType = res.headers.get("Content-Type");
      if (isStreamContent(contentType)) {
        ctx.logger?.debug("Skipping retry for stream content", { contentType });
        return done(res);
      }

      // shouldRetry (or retryableStatusCodes) picks the statuses worth retrying; the method checks
      // below still apply to them, so a custom shouldRetry never replays a create (#469).
      const retryable = opt.shouldRetry
        ? opt.shouldRetry(res.status, undefined, { request, response: res, attempt })
        : opt.retryableStatusCodes.includes(res.status);
      if (!retryable) {
        return done(res);
      } else if (res.status !== 429 && !opt.retryNonIdempotent && !isIdempotent(request)) {
        // A 5xx from a gateway can arrive after Dataverse applied the request; replaying a
        // create, an action or an unconditional PATCH could apply it twice.
        ctx.logger?.debug("Not retrying a non-idempotent request after a server error", {
          method: request.method,
          statusCode: res.status,
        });
        return done(res);
      } else if (
        res.status === 429 &&
        !opt.retryNonIdempotent &&
        !isIdempotent(request) &&
        /^multipart\/mixed/i.test(contentType ?? "")
      ) {
        // A 429 is normally safe to replay: Dataverse rejects a throttled request before doing
        // any work. A multipart body means it processed the $batch and some parts may have run,
        // so replaying would run them twice (#211). Hand the response back instead.
        ctx.logger?.debug("Not retrying a $batch whose 429 response has per-request results", {
          method: request.method,
        });
        return done(res);
      }

      if (attempt >= opt.maxRetries) {
        return done(res);
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
        return done(res);
      }
      // Decorrelated jitter moves on even when Retry-After decides the wait, as in Polly.
      const computed =
        retryAfterMs === undefined || opt.jitter === "decorrelated"
          ? computeBackoff(opt, attempt, backoff)
          : 0;
      let delay = retryAfterMs ?? computed;
      if (endsAfterDeadline(ctx, clock.now(), delay)) {
        // The request would time out while waiting: hand the response back now, so a 429 becomes
        // DataverseThrottleError with retryAfterMs instead of a RequestTimeout later (#471).
        ctx.logger?.debug("Not retrying: the wait would end after the request's deadline", {
          delayMs: delay,
          statusCode: res.status,
        });
        return done(res);
      }
      if (retryAfterMs !== undefined) {
        // Up to retryAfterJitterMs more, so requests throttled together don't wake together; never
        // so much that the wait ends after the deadline.
        const room = Math.min(
          opt.retryAfterJitterMs,
          (ctx.deadline ?? Infinity) - clock.now() - delay - 1
        );
        if (room > 0) delay += Math.round(Math.random() * room);
      }

      ctx.logger?.debug("Retrying request", {
        attempt: attempt + 1,
        maxRetries: opt.maxRetries,
        delayMs: delay,
        statusCode: res.status,
      });

      // Important: for 429/5xx, we wait and retry. The response is dropped, so release its body
      // now: an unread body keeps the connection busy (undici) until garbage collection (#45).
      // Not awaited: a tee'd stream only settles once every branch is done.
      res.body?.cancel().catch(() => undefined);
      await waitBeforeRetry(attemptEntry(attempt, res.status, retryAfterMs), delay);
    }
  }

  private shouldRetryError(
    err: unknown,
    request: RequestInformation,
    opt: ResolvedOptions,
    attempt: number
  ) {
    // Never retry what the caller cancelled, or a request that ran out of time.
    if (request.signal?.aborted) return false;
    if (!(err instanceof DataverseNetworkError)) return false;
    const info: ShouldRetryInfo = { request, attempt };
    if (err.name === "RequestTimeout") {
      // The request's signal is still live, so only this attempt's attemptTimeoutMs ran out. Like
      // a dropped connection, it can come after Dataverse applied a create or an action.
      return (
        opt.retryAttemptTimeouts &&
        (opt.shouldRetry?.(0, err, info) ?? true) &&
        (opt.retryNonIdempotent || isIdempotent(request))
      );
    }
    if (err.name !== "ConnectionFailed") return false;
    // shouldRetry decides whether network errors are retried at all; only retryNonIdempotent lets
    // it replay a create or an action, which may have been applied before the connection dropped.
    if (opt.shouldRetry) {
      return opt.shouldRetry(0, err, info) && (opt.retryNonIdempotent || isIdempotent(request));
    }
    if (opt.retryNetworkErrors === false) return false;
    // Left unset, only idempotent requests are retried, even with `retryNonIdempotent`: a dropped
    // connection can come after Dataverse applied a create or an action. Replaying those after a
    // network error takes `retryNetworkErrors: true` as well as `retryNonIdempotent: true`.
    if (opt.retryNetworkErrors === true && opt.retryNonIdempotent) return true;
    return isIdempotent(request);
  }
}

type ResolvedOptions = typeof DEFAULTS &
  Pick<RetryOptions, "shouldRetry" | "onRetry" | "retryNetworkErrors" | "retryAttemptTimeouts"> & {
    maxRetryAfterMs: number;
  };

/** Defaults, then the client's options, then the request's; undefined never overrides. */
function resolveOptions(client?: RetryOptions, perRequest?: RetryOptions): ResolvedOptions {
  const merged: typeof DEFAULTS & RetryOptions = {
    ...DEFAULTS,
    ...definedOnly(client ?? {}),
    ...definedOnly(perRequest ?? {}),
  };
  return { ...merged, maxRetryAfterMs: merged.maxRetryAfterMs ?? merged.maxDelayMs };
}

/** What decorrelated jitter carries from one delay to the next (Polly's `retryState`). */
interface BackoffState {
  prev: number;
}

/**
 * The delay before retry `attempt` (0-based): `backoff` from `baseDelayMs`, capped at `maxDelayMs`,
 * with ±20% jitter (`jitter: true`), or decorrelated jitter (`"decorrelated"` with exponential).
 */
function computeBackoff(opt: ResolvedOptions, attempt: number, state: BackoffState): number {
  const { baseDelayMs: base, backoff, jitter, maxDelayMs: max } = opt;
  if (jitter === "decorrelated" && backoff === "exponential") {
    if (base <= 0) return 0;
    // Polly v8's DecorrelatedJitterBackoffV2 (src/Polly.Core/Retry/RetryHelper.cs; the formula is
    // George Polevoy's, from App-vNext/Polly#530): t = attempt + random(),
    // next = 2^t * tanh(sqrt(4t)) (pFactor 4), delay = (next - prev) * (1 / 1.4) * baseDelayMs
    // (rpScalingFactor), then prev = next. Medians fall near baseDelayMs * 2^attempt.
    const t = attempt + Math.random();
    const next = 2 ** t * Math.tanh(Math.sqrt(4 * t));
    const delay = (next - state.prev) * (1 / 1.4) * base;
    state.prev = next;
    // From t = 1024, next is Infinity (and the delay Infinity or NaN): the cap applies, as in Polly.
    return delay < max ? Math.floor(delay) : max;
  }
  const v = Math.min(
    max,
    backoff === "constant"
      ? base
      : backoff === "linear"
        ? base * (attempt + 1)
        : base * 2 ** attempt
  );
  return jitter ? Math.min(max, withJitter(v)) : v;
}

/** Whether waiting `delayMs` from `now` would end after the request's `timeoutMs` deadline. */
function endsAfterDeadline(ctx: MiddlewareContext, now: number, delayMs: number): boolean {
  return ctx.deadline !== undefined && now + delayMs >= ctx.deadline;
}

/** Drop undefined values so they don't override client-level settings when spread. */
function definedOnly<T extends object>(o: T): Partial<T> {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as Partial<T>;
}

/**
 * Whether replaying the request can't apply it twice: GET, HEAD, OPTIONS, PUT and DELETE are
 * idempotent; PATCH is when it carries `If-Match` (so a replay can only update the same version);
 * any request is when it says so (`idempotent: true`, e.g. a `$batch` of GETs).
 */
function isIdempotent({ method, headers, idempotent }: RequestInformation): boolean {
  if (idempotent === true) return true;
  const m = method.toUpperCase();
  if (m === "GET" || m === "HEAD" || m === "OPTIONS" || m === "PUT" || m === "DELETE") return true;
  return m === "PATCH" && Boolean(headers["if-match"]);
}
