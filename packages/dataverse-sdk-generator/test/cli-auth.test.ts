/**
 * #81: dataverse-gen signs in through @mohsinonxrm/dataverse-sdk-auth-msal-node. Real MSAL client
 * applications are used; only their token calls are replaced, so nothing reaches Entra ID.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import {
  ConfidentialClientApplication,
  PublicClientApplication,
  type AuthenticationResult,
  type ClientCredentialRequest,
  type DeviceCodeRequest,
} from "@azure/msal-node";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { acquireCliToken, createCliTokenProvider, generateCode } from "../src/index.js";
import type { DataverseGenConfig } from "../src/types.js";
import { TYPECHECK_EDMX, TYPECHECK_ENTITY_METADATA } from "./fixtures/typecheck-metadata.js";

const environmentUrl = "https://contoso.crm.dynamics.com/";
const tenantId = "00000000-0000-0000-0000-0000000000aa";
const clientId = "00000000-0000-0000-0000-0000000000bb";

function tokenResult(accessToken: string): AuthenticationResult {
  return { accessToken } as AuthenticationResult;
}

/** The authority an MSAL application was created with. */
function authorityOf(app: unknown): string {
  return (app as { config: { auth: { authority: string } } }).config.auth.authority;
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("createCliTokenProvider: client credentials (#81)", () => {
  it("gets a token for <org>/.default with a ConfidentialClientApplication", async () => {
    const calls: Array<{ request: ClientCredentialRequest; authority: string }> = [];
    vi.spyOn(
      ConfidentialClientApplication.prototype,
      "acquireTokenByClientCredential"
    ).mockImplementation(function (
      this: ConfidentialClientApplication,
      request: ClientCredentialRequest
    ) {
      calls.push({ request, authority: authorityOf(this) });
      return Promise.resolve(tokenResult("cc-token"));
    });

    const provider = createCliTokenProvider(
      {
        environmentUrl,
        auth: { flow: "clientCredentials", tenantId, clientId, clientSecret: "s" },
      },
      { env: {} }
    );

    expect(await provider.getToken()).toBe("cc-token");
    expect(calls).toHaveLength(1);
    expect(calls[0].request.scopes).toEqual(["https://contoso.crm.dynamics.com/.default"]);
    expect(calls[0].authority).toBe(`https://login.microsoftonline.com/${tenantId}`);
  });

  it('accepts the "clientSecret" flow name, and reads ids and the secret from DATAVERSE_* variables', async () => {
    const spy = vi
      .spyOn(ConfidentialClientApplication.prototype, "acquireTokenByClientCredential")
      .mockResolvedValue(tokenResult("env-token"));

    const provider = createCliTokenProvider(
      { environmentUrl, auth: { flow: "clientSecret" } },
      {
        env: {
          DATAVERSE_TENANT_ID: tenantId,
          DATAVERSE_CLIENT_ID: clientId,
          DATAVERSE_CLIENT_SECRET: "from-env",
        },
      }
    );

    expect(await provider.getToken()).toBe("env-token");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("uses a configured authority (sovereign clouds)", async () => {
    let authority = "";
    vi.spyOn(
      ConfidentialClientApplication.prototype,
      "acquireTokenByClientCredential"
    ).mockImplementation(function (this: ConfidentialClientApplication) {
      authority = authorityOf(this);
      return Promise.resolve(tokenResult("t"));
    });
    await createCliTokenProvider(
      {
        environmentUrl: "https://contoso.crm9.dynamics.com",
        auth: {
          flow: "clientCredentials",
          tenantId,
          clientId,
          clientSecret: "s",
          authority: `https://login.microsoftonline.us/${tenantId}`,
        },
      },
      { env: {} }
    ).getToken();
    expect(authority).toBe(`https://login.microsoftonline.us/${tenantId}`);
  });

  it("names the missing setting when the secret is not configured", () => {
    expect(() =>
      createCliTokenProvider(
        { environmentUrl, auth: { flow: "clientCredentials", tenantId, clientId } },
        { env: {} }
      )
    ).toThrow(/auth\.clientSecret \(or the DATAVERSE_CLIENT_SECRET environment variable\)/);
    expect(() =>
      createCliTokenProvider({ environmentUrl, auth: { flow: "deviceCode" } }, { env: {} })
    ).toThrow(DataverseInvalidRequestError);
  });
});

describe("createCliTokenProvider: device code (#81)", () => {
  it("shows the device code message and returns the token", async () => {
    const requests: DeviceCodeRequest[] = [];
    vi.spyOn(PublicClientApplication.prototype, "acquireTokenByDeviceCode").mockImplementation(
      (request: DeviceCodeRequest) => {
        requests.push(request);
        request.deviceCodeCallback({
          userCode: "ABCD-1234",
          deviceCode: "device",
          verificationUri: "https://microsoft.com/devicelogin",
          expiresIn: 900,
          interval: 5,
          message: "To sign in, open https://microsoft.com/devicelogin and enter ABCD-1234",
        });
        return Promise.resolve(tokenResult("dc-token"));
      }
    );
    const log = vi.fn();

    const provider = createCliTokenProvider(
      { environmentUrl, auth: { flow: "deviceCode", tenantId, clientId } },
      { log, env: {} }
    );

    expect(await provider.getToken()).toBe("dc-token");
    expect(requests[0].scopes).toEqual(["https://contoso.crm.dynamics.com/.default"]);
    expect(log).toHaveBeenCalledWith(
      "To sign in, open https://microsoft.com/devicelogin and enter ABCD-1234"
    );
  });

  it('rejects "interactive" with a pointer to deviceCode', () => {
    expect(() =>
      createCliTokenProvider(
        { environmentUrl, auth: { flow: "interactive", tenantId, clientId } },
        { env: {} }
      )
    ).toThrow(/"interactive" is not supported; use "deviceCode" or "clientCredentials"/);
  });
});

describe("acquireCliToken (#81)", () => {
  it("prefers --token over the auth settings", async () => {
    const spy = vi.spyOn(ConfidentialClientApplication.prototype, "acquireTokenByClientCredential");
    const config: DataverseGenConfig = {
      environmentUrl,
      auth: { flow: "clientCredentials", tenantId, clientId, clientSecret: "s" },
    };
    expect(await acquireCliToken(config, "given")).toBe("given");
    expect(spy).not.toHaveBeenCalled();
  });

  it("fails clearly with neither --token nor auth", async () => {
    await expect(acquireCliToken({ environmentUrl }, undefined)).rejects.toThrow(
      /add "auth" to the configuration file or pass --token/
    );
  });
});

describe("generateCode signs in when no token is given (#81)", () => {
  it("sends the token from the auth settings to $metadata and RetrieveMetadataChanges", async () => {
    vi.spyOn(
      ConfidentialClientApplication.prototype,
      "acquireTokenByClientCredential"
    ).mockResolvedValue(tokenResult("cc-token"));
    const authorization: string[] = [];
    vi.stubGlobal("fetch", (url: string, init?: RequestInit) => {
      authorization.push((init?.headers as Record<string, string>).Authorization);
      const body = url.includes("$metadata")
        ? TYPECHECK_EDMX
        : JSON.stringify(TYPECHECK_ENTITY_METADATA.account);
      return Promise.resolve(new Response(body, { status: 200 }));
    });
    const outputRoot = await fs.mkdtemp(path.join(os.tmpdir(), "dataverse-gen-auth-"));

    try {
      await generateCode({
        environmentUrl,
        entities: ["account"],
        actions: ["PublishAllXml"],
        functions: ["WhoAmI"],
        output: { outputRoot },
        auth: { flow: "clientCredentials", tenantId, clientId, clientSecret: "s" },
      });
      expect(authorization).toEqual(["Bearer cc-token", "Bearer cc-token"]);
      await expect(fs.stat(path.join(outputRoot, "entities", "Account.ts"))).resolves.toBeTruthy();
    } finally {
      await fs.rm(outputRoot, { recursive: true, force: true });
    }
  });
});
