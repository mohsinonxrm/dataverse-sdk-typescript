import type { Tracer, TracerProvider } from "@opentelemetry/api";
import type { Logger, LoggerProvider } from "@opentelemetry/api-logs";

/**
 * Configuration options for {@link ApplicationInsightsTelemetryClient}.
 *
 * The adapter emits OpenTelemetry spans and log records; the Azure Monitor OpenTelemetry
 * distro (`@azure/monitor-opentelemetry`) exports them to Application Insights. Either call
 * `useAzureMonitor()` in your app (recommended) and omit `connectionString`, or pass
 * `connectionString` and let the adapter call `useAzureMonitor()` for you. Not both.
 */
export interface ApplicationInsightsConfig {
  /**
   * Application Insights connection string. When set, the adapter calls
   * `useAzureMonitor({ azureMonitorExporterOptions: { connectionString } })` once per process.
   * Omit it when your app already calls `useAzureMonitor()`.
   *
   * Needs the optional peer dependency `@azure/monitor-opentelemetry` (and
   * `@opentelemetry/resources` with `cloudRoleName`); without it the constructor throws a
   * `DataverseInvalidRequestError` naming the package to install.
   */
  connectionString?: string;

  /**
   * Cloud role name (`service.name`). Only used together with `connectionString`; when your app
   * calls `useAzureMonitor()` itself, set it on that call's `resource` or with `OTEL_SERVICE_NAME`.
   */
  cloudRoleName?: string;

  /**
   * Tracer for dependency and exception spans. Takes precedence over `tracerProvider`.
   * Defaults to the global tracer provider, which `useAzureMonitor()` registers.
   */
  tracer?: Tracer;

  /** Tracer provider to get the tracer from. Defaults to the global provider. */
  tracerProvider?: TracerProvider;

  /**
   * Logger for custom events. Takes precedence over `loggerProvider`.
   * Defaults to the global logger provider, which `useAzureMonitor()` registers.
   */
  logger?: Logger;

  /** Logger provider to get the logger from. Defaults to the global provider. */
  loggerProvider?: LoggerProvider;

  /**
   * Turn every method into a no-op and skip `useAzureMonitor()` (defaults to false).
   */
  disableTelemetry?: boolean;
}
