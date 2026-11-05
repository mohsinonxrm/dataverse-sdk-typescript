import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type {
  MiddlewareContext,
  RequestInformation,
  TelemetryClient,
} from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";
import { getGlobalFeatureTracker, FeatureUsageFlag } from "../telemetry/FeatureUsageTracker.js";
import { generateUUID } from "../utils/HeaderUtils.js";
import { redactRequestUrl } from "../utils/redact.js";
import { SDK_VERSION } from "../version.js";

export class TelemetryMiddleware implements Middleware {
  name = "TelemetryMiddleware";

  constructor(private options: DataverseClientOptions) {}

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const perRequest = ctx.middlewareOptions?.get("telemetry");
    if (perRequest?.disable) {
      // No diagnostic headers and no tracking for this request.
      return next(request, ctx);
    }
    const telemetry = this.options.telemetry ?? ctx.telemetry;
    const customProperties = Object.fromEntries(
      Object.entries(perRequest?.customProperties ?? {}).map(([k, v]) => [k, String(v)])
    );

    // Always add SDK version header
    request.headers["x-ms-sdk-version"] = `dataverse-sdk-js/${SDK_VERSION}`;

    // Add correlation ID for request tracking
    ctx.correlationId ??= generateUUID();
    request.headers["x-ms-correlation-id"] = ctx.correlationId;

    const featureTracker = ctx.featureTracker ?? getGlobalFeatureTracker();
    // Only a configured telemetry client counts as "telemetry enabled".
    if (telemetry) featureTracker.addFeature(FeatureUsageFlag.TELEMETRY_ENABLED);
    request.headers["x-ms-feature-usage"] = featureTracker.getFlagsHex();

    if (!telemetry) {
      return next(request, ctx);
    }

    const start = Date.now();
    const method = request.method;
    // Redacted: filters, record ids and alternate keys never reach telemetry by default (#35).
    const url = redactRequestUrl(request, this.options.redactUrl);
    const target = hostOf(request.url);
    const guard = guarded(telemetry, ctx);

    try {
      const res = await next(request, ctx);
      guard.trackDependency("dataverse", {
        target,
        method,
        url,
        durationMs: Date.now() - start,
        success: res.ok,
        resultCode: String(res.status),
        properties: {
          "sdk.version": SDK_VERSION,
          "correlation.id": ctx.correlationId,
          "feature.usage": featureTracker.getFlagsHex(),
          "retry.attempt": String(ctx.attempt ?? 0),
          ...customProperties,
        },
      });
      return res;
    } catch (err) {
      guard.trackDependency("dataverse", {
        target,
        method,
        url,
        durationMs: Date.now() - start,
        success: false,
        properties: {
          "sdk.version": SDK_VERSION,
          "correlation.id": ctx.correlationId,
          "error.type": err instanceof Error ? err.name : "Unknown",
          ...customProperties,
        },
      });
      guard.trackException(err, {
        "correlation.id": ctx.correlationId,
        "request.method": method,
        "request.url": url,
      });
      throw err;
    }
  }
}

/** Telemetry calls that can never throw into the request: a failure is logged and dropped. */
function guarded(
  telemetry: TelemetryClient,
  ctx: MiddlewareContext
): Pick<TelemetryClient, "trackDependency" | "trackException"> {
  const safely = (what: string, fn: () => void) => {
    try {
      fn();
    } catch (e) {
      try {
        ctx.logger?.warn(`Telemetry ${what} threw; ignoring`, {
          error: e instanceof Error ? e.name : typeof e,
        });
      } catch {
        // Nothing else to do: telemetry must not break the request.
      }
    }
  };
  return {
    trackDependency: (name, data) => {
      safely("trackDependency", () => {
        telemetry.trackDependency(name, data);
      });
    },
    trackException: (error, props) => {
      safely("trackException", () => {
        telemetry.trackException(error, props);
      });
    },
  };
}

function hostOf(url: string): string | undefined {
  try {
    return new URL(url).host;
  } catch {
    return undefined;
  }
}
