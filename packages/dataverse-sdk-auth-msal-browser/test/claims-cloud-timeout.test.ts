/**
 * @fileoverview #382: configured claims stay out of silent calls MSAL could answer from its cache,
 * `tenantId` with `azureCloudOptions`, and the silent iframe timeout (`monitor_window_timeout`)
 * starting the interactive flow.
 *
 * MSAL errors are real instances: 3.x (`@azure/msal-browser`) and 5.x (`msal-browser-v5`), which
 * report the iframe timeout differently.
 */

import { describe, it, expect } from "vitest";
import { BrowserAuthError as BrowserAuthErrorV3 } from "@azure/msal-browser";
import { AuthError as AuthErrorV5 } from "msal-browser-v5";
import type { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { MsalBrowserTokenProvider, type MsalBrowserTokenProviderOptions } from "../src/index.js";
import { asPca, createFakePca, type FakePca } from "./fakePca.js";

const scopes = ["https://contoso.crm.dynamics.com/user_impersonation"];
const configuredClaims = '{"access_token":{"acrs":{"essential":true,"value":"c1"}}}';
const challengeClaims = '{"access_token":{"nbf":{"essential":true,"value":"1700000000"}}}';
const tenantB = "8b2f3a4c-1d2e-4f5a-9b8c-7d6e5f4a3b2c";

function makeAccount(username: string): AccountInfo {
  return {
    homeAccountId: `${username}-home`,
    environment: "login.microsoftonline.com",
    tenantId: "home-tenant",
    username,
    localAccountId: `${username}-local`,
  };
}

const alice = makeAccount("alice@contoso.com");
const bob = makeAccount("bob@contoso.com");

const ok = (accessToken: string, account: AccountInfo | null = alice) =>
  ({ accessToken, account }) as AuthenticationResult;

function setup(
  options: Partial<MsalBrowserTokenProviderOptions> = {},
  account: AccountInfo | null = alice
): { pca: FakePca; provider: MsalBrowserTokenProvider } {
  const pca = createFakePca();
  let active = account;
  pca.getAllAccounts.mockImplementation(() => (active ? [active] : []));
  pca.getActiveAccount.mockImplementation(() => active);
  pca.setActiveAccount.mockImplementation((next: AccountInfo | null) => {
    active = next;
  });
  pca.acquireTokenSilent.mockResolvedValue(ok("silent-token"));
  pca.acquireTokenPopup.mockResolvedValue(ok("popup-token"));
  const provider = new MsalBrowserTokenProvider(asPca(pca), { scopes, ...options });
  return { pca, provider };
}

function silentRequest(pca: FakePca, n: number): Record<string, unknown> {
  return pca.acquireTokenSilent.mock.calls[n]?.[0] as Record<string, unknown>;
}

describe("configured claims don't disable MSAL's token cache (#382)", () => {
  it("the first silent call sends the configured claims; later calls don't", async () => {
    const { pca, provider } = setup({ claims: configuredClaims });

    await provider.getToken();
    await provider.getToken();
    await provider.getToken();

    expect(silentRequest(pca, 0).claims).toBe(configuredClaims);
    expect(silentRequest(pca, 1).claims).toBeUndefined();
    expect(silentRequest(pca, 2).claims).toBeUndefined();
  });

  it("the interactive flow sends the configured claims; the silent calls after it don't", async () => {
    const { pca, provider } = setup({ claims: configuredClaims }, null);

    await provider.getToken();
    await provider.getToken();

    expect(pca.acquireTokenPopup).toHaveBeenCalledWith(
      expect.objectContaining({ claims: configuredClaims })
    );
    expect(silentRequest(pca, 0).claims).toBeUndefined();
  });

  it("a claims challenge is sent on the silent call", async () => {
    const { pca, provider } = setup({ claims: configuredClaims });
    await provider.getToken();

    await provider.getToken(undefined, { claims: challengeClaims });

    expect(silentRequest(pca, 1).claims).toBe(challengeClaims);
  });

  it("a forced refresh (which skips the cache anyway) sends the configured claims", async () => {
    const { pca, provider } = setup({ claims: configuredClaims });
    await provider.getToken();

    await provider.getToken(undefined, { forceRefresh: true });

    expect(silentRequest(pca, 1)).toMatchObject({ forceRefresh: true, claims: configuredClaims });
  });

  it("another account, scope set or tenant gets the configured claims on its first call", async () => {
    const { pca, provider } = setup({ claims: configuredClaims });
    await provider.getToken();

    pca.setActiveAccount(bob);
    await provider.getToken();
    await provider.getToken(["https://other.crm.dynamics.com/user_impersonation"]);
    await provider.getToken(undefined, { tenantId: tenantB });
    await provider.getToken();

    expect(
      pca.acquireTokenSilent.mock.calls.map((c) => (c[0] as { claims?: string }).claims)
    ).toEqual([configuredClaims, configuredClaims, configuredClaims, configuredClaims, undefined]);
  });

  it("a failed silent call doesn't count: the next one sends the configured claims", async () => {
    const { pca, provider } = setup({ claims: configuredClaims });
    pca.acquireTokenSilent.mockRejectedValueOnce(new BrowserAuthErrorV3("network_error"));

    await expect(provider.getToken()).rejects.toThrow();
    await provider.getToken();

    expect(silentRequest(pca, 1).claims).toBe(configuredClaims);
  });
});

describe("tenantId with azureCloudOptions (#382)", () => {
  it("the request carries azureCloudOptions for the tenant, which MSAL prefers over authority", async () => {
    const { pca, provider } = setup();
    pca.getConfiguration.mockReturnValue({
      auth: {
        authority: "https://login.microsoftonline.com/common",
        azureCloudOptions: {
          azureCloudInstance: "https://login.microsoftonline.us",
          tenant: "home",
        },
      },
    });

    await provider.getToken(undefined, { tenantId: tenantB });

    expect(silentRequest(pca, 0)).toMatchObject({
      authority: `https://login.microsoftonline.us/${tenantB}`,
      azureCloudOptions: {
        azureCloudInstance: "https://login.microsoftonline.us",
        tenant: tenantB,
      },
    });
  });

  it("azureCloudInstance 'none' keeps the configured authority's host", async () => {
    const { pca, provider } = setup();
    pca.getConfiguration.mockReturnValue({
      auth: {
        authority: "https://login.microsoftonline.us/organizations",
        azureCloudOptions: { azureCloudInstance: "none" },
      },
    });

    await provider.getToken(undefined, { tenantId: tenantB });

    expect(silentRequest(pca, 0).authority).toBe(`https://login.microsoftonline.us/${tenantB}`);
    expect(silentRequest(pca, 0).azureCloudOptions).toBeUndefined();
  });
});

describe("silent iframe timeout starts the interactive flow (#382)", () => {
  it("MSAL 3/4: BrowserAuthError monitor_window_timeout opens the popup", async () => {
    const { pca, provider } = setup();
    pca.acquireTokenSilent.mockRejectedValueOnce(new BrowserAuthErrorV3("monitor_window_timeout"));

    await expect(provider.getToken()).resolves.toBe("popup-token");
    expect(pca.acquireTokenPopup).toHaveBeenCalledTimes(1);
  });

  it("MSAL 5: timed_out with subError monitor_window_timeout opens the popup", async () => {
    const { pca, provider } = setup();
    pca.acquireTokenSilent.mockRejectedValueOnce(
      new AuthErrorV5("timed_out", "corr-id", undefined, "monitor_window_timeout")
    );

    await expect(provider.getToken()).resolves.toBe("popup-token");
    expect(pca.acquireTokenPopup).toHaveBeenCalledTimes(1);
  });

  it("with interactionType 'redirect', the timeout starts a redirect", async () => {
    const { pca, provider } = setup({ interactionType: "redirect" });
    pca.acquireTokenSilent.mockRejectedValueOnce(new BrowserAuthErrorV3("monitor_window_timeout"));
    pca.acquireTokenRedirect.mockResolvedValue(undefined);

    await expect(provider.getToken()).rejects.toThrow();
    expect(pca.acquireTokenRedirect).toHaveBeenCalledTimes(1);
  });

  it("other MSAL 5 timeouts (timed_out without that subError) still throw", async () => {
    const { pca, provider } = setup();
    pca.acquireTokenSilent.mockRejectedValueOnce(new AuthErrorV5("timed_out", "corr-id"));

    await expect(provider.getToken()).rejects.toMatchObject({ errorCode: "timed_out" });
    expect(pca.acquireTokenPopup).not.toHaveBeenCalled();
  });
});
