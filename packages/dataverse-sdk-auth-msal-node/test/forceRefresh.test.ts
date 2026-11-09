/** #167: TokenOptions.forceRefresh reaches MSAL, so the token after a 401 is really new. */
import { describe, expect, it, vi } from "vitest";
import type { AccountInfo, AuthenticationResult } from "@azure/msal-node";

vi.mock("@azure/msal-node", () => {
  class PublicClientApplication {
    acquireTokenSilent = vi.fn();
  }
  class ConfidentialClientApplication {
    acquireTokenByClientCredential = vi.fn();
    acquireTokenSilent = vi.fn();
  }
  return { PublicClientApplication, ConfidentialClientApplication };
});

import { ConfidentialClientApplication } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "../src/MsalNodeTokenProvider.js";

const scopes = ["https://contoso.crm.dynamics.com/.default"];
const result = { accessToken: "tok", account: null } as unknown as AuthenticationResult;
const account = {
  homeAccountId: "h",
  environment: "e",
  tenantId: "t",
  username: "u",
  localAccountId: "l",
} as AccountInfo;

interface MockCca {
  acquireTokenByClientCredential: ReturnType<typeof vi.fn>;
  acquireTokenSilent: ReturnType<typeof vi.fn>;
}

function cca(): MockCca {
  const app = new (ConfidentialClientApplication as unknown as new () => MockCca)();
  app.acquireTokenByClientCredential.mockResolvedValue(result);
  app.acquireTokenSilent.mockResolvedValue(result);
  return app;
}

describe("#167: msal-node honours forceRefresh", () => {
  it("client credentials: skipCache only when forceRefresh is set", async () => {
    const app = cca();
    const provider = new MsalNodeTokenProvider(app as never, { flow: "clientCredentials", scopes });
    await provider.getToken();
    await provider.getToken(undefined, { forceRefresh: true });
    expect(app.acquireTokenByClientCredential.mock.calls[0]?.[0]).not.toHaveProperty("skipCache");
    expect(app.acquireTokenByClientCredential.mock.calls[1]?.[0]).toMatchObject({
      skipCache: true,
    });
  });

  it("silent flow: forceRefresh is passed to acquireTokenSilent", async () => {
    const app = cca();
    const provider = new MsalNodeTokenProvider(app as never, { flow: "silent", scopes, account });
    await provider.getToken();
    await provider.getToken(undefined, { forceRefresh: true });
    expect(app.acquireTokenSilent.mock.calls[0]?.[0]).toMatchObject({ forceRefresh: false });
    expect(app.acquireTokenSilent.mock.calls[1]?.[0]).toMatchObject({ forceRefresh: true });
  });
});
