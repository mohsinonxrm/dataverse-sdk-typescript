import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { DataverseODataError } from "../src/index.js";
import type { FetchProvider } from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
const API = `${BASE_URL}/api/data/v9.2`;
const ACCOUNT = "00000000-0000-0000-0000-0000000000a1";
const C = ["c1", "c2", "c3"].map((s, i) => `00000000-0000-0000-0000-00000000000${String(i + 1)}`);

function setup(fail?: (url: string, body: string) => boolean) {
  const calls: Array<{ method: string; url: string; body: unknown; auth: string | null }> = [];
  const fetchProvider: FetchProvider = {
    fetch: (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      const body = typeof init?.body === "string" ? init.body : "";
      calls.push({
        method: init?.method ?? "GET",
        url,
        body: body ? (JSON.parse(body) as unknown) : undefined,
        auth: new Headers(init?.headers).get("authorization"),
      });
      if (fail?.(url, body)) {
        return Promise.resolve(
          new Response(
            JSON.stringify({ error: { code: "0x80040217", message: "Does not exist" } }),
            {
              status: 404,
              headers: { "content-type": "application/json" },
            }
          )
        );
      }
      return Promise.resolve(new Response(null, { status: 204 }));
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    tokenProvider: { getToken: () => Promise.resolve("t") },
    retry: { maxRetries: 0 },
  });
  return { client, calls };
}

describe("#20: bindMany works without the batch package", () => {
  it("sends one $ref POST per id, in order, through the pipeline", async () => {
    const { client, calls } = setup();
    await client.api(`accounts(${ACCOUNT})`).bindMany("contact_customer_accounts", "contacts", C);
    expect(calls).toEqual(
      C.map((id) => ({
        method: "POST",
        url: `${API}/accounts(${ACCOUNT})/contact_customer_accounts/$ref`,
        body: { "@odata.id": `${API}/contacts(${id})` },
        auth: "Bearer t",
      }))
    );
  });

  it("stops at the first failure and rejects with that error", async () => {
    const { client, calls } = setup((_url, body) => body.includes(C[1] ?? "?"));
    const err = await client
      .api(`accounts(${ACCOUNT})`)
      .bindMany("contact_customer_accounts", "contacts", C)
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect((err as DataverseODataError).status).toBe(404);
    expect(calls).toHaveLength(2);
  });

  it("does nothing for an empty list", async () => {
    const { client, calls } = setup();
    await client.api(`accounts(${ACCOUNT})`).bindMany("contact_customer_accounts", "contacts", []);
    expect(calls).toEqual([]);
  });
});
