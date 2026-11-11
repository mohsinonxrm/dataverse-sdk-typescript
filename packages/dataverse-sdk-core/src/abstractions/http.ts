export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export interface RequestInformation {
  method: HttpMethod;
  /** Absolute URL */
  url: string;
  headers: Record<string, string>;
  /** Query parameters (will be URL-encoded) */
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  /**
   * Time limit for the whole request, in ms: every attempt, retry wait and wait for a
   * concurrency slot. When it passes, the request rejects with `DataverseNetworkError`
   * (`RequestTimeout`). A retry whose wait would end after it is not attempted: the failed
   * response is returned at once.
   */
  timeoutMs?: number;
  /**
   * Time limit for each attempt, in ms. A timed-out attempt is not retried, unless the retry
   * option `retryAttemptTimeouts` is on (idempotent requests only).
   */
  attemptTimeoutMs?: number;
  /**
   * When a time limit the caller enforces itself (through `signal`) runs out, in ms since the
   * epoch (as `Date.now()`): for example one `timeoutMs` for several requests. It doesn't abort
   * anything; like `timeoutMs`, it stops the retry middleware from starting a wait that would end
   * after it, so the failed response is returned at once. With `timeoutMs` too, the earlier one
   * counts.
   */
  deadline?: number;
  signal?: AbortSignal;
  /** Correlation id for this request (sent as `x-ms-correlation-id`). A new one is generated when omitted. */
  correlationId?: string;
  /**
   * Per-request middleware overrides, e.g.
   * `new MiddlewareRequestOptions([{ type: "retry", maxRetries: 0 }])`.
   */
  middlewareOptions?: import("../middleware/RequestOptions.js").RequestOptions;
  /**
   * Replaying the request can't apply it twice, whatever its method: for example a `$batch` POST
   * that only carries GETs. The retry middleware then treats it like a GET (retries it after a
   * 502/503/504 or a dropped connection). Leave it unset unless that is certain.
   */
  idempotent?: boolean;
}

export interface FetchProvider {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

export interface RequestAdapter {
  send(request: RequestInformation, ctx?: MiddlewareContext): Promise<Response>;
}

export interface TokenOptions {
  /**
   * Claims from a Conditional Access / CAE challenge (decoded JSON), to pass to the identity
   * library (MSAL `claims`). Set by the SDK after a 401 carrying a claims challenge.
   */
  claims?: string;
  tenantId?: string;
  /** The SDK's correlation id for the request, for the identity library's logs. */
  correlationId?: string;
  /**
   * Skip any cached token and get a new one. Set by the SDK after a 401 without a claims
   * challenge (expired or revoked token).
   */
  forceRefresh?: boolean;
}

export interface AccessTokenProvider {
  /**
   * @param scopes - Scopes to request. When omitted, the provider uses its configured default scopes.
   */
  getToken(scopes?: string | string[], options?: TokenOptions): Promise<string>;
}

export interface Logger {
  debug(message: string, meta?: unknown): void;
  info(message: string, meta?: unknown): void;
  warn(message: string, meta?: unknown): void;
  error(message: string, meta?: unknown): void;
}

/**
 * One Dataverse request attempt. `TelemetryClient.startDependency` receives what is known when
 * the attempt starts (`target`, `method`, `url`, `properties`); `DependencyHandle.end` receives
 * the whole record, with `durationMs`, `success` and `resultCode`.
 */
export interface DependencyTelemetry {
  /** Host of the request URL. */
  target?: string;
  method?: string;
  /** The request URL, redacted with the client's `redactUrl` (see `DataverseClientOptions`). */
  url?: string;
  durationMs?: number;
  /** `false` for a status of 400 or more, or when no response came back. */
  success?: boolean;
  /** The response status, as a string, when there was a response. */
  resultCode?: string;
  properties?: Record<string, string>;
}

/**
 * A dependency in flight, as `TelemetryClient.startDependency` returns it. The SDK calls `end`
 * exactly once, when the attempt has a response or has failed.
 */
export interface DependencyHandle {
  /**
   * W3C Trace Context headers for this dependency (`traceparent`, and `tracestate` when there is
   * one), so the service sees the attempt as a child of it. The SDK sends them only to origins
   * that may receive the access token, unless `diagnosticHeaders.traceContext` is `false`; other
   * names, and a malformed `traceparent`, are ignored.
   */
  headers?: Record<string, string>;
  /**
   * Run the attempt (`fn`) with this dependency as the active span or operation, so work done
   * during it (for example `fetch` instrumentation) is its child. Must call `fn` once and return
   * its result. Without `run` the attempt runs in the caller's context.
   */
  run?<T>(fn: () => Promise<T>): Promise<T>;
  /** The attempt finished: the full record, with `durationMs`, `success` and `resultCode`. */
  end(data: DependencyTelemetry): void;
}

/**
 * Receives the SDK's telemetry (`DataverseClientOptions.telemetry`). The SDK guards every call: a
 * method that throws is logged with `logger.warn` and ignored, and never fails a request.
 */
export interface TelemetryClient {
  /**
   * A named event: throttling, retries, waits for a concurrency slot and `$batch` executions
   * (see `TelemetryEvents`), or your own. String properties, numeric measurements.
   */
  trackEvent(
    name: string,
    props?: Record<string, string>,
    measurements?: Record<string, number>
  ): void;
  /**
   * A request attempt starts (one per attempt: each retry and each resend after a 401 is its own
   * dependency). Called in the caller's context, before the attempt is sent; the returned handle
   * can carry trace context headers and make the dependency active while the attempt runs.
   */
  startDependency(name: string, data: DependencyTelemetry): DependencyHandle;
  trackException(error: unknown, props?: Record<string, string>): void;
}

export interface MiddlewareContext {
  logger?: Logger;
  telemetry?: TelemetryClient;
  correlationId?: string;
  /** Used by retry middleware for diagnostics */
  attempt?: number;
  /**
   * When the request's `timeoutMs` (or its `deadline`, if earlier) runs out, in ms since the epoch
   * (as `Date.now()`); unset without either. The retry middleware doesn't start a wait that would end after it: it returns the
   * response (or throws the network error) at once instead.
   */
  deadline?: number;
  /**
   * Per-request middleware options
   * Allows individual requests to override middleware behavior
   */
  middlewareOptions?: import("../middleware/RequestOptions.js").RequestOptions;
  /**
   * Feature usage tracker for telemetry
   */
  featureTracker?: import("../telemetry/FeatureUsageTracker.js").FeatureUsageTracker;
}
