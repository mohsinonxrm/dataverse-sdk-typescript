import { describe, it, expect, vi, beforeEach } from "vitest";
import type { TokenCredential, GetTokenOptions, AccessToken } from "@azure/identity";
import { AzureIdentityTokenProvider } from "../src/AzureIdentityTokenProvider.js";
import {
  DataverseAuthenticationError,
  DataverseInvalidRequestError,
} from "@mohsinonxrm/dataverse-sdk-core";

// Mock TokenCredential
class MockTokenCredential implements TokenCredential {
  getToken = vi.fn<[string | string[], GetTokenOptions | undefined], Promise<AccessToken>>();
}

describe("AzureIdentityTokenProvider", () => {
  let mockCredential: MockTokenCredential;
  const defaultScopes = ["https://org.crm.dynamics.com/.default"];

  beforeEach(() => {
    mockCredential = new MockTokenCredential();
  });

  describe("constructor", () => {
    it("should create instance with valid credential and options", () => {
      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
      });

      expect(provider).toBeInstanceOf(AzureIdentityTokenProvider);
    });

    it("should throw if credential is not provided", () => {
      expect(() => {
        new AzureIdentityTokenProvider(null as any, { scopes: defaultScopes });
      }).toThrow(DataverseInvalidRequestError);
    });

    it("should throw if options are not provided", () => {
      expect(() => {
        new AzureIdentityTokenProvider(mockCredential, null as any);
      }).toThrow(DataverseInvalidRequestError);
    });

    it("should throw if scopes are empty", () => {
      expect(() => {
        new AzureIdentityTokenProvider(mockCredential, { scopes: [] });
      }).toThrow(DataverseInvalidRequestError);
    });

    it("should accept tenantId in options", () => {
      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
        tenantId: "tenant-123",
      });

      expect(provider.getOptions().tenantId).toBe("tenant-123");
    });

    it("should accept getTokenOptions in options", () => {
      const getTokenOptions = {
        requestOptions: { timeout: 30000 },
      };

      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
        getTokenOptions,
      });

      expect(provider.getOptions().getTokenOptions).toEqual(getTokenOptions);
    });
  });

  describe("getToken", () => {
    it("should acquire token with default scopes", async () => {
      const mockToken: AccessToken = {
        token: "mock-access-token",
        expiresOnTimestamp: Date.now() + 3600000,
      };

      mockCredential.getToken.mockResolvedValue(mockToken);

      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
      });

      const token = await provider.getToken();

      expect(token).toBe("mock-access-token");
      expect(mockCredential.getToken).toHaveBeenCalledWith(defaultScopes, expect.any(Object));
    });

    it("should acquire token with runtime scopes (array)", async () => {
      const runtimeScopes = ["https://other-org.crm.dynamics.com/.default"];
      const mockToken: AccessToken = {
        token: "mock-access-token",
        expiresOnTimestamp: Date.now() + 3600000,
      };

      mockCredential.getToken.mockResolvedValue(mockToken);

      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
      });

      const token = await provider.getToken(runtimeScopes);

      expect(token).toBe("mock-access-token");
      expect(mockCredential.getToken).toHaveBeenCalledWith(runtimeScopes, expect.any(Object));
    });

    it("should acquire token with runtime scopes (string)", async () => {
      const runtimeScope = "https://other-org.crm.dynamics.com/.default";
      const mockToken: AccessToken = {
        token: "mock-access-token",
        expiresOnTimestamp: Date.now() + 3600000,
      };

      mockCredential.getToken.mockResolvedValue(mockToken);

      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
      });

      const token = await provider.getToken(runtimeScope);

      expect(token).toBe("mock-access-token");
      expect(mockCredential.getToken).toHaveBeenCalledWith([runtimeScope], expect.any(Object));
    });

    it("should pass tenantId from options to getToken", async () => {
      const mockToken: AccessToken = {
        token: "mock-access-token",
        expiresOnTimestamp: Date.now() + 3600000,
      };

      mockCredential.getToken.mockResolvedValue(mockToken);

      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
      });

      await provider.getToken(undefined, { tenantId: "runtime-tenant" });

      expect(mockCredential.getToken).toHaveBeenCalledWith(
        defaultScopes,
        expect.objectContaining({ tenantId: "runtime-tenant" })
      );
    });

    it("should pass tenantId from constructor if not in runtime options", async () => {
      const mockToken: AccessToken = {
        token: "mock-access-token",
        expiresOnTimestamp: Date.now() + 3600000,
      };

      mockCredential.getToken.mockResolvedValue(mockToken);

      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
        tenantId: "constructor-tenant",
      });

      await provider.getToken();

      expect(mockCredential.getToken).toHaveBeenCalledWith(
        defaultScopes,
        expect.objectContaining({ tenantId: "constructor-tenant" })
      );
    });

    it("should pass claims from runtime options", async () => {
      const mockToken: AccessToken = {
        token: "mock-access-token",
        expiresOnTimestamp: Date.now() + 3600000,
      };

      mockCredential.getToken.mockResolvedValue(mockToken);

      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
      });

      const claims = '{"access_token":{"email":{"essential":true}}}';
      await provider.getToken(undefined, { claims });

      expect(mockCredential.getToken).toHaveBeenCalledWith(
        defaultScopes,
        expect.objectContaining({ claims })
      );
    });

    it("should not pass correlationId (not supported by Azure Identity)", async () => {
      const mockToken: AccessToken = {
        token: "mock-access-token",
        expiresOnTimestamp: Date.now() + 3600000,
      };

      mockCredential.getToken.mockResolvedValue(mockToken);

      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
      });

      const correlationId = "correlation-123";
      await provider.getToken(undefined, { correlationId });

      // correlationId is not part of GetTokenOptions in @azure/identity
      expect(mockCredential.getToken).toHaveBeenCalledWith(
        defaultScopes,
        expect.not.objectContaining({ correlationId })
      );
    });

    it("should pass getTokenOptions from constructor", async () => {
      const mockToken: AccessToken = {
        token: "mock-access-token",
        expiresOnTimestamp: Date.now() + 3600000,
      };

      mockCredential.getToken.mockResolvedValue(mockToken);

      const getTokenOptions = {
        requestOptions: { timeout: 30000 },
      };

      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
        getTokenOptions,
      });

      await provider.getToken();

      expect(mockCredential.getToken).toHaveBeenCalledWith(
        defaultScopes,
        expect.objectContaining({ requestOptions: { timeout: 30000 } })
      );
    });

    it("should throw if token response is null", async () => {
      mockCredential.getToken.mockResolvedValue(null as any);

      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
      });

      await expect(provider.getToken()).rejects.toThrow(DataverseAuthenticationError);
    });

    it("should throw if token string is empty", async () => {
      const mockToken: AccessToken = {
        token: "",
        expiresOnTimestamp: Date.now() + 3600000,
      };

      mockCredential.getToken.mockResolvedValue(mockToken);

      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
      });

      await expect(provider.getToken()).rejects.toThrow(DataverseAuthenticationError);
    });

    it("should wrap credential errors in DataverseAuthenticationError", async () => {
      const credentialError = new Error("Credential authentication failed");
      mockCredential.getToken.mockRejectedValue(credentialError);

      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
      });

      await expect(provider.getToken()).rejects.toThrow(DataverseAuthenticationError);
      await expect(provider.getToken()).rejects.toThrow(/Failed to acquire token/);
    });

    it("should preserve DataverseAuthenticationError from credential", async () => {
      const originalError = new DataverseAuthenticationError("Original error");
      mockCredential.getToken.mockRejectedValue(originalError);

      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
      });

      await expect(provider.getToken()).rejects.toThrow(originalError);
    });

    it("should preserve DataverseInvalidRequestError from credential", async () => {
      const originalError = new DataverseInvalidRequestError("Invalid request");
      mockCredential.getToken.mockRejectedValue(originalError);

      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
      });

      await expect(provider.getToken()).rejects.toThrow(originalError);
    });
  });

  describe("getCredential", () => {
    it("should return the underlying credential", () => {
      const provider = new AzureIdentityTokenProvider(mockCredential, {
        scopes: defaultScopes,
      });

      expect(provider.getCredential()).toBe(mockCredential);
    });
  });

  describe("getOptions", () => {
    it("should return frozen copy of options", () => {
      const options = {
        scopes: defaultScopes,
        tenantId: "tenant-123",
      };

      const provider = new AzureIdentityTokenProvider(mockCredential, options);
      const returnedOptions = provider.getOptions();

      expect(returnedOptions).toEqual(options);
      expect(Object.isFrozen(returnedOptions)).toBe(true);

      // Verify it's a copy
      expect(returnedOptions).not.toBe(options);
    });
  });
});
