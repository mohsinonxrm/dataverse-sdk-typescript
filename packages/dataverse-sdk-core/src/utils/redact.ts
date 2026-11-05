import type { RequestInformation } from "../abstractions/http.js";
import { buildUrl } from "./url.js";

const GUID = /^\{?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\}?$/i;

/**
 * The SDK's default URL redaction for logs and telemetry: origin and path only. A GUID key in
 * parentheses becomes `({id})`, any other key (alternate keys, function parameters) becomes
 * `(…)`, and a query becomes `?…`. So `accounts(00000000-…)?$filter=name eq 'x'` is reported as
 * `https://org.crm.dynamics.com/api/data/v9.2/accounts({id})?…`.
 */
export function defaultRedactUrl(url: URL): string {
  const path = url.pathname.replace(/\(([^/]*)\)/g, (_m, key: string) =>
    GUID.test(decodeSafe(key)) ? "({id})" : "(…)"
  );
  return `${url.origin}${path}${url.search ? "?…" : ""}`;
}

/**
 * The request's full URL (with its query) run through `redact`, or through `defaultRedactUrl`
 * when none is given or it throws. Never throws.
 */
export function redactRequestUrl(
  request: RequestInformation,
  redact?: (url: URL) => string
): string {
  let url: URL;
  try {
    url = new URL(buildUrl(request));
  } catch {
    return "(invalid URL)";
  }
  if (redact) {
    try {
      return redact(url);
    } catch {
      // A broken custom redactor must not leak the URL or fail the request.
    }
  }
  return defaultRedactUrl(url);
}

function decodeSafe(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}
