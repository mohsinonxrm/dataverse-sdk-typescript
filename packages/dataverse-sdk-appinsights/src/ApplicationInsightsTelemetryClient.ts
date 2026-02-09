import type { TelemetryClient } from "@mohsinonxrm/dataverse-sdk-core";
import type { ApplicationInsightsConfig } from "./types.js";

/**
 * Application Insights implementation of TelemetryClient interface
 *
 * @example
 * ```typescript
 * const telemetryClient = new ApplicationInsightsTelemetryClient({
 *   connectionString: "InstrumentationKey=...",
 *   cloudRoleName: "my-dataverse-app"
 * });
 *
 * const client = new DataverseClient({
 *   baseUrl: "https://org.crm.dynamics.com",
 *   telemetryClient
 * });
 * ```
 */
export class ApplicationInsightsTelemetryClient implements TelemetryClient {
  constructor(private config: ApplicationInsightsConfig) {
    // TODO: Initialize @azure/monitor-opentelemetry
  }

  trackEvent(
    _name: string,
    _props?: Record<string, string>,
    _measurements?: Record<string, number>
  ): void {
    throw new Error("ApplicationInsightsTelemetryClient.trackEvent not implemented");
  }

  trackDependency(
    _name: string,
    _data: {
      target?: string;
      method?: string;
      url?: string;
      durationMs?: number;
      success?: boolean;
      resultCode?: string;
      properties?: Record<string, string>;
    }
  ): void {
    throw new Error("ApplicationInsightsTelemetryClient.trackDependency not implemented");
  }

  trackException(_error: unknown, _props?: Record<string, string>): void {
    throw new Error("ApplicationInsightsTelemetryClient.trackException not implemented");
  }
}
