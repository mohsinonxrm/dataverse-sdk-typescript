/**
 * #378: paging carries the request options to every page; a 304 is a successful dependency; the
 * 401 body is released even when the token refresh throws; the FetchXML `$batch` fallback is
 * retried like the GET it carries. Also: `search()` is gone ($search isn't supported).
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import type { FetchProvider, TelemetryClient } from "../src/index.js";
import { MiddlewareRequestOptions } from "../src/index.js";

type DependencyData = Parameters<TelemetryClient["trackDependency"]>[1];

const BASE_URL = "https://contoso.crm.dynamics.com";
const API = `${BASE_URL}/api/data/v9.2`;

interface Call {
  url: string;
  method: string;
  headers: Headers;
  signal: AbortSignal | null | undefined;
}

function setup(
  respond: (url: string, n: number) => Response,
  extra: Partial<ConstructorParameters<typeof DataverseClient>[0]> = {}
) {
  const calls: Call[] = [];
  const fetchProvider: FetchProvider = {
    fetch: (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      calls.push({
        url,
        method: init?.method ?? "GET",
        headers: new Headers(init?.headers),
        signal: init?.signal,
      });
      return Promise.resolve(respond(url, calls.length));
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    retry: { baseDelayMs: 1, jitter: false },
    ...extra,
  });
  return { client, calls };
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

/** Two pages: the first links to the second. */
const twoPages = (url: string) =>
  url.includes("page2")
    ? json({ value: [{ n: 3 }] })
    : json({ value: [{ n: 1 }, { n: 2 }], "@odata.nextLink": `${API}/accounts?page2` });

describe("#378: paging carries the request options to every page", () => {
  it("getAll() sends the correlation id, option headers and middleware options on every page", async () => {
    const { client, calls } = setup(twoPages);
    const rows = await client.api("accounts").getAll<{ n: number }>({
      correlationId: "corr-1",
      headers: { "x-option": "1" },
      middlewareOptions: new MiddlewareRequestOptions([{ type: "retry", maxRetries: 0 }]),
    });
    expect(rows.map((r) => r.n)).toEqual([1, 2, 3]);
    expect(calls).toHaveLength(2);
    for (const c of calls) {
      expect(c.headers.get("x-ms-correlation-id")).toBe("corr-1");
      expect(c.headers.get("x-option")).toBe("1");
    }
  });

  it("iterate() applies timeoutMs to later pages too", async () => {
    let n = 0;
    const fetchProvider: FetchProvider = {
      fetch: (input, init) =>
        new Promise((resolve, reject) => {
          n++;
          if (n === 1) {
            resolve(
              twoPages(
                typeof input === "string" ? input : input instanceof URL ? input.href : input.url
              )
            );
            return;
          }
          // The second page never answers: only the timeout can end it.
          init?.signal?.addEventListener("abort", () => {
            reject(init.signal?.reason as Error);
          });
        }),
    };
    const client = new DataverseClient({ baseUrl: BASE_URL, fetchProvider });
    const seen: number[] = [];
    const err = await (async () => {
      for await (const r of client.api("accounts").iterate<{ n: number }>({ timeoutMs: 50 })) {
        seen.push(r.n);
      }
    })().catch((e: unknown) => e);
    expect(seen).toEqual([1, 2]);
    expect((err as Error).name).toBe("RequestTimeout");
  });

  it("Prefer from the options is sent once on later pages", async () => {
    const { client, calls } = setup(twoPages);
    await client.api("accounts").getAll({ prefer: ["odata.maxpagesize=2" as never] });
    expect(calls[1]?.headers.get("prefer")).toBe("odata.maxpagesize=2");
  });

  it("maxItems: 0 returns nothing and sends nothing", async () => {
    const { client, calls } = setup(twoPages);
    expect(await client.api("accounts").getAll({ maxItems: 0 })).toEqual([]);
    expect(calls).toHaveLength(0);
  });
});

describe("#378: pipeline details", () => {
  it("reports a 304 as a successful dependency", async () => {
    const deps: DependencyData[] = [];
    const telemetry: TelemetryClient = {
      trackDependency: (_name, data) => {
        deps.push(data);
      },
      trackEvent: () => undefined,
      trackException: () => undefined,
    };
    const { client } = setup(() => new Response(null, { status: 304 }), { telemetry });
    await client.api("accounts(1)").response();
    expect(deps[0]?.success).toBe(true);
    expect(deps[0]?.resultCode).toBe("304");
  });

  it("releases the 401 body even when getting a new token throws", async () => {
    let cancelled = false;
    const body = new ReadableStream({
      cancel() {
        cancelled = true;
      },
    });
    let tokens = 0;
    const { client } = setup(() => new Response(body, { status: 401 }), {
      tokenProvider: {
        getToken: () => {
          tokens++;
          return tokens === 1 ? Promise.resolve("t") : Promise.reject(new Error("no token"));
        },
      },
    });
    await expect(client.api("WhoAmI").get()).rejects.toThrow("no token");
    expect(cancelled).toBe(true);
  });

  it("retries the FetchXML $batch fallback after a 503, as it would the GET", async () => {
    const boundary = "batchresponse_1";
    const ok = () =>
      new Response(
        [
          `--${boundary}`,
          "Content-Type: application/http",
          "Content-Transfer-Encoding: binary",
          "",
          "HTTP/1.1 200 OK",
          "Content-Type: application/json; odata.metadata=minimal",
          "",
          JSON.stringify({ value: [{ name: "a" }] }),
          `--${boundary}--`,
          "",
        ].join("\r\n"),
        { headers: { "content-type": `multipart/mixed; boundary=${boundary}` } }
      );
    const { client, calls } = setup((_url, n) =>
      n === 1 ? new Response(null, { status: 503 }) : ok()
    );
    const page = await client
      .api("accounts")
      .fetchXml(`<fetch><entity name="account"><attribute name="name"/></entity></fetch>`, {
        maxUrlLength: 1,
      });
    expect(calls.map((c) => c.method)).toEqual(["POST", "POST"]);
    expect(page.value).toEqual([{ name: "a" }]);
  });

  it("has no search(): Dataverse doesn't support $search", () => {
    const { client } = setup(() => json({}));
    expect((client.api("accounts") as unknown as Record<string, unknown>).search).toBeUndefined();
  });
});
