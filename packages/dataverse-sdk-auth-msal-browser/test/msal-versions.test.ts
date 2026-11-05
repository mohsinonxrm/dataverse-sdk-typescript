/**
 * @fileoverview The provider works with the app's own copy of @azure/msal-browser (#24).
 *
 * The errors below are real error classes from three separately installed MSAL majors
 * (3.x as `@azure/msal-browser`, 4.x and 5.x through npm aliases). None of them is the copy the
 * provider was built against, which is what happens in an app: the app's MSAL throws, and the
 * provider must still recognise "interaction required" without `instanceof`.
 */

import { describe, it, expect } from "vitest";
import * as msal3 from "@azure/msal-browser";
import * as msal4 from "msal-browser-v4";
import * as msal5 from "msal-browser-v5";
import type { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { DataverseAuthenticationError } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalBrowserTokenProvider, isInteractionRequiredError } from "../src/index.js";
import { asPca, createFakePca } from "./fakePca.js";
import pkg from "../package.json" with { type: "json" };

const scopes = ["https://contoso.crm.dynamics.com/user_impersonation"];

const account: AccountInfo = {
  homeAccountId: "home-id",
  environment: "login.microsoftonline.com",
  tenantId: "tenant-id",
  username: "user@contoso.com",
  localAccountId: "local-id",
};

const popupResult = {
  accessToken: "popup-token",
  account,
} as AuthenticationResult;

/**
 * Builds real MSAL errors for one major. The constructor signatures differ between majors
 * (5.x added `correlationId` as the second argument), so each major gets its own factory.
 */
interface MsalCopy {
  label: string;
  interactionRequired(code: string): Error;
  browserAuthError(code: string): Error;
  serverError(code: string): Error;
  InteractionRequiredAuthError: abstract new (...args: never[]) => Error;
}

const copies: MsalCopy[] = [
  {
    label: "msal-browser 3.x",
    interactionRequired: (code) => new msal3.InteractionRequiredAuthError(code, "message", "sub"),
    browserAuthError: (code) => new msal3.BrowserAuthError(code),
    serverError: (code) => new msal3.ServerError(code, "message"),
    InteractionRequiredAuthError: msal3.InteractionRequiredAuthError,
  },
  {
    label: "msal-browser 4.x",
    interactionRequired: (code) => new msal4.InteractionRequiredAuthError(code, "message", "sub"),
    browserAuthError: (code) => new msal4.BrowserAuthError(code),
    serverError: (code) => new msal4.ServerError(code, "message"),
    InteractionRequiredAuthError: msal4.InteractionRequiredAuthError,
  },
  {
    label: "msal-browser 5.x",
    interactionRequired: (code) =>
      new msal5.InteractionRequiredAuthError(code, "corr-id", "message", "sub"),
    browserAuthError: (code) => new msal5.BrowserAuthError(code, "corr-id"),
    serverError: (code) => new msal5.ServerError(code, "corr-id", "message"),
    InteractionRequiredAuthError: msal5.InteractionRequiredAuthError,
  },
];

function providerThatFailsSilentlyWith(error: unknown) {
  const pca = createFakePca();
  pca.getAllAccounts.mockReturnValue([account]);
  pca.getActiveAccount.mockReturnValue(account);
  pca.acquireTokenSilent.mockRejectedValue(error);
  pca.acquireTokenPopup.mockResolvedValue(popupResult);
  const provider = new MsalBrowserTokenProvider(asPca(pca), {
    scopes,
    interactionType: "popup",
  });
  return { pca, provider };
}

describe("errors from the app's own MSAL copy (#24)", () => {
  it("the three copies really are different classes", () => {
    // Guards the premise of this file: instanceof does not work across copies.
    const fromV5 = new msal5.InteractionRequiredAuthError("consent_required", "corr-id");
    expect(fromV5).not.toBeInstanceOf(msal3.InteractionRequiredAuthError);
    expect(fromV5).not.toBeInstanceOf(msal4.InteractionRequiredAuthError);
    const fromV4 = new msal4.InteractionRequiredAuthError("consent_required");
    expect(fromV4).not.toBeInstanceOf(msal3.InteractionRequiredAuthError);
  });

  describe.each(copies)("$label", (copy) => {
    it.each(["consent_required", "interaction_required", "login_required"])(
      "InteractionRequiredAuthError(%s) from the silent call opens the popup",
      async (code) => {
        const { pca, provider } = providerThatFailsSilentlyWith(copy.interactionRequired(code));

        await expect(provider.getToken()).resolves.toBe("popup-token");
        expect(pca.acquireTokenPopup).toHaveBeenCalledTimes(1);
      }
    );

    it("an MSAL-defined interaction code (no_tokens_found) opens the popup", async () => {
      const { pca, provider } = providerThatFailsSilentlyWith(
        copy.interactionRequired("no_tokens_found")
      );

      await expect(provider.getToken()).resolves.toBe("popup-token");
      expect(pca.acquireTokenPopup).toHaveBeenCalledTimes(1);
    });

    it("a server error that is not interaction-related does not open the popup", async () => {
      const { pca, provider } = providerThatFailsSilentlyWith(copy.serverError("invalid_client"));

      await expect(provider.getToken()).rejects.toBeInstanceOf(DataverseAuthenticationError);
      expect(pca.acquireTokenPopup).not.toHaveBeenCalled();
    });

    it("a browser error that is not interaction-related does not open the popup", async () => {
      const { pca, provider } = providerThatFailsSilentlyWith(
        copy.browserAuthError("post_request_failed")
      );

      await expect(provider.getToken()).rejects.toBeInstanceOf(DataverseAuthenticationError);
      expect(pca.acquireTokenPopup).not.toHaveBeenCalled();
    });

    it("isInteractionRequiredError recognises the copy's InteractionRequiredAuthError", () => {
      expect(isInteractionRequiredError(copy.interactionRequired("consent_required"))).toBe(true);
      expect(isInteractionRequiredError(copy.serverError("invalid_client"))).toBe(false);
    });
  });
});

describe("isInteractionRequiredError", () => {
  it("matches on errorCode alone (e.g. an error re-created by a bundler or a worker)", () => {
    expect(isInteractionRequiredError({ name: "AuthError", errorCode: "consent_required" })).toBe(
      true
    );
    expect(isInteractionRequiredError({ errorCode: "refresh_token_expired" })).toBe(true);
  });

  it("matches on name alone", () => {
    const error = new Error("interaction needed");
    error.name = "InteractionRequiredAuthError";
    expect(isInteractionRequiredError(error)).toBe(true);
  });

  it("is false for anything else", () => {
    expect(isInteractionRequiredError(undefined)).toBe(false);
    expect(isInteractionRequiredError(null)).toBe(false);
    expect(isInteractionRequiredError("consent_required")).toBe(false);
    expect(isInteractionRequiredError(new Error("consent_required"))).toBe(false);
    expect(isInteractionRequiredError({ errorCode: "invalid_client" })).toBe(false);
    expect(isInteractionRequiredError({ errorCode: 42 })).toBe(false);
  });
});

describe("packaging (#24)", () => {
  const manifest: {
    dependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  } = pkg;

  it("declares @azure/msal-browser as a peer dependency covering majors 3, 4 and 5", () => {
    expect(manifest.dependencies?.["@azure/msal-browser"]).toBeUndefined();
    const range = manifest.peerDependencies?.["@azure/msal-browser"];
    expect(range).toBeDefined();
    for (const major of ["^3.", "^4.", "^5."]) {
      expect(range).toContain(major);
    }
    expect(manifest.devDependencies?.["@azure/msal-browser"]).toBeDefined();
  });

  it("imports only types from @azure/msal-browser in src", () => {
    // Vite's import.meta.glob (vitest runs on Vite), declared at the bottom of this file.
    const sources = import.meta.glob<string>("../src/**/*.ts", {
      query: "?raw",
      import: "default",
      eager: true,
    });
    expect(Object.keys(sources).length).toBeGreaterThan(0);

    const offenders: string[] = [];
    for (const [file, text] of Object.entries(sources)) {
      // Every `import ... from "@azure/msal-browser"` / `export ... from` must be `import type` /
      // `export type`; a value import would load this package's own MSAL copy at runtime.
      const code = text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
      const statements = code.match(
        /^(?:import|export)\s[^;]*?from\s+["']@azure\/msal-browser["']/gm
      );
      for (const statement of statements ?? []) {
        if (!/^(?:import|export)\s+type\s/.test(statement)) {
          offenders.push(file + ": " + (statement.split("\n")[0] ?? ""));
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});

// Vite's import.meta.glob, typed here so this browser package needs no vite or node types.
declare global {
  interface ImportMeta {
    glob<T>(
      pattern: string,
      options: { query: string; import: string; eager: true }
    ): Record<string, T>;
  }
}
