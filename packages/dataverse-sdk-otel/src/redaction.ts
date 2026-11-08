/*
 * Redaction helpers shared by the OpenTelemetry and Application Insights adapters (including the
 * Application Insights browser entry, so this file imports nothing from OpenTelemetry).
 *
 * This file is duplicated on purpose in `packages/dataverse-sdk-otel/src/redaction.ts` and
 * `packages/dataverse-sdk-appinsights/src/redaction.ts`, so neither package depends on the
 * other. Keep the two copies identical.
 */

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
 * Properties core's `TelemetryMiddleware` fills with a URL it already ran through the app's
 * `redactUrl`: recorded as is, so a custom `redactUrl` decides what is kept (#384).
 */
const REDACTED_BY_CORE = new Set(["request.url"]);

/**
 * Map `TelemetryClient` string properties to span or log attributes.
 * `correlation.id` becomes `dataverse.correlation_id`, `error.type` is kept as is, and other
 * keys are namespaced under `dataverse.` (`sdk.version` becomes `dataverse.sdk.version`).
 * URLs inside values are redacted, except in the values core already redacted.
 */
export function propertyAttributes(
  props: Record<string, string> | undefined
): Record<string, string> {
  const attributes: Record<string, string> = {};
  if (!props) return attributes;
  // `unknown` because JavaScript callers can pass anything.
  for (const [key, value] of Object.entries(props as Record<string, unknown>)) {
    if (typeof value !== "string") continue;
    attributes[attributeName(key)] = REDACTED_BY_CORE.has(key) ? value : redactUrlsInText(value);
  }
  return attributes;
}

function attributeName(key: string): string {
  if (key === "correlation.id") return "dataverse.correlation_id";
  if (key === "error.type" || key.startsWith("dataverse.")) return key;
  return `dataverse.${key}`;
}

/** A thrown value normalised for telemetry, with URLs redacted. */
export interface RedactedException {
  name: string;
  message: string;
  stack?: string;
  code?: string | number;
}

/** Any thrown value as a plain exception record (name, message, stack), with URLs redacted. */
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
