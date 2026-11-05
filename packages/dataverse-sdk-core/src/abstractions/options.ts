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
   * when `retryNetworkErrors` is on). Default `false`: a gateway error can arrive after Dataverse
   * already applied the request, so replaying a create or an action can apply it twice. 429
   * responses are always retried, for every method, because Dataverse rejects throttled requests
   * before doing any work.
   */
  retryNonIdempotent?: boolean;
  /**
   * Retry when `fetch` itself fails (a `DataverseNetworkError` named `ConnectionFailed`, such as
   * a dropped connection), for idempotent methods only unless `retryNonIdempotent` is set.
   * Aborts and timeouts are never retried. @default false
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
  /** @deprecated Use `baseDelayMs`. */
  delay?: number;
  /** @deprecated Has no effect: backoff is always exponential. */
  useExponentialBackoff?: boolean;
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

export interface ConcurrencyOptions {
  maxConcurrentRequests?: number;
  adaptiveFromDopHint?: boolean;
  /** Bounds for adaptive tuning */
  min?: number;
  max?: number;
}

export interface CircuitBreakerOptions {
  enabled?: boolean;
  failureThreshold?: number;
  samplingWindowMs?: number;
  openDurationMs?: number;
}

export interface BulkheadOptions {
  enabled?: boolean;
  maxParallel?: number;
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
  ids: string[]
) => Promise<void>;

export interface RequestOptions {
  headers?: Record<string, string>;
  prefer?: PreferOption[];
  timeoutMs?: number;
  signal?: AbortSignal;
  /** Correlation id for this request. A new one is generated per request when omitted. */
  correlationId?: string;
  /**
   * Per-request middleware options overrides
   * Allows fine-grained control of middleware behavior on a per-request basis
   */
  middlewareOptions?: import("../middleware/RequestOptions.js").RequestOptions;
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
   * Receives the SDK's telemetry: one dependency per request attempt, and exceptions. Calls into
   * it are guarded, so a client that throws never fails a request.
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
   * `x-ms-feature-usage`, and `retry-attempt` on retries. Default `true` (all sent). `false`
   * sends none of them, so `fetch` sees only the headers the request itself needs; an object
   * turns them off one by one (omitted ones stay on). Telemetry still records the correlation id.
   */
  diagnosticHeaders?: boolean | DiagnosticHeaderOptions;
  retry?: RetryOptions;
  concurrency?: ConcurrencyOptions;
  circuitBreaker?: CircuitBreakerOptions;
  bulkhead?: BulkheadOptions;
  defaultHeaders?: Record<string, string>;
  defaultPrefer?: PreferOption[];
  /**
   * Extra origins (e.g. `"https://other.crm.dynamics.com"`) that may receive the bearer token.
   * By default the token is attached only to requests for the client's own `baseUrl` origin.
   */
  allowedTokenOrigins?: string[];
  /**
   * What to do with a request for an origin that may not receive the token:
   * `"throw"` (default) rejects it with `DataverseInvalidRequestError` before anything is sent;
   * `"strip"` sends it without the `authorization` header.
   */
  onForeignOrigin?: "throw" | "strip";
}
