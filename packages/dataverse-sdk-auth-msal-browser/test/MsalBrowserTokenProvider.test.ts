/**
 * @fileoverview Unit tests for MSAL Browser Token Provider
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import type { AuthenticationResult, AccountInfo } from "@azure/msal-browser";
import { MsalBrowserTokenProvider } from "../src/MsalBrowserTokenProvider.js";
import {
  DataverseAuthenticationError,
  DataverseInvalidRequestError,
} from "@mohsinonxrm/dataverse-sdk-core";

// A real MSAL error class. The provider has no runtime import of MSAL, so this is a "foreign" copy
// as far as the provider is concerned (see msal-versions.test.ts for v4 and v5).
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { asPca, createFakePca } from "./fakePca.js";

describe("MsalBrowserTokenProvider", () => {
  const mockScopes = ["https://org.crm.dynamics.com/.default"];
  const mockAccessToken = "mock-access-token";

  const mockAccount: AccountInfo = {
    homeAccountId: "home-account-id",
    environment: "login.microsoftonline.com",
    tenantId: "tenant-id",
    username: "user@domain.com",
    localAccountId: "local-account-id",
    name: "Test User",
  };

  const mockAuthResult: AuthenticationResult = {
    authority: "https://login.microsoftonline.com/tenant",
    uniqueId: "unique-id",
    tenantId: "tenant-id",
    scopes: mockScopes,
    account: mockAccount,
    idToken: "id-token",
    idTokenClaims: {},
    accessToken: mockAccessToken,
    fromCache: false,
    expiresOn: new Date(Date.now() + 3600000),
    tokenType: "Bearer",
    state: "",
    correlationId: "correlation-id",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Constructor validation", () => {
    it("should throw when publicClientApplication is missing", () => {
      expect(() => {
        new MsalBrowserTokenProvider(null as any, {
          scopes: mockScopes,
        });
      }).toThrow(DataverseInvalidRequestError);
    });

    it("should throw when options are missing", () => {
      const mockPCA = createFakePca();

      expect(() => {
        new MsalBrowserTokenProvider(asPca(mockPCA), null as any);
      }).toThrow(DataverseInvalidRequestError);
    });

    it("should throw when scopes are empty", () => {
      const mockPCA = createFakePca();

      expect(() => {
        new MsalBrowserTokenProvider(asPca(mockPCA), {
          scopes: [],
        });
      }).toThrow(DataverseInvalidRequestError);
    });

    it("should construct successfully with valid options", () => {
      const mockPCA = createFakePca();

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      expect(provider).toBeInstanceOf(MsalBrowserTokenProvider);
    });

    it("should accept optional interactionType", () => {
      const mockPCA = createFakePca();

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
        interactionType: "redirect",
      });

      expect(provider).toBeInstanceOf(MsalBrowserTokenProvider);
    });
  });

  describe("Silent token acquisition", () => {
    it("should acquire token silently when possible", async () => {
      const mockPCA = createFakePca();
      mockPCA.acquireTokenSilent.mockResolvedValue(mockAuthResult);
      mockPCA.getAllAccounts.mockReturnValue([mockAccount]);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      const token = await provider.getToken();

      expect(token).toBe(mockAccessToken);
      expect(mockPCA.acquireTokenSilent).toHaveBeenCalledWith({
        scopes: mockScopes,
        account: mockAccount,
        claims: undefined,
        correlationId: undefined,
      });
    });

    it("should use configured account if provided", async () => {
      const customAccount: AccountInfo = {
        ...mockAccount,
        username: "custom@domain.com",
      };

      const mockPCA = createFakePca();
      mockPCA.acquireTokenSilent.mockResolvedValue(mockAuthResult);
      mockPCA.getAllAccounts.mockReturnValue([mockAccount, customAccount]);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
        account: customAccount,
      });

      await provider.getToken();

      expect(mockPCA.acquireTokenSilent).toHaveBeenCalledWith(
        expect.objectContaining({
          account: customAccount,
        })
      );
    });

    it("should override scopes when provided to getToken", async () => {
      const mockPCA = createFakePca();
      mockPCA.acquireTokenSilent.mockResolvedValue(mockAuthResult);
      mockPCA.getAllAccounts.mockReturnValue([mockAccount]);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      const customScopes = ["custom-scope"];
      await provider.getToken(customScopes);

      expect(mockPCA.acquireTokenSilent).toHaveBeenCalledWith(
        expect.objectContaining({
          scopes: customScopes,
        })
      );
    });

    it("should pass claims and correlationId from options", async () => {
      const mockPCA = createFakePca();
      mockPCA.acquireTokenSilent.mockResolvedValue(mockAuthResult);
      mockPCA.getAllAccounts.mockReturnValue([mockAccount]);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
        claims: "claim-data",
        correlationId: "corr-id",
      });

      await provider.getToken();

      expect(mockPCA.acquireTokenSilent).toHaveBeenCalledWith({
        scopes: mockScopes,
        account: mockAccount,
        claims: "claim-data",
        correlationId: "corr-id",
      });
    });

    it("should override claims and correlationId from getToken options", async () => {
      const mockPCA = createFakePca();
      mockPCA.acquireTokenSilent.mockResolvedValue(mockAuthResult);
      mockPCA.getAllAccounts.mockReturnValue([mockAccount]);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
        claims: "configured-claims",
        correlationId: "configured-corr-id",
      });

      await provider.getToken(undefined, {
        claims: "override-claims",
        correlationId: "override-corr-id",
      });

      expect(mockPCA.acquireTokenSilent).toHaveBeenCalledWith({
        scopes: mockScopes,
        account: mockAccount,
        claims: "override-claims",
        correlationId: "override-corr-id",
      });
    });
  });

  describe("Interactive token acquisition - popup", () => {
    it("should fallback to popup when interaction required", async () => {
      const mockPCA = createFakePca();
      mockPCA.acquireTokenSilent.mockRejectedValue(
        new InteractionRequiredAuthError("interaction_required")
      );
      mockPCA.acquireTokenPopup.mockResolvedValue(mockAuthResult);
      mockPCA.getAllAccounts.mockReturnValue([mockAccount]);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
        interactionType: "popup",
      });

      const token = await provider.getToken();

      expect(token).toBe(mockAccessToken);
      expect(mockPCA.acquireTokenSilent).toHaveBeenCalled();
      expect(mockPCA.acquireTokenPopup).toHaveBeenCalledWith({
        scopes: mockScopes,
        claims: undefined,
        correlationId: undefined,
      });
    });

    it("should use popup by default when interactionType not specified", async () => {
      const mockPCA = createFakePca();
      mockPCA.acquireTokenSilent.mockRejectedValue(
        new InteractionRequiredAuthError("interaction_required")
      );
      mockPCA.acquireTokenPopup.mockResolvedValue(mockAuthResult);
      mockPCA.getAllAccounts.mockReturnValue([mockAccount]);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      await provider.getToken();

      expect(mockPCA.acquireTokenPopup).toHaveBeenCalled();
    });
  });

  describe("Interactive token acquisition - redirect", () => {
    it("should fallback to redirect when configured", async () => {
      const mockPCA = createFakePca();
      mockPCA.acquireTokenSilent.mockRejectedValue(
        new InteractionRequiredAuthError("interaction_required")
      );
      mockPCA.acquireTokenRedirect.mockResolvedValue(undefined);
      mockPCA.getAllAccounts.mockReturnValue([mockAccount]);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
        interactionType: "redirect",
      });

      // Note: acquireTokenRedirect doesn't return a value (redirects the page)
      // In real scenarios, token is acquired on redirect callback
      const tokenPromise = provider.getToken();

      await expect(tokenPromise).rejects.toThrow(DataverseAuthenticationError);
      expect(mockPCA.acquireTokenRedirect).toHaveBeenCalledWith({
        scopes: mockScopes,
        claims: undefined,
        correlationId: undefined,
      });
    });
  });

  describe("Error handling", () => {
    it("should throw DataverseAuthenticationError when MSAL fails", async () => {
      const mockPCA = createFakePca();
      mockPCA.acquireTokenSilent.mockRejectedValue(new Error("Unknown MSAL error"));
      mockPCA.getAllAccounts.mockReturnValue([mockAccount]);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      await expect(provider.getToken()).rejects.toThrow(DataverseAuthenticationError);
    });

    it("should throw when access token is empty", async () => {
      const mockPCA = createFakePca();
      mockPCA.acquireTokenSilent.mockResolvedValue({
        ...mockAuthResult,
        accessToken: "",
      });
      mockPCA.getAllAccounts.mockReturnValue([mockAccount]);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      await expect(provider.getToken()).rejects.toThrow(DataverseAuthenticationError);
    });

    it("should throw when result is null", async () => {
      const mockPCA = createFakePca();
      mockPCA.acquireTokenSilent.mockResolvedValue(null);
      mockPCA.getAllAccounts.mockReturnValue([mockAccount]);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      await expect(provider.getToken()).rejects.toThrow(DataverseAuthenticationError);
    });

    it("should throw when no accounts are available", async () => {
      const mockPCA = createFakePca();
      mockPCA.getAllAccounts.mockReturnValue([]);
      mockPCA.acquireTokenSilent.mockResolvedValue({ ...mockAuthResult, accessToken: "" });

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      await expect(provider.getToken()).rejects.toThrow(DataverseAuthenticationError);
    });

    it("should throw when scopes array is empty in getToken", async () => {
      const mockPCA = createFakePca();
      mockPCA.getAllAccounts.mockReturnValue([mockAccount]);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      await expect(provider.getToken([])).rejects.toThrow(DataverseInvalidRequestError);
    });
  });

  describe("Helper methods", () => {
    it("should get all accounts", () => {
      const mockAccounts = [mockAccount];
      const mockPCA = createFakePca();
      mockPCA.getAllAccounts.mockReturnValue(mockAccounts);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      const accounts = provider.getAccounts();

      expect(accounts).toEqual(mockAccounts);
      expect(mockPCA.getAllAccounts).toHaveBeenCalled();
    });

    it("should get active account", () => {
      const mockPCA = createFakePca();
      mockPCA.getActiveAccount.mockReturnValue(mockAccount);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      const account = provider.getActiveAccount();

      expect(account).toEqual(mockAccount);
      expect(mockPCA.getActiveAccount).toHaveBeenCalled();
    });

    it("should set active account", () => {
      const mockPCA = createFakePca();
      mockPCA.setActiveAccount = vi.fn();

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      provider.setActiveAccount(mockAccount);

      expect(mockPCA.setActiveAccount).toHaveBeenCalledWith(mockAccount);
    });

    it("should sign out with account", async () => {
      const mockPCA = createFakePca();
      mockPCA.logoutPopup.mockResolvedValue(undefined);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
        interactionType: "popup",
      });

      await provider.signOut(mockAccount);

      expect(mockPCA.logoutPopup).toHaveBeenCalledWith({ account: mockAccount });
    });

    it("should sign out using redirect", async () => {
      const mockPCA = createFakePca();
      mockPCA.logoutRedirect.mockResolvedValue(undefined);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
        interactionType: "redirect",
      });

      await provider.signOut(mockAccount);

      expect(mockPCA.logoutRedirect).toHaveBeenCalledWith({ account: mockAccount });
    });

    it("should sign out all accounts when no account specified", async () => {
      const mockPCA = createFakePca();
      mockPCA.logoutPopup.mockResolvedValue(undefined);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      await provider.signOut();

      expect(mockPCA.logoutPopup).toHaveBeenCalledWith({ account: undefined });
    });
  });

  describe("Account resolution", () => {
    it("should use configured account when provided", async () => {
      const configuredAccount: AccountInfo = {
        ...mockAccount,
        username: "configured@domain.com",
      };

      const allAccounts = [mockAccount, configuredAccount];

      const mockPCA = createFakePca();
      mockPCA.acquireTokenSilent.mockResolvedValue(mockAuthResult);
      mockPCA.getAllAccounts.mockReturnValue(allAccounts);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
        account: configuredAccount,
      });

      await provider.getToken();

      expect(mockPCA.acquireTokenSilent).toHaveBeenCalledWith(
        expect.objectContaining({
          account: configuredAccount,
        })
      );
    });

    it("should use active account when no account configured", async () => {
      const activeAccount: AccountInfo = {
        ...mockAccount,
        username: "active@domain.com",
      };

      const mockPCA = createFakePca();
      mockPCA.acquireTokenSilent.mockResolvedValue(mockAuthResult);
      mockPCA.getAllAccounts.mockReturnValue([mockAccount, activeAccount]);
      mockPCA.getActiveAccount.mockReturnValue(activeAccount);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      await provider.getToken();

      expect(mockPCA.acquireTokenSilent).toHaveBeenCalledWith(
        expect.objectContaining({
          account: activeAccount,
        })
      );
    });

    it("should use first account when no account configured and no active account", async () => {
      const mockPCA = createFakePca();
      mockPCA.acquireTokenSilent.mockResolvedValue(mockAuthResult);
      mockPCA.getAllAccounts.mockReturnValue([mockAccount]);
      mockPCA.getActiveAccount.mockReturnValue(null);

      const provider = new MsalBrowserTokenProvider(asPca(mockPCA), {
        scopes: mockScopes,
      });

      await provider.getToken();

      expect(mockPCA.acquireTokenSilent).toHaveBeenCalledWith(
        expect.objectContaining({
          account: mockAccount,
        })
      );
    });
  });
});
