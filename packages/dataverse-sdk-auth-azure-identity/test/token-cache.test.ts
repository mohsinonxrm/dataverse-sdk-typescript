/**
 * @fileoverview #86: the provider caches tokens until a refresh margin before expiry, shares one
 * credential call between concurrent requests, and skips the cache for `forceRefresh` and claims.
 *
 * Requests go through a real `DataverseClient` with the testing package's fake fetch, the way an
 * app uses the provider. The credential is a fake `TokenCredential` that counts its calls.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/identity";
import { DataverseAuthenticationError } from "@mohsinonxrm/dataverse-sdk-core";
import { createTestClient, jsonResponse, odataError } from "@mohsinonxrm/dataverse-sdk-testing";
import { AzureIdentityTokenProvider, DEFAULT_REFRESH_MARGIN_MS } from "../src/index.js";

const scopes = ["https://contoso.crm.dynamics.com/.default"];
const HOUR = 60 * 60 * 1000;
const MINUTE = 60 * 1000;

interface FakeCredential extends TokenCredential {
  calls: Array<{ scopes: string | string[]; options: GetTokenOptions | undefined }>;
  /** Lifetime of the tokens it issues, from "now". */
  lifetimeMs: number;
  refreshAfterMs?: number;
  fail?: Error;
}

function fakeCredential(): FakeCredential {
  const credential: FakeCredential = {
    calls: [],
    lifetimeMs: HOUR,
    getToken(requestScopes, options) {
      credential.calls.push({ scopes: requestScopes, options });
      if (credential.fail) {
        return Promise.reject(credential.fail);
      }
      const now = Date.now();
      const token: AccessToken = {
        token: `token-${String(credential.calls.length)}`,
        expiresOnTimestamp: now + credential.lifetimeMs,
        ...(credential.refreshAfterMs !== undefined
          ? { refreshAfterTimestamp: now + credential.refreshAfterMs }
          : {}),
      };
      return Promise.resolve(token);
    },
  };
  return credential;
}

function clientFor(tokenProvider: AzureIdentityTokenProvider) {
  const { client, fake } = createTestClient({ tokenProvider });
  fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "00000000-0000-0000-0000-000000000001" }));
  return {
    fake,
    whoAmI: () => client.api("/WhoAmI").get<{ UserId: string }>(),
    tokens: () => fake.requests.map((r) => r.headers.authorization),
  };
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("#86: token cache", () => {
  it("calls the credential once for many requests while the token is fresh", async () => {
    const credential = fakeCredential();
    const { whoAmI, tokens } = clientFor(new AzureIdentityTokenProvider(credential, { scopes }));

    await whoAmI();
    await whoAmI();
    await whoAmI();

    expect(credential.calls).toHaveLength(1);
    expect(tokens()).toEqual(["Bearer token-1", "Bearer token-1", "Bearer token-1"]);
  });

  it("concurrent requests share one credential call", async () => {
    const credential = fakeCredential();
    const { whoAmI } = clientFor(new AzureIdentityTokenProvider(credential, { scopes }));

    await Promise.all([whoAmI(), whoAmI(), whoAmI(), whoAmI()]);

    expect(credential.calls).toHaveLength(1);
  });

  it("gets a new token once inside the refresh margin (default 5 minutes)", async () => {
    const credential = fakeCredential();
    const provider = new AzureIdentityTokenProvider(credential, { scopes });
    expect(DEFAULT_REFRESH_MARGIN_MS).toBe(5 * MINUTE);

    await provider.getToken();
    vi.setSystemTime(Date.now() + HOUR - 5 * MINUTE - 1);
    await expect(provider.getToken()).resolves.toBe("token-1");
    vi.setSystemTime(Date.now() + 1);
    await expect(provider.getToken()).resolves.toBe("token-2");

    expect(credential.calls).toHaveLength(2);
  });

  it("honours a custom refreshMarginMs", async () => {
    const credential = fakeCredential();
    const provider = new AzureIdentityTokenProvider(credential, {
      scopes,
      refreshMarginMs: 20 * MINUTE,
    });

    await provider.getToken();
    vi.setSystemTime(Date.now() + 40 * MINUTE);
    await expect(provider.getToken()).resolves.toBe("token-2");
  });

  it("uses refreshAfterTimestamp when the credential sets an earlier one", async () => {
    const credential = fakeCredential();
    credential.refreshAfterMs = 30 * MINUTE;
    const provider = new AzureIdentityTokenProvider(credential, { scopes });

    await provider.getToken();
    vi.setSystemTime(Date.now() + 29 * MINUTE);
    await expect(provider.getToken()).resolves.toBe("token-1");
    vi.setSystemTime(Date.now() + MINUTE);
    await expect(provider.getToken()).resolves.toBe("token-2");
  });

  it("refreshes a short-lived token at half its lifetime", async () => {
    const credential = fakeCredential();
    credential.lifetimeMs = 6 * MINUTE;
    const provider = new AzureIdentityTokenProvider(credential, { scopes });

    await provider.getToken();
    vi.setSystemTime(Date.now() + 2 * MINUTE);
    await expect(provider.getToken()).resolves.toBe("token-1");
    vi.setSystemTime(Date.now() + MINUTE);
    await expect(provider.getToken()).resolves.toBe("token-2");
  });

  it("caches per scope set (in any order) and per tenant", async () => {
    const credential = fakeCredential();
    const provider = new AzureIdentityTokenProvider(credential, { scopes });
    const two = ["https://a.example/.default", "https://b.example/.default"];

    await provider.getToken(two);
    await provider.getToken([...two].reverse());
    await provider.getToken();
    await provider.getToken(undefined, { tenantId: "other-tenant" });
    await provider.getToken(undefined, { tenantId: "other-tenant" });

    expect(credential.calls).toHaveLength(3);
    expect(credential.calls[2]?.options?.tenantId).toBe("other-tenant");
  });

  it("does not cache a token without a usable expiry", async () => {
    const credential = fakeCredential();
    credential.lifetimeMs = Number.NaN;
    const provider = new AzureIdentityTokenProvider(credential, { scopes });

    await provider.getToken();
    await provider.getToken();

    expect(credential.calls).toHaveLength(2);
  });

  it("cacheTokens: false calls the credential every time", async () => {
    const credential = fakeCredential();
    const provider = new AzureIdentityTokenProvider(credential, { scopes, cacheTokens: false });

    await provider.getToken();
    await provider.getToken();

    expect(credential.calls).toHaveLength(2);
  });

  it("clearTokenCache forgets cached tokens", async () => {
    const credential = fakeCredential();
    const provider = new AzureIdentityTokenProvider(credential, { scopes });

    await provider.getToken();
    provider.clearTokenCache();
    await provider.getToken();

    expect(credential.calls).toHaveLength(2);
  });

  it("rejects an invalid refreshMarginMs", () => {
    expect(
      () => new AzureIdentityTokenProvider(fakeCredential(), { scopes, refreshMarginMs: -1 })
    ).toThrow("refreshMarginMs");
  });
});

describe("#86: forceRefresh and claims skip the cache", () => {
  it("after a 401 the retry gets a new token from the credential, which is then cached", async () => {
    const credential = fakeCredential();
    const { fake, whoAmI, tokens } = clientFor(
      new AzureIdentityTokenProvider(credential, { scopes })
    );
    await whoAmI();
    fake.on("GET", "/WhoAmI", () => odataError(401, "0x80040220", "Token expired"), 1);

    await whoAmI();
    await whoAmI();

    expect(credential.calls).toHaveLength(2);
    expect(tokens()).toEqual([
      "Bearer token-1",
      "Bearer token-1",
      "Bearer token-2",
      "Bearer token-2",
    ]);
  });

  it("getToken with forceRefresh bypasses a fresh cached token", async () => {
    const credential = fakeCredential();
    const provider = new AzureIdentityTokenProvider(credential, { scopes });

    await provider.getToken();
    await expect(provider.getToken(undefined, { forceRefresh: true })).resolves.toBe("token-2");
    await expect(provider.getToken()).resolves.toBe("token-2");
  });

  it("a claims challenge is passed to the credential and its token replaces the cached one", async () => {
    const credential = fakeCredential();
    const provider = new AzureIdentityTokenProvider(credential, { scopes });
    const claims = '{"access_token":{"nbf":{"essential":true,"value":"1700000000"}}}';

    await provider.getToken();
    await expect(provider.getToken(undefined, { claims })).resolves.toBe("token-2");
    await expect(provider.getToken()).resolves.toBe("token-2");

    expect(credential.calls[1]?.options?.claims).toBe(claims);
    expect(credential.calls).toHaveLength(2);
  });
});

describe("#86: failures", () => {
  it("a failed call is not cached; the error keeps the credential error as cause", async () => {
    const credential = fakeCredential();
    const failure = Object.assign(new Error("Please run 'az login' to set up account."), {
      name: "CredentialUnavailableError",
    });
    credential.fail = failure;
    const provider = new AzureIdentityTokenProvider(credential, { scopes });

    const error = (await provider.getToken().catch((e: unknown) => e)) as Error;
    expect(error).toBeInstanceOf(DataverseAuthenticationError);
    expect(error.cause).toBe(failure);

    credential.fail = undefined;
    await expect(provider.getToken()).resolves.toBe("token-2");
  });

  it("concurrent callers all get the error of a shared failed call", async () => {
    const credential = fakeCredential();
    credential.fail = new Error("boom");
    const provider = new AzureIdentityTokenProvider(credential, { scopes });

    const results = await Promise.allSettled([provider.getToken(), provider.getToken()]);

    expect(results.map((r) => r.status)).toEqual(["rejected", "rejected"]);
    expect(credential.calls).toHaveLength(1);
  });

  it("a failed refresh inside the margin returns the still-valid cached token", async () => {
    const credential = fakeCredential();
    const provider = new AzureIdentityTokenProvider(credential, { scopes });
    await provider.getToken();

    vi.setSystemTime(Date.now() + HOUR - 2 * MINUTE);
    credential.fail = new Error("az timed out");
    await expect(provider.getToken()).resolves.toBe("token-1");

    vi.setSystemTime(Date.now() + 2 * MINUTE);
    await expect(provider.getToken()).rejects.toThrow("az timed out");
  });

  it("a failed forceRefresh is thrown, not answered with the rejected cached token", async () => {
    const credential = fakeCredential();
    const provider = new AzureIdentityTokenProvider(credential, { scopes });
    await provider.getToken();
    credential.fail = new Error("boom");

    await expect(provider.getToken(undefined, { forceRefresh: true })).rejects.toThrow("boom");
  });
});
