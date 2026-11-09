import type { DataverseClientOptions } from "../abstractions/options.js";

/** The origins that may receive the access token: `baseUrl`'s and `allowedTokenOrigins`. */
export function tokenOrigins(
  options: Pick<DataverseClientOptions, "baseUrl" | "allowedTokenOrigins">
): Set<string> {
  return new Set(
    [options.baseUrl, ...(options.allowedTokenOrigins ?? [])]
      .map((u) => originOf(u))
      .filter((o): o is string => o !== undefined)
  );
}

/**
 * Why the access token (or anything else only Dataverse may see, such as trace context) may not
 * go to `url`, or undefined when it may.
 */
export function tokenOriginRefusal(
  url: string,
  baseUrl: string,
  allowed: Set<string>
): string | undefined {
  let parsed: URL;
  try {
    parsed = new URL(url, baseUrl);
  } catch {
    return "the request URL can't be parsed, so the access token is not sent";
  }
  if (parsed.username || parsed.password) {
    return "the request URL contains credentials (user info), so the access token is not sent";
  }
  if (!allowed.has(parsed.origin)) {
    return `refusing to send the access token to ${parsed.origin}; only ${[...allowed].join(", ")} may receive it (see DataverseClientOptions.allowedTokenOrigins)`;
  }
  return undefined;
}

/** The origin of a URL (lower-cased host, punycode), or undefined when it isn't absolute. */
function originOf(url: string): string | undefined {
  try {
    const origin = new URL(url).origin;
    return origin === "null" ? undefined : origin;
  } catch {
    return undefined;
  }
}
