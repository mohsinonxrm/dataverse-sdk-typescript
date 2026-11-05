import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import { trace } from "@opentelemetry/api";
import type { Tracer } from "@opentelemetry/api";
import { logs, SeverityNumber } from "@opentelemetry/api-logs";
import type { LogAttributes, Logger } from "@opentelemetry/api-logs";
import { resourceFromAttributes } from "@opentelemetry/resources";
import type { TelemetryClient } from "@mohsinonxrm/dataverse-sdk-core";
import type { ApplicationInsightsConfig } from "./types.js";
import {
  propertyAttributes,
  recordDependencySpan,
  toException,
  type DependencyData,
} from "./spans.js";

const INSTRUMENTATION_SCOPE = "@mohsinonxrm/dataverse-sdk-appinsights";

/** Attribute the Azure Monitor exporter maps to an Application Insights custom event name. */
const CUSTOM_EVENT_NAME = "microsoft.custom_event.name";
/** Attribute the Azure Monitor exporter reads custom event measurements from (JSON object). */
const CUSTOM_MEASUREMENTS = "microsoft.custom_measurements";

let azureMonitorStarted = false;

/**
 * Application Insights implementation of the SDK's `TelemetryClient`, built on the Azure Monitor
 * OpenTelemetry distro (`@azure/monitor-opentelemetry`, Node.js only).
 *
 * - `trackDependency` records an OpenTelemetry CLIENT span per Dataverse HTTP call, which
 *   Application Insights shows as an HTTP dependency (URL query values redacted).
 * - `trackEvent` emits a log record that Application Insights stores as a custom event.
 * - `trackException` emits a log record that Application Insights stores as an exception.
 *
 * No method ever throws: a telemetry failure must not break a Dataverse request.
 *
 * @example
 * ```typescript
 * import { useAzureMonitor } from "@azure/monitor-opentelemetry";
 *
 * useAzureMonitor({
 *   azureMonitorExporterOptions: { connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING },
 * });
 *
 * const client = new DataverseClient({
 *   baseUrl: "https://org.crm.dynamics.com",
 *   tokenProvider,
 *   telemetry: new ApplicationInsightsTelemetryClient(),
 * });
 * ```
 */
export class ApplicationInsightsTelemetryClient implements TelemetryClient {
  private readonly config: ApplicationInsightsConfig;

  constructor(config: ApplicationInsightsConfig = {}) {
    this.config = config;
    if (config.connectionString && !config.disableTelemetry && !azureMonitorStarted) {
      useAzureMonitor({
        azureMonitorExporterOptions: { connectionString: config.connectionString },
        ...(config.cloudRoleName
          ? { resource: resourceFromAttributes({ "service.name": config.cloudRoleName }) }
          : {}),
      });
      azureMonitorStarted = true;
    }
  }

  trackEvent(
    name: string,
    props?: Record<string, string>,
    measurements?: Record<string, number>
  ): void {
    if (this.config.disableTelemetry) return;
    try {
      const attributes: LogAttributes = {
        ...propertyAttributes(props),
        [CUSTOM_EVENT_NAME]: name,
      };
      const numeric = finiteMeasurements(measurements);
      if (numeric) attributes[CUSTOM_MEASUREMENTS] = JSON.stringify(numeric);
      this.logger().emit({ severityNumber: SeverityNumber.INFO, attributes });
    } catch {
      // Telemetry must never break the caller.
    }
  }

  trackDependency(name: string, data: DependencyData): void {
    if (this.config.disableTelemetry) return;
    try {
      recordDependencySpan(this.tracer(), name, data);
    } catch {
      // Telemetry must never break the caller.
    }
  }

  trackException(error: unknown, props?: Record<string, string>): void {
    if (this.config.disableTelemetry) return;
    try {
      const exception = toException(error);
      this.logger().emit({
        severityNumber: SeverityNumber.ERROR,
        severityText: "ERROR",
        body: exception.message,
        attributes: {
          ...propertyAttributes(props),
          "exception.type": exception.name,
          "exception.message": exception.message,
          // The exporter only maps a record to an exception when it has a stack trace.
          "exception.stacktrace": exception.stack ?? `${exception.name}: ${exception.message}`,
        },
      });
    } catch {
      // Telemetry must never break the caller.
    }
  }

  private tracer(): Tracer {
    return (
      this.config.tracer ?? (this.config.tracerProvider ?? trace).getTracer(INSTRUMENTATION_SCOPE)
    );
  }

  private logger(): Logger {
    return (
      this.config.logger ?? (this.config.loggerProvider ?? logs).getLogger(INSTRUMENTATION_SCOPE)
    );
  }
}

function finiteMeasurements(
  measurements: Record<string, number> | undefined
): Record<string, number> | undefined {
  if (!measurements) return undefined;
  const result: Record<string, number> = {};
  let any = false;
  for (const [key, value] of Object.entries(measurements as Record<string, unknown>)) {
    if (typeof value === "number" && Number.isFinite(value)) {
      result[key] = value;
      any = true;
    }
  }
  return any ? result : undefined;
}
