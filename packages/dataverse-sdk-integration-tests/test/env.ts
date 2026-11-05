/**
 * Live-test environment. Tests run only when all four variables are set:
 *   DATAVERSE_URL            e.g. https://yourorg.crm.dynamics.com
 *   DATAVERSE_TENANT_ID
 *   DATAVERSE_CLIENT_ID      app registration added to the org as an application user
 *   DATAVERSE_CLIENT_SECRET
 *
 * Set DATAVERSE_INTEGRATION_REQUIRED=1 (as CI does) to fail instead of skipping when they're missing.
 * Never log any of these values.
 */
import { ConfidentialClientApplication } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const NAMES = [
  "DATAVERSE_URL",
  "DATAVERSE_TENANT_ID",
  "DATAVERSE_CLIENT_ID",
  "DATAVERSE_CLIENT_SECRET",
] as const;

const missing = NAMES.filter((n) => !process.env[n]);

if (missing.length > 0 && process.env.DATAVERSE_INTEGRATION_REQUIRED === "1") {
  throw new Error(`Live integration tests require: ${missing.join(", ")}`);
}

/** True when the live environment is configured. Use with `describe.skipIf(!live)`. */
export const live = missing.length === 0;

/** Org origin, e.g. https://yourorg.crm.dynamics.com (no trailing slash, no path). */
export const orgUrl = live ? new URL(process.env.DATAVERSE_URL ?? "").origin : "";

/** A unique marker for records this run creates, so cleanup and queries can find them. */
export const runId = `sdk-it-${new Date().toISOString().replace(/[-:.TZ]/g, "")}-${Math.random()
  .toString(36)
  .slice(2, 8)}`;

let cached: { client: DataverseClient; tokenProvider: MsalNodeTokenProvider } | undefined;

/** A real DataverseClient authenticated with client credentials through the SDK's msal-node provider. */
export function liveClient(): { client: DataverseClient; tokenProvider: MsalNodeTokenProvider } {
  if (!live) throw new Error("Live environment is not configured");
  if (cached) return cached;
  const cca = new ConfidentialClientApplication({
    auth: {
      clientId: process.env.DATAVERSE_CLIENT_ID ?? "",
      clientSecret: process.env.DATAVERSE_CLIENT_SECRET ?? "",
      authority: `https://login.microsoftonline.com/${process.env.DATAVERSE_TENANT_ID ?? ""}`,
    },
  });
  const tokenProvider = new MsalNodeTokenProvider(cca, {
    flow: "clientCredentials",
    scopes: [`${orgUrl}/.default`],
  });
  const noop = (): void => undefined;
  const client = new DataverseClient({
    baseUrl: orgUrl,
    tokenProvider,
    logger: { debug: noop, info: noop, warn: noop, error: noop },
  });
  cached = { client, tokenProvider };
  return cached;
}

/** Extract the GUID from an OData-EntityId header value. */
export function idFromEntityId(header: string | null): string {
  const m = /\(([0-9a-f-]{36})\)\s*$/i.exec(header ?? "");
  if (!m?.[1]) throw new Error("Response has no OData-EntityId with a GUID");
  return m[1];
}
