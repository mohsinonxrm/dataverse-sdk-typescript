import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";
import { getGlobalFeatureTracker, FeatureUsageFlag } from "../telemetry/FeatureUsageTracker.js";
import { generateUUID } from "../utils/HeaderUtils.js";

/**
 * SDK version - should be auto-generated during build
 * For now, we'll use a placeholder
 */
const SDK_VERSION = "0.1.0"; // TODO: Auto-generate from package.json during build

export class TelemetryMiddleware implements Middleware {
  name = "TelemetryMiddleware";

  constructor(private options: DataverseClientOptions) {}

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const telemetry = this.options.telemetry ?? ctx.telemetry;

    // Always add SDK version header
    request.headers["x-ms-sdk-version"] = `dataverse-sdk-js/${SDK_VERSION}`;

    // Add correlation ID for request tracking
    ctx.correlationId ??= generateUUID();
    request.headers["x-ms-correlation-id"] = ctx.correlationId;

    // Add feature usage telemetry
    const featureTracker = ctx.featureTracker ?? getGlobalFeatureTracker();
    // Mark telemetry as enabled
    featureTracker.addFeature(FeatureUsageFlag.TELEMETRY_ENABLED);

    // Add feature usage header
    request.headers["x-ms-feature-usage"] = featureTracker.getFlagsHex();

    if (!telemetry) {
      return next(request, ctx);
    }

    const start = Date.now();
    const method = request.method;
    const url = request.url;

    try {
      const res = await next(request, ctx);
      const durationMs = Date.now() - start;

      telemetry.trackDependency("dataverse", {
        method,
        url,
        durationMs,
        success: res.ok,
        resultCode: String(res.status),
        properties: {
          "sdk.version": SDK_VERSION,
          "correlation.id": ctx.correlationId,
          "feature.usage": featureTracker.getFlagsHex(),
          "retry.attempt": String(ctx.attempt ?? 0),
        },
      });

      return res;
    } catch (err) {
      const durationMs = Date.now() - start;

      telemetry.trackDependency("dataverse", {
        method,
        url,
        durationMs,
        success: false,
        properties: {
          "sdk.version": SDK_VERSION,
          "correlation.id": ctx.correlationId,
          "error.type": err instanceof Error ? err.name : "Unknown",
        },
      });

      telemetry.trackException(err, {
        "correlation.id": ctx.correlationId,
        "request.method": method,
        "request.url": url,
      });

      throw err;
    }
  }
}
