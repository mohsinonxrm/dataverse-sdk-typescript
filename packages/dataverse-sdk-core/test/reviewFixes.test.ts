import { describe, it, expect, vi } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { DataverseNetworkError } from "../src/errors/NamedErrors.js";
import { odata } from "../src/odata/filter.js";
import type { FetchProvider } from "../src/abstractions/http.js";

const BASE_URL = "https://org.crm.dynamics.com";
const API_URL = `${BASE_URL}/api/data/v9.2`;

/** Fake fetch that records every call and answers from a handler. */
function fakeFetch(handler: (url: string, init: RequestInit) => Response | Promise<Response>): {
  provider: FetchProvider;
  calls: Array<{ url: string; init: RequestInit }>;
} {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  return {
    calls,
    provider: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const url =
          typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
        calls.push({ url, init: init ?? {} });
        return Promise.resolve(handler(url, init ?? {}));
      },
    },
  };
}

const json = (body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });

describe("DataverseClient base URL validation", () => {
  it("rejects plain http for non-loopback hosts", () => {
    expect(() => new DataverseClient({ baseUrl: "http://org.crm.dynamics.com" })).toThrow(
      /must use HTTPS/
    );
  });

  it("rejects unparseable base URLs", () => {
    expect(() => new DataverseClient({ baseUrl: "org.crm.dynamics.com" })).toThrow(
      /must use HTTPS/
    );
  });

  it("accepts https and loopback http", () => {
    expect(() => new DataverseClient({ baseUrl: BASE_URL })).not.toThrow();
    expect(() => new DataverseClient({ baseUrl: "HTTPS://ORG.crm.dynamics.com" })).not.toThrow();
    expect(() => new DataverseClient({ baseUrl: "http://localhost:5555" })).not.toThrow();
    expect(() => new DataverseClient({ baseUrl: "http://127.0.0.1:5555" })).not.toThrow();
  });
});

describe("AuthMiddleware scopes", () => {
  it("lets the token provider use its default scopes when none are configured", async () => {
    const getToken = vi.fn((_scopes?: string | string[]) => Promise.resolve("t"));
    const { provider } = fakeFetch(() => json({ UserId: "u" }));
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      tokenProvider: { getToken },
      fetchProvider: provider,
    });
    await client.api("WhoAmI").get();
    expect(getToken).toHaveBeenCalledTimes(1);
    expect(getToken.mock.calls[0]?.[0]).toBeUndefined();
  });

  it("passes configured scopes to the token provider", async () => {
    const getToken = vi.fn((_scopes?: string | string[]) => Promise.resolve("t"));
    const { provider, calls } = fakeFetch(() => json({ UserId: "u" }));
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      scopes: [`${BASE_URL}/.default`],
      tokenProvider: { getToken },
      fetchProvider: provider,
    });
    await client.api("WhoAmI").get();
    expect(getToken.mock.calls[0]?.[0]).toEqual([`${BASE_URL}/.default`]);
    expect(new Headers(calls[0]?.init.headers).get("authorization")).toBe("Bearer t");
  });
});

describe("getAll paging limits", () => {
  const pagedFetch = () =>
    fakeFetch((url) => {
      const page = Number(new URL(url).searchParams.get("page") ?? "1");
      return json({
        value: [{ n: page * 10 + 1 }, { n: page * 10 + 2 }],
        ...(page < 5 ? { "@odata.nextLink": `${API_URL}/accounts?page=${String(page + 1)}` } : {}),
      });
    });

  it("stops after maxPages requests", async () => {
    const { provider, calls } = pagedFetch();
    const client = new DataverseClient({ baseUrl: BASE_URL, fetchProvider: provider });
    const items = await client.api("accounts").getAll<{ n: number }>({ maxPages: 2 });
    expect(calls).toHaveLength(2);
    expect(items.map((i) => i.n)).toEqual([11, 12, 21, 22]);
  });

  it("stops as soon as maxItems is reached", async () => {
    const { provider, calls } = pagedFetch();
    const client = new DataverseClient({ baseUrl: BASE_URL, fetchProvider: provider });
    const items = await client.api("accounts").getAll<{ n: number }>({ maxItems: 3 });
    expect(items.map((i) => i.n)).toEqual([11, 12, 21]);
    expect(calls).toHaveLength(2);
  });

  it("follows every page when no limit is set", async () => {
    const { provider, calls } = pagedFetch();
    const client = new DataverseClient({ baseUrl: BASE_URL, fetchProvider: provider });
    const items = await client.api("accounts").getAll();
    expect(calls).toHaveLength(5);
    expect(items).toHaveLength(10);
  });

  it("passes the iterate() signal to later page requests", async () => {
    const { provider, calls } = pagedFetch();
    const client = new DataverseClient({ baseUrl: BASE_URL, fetchProvider: provider });
    const controller = new AbortController();
    for await (const _item of client.api("accounts").iterate({ signal: controller.signal })) {
      if (calls.length === 2) break;
    }
    expect(calls[1]?.init.signal).toBeDefined();
  });
});

describe("FetchRequestAdapter timeout", () => {
  it("throws DataverseNetworkError when the request times out", async () => {
    const provider: FetchProvider = {
      fetch: (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          const abort = () => {
            reject(new DOMException("aborted", "AbortError"));
          };
          // Like real fetch: reject at once if the signal is already aborted.
          if (init?.signal?.aborted) abort();
          init?.signal?.addEventListener("abort", abort);
        }),
    };
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      fetchProvider: provider,
      retry: { maxRetries: 0 },
    });
    const err = await client
      .api("WhoAmI")
      .get({ timeoutMs: 20 })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect((err as Error).name).toBe("RequestTimeout");
  });

  it("rethrows a caller abort unchanged", async () => {
    const provider: FetchProvider = {
      fetch: (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          const abort = () => {
            reject(new DOMException("aborted", "AbortError"));
          };
          // Like real fetch: reject at once if the signal is already aborted.
          if (init?.signal?.aborted) abort();
          init?.signal?.addEventListener("abort", abort);
        }),
    };
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      fetchProvider: provider,
      retry: { maxRetries: 0 },
    });
    const controller = new AbortController();
    const pending = client
      .api("WhoAmI")
      .get({ timeoutMs: 5000, signal: controller.signal })
      .catch((e: unknown) => e);
    controller.abort();
    const err = await pending;
    expect(err).not.toBeInstanceOf(DataverseNetworkError);
    expect((err as Error).name).toBe("AbortError");
  });
});

describe("bindMany executor", () => {
  it("delegates to the provided executor", async () => {
    const client = new DataverseClient({ baseUrl: BASE_URL });
    const executor = vi.fn().mockResolvedValue(undefined);
    await client
      .api("accounts(a1)")
      .bindMany("contact_customer_accounts", "contacts", ["c1", "c2"], executor);
    expect(executor).toHaveBeenCalledWith(
      client,
      "accounts(a1)",
      "contact_customer_accounts",
      "contacts",
      ["c1", "c2"]
    );
  });

  it("rejects an executor that isn't a function", async () => {
    const client = new DataverseClient({ baseUrl: BASE_URL });
    const builder = client.api("accounts(a1)") as unknown as {
      bindMany: (nav: string, set: string, ids: string[], executor: unknown) => Promise<void>;
    };
    await expect(builder.bindMany("nav", "contacts", ["c1"], {})).rejects.toThrow(
      /createBindManyExecutor/
    );
  });
});

describe("odata filter helper", () => {
  it("doubles single quotes in string literals", () => {
    expect(odata.eq("name", "O'Brien")).toBe("name eq 'O''Brien'");
    expect(odata.contains("name", "it's")).toBe("contains(name,'it''s')");
    expect(odata.startsWith("name", "'")).toBe("startswith(name,'''')");
  });

  it("formats non-string values and combinators", () => {
    expect(odata.eq("statecode", 0)).toBe("statecode eq 0");
    expect(odata.ne("parentaccountid", null)).toBe("parentaccountid ne null");
    expect(odata.and(odata.eq("a", true), odata.gt("b", 5))).toBe("(a eq true and b gt 5)");
    expect(odata.not(odata.endsWith("x", "y"))).toBe("not (endswith(x,'y'))");
  });
});
