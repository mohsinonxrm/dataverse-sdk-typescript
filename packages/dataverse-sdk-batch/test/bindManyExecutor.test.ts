/**
 * createBindManyExecutor(): the `$batch` carries the builder's impersonation (#355), an empty list
 * sends nothing, duplicates are associated once, and keys are formatted like core's associate().
 */
import { describe, expect, it } from "vitest";
import { DataverseClient, type FetchProvider } from "@mohsinonxrm/dataverse-sdk-core";
import { createBindManyExecutor } from "../src/index.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
const API = `${BASE_URL}/api/data/v9.2`;
const ACCOUNT = "00000000-0000-0000-0000-0000000000a1";
const C1 = "00000000-0000-0000-0000-0000000000c1";
const C2 = "00000000-0000-0000-0000-0000000000c2";
const USER = "00000000-0000-0000-0000-0000000000ee";

interface Sent {
  url: string;
  headers: Headers;
  body: string;
}

function setup() {
  const sent: Sent[] = [];
  const fetchProvider: FetchProvider = {
    fetch: (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      const body = typeof init?.body === "string" ? init.body : "";
      sent.push({ url, headers: new Headers(init?.headers), body });
      const boundary = "batchresponse_1";
      const parts = [...body.matchAll(/Content-ID: (\S+)/g)].map(
        (m) =>
          `--${boundary}\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\nContent-ID: ${m[1]}\r\n\r\nHTTP/1.1 204 No Content\r\nOData-Version: 4.0\r\n\r\n`
      );
      return Promise.resolve(
        new Response(`${parts.join("")}--${boundary}--\r\n`, {
          status: 200,
          headers: { "content-type": `multipart/mixed; boundary=${boundary}` },
        })
      );
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    tokenProvider: { getToken: () => Promise.resolve("t") },
    retry: { maxRetries: 0 },
  });
  return { client, sent };
}

describe("createBindManyExecutor", () => {
  it("sends one $batch that carries the builder's impersonation", async () => {
    const { client, sent } = setup();
    await client
      .api(`accounts(${ACCOUNT})`)
      .impersonate(USER)
      .bindMany("contact_customer_accounts", "contacts", [C1, C2], createBindManyExecutor());
    expect(sent).toHaveLength(1);
    expect(sent[0]?.url).toBe(`${API}/$batch`);
    expect(sent[0]?.headers.get("mscrmcallerid")).toBe(USER);
    expect(sent[0]?.body).toContain(`"@odata.id":"${API}/contacts(${C1})"`);
    expect(sent[0]?.body).toContain(`"@odata.id":"${API}/contacts(${C2})"`);
  });

  it("sends nothing for an empty list", async () => {
    const { client, sent } = setup();
    await client
      .api(`accounts(${ACCOUNT})`)
      .bindMany("contact_customer_accounts", "contacts", [], createBindManyExecutor());
    expect(sent).toEqual([]);
  });

  it("associates an id listed twice once", async () => {
    const { client, sent } = setup();
    await client
      .api(`accounts(${ACCOUNT})`)
      .bindMany("contact_customer_accounts", "contacts", [C1, C1], createBindManyExecutor());
    expect(sent[0]?.body.match(/\$ref/g)).toHaveLength(1);
  });

  it("formats keys with odataKey (a braced GUID loses its braces)", async () => {
    const { client, sent } = setup();
    await client
      .api(`accounts(${ACCOUNT})`)
      .bindMany("contact_customer_accounts", "contacts", [`{${C1}}`], createBindManyExecutor());
    expect(sent[0]?.body).toContain(`contacts(${C1})`);
  });
});
