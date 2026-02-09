import type { TelemetryClient } from "@mohsinonxrm/dataverse-sdk-core";
import type { OpenTelemetryConfig } from "./types.js";

/**
 * OpenTelemetry implementation of TelemetryClient interface
 *
 * @example
 * ```typescript
 * import { trace } from "@opentelemetry/api";
 *
 * const tracer = trace.getTracer("dataverse-sdk");
 * const telemetryClient = new OpenTelemetryClient({
 *   tracer,
 *   serviceName: "my-dataverse-app"
 * });
 *
 * const client = new DataverseClient({
 *   baseUrl: "https://org.crm.dynamics.com",
 *   telemetryClient
 * });
 * ```
 */
export class OpenTelemetryClient implements TelemetryClient {
  constructor(private config: OpenTelemetryConfig) {}

  trackEvent(
    _name: string,
    _props?: Record<string, string>,
    _measurements?: Record<string, number>
  ): void {
    throw new Error("OpenTelemetryClient.trackEvent not implemented");
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
    throw new Error("OpenTelemetryClient.trackDependency not implemented");
  }

  trackException(_error: unknown, _props?: Record<string, string>): void {
    throw new Error("OpenTelemetryClient.trackException not implemented");
  }
}
