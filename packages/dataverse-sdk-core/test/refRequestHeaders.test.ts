/**
 * #355: associate(), disassociate() and bindMany() send their `$ref` requests with the builder's
 * impersonation and custom headers, and take request options.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import type { BindManyExecutor } from "../src/index.js";
import type { FetchProvider } from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
const API = `${BASE_URL}/api/data/v9.2`;
const ACCOUNT = "00000000-0000-0000-0000-0000000000a1";
const CONTACT = "00000000-0000-0000-0000-0000000000c1";
const USER = "00000000-0000-0000-0000-0000000000ee";

interface Call {
  method: string;
  url: string;
  headers: Headers;
}

function setup() {
  const calls: Call[] = [];
  const fetchProvider: FetchProvider = {
    fetch: (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      calls.push({ method: init?.method ?? "GET", url, headers: new Headers(init?.headers) });
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

describe("#355: $ref requests keep the builder's impersonation and headers", () => {
  it("associate() sends MSCRMCallerID and custom headers", async () => {
    const { client, calls } = setup();
    await client
      .api(`accounts(${ACCOUNT})`)
      .impersonate(USER)
      .header("x-custom", "1")
      .associate("contact_customer_accounts", "contacts", CONTACT);
    expect(calls).toHaveLength(1);
    expect(calls[0]?.url).toBe(`${API}/accounts(${ACCOUNT})/contact_customer_accounts/$ref`);
    expect(calls[0]?.headers.get("mscrmcallerid")).toBe(USER);
    expect(calls[0]?.headers.get("x-custom")).toBe("1");
  });

  it("disassociate() sends CallerObjectId", async () => {
    const { client, calls } = setup();
    await client
      .api(`accounts(${ACCOUNT})`)
      .impersonateByObjectId(USER)
      .disassociate("contact_customer_accounts", CONTACT);
    expect(calls[0]?.method).toBe("DELETE");
    expect(calls[0]?.headers.get("callerobjectid")).toBe(USER);
    expect(calls[0]?.headers.get("mscrmcallerid")).toBeNull();
  });

  it("bindMany() without an executor impersonates every association", async () => {
    const { client, calls } = setup();
    await client
      .api(`accounts(${ACCOUNT})`)
      .impersonate(USER)
      .bindMany("contact_customer_accounts", "contacts", [CONTACT, ACCOUNT]);
    expect(calls.map((c) => c.headers.get("mscrmcallerid"))).toEqual([USER, USER]);
  });

  it("passes request options through (headers, correlation id)", async () => {
    const { client, calls } = setup();
    await client
      .api(`accounts(${ACCOUNT})`)
      .associate("contact_customer_accounts", "contacts", CONTACT, {
        headers: { "X-Option": "yes" },
        correlationId: "corr-1",
      });
    expect(calls[0]?.headers.get("x-option")).toBe("yes");
    expect(calls[0]?.headers.get("x-ms-correlation-id")).toBe("corr-1");
  });

  it("doesn't carry the query, If-Match or bindings to the $ref request", async () => {
    const { client, calls } = setup();
    await client
      .api(`accounts(${ACCOUNT})`)
      .select("name")
      .ifMatch('W/"1"')
      .bind("primarycontactid", "contacts", CONTACT)
      .associate("contact_customer_accounts", "contacts", CONTACT);
    expect(calls[0]?.url).not.toContain("$select");
    expect(calls[0]?.headers.get("if-match")).toBeNull();
  });

  it("gives an executor the builder's headers and the options", async () => {
    const { client } = setup();
    let received: Parameters<BindManyExecutor>[5] | undefined;
    const executor: BindManyExecutor = (_c, _p, _n, _e, _ids, options) => {
      received = options;
      return Promise.resolve();
    };
    const signal = new AbortController().signal;
    await client
      .api(`accounts(${ACCOUNT})`)
      .impersonate(USER)
      .bindMany("contact_customer_accounts", "contacts", [CONTACT], executor, {
        headers: { "x-option": "1" },
        signal,
      });
    expect(received?.headers).toMatchObject({ mscrmcallerid: USER, "x-option": "1" });
    expect(received?.signal).toBe(signal);
  });
});
