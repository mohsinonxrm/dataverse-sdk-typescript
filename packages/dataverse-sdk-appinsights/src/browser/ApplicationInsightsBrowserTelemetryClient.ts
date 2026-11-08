import type {
  DependencyHandle,
  DependencyTelemetry,
  TelemetryClient,
} from "@mohsinonxrm/dataverse-sdk-core";
import { propertyAttributes, toException } from "../redaction.js";
import type { ApplicationInsightsBrowserConfig } from "./types.js";

/** A handle that records nothing, for a disabled adapter or a dependency that couldn't start. */
const NO_DEPENDENCY: DependencyHandle = Object.freeze({ end: () => undefined });

/** `eSeverityLevel.Error` of `@microsoft/applicationinsights-web`. */
const SEVERITY_ERROR = 3;

/**
 * Application Insights implementation of the SDK's `TelemetryClient` for browsers, on the app's
 * own `ApplicationInsights` instance from `@microsoft/applicationinsights-web`. Import it from
 * `@mohsinonxrm/dataverse-sdk-appinsights/browser`.
 *
 * - `startDependency` / `end` record one `Fetch` dependency per Dataverse request attempt with
 *   `trackDependencyData`: the URL as core redacted it with the app's `redactUrl`, the host as
 *   target, `dataverse.correlation_id` and the SDK's other properties under `dataverse.*`. The
 *   dependency joins the page's current operation. With `propagateTraceContext`, the request
 *   carries a W3C `traceparent` naming this dependency.
 * - `trackEvent` → `trackEvent` (measurements become custom measurements).
 * - `trackException` → `trackException`, with URLs in the message and stack redacted.
 *
 * No method ever throws: a telemetry failure must not break a Dataverse request.
 *
 * @example
 * ```typescript
 * import { ApplicationInsights } from "@microsoft/applicationinsights-web";
 * import { ApplicationInsightsBrowserTelemetryClient } from "@mohsinonxrm/dataverse-sdk-appinsights/browser";
 *
 * const appInsights = new ApplicationInsights({ config: { connectionString } });
 * appInsights.loadAppInsights();
 *
 * const client = new DataverseClient({
 *   baseUrl: "https://org.crm.dynamics.com",
 *   tokenProvider,
 *   telemetry: new ApplicationInsightsBrowserTelemetryClient({ appInsights }),
 * });
 * ```
 */
export class ApplicationInsightsBrowserTelemetryClient implements TelemetryClient {
  private readonly config: ApplicationInsightsBrowserConfig;

  constructor(config: ApplicationInsightsBrowserConfig) {
    this.config = config;
  }

  trackEvent(
    name: string,
    props?: Record<string, string>,
    measurements?: Record<string, number>
  ): void {
    if (this.config.disableTelemetry) return;
    try {
      const numeric = finiteMeasurements(measurements);
      this.config.appInsights.trackEvent({
        name,
        properties: propertyAttributes(props),
        // Custom measurements keep the numbers numeric, in the same column the Node adapter fills.
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        ...(numeric ? { measurements: numeric } : {}),
      });
    } catch {
      // Telemetry must never break the caller.
    }
  }

  startDependency(name: string, data: DependencyTelemetry): DependencyHandle {
    if (this.config.disableTelemetry) return NO_DEPENDENCY;
    try {
      const startTime = new Date();
      const trace = this.traceContext();
      const id = `|${trace.traceId}.${trace.spanId}`;
      let ended = false;
      return {
        ...(this.config.propagateTraceContext
          ? { headers: { traceparent: `00-${trace.traceId}-${trace.spanId}-${trace.flags}` } }
          : {}),
        end: (result) => {
          if (ended) return;
          ended = true;
          this.endDependency(name, { ...data, ...result }, id, startTime);
        },
      };
    } catch {
      // Telemetry must never break the caller.
      return NO_DEPENDENCY;
    }
  }

  trackException(error: unknown, props?: Record<string, string>): void {
    if (this.config.disableTelemetry) return;
    try {
      const redacted = toException(error);
      const exception = new Error(redacted.message);
      exception.name = redacted.name;
      exception.stack = redacted.stack ?? `${redacted.name}: ${redacted.message}`;
      this.config.appInsights.trackException({
        exception,
        severityLevel: SEVERITY_ERROR,
        properties: propertyAttributes(props),
      });
    } catch {
      // Telemetry must never break the caller.
    }
  }

  private endDependency(
    name: string,
    data: DependencyTelemetry,
    id: string,
    startTime: Date
  ): void {
    try {
      const statusCode = data.resultCode === undefined ? NaN : Number(data.resultCode);
      const hasStatus = Number.isInteger(statusCode);
      // The Node adapter's rule (#150): with a response its status decides (a 304 is not a
      // failure); without one (the call threw), `success: false` does.
      const failed = hasStatus ? statusCode >= 400 : data.success === false;
      const method = data.method?.toUpperCase();
      const url = typeof data.url === "string" && data.url ? data.url : undefined;
      const duration =
        typeof data.durationMs === "number" && Number.isFinite(data.durationMs)
          ? Math.max(0, data.durationMs)
          : Date.now() - startTime.getTime();
      this.config.appInsights.trackDependencyData({
        id,
        name: [method, url ? pathOf(url) : name].filter(Boolean).join(" "),
        type: "Fetch",
        // Core redacted the URL with the app's `redactUrl` (#35): recorded as is (#384).
        ...(url ? { data: url } : {}),
        ...(data.target ? { target: data.target } : {}),
        startTime,
        duration,
        success: !failed,
        responseCode: hasStatus ? statusCode : 0,
        properties: {
          ...propertyAttributes(data.properties),
          ...(method ? { HttpMethod: method } : {}),
        },
      });
    } catch {
      // Telemetry must never break the caller.
    }
  }

  /**
   * The page's current trace id (the operation the dependency joins) and a new span id for the
   * dependency. A fresh trace id when the instance has no trace context.
   */
  private traceContext(): { traceId: string; spanId: string; flags: string } {
    let traceId: string | undefined;
    let flags = 1;
    try {
      const ctx = this.config.appInsights.getTraceCtx();
      const current = ctx?.getTraceId();
      if (typeof current === "string" && /^[0-9a-f]{32}$/.test(current) && !/^0+$/.test(current)) {
        traceId = current;
      }
      const f = ctx?.getTraceFlags();
      if (typeof f === "number" && Number.isInteger(f) && f >= 0 && f <= 255) flags = f;
    } catch {
      // No trace context: start a new trace.
    }
    return {
      traceId: traceId ?? randomHex(16),
      spanId: randomHex(8),
      flags: flags.toString(16).padStart(2, "0"),
    };
  }
}

/** `bytes` random bytes as lower-case hex, never all zeros. */
function randomHex(bytes: number): string {
  const buf = new Uint8Array(bytes);
  do {
    crypto.getRandomValues(buf);
  } while (buf.every((b) => b === 0));
  return Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * The path of a URL as redacted, without origin, query or fragment. Not through `new URL()`, which
 * would percent-encode the redaction's placeholders (`{id}`, `…`).
 */
function pathOf(url: string): string {
  const path = url.replace(/^[a-z][a-z0-9+.-]*:\/\/[^/?#]*/i, "").split(/[?#]/)[0] ?? "";
  return path || "/";
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
