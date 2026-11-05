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

export interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  jitter?: boolean;
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
  logger?: import("./http.js").Logger;
  telemetry?: import("./http.js").TelemetryClient;
  retry?: RetryOptions;
  concurrency?: ConcurrencyOptions;
  circuitBreaker?: CircuitBreakerOptions;
  bulkhead?: BulkheadOptions;
  defaultHeaders?: Record<string, string>;
  defaultPrefer?: PreferOption[];
}
