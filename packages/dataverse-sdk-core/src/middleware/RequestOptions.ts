/**
 * @fileoverview Per-request middleware options pattern inspired by msgraph-sdk-javascript
 * Allows fluent API: client.api('/accounts').options({ retry: {...}, concurrency: {...} })
 */

/**
 * Base interface for middleware-specific options
 * This is intentionally empty to act as a marker interface
 * that specific middleware options extend
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MiddlewareOptions {
  // Marker interface - specific middleware options extend this
}

/**
 * Retry middleware options for per-request overrides
 */
export interface RetryOptions extends MiddlewareOptions {
  /**
   * Maximum number of retry attempts
   * @default 3
   */
  maxRetries?: number;

  /**
   * Delay between retries in milliseconds
   * @default 1000
   */
  delay?: number;

  /**
   * Whether to use exponential backoff
   * @default true
   */
  useExponentialBackoff?: boolean;

  /**
   * HTTP status codes that should trigger a retry
   * @default [429, 503, 504]
   */
  retryableStatusCodes?: number[];

  /**
   * Custom function to determine if a request should be retried
   */
  shouldRetry?: (statusCode: number, error?: Error) => boolean;
}

/**
 * Concurrency middleware options for per-request overrides
 */
export interface ConcurrencyOptions extends MiddlewareOptions {
  /**
   * Maximum number of concurrent requests
   * If not specified, uses client-level default
   */
  maxConcurrent?: number;

  /**
   * Whether to bypass concurrency limiting for this request
   * @default false
   */
  bypass?: boolean;
}

/**
 * Telemetry middleware options for per-request overrides
 */
export interface TelemetryOptions extends MiddlewareOptions {
  /**
   * Whether to disable telemetry for this specific request
   * @default false
   */
  disable?: boolean;

  /**
   * Custom properties to add to telemetry for this request
   */
  customProperties?: Record<string, string | number | boolean>;
}

/**
 * Logging middleware options for per-request overrides
 */
export interface LoggingOptions extends MiddlewareOptions {
  /**
   * Whether to disable logging for this specific request
   * @default false
   */
  disable?: boolean;

  /**
   * Custom log level for this request
   */
  logLevel?: "debug" | "info" | "warn" | "error";
}

/**
 * Container for per-request middleware options
 * Uses constructor reference as key for type-safe retrieval (msgraph pattern)
 *
 * @example
 * ```typescript
 * const options = new RequestOptions([
 *   { type: 'retry', maxRetries: 5, delay: 2000 },
 *   { type: 'concurrency', bypass: true }
 * ]);
 *
 * // In middleware:
 * const retryOpts = requestOptions.get('retry');
 * ```
 */
export class RequestOptions {
  private optionsMap: Map<string, MiddlewareOptions> = new Map<string, MiddlewareOptions>();

  constructor(options?: Array<{ type: string } & MiddlewareOptions>) {
    if (options) {
      for (const option of options) {
        const { type, ...rest } = option;
        this.optionsMap.set(type, rest);
      }
    }
  }

  /**
   * Get middleware-specific options by middleware type
   * @param middlewareType - The middleware type ('retry', 'concurrency', 'telemetry', 'logging')
   * @returns The middleware options or undefined if not set
   */
  get(middlewareType: string): MiddlewareOptions | undefined {
    return this.optionsMap.get(middlewareType);
  }

  /**
   * Set middleware-specific options
   * @param middlewareType - The middleware type
   * @param options - The options to set
   */
  set(middlewareType: string, options: MiddlewareOptions): void {
    this.optionsMap.set(middlewareType, options);
  }

  /**
   * Check if options are set for a specific middleware
   * @param middlewareType - The middleware type
   * @returns True if options are set
   */
  has(middlewareType: string): boolean {
    return this.optionsMap.has(middlewareType);
  }

  /**
   * Remove options for a specific middleware
   * @param middlewareType - The middleware type
   */
  delete(middlewareType: string): boolean {
    return this.optionsMap.delete(middlewareType);
  }

  /**
   * Clear all middleware options
   */
  clear(): void {
    this.optionsMap.clear();
  }
}
