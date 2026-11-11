import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import { resolveDiagnosticHeaders } from "../utils/diagnosticHeaders.js";
import type { DataverseClientOptions } from "../abstractions/options.js";
import { getGlobalFeatureTracker, FeatureUsageFlag } from "../telemetry/FeatureUsageTracker.js";
import { TelemetryEvents } from "../telemetry/events.js";
import { generateUUID, parseRetryAfter } from "../utils/HeaderUtils.js";
import { redactRequestUrl } from "../utils/redact.js";
import { requestTelemetry, type SafeTelemetry } from "../utils/telemetry.js";
import { tokenOriginRefusal, tokenOrigins } from "../utils/tokenOrigins.js";
import { SDK_VERSION } from "../version.js";

/**
 * Diagnostic headers, and the telemetry of each request attempt: a dependency (started before the
 * attempt and ended after it, with the telemetry client's trace context sent along), an exception
 * when the attempt fails without a response, and a `dataverse.throttle` event for a 429.
 */
export class TelemetryMiddleware implements Middleware {
  name = "TelemetryMiddleware";

  /** Origins that may receive the access token, and so the trace context headers too. */
  private readonly traceOrigins: Set<string>;

  constructor(private options: DataverseClientOptions) {
    this.traceOrigins = tokenOrigins(options);
  }

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
    const telemetry = requestTelemetry(this.options, ctx);
    const customProperties = Object.fromEntries(
      Object.entries(perRequest?.customProperties ?? {}).map(([k, v]) => [k, String(v)])
    );

    const headers = resolveDiagnosticHeaders(this.options.diagnosticHeaders);
    if (headers.sdkVersion) {
      request.headers["x-ms-sdk-version"] = `dataverse-sdk-js/${SDK_VERSION}`;
    }

    // The correlation id is tracked either way; the header is optional (#13).
    ctx.correlationId ??= generateUUID();
    const correlationId = ctx.correlationId;
    if (headers.correlationId) {
      request.headers["x-ms-correlation-id"] = correlationId;
    }

    const featureTracker = ctx.featureTracker ?? getGlobalFeatureTracker();
    // Only a configured telemetry client counts as "telemetry enabled".
    if (telemetry) featureTracker.addFeature(FeatureUsageFlag.TELEMETRY_ENABLED);
    if (headers.featureUsage) {
      request.headers["x-ms-feature-usage"] = featureTracker.getFlagsHex();
    }

    if (!telemetry) {
      return next(request, ctx);
    }

    const start = Date.now();
    const method = request.method;
    // Redacted: filters, record ids and alternate keys never reach telemetry by default (#35).
    const url = redactRequestUrl(request, this.options.redactUrl);
    const target = hostOf(request.url);
    const attempt = ctx.attempt ?? 0;
    const properties: Record<string, string> = {
      "sdk.version": SDK_VERSION,
      "correlation.id": correlationId,
      "feature.usage": featureTracker.getFlagsHex(),
      "retry.attempt": String(attempt),
      ...customProperties,
    };

    // Started in the caller's context, so each attempt (a retry, the resend after a 401) is a
    // child of the caller's span, never of an earlier attempt (#97).
    const dependency = telemetry.startDependency("dataverse", { target, method, url, properties });
    if (headers.traceContext && dependency.headers.traceparent && this.mayTrace(request.url)) {
      // Each attempt sends its own trace context; drop a tracestate left by an earlier attempt.
      request.headers.traceparent = dependency.headers.traceparent;
      const tracestate = dependency.headers.tracestate;
      if (tracestate) request.headers.tracestate = tracestate;
      else delete request.headers.tracestate;
    }

    // ChaosMiddleware (inside this one) marks the attempt it injects a fault into (#475).
    ctx.chaos = undefined;
    let res: Response;
    try {
      res = await dependency.run(() => next(request, ctx));
    } catch (err) {
      const chaos = chaosProperties(ctx);
      dependency.end({
        target,
        method,
        url,
        durationMs: Date.now() - start,
        success: false,
        properties: {
          ...properties,
          "error.type": err instanceof Error ? err.name : "Unknown",
          ...chaos,
        },
      });
      telemetry.trackException(err, {
        "correlation.id": correlationId,
        "request.method": method,
        "request.url": url,
        ...chaos,
      });
      throw err;
    }
    const chaos = chaosProperties(ctx);
    dependency.end({
      target,
      method,
      url,
      durationMs: Date.now() - start,
      // A 304 (If-None-Match) or another 3xx is an answer, not a failure (#378).
      success: res.status < 400,
      resultCode: String(res.status),
      properties: { ...properties, ...chaos },
    });
    if (res.status === 429) {
      await trackThrottle(telemetry, res, {
        "correlation.id": correlationId,
        "request.method": method,
        "request.url": url,
        attempt,
        chaos,
      });
    }
    return res;
  }

  /** Trace context goes only where the access token may go (#97). */
  private mayTrace(url: string): boolean {
    return tokenOriginRefusal(url, this.options.baseUrl, this.traceOrigins) === undefined;
  }
}

/** Dataverse error codes of the service protection limits, by the limit they name. */
const THROTTLE_LIMITS: Record<string, string> = {
  "0x80072322": "requests",
  "0x80072321": "execution_time",
  "0x80072326": "concurrent_requests",
};

/** `chaos.injected` and `chaos.fault` when ChaosMiddleware injected a fault into the attempt. */
function chaosProperties(ctx: MiddlewareContext): Record<string, string> {
  return ctx.chaos ? { "chaos.injected": "true", "chaos.fault": ctx.chaos.fault } : {};
}

async function trackThrottle(
  telemetry: SafeTelemetry,
  res: Response,
  info: Record<"correlation.id" | "request.method" | "request.url", string> & {
    attempt: number;
    chaos: Record<string, string>;
  }
): Promise<void> {
  const { attempt, chaos, ...props } = info;
  const measurements: Record<string, number> = { "retry.attempt": attempt };
  const retryAfterMs = parseRetryAfter(res.headers.get("retry-after"));
  if (retryAfterMs !== undefined) measurements["retry.after_ms"] = retryAfterMs;
  const dopHint = Number(res.headers.get("x-ms-dop-hint") ?? NaN);
  if (Number.isFinite(dopHint) && dopHint > 0) measurements.dop_hint = dopHint;
  const code = await throttleErrorCode(res);
  const limit = code === undefined ? undefined : THROTTLE_LIMITS[code];
  telemetry.trackEvent(
    TelemetryEvents.throttle,
    {
      ...props,
      ...(code !== undefined ? { "error.code": code } : {}),
      ...(limit !== undefined ? { "throttle.limit": limit } : {}),
      ...chaos,
    },
    measurements
  );
}

/**
 * The error code of a JSON 429 body (`{"error":{"code":"0x80072322",…}}`), read from a clone so
 * the response is untouched. A `$batch` 429 with per-request results (multipart) isn't read.
 */
async function throttleErrorCode(res: Response): Promise<string | undefined> {
  if (!/json/i.test(res.headers.get("content-type") ?? "") || res.bodyUsed) return undefined;
  try {
    const body = JSON.parse(await res.clone().text()) as { error?: { code?: unknown } } | null;
    const code = body?.error?.code;
    return typeof code === "string" && /^0x[0-9a-f]{8}$/i.test(code)
      ? code.toLowerCase()
      : undefined;
  } catch {
    return undefined;
  }
}

function hostOf(url: string): string | undefined {
  try {
    return new URL(url).host;
  } catch {
    return undefined;
  }
}
