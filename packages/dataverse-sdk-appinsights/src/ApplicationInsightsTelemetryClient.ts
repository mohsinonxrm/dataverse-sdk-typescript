import { trace } from "@opentelemetry/api";
import type { Tracer } from "@opentelemetry/api";
import { logs, SeverityNumber } from "@opentelemetry/api-logs";
import type { LogAttributes, Logger } from "@opentelemetry/api-logs";
import type { DependencyTelemetry, TelemetryClient } from "@mohsinonxrm/dataverse-sdk-core";
import type { ApplicationInsightsConfig } from "./types.js";
import { azureMonitor, otelResources, requirePeer } from "./optionalPeers.js";
import {
  propertyAttributes,
  recordDependencySpan,
  toException,
} from "./spans.js";

const INSTRUMENTATION_SCOPE = "@mohsinonxrm/dataverse-sdk-appinsights";

/** Attribute the Azure Monitor exporter maps to an Application Insights custom event name. */
const CUSTOM_EVENT_NAME = "microsoft.custom_event.name";
/** Attribute the Azure Monitor exporter reads custom event measurements from (JSON object). */
const CUSTOM_MEASUREMENTS = "microsoft.custom_measurements";

/**
 * The connection string the adapter started Azure Monitor with; `useAzureMonitor()` registers
 * global providers, so it runs once per process.
 */
let azureMonitorConnectionString: string | undefined;
/** Whether the console warning about a second connection string was already written. */
let warnedOnConsole = false;

const OTHER_CONNECTION_STRING_WARNING =
  "ApplicationInsightsTelemetryClient: Azure Monitor was already started in this process with a " +
  "different connectionString. This client's connectionString and cloudRoleName are ignored, " +
  "and its telemetry goes to the first resource. To send to several resources, set up " +
  "OpenTelemetry yourself and pass each client its own tracerProvider and loggerProvider.";

/**
 * Application Insights implementation of the SDK's `TelemetryClient`, built on the Azure Monitor
 * OpenTelemetry distro (`@azure/monitor-opentelemetry`, Node.js only).
 *
 * - `trackDependency` records an OpenTelemetry CLIENT span per Dataverse HTTP call, which
 *   Application Insights shows as an HTTP dependency (URL as core redacted it with the app's
 *   `redactUrl`). The span is recorded after the call, so it is never active during it: the
 *   adapter propagates no `traceparent`.
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
    if (!config.connectionString || config.disableTelemetry) return;
    if (azureMonitorConnectionString !== undefined) {
      if (config.connectionString !== azureMonitorConnectionString) {
        this.warnOtherConnectionString();
      }
    } else {
      const { useAzureMonitor } = requirePeer(azureMonitor(), "connectionString");
      const resource = config.cloudRoleName
        ? requirePeer(otelResources(), "cloudRoleName").resourceFromAttributes({
            "service.name": config.cloudRoleName,
          })
        : undefined;
      useAzureMonitor({
        azureMonitorExporterOptions: { connectionString: config.connectionString },
        ...(resource ? { resource } : {}),
      });
      azureMonitorConnectionString = config.connectionString;
    }
  }

  /**
   * A later client can't redirect the process-wide Azure Monitor setup: say so through the
   * configured logger, or else once on the console. The connection strings are never logged.
   */
  private warnOtherConnectionString(): void {
    try {
      if (this.config.logger || this.config.loggerProvider) {
        this.logger().emit({
          severityNumber: SeverityNumber.WARN,
          severityText: "WARN",
          body: OTHER_CONNECTION_STRING_WARNING,
        });
        return;
      }
      if (!warnedOnConsole) {
        warnedOnConsole = true;
        console.warn(OTHER_CONNECTION_STRING_WARNING);
      }
    } catch {
      // Telemetry must never break the caller.
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

  trackDependency(name: string, data: DependencyTelemetry): void {
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
