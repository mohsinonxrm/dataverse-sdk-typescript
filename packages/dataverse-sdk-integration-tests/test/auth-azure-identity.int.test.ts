/**
 * Live: the @azure/identity provider (#86) with a `ClientSecretCredential` against the real org
 * and Entra ID, built from the same DATAVERSE_* variables as `liveClient()`. Nothing is created.
 * A counting wrapper around the credential shows when the provider reaches it. Assertions compare
 * numbers and booleans only, so a failure never prints a token, the client id or an Entra ID
 * message (which names the app).
 */
import { describe, expect, it } from "vitest";
import { ClientSecretCredential, type TokenCredential } from "@azure/identity";
import { AzureIdentityTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-azure-identity";
import { DataverseAuthenticationError, DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { live, orgUrl } from "./env.js";

const noop = (): void => undefined;
const logger = { debug: noop, info: noop, warn: noop, error: noop };

interface CountingCredential {
  credential: TokenCredential;
  calls: () => number;
}

/** A credential from the environment (or with `secret` instead), counting `getToken` calls. */
function countingCredential(
  secret = process.env.DATAVERSE_CLIENT_SECRET ?? ""
): CountingCredential {
  const inner = new ClientSecretCredential(
    process.env.DATAVERSE_TENANT_ID ?? "",
    process.env.DATAVERSE_CLIENT_ID ?? "",
    secret
  );
  let count = 0;
  return {
    credential: {
      getToken: (scopes, options) => {
        count++;
        return inner.getToken(scopes, options);
      },
    },
    calls: () => count,
  };
}

describe.skipIf(!live)("live: @azure/identity provider (#86)", () => {
  it("WhoAmI works, and later requests reuse the cached token", async () => {
    const { credential, calls } = countingCredential();
    const tokenProvider = new AzureIdentityTokenProvider(credential, {
      scopes: [`${orgUrl}/.default`],
    });
    const client = new DataverseClient({ baseUrl: orgUrl, tokenProvider, logger });

    const first = await client.api("WhoAmI").get<{ UserId: string }>();
    expect(first.UserId).toMatch(/^[0-9a-f-]{36}$/);
    expect(calls()).toBe(1);

    const second = await client.api("WhoAmI").get<{ UserId: string }>();
    expect(second.UserId).toBe(first.UserId);
    expect(calls()).toBe(1);

    // Concurrent requests share the cached token too.
    await Promise.all([client.api("WhoAmI").get(), client.api("WhoAmI").get()]);
    expect(calls()).toBe(1);
  });

  it("forceRefresh and clearTokenCache() call the credential again, and the new token works", async () => {
    const { credential, calls } = countingCredential();
    const tokenProvider = new AzureIdentityTokenProvider(credential, {
      scopes: [`${orgUrl}/.default`],
    });
    const client = new DataverseClient({ baseUrl: orgUrl, tokenProvider, logger });

    const cached = await tokenProvider.getToken();
    expect(calls()).toBe(1);
    expect((await tokenProvider.getToken()) === cached).toBe(true);
    expect(calls()).toBe(1);

    // forceRefresh (what the SDK sends after a 401) skips the provider's cache. The credential
    // may answer from its own MSAL cache (documented), so only the call is asserted, not a new
    // token string.
    const refreshed = await tokenProvider.getToken(undefined, { forceRefresh: true });
    expect(refreshed.length > 0).toBe(true);
    expect(calls()).toBe(2);

    // The refreshed token is cached and used by the next request.
    const who = await client.api("WhoAmI").get<{ UserId: string }>();
    expect(who.UserId).toMatch(/^[0-9a-f-]{36}$/);
    expect(calls()).toBe(2);

    tokenProvider.clearTokenCache();
    await client.api("WhoAmI").get();
    expect(calls()).toBe(3);
  });

  it("an Entra ID failure is a DataverseAuthenticationError that keeps the cause", async () => {
    const { credential } = countingCredential("not-the-secret");
    const tokenProvider = new AzureIdentityTokenProvider(credential, {
      scopes: [`${orgUrl}/.default`],
    });

    const error = await tokenProvider.getToken().then(
      () => undefined,
      (e: unknown) => e
    );

    expect(error instanceof DataverseAuthenticationError).toBe(true);
    expect((error as Error).cause instanceof Error).toBe(true);
  });
});
