/**
 * Demo mode's access token: a JWT made up in the browser, shaped like a Microsoft Entra ID token
 * for the demo user, so the explorer's Token tab has something to decode. It is unsigned
 * (`alg: none`), no service accepts it, and the in-browser fake ignores it.
 */
import { base64UrlEncode } from "../explorer/token";
import { DEMO_USER } from "./store";

const DEMO_TENANT_ID = "00000000-0000-0000-0000-000000000000";
/** Not a real app registration. */
const DEMO_APP_ID = "11111111-2222-4333-8444-555555555555";
const LIFETIME_SECONDS = 3600;

/** The audience of a token for `scopes`, e.g. `https://contoso.crm.dynamics.com/.default`. */
function audience(scopes: string | string[] | undefined): string {
  const first = (Array.isArray(scopes) ? scopes[0] : scopes) ?? "";
  try {
    return new URL(first).origin;
  } catch {
    return "https://contoso.crm.dynamics.com";
  }
}

export function demoAccessToken(scopes?: string | string[], now = Date.now()): string {
  const issued = Math.floor(now / 1000);
  const header = { typ: "JWT", alg: "none" };
  const claims = {
    aud: audience(scopes),
    iss: `https://sts.windows.net/${DEMO_TENANT_ID}/`,
    iat: issued,
    nbf: issued,
    exp: issued + LIFETIME_SECONDS,
    appid: DEMO_APP_ID,
    app_displayname: "Dataverse SDK explorer (demo)",
    name: DEMO_USER.fullname,
    oid: DEMO_USER.azureactivedirectoryobjectid,
    scp: "user_impersonation",
    tid: DEMO_TENANT_ID,
    upn: DEMO_USER.internalemailaddress,
    ver: "1.0",
  };
  // An unsigned JWT has an empty signature.
  return `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(claims))}.`;
}
