/**
 * @fileoverview Account resolution per call, `TokenOptions.tenantId`, and MSAL error details on
 * the thrown error (#26).
 *
 * MSAL errors are real instances from the 5.x copy (`msal-browser-v5`).
 */

import { describe, it, expect } from "vitest";
import { BrowserAuthError, InteractionRequiredAuthError, ServerError } from "msal-browser-v5";
import type { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import {
  DataverseAuthenticationError,
  DataverseInvalidRequestError,
} from "@mohsinonxrm/dataverse-sdk-core";
import {
  MsalBrowserAuthenticationError,
  MsalBrowserTokenProvider,
  type MsalBrowserTokenProviderOptions,
} from "../src/index.js";
import { asPca, createFakePca, type FakePca } from "./fakePca.js";

const scopes = ["https://contoso.crm.dynamics.com/user_impersonation"];
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
const bob = makeAccount("bob@fabrikam.com");

const ok = (accessToken: string, account: AccountInfo | null = alice) =>
  ({ accessToken, account }) as AuthenticationResult;

/** A fake whose active account follows setActiveAccount, like MSAL's. */
function setup(
  options: Partial<MsalBrowserTokenProviderOptions> = {},
  accounts: AccountInfo[] = [alice, bob],
  active: AccountInfo | null = null
): { pca: FakePca; provider: MsalBrowserTokenProvider } {
  const pca = createFakePca();
  let current = active;
  pca.getAllAccounts.mockReturnValue(accounts);
  pca.getActiveAccount.mockImplementation(() => current);
  pca.setActiveAccount.mockImplementation((account: AccountInfo | null) => {
    current = account;
  });
  pca.acquireTokenSilent.mockImplementation((request: { account?: AccountInfo }) =>
    Promise.resolve(ok(`token-for-${request.account?.username ?? "nobody"}`))
  );
  const provider = new MsalBrowserTokenProvider(asPca(pca), { scopes, ...options });
  return { pca, provider };
}

function lastSilentRequest(pca: FakePca): Record<string, unknown> {
  return pca.acquireTokenSilent.mock.lastCall?.[0] as Record<string, unknown>;
}

describe("account resolved on every call (#26)", () => {
  it("after setActiveAccount(b) on the MSAL instance, tokens are for b, even with a configured account", async () => {
    const { pca, provider } = setup({ account: alice }, [alice, bob], alice);

    await expect(provider.getToken()).resolves.toBe("token-for-alice@contoso.com");
    pca.setActiveAccount(bob);
    await expect(provider.getToken()).resolves.toBe("token-for-bob@fabrikam.com");
  });

  it("after provider.setActiveAccount(b), tokens are for b", async () => {
    const { provider } = setup({ account: alice }, [alice, bob], alice);

    provider.setActiveAccount(bob);

    await expect(provider.getToken()).resolves.toBe("token-for-bob@fabrikam.com");
  });

  it("an account function is called on every request and wins over the active account", async () => {
    let chosen: AccountInfo = alice;
    const { pca, provider } = setup({ account: () => chosen }, [alice, bob], bob);

    await expect(provider.getToken()).resolves.toBe("token-for-alice@contoso.com");
    chosen = bob;
    await expect(provider.getToken()).resolves.toBe("token-for-bob@fabrikam.com");
    expect(pca.acquireTokenSilent).toHaveBeenCalledTimes(2);
  });

  it("an account function returning null falls back to the active account", async () => {
    const { provider } = setup({ account: () => null }, [alice, bob], bob);

    await expect(provider.getToken()).resolves.toBe("token-for-bob@fabrikam.com");
  });

  it("a configured AccountInfo is used when MSAL has no active account", async () => {
    const { provider } = setup({ account: bob }, [alice, bob], null);

    await expect(provider.getToken()).resolves.toBe("token-for-bob@fabrikam.com");
  });

  it("with nothing configured and no active account, the first cached account is used", async () => {
    const { provider } = setup({}, [alice, bob], null);

    await expect(provider.getToken()).resolves.toBe("token-for-alice@contoso.com");
  });

  it("interactive requests use the account resolved for that call", async () => {
    const { pca, provider } = setup({ account: alice }, [alice, bob], alice);
    pca.setActiveAccount(bob);
    pca.acquireTokenSilent.mockRejectedValue(
      new InteractionRequiredAuthError("consent_required", "corr-id")
    );
    pca.acquireTokenPopup.mockResolvedValue(ok("popup-token", bob));

    await provider.getToken();

    expect(pca.acquireTokenPopup).toHaveBeenCalledWith(
      expect.objectContaining({ account: bob, loginHint: "bob@fabrikam.com" })
    );
  });
});

describe("TokenOptions.tenantId (#26)", () => {
  it("is sent as the authority of the silent request", async () => {
    const { pca, provider } = setup({}, [alice], alice);

    await provider.getToken(undefined, { tenantId: tenantB });

    expect(lastSilentRequest(pca).authority).toBe(`https://login.microsoftonline.com/${tenantB}`);
  });

  it("accepts a tenant domain", async () => {
    const { pca, provider } = setup({}, [alice], alice);

    await provider.getToken(undefined, { tenantId: "fabrikam.onmicrosoft.com" });

    expect(lastSilentRequest(pca).authority).toBe(
      "https://login.microsoftonline.com/fabrikam.onmicrosoft.com"
    );
  });

  it("uses the host of the configured authority (sovereign clouds)", async () => {
    const { pca, provider } = setup({}, [alice], alice);
    pca.getConfiguration.mockReturnValue({
      auth: { authority: "https://login.microsoftonline.us/organizations" },
    });

    await provider.getToken(undefined, { tenantId: tenantB });

    expect(lastSilentRequest(pca).authority).toBe(`https://login.microsoftonline.us/${tenantB}`);
  });

  it("falls back to login.microsoftonline.com when the instance has no configuration", async () => {
    const { pca, provider } = setup({}, [alice], alice);
    pca.getConfiguration.mockImplementation(() => {
      throw new TypeError("getConfiguration is not a function");
    });

    await provider.getToken(undefined, { tenantId: tenantB });

    expect(lastSilentRequest(pca).authority).toBe(`https://login.microsoftonline.com/${tenantB}`);
  });

  it("is sent as the authority of the interactive request", async () => {
    const { pca, provider } = setup({}, [alice], alice);
    pca.acquireTokenSilent.mockRejectedValue(
      new InteractionRequiredAuthError("interaction_required", "corr-id")
    );
    pca.acquireTokenPopup.mockResolvedValue(ok("popup-token"));

    await provider.getToken(undefined, { tenantId: tenantB });

    expect(pca.acquireTokenPopup).toHaveBeenCalledWith(
      expect.objectContaining({ authority: `https://login.microsoftonline.com/${tenantB}` })
    );
  });

  it("is not set without tenantId", async () => {
    const { pca, provider } = setup({}, [alice], alice);

    await provider.getToken();

    expect(lastSilentRequest(pca).authority).toBeUndefined();
  });

  it("rejects a tenantId that is not a tenant id or domain, before calling MSAL", async () => {
    const { pca, provider } = setup({}, [alice], alice);

    await expect(
      provider.getToken(undefined, { tenantId: "evil.example/oauth2?x=" })
    ).rejects.toBeInstanceOf(DataverseInvalidRequestError);
    expect(pca.acquireTokenSilent).not.toHaveBeenCalled();
  });
});

describe("MSAL error details on the thrown error (#26)", () => {
  it("a silent server error keeps errorCode, subError, correlationId, errorNo and cause", async () => {
    const { pca, provider } = setup({}, [alice], alice);
    const msalError = new ServerError(
      "invalid_resource",
      "corr-123",
      "AADSTS500011: The resource principal was not found.",
      "bad_resource",
      "500011"
    );
    pca.acquireTokenSilent.mockRejectedValue(msalError);

    const error: unknown = await provider.getToken().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(DataverseAuthenticationError);
    expect(error).toBeInstanceOf(MsalBrowserAuthenticationError);
    expect(error).toMatchObject({
      name: "TokenAcquisitionFailed",
      code: "invalid_resource",
      errorCode: "invalid_resource",
      subError: "bad_resource",
      correlationId: "corr-123",
      errorNo: "500011",
    });
    expect((error as Error).cause).toBe(msalError);
    expect((error as Error).message).toContain("AADSTS500011");
  });

  it("a failed consent popup exposes err.cause.errorCode === 'consent_required'", async () => {
    const { pca, provider } = setup({}, [alice], alice);
    pca.acquireTokenSilent.mockRejectedValue(
      new InteractionRequiredAuthError("consent_required", "corr-1")
    );
    // Admin consent is required: the popup comes back with the same error (AADSTS65001).
    const consentError = new InteractionRequiredAuthError(
      "consent_required",
      "corr-2",
      "AADSTS65001: The user or administrator has not consented to use the application.",
      "consent_required",
      undefined,
      undefined,
      undefined,
      "65001"
    );
    pca.acquireTokenPopup.mockRejectedValue(consentError);

    const error = (await provider.getToken().catch((e: unknown) => e)) as Error & {
      cause: { errorCode: string };
    };

    expect(error).toBeInstanceOf(DataverseAuthenticationError);
    expect(error.cause.errorCode).toBe("consent_required");
    expect(error).toMatchObject({
      errorCode: "consent_required",
      subError: "consent_required",
      errorNo: "65001",
      correlationId: "corr-2",
    });
  });

  it("a cancelled popup is a DataverseAuthenticationError with code user_cancelled", async () => {
    const { pca, provider } = setup({}, [alice], alice);
    pca.acquireTokenSilent.mockRejectedValue(
      new InteractionRequiredAuthError("interaction_required", "corr-id")
    );
    const cancelled = new BrowserAuthError("user_cancelled", "corr-id");
    pca.acquireTokenPopup.mockRejectedValue(cancelled);

    const error: unknown = await provider.getToken().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(DataverseAuthenticationError);
    expect(error).toMatchObject({ code: "user_cancelled", errorCode: "user_cancelled" });
    expect((error as Error).cause).toBe(cancelled);
  });

  it("a failed redirect start keeps the MSAL details", async () => {
    const { pca, provider } = setup({ interactionType: "redirect" }, [], null);
    const inProgress = new BrowserAuthError("interaction_in_progress", "corr-id");
    pca.acquireTokenRedirect.mockRejectedValue(inProgress);

    const error: unknown = await provider.getToken().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(DataverseAuthenticationError);
    expect(error).toMatchObject({ code: "interaction_in_progress" });
    expect((error as Error).cause).toBe(inProgress);
  });

  it("does not wrap the provider's own errors twice", async () => {
    const { pca, provider } = setup({}, [alice], alice);
    pca.acquireTokenSilent.mockResolvedValue(ok(""));

    await expect(provider.getToken()).rejects.toThrow(
      /^Failed to acquire access token: Received empty access token from MSAL$/
    );
  });

  it("keeps a non-Error rejection as cause", async () => {
    const { pca, provider } = setup({}, [alice], alice);
    pca.acquireTokenSilent.mockRejectedValue("network down");

    const error: unknown = await provider.getToken().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(DataverseAuthenticationError);
    expect((error as Error).message).toBe("Failed to acquire access token: network down");
    expect((error as Error).cause).toBe("network down");
  });
});
