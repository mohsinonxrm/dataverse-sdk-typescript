/**
 * @fileoverview Interactive fallback (#25): no account, account/loginHint on interactive
 * requests, single-flight interaction, blocked popups, active account after sign-in.
 *
 * MSAL errors are real instances from the 5.x copy (`msal-browser-v5`), which is not the copy the
 * provider was compiled against, as in an app.
 */

import { describe, it, expect } from "vitest";
import { BrowserAuthError, InteractionRequiredAuthError } from "msal-browser-v5";
import type { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { DataverseAuthenticationError } from "@mohsinonxrm/dataverse-sdk-core";
import {
  MsalBrowserAuthenticationError,
  MsalBrowserTokenProvider,
  type MsalBrowserTokenProviderOptions,
} from "../src/index.js";
import { asPca, createFakePca, type FakePca } from "./fakePca.js";

const scopes = ["https://contoso.crm.dynamics.com/user_impersonation"];

function makeAccount(username: string): AccountInfo {
  return {
    homeAccountId: `${username}-home`,
    environment: "login.microsoftonline.com",
    tenantId: "tenant-id",
    username,
    localAccountId: `${username}-local`,
  };
}

const alice = makeAccount("alice@contoso.com");
const bob = makeAccount("bob@contoso.com");

function result(accessToken: string, account: AccountInfo | null): AuthenticationResult {
  return { accessToken, account } as AuthenticationResult;
}

const interactionRequired = (code = "interaction_required") =>
  new InteractionRequiredAuthError(code, "corr-id", "message");
const browserError = (code: string) => new BrowserAuthError(code, "corr-id");

/** A promise with its resolve/reject exposed. */
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

function setup(
  options: Partial<MsalBrowserTokenProviderOptions> = {},
  accounts: AccountInfo[] = [alice]
): { pca: FakePca; provider: MsalBrowserTokenProvider } {
  const pca = createFakePca();
  pca.getAllAccounts.mockReturnValue(accounts);
  pca.getActiveAccount.mockReturnValue(accounts[0] ?? null);
  const provider = new MsalBrowserTokenProvider(asPca(pca), { scopes, ...options });
  return { pca, provider };
}

describe("no signed-in account (#25)", () => {
  it("opens one popup instead of failing with TokenAcquisitionFailed", async () => {
    const { pca, provider } = setup({}, []);
    pca.acquireTokenSilent.mockRejectedValue(browserError("no_account_error"));
    pca.acquireTokenPopup.mockResolvedValue(result("popup-token", alice));

    await expect(provider.getToken()).resolves.toBe("popup-token");
    expect(pca.acquireTokenPopup).toHaveBeenCalledTimes(1);
  });

  it("starts a redirect when interactionType is 'redirect'", async () => {
    const { pca, provider } = setup({ interactionType: "redirect" }, []);
    pca.acquireTokenRedirect.mockResolvedValue(undefined);

    await expect(provider.getToken()).rejects.toBeInstanceOf(DataverseAuthenticationError);
    expect(pca.acquireTokenRedirect).toHaveBeenCalledTimes(1);
  });

  it("treats no_account_error from the silent call as interaction required", async () => {
    // The configured account is no longer in the MSAL cache (signed out in another tab).
    const { pca, provider } = setup({ account: alice });
    pca.acquireTokenSilent.mockRejectedValue(browserError("no_account_error"));
    pca.acquireTokenPopup.mockResolvedValue(result("popup-token", alice));

    await expect(provider.getToken()).resolves.toBe("popup-token");
    expect(pca.acquireTokenPopup).toHaveBeenCalledTimes(1);
  });

  it("treats login_required as interaction required", async () => {
    const { pca, provider } = setup();
    pca.acquireTokenSilent.mockRejectedValue(interactionRequired("login_required"));
    pca.acquireTokenPopup.mockResolvedValue(result("popup-token", alice));

    await expect(provider.getToken()).resolves.toBe("popup-token");
  });
});

describe("account and loginHint on interactive requests (#25)", () => {
  it("passes the signed-in account and its username as loginHint to the popup", async () => {
    const { pca, provider } = setup();
    pca.acquireTokenSilent.mockRejectedValue(interactionRequired("consent_required"));
    pca.acquireTokenPopup.mockResolvedValue(result("popup-token", alice));

    await provider.getToken();

    expect(pca.acquireTokenPopup).toHaveBeenCalledWith(
      expect.objectContaining({ scopes, account: alice, loginHint: "alice@contoso.com" })
    );
  });

  it("passes the signed-in account and loginHint to the redirect", async () => {
    const { pca, provider } = setup({ interactionType: "redirect" });
    pca.acquireTokenSilent.mockRejectedValue(interactionRequired());
    pca.acquireTokenRedirect.mockResolvedValue(undefined);

    await expect(provider.getToken()).rejects.toBeInstanceOf(DataverseAuthenticationError);

    expect(pca.acquireTokenRedirect).toHaveBeenCalledWith(
      expect.objectContaining({ scopes, account: alice, loginHint: "alice@contoso.com" })
    );
  });

  it("sends no account or loginHint when nobody is signed in", async () => {
    const { pca, provider } = setup({}, []);
    pca.acquireTokenPopup.mockResolvedValue(result("popup-token", alice));

    await provider.getToken();

    const request = pca.acquireTokenPopup.mock.calls[0]?.[0] as Record<string, unknown>;
    expect(request.account).toBeUndefined();
    expect(request.loginHint).toBeUndefined();
  });
});

describe("active account after interactive sign-in (#25)", () => {
  it("sets the account returned by the popup as the active account", async () => {
    const { pca, provider } = setup({}, []);
    pca.acquireTokenPopup.mockResolvedValue(result("popup-token", bob));

    await provider.getToken();

    expect(pca.setActiveAccount).toHaveBeenCalledWith(bob);
  });

  it("does not touch the active account when the popup fails", async () => {
    const { pca, provider } = setup();
    pca.acquireTokenSilent.mockRejectedValue(interactionRequired());
    pca.acquireTokenPopup.mockRejectedValue(browserError("user_cancelled"));

    await expect(provider.getToken()).rejects.toThrow();
    expect(pca.setActiveAccount).not.toHaveBeenCalled();
  });
});

describe("single-flight interaction (#25)", () => {
  it("5 concurrent calls that need interaction open one popup and all get its token", async () => {
    const { pca, provider } = setup();
    pca.acquireTokenSilent.mockRejectedValue(interactionRequired());
    const popup = deferred<AuthenticationResult>();
    pca.acquireTokenPopup.mockReturnValue(popup.promise);

    const calls = Array.from({ length: 5 }, () => provider.getToken());
    // Let every silent call fail and queue on the interaction before the popup completes.
    await new Promise((resolve) => setTimeout(resolve, 0));
    popup.resolve(result("popup-token", alice));

    await expect(Promise.all(calls)).resolves.toEqual(Array(5).fill("popup-token"));
    expect(pca.acquireTokenPopup).toHaveBeenCalledTimes(1);
  });

  it("5 concurrent calls with no account open one popup", async () => {
    const { pca, provider } = setup({}, []);
    const popup = deferred<AuthenticationResult>();
    pca.acquireTokenPopup.mockReturnValue(popup.promise);

    const calls = Array.from({ length: 5 }, () => provider.getToken());
    await new Promise((resolve) => setTimeout(resolve, 0));
    popup.resolve(result("popup-token", alice));

    await expect(Promise.all(calls)).resolves.toEqual(Array(5).fill("popup-token"));
    expect(pca.acquireTokenPopup).toHaveBeenCalledTimes(1);
  });

  it("concurrent callers all get the failure when the shared popup fails", async () => {
    const { pca, provider } = setup();
    pca.acquireTokenSilent.mockRejectedValue(interactionRequired());
    const popup = deferred<AuthenticationResult>();
    pca.acquireTokenPopup.mockReturnValue(popup.promise);

    const calls = Array.from({ length: 3 }, () => provider.getToken());
    await new Promise((resolve) => setTimeout(resolve, 0));
    popup.reject(browserError("user_cancelled"));

    const settled = await Promise.allSettled(calls);
    expect(settled.map((s) => s.status)).toEqual(["rejected", "rejected", "rejected"]);
    expect(pca.acquireTokenPopup).toHaveBeenCalledTimes(1);
  });

  it("a later call can start a new interaction after the previous one settled", async () => {
    const { pca, provider } = setup();
    pca.acquireTokenSilent.mockRejectedValue(interactionRequired());
    pca.acquireTokenPopup
      .mockRejectedValueOnce(browserError("user_cancelled"))
      .mockResolvedValueOnce(result("second-popup", alice));

    await expect(provider.getToken()).rejects.toThrow();
    await expect(provider.getToken()).resolves.toBe("second-popup");
    expect(pca.acquireTokenPopup).toHaveBeenCalledTimes(2);
  });

  it("a call for other scopes waits for the running popup, then tries silently first", async () => {
    const otherScopes = ["https://fabrikam.crm.dynamics.com/user_impersonation"];
    const { pca, provider } = setup();
    const popup = deferred<AuthenticationResult>();
    pca.acquireTokenPopup.mockReturnValueOnce(popup.promise);
    // Both silent calls fail first; after the popup, silent works for the other scopes.
    pca.acquireTokenSilent
      .mockRejectedValueOnce(interactionRequired())
      .mockRejectedValueOnce(interactionRequired())
      .mockResolvedValueOnce(result("silent-after-popup", alice));

    const first = provider.getToken(scopes);
    const second = provider.getToken(otherScopes);
    await new Promise((resolve) => setTimeout(resolve, 0));
    // MSAL allows one interaction at a time: the second must not have started its own popup.
    expect(pca.acquireTokenPopup).toHaveBeenCalledTimes(1);
    popup.resolve(result("popup-token", alice));

    await expect(first).resolves.toBe("popup-token");
    await expect(second).resolves.toBe("silent-after-popup");
    expect(pca.acquireTokenPopup).toHaveBeenCalledTimes(1);
    expect(pca.acquireTokenSilent).toHaveBeenLastCalledWith(
      expect.objectContaining({ scopes: otherScopes })
    );
  });

  it("a call whose silent attempt failed while a popup completed retries silently", async () => {
    const { pca, provider } = setup();
    const lateSilent = deferred<AuthenticationResult>();
    pca.acquireTokenSilent
      .mockRejectedValueOnce(interactionRequired()) // first call
      .mockReturnValueOnce(lateSilent.promise) // second call, still running during the popup
      .mockResolvedValueOnce(result("silent-retry", alice)); // second call's retry
    pca.acquireTokenPopup.mockResolvedValue(result("popup-token", alice));

    const first = provider.getToken();
    const second = provider.getToken();
    await expect(first).resolves.toBe("popup-token");
    lateSilent.reject(interactionRequired());

    await expect(second).resolves.toBe("silent-retry");
    expect(pca.acquireTokenPopup).toHaveBeenCalledTimes(1);
  });
});

describe("blocked popup (#25)", () => {
  it.each(["popup_window_error", "empty_window_error"])(
    "%s with fallbackToRedirect starts a redirect with the same account and loginHint",
    async (code) => {
      const { pca, provider } = setup({ fallbackToRedirect: true });
      pca.acquireTokenSilent.mockRejectedValue(interactionRequired());
      pca.acquireTokenPopup.mockRejectedValue(browserError(code));
      pca.acquireTokenRedirect.mockResolvedValue(undefined);

      await expect(provider.getToken()).rejects.toBeInstanceOf(DataverseAuthenticationError);

      expect(pca.acquireTokenRedirect).toHaveBeenCalledTimes(1);
      expect(pca.acquireTokenRedirect).toHaveBeenCalledWith(
        expect.objectContaining({ scopes, account: alice, loginHint: "alice@contoso.com" })
      );
    }
  );

  it.each(["popup_window_error", "empty_window_error"])(
    "%s without fallbackToRedirect throws a typed popup_blocked error",
    async (code) => {
      const { pca, provider } = setup();
      pca.acquireTokenSilent.mockRejectedValue(interactionRequired());
      const msalError = browserError(code);
      pca.acquireTokenPopup.mockRejectedValue(msalError);

      const error: unknown = await provider.getToken().catch((e: unknown) => e);

      expect(error).toBeInstanceOf(MsalBrowserAuthenticationError);
      expect(error).toBeInstanceOf(DataverseAuthenticationError);
      expect(error).toMatchObject({
        name: "PopupBlocked",
        code: "popup_blocked",
        errorCode: code,
        correlationId: "corr-id",
      });
      expect((error as Error).cause).toBe(msalError);
      expect((error as Error).message).toMatch(/blocked the sign-in popup/);
      expect(pca.acquireTokenRedirect).not.toHaveBeenCalled();
    }
  );

  it("a cancelled popup is not treated as blocked", async () => {
    const { pca, provider } = setup({ fallbackToRedirect: true });
    pca.acquireTokenSilent.mockRejectedValue(interactionRequired());
    pca.acquireTokenPopup.mockRejectedValue(browserError("user_cancelled"));

    const error: unknown = await provider.getToken().catch((e: unknown) => e);

    expect(error).not.toBeInstanceOf(MsalBrowserAuthenticationError);
    expect(pca.acquireTokenRedirect).not.toHaveBeenCalled();
  });
});
