import { SpanKind, trace } from "@opentelemetry/api";
import type { Attributes, Tracer } from "@opentelemetry/api";
import type { TelemetryClient } from "@mohsinonxrm/dataverse-sdk-core";
import type { OpenTelemetryConfig } from "./types.js";
import {
  propertyAttributes,
  recordDependencySpan,
  recordExceptionOnSpan,
  type DependencyData,
} from "./spans.js";

const INSTRUMENTATION_SCOPE = "@mohsinonxrm/dataverse-sdk-otel";

/**
 * OpenTelemetry implementation of the SDK's `TelemetryClient`.
 *
 * - `trackDependency` records a CLIENT span per Dataverse HTTP call with `http.request.method`,
 *   `url.full` (as core redacted it with the app's `redactUrl`), `server.address` (host name),
 *   `server.port`, `http.response.status_code`, `dataverse.correlation_id` and the other
 *   properties under `dataverse.*`. Failed calls (a 4xx/5xx status, or no response and
 *   `success: false`) get status ERROR and `error.type`. The span is recorded after the call, so
 *   it is never active during it: the adapter propagates no `traceparent`.
 * - `trackEvent` adds an event to the active span, or records a short INTERNAL span when no span
 *   is active.
 * - `trackException` records an INTERNAL `dataverse.exception` span (a child of the active span,
 *   if any) with the exception event, status ERROR and the properties as attributes.
 *
 * No method ever throws: a telemetry failure must not break a Dataverse request.
 *
 * @example
 * ```typescript
 * import { trace } from "@opentelemetry/api";
 *
 * const client = new DataverseClient({
 *   baseUrl: "https://org.crm.dynamics.com",
 *   tokenProvider,
 *   telemetry: new OpenTelemetryClient({ tracer: trace.getTracer("my-app") }),
 * });
 * ```
 */
export class OpenTelemetryClient implements TelemetryClient {
  private readonly config: OpenTelemetryConfig;

  constructor(config: OpenTelemetryConfig = {}) {
    this.config = config;
  }

  trackEvent(
    name: string,
    props?: Record<string, string>,
    measurements?: Record<string, number>
  ): void {
    if (this.config.disableTelemetry) return;
    try {
      const attributes: Attributes = {
        ...propertyAttributes(props),
        ...measurementAttributes(measurements),
      };
      const active = trace.getActiveSpan();
      if (active?.isRecording()) {
        active.addEvent(name, attributes);
        return;
      }
      this.tracer().startSpan(name, { kind: SpanKind.INTERNAL, attributes }).end();
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
      const span = this.tracer().startSpan("dataverse.exception", {
        kind: SpanKind.INTERNAL,
        attributes: propertyAttributes(props),
      });
      recordExceptionOnSpan(span, error);
      span.end();
    } catch {
      // Telemetry must never break the caller.
    }
  }

  private tracer(): Tracer {
    return (
      this.config.tracer ?? (this.config.tracerProvider ?? trace).getTracer(INSTRUMENTATION_SCOPE)
    );
  }
}

function measurementAttributes(measurements: Record<string, number> | undefined): Attributes {
  const attributes: Attributes = {};
  if (!measurements) return attributes;
  for (const [key, value] of Object.entries(measurements as Record<string, unknown>)) {
    if (typeof value === "number" && Number.isFinite(value)) {
      attributes[key.startsWith("dataverse.") ? key : `dataverse.${key}`] = value;
    }
  }
  return attributes;
}
