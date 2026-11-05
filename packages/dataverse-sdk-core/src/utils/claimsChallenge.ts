/**
 * The claims of a Conditional Access / CAE challenge, from a `WWW-Authenticate` header such as
 * `Bearer realm="", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOnsi…"`. The claims
 * are base64 in the header; this returns the decoded JSON string, which is what MSAL's `claims`
 * option expects. `undefined` when there is no claims challenge.
 *
 * @example
 * ```typescript
 * const claims = parseClaimsChallenge(error.headers?.["www-authenticate"]);
 * if (claims) await msal.acquireTokenPopup({ scopes, claims });
 * ```
 */
export function parseClaimsChallenge(header: string | null | undefined): string | undefined {
  if (!header) return undefined;
  const match = /(?:^|[\s,])claims\s*=\s*"([^"]*)"/i.exec(header);
  const raw = match?.[1]?.trim();
  if (!raw) return undefined;
  if (raw.startsWith("{")) return raw;
  try {
    const b64 = raw.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const bytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return raw;
  }
}
