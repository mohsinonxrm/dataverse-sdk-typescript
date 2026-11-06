/**
 * #47: `iterate()` sends nothing until it is iterated, and every page after the first carries the
 * first request's `Prefer`, impersonation and custom headers. `getAll()` does the same and stops
 * at `maxPages`.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { PageIterator } from "../src/paging/PageIterator.js";

const ORG = "https://contoso.crm.dynamics.com";
const API = `${ORG}/api/data/v9.2`;
const CALLER = "00000000-0000-0000-0000-0000000000aa";

interface Sent {
  url: string;
  headers: Record<string, string>;
}

/** Three pages of two records; page n links to page n + 1. */
function pagedClient(extra: Partial<ConstructorParameters<typeof DataverseClient>[0]> = {}) {
  const sent: Sent[] = [];
  const client = new DataverseClient({
    baseUrl: ORG,
    retry: { maxRetries: 0 },
    tokenProvider: { getToken: () => Promise.resolve("token") },
    fetchProvider: {
      fetch: (input, init) => {
        if (init?.signal?.aborted) {
          return Promise.reject(new DOMException("Aborted", "AbortError"));
        }
        const url = input instanceof Request ? input.url : input.toString();
        const headers: Record<string, string> = {};
        new Headers(init?.headers).forEach((v, k) => (headers[k] = v));
        sent.push({ url, headers });
        const page = Number(new URL(url).searchParams.get("$skiptoken") ?? "1");
        const body = {
          value: [{ n: page * 2 - 1 }, { n: page * 2 }],
          ...(page < 3
            ? { "@odata.nextLink": `${API}/accounts?$skiptoken=${String(page + 1)}` }
            : {}),
        };
        return Promise.resolve(
          new Response(JSON.stringify(body), { headers: { "content-type": "application/json" } })
        );
      },
    },
    ...extra,
  });
  return { client, sent };
}

/** The builder as an app would write it: page size, annotations, impersonation, a custom header. */
function query(client: DataverseClient) {
  return client
    .api("accounts")
    .select("name")
    .preferRaw("odata.maxpagesize=2")
    .preferRaw('odata.include-annotations="*"')
    .impersonate(CALLER)
    .header("X-App", "studio")
    .ifNoneMatch('W/"123"');
}

describe("#47: iterate() is lazy", () => {
  it("sends nothing until the first next()", async () => {
    const { client, sent } = pagedClient();
    const iterable = client.api("accounts").iterate();
    await new Promise((r) => setTimeout(r, 10));
    expect(sent).toHaveLength(0);

    const iterator = iterable[Symbol.asyncIterator]();
    expect(sent).toHaveLength(0);
    expect(await iterator.next()).toEqual({ done: false, value: { n: 1 } });
    expect(sent).toHaveLength(1);
  });
});

describe("#47: later pages are requested like the first", () => {
  function expectSameHeaders(sent: Sent[]) {
    expect(sent).toHaveLength(3);
    const [first, ...later] = sent;
    for (const page of later) {
      expect(page.headers.prefer).toBe(first.headers.prefer);
      expect(page.headers.prefer).toContain("odata.maxpagesize=2");
      expect(page.headers.prefer).toContain('odata.include-annotations="*"');
      expect(page.headers.mscrmcallerid).toBe(CALLER);
      expect(page.headers["x-app"]).toBe("studio");
      expect(page.headers.authorization).toBe("Bearer token"); // a token per request, as usual
      expect(page.headers["if-none-match"]).toBeUndefined(); // the first page's etag only
    }
    expect(first.headers["if-none-match"]).toBe('W/"123"');
  }

  it("iterate()", async () => {
    const { client, sent } = pagedClient();
    const seen: number[] = [];
    for await (const r of query(client).iterate<{ n: number }>()) seen.push(r.n);
    expect(seen).toEqual([1, 2, 3, 4, 5, 6]);
    expectSameHeaders(sent);
  });

  it("getAll()", async () => {
    const { client, sent } = pagedClient();
    const all = await query(client).getAll<{ n: number }>();
    expect(all.map((r) => r.n)).toEqual([1, 2, 3, 4, 5, 6]);
    expectSameHeaders(sent);
  });

  it("request options headers carry over too, and the signal is passed on", async () => {
    const { client, sent } = pagedClient();
    const controller = new AbortController();
    await client.api("accounts").getAll({ signal: controller.signal });
    expect(sent).toHaveLength(3);

    controller.abort();
    await expect(
      client.api("accounts").getAll({ signal: controller.signal })
    ).rejects.toMatchObject({ name: "AbortError" });
  });
});

describe("#47: getAll() limits", () => {
  it("maxPages: 2 sends two requests", async () => {
    const { client, sent } = pagedClient();
    const rows = await client.api("accounts").getAll({ maxPages: 2 });
    expect(rows).toHaveLength(4);
    expect(sent).toHaveLength(2);
  });

  it("maxItems: 3 stops before the third page", async () => {
    const { client, sent } = pagedClient();
    const rows = await client.api("accounts").getAll({ maxItems: 3 });
    expect(rows).toHaveLength(3);
    expect(sent).toHaveLength(2);
  });
});

describe("#47: nextLink origin", () => {
  it("a nextLink to another origin is refused before anything is sent there", async () => {
    const sent: string[] = [];
    const client = new DataverseClient({
      baseUrl: ORG,
      tokenProvider: { getToken: () => Promise.resolve("token") },
      fetchProvider: {
        fetch: (input) => {
          sent.push(input instanceof Request ? input.url : input.toString());
          return Promise.resolve(
            new Response(
              JSON.stringify({ value: [1], "@odata.nextLink": "https://evil.example.com/steal" }),
              { headers: { "content-type": "application/json" } }
            )
          );
        },
      },
    });
    await expect(client.api("accounts").getAll()).rejects.toMatchObject({
      name: "TokenOriginRefused",
    });
    expect(sent).toEqual([`${API}/accounts`]);
  });
});

describe("PageIterator", () => {
  it("still works with the three-argument constructor", async () => {
    const { client, sent } = pagedClient();
    const first = await client.api("accounts").getPage<{ n: number }>();
    const seen: number[] = [];
    for await (const r of new PageIterator(client, first)) seen.push(r.n);
    expect(seen).toEqual([1, 2, 3, 4, 5, 6]);
    expect(sent).toHaveLength(3);
  });
});
