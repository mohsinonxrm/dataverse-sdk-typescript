import { describe, it, expect } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { DataverseInvalidRequestError } from "../src/errors/NamedErrors.js";
import type { DataverseClientOptions } from "../src/abstractions/options.js";
import type { FetchProvider } from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
const API_URL = `${BASE_URL}/api/data/v9.2`;

function setup(options: Partial<DataverseClientOptions> = {}) {
  const sent: Array<{ url: string; authorization: string | null }> = [];
  let tokenCalls = 0;
  const fetchProvider: FetchProvider = {
    fetch: (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      sent.push({ url, authorization: new Headers(init?.headers).get("authorization") });
      return Promise.resolve(
        new Response(JSON.stringify({ value: [] }), {
          status: 200,
          headers: { "content-type": "application/json" },
        })
      );
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    retry: { maxRetries: 0 },
    tokenProvider: {
      getToken: () => {
        tokenCalls++;
        return Promise.resolve("secret-token");
      },
    },
    ...options,
  });
  return { client, sent, tokenCalls: () => tokenCalls };
}

describe("#8: the bearer token only goes to the client's own origin", () => {
  it("attaches the token to same-origin requests, including absolute same-origin URLs", async () => {
    const { client, sent } = setup();
    await client.api("WhoAmI").get();
    await client.api(`${API_URL}/accounts`).get();
    await client.api("HTTPS://CONTOSO.CRM.DYNAMICS.COM/api/data/v9.2/contacts").get();
    expect(sent.map((s) => s.authorization)).toEqual([
      "Bearer secret-token",
      "Bearer secret-token",
      "Bearer secret-token",
    ]);
  });

  it.each([
    ["another host", "https://evil.example.com/collect"],
    ["a look-alike subdomain", "https://contoso.crm.dynamics.com.evil.com/api/data/v9.2/x"],
    ["plain http on the same host", "http://contoso.crm.dynamics.com/api/data/v9.2/accounts"],
    ["another port", "https://contoso.crm.dynamics.com:8443/api/data/v9.2/accounts"],
    ["user info", "https://attacker@contoso.crm.dynamics.com/api/data/v9.2/accounts"],
  ])("refuses %s before sending anything or acquiring a token", async (_label, url) => {
    const { client, sent, tokenCalls } = setup();
    const err = await client
      .api(url)
      .get()
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseInvalidRequestError);
    expect((err as Error).name).toBe("TokenOriginRefused");
    expect(sent).toHaveLength(0);
    expect(tokenCalls()).toBe(0);
  });

  it("does not follow a crafted @odata.nextLink to another origin with the token", async () => {
    const sent: Array<string | null> = [];
    const fetchProvider: FetchProvider = {
      fetch: (_input, init) => {
        sent.push(new Headers(init?.headers).get("authorization"));
        return Promise.resolve(
          new Response(
            JSON.stringify({
              value: [{ n: 1 }],
              // Page 1 points at another origin; any later page is the last one.
              ...(sent.length === 1 ? { "@odata.nextLink": "https://evil.example.com/page2" } : {}),
            }),
            { status: 200, headers: { "content-type": "application/json" } }
          )
        );
      },
    };
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      fetchProvider,
      tokenProvider: { getToken: () => Promise.resolve("secret-token") },
    });
    await expect(client.api("accounts").getAll()).rejects.toMatchObject({
      name: "TokenOriginRefused",
    });
    expect(sent).toEqual(["Bearer secret-token"]);
  });

  it("allowedTokenOrigins lets listed origins receive the token", async () => {
    const { client, sent } = setup({ allowedTokenOrigins: ["https://fabrikam.crm4.dynamics.com"] });
    await client.api("https://fabrikam.crm4.dynamics.com/api/data/v9.2/WhoAmI").get();
    expect(sent[0]?.authorization).toBe("Bearer secret-token");
  });

  it('onForeignOrigin: "strip" sends foreign requests without the token', async () => {
    const { client, sent, tokenCalls } = setup({ onForeignOrigin: "strip" });
    await client.send({
      method: "GET",
      url: "https://evil.example.com/collect",
      headers: { Authorization: "Bearer caller-supplied" },
    });
    expect(sent[0]?.authorization).toBeNull();
    expect(tokenCalls()).toBe(0);
  });

  it("without a token provider, any origin is allowed and nothing is attached", async () => {
    const sent: Array<string | null> = [];
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      fetchProvider: {
        fetch: (_input, init) => {
          sent.push(new Headers(init?.headers).get("authorization"));
          return Promise.resolve(
            new Response("{}", { status: 200, headers: { "content-type": "application/json" } })
          );
        },
      },
    });
    await client.api("https://other.example.com/x").get();
    expect(sent).toEqual([null]);
  });
});
