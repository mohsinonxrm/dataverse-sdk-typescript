/**
 * @fileoverview #382: configured claims stay out of MSAL's cached calls, `tenantId` goes to the
 * configured cloud for every flow, MSAL error details on the thrown error, and a clear error when
 * the MSAL copy has no username/password flow.
 *
 * The MSAL applications are plain fake objects; `config.auth` stands in for the configuration a
 * real `PublicClientApplication` / `ConfidentialClientApplication` keeps.
 */

import { describe, expect, it, vi, type Mock } from "vitest";
import type {
  AccountInfo,
  AuthenticationResult,
  ConfidentialClientApplication,
  PublicClientApplication,
} from "@azure/msal-node";
import {
  DataverseAuthenticationError,
  DataverseInvalidRequestError,
} from "@mohsinonxrm/dataverse-sdk-core";
import {
  MsalNodeAuthenticationError,
  MsalNodeTokenProvider,
  type MsalNodeTokenProviderOptions,
} from "../src/index.js";

const scopes = ["https://contoso.crm.dynamics.com/.default"];
const configuredClaims = '{"access_token":{"acrs":{"essential":true,"value":"c1"}}}';
const challengeClaims = '{"access_token":{"nbf":{"essential":true,"value":"1700000000"}}}';
const tenantB = "22222222-2222-2222-2222-222222222222";

const account: AccountInfo = {
  homeAccountId: "uid.utid",
  environment: "login.microsoftonline.com",
  tenantId: "utid",
  username: "user@contoso.com",
  localAccountId: "uid",
};

function result(accessToken: string, withAccount = true): AuthenticationResult {
  return { accessToken, account: withAccount ? account : null } as AuthenticationResult;
}

interface FakeApp {
  acquireTokenByDeviceCode: Mock;
  acquireTokenByUsernamePassword: Mock;
  acquireTokenByCode: Mock;
  acquireTokenByClientCredential: Mock;
  acquireTokenSilent: Mock;
  getTokenCache: Mock;
  config: { auth: Record<string, unknown> };
}

function fakePublicApp(auth: Record<string, unknown> = {}): FakeApp {
  let n = 0;
  const next = (name: string) => () => Promise.resolve(result(`${name}-${String(++n)}`));
  return {
    acquireTokenByDeviceCode: vi.fn(next("device")),
    acquireTokenByUsernamePassword: vi.fn(next("ropc")),
    acquireTokenByCode: vi.fn(next("code")),
    acquireTokenByClientCredential: vi.fn(),
    acquireTokenSilent: vi.fn(next("silent")),
    getTokenCache: vi.fn(),
    config: { auth: { authority: "https://login.microsoftonline.com/common", ...auth } },
  };
}

function fakeConfidentialApp(auth: Record<string, unknown> = {}) {
  let n = 0;
  return {
    acquireTokenByClientCredential: vi.fn(() =>
      Promise.resolve(result(`app-${String(++n)}`, false))
    ),
    acquireTokenByCode: vi.fn(() => Promise.resolve(result(`code-${String(++n)}`))),
    acquireTokenSilent: vi.fn(() => Promise.resolve(result(`silent-${String(++n)}`))),
    getTokenCache: vi.fn(),
    config: { auth: { authority: "https://login.microsoftonline.com/home-tenant", ...auth } },
  };
}

function provider(app: object, options: MsalNodeTokenProviderOptions): MsalNodeTokenProvider {
  return new MsalNodeTokenProvider(
    app as unknown as PublicClientApplication | ConfidentialClientApplication,
    options
  );
}

function deviceCode(app: FakeApp, extra: Partial<MsalNodeTokenProviderOptions> = {}) {
  return provider(app, {
    flow: "deviceCode",
    scopes,
    deviceCodeCallback: () => undefined,
    ...extra,
  } as MsalNodeTokenProviderOptions);
}

/** The `n`th request (0-based) passed to an MSAL method. */
function request(method: Mock, n = 0): Record<string, unknown> {
  return method.mock.calls[n]?.[0] as Record<string, unknown>;
}

describe("configured claims don't disable MSAL's token cache (#382)", () => {
  it("device code: the sign-in sends the configured claims; later silent calls don't", async () => {
    const app = fakePublicApp();
    const tokenProvider = deviceCode(app, { claims: configuredClaims });

    await tokenProvider.getToken();
    await tokenProvider.getToken();
    await tokenProvider.getToken();

    expect(request(app.acquireTokenByDeviceCode).claims).toBe(configuredClaims);
    expect(app.acquireTokenSilent).toHaveBeenCalledTimes(2);
    expect(request(app.acquireTokenSilent, 0).claims).toBeUndefined();
    expect(request(app.acquireTokenSilent, 1).claims).toBeUndefined();
  });

  it("a 401 claims challenge is sent on the silent call", async () => {
    const app = fakePublicApp();
    const tokenProvider = deviceCode(app, { claims: configuredClaims });
    await tokenProvider.getToken();

    await tokenProvider.getToken(undefined, { claims: challengeClaims });

    expect(request(app.acquireTokenSilent).claims).toBe(challengeClaims);
  });

  it("a forced refresh (which skips the cache anyway) sends the configured claims", async () => {
    const app = fakePublicApp();
    const tokenProvider = deviceCode(app, { claims: configuredClaims });
    await tokenProvider.getToken();

    await tokenProvider.getToken(undefined, { forceRefresh: true });

    expect(request(app.acquireTokenSilent)).toMatchObject({
      forceRefresh: true,
      claims: configuredClaims,
    });
  });

  it("a new sign-in, after the silent call needs one, sends the configured claims again", async () => {
    const app = fakePublicApp();
    const tokenProvider = deviceCode(app, { claims: configuredClaims });
    await tokenProvider.getToken();
    app.acquireTokenSilent.mockRejectedValueOnce(
      Object.assign(new Error("AADSTS70043"), { name: "InteractionRequiredAuthError" })
    );

    await tokenProvider.getToken();

    expect(app.acquireTokenByDeviceCode).toHaveBeenCalledTimes(2);
    expect(request(app.acquireTokenByDeviceCode, 1).claims).toBe(configuredClaims);
  });

  it("silent flow: the first call per scope set sends the configured claims, later calls don't", async () => {
    const app = fakePublicApp();
    const tokenProvider = provider(app, {
      flow: "silent",
      scopes,
      account,
      claims: configuredClaims,
    });

    await tokenProvider.getToken();
    await tokenProvider.getToken();
    await tokenProvider.getToken(["https://other.crm.dynamics.com/.default"]);

    expect(request(app.acquireTokenSilent, 0).claims).toBe(configuredClaims);
    expect(request(app.acquireTokenSilent, 1).claims).toBeUndefined();
    expect(request(app.acquireTokenSilent, 2).claims).toBe(configuredClaims);
  });

  it("client credentials: claims on the first call only; claimsFromClient (MSAL Node 7) on every call", async () => {
    const app = fakeConfidentialApp();
    const tokenProvider = provider(app, {
      flow: "clientCredentials",
      scopes,
      claims: configuredClaims,
    });

    await tokenProvider.getToken();
    await tokenProvider.getToken();

    expect(request(app.acquireTokenByClientCredential, 0)).toMatchObject({
      claims: configuredClaims,
      claimsFromClient: configuredClaims,
    });
    expect(request(app.acquireTokenByClientCredential, 1).claims).toBeUndefined();
    expect(request(app.acquireTokenByClientCredential, 1).claimsFromClient).toBe(configuredClaims);
  });

  it("client credentials: a failed first call doesn't count; the next call sends the claims", async () => {
    const app = fakeConfidentialApp();
    app.acquireTokenByClientCredential.mockRejectedValueOnce(new Error("network down"));
    const tokenProvider = provider(app, {
      flow: "clientCredentials",
      scopes,
      claims: configuredClaims,
    });

    await expect(tokenProvider.getToken()).rejects.toThrow("network down");
    await tokenProvider.getToken();

    expect(request(app.acquireTokenByClientCredential, 1).claims).toBe(configuredClaims);
  });
});

describe("tenantId uses the configured cloud and is validated (#382)", () => {
  it("client credentials: the authority keeps the host of the configured authority (GCC High)", async () => {
    const app = fakeConfidentialApp({ authority: "https://login.microsoftonline.us/home-tenant" });
    const tokenProvider = provider(app, { flow: "clientCredentials", scopes, tenantId: tenantB });

    await tokenProvider.getToken();

    expect(request(app.acquireTokenByClientCredential).authority).toBe(
      `https://login.microsoftonline.us/${tenantB}`
    );
  });

  it("client credentials: TokenOptions.tenantId on a China cloud authority", async () => {
    const app = fakeConfidentialApp({
      authority: "https://login.partner.microsoftonline.cn/home-tenant",
    });
    const tokenProvider = provider(app, { flow: "clientCredentials", scopes });

    await tokenProvider.getToken(undefined, { tenantId: "fabrikam.partner.onmschina.cn" });

    expect(request(app.acquireTokenByClientCredential).authority).toBe(
      "https://login.partner.microsoftonline.cn/fabrikam.partner.onmschina.cn"
    );
  });

  it("with azureCloudOptions configured, the request carries azureCloudOptions for the tenant", async () => {
    // MSAL builds the authority from azureCloudOptions and ignores a request authority unless the
    // request has its own azureCloudOptions.
    const app = fakeConfidentialApp({
      azureCloudOptions: { azureCloudInstance: "https://login.microsoftonline.us", tenant: "home" },
    });
    const tokenProvider = provider(app, { flow: "clientCredentials", scopes, tenantId: tenantB });

    await tokenProvider.getToken();

    expect(request(app.acquireTokenByClientCredential)).toMatchObject({
      authority: `https://login.microsoftonline.us/${tenantB}`,
      azureCloudOptions: {
        azureCloudInstance: "https://login.microsoftonline.us",
        tenant: tenantB,
      },
    });
  });

  it("rejects a configured tenantId that is not a tenant id or domain", () => {
    const app = fakeConfidentialApp();

    expect(() =>
      provider(app, { flow: "clientCredentials", scopes, tenantId: "evil.example/oauth2?x=" })
    ).toThrow(expect.objectContaining({ name: "InvalidTenantId" }));
  });

  it("rejects TokenOptions.tenantId that is not a tenant id or domain, before calling MSAL", async () => {
    const app = fakeConfidentialApp();
    const tokenProvider = provider(app, { flow: "clientCredentials", scopes });

    const error = await tokenProvider
      .getToken(undefined, { tenantId: "x/../../common" })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(DataverseInvalidRequestError);
    expect((error as Error).name).toBe("InvalidTenantId");
    expect(app.acquireTokenByClientCredential).not.toHaveBeenCalled();
  });

  it("device code: TokenOptions.tenantId goes to the sign-in and the later silent calls", async () => {
    const app = fakePublicApp({ authority: "https://login.microsoftonline.us/organizations" });
    const tokenProvider = deviceCode(app);

    await tokenProvider.getToken(undefined, { tenantId: tenantB });
    await tokenProvider.getToken(undefined, { tenantId: tenantB });
    await tokenProvider.getToken();

    const tenantAuthority = `https://login.microsoftonline.us/${tenantB}`;
    expect(request(app.acquireTokenByDeviceCode).authority).toBe(tenantAuthority);
    expect(request(app.acquireTokenSilent, 0).authority).toBe(tenantAuthority);
    expect(request(app.acquireTokenSilent, 1).authority).toBeUndefined();
  });

  it("username/password: TokenOptions.tenantId goes to the sign-in", async () => {
    const app = fakePublicApp();
    const tokenProvider = provider(app, {
      flow: "usernamePassword",
      scopes,
      username: "user@contoso.com",
      password: "not-a-real-password",
    });

    await tokenProvider.getToken(undefined, { tenantId: tenantB });

    expect(request(app.acquireTokenByUsernamePassword).authority).toBe(
      `https://login.microsoftonline.com/${tenantB}`
    );
  });

  it("silent flow: TokenOptions.tenantId becomes the silent request's authority", async () => {
    const app = fakePublicApp();
    const tokenProvider = provider(app, { flow: "silent", scopes, account });

    await tokenProvider.getToken(undefined, { tenantId: tenantB });

    expect(request(app.acquireTokenSilent).authority).toBe(
      `https://login.microsoftonline.com/${tenantB}`
    );
  });

  it("authorization code: redeems the code where it was issued, then gets the tenant's token silently", async () => {
    const app = fakeConfidentialApp();
    const tokenProvider = provider(app, {
      flow: "authorizationCode",
      scopes,
      redirectUri: "http://localhost:3000/auth/callback",
      code: "single-use-code",
    });

    await expect(tokenProvider.getToken(undefined, { tenantId: tenantB })).resolves.toBe(
      "silent-2"
    );

    expect(request(app.acquireTokenByCode).authority).toBeUndefined();
    expect(request(app.acquireTokenSilent)).toMatchObject({
      account,
      authority: `https://login.microsoftonline.com/${tenantB}`,
    });
  });
});

describe("MSAL error details on the thrown error (#382)", () => {
  it("keeps errorCode, subError, correlationId and errorNo, and the MSAL error as cause", async () => {
    const app = fakeConfidentialApp();
    const msalError = Object.assign(new Error("AADSTS7000215: Invalid client secret provided."), {
      name: "ServerError",
      errorCode: "invalid_client",
      subError: "bad_secret",
      correlationId: "corr-123",
      errorNo: "7000215",
    });
    app.acquireTokenByClientCredential.mockRejectedValueOnce(msalError);
    const tokenProvider = provider(app, { flow: "clientCredentials", scopes });

    const error = await tokenProvider.getToken().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(DataverseAuthenticationError);
    expect(error).toBeInstanceOf(MsalNodeAuthenticationError);
    expect(error).toMatchObject({
      name: "TokenAcquisitionFailed",
      code: "invalid_client",
      errorCode: "invalid_client",
      subError: "bad_secret",
      correlationId: "corr-123",
      errorNo: "7000215",
      cause: msalError,
    });
  });

  it("a spent authorization code keeps the silent call's MSAL details", async () => {
    const app = fakeConfidentialApp();
    const tokenProvider = provider(app, {
      flow: "authorizationCode",
      scopes,
      redirectUri: "http://localhost:3000/auth/callback",
      code: "single-use-code",
    });
    await tokenProvider.getToken();
    app.acquireTokenSilent.mockRejectedValueOnce(
      Object.assign(new Error("AADSTS50076"), {
        name: "InteractionRequiredAuthError",
        errorCode: "invalid_grant",
        subError: "basic_action",
      })
    );

    const error = await tokenProvider.getToken().catch((e: unknown) => e);

    expect(error).toMatchObject({ errorCode: "invalid_grant", subError: "basic_action" });
    expect((error as Error).message).toContain("authorization code was already redeemed");
  });
});

describe("username/password needs acquireTokenByUsernamePassword (#382)", () => {
  it("throws a clear error when the MSAL copy has no username/password flow", () => {
    const app: Partial<FakeApp> = fakePublicApp();
    delete app.acquireTokenByUsernamePassword;

    expect(() =>
      provider(app, {
        flow: "usernamePassword",
        scopes,
        username: "user@contoso.com",
        password: "not-a-real-password",
      })
    ).toThrow(/acquireTokenByUsernamePassword/);
  });
});
