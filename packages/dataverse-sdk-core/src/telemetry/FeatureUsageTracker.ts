/**
 * @fileoverview Feature usage telemetry with bitwise flags
 * Tracks which SDK features are used for analytics and diagnostics
 */

/**
 * Feature usage flags for telemetry
 * Uses bitwise OR to combine multiple flags efficiently
 *
 * A const object rather than a TypeScript `enum` (#479), so the SDK compiles under
 * `erasableSyntaxOnly` and Node's type stripping. `FeatureUsageFlag.RETRY_ENABLED` works as
 * before; the type {@link FeatureUsageFlag} is `number`, since flags combine.
 *
 * @example
 * ```typescript
 * const features = FeatureUsageFlag.RETRY_ENABLED | FeatureUsageFlag.CONCURRENCY_ENABLED;
 * // Result: 3 (binary: 11)
 *
 * // Check if retry is enabled:
 * if (features & FeatureUsageFlag.RETRY_ENABLED) {
 *   console.log('Retry is enabled');
 * }
 * ```
 */
export const FeatureUsageFlag = {
  /**
   * No features enabled (default)
   */
  NONE: 0,

  /**
   * Retry middleware is active
   */
  RETRY_ENABLED: 1,

  /**
   * Concurrency limiting is active
   */
  CONCURRENCY_ENABLED: 2,

  /**
   * Batch operations are being used
   */
  BATCH_ENABLED: 4,

  /**
   * Custom authentication provider
   */
  CUSTOM_AUTH: 8,

  /**
   * Telemetry is enabled
   */
  TELEMETRY_ENABLED: 16,

  /**
   * Logging is enabled
   */
  LOGGING_ENABLED: 32,

  /**
   * Per-request options override
   */
  REQUEST_OPTIONS_OVERRIDE: 64,

  /**
   * Paging/iteration is being used
   */
  PAGING_ENABLED: 128,

  /**
   * File/image operations
   */
  FILE_OPERATIONS: 256,

  /**
   * Metadata operations
   */
  METADATA_OPERATIONS: 512,

  /**
   * Discovery service usage
   */
  DISCOVERY_SERVICE: 1024,

  /**
   * XRM/OrganizationService facade
   */
  XRM_FACADE: 2048,

  /**
   * SDK Messages
   */
  SDK_MESSAGES: 4096,

  /**
   * Typed Actions
   */
  TYPED_ACTIONS: 8192,

  /**
   * Typed Functions
   */
  TYPED_FUNCTIONS: 16384,

  /**
   * Application Insights telemetry adapter
   */
  APPINSIGHTS_TELEMETRY: 32768,

  /**
   * OpenTelemetry adapter
   */
  OTEL_TELEMETRY: 65536,
} as const;

/**
 * A feature usage flag, or a combination of them (`|`): a number. The named flags are the members
 * of the {@link FeatureUsageFlag} object.
 */
export type FeatureUsageFlag = number;

/**
 * Helper class for managing feature usage flags
 */
export class FeatureUsageTracker {
  private flags: number = FeatureUsageFlag.NONE;

  /**
   * Add a feature flag
   * @param flag - The feature flag to add
   *
   * @example
   * ```typescript
   * tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED);
   * tracker.addFeature(FeatureUsageFlag.CONCURRENCY_ENABLED);
   * ```
   */
  addFeature(flag: FeatureUsageFlag): void {
    this.flags |= flag;
  }

  /**
   * Remove a feature flag
   * @param flag - The feature flag to remove
   */
  removeFeature(flag: FeatureUsageFlag): void {
    this.flags &= ~flag;
  }

  /**
   * Check if a feature is enabled
   * @param flag - The feature flag to check
   * @returns True if the feature is enabled
   *
   * @example
   * ```typescript
   * if (tracker.hasFeature(FeatureUsageFlag.RETRY_ENABLED)) {
   *   console.log('Retry is enabled');
   * }
   * ```
   */
  hasFeature(flag: FeatureUsageFlag): boolean {
    return (this.flags & flag) !== 0;
  }

  /**
   * Get all enabled feature flags as a number
   * @returns Combined feature flags
   *
   * @example
   * ```typescript
   * const flags = tracker.getFlags(); // Returns: 3 (RETRY | CONCURRENCY)
   * ```
   */
  getFlags(): number {
    return this.flags;
  }

  /**
   * Get feature flags as a hex string for headers
   * @returns Hex representation of flags
   *
   * @example
   * ```typescript
   * const hex = tracker.getFlagsHex(); // Returns: "0x0003"
   * ```
   */
  getFlagsHex(): string {
    return "0x" + this.flags.toString(16).toUpperCase().padStart(4, "0");
  }

  /**
   * Get list of enabled feature names for debugging
   * @returns Array of enabled feature names
   *
   * @example
   * ```typescript
   * const features = tracker.getEnabledFeatures();
   * // Returns: ['RETRY_ENABLED', 'CONCURRENCY_ENABLED']
   * ```
   */
  getEnabledFeatures(): string[] {
    return Object.entries(FeatureUsageFlag)
      .filter(([, flag]) => flag !== FeatureUsageFlag.NONE && this.hasFeature(flag))
      .map(([name]) => name);
  }

  /**
   * Reset all feature flags
   */
  reset(): void {
    this.flags = FeatureUsageFlag.NONE;
  }

  /**
   * Set flags from a number value
   * @param flags - The flags value to set
   */
  setFlags(flags: number): void {
    this.flags = flags;
  }

  /**
   * Create tracker from hex string
   * @param hex - Hex representation of flags (e.g., "0x0003")
   * @returns New FeatureUsageTracker instance
   */
  static fromHex(hex: string): FeatureUsageTracker {
    const tracker = new FeatureUsageTracker();
    tracker.setFlags(parseInt(hex, 16));
    return tracker;
  }

  /**
   * Merge flags from another tracker
   * @param other - Another tracker to merge from
   */
  merge(other: FeatureUsageTracker): void {
    this.flags |= other.getFlags();
  }
}

/**
 * Global feature usage tracker for the SDK
 * Singleton instance shared across the application
 */
let globalTracker: FeatureUsageTracker | undefined;

/**
 * Get the global feature usage tracker
 * Creates one if it doesn't exist
 */
export function getGlobalFeatureTracker(): FeatureUsageTracker {
  globalTracker ??= new FeatureUsageTracker();
  return globalTracker;
}

/**
 * Reset the global feature usage tracker
 * Useful for testing
 */
export function resetGlobalFeatureTracker(): void {
  globalTracker = new FeatureUsageTracker();
}
