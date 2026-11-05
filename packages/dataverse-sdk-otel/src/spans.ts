/*
 * Span helpers shared by the OpenTelemetry and Application Insights adapters.
 *
 * This file is duplicated on purpose in `packages/dataverse-sdk-otel/src/spans.ts` and
 * `packages/dataverse-sdk-appinsights/src/spans.ts`, so neither package depends on the
 * other. Keep the two copies identical.
 */
import { SpanKind, SpanStatusCode } from "@opentelemetry/api";
import type { Attributes, Span, Tracer } from "@opentelemetry/api";
import type { TelemetryClient } from "@mohsinonxrm/dataverse-sdk-core";

/** The `data` argument of {@link TelemetryClient.trackDependency}. */
export type DependencyData = Parameters<TelemetryClient["trackDependency"]>[1];

/** Placeholder written in place of a redacted value. */
export const REDACTED = "REDACTED";

// An absolute URL inside free text. Quoted path literals may contain spaces, and so can an
// unencoded query, so everything after `?` or `#` up to the end of the line counts as the query.
const URL_IN_TEXT = /https?:\/\/(?:[^\s"<>?#']|'[^'\r\n]*')+(?:[?#][^\r\n]*)?/gi;
// A query parameter name worth keeping (`$filter`, `@p1`, `fetchXml`); anything else is dropped.
const PARAM_NAME = /^(?:[$@]|%24|%40)?[A-Za-z_][\w.]*$/;
// An OData string literal in a path segment, e.g. an alternate key `(emailaddress1='a@b.com')`.
// `'` may arrive raw or percent-encoded.
const QUOTED_LITERAL = /(?:'|%27)(?:(?!'|%27).)*(?:'|%27)/gi;

/**
 * Remove personal data from a request URL before it is recorded:
 * - every query parameter value is replaced with `REDACTED` (names such as `$filter` are kept);
 * - quoted string literals in the path (alternate keys, function parameters) become `'REDACTED'`;
 * - user info (`user:password@`) and the fragment are dropped.
 */
export function redactUrl(raw: string): string {
  const queryAt = indexOfQuery(raw);
  // Literals go first: one can contain `?` or `#`, which `new URL()` would take as the query.
  const base = redactLiterals(queryAt === -1 ? raw : raw.slice(0, queryAt));
  const rest = queryAt === -1 ? "" : raw.slice(queryAt);
  const hashAt = rest.indexOf("#");
  const search = rest.startsWith("?") ? rest.slice(1, hashAt === -1 ? undefined : hashAt) : "";

  let origin = "";
  let path = base;
  try {
    const url = new URL(base);
    origin = url.origin === "null" ? `${url.protocol}//${url.host}` : url.origin;
    path = url.pathname;
  } catch {
    // Not an absolute URL: keep it as a bare path.
  }

  const query = search
    .split("&")
    .map((pair) => {
      const eq = pair.indexOf("=");
      return eq === -1 ? pair : pair.slice(0, eq);
    })
    // A quoted value can contain `&`: never keep a piece of one as a parameter name.
    .filter((name) => PARAM_NAME.test(name))
    .map((name) => `${name}=${REDACTED}`)
    .join("&");
  if (query) return `${origin}${path}?${query}`;
  return search ? `${origin}${path}?${REDACTED}` : `${origin}${path}`;
}

/** Replace quoted literals; a quote left open counts as a literal running to the end. */
function redactLiterals(path: string): string {
  const placeholder = "\u0000";
  let result = path.replace(QUOTED_LITERAL, placeholder);
  const open = result.search(/'|%27/i);
  if (open !== -1) result = `${result.slice(0, open)}${placeholder}`;
  return result.replaceAll(placeholder, `'${REDACTED}'`);
}

/** Index of the first `?` or `#` outside a quoted path literal, or -1. */
function indexOfQuery(raw: string): number {
  let quoted = false;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === "'") quoted = !quoted;
    else if (!quoted && (ch === "?" || ch === "#")) return i;
  }
  return -1;
}

/**
 * Redact a value that may be or contain a URL. A value that starts with a URL or a `/` path is
 * redacted as a whole with {@link redactUrl}; otherwise every absolute URL inside the text
 * (error messages, stack traces) is.
 */
export function redactUrlsInText(text: string): string {
  if (/^(?:https?:\/\/|\/)/i.test(text)) return redactUrl(text);
  return text.replace(URL_IN_TEXT, (url) => redactUrl(url));
}

/**
 * Map `TelemetryClient` string properties to span or log attributes.
 * `correlation.id` becomes `dataverse.correlation_id`, `error.type` is kept as is, and other
 * keys are namespaced under `dataverse.` (`sdk.version` becomes `dataverse.sdk.version`).
 * URLs inside values are redacted.
 */
export function propertyAttributes(props: Record<string, string> | undefined): Attributes {
  const attributes: Attributes = {};
  if (!props) return attributes;
  // `unknown` because JavaScript callers can pass anything.
  for (const [key, value] of Object.entries(props as Record<string, unknown>)) {
    if (typeof value !== "string") continue;
    attributes[attributeName(key)] = redactUrlsInText(value);
  }
  return attributes;
}

function attributeName(key: string): string {
  if (key === "correlation.id") return "dataverse.correlation_id";
  if (key === "error.type" || key.startsWith("dataverse.")) return key;
  return `dataverse.${key}`;
}

/**
 * Record a finished Dataverse HTTP call as an OpenTelemetry CLIENT span.
 * The span ends now and starts `durationMs` earlier.
 */
export function recordDependencySpan(tracer: Tracer, name: string, data: DependencyData): void {
  const endTime = Date.now();
  const duration =
    typeof data.durationMs === "number" && Number.isFinite(data.durationMs)
      ? Math.max(0, data.durationMs)
      : 0;
  const startTime = endTime - duration;
  const method = data.method?.toUpperCase();
  const attributes: Attributes = propertyAttributes(data.properties);

  if (method) attributes["http.request.method"] = method;
  if (data.url) {
    attributes["url.full"] = redactUrl(data.url);
    Object.assign(attributes, serverAttributes(data.url));
  }
  if (data.target) attributes["server.address"] = data.target;

  const statusCode = data.resultCode === undefined ? NaN : Number(data.resultCode);
  if (Number.isInteger(statusCode)) attributes["http.response.status_code"] = statusCode;

  const failed = data.success === false || (data.success === undefined && statusCode >= 400);
  if (failed && attributes["error.type"] === undefined) {
    attributes["error.type"] = Number.isInteger(statusCode) ? String(statusCode) : "_OTHER";
  }

  const span = tracer.startSpan(method ? `${method} ${name}` : name, {
    kind: SpanKind.CLIENT,
    startTime,
    attributes,
  });
  if (failed) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: Number.isInteger(statusCode)
        ? `HTTP ${String(statusCode)}`
        : String(attributes["error.type"]),
    });
  }
  span.end(endTime);
}

function serverAttributes(raw: string): Attributes {
  try {
    const url = new URL(raw);
    const port = url.port ? Number(url.port) : url.protocol === "http:" ? 80 : 443;
    return { "server.address": url.hostname, "server.port": port };
  } catch {
    return {};
  }
}

/** A thrown value normalised for telemetry, with URLs redacted. */
export interface RedactedException {
  name: string;
  message: string;
  stack?: string;
  code?: string | number;
}

/** Turn any thrown value into an OpenTelemetry `Exception` with URLs redacted. */
export function toException(error: unknown): RedactedException {
  if (error instanceof Error) {
    const exception: RedactedException = {
      name: error.name,
      message: redactUrlsInText(error.message),
    };
    if (error.stack) exception.stack = redactUrlsInText(error.stack);
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string" || typeof code === "number") exception.code = code;
    return exception;
  }
  return { name: typeof error, message: redactUrlsInText(stringify(error)) };
}

function stringify(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    // `undefined` for functions, symbols and `undefined` itself.
    const json = JSON.stringify(value) as string | undefined;
    return json ?? String(value);
  } catch {
    return String(value);
  }
}

/** Record an exception (URLs redacted) on `span` and set its status to ERROR. */
export function recordExceptionOnSpan(span: Span, error: unknown): void {
  const exception = toException(error);
  span.recordException(exception);
  span.setStatus({ code: SpanStatusCode.ERROR, message: exception.message });
}
