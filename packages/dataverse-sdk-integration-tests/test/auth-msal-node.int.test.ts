/**
 * #85 live: the msal-node provider with client credentials against the real org and Entra ID.
 * Nothing is created. Assertions compare booleans and codes only, so a failure never prints a
 * token, the client id or an Entra ID message (which names the app).
 */
import { describe, expect, it } from "vitest";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { DataverseAuthenticationError } from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient, orgUrl } from "./env.js";

describe.skipIf(!live)("live: msal-node provider (#85)", () => {
  it("several requests and a forceRefresh token all work", async () => {
    const { client, tokenProvider } = liveClient();
    for (let i = 0; i < 3; i++) {
      const whoAmI = await client.api("/WhoAmI").get<{ UserId: string }>();
      expect(typeof whoAmI.UserId).toBe("string");
    }

    const cached = await tokenProvider.getToken();
    const refreshed = await tokenProvider.getToken(undefined, { forceRefresh: true });
    expect(refreshed.length > 0).toBe(true);
    expect(refreshed === cached).toBe(false);
  });

  it("an Entra ID failure keeps the MSAL error as cause", async () => {
    const cca = new ConfidentialClientApplication({
      auth: {
        clientId: process.env.DATAVERSE_CLIENT_ID ?? "",
        clientSecret: "not-the-secret",
        authority: `https://login.microsoftonline.com/${process.env.DATAVERSE_TENANT_ID ?? ""}`,
      },
    });
    const provider = new MsalNodeTokenProvider(cca, {
      flow: "clientCredentials",
      scopes: [`${orgUrl}/.default`],
    });

    const error = await provider.getToken().then(
      () => undefined,
      (e: unknown) => e
    );

    expect(error instanceof DataverseAuthenticationError).toBe(true);
    expect((error as Error).name).toBe("TokenAcquisitionFailed");
    const cause = (error as Error).cause as { errorCode?: string } | undefined;
    expect(cause?.errorCode).toBe("invalid_client");
  });
});
