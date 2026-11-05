/**
 * @fileoverview SPA helpers (#27): initializeMsal, scopesForEnvironment, authorityFor,
 * createMsalBrowserProvider, and a React-free main entry.
 */

import { describe, it, expect } from "vitest";
import type { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { TEST_ORG_URL, createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import {
  MsalBrowserTokenProvider,
  authorityFor,
  createMsalBrowserProvider,
  initializeMsal,
  scopesForEnvironment,
} from "../src/index.js";
import { asPca, createFakePca } from "./fakePca.js";

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

describe("initializeMsal", () => {
  it("initializes, then handles the redirect, in that order", async () => {
    const pca = createFakePca();
    const order: string[] = [];
    pca.initialize.mockImplementation(() => {
      order.push("initialize");
      return Promise.resolve();
    });
    pca.handleRedirectPromise.mockImplementation(() => {
      order.push("handleRedirectPromise");
      return Promise.resolve(null);
    });

    await initializeMsal(asPca(pca));

    expect(order).toEqual(["initialize", "handleRedirectPromise"]);
  });

  it("sets the redirect result's account as active and returns the result", async () => {
    const pca = createFakePca();
    const redirectResult = { accessToken: "t", account: bob } as AuthenticationResult;
    pca.handleRedirectPromise.mockResolvedValue(redirectResult);
    pca.getActiveAccount.mockReturnValue(alice);

    await expect(initializeMsal(asPca(pca))).resolves.toBe(redirectResult);
    expect(pca.setActiveAccount).toHaveBeenCalledWith(bob);
  });

  it("without a redirect result, activates the only cached account", async () => {
    const pca = createFakePca();
    pca.getAllAccounts.mockReturnValue([alice]);

    await expect(initializeMsal(asPca(pca))).resolves.toBeNull();
    expect(pca.setActiveAccount).toHaveBeenCalledWith(alice);
  });

  it("keeps an existing active account", async () => {
    const pca = createFakePca();
    pca.getAllAccounts.mockReturnValue([alice, bob]);
    pca.getActiveAccount.mockReturnValue(bob);

    await initializeMsal(asPca(pca));

    expect(pca.setActiveAccount).not.toHaveBeenCalled();
  });

  it("does not pick one of several cached accounts", async () => {
    const pca = createFakePca();
    pca.getAllAccounts.mockReturnValue([alice, bob]);

    await initializeMsal(asPca(pca));

    expect(pca.setActiveAccount).not.toHaveBeenCalled();
  });

  it("does nothing to accounts when none is cached", async () => {
    const pca = createFakePca();

    await initializeMsal(asPca(pca));

    expect(pca.setActiveAccount).not.toHaveBeenCalled();
  });
});

describe("scopesForEnvironment", () => {
  it("returns the user_impersonation scope by default", () => {
    expect(scopesForEnvironment("https://contoso.crm.dynamics.com")).toEqual([
      "https://contoso.crm.dynamics.com/user_impersonation",
    ]);
  });

  it("returns the .default scope on request", () => {
    expect(scopesForEnvironment("https://contoso.crm.dynamics.com", ".default")).toEqual([
      "https://contoso.crm.dynamics.com/.default",
    ]);
  });

  it("ignores a trailing slash, path, query and host case", () => {
    expect(
      scopesForEnvironment("https://Contoso.CRM4.dynamics.com/api/data/v9.2/?x=1#frag")
    ).toEqual(["https://contoso.crm4.dynamics.com/user_impersonation"]);
  });

  it.each([
    "contoso.crm.dynamics.com",
    "http://contoso.crm.dynamics.com",
    "https://u:p@contoso.crm.dynamics.com",
    "",
  ])("rejects %j", (url) => {
    expect(() => scopesForEnvironment(url)).toThrow(DataverseInvalidRequestError);
  });
});

describe("authorityFor", () => {
  it.each([
    ["public", "https://login.microsoftonline.com/organizations"],
    ["usgov", "https://login.microsoftonline.us/organizations"],
    ["usgovdod", "https://login.microsoftonline.us/organizations"],
    ["china", "https://login.partner.microsoftonline.cn/organizations"],
  ] as const)("%s defaults to the organizations endpoint", (cloud, expected) => {
    expect(authorityFor(cloud)).toBe(expected);
  });

  it("uses the given tenant id or domain", () => {
    expect(authorityFor("public", "8b2f3a4c-1d2e-4f5a-9b8c-7d6e5f4a3b2c")).toBe(
      "https://login.microsoftonline.com/8b2f3a4c-1d2e-4f5a-9b8c-7d6e5f4a3b2c"
    );
    expect(authorityFor("public", "contoso.onmicrosoft.com")).toBe(
      "https://login.microsoftonline.com/contoso.onmicrosoft.com"
    );
  });

  it("rejects an unknown cloud and an invalid tenant", () => {
    expect(() => authorityFor("mars" as "public")).toThrow(DataverseInvalidRequestError);
    expect(() => authorityFor("public", "contoso/../evil")).toThrow(DataverseInvalidRequestError);
  });
});

describe("createMsalBrowserProvider", () => {
  it("derives the scopes from environmentUrl, and the client sends its token", async () => {
    const pca = createFakePca();
    pca.getAllAccounts.mockReturnValue([alice]);
    pca.acquireTokenSilent.mockResolvedValue({
      accessToken: "token-1",
      account: alice,
    });

    const tokenProvider = createMsalBrowserProvider(asPca(pca), { environmentUrl: TEST_ORG_URL });
    const { client, fake } = createTestClient({ tokenProvider });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u-1" }));
    await client.api("/WhoAmI").get();

    expect(tokenProvider).toBeInstanceOf(MsalBrowserTokenProvider);
    expect(pca.acquireTokenSilent).toHaveBeenCalledWith(
      expect.objectContaining({ scopes: ["https://contoso.crm.dynamics.com/user_impersonation"] })
    );
    expect(fake.last().headers.authorization).toBe("Bearer token-1");
  });

  it("uses explicit scopes over environmentUrl and passes other options through", async () => {
    const pca = createFakePca();
    pca.acquireTokenRedirect.mockResolvedValue(undefined);

    const provider = createMsalBrowserProvider(asPca(pca), {
      scopes: ["https://fabrikam.crm.dynamics.com/.default"],
      environmentUrl: "https://contoso.crm.dynamics.com",
      interactionType: "redirect",
    });
    await provider.getToken().catch(() => undefined);

    expect(pca.acquireTokenRedirect).toHaveBeenCalledWith(
      expect.objectContaining({ scopes: ["https://fabrikam.crm.dynamics.com/.default"] })
    );
  });

  it("honours scopeKind", async () => {
    const pca = createFakePca();
    pca.getAllAccounts.mockReturnValue([alice]);
    pca.acquireTokenSilent.mockResolvedValue({ accessToken: "t" });

    const provider = createMsalBrowserProvider(asPca(pca), {
      environmentUrl: "https://contoso.crm.dynamics.com",
      scopeKind: ".default",
    });
    await provider.getToken();

    expect(pca.acquireTokenSilent).toHaveBeenCalledWith(
      expect.objectContaining({ scopes: ["https://contoso.crm.dynamics.com/.default"] })
    );
  });

  it("throws without scopes or environmentUrl", () => {
    expect(() => createMsalBrowserProvider(asPca(createFakePca()), {})).toThrow(
      DataverseInvalidRequestError
    );
  });
});

describe("main entry", () => {
  it("does not import React", () => {
    const sources = import.meta.glob<string>("../src/**/*.ts", {
      query: "?raw",
      import: "default",
      eager: true,
    });
    for (const [file, text] of Object.entries(sources)) {
      expect(text, file).not.toMatch(/from\s+["']react(?:-dom)?(?:\/[^"']*)?["']/);
    }
  });
});
