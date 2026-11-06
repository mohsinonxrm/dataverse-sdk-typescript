/**
 * @fileoverview #85: device code, authorization code and username/password sign in once, then go
 * silent with the signed-in account.
 *
 * A real `DataverseClient` sends every request through the provider, the way an app does. The
 * MSAL application is a plain fake object (no `vi.mock`), so this also shows the provider accepts
 * any MSAL copy's application without `instanceof`.
 */

import { describe, expect, it, vi, type Mock } from "vitest";
import type {
  AccountInfo,
  AuthenticationResult,
  ConfidentialClientApplication,
  PublicClientApplication,
} from "@azure/msal-node";
import { DataverseAuthenticationError } from "@mohsinonxrm/dataverse-sdk-core";
import { createTestClient, jsonResponse, odataError } from "@mohsinonxrm/dataverse-sdk-testing";
import { MsalNodeTokenProvider } from "../src/index.js";

const scopes = ["https://contoso.crm.dynamics.com/.default"];

const account: AccountInfo = {
  homeAccountId: "uid.utid",
  environment: "login.microsoftonline.com",
  tenantId: "utid",
  username: "user@contoso.com",
  localAccountId: "uid",
};

function result(accessToken: string): AuthenticationResult {
  return { accessToken, account } as AuthenticationResult;
}

/** An error shaped like MSAL's `InteractionRequiredAuthError`, from no particular copy. */
function interactionRequired(code = "invalid_grant"): Error {
  const error = new Error(`AADSTS70043: The refresh token has expired. (${code})`);
  error.name = "InteractionRequiredAuthError";
  Object.assign(error, { errorCode: code });
  return error;
}

interface FakePublicApp {
  acquireTokenByDeviceCode: Mock;
  acquireTokenByUsernamePassword: Mock;
  acquireTokenByCode: Mock;
  acquireTokenSilent: Mock;
  getTokenCache: Mock;
}

/** Each call returns a token named after the method, numbered, so tests see which one was used. */
function fakePublicApp(): FakePublicApp {
  let n = 0;
  return {
    acquireTokenByDeviceCode: vi.fn((request: { deviceCodeCallback: (r: unknown) => void }) => {
      request.deviceCodeCallback({
        userCode: "ABCD-EFGH",
        deviceCode: "device-code",
        verificationUri: "https://microsoft.com/devicelogin",
        expiresIn: 900,
        interval: 5,
        message: "To sign in, enter the code ABCD-EFGH",
      });
      return Promise.resolve(result(`device-${String(++n)}`));
    }),
    acquireTokenByUsernamePassword: vi.fn(() => Promise.resolve(result(`ropc-${String(++n)}`))),
    acquireTokenByCode: vi.fn(() => Promise.resolve(result(`code-${String(++n)}`))),
    acquireTokenSilent: vi.fn(() => Promise.resolve(result(`silent-${String(++n)}`))),
    getTokenCache: vi.fn(),
  };
}

function asPublic(app: FakePublicApp): PublicClientApplication {
  return app as unknown as PublicClientApplication;
}

function clientFor(tokenProvider: MsalNodeTokenProvider) {
  const { client, fake } = createTestClient({ tokenProvider });
  fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "00000000-0000-0000-0000-000000000001" }));
  const whoAmI = () => client.api("/WhoAmI").get<{ UserId: string }>();
  const tokens = () => fake.requests.map((r) => r.headers.authorization);
  return { client, fake, whoAmI, tokens };
}

describe("#85: device code signs in once", () => {
  function deviceCodeProvider(app: FakePublicApp, prompts: string[] = []) {
    return new MsalNodeTokenProvider(asPublic(app), {
      flow: "deviceCode",
      scopes,
      deviceCodeCallback: (r) => prompts.push(r.userCode),
    });
  }

  it("prompts on the first request only; later requests use acquireTokenSilent with the account", async () => {
    const app = fakePublicApp();
    const prompts: string[] = [];
    const { whoAmI, tokens } = clientFor(deviceCodeProvider(app, prompts));

    await whoAmI();
    await whoAmI();
    await whoAmI();

    expect(prompts).toEqual(["ABCD-EFGH"]);
    expect(app.acquireTokenByDeviceCode).toHaveBeenCalledTimes(1);
    expect(app.acquireTokenSilent).toHaveBeenCalledTimes(2);
    expect(app.acquireTokenSilent.mock.calls[0]?.[0]).toMatchObject({
      account,
      scopes,
      forceRefresh: false,
    });
    expect(tokens()).toEqual(["Bearer device-1", "Bearer silent-2", "Bearer silent-3"]);
  });

  it("concurrent first requests share one device code prompt", async () => {
    const app = fakePublicApp();
    const prompts: string[] = [];
    const { whoAmI } = clientFor(deviceCodeProvider(app, prompts));

    await Promise.all([whoAmI(), whoAmI(), whoAmI()]);

    expect(prompts).toHaveLength(1);
    expect(app.acquireTokenByDeviceCode).toHaveBeenCalledTimes(1);
  });

  it("a concurrent call for other scopes waits for the sign-in, then goes silent", async () => {
    const app = fakePublicApp();
    const provider = deviceCodeProvider(app);
    const other = ["https://fabrikam.crm.dynamics.com/.default"];

    const [first, second] = await Promise.all([provider.getToken(), provider.getToken(other)]);

    expect(first).toBe("device-1");
    expect(second).toBe("silent-2");
    expect(app.acquireTokenByDeviceCode).toHaveBeenCalledTimes(1);
    expect(app.acquireTokenSilent.mock.calls[0]?.[0]).toMatchObject({ account, scopes: other });
  });

  it("after a 401, the retry asks acquireTokenSilent for a new token (forceRefresh)", async () => {
    const app = fakePublicApp();
    const { fake, whoAmI, tokens } = clientFor(deviceCodeProvider(app));
    await whoAmI();
    fake.on("GET", "/WhoAmI", () => odataError(401, "0x80040220", "Token expired"), 1);

    await whoAmI();

    expect(app.acquireTokenByDeviceCode).toHaveBeenCalledTimes(1);
    expect(
      app.acquireTokenSilent.mock.calls.map((c) => (c[0] as { forceRefresh: boolean }).forceRefresh)
    ).toEqual([false, true]);
    expect(tokens()).toEqual(["Bearer device-1", "Bearer silent-2", "Bearer silent-3"]);
  });

  it("prompts again only when the silent call says the account needs a new sign-in", async () => {
    const app = fakePublicApp();
    const prompts: string[] = [];
    const provider = deviceCodeProvider(app, prompts);
    await provider.getToken();
    app.acquireTokenSilent.mockRejectedValueOnce(interactionRequired());

    await expect(provider.getToken()).resolves.toBe("device-2");
    await expect(provider.getToken()).resolves.toBe("silent-3");

    expect(prompts).toHaveLength(2);
  });

  it("concurrent calls that all need a new sign-in share one prompt", async () => {
    const app = fakePublicApp();
    const provider = deviceCodeProvider(app);
    await provider.getToken();
    app.acquireTokenSilent
      .mockRejectedValueOnce(interactionRequired())
      .mockRejectedValueOnce(interactionRequired());

    const tokens = await Promise.all([provider.getToken(), provider.getToken()]);

    expect(tokens).toEqual(["device-2", "device-2"]);
    expect(app.acquireTokenByDeviceCode).toHaveBeenCalledTimes(2);
  });

  it("other silent failures (network) don't prompt; the MSAL error is kept as cause", async () => {
    const app = fakePublicApp();
    const provider = deviceCodeProvider(app);
    await provider.getToken();
    const networkError = Object.assign(new Error("getaddrinfo ENOTFOUND"), {
      name: "ClientAuthError",
      errorCode: "network_error",
    });
    app.acquireTokenSilent.mockRejectedValueOnce(networkError);

    const error = (await provider
      .getToken()
      .catch((e: unknown) => e)) as DataverseAuthenticationError;

    expect(error).toBeInstanceOf(DataverseAuthenticationError);
    expect(error.name).toBe("TokenAcquisitionFailed");
    expect(error.message).toContain("getaddrinfo ENOTFOUND");
    expect(error.cause).toBe(networkError);
    expect(app.acquireTokenByDeviceCode).toHaveBeenCalledTimes(1);
  });

  it("a failed device code sign-in is not reused: the next call prompts again", async () => {
    const app = fakePublicApp();
    const provider = deviceCodeProvider(app);
    app.acquireTokenByDeviceCode.mockRejectedValueOnce(
      Object.assign(new Error("User declined"), { errorCode: "authorization_declined" })
    );

    await expect(provider.getToken()).rejects.toThrow("User declined");
    await expect(provider.getToken()).resolves.toBe("device-1");
  });

  it("getCachedAccount returns the signed-in account; clearCache forgets it", async () => {
    const app = fakePublicApp();
    app.getTokenCache.mockReturnValue({
      getAllAccounts: () => Promise.resolve([]),
      removeAccount: () => Promise.resolve(),
    });
    const provider = deviceCodeProvider(app);
    await provider.getToken();
    expect(provider.getCachedAccount()).toEqual(account);

    await provider.clearCache();
    await provider.getToken();

    expect(app.acquireTokenByDeviceCode).toHaveBeenCalledTimes(2);
  });
});

describe("#85: authorization code is redeemed once", () => {
  function authCodeProvider(app: FakePublicApp) {
    return new MsalNodeTokenProvider(asPublic(app), {
      flow: "authorizationCode",
      scopes,
      redirectUri: "http://localhost:3000/auth/callback",
      code: "single-use-code",
      codeVerifier: "verifier",
    });
  }

  it("redeems the code on the first request, then uses acquireTokenSilent", async () => {
    const app = fakePublicApp();
    const { whoAmI, tokens } = clientFor(authCodeProvider(app));

    await whoAmI();
    await whoAmI();
    await whoAmI();

    expect(app.acquireTokenByCode).toHaveBeenCalledTimes(1);
    expect(app.acquireTokenByCode.mock.calls[0]?.[0]).toMatchObject({
      code: "single-use-code",
      codeVerifier: "verifier",
    });
    expect(app.acquireTokenSilent).toHaveBeenCalledTimes(2);
    expect(tokens()).toEqual(["Bearer code-1", "Bearer silent-2", "Bearer silent-3"]);
  });

  it("concurrent first requests redeem the code once", async () => {
    const app = fakePublicApp();
    const { whoAmI } = clientFor(authCodeProvider(app));

    await Promise.all([whoAmI(), whoAmI()]);

    expect(app.acquireTokenByCode).toHaveBeenCalledTimes(1);
  });

  it("when the account needs a new sign-in, it throws instead of redeeming the spent code", async () => {
    const app = fakePublicApp();
    const provider = authCodeProvider(app);
    await provider.getToken();
    const msalError = interactionRequired();
    app.acquireTokenSilent.mockRejectedValueOnce(msalError);

    const error = (await provider
      .getToken()
      .catch((e: unknown) => e)) as DataverseAuthenticationError;

    expect(error).toBeInstanceOf(DataverseAuthenticationError);
    expect(error.message).toContain("authorization code was already redeemed");
    expect(error.cause).toBe(msalError);
    expect(app.acquireTokenByCode).toHaveBeenCalledTimes(1);
  });

  it("a failed redemption is not retried with the same code", async () => {
    const app = fakePublicApp();
    const provider = authCodeProvider(app);
    app.acquireTokenByCode.mockRejectedValueOnce(
      Object.assign(new Error("AADSTS54005: OAuth2 Authorization code was already redeemed"), {
        errorCode: "invalid_grant",
      })
    );

    await expect(provider.getToken()).rejects.toThrow("AADSTS54005");
    await expect(provider.getToken()).rejects.toThrow("authorization code was already redeemed");

    expect(app.acquireTokenByCode).toHaveBeenCalledTimes(1);
  });
});

describe("#85: username/password signs in once", () => {
  function ropcProvider(app: FakePublicApp) {
    return new MsalNodeTokenProvider(asPublic(app), {
      flow: "usernamePassword",
      scopes,
      username: "user@contoso.com",
      password: "not-a-real-password",
    });
  }

  it("sends the password once, then uses acquireTokenSilent", async () => {
    const app = fakePublicApp();
    const { whoAmI, tokens } = clientFor(ropcProvider(app));

    await whoAmI();
    await whoAmI();

    expect(app.acquireTokenByUsernamePassword).toHaveBeenCalledTimes(1);
    expect(tokens()).toEqual(["Bearer ropc-1", "Bearer silent-2"]);
  });

  it("signs in with the password again when the silent call needs it", async () => {
    const app = fakePublicApp();
    const provider = ropcProvider(app);
    await provider.getToken();
    app.acquireTokenSilent.mockRejectedValueOnce(interactionRequired("no_tokens_found"));

    await expect(provider.getToken()).resolves.toBe("ropc-2");

    expect(app.acquireTokenByUsernamePassword).toHaveBeenCalledTimes(2);
  });
});

describe("#85: client applications are checked by shape, not instanceof", () => {
  it("accepts any object with the flow's MSAL methods", () => {
    const pca = fakePublicApp();
    const cca = { acquireTokenByClientCredential: vi.fn(), acquireTokenSilent: vi.fn() };

    expect(
      () =>
        new MsalNodeTokenProvider(asPublic(pca), {
          flow: "deviceCode",
          scopes,
          deviceCodeCallback: () => undefined,
        })
    ).not.toThrow();
    expect(
      () =>
        new MsalNodeTokenProvider(cca as unknown as ConfidentialClientApplication, {
          flow: "clientCredentials",
          scopes,
        })
    ).not.toThrow();
  });

  it("still rejects the wrong kind of application for the flow", () => {
    const cca = { acquireTokenByClientCredential: vi.fn(), acquireTokenSilent: vi.fn() };
    expect(
      () =>
        new MsalNodeTokenProvider(cca as unknown as PublicClientApplication, {
          flow: "deviceCode",
          scopes,
          deviceCodeCallback: () => undefined,
        })
    ).toThrow("Device code flow requires PublicClientApplication");
    expect(
      () =>
        new MsalNodeTokenProvider(asPublic(fakePublicApp()), {
          flow: "clientCredentials",
          scopes,
        })
    ).toThrow("Client credentials flow requires ConfidentialClientApplication");
  });
});
