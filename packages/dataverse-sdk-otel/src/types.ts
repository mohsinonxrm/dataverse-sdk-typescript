import type { Tracer, TracerProvider } from "@opentelemetry/api";

/**
 * Configuration options for {@link OpenTelemetryClient}.
 *
 * All options are optional. Without `tracer` or `tracerProvider` the adapter uses the global
 * tracer provider (`trace.getTracer(...)`), so spans go wherever your OpenTelemetry SDK exports.
 */
export interface OpenTelemetryConfig {
  /**
   * Tracer used for every span. Takes precedence over `tracerProvider`.
   */
  tracer?: Tracer;

  /**
   * Tracer provider to get the tracer from (instrumentation scope
   * `@mohsinonxrm/dataverse-sdk-otel`). Defaults to the global provider.
   */
  tracerProvider?: TracerProvider;

  /**
   * @deprecated Ignored. `service.name` is a resource attribute: set it on your SDK
   * (for example `new NodeSDK({ serviceName })` or the `OTEL_SERVICE_NAME` environment variable).
   */
  serviceName?: string;

  /**
   * Turn every method into a no-op (defaults to false).
   */
  disableTelemetry?: boolean;
}
