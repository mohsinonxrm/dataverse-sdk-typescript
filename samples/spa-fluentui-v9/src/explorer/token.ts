/**
 * The explorer's Token tab: the access token the SDK sends, decoded in the browser. A Microsoft
 * Entra access token is a JWT, three base64url parts separated by dots: a JSON header, the JSON
 * claims, and a signature. Only the first two are decoded; the signature is dropped. Nothing here
 * sends, stores or logs the token.
 */

export class TokenDecodeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TokenDecodeError";
  }
}

export interface DecodedToken {
  header: Record<string, unknown>;
  claims: Record<string, unknown>;
}

const BASE64URL = /^[A-Za-z0-9_-]*$/;

/** A base64url segment (no padding) as UTF-8 text. */
export function base64UrlDecode(segment: string): string {
  // A length of 4n + 1 can't come from encoding whole bytes.
  if (!BASE64URL.test(segment) || segment.length % 4 === 1)
    throw new TokenDecodeError("Not base64url.");
  const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

/** UTF-8 text as a base64url segment (no padding). */
export function base64UrlEncode(text: string): string {
  let binary = "";
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function jsonObject(segment: string, part: string): Record<string, unknown> {
  let text: string;
  try {
    text = base64UrlDecode(segment);
  } catch {
    throw new TokenDecodeError(`The token's ${part} isn't base64url-encoded UTF-8.`);
  }
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new TokenDecodeError(`The token's ${part} isn't JSON.`);
  }
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new TokenDecodeError(`The token's ${part} isn't a JSON object.`);
  return value as Record<string, unknown>;
}

/**
 * The header and claims of a JWT. The signature isn't checked (the browser has no reason to: the
 * token came from the sign-in library, and Dataverse checks it) and isn't returned.
 * @throws TokenDecodeError when `token` isn't a JWT.
 */
export function decodeJwt(token: string): DecodedToken {
  const parts = token.trim().split(".");
  if (parts.length !== 3 || !parts[0] || !parts[1])
    throw new TokenDecodeError(
      "The access token isn't a JWT (a header, claims and a signature separated by dots), so it can't be decoded here."
    );
  return { header: jsonObject(parts[0], "header"), claims: jsonObject(parts[1], "claims") };
}

/** One line of the claims summary. */
export interface ClaimRow {
  /** The claim's name in the token, e.g. `aud`. */
  claim: string;
  label: string;
  value: string;
  /** For times: how long ago or from now, e.g. "in 54 minutes". */
  relative?: string;
  /** For `exp`: the token has expired. */
  expired?: boolean;
}

const text = (value: unknown): string | undefined => {
  if (typeof value === "string" && value) return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value) && value.length) return value.map(String).join(", ");
  return undefined;
};

const UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
  ["second", 1],
];

/** `seconds` from now (negative: ago) in words, e.g. "in 54 minutes" or "3 hours ago". */
export function relativeTime(seconds: number): string {
  const format = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const abs = Math.abs(seconds);
  const [unit, size] = UNITS.find(([, s]) => abs >= s) ?? ["second", 1];
  return format.format(Math.round(seconds / size), unit);
}

/** A NumericDate claim (seconds since 1970) as `2026-11-11 09:30:00 UTC`. */
export function formatTime(epochSeconds: number): string {
  return new Date(epochSeconds * 1000)
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d+Z$/, " UTC");
}

/**
 * The claims worth reading first, in order: audience, tenant, user, object id, application,
 * scopes or roles, and when the token was issued and expires (with how long ago, or from `now`).
 * Claims the token doesn't have are left out.
 */
export function claimSummary(claims: Record<string, unknown>, now = Date.now()): ClaimRow[] {
  const rows: ClaimRow[] = [];
  const add = (claim: string, label: string) => {
    const value = text(claims[claim]);
    if (value !== undefined) rows.push({ claim, label, value });
  };
  add("aud", "Audience");
  add("tid", "Tenant id");
  const user = ["upn", "preferred_username", "unique_name"].find((c) => text(claims[c]));
  if (user) add(user, "User");
  add("name", "Name");
  add("oid", "Object id");
  const app = ["appid", "azp"].find((c) => text(claims[c]));
  if (app) add(app, "Application id");
  add("app_displayname", "Application");
  add("scp", "Scopes (delegated)");
  add("roles", "Roles (application)");
  const nowSeconds = Math.floor(now / 1000);
  for (const [claim, label] of [
    ["iat", "Issued"],
    ["nbf", "Not before"],
    ["exp", "Expires"],
  ] as const) {
    const value = claims[claim];
    if (typeof value !== "number" || !Number.isFinite(value)) continue;
    rows.push({
      claim,
      label,
      value: formatTime(value),
      relative: relativeTime(value - nowSeconds),
      ...(claim === "exp" ? { expired: value <= nowSeconds } : {}),
    });
  }
  return rows;
}
