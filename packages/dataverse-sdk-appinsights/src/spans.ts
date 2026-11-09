/*
 * Span helpers shared by the OpenTelemetry and Application Insights adapters.
 *
 * This file is duplicated on purpose in `packages/dataverse-sdk-otel/src/spans.ts` and
 * `packages/dataverse-sdk-appinsights/src/spans.ts`, so neither package depends on the
 * other. Keep the two copies identical.
 */
import { SpanKind, SpanStatusCode, context, propagation, trace } from "@opentelemetry/api";
import type { Attributes, Span, Tracer } from "@opentelemetry/api";
import type { DependencyHandle, DependencyTelemetry } from "@mohsinonxrm/dataverse-sdk-core";
import { propertyAttributes, toException } from "./redaction.js";

/** A handle that records nothing, for a disabled adapter or a span that couldn't start. */
export const NO_DEPENDENCY: DependencyHandle = Object.freeze({ end: () => undefined });

/**
 * Start a CLIENT span for one Dataverse request attempt, as a child of the active context (the
 * app's span, if any). The handle carries the span's trace context, injected with the app's
 * registered propagator (`propagation.inject`, W3C `traceparent` / `tracestate` by default), and
 * `run` makes the span the active one while the attempt runs. `end` sets the outcome and ends it.
 */
export function startDependencySpan(
  tracer: Tracer,
  name: string,
  data: DependencyTelemetry
): DependencyHandle {
  const parent = context.active();
  const method = data.method?.toUpperCase();
  const span = tracer.startSpan(
    method ? `${method} ${name}` : name,
    { kind: SpanKind.CLIENT, attributes: requestAttributes(data, method) },
    parent
  );
  const active = trace.setSpan(parent, span);
  const headers: Record<string, string> = {};
  try {
    propagation.inject(active, headers);
  } catch {
    // No trace context then; the span is still recorded.
  }
  let ended = false;
  return {
    headers,
    run: (fn) => context.with(active, fn),
    end: (result) => {
      if (ended) return;
      ended = true;
      try {
        endDependencySpan(span, result);
      } catch {
        // Telemetry must never break the caller.
      }
    },
  };
}

/** What is known when the attempt starts: method, URL, server and the SDK's properties. */
function requestAttributes(data: DependencyTelemetry, method: string | undefined): Attributes {
  const attributes: Attributes = propertyAttributes(data.properties);
  if (method) attributes["http.request.method"] = method;
  // Core passes the URL already redacted with the app's `redactUrl` (#35): recorded as is (#384).
  if (typeof data.url === "string" && data.url) attributes["url.full"] = data.url;
  Object.assign(attributes, serverAttributes(data.url, data.target));
  // A retry is a resend of the same request (OpenTelemetry HTTP client conventions).
  const attempt = Number(data.properties?.["retry.attempt"]);
  if (Number.isInteger(attempt) && attempt > 0) attributes["http.request.resend_count"] = attempt;
  return attributes;
}

/** Record the attempt's outcome on `span` and end it. */
function endDependencySpan(span: Span, data: DependencyTelemetry): void {
  // Properties added at the end (such as `error.type`) join the ones set at the start.
  const attributes: Attributes = propertyAttributes(data.properties);
  const statusCode = data.resultCode === undefined ? NaN : Number(data.resultCode);
  const hasStatus = Number.isInteger(statusCode);
  if (hasStatus) attributes["http.response.status_code"] = statusCode;

  // With a response, its status decides (a 304 is not an error, whatever `success` says); without
  // one (the call threw), `success: false` does.
  const failed = hasStatus ? statusCode >= 400 : data.success === false;
  if (failed && attributes["error.type"] === undefined) {
    attributes["error.type"] = hasStatus ? String(statusCode) : "_OTHER";
  }
  span.setAttributes(attributes);
  if (failed) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: hasStatus ? `HTTP ${String(statusCode)}` : String(attributes["error.type"]),
    });
  }
  span.end();
}

/**
 * `server.address` (the host name, never with the port) and `server.port`, as the OpenTelemetry
 * HTTP client conventions define them. From the URL when it is absolute (the port defaults to the
 * scheme's), else from `target`, which core sets to `URL.host` (`host[:port]`, no scheme, so only
 * an explicit port is known).
 */
function serverAttributes(url: unknown, target: unknown): Attributes {
  const fromUrl = parseUrl(url);
  if (fromUrl) {
    const port = fromUrl.port ? Number(fromUrl.port) : fromUrl.protocol === "http:" ? 80 : 443;
    return { "server.address": hostName(fromUrl), "server.port": port };
  }
  if (typeof target !== "string" || !target) return {};
  const fromTarget = parseUrl(`https://${target}`);
  if (!fromTarget) return { "server.address": target };
  return fromTarget.port
    ? { "server.address": hostName(fromTarget), "server.port": Number(fromTarget.port) }
    : { "server.address": hostName(fromTarget) };
}

function parseUrl(raw: unknown): URL | undefined {
  if (typeof raw !== "string" || !raw) return undefined;
  try {
    return new URL(raw);
  } catch {
    return undefined;
  }
}

/** `URL.hostname` without the brackets of an IPv6 address. */
function hostName(url: URL): string {
  return url.hostname.replace(/^\[(.*)\]$/, "$1");
}

/** Record an exception (URLs redacted) on `span` and set its status to ERROR. */
export function recordExceptionOnSpan(span: Span, error: unknown): void {
  const exception = toException(error);
  span.recordException(exception);
  span.setStatus({ code: SpanStatusCode.ERROR, message: exception.message });
}
