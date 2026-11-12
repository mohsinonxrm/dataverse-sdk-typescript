/**
 * @fileoverview Per-request middleware options pattern inspired by msgraph-sdk-javascript
 * Allows fluent API: client.api('/accounts').options({ retry: {...}, concurrency: {...} })
 */

import type { RetryOptions } from "../abstractions/options.js";
import type { LogLevel } from "../utils/consoleLogger.js";
import type { AdaptiveThrottlingRequestOptions } from "./AdaptiveThrottlingMiddleware.js";
import type { BulkheadRequestOptions } from "./BulkheadMiddleware.js";
import type { ChaosRequestOptions } from "./ChaosMiddleware.js";
import type { CircuitBreakerRequestOptions } from "./CircuitBreakerMiddleware.js";

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
 * Per-request concurrency options. The limit itself is the client's (`DataverseClientOptions.concurrency`).
 */
export interface ConcurrencyOptions extends MiddlewareOptions {
  /**
   * Send this request without waiting for a concurrency slot, and without taking one.
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
  logLevel?: LogLevel;
}

/**
 * The per-request options of each built-in middleware, keyed by the `type` of its entry in
 * `MiddlewareRequestOptions` (and by the key `get`, `set`, `has` and `delete` take).
 */
export interface BuiltInMiddlewareOptions {
  /** `RetryMiddleware`: overrides the client's `retry` settings for this request. */
  retry: RetryOptions;
  /** `ConcurrencyMiddleware`: `bypass` the client's concurrency limit. */
  concurrency: ConcurrencyOptions;
  /** `TelemetryMiddleware`: `disable` it, or add `customProperties`. */
  telemetry: TelemetryOptions;
  /** `LoggingMiddleware`: `disable` it (a `logLevel` other than `"debug"` silences it too). */
  logging: LoggingOptions;
  /** `ChaosMiddleware`: `disable` it, or force a `fault`. */
  chaos: ChaosRequestOptions;
  /** `BulkheadMiddleware`: count the request in another `category`, or `bypass` the bulkhead. */
  bulkhead: BulkheadRequestOptions;
  /** `CircuitBreakerMiddleware`: `bypass` the circuit. */
  circuitBreaker: CircuitBreakerRequestOptions;
  /** `AdaptiveThrottlingMiddleware`: `bypass` the spacing and the pause after a 429. */
  adaptiveThrottling: AdaptiveThrottlingRequestOptions;
}

/**
 * A middleware type, as `MiddlewareRequestOptions.get`, `set`, `has` and `delete` take it: one of
 * the built-in types (suggested by the editor), or any other string for custom middleware.
 */
export type MiddlewareOptionKey = keyof BuiltInMiddlewareOptions | (string & {});

/**
 * One entry passed to the `MiddlewareRequestOptions` constructor: the built-in middleware types
 * take their options (`BuiltInMiddlewareOptions`), and any other `type` (for custom middleware)
 * takes arbitrary fields. The constructor checks each built-in entry against its options (see
 * `CheckedMiddlewareOptionEntry`).
 */
export type MiddlewareOptionEntry =
  | ({ type: "retry" } & RetryOptions)
  | ({ type: "concurrency" } & ConcurrencyOptions)
  | ({ type: "telemetry" } & TelemetryOptions)
  | ({ type: "logging" } & LoggingOptions)
  | ({ type: "chaos" } & ChaosRequestOptions)
  | ({ type: "bulkhead" } & BulkheadRequestOptions)
  | ({ type: "circuitBreaker" } & CircuitBreakerRequestOptions)
  | ({ type: "adaptiveThrottling" } & AdaptiveThrottlingRequestOptions)
  | ({ type: string } & Record<string, unknown>);

/**
 * What the `MiddlewareRequestOptions` constructor accepts for an entry `E`: for a built-in `type`,
 * its options and no other field (a misspelt or mistyped field is a compile error); for any other
 * `type`, `E` as it is. Without this, an entry such as `{ type: "retry", maxRetriez: 5 }` would
 * pass as a custom middleware's entry.
 */
export type CheckedMiddlewareOptionEntry<E> = E extends { type: infer T }
  ? T extends keyof BuiltInMiddlewareOptions
    ? { type: T } & BuiltInMiddlewareOptions[T] &
        Partial<Record<Exclude<keyof E, "type" | keyof BuiltInMiddlewareOptions[T]>, never>>
    : E
  : E;

/**
 * Per-request middleware options (exported as `MiddlewareRequestOptions`): one entry per
 * middleware type. Each built-in middleware reads its own (`BuiltInMiddlewareOptions`); custom
 * middleware can read theirs with `get`.
 *
 * The type parameter `E` is inferred from the constructor's entries, to check them; leave it out
 * when you write the type.
 *
 * @example
 * ```typescript
 * const options = new MiddlewareRequestOptions([
 *   { type: "retry", maxRetries: 5, baseDelayMs: 2000 },
 *   { type: "concurrency", bypass: true },
 *   { type: "chaos", disable: true },
 *   { type: "myMiddleware", anything: 1 }, // custom middleware: any fields
 * ]);
 *
 * // In middleware:
 * const retryOpts = options.get("retry"); // RetryOptions | undefined
 * ```
 */
export class RequestOptions<E extends MiddlewareOptionEntry = MiddlewareOptionEntry> {
  private optionsMap: Map<string, MiddlewareOptions> = new Map<string, MiddlewareOptions>();

  constructor(options?: ReadonlyArray<E & CheckedMiddlewareOptionEntry<E>>) {
    if (options) {
      for (const option of options) {
        const { type, ...rest } = option;
        this.optionsMap.set(type, rest);
      }
    }
  }

  /**
   * Get middleware-specific options by middleware type
   * @param middlewareType - The middleware type, e.g. `"retry"` or `"chaos"`
   * @returns The middleware options or undefined if not set
   */
  get<K extends keyof BuiltInMiddlewareOptions>(
    middlewareType: K
  ): BuiltInMiddlewareOptions[K] | undefined;
  get(middlewareType: MiddlewareOptionKey): MiddlewareOptions | undefined;
  get(middlewareType: string): MiddlewareOptions | undefined {
    return this.optionsMap.get(middlewareType);
  }

  /**
   * Set middleware-specific options; a built-in type takes its own options
   * (`BuiltInMiddlewareOptions`).
   * @param middlewareType - The middleware type
   * @param options - The options to set
   */
  set<K extends MiddlewareOptionKey>(
    middlewareType: K,
    options: K extends keyof BuiltInMiddlewareOptions
      ? BuiltInMiddlewareOptions[K]
      : MiddlewareOptions
  ): void {
    this.optionsMap.set(middlewareType, options);
  }

  /**
   * Check if options are set for a specific middleware
   * @param middlewareType - The middleware type
   * @returns True if options are set
   */
  has(middlewareType: MiddlewareOptionKey): boolean {
    return this.optionsMap.has(middlewareType);
  }

  /**
   * Remove options for a specific middleware
   * @param middlewareType - The middleware type
   */
  delete(middlewareType: MiddlewareOptionKey): boolean {
    return this.optionsMap.delete(middlewareType);
  }

  /**
   * Clear all middleware options
   */
  clear(): void {
    this.optionsMap.clear();
  }
}
