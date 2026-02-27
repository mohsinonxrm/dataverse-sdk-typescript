/**
 * @fileoverview Unit tests for MSAL Node Token Provider
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import type { AuthenticationResult, AccountInfo } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "../src/MsalNodeTokenProvider.js";
import {
  DataverseAuthenticationError,
  DataverseInvalidRequestError,
} from "@mohsinonxrm/dataverse-sdk-core";

// Mock the MSAL module with classes defined in the factory
vi.mock("@azure/msal-node", () => {
  class PublicClientApplication {
    acquireTokenByDeviceCode = vi.fn();
    acquireTokenByUsernamePassword = vi.fn();
    acquireTokenByCode = vi.fn();
    acquireTokenSilent = vi.fn();
    getAuthCodeUrl = vi.fn();
    getTokenCache = vi.fn();
  }

  class ConfidentialClientApplication {
    acquireTokenByClientCredential = vi.fn();
    acquireTokenByCode = vi.fn();
    acquireTokenSilent = vi.fn();
    getAuthCodeUrl = vi.fn();
    getTokenCache = vi.fn();
  }

  return {
    PublicClientApplication: PublicClientApplication,
    ConfidentialClientApplication: ConfidentialClientApplication,
  };
});

// Import the mocked classes after mocking
import { PublicClientApplication, ConfidentialClientApplication } from "@azure/msal-node";

describe("MsalNodeTokenProvider", () => {
  const mockScopes = ["https://org.crm.dynamics.com/.default"];
  const mockAccessToken = "mock-access-token";

  const mockAuthResult: AuthenticationResult = {
    authority: "https://login.microsoftonline.com/tenant",
    uniqueId: "unique-id",
    tenantId: "tenant-id",
    scopes: mockScopes,
    account: null,
    idToken: "id-token",
    idTokenClaims: {},
    accessToken: mockAccessToken,
    fromCache: false,
    expiresOn: new Date(Date.now() + 3600000),
    tokenType: "Bearer",
    correlationId: "correlation-id",
  };

  const mockAccount: AccountInfo = {
    homeAccountId: "home-account-id",
    environment: "login.microsoftonline.com",
    tenantId: "tenant-id",
    username: "user@domain.com",
    localAccountId: "local-account-id",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Constructor validation", () => {
    it("should throw when clientApplication is missing", () => {
      expect(() => {
        new MsalNodeTokenProvider(null as any, {
          flow: "clientCredentials",
          scopes: mockScopes,
        });
      }).toThrow(DataverseInvalidRequestError);
    });

    it("should throw when options are missing", () => {
      const mockCCA = new (ConfidentialClientApplication as any)();

      expect(() => {
        new MsalNodeTokenProvider(mockCCA, null as any);
      }).toThrow(DataverseInvalidRequestError);
    });

    it("should throw when scopes are empty", () => {
      const mockCCA = new (ConfidentialClientApplication as any)();

      expect(() => {
        new MsalNodeTokenProvider(mockCCA, {
          flow: "clientCredentials",
          scopes: [],
        });
      }).toThrow(DataverseInvalidRequestError);
    });

    it("should throw when device code flow uses ConfidentialClientApplication", () => {
      const mockCCA = new (ConfidentialClientApplication as any)();

      expect(() => {
        new MsalNodeTokenProvider(mockCCA, {
          flow: "deviceCode",
          scopes: mockScopes,
          deviceCodeCallback: vi.fn(),
        });
      }).toThrow(DataverseInvalidRequestError);
    });

    it("should throw when client credentials flow uses PublicClientApplication", () => {
      const mockPCA = new (PublicClientApplication as any)();

      expect(() => {
        new MsalNodeTokenProvider(mockPCA, {
          flow: "clientCredentials",
          scopes: mockScopes,
        });
      }).toThrow(DataverseInvalidRequestError);
    });

    it("should throw when device code flow is missing callback", () => {
      const mockPCA = new (PublicClientApplication as any)();

      expect(() => {
        new MsalNodeTokenProvider(mockPCA, {
          flow: "deviceCode",
          scopes: mockScopes,
        } as any);
      }).toThrow(DataverseInvalidRequestError);
    });

    it("should throw when authorization code flow is missing redirectUri", () => {
      const mockCCA = new (ConfidentialClientApplication as any)();

      expect(() => {
        new MsalNodeTokenProvider(mockCCA, {
          flow: "authorizationCode",
          scopes: mockScopes,
        } as any);
      }).toThrow(DataverseInvalidRequestError);
    });
  });

  describe("Device code flow", () => {
    it("should acquire token using device code", async () => {
      const mockDeviceCodeCallback = vi.fn();
      const mockPCA = new (PublicClientApplication as any)();
      mockPCA.acquireTokenByDeviceCode.mockResolvedValue(mockAuthResult);

      const provider = new MsalNodeTokenProvider(mockPCA, {
        flow: "deviceCode",
        scopes: mockScopes,
        deviceCodeCallback: mockDeviceCodeCallback,
      });

      const token = await provider.getToken();

      expect(token).toBe(mockAccessToken);
      expect(mockPCA.acquireTokenByDeviceCode).toHaveBeenCalledWith({
        scopes: mockScopes,
        deviceCodeCallback: mockDeviceCodeCallback,
        claims: undefined,
        correlationId: undefined,
      });
    });

    it("should pass claims and correlationId from options", async () => {
      const mockDeviceCodeCallback = vi.fn();
      const mockPCA = new (PublicClientApplication as any)();
      mockPCA.acquireTokenByDeviceCode.mockResolvedValue(mockAuthResult);

      const provider = new MsalNodeTokenProvider(mockPCA, {
        flow: "deviceCode",
        scopes: mockScopes,
        deviceCodeCallback: mockDeviceCodeCallback,
        claims: "claim-data",
        correlationId: "corr-id",
      });

      await provider.getToken();

      expect(mockPCA.acquireTokenByDeviceCode).toHaveBeenCalledWith({
        scopes: mockScopes,
        deviceCodeCallback: mockDeviceCodeCallback,
        claims: "claim-data",
        correlationId: "corr-id",
      });
    });

    it("should override scopes when provided to getToken", async () => {
      const mockDeviceCodeCallback = vi.fn();
      const mockPCA = new (PublicClientApplication as any)();
      mockPCA.acquireTokenByDeviceCode.mockResolvedValue(mockAuthResult);

      const provider = new MsalNodeTokenProvider(mockPCA, {
        flow: "deviceCode",
        scopes: mockScopes,
        deviceCodeCallback: mockDeviceCodeCallback,
      });

      const customScopes = ["custom-scope"];
      await provider.getToken(customScopes);

      expect(mockPCA.acquireTokenByDeviceCode).toHaveBeenCalledWith(
        expect.objectContaining({
          scopes: customScopes,
        })
      );
    });
  });

  describe("Client credentials flow", () => {
    it("should acquire token using client credentials", async () => {
      const mockCCA = new (ConfidentialClientApplication as any)();
      mockCCA.acquireTokenByClientCredential.mockResolvedValue(mockAuthResult);

      const provider = new MsalNodeTokenProvider(mockCCA, {
        flow: "clientCredentials",
        scopes: mockScopes,
      });

      const token = await provider.getToken();

      expect(token).toBe(mockAccessToken);
      expect(mockCCA.acquireTokenByClientCredential).toHaveBeenCalledWith({
        scopes: mockScopes,
        azureRegion: undefined,
        claims: undefined,
        correlationId: undefined,
      });
    });

    it("should override authority with tenantId", async () => {
      const mockCCA = new (ConfidentialClientApplication as any)();
      mockCCA.acquireTokenByClientCredential.mockResolvedValue(mockAuthResult);

      const provider = new MsalNodeTokenProvider(mockCCA, {
        flow: "clientCredentials",
        scopes: mockScopes,
        tenantId: "custom-tenant",
      });

      await provider.getToken();

      expect(mockCCA.acquireTokenByClientCredential).toHaveBeenCalledWith(
        expect.objectContaining({
          authority: "https://login.microsoftonline.com/custom-tenant",
        })
      );
    });

    it("should prefer tenantId from getToken options", async () => {
      const mockCCA = new (ConfidentialClientApplication as any)();
      mockCCA.acquireTokenByClientCredential.mockResolvedValue(mockAuthResult);

      const provider = new MsalNodeTokenProvider(mockCCA, {
        flow: "clientCredentials",
        scopes: mockScopes,
        tenantId: "configured-tenant",
      });

      await provider.getToken(undefined, { tenantId: "override-tenant" });

      expect(mockCCA.acquireTokenByClientCredential).toHaveBeenCalledWith(
        expect.objectContaining({
          authority: "https://login.microsoftonline.com/override-tenant",
        })
      );
    });
  });

  describe("Authorization code flow", () => {
    it("should acquire token using authorization code", async () => {
      const mockCCA = new (ConfidentialClientApplication as any)();
      mockCCA.acquireTokenByCode.mockResolvedValue(mockAuthResult);

      const provider = new MsalNodeTokenProvider(mockCCA, {
        flow: "authorizationCode",
        scopes: mockScopes,
        redirectUri: "http://localhost:3000/callback",
        code: "auth-code",
        codeVerifier: "code-verifier",
      });

      const token = await provider.getToken();

      expect(token).toBe(mockAccessToken);
      expect(mockCCA.acquireTokenByCode).toHaveBeenCalledWith({
        scopes: mockScopes,
        redirectUri: "http://localhost:3000/callback",
        code: "auth-code",
        codeVerifier: "code-verifier",
        claims: undefined,
        correlationId: undefined,
      });
    });

    it("should throw when code is missing", async () => {
      const mockCCA = new (ConfidentialClientApplication as any)();

      const provider = new MsalNodeTokenProvider(mockCCA, {
        flow: "authorizationCode",
        scopes: mockScopes,
        redirectUri: "http://localhost:3000/callback",
      });

      await expect(provider.getToken()).rejects.toThrow(DataverseInvalidRequestError);
    });
  });

  describe("Username/password flow", () => {
    it("should acquire token using username/password", async () => {
      const mockPCA = new (PublicClientApplication as any)();
      mockPCA.acquireTokenByUsernamePassword.mockResolvedValue(mockAuthResult);

      const provider = new MsalNodeTokenProvider(mockPCA, {
        flow: "usernamePassword",
        scopes: mockScopes,
        username: "user@domain.com",
        password: "password123",
      });

      const token = await provider.getToken();

      expect(token).toBe(mockAccessToken);
      expect(mockPCA.acquireTokenByUsernamePassword).toHaveBeenCalledWith({
        scopes: mockScopes,
        username: "user@domain.com",
        password: "password123",
        claims: undefined,
        correlationId: undefined,
      });
    });

    it("should throw when username or password is missing", () => {
      const mockPCA = new (PublicClientApplication as any)();

      expect(() => {
        new MsalNodeTokenProvider(mockPCA, {
          flow: "usernamePassword",
          scopes: mockScopes,
          username: "user@domain.com",
        } as any);
      }).toThrow(DataverseInvalidRequestError);
    });
  });

  describe("Silent flow", () => {
    it("should acquire token silently", async () => {
      const mockCCA = new (ConfidentialClientApplication as any)();
      mockCCA.acquireTokenSilent.mockResolvedValue(mockAuthResult);

      const provider = new MsalNodeTokenProvider(mockCCA, {
        flow: "silent",
        scopes: mockScopes,
        account: mockAccount,
      });

      const token = await provider.getToken();

      expect(token).toBe(mockAccessToken);
      expect(mockCCA.acquireTokenSilent).toHaveBeenCalledWith({
        scopes: mockScopes,
        account: mockAccount,
        forceRefresh: false,
        claims: undefined,
        correlationId: undefined,
      });
    });

    it("should throw when account is missing", () => {
      const mockCCA = new (ConfidentialClientApplication as any)();

      expect(() => {
        new MsalNodeTokenProvider(mockCCA, {
          flow: "silent",
          scopes: mockScopes,
        } as any);
      }).toThrow(DataverseInvalidRequestError);
    });
  });

  describe("Error handling", () => {
    it("should throw DataverseAuthenticationError when MSAL fails", async () => {
      const mockCCA = new (ConfidentialClientApplication as any)();
      mockCCA.acquireTokenByClientCredential.mockRejectedValue(new Error("MSAL error"));

      const provider = new MsalNodeTokenProvider(mockCCA, {
        flow: "clientCredentials",
        scopes: mockScopes,
      });

      await expect(provider.getToken()).rejects.toThrow(DataverseAuthenticationError);
    });

    it("should throw when access token is empty", async () => {
      const mockCCA = new (ConfidentialClientApplication as any)();
      mockCCA.acquireTokenByClientCredential.mockResolvedValue({
        ...mockAuthResult,
        accessToken: "",
      });

      const provider = new MsalNodeTokenProvider(mockCCA, {
        flow: "clientCredentials",
        scopes: mockScopes,
      });

      await expect(provider.getToken()).rejects.toThrow(DataverseAuthenticationError);
    });

    it("should throw when result is null", async () => {
      const mockCCA = new (ConfidentialClientApplication as any)();
      mockCCA.acquireTokenByClientCredential.mockResolvedValue(null);

      const provider = new MsalNodeTokenProvider(mockCCA, {
        flow: "clientCredentials",
        scopes: mockScopes,
      });

      await expect(provider.getToken()).rejects.toThrow(DataverseAuthenticationError);
    });
  });

  describe("Helper methods", () => {
    it("should get authorization code URL", async () => {
      const mockCCA = new (ConfidentialClientApplication as any)();
      mockCCA.getAuthCodeUrl.mockResolvedValue("https://login.microsoftonline.com/authorize?...");

      const provider = new MsalNodeTokenProvider(mockCCA, {
        flow: "authorizationCode",
        scopes: mockScopes,
        redirectUri: "http://localhost:3000/callback",
        code: "auth-code",
      });

      const url = await provider.getAuthCodeUrl(
        "http://localhost:3000/callback",
        mockScopes,
        "state-value",
        "code-challenge"
      );

      expect(url).toBe("https://login.microsoftonline.com/authorize?...");
      expect(mockCCA.getAuthCodeUrl).toHaveBeenCalledWith({
        scopes: mockScopes,
        redirectUri: "http://localhost:3000/callback",
        state: "state-value",
        codeChallenge: "code-challenge",
        codeChallengeMethod: "S256",
      });
    });

    it("should get cached account", async () => {
      const authResultWithAccount = { ...mockAuthResult, account: mockAccount };
      const mockCCA = new (ConfidentialClientApplication as any)();
      mockCCA.acquireTokenByClientCredential.mockResolvedValue(authResultWithAccount);

      const provider = new MsalNodeTokenProvider(mockCCA, {
        flow: "clientCredentials",
        scopes: mockScopes,
      });

      expect(provider.getCachedAccount()).toBeUndefined();

      await provider.getToken();

      expect(provider.getCachedAccount()).toEqual(mockAccount);
    });

    it("should get all accounts from cache", async () => {
      const mockAccounts = [mockAccount];
      const mockTokenCache = {
        getAllAccounts: vi.fn().mockResolvedValue(mockAccounts),
      };
      const mockCCA = new (ConfidentialClientApplication as any)();
      mockCCA.getTokenCache.mockReturnValue(mockTokenCache);

      const provider = new MsalNodeTokenProvider(mockCCA, {
        flow: "clientCredentials",
        scopes: mockScopes,
      });

      const accounts = await provider.getAccounts();

      expect(accounts).toEqual(mockAccounts);
      expect(mockTokenCache.getAllAccounts).toHaveBeenCalled();
    });

    it("should clear cache", async () => {
      const mockTokenCache = {
        getAllAccounts: vi.fn().mockResolvedValue([mockAccount]),
        removeAccount: vi.fn().mockResolvedValue(undefined),
      };
      const authResultWithAccount = { ...mockAuthResult, account: mockAccount };
      const mockCCA = new (ConfidentialClientApplication as any)();
      mockCCA.getTokenCache.mockReturnValue(mockTokenCache);
      mockCCA.acquireTokenByClientCredential.mockResolvedValue(authResultWithAccount);

      const provider = new MsalNodeTokenProvider(mockCCA, {
        flow: "clientCredentials",
        scopes: mockScopes,
      });

      // Acquire token to cache account
      await provider.getToken();
      expect(provider.getCachedAccount()).toBeDefined();

      // Clear cache
      await provider.clearCache();

      expect(mockTokenCache.removeAccount).toHaveBeenCalledWith(mockAccount);
      expect(provider.getCachedAccount()).toBeUndefined();
    });
  });
});
