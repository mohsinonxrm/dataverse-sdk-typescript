export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export interface RequestInformation {
  method: HttpMethod;
  /** Absolute URL */
  url: string;
  headers: Record<string, string>;
  /** Query parameters (will be URL-encoded) */
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  timeoutMs?: number;
  signal?: AbortSignal;
  /** Correlation id for this request (sent as `x-ms-correlation-id`). A new one is generated when omitted. */
  correlationId?: string;
  /**
   * Per-request middleware overrides, e.g.
   * `new MiddlewareRequestOptions([{ type: "retry", maxRetries: 0 }])`.
   */
  middlewareOptions?: import("../middleware/RequestOptions.js").RequestOptions;
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

export interface TelemetryClient {
  trackEvent(
    name: string,
    props?: Record<string, string>,
    measurements?: Record<string, number>
  ): void;
  trackDependency(
    name: string,
    data: {
      target?: string;
      method?: string;
      url?: string;
      durationMs?: number;
      success?: boolean;
      resultCode?: string;
      properties?: Record<string, string>;
    }
  ): void;
  trackException(error: unknown, props?: Record<string, string>): void;
}

export interface MiddlewareContext {
  logger?: Logger;
  telemetry?: TelemetryClient;
  correlationId?: string;
  /** Used by retry middleware for diagnostics */
  attempt?: number;
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
