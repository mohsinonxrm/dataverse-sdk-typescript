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

/**
 * Retry policy, used both for the client (`DataverseClientOptions.retry`) and per request
 * (`new MiddlewareRequestOptions([{ type: "retry", ... }])`). A per-request value overrides the
 * client's value for that request only.
 *
 * The delay before retry `n` (0-based) is `min(maxDelayMs, baseDelayMs * 2^n)`, with ±20% jitter
 * when `jitter` is on. When the response carries `Retry-After`, that wait is used as is instead.
 */
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
  /** `Retry-After` of the failed response, in ms, when it had one (then `delayMs` equals it). */
  retryAfterMs?: number;
  /** The request being retried. Treat it as read-only. */
  request: import("./http.js").RequestInformation;
  /** Correlation id of the request (the same on every attempt). */
  correlationId?: string;
}

export interface RetryOptions {
  /** Retries after the first attempt. @default 6 */
  maxRetries?: number;
  /** Base of the exponential backoff, in ms. @default 3000 */
  baseDelayMs?: number;
  /** Upper bound of the computed backoff, in ms. @default 30000 */
  maxDelayMs?: number;
  /**
   * Longest `Retry-After` the SDK waits out, in ms. When the server asks for a longer wait, the
   * response is returned at once (as a `DataverseThrottleError` with `retryAfterMs` for a 429),
   * so the caller decides whether to wait. Use `Infinity` to always honour `Retry-After`.
   * @default maxDelayMs (30000 unless changed)
   */
  maxRetryAfterMs?: number;
  /** Add ±20% random jitter to the computed backoff (never to `Retry-After`). @default true */
  jitter?: boolean;
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
   * Aborts, timeouts and requests with a stream body are never retried.
   * @default undefined (idempotent requests are retried)
   */
  retryNetworkErrors?: boolean;
  /**
   * Decide yourself whether to retry. Replaces the status-code, method and network-error checks;
   * `maxRetries`, the delays and `maxRetryAfterMs` still apply. For a network error it is called
   * with status `0` and the error.
   */
  shouldRetry?: (statusCode: number, error?: Error) => boolean;
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
   * with `DataverseNetworkError` (`RequestTimeout`). Reading the body afterwards isn't limited.
   */
  timeoutMs?: number;
  /** Time limit for each attempt, in ms. A timed-out attempt is not retried. */
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
   * Concurrency, Auth (when a token provider is set), Telemetry, Logging; then the request goes
   * to `fetch`. Retry wraps Concurrency, so each attempt takes a concurrency slot and releases it
   * before a retry wait. `replace` receives that list and returns the one to use (for example without
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
