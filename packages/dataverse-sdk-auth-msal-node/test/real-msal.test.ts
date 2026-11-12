/**
 * @fileoverview #85 with real MSAL: a device code sign-in, then silent tokens from MSAL's own cache.
 *
 * The `PublicClientApplication` is real, from two separately installed majors (7.x as
 * `@azure/msal-node`, the 2.x peer floor through an npm alias). Only its HTTP client is fake (MSAL's
 * `system.networkClient`), standing in for Entra ID's device code and token endpoints. This shows
 * that the account the device code flow returns really gets tokens from `acquireTokenSilent`, and
 * that the provider accepts an MSAL copy it wasn't built against (no `instanceof`).
 */

import { describe, expect, it } from "vitest";
import * as msal7 from "@azure/msal-node";
import * as msal2 from "msal-node-v2";
import { createTestClient, jsonResponse, odataError } from "@mohsinonxrm/dataverse-sdk-testing";
import { MsalNodeTokenProvider } from "../src/index.js";

const tenantId = "11111111-1111-1111-1111-111111111111";
const clientId = "22222222-2222-2222-2222-222222222222";
const scopes = ["https://contoso.crm.dynamics.com/.default"];
const login = `https://login.microsoftonline.com/${tenantId}`;

const authorityMetadata = JSON.stringify({
  token_endpoint: `${login}/oauth2/v2.0/token`,
  device_authorization_endpoint: `${login}/oauth2/v2.0/devicecode`,
  authorization_endpoint: `${login}/oauth2/v2.0/authorize`,
  end_session_endpoint: `${login}/oauth2/v2.0/logout`,
  issuer: `${login}/v2.0`,
  jwks_uri: `${login}/discovery/v2.0/keys`,
});

const cloudDiscoveryMetadata = JSON.stringify({
  tenant_discovery_endpoint: `${login}/v2.0/.well-known/openid-configuration`,
  "api-version": "1.1",
  metadata: [
    {
      preferred_network: "login.microsoftonline.com",
      preferred_cache: "login.windows.net",
      aliases: ["login.microsoftonline.com", "login.windows.net", "login.microsoft.com"],
    },
  ],
});

function base64url(value: string): string {
  return Buffer.from(value).toString("base64url");
}

/** An unsigned id token: MSAL reads the claims, it doesn't validate the signature. */
function idToken(): string {
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    aud: clientId,
    iss: `${login}/v2.0`,
    tid: tenantId,
    oid: "33333333-3333-3333-3333-333333333333",
    sub: "subject",
    preferred_username: "user@contoso.com",
    name: "Test User",
    iat: now,
    nbf: now,
    exp: now + 3600,
    ver: "2.0",
  };
  return `${base64url(JSON.stringify({ alg: "none", typ: "JWT" }))}.${base64url(JSON.stringify(claims))}.`;
}

interface NetworkCall {
  url: string;
  grantType: string | null;
  claims: string | null;
}

/** MSAL's `INetworkModule`, answering like Entra ID's device code and token endpoints. */
function fakeEntraId() {
  const calls: NetworkCall[] = [];
  let issued = 0;
  const respond = (body: unknown) => Promise.resolve({ headers: {}, body, status: 200 });
  const networkClient = {
    sendGetRequestAsync: (url: string) => {
      throw new Error(`Unexpected GET ${url}`);
    },
    sendPostRequestAsync: (url: string, options?: { body?: string }) => {
      const body = new URLSearchParams(options?.body ?? "");
      const grantType = body.get("grant_type");
      calls.push({ url, grantType, claims: body.get("claims") });
      if (url.startsWith(`${login}/oauth2/v2.0/devicecode`)) {
        return respond({
          user_code: "ABCD-EFGH",
          device_code: "device-code",
          verification_uri: "https://microsoft.com/devicelogin",
          expires_in: 900,
          interval: 1,
          message: "To sign in, enter the code ABCD-EFGH",
        });
      }
      if (url.startsWith(`${login}/oauth2/v2.0/token`)) {
        issued++;
        if (grantType === "client_credentials") {
          return respond({
            token_type: "Bearer",
            expires_in: 3600,
            ext_expires_in: 3600,
            access_token: `app-${String(issued)}`,
          });
        }
        return respond({
          token_type: "Bearer",
          scope: scopes.join(" "),
          expires_in: 3600,
          ext_expires_in: 3600,
          access_token: `access-${String(issued)}`,
          refresh_token: `refresh-${String(issued)}`,
          id_token: idToken(),
          client_info: base64url(
            JSON.stringify({ uid: "33333333-3333-3333-3333-333333333333", utid: tenantId })
          ),
        });
      }
      throw new Error(`Unexpected POST ${url}`);
    },
  };
  return { calls, networkClient };
}

const copies = [
  {
    label: "@azure/msal-node 2.x",
    PublicClientApplication: msal2.PublicClientApplication,
    ConfidentialClientApplication: msal2.ConfidentialClientApplication,
  },
  {
    label: "@azure/msal-node 7.x",
    PublicClientApplication: msal7.PublicClientApplication,
    ConfidentialClientApplication: msal7.ConfidentialClientApplication,
  },
] as const;

/** Conditional Access auth context claims, as an app would configure them. */
const configuredClaims = '{"access_token":{"acrs":{"essential":true,"value":"c1"}}}';

describe.each(copies)("#85 with real MSAL ($label)", ({ PublicClientApplication }) => {
  function setup(claims?: string) {
    const entra = fakeEntraId();
    const pca = new PublicClientApplication({
      auth: {
        clientId,
        authority: login,
        knownAuthorities: ["login.microsoftonline.com"],
        authorityMetadata,
        cloudDiscoveryMetadata,
      },
      // MSAL's INetworkModule is generic in the body type; this fake returns plain JSON.
      system: { networkClient: entra.networkClient as never },
    });
    const prompts: string[] = [];
    const tokenProvider = new MsalNodeTokenProvider(
      pca as unknown as ConstructorParameters<typeof MsalNodeTokenProvider>[0],
      { flow: "deviceCode", scopes, claims, deviceCodeCallback: (r) => prompts.push(r.userCode) }
    );
    const { client, fake } = createTestClient({ tokenProvider });
    fake.on("GET", "/WhoAmI", () =>
      jsonResponse({ UserId: "00000000-0000-0000-0000-000000000001" })
    );
    return { entra, prompts, client, fake, tokenProvider };
  }

  it("one device code sign-in; later requests use MSAL's cached token", async () => {
    const { entra, prompts, client, fake, tokenProvider } = setup();

    for (let i = 0; i < 3; i++) {
      await client.api("/WhoAmI").get();
    }

    expect(prompts).toEqual(["ABCD-EFGH"]);
    expect(entra.calls.map((c) => c.grantType ?? "devicecode")).toEqual([
      "devicecode",
      "device_code",
    ]);
    expect(fake.requests.map((r) => r.headers.authorization)).toEqual([
      "Bearer access-1",
      "Bearer access-1",
      "Bearer access-1",
    ]);
    expect(tokenProvider.getCachedAccount()?.username).toBe("user@contoso.com");
  });

  it("after a 401, the retry uses the refresh token, not a new device code", async () => {
    const { entra, prompts, client, fake } = setup();
    await client.api("/WhoAmI").get();
    fake.on("GET", "/WhoAmI", () => odataError(401, "0x80040220", "Token expired"), 1);

    await client.api("/WhoAmI").get();

    expect(prompts).toHaveLength(1);
    expect(entra.calls.map((c) => c.grantType ?? "devicecode")).toEqual([
      "devicecode",
      "device_code",
      "refresh_token",
    ]);
    expect(fake.requests.map((r) => r.headers.authorization)).toEqual([
      "Bearer access-1",
      "Bearer access-1",
      "Bearer access-2",
    ]);
  });

  it("#382: configured claims go on the sign-in; later requests still use MSAL's cache", async () => {
    const { entra, client, fake } = setup(configuredClaims);

    for (let i = 0; i < 3; i++) {
      await client.api("/WhoAmI").get();
    }

    // Before #382 every silent call carried the claims, and MSAL sends a request with claims to
    // Entra ID instead of its cache: one refresh_token call per Dataverse request.
    expect(entra.calls.map((c) => c.grantType ?? "devicecode")).toEqual([
      "devicecode",
      "device_code",
    ]);
    expect(entra.calls[1]?.claims).toContain('"acrs"');
    expect(fake.requests.map((r) => r.headers.authorization)).toEqual([
      "Bearer access-1",
      "Bearer access-1",
      "Bearer access-1",
    ]);
  });
});

describe.each(copies)(
  "#382 client credentials with real MSAL ($label)",
  ({ ConfidentialClientApplication }) => {
    it("configured claims are sent to Entra ID once; later tokens come from MSAL's cache", async () => {
      const entra = fakeEntraId();
      const cca = new ConfidentialClientApplication({
        auth: {
          clientId,
          clientSecret: "not-a-real-secret",
          authority: login,
          knownAuthorities: ["login.microsoftonline.com"],
          authorityMetadata,
          cloudDiscoveryMetadata,
        },
        system: { networkClient: entra.networkClient as never },
      });
      const tokenProvider = new MsalNodeTokenProvider(
        cca as unknown as ConstructorParameters<typeof MsalNodeTokenProvider>[0],
        { flow: "clientCredentials", scopes, claims: configuredClaims }
      );

      const tokens = [
        await tokenProvider.getToken(),
        await tokenProvider.getToken(),
        await tokenProvider.getToken(),
      ];

      expect(tokens).toEqual(["app-1", "app-1", "app-1"]);
      expect(entra.calls.map((c) => c.grantType)).toEqual(["client_credentials"]);
      expect(entra.calls[0]?.claims).toContain('"acrs"');
    });
  }
);
