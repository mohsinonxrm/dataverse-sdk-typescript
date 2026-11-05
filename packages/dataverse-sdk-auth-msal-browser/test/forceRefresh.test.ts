/** #167: TokenOptions.forceRefresh reaches MSAL's acquireTokenSilent. */
import { describe, expect, it } from "vitest";
import type { AccountInfo } from "@azure/msal-browser";
import { MsalBrowserTokenProvider } from "../src/MsalBrowserTokenProvider.js";
import { asPca, createFakePca } from "./fakePca.js";

const scopes = ["https://contoso.crm.dynamics.com/.default"];
const account = {
  homeAccountId: "h",
  environment: "e",
  tenantId: "t",
  username: "u",
  localAccountId: "l",
} as AccountInfo;

describe("#167: msal-browser honours forceRefresh", () => {
  it("passes forceRefresh to acquireTokenSilent only when asked", async () => {
    const pca = createFakePca();
    pca.getActiveAccount.mockReturnValue(account);
    pca.acquireTokenSilent.mockResolvedValue({ accessToken: "tok", account });
    const provider = new MsalBrowserTokenProvider(asPca(pca), { scopes });
    await provider.getToken();
    await provider.getToken(undefined, { forceRefresh: true });
    expect(pca.acquireTokenSilent.mock.calls[0]?.[0]).not.toHaveProperty("forceRefresh");
    expect(pca.acquireTokenSilent.mock.calls[1]?.[0]).toMatchObject({ forceRefresh: true });
  });
});
