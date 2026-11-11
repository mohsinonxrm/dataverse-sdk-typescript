import type { Middleware } from "./middleware.js";

export type PreferOption = string & { __brand: "PreferOption" };

export const Prefer = {
  returnRepresentation(): PreferOption {
    return "return=representation" as PreferOption;
  },
  includeAnnotations(term: string): PreferOption {
    return `odata.include-annotations="${term}"` as PreferOption;
  },
  continueOnError(): PreferOption {
    return "odata.continue-on-error" as PreferOption;
  },
} as const;

/** One attempt of a request, as recorded by the retry middleware. */
export interface RetryAttempt {
  /** 0 for the first attempt, 1 for the first retry, and so on. */
  attempt: number;
  /** Response status, or 0 when `fetch` failed without a response. */
  status: number;
  /** The network error, when `status` is 0. */
  error?: Error;
  /** `Retry-After` of the response, in ms, when it had one. */
  retryAfterMs?: number;
  /** How long the SDK waited after this attempt before the next one; absent on the last attempt. */
  delayMs?: number;
}

/** What `RetryOptions.onRetry` receives before each retry. */
export interface RetryInfo {
  /** The retry about to happen: 1 for the first retry. */
  attempt: number;
  /** `maxRetries` in effect for this request. */
  maxRetries: number;
  /** Status of the attempt that failed, or 0 for a network error. */
  status: number;
  /** The network error, when `status` is 0. */
  error?: Error;
  /** How long the SDK waits before the retry, in ms. */
  delayMs: number;
  /**
   * `Retry-After` of the failed response, in ms, when it had one. `delayMs` then equals it, plus
   * up to `retryAfterJitterMs`.
   */
  retryAfterMs?: number;
  /** The request being retried. Treat it as read-only. */
  request: import("./http.js").RequestInformation;
  /** Correlation id of the request (the same on every attempt). */
  correlationId?: string;
}

/** What `RetryOptions.shouldRetry` receives as its third argument. */
export interface ShouldRetryInfo {
  /** The request that failed. Treat it as read-only. */
  request: import("./http.js").RequestInformation;
  /**
   * The response that failed, when there was one (absent for a network error or a timed-out
   * attempt). Don't read its body: the SDK releases it before a retry, or returns it to the caller.
   */
  response?: Response;
  /** The attempt that failed: 0 for the first attempt, 1 for the first retry, and so on. */
  attempt: number;
}

/**
 * How the computed delay grows from one retry to the next (`baseDelayMs` is `b`, retry `n` is
 * 0-based): `"exponential"` waits `b * 2^n`, `"linear"` waits `b * (n + 1)`, `"constant"` waits
 * `b` every time. Each is capped at `maxDelayMs`.
 */
export type RetryBackoff = "exponential" | "linear" | "constant";

/**
 * Retry policy, used both for the client (`DataverseClientOptions.retry`) and per request
 * (`new MiddlewareRequestOptions([{ type: "retry", ... }])`). A per-request value overrides the
 * client's value for that request only.
 *
 * By default the delay before retry `n` (0-based) is `min(maxDelayMs, baseDelayMs * 2^n)`, with
 * ±20% jitter (`backoff` and `jitter` change that). When the response carries `Retry-After`, that
 * wait is used instead (plus up to `retryAfterJitterMs`).
 */
export interface RetryOptions {
  /** Retries after the first attempt. @default 6 */
  maxRetries?: number;
  /**
   * The first delay, in ms, which `backoff` scales for later retries. With
   * `jitter: "decorrelated"`, the median of the first delay. @default 3000
   */
  baseDelayMs?: number;
  /** Upper bound of the computed backoff, in ms (jitter included). @default 30000 */
  maxDelayMs?: number;
  /**
   * How the computed delay grows: `"exponential"` (`baseDelayMs * 2^n` before retry `n`, 0-based),
   * `"linear"` (`baseDelayMs * (n + 1)`) or `"constant"` (`baseDelayMs` every time), capped at
   * `maxDelayMs`. `Retry-After` replaces it when the response carries one.
   * @default "exponential"
   */
  backoff?: RetryBackoff;
  /**
   * Longest `Retry-After` the SDK waits out, in ms. When the server asks for a longer wait, the
   * response is returned at once (as a `DataverseThrottleError` with `retryAfterMs` for a 429),
   * so the caller decides whether to wait. Use `Infinity` to always honour `Retry-After`.
   * @default maxDelayMs (30000 unless changed)
   */
  maxRetryAfterMs?: number;
  /**
   * Randomise the computed backoff (never `Retry-After`; see `retryAfterJitterMs` for that), so
   * clients that failed together don't retry together.
   *
   * - `true`: ±20%, uniformly, around the `backoff` delay.
   * - `false`: the `backoff` delay exactly.
   * - `"decorrelated"`: with `backoff: "exponential"`, Polly v8's decorrelated jitter
   *   (`DecorrelatedJitterBackoffV2`): delays spread between 0 and roughly
   *   `baseDelayMs * (2^(n+1) - 2^(n-1))` before retry `n`, with medians near `baseDelayMs * 2^n`
   *   and fewer clusters than uniform jitter. Each delay is capped at `maxDelayMs`. With
   *   `"linear"` or `"constant"` it acts as `true`, as in Polly.
   *
   * @default true
   */
  jitter?: boolean | "decorrelated";
  /**
   * Add a random 0 to `retryAfterJitterMs` ms to each `Retry-After` wait, so requests throttled at
   * the same moment don't all retry at the same moment. The added time never pushes the wait past
   * the request's deadline (`timeoutMs`): it shrinks to fit. `maxRetryAfterMs` is compared with
   * `Retry-After` itself.
   * @default 0
   */
  retryAfterJitterMs?: number;
  /** Status codes that are retried. @default [429, 502, 503, 504] */
  retryableStatusCodes?: number[];
  /**
   * Also retry POST, and PATCH without `If-Match`, after 502/503/504 (and after network errors,
   * when `retryNetworkErrors` is also set to `true`). Default `false`: a gateway error can arrive after Dataverse
   * already applied the request, so replaying a create or an action can apply it twice. 429
   * responses are always retried, for every method, because Dataverse rejects throttled requests
   * before doing any work.
   */
  retryNonIdempotent?: boolean;
  /**
   * Retry when `fetch` itself fails (a `DataverseNetworkError` named `ConnectionFailed`, such as
   * a dropped connection or a reset socket).
   *
   * - Unset (the default): idempotent requests are retried: GET, HEAD, OPTIONS, PUT, DELETE, and
   *   PATCH with `If-Match`. POST and other PATCHes aren't, even with `retryNonIdempotent`,
   *   because the connection can drop after Dataverse applied the request.
   * - `true`: the same, and with `retryNonIdempotent: true` every request is retried.
   * - `false`: never retried; the error is thrown at once (the 1.x behaviour).
   *
   * Aborts, timeouts (see `retryAttemptTimeouts`) and requests with a stream body are never
   * retried.
   * @default undefined (idempotent requests are retried)
   */
  retryNetworkErrors?: boolean;
  /**
   * Retry an attempt that ran out of `attemptTimeoutMs` (a `DataverseNetworkError` named
   * `RequestTimeout`). Only idempotent requests are retried: GET, HEAD, OPTIONS, PUT, DELETE, a
   * PATCH with `If-Match`, or a request marked `idempotent`; a POST or another PATCH may have been
   * applied before the attempt timed out, so it is retried only with `retryNonIdempotent: true`
   * as well. The request's own `timeoutMs` (its deadline) still ends it: a timed-out request, an
   * abort, or a retry whose wait would end after the deadline is never retried. With
   * `shouldRetry`, it must also return `true` (it gets status `0` and the timeout error).
   * @default false (a timed-out attempt fails the request)
   */
  retryAttemptTimeouts?: boolean;
  /**
   * Decide which failures are worth retrying. Replaces `retryableStatusCodes` and
   * `retryNetworkErrors`: for a network error it is called with status `0` and the error. The
   * third argument has the request, the failed response (when there was one) and the attempt
   * number (0 for the first attempt); a predicate that takes one or two arguments works as before.
   *
   * It does not decide which requests may be replayed. A POST, or a PATCH without `If-Match`, is
   * still not retried after a 5xx or a network error, nor a `$batch` whose 429 response has
   * per-request results, unless `retryNonIdempotent` is `true`. `maxRetries`, the delays,
   * `maxRetryAfterMs` and the request's `timeoutMs` still apply.
   *
   * @example
   * ```typescript
   * // Retry 5xx, but not on the bulk endpoint, and only twice for anything but a GET.
   * shouldRetry: (status, _error, { request, attempt }) =>
   *   status >= 500 && !request.url.includes("CreateMultiple") &&
   *   (request.method === "GET" || attempt < 2)
   * ```
   */
  shouldRetry?: (statusCode: number, error: Error | undefined, info: ShouldRetryInfo) => boolean;
  /**
   * Called once before each retry, after the delay is known and before the SDK waits. Use it to
   * show progress ("Throttled, retrying in 12 s (2/6)") or count retries. It must not throw; an
   * error it throws is logged and ignored. A per-request `onRetry` replaces the client's.
   */
  onRetry?: (info: RetryInfo) => void;
}

/** Per-header switches for `DataverseClientOptions.diagnosticHeaders`. Each defaults to `true`. */
export interface DiagnosticHeaderOptions {
  /** `x-ms-sdk-version: dataverse-sdk-js/<version>`. */
  sdkVersion?: boolean;
  /** `x-ms-correlation-id: <per-request id>`. */
  correlationId?: boolean;
  /** `x-ms-feature-usage: <hex flags>`. */
  featureUsage?: boolean;
  /** `retry-attempt: <n>` on retried requests. */
  retryAttempt?: boolean;
  /**
   * W3C Trace Context (`traceparent`, `tracestate`) from the `telemetry` client's
   * `startDependency`, sent only to origins that may receive the access token. Sent only when the
   * telemetry client provides it (the OpenTelemetry adapter does when a span is recording).
   */
  traceContext?: boolean;
}

/** See `DataverseClientOptions.middleware`. */
export interface MiddlewareCustomization {
  /** Middleware that runs before the defaults (outermost). */
  prepend?: Middleware[];
  /** Middleware that runs after the defaults (innermost, right before `fetch`). */
  append?: Middleware[];
  /** Receives the default middleware (a fresh array) and returns the list to use. */
  replace?: (defaults: Middleware[]) => Middleware[];
}

/** Client-level request logging settings. */
export interface LoggingConfig {
  /**
   * Log full request URLs, including the query string and key values. Default `false`: URLs are
   * logged through `redactUrl` (by default origin and path, with keys and the query hidden), so
   * filters, record ids and alternate keys stay out of logs.
   */
  fullUrls?: boolean;
}

/**
 * How many requests a client sends at once. Requests over the limit wait for a slot (each retry
 * attempt takes its own slot). With `adaptiveFromDopHint`, the limit follows the
 * `x-ms-dop-hint` header Dataverse returns (its recommended degree of parallelism), within
 * `min`..`max`.
 *
 * @example
 * ```typescript
 * { maxConcurrentRequests: 1 }            // one at a time; the hint can't raise it
 * { maxConcurrentRequests: 4, max: 12 }   // start at 4; the hint may raise it to 12
 * { adaptiveFromDopHint: false }          // a fixed 8
 * ```
 */
export interface ConcurrencyOptions {
  /**
   * The limit the client starts with, honoured exactly. When set, it is also the ceiling for the
   * DOP hint unless `max` is set.
   * @default 8 (or `max`, when that is lower)
   */
  maxConcurrentRequests?: number;
  /**
   * Follow the `x-ms-dop-hint` response header. Browsers can't read the header (it isn't
   * CORS-exposed), so there the limit stays at `maxConcurrentRequests`.
   * @default true
   */
  adaptiveFromDopHint?: boolean;
  /**
   * The lowest limit the DOP hint can set.
   * @default 2 (or `maxConcurrentRequests`, when that is lower)
   */
  min?: number;
  /**
   * The highest limit the DOP hint can set.
   * @default `maxConcurrentRequests` when that is set, otherwise 16
   */
  max?: number;
  /**
   * Halve the limit (not below `min`) when Dataverse answers 429 with error `0x80072326`, its
   * service protection limit on concurrent requests per user. One burst of such 429s halves it
   * once: only a request sent after the last halving can halve it again. The limit stays down
   * until the 429's `Retry-After` has passed; then the next `x-ms-dop-hint` sets it again (as
   * usual), or, without a readable hint (browsers, `adaptiveFromDopHint: false`), each successful
   * response raises it by 1 back to where it was. The other 429s (`0x80072322` requests,
   * `0x80072321` execution time) leave the limit alone: they are about volume, not concurrency.
   * @default true
   */
  reduceOnThrottle?: boolean;
  /**
   * Most requests waiting for a slot. A request beyond it is refused at once, without being
   * sent, with `DataverseQueueFullError` (`queue: "concurrency"`). `0` refuses every request over
   * the limit instead of queueing it. Unbounded by default; on a server, set a bound so a burst of
   * work can't pile up waiting requests (and their memory) without limit, and answer the refused
   * ones with a 503 or a retry later.
   * @default Infinity
   */
  maxQueue?: number;
}

/**
 * Executor callback for bindMany() — allows the batch package to provide the
 * implementation without creating a circular package dependency.
 */
export type BindManyExecutor = (
  client: import("../client/DataverseClient.js").DataverseClient,
  pathOrUrl: string,
  navigationProperty: string,
  entitySetName: string,
  ids: string[],
  /**
   * The caller's request options, with `headers` holding every header the associations must
   * carry: the builder's impersonation (`MSCRMCallerID` / `CallerObjectId`) and custom headers,
   * then the options' own.
   */
  options: RequestOptions & { headers: Record<string, string> }
) => Promise<void>;

export interface RequestOptions {
  headers?: Record<string, string>;
  prefer?: PreferOption[];
  /**
   * Time limit for the whole request, in ms, from the call until the response headers arrive:
   * every attempt, retry wait and wait for a concurrency slot. When it passes, the request rejects
   * with `DataverseNetworkError` (`RequestTimeout`). A retry whose wait (`Retry-After` or backoff)
   * would end after it is not attempted: the failed response is returned at once, so a 429 throws
   * `DataverseThrottleError` with `retryAfterMs`. Reading the body afterwards isn't limited.
   */
  timeoutMs?: number;
  /**
   * Time limit for each attempt, in ms. A timed-out attempt is not retried, unless the retry
   * option `retryAttemptTimeouts` is on (idempotent requests only).
   */
  attemptTimeoutMs?: number;
  signal?: AbortSignal;
  /** Correlation id for this request. A new one is generated per request when omitted. */
  correlationId?: string;
  /**
   * Per-request middleware options overrides
   * Allows fine-grained control of middleware behavior on a per-request basis
   */
  middlewareOptions?: import("../middleware/RequestOptions.js").RequestOptions;
}

/** Options for `createAndGetId()`: the request options, plus where a returned record keeps its id. */
export interface CreateAndGetIdOptions extends RequestOptions {
  /**
   * The table's primary key column, e.g. `"accountid"`. Needed only when the create asks for the
   * record back (`Prefer: return=representation`, from `prefer`, the request's headers or the
   * client's `defaultPrefer`): Dataverse then answers `201 Created` with the record in the body
   * and no `OData-EntityId` or `Location` header, so the id is read from this property of the
   * body. The headers win when both are present.
   */
  primaryIdAttribute?: string;
}

/** A Dataverse Web API version string such as `"v9.2"`. */
export type ApiVersion = `v${number}.${number}`;

export interface DataverseClientOptions {
  baseUrl: string;
  /** Web API version, e.g. `"v9.2"` (default) or `"v9.1"`. Ignored when `baseUrl` already ends in `/api/data/vX.Y`. */
  apiVersion?: ApiVersion;
  scopes?: string | string[];
  tokenProvider?: import("./http.js").AccessTokenProvider;
  fetchProvider?: import("./http.js").FetchProvider;
  /**
   * Where the SDK writes its diagnostics. Default: nothing is logged. Pass
   * `new ConsoleLogger()` to log to the console, or your own `Logger`.
   */
  logger?: import("./http.js").Logger;
  /** What request logging includes. Only used when `logger` is set. */
  logging?: LoggingConfig;
  /**
   * Receives the SDK's telemetry: one dependency per request attempt (with W3C trace context when
   * the client provides it), exceptions, and the events in `TelemetryEvents` (throttling,
   * retries, concurrency waits, `$batch` executions). Calls into it are guarded, so a client that
   * throws never fails a request.
   */
  telemetry?: import("./http.js").TelemetryClient;
  /**
   * How request URLs appear in logs and telemetry. Default: origin and path, with GUID keys as
   * `({id})`, other keys as `(…)` and the query as `?…` (see `defaultRedactUrl`), so filters,
   * record ids and alternate keys stay out. Return `url.href` to report full URLs. If it throws,
   * the default is used.
   */
  redactUrl?: (url: URL) => string;
  /**
   * The SDK's own diagnostic request headers: `x-ms-sdk-version`, `x-ms-correlation-id`,
   * `x-ms-feature-usage`, `retry-attempt` on retries, and `traceparent` / `tracestate` when the
   * telemetry client provides them. Default `true` (all sent). `false`
   * sends none of them, so `fetch` sees only the headers the request itself needs; an object
   * turns them off one by one (omitted ones stay on). Telemetry still records the correlation id.
   */
  diagnosticHeaders?: boolean | DiagnosticHeaderOptions;
  retry?: RetryOptions;
  concurrency?: ConcurrencyOptions;
  /**
   * Slow requests down before Dataverse throttles them, from its service-protection headers, and
   * hold every new request while a 429's `Retry-After` runs:
   * `adaptiveThrottling: new AdaptiveThrottlingMiddleware({ ... })` (one instance per client). It
   * runs inside Retry, so it sees each attempt's response, and outside Concurrency, so a request
   * it holds back holds no concurrency slot and no access token, and the wait isn't part of the
   * attempt's dependency duration. Each wait is a `dataverse.throttle.delay` telemetry event. An
   * instance rather than settings, so clients that don't use it don't bundle it.
   * @default none (off)
   */
  adaptiveThrottling?: import("../middleware/AdaptiveThrottlingMiddleware.js").AdaptiveThrottlingMiddleware;
  /** Headers added to every request. A header the request sets itself wins. */
  defaultHeaders?: Record<string, string>;
  /**
   * `Prefer` values added to every request, e.g. `[Prefer.includeAnnotations("*")]`. A request
   * that sets the same preference (`return`, `odata.include-annotations`, `odata.maxpagesize`, …)
   * keeps its own value.
   */
  defaultPrefer?: PreferOption[];
  /**
   * Customise the middleware pipeline. The defaults run in this order: ODataHeaders, Retry,
   * AdaptiveThrottling (when `adaptiveThrottling` is set), Concurrency, Auth (when a token
   * provider is set), Telemetry, Logging; then the request goes to `fetch`. Retry wraps
   * Concurrency, so each attempt takes a concurrency slot and releases it before a retry wait.
   * Add `AdaptiveThrottlingMiddleware` with the `adaptiveThrottling` option rather than here:
   * appended, it runs inside the concurrency slot, so its waits hold a slot and an access token
   * (the client logs a warning once). `replace` receives that list and returns the one to use (for example without
   * Logging); then `prepend` runs first and `append` runs last, right before `fetch`, so it sees
   * the final headers including `authorization`.
   */
  middleware?: MiddlewareCustomization;
  /**
   * Extra origins (e.g. `"https://other.crm.dynamics.com"`) that may receive the bearer token.
   * By default the token is attached only to requests for the client's own `baseUrl` origin.
   */
  allowedTokenOrigins?: string[];
  /**
   * After a 401, get a new token and send the request once more. With a claims challenge in
   * `WWW-Authenticate` (Conditional Access, CAE), the claims are passed to `getToken`;
   * otherwise `getToken` is called with `forceRefresh: true`. Default `true`. Browsers can't
   * read `WWW-Authenticate` on Dataverse responses (it isn't a CORS-exposed header), so there it
   * is always a forced refresh.
   */
  refreshTokenOn401?: boolean;
  /**
   * What to do with a request for an origin that may not receive the token:
   * `"throw"` (default) rejects it with `DataverseInvalidRequestError` before anything is sent;
   * `"strip"` sends it without the `authorization` header.
   */
  onForeignOrigin?: "throw" | "strip";
}
