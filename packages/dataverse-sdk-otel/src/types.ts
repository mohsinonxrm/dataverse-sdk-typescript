import type { Tracer } from "@opentelemetry/api";

/**
 * Configuration options for OpenTelemetry client
 */
export interface OpenTelemetryConfig {
  /**
   * OpenTelemetry tracer instance
   */
  tracer: Tracer;

  /**
   * Optional service name for spans
   */
  serviceName?: string;

  /**
   * Whether to disable telemetry (defaults to false)
   */
  disableTelemetry?: boolean;
}
