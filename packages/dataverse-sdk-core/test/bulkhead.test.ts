/**
 * #343: BulkheadMiddleware limits requests in flight per category.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import {
  buildDefaultMiddleware,
  BulkheadMiddleware,
  DataverseAbortError,
  DataverseBulkheadRejectedError,
  DataverseInvalidRequestError,
  MiddlewareRequestOptions,
  type BulkheadOptions,
} from "../src/index.js";
import type { FetchProvider } from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";

/** A client with the bulkhead prepended; fetch holds each request briefly and records peaks. */
function setup(options: BulkheadOptions, fetchSteps?: Array<number | "network">) {
  const inFlight = new Map<string, number>();
  const peak = new Map<string, number>();
  let calls = 0;
  const fetchProvider: FetchProvider = {
    fetch: async (input, init) => {
      const url = input instanceof Request ? input.url : input.toString();
      const key = `${init?.method ?? "GET"} ${new URL(url).pathname.split("/").pop() ?? ""}`;
      inFlight.set(key, (inFlight.get(key) ?? 0) + 1);
      peak.set(key, Math.max(peak.get(key) ?? 0, inFlight.get(key) ?? 0));
      const step = fetchSteps?.[Math.min(calls, fetchSteps.length - 1)] ?? 204;
      calls++;
      await new Promise((resolve) => setTimeout(resolve, 10));
      inFlight.set(key, (inFlight.get(key) ?? 1) - 1);
      if (step === "network") throw new TypeError("fetch failed");
      return new Response(null, { status: step });
    },
  };
  const bulkhead = new BulkheadMiddleware(options);
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    concurrency: { maxConcurrentRequests: 32, adaptiveFromDopHint: false },
    retry: { maxRetries: 0 },
    middleware: { prepend: [bulkhead] },
  });
  return { client, bulkhead, peak };
}

describe("#343: BulkheadMiddleware", () => {
  it("is not part of the default pipeline", () => {
    const names = buildDefaultMiddleware({ baseUrl: BASE_URL }).map((m) => m.name);
    expect(names).not.toContain("BulkheadMiddleware");
  });

  it("limits reads and writes separately (GET/HEAD are reads, the rest writes)", async () => {
    const { client, peak } = setup({ limits: { read: 3, write: 1 } });
    await Promise.all([
      ...Array.from({ length: 8 }, () => client.api("accounts").get()),
      ...Array.from({ length: 4 }, () => client.api("accounts").post({})),
      ...Array.from({ length: 2 }, () => client.api("accounts(1)").delete()),
    ]);
    expect(peak.get("GET accounts")).toBe(3);
    expect(peak.get("POST accounts")).toBe(1);
    // POST and DELETE share the write limit of 1.
    expect((peak.get("POST accounts") ?? 0) + (peak.get("DELETE accounts(1)") ?? 0)).toBe(2);
  });

  it("leaves categories without a limit alone, and applies defaultLimit to others", async () => {
    const unlimited = setup({ limits: { write: 1 } });
    await Promise.all(Array.from({ length: 6 }, () => unlimited.client.api("accounts").get()));
    expect(unlimited.peak.get("GET accounts")).toBe(6);

    const perEntitySet = setup({
      defaultLimit: 2,
      categorize: (r) => new URL(r.url).pathname.split("/").pop(),
    });
    await Promise.all([
      ...Array.from({ length: 5 }, () => perEntitySet.client.api("accounts").get()),
      ...Array.from({ length: 5 }, () => perEntitySet.client.api("contacts").get()),
    ]);
    expect(perEntitySet.peak.get("GET accounts")).toBe(2);
    expect(perEntitySet.peak.get("GET contacts")).toBe(2);
  });

  it("a categorize result of undefined leaves the request unlimited", async () => {
    const { client, peak } = setup({ defaultLimit: 1, categorize: () => undefined });
    await Promise.all(Array.from({ length: 4 }, () => client.api("accounts").get()));
    expect(peak.get("GET accounts")).toBe(4);
  });

  it("refuses requests beyond maxQueue with DataverseBulkheadRejectedError", async () => {
    const { client, bulkhead } = setup({ limits: { write: 1 }, maxQueue: 1 });
    const results = await Promise.allSettled(
      Array.from({ length: 3 }, () => client.api("accounts").post({}))
    );
    expect(results.map((r) => r.status)).toEqual(["fulfilled", "fulfilled", "rejected"]);
    const reason = (results[2] as PromiseRejectedResult).reason as unknown;
    expect(reason).toBeInstanceOf(DataverseBulkheadRejectedError);
    expect(reason).toMatchObject({ category: "write" });
    expect(bulkhead.inFlight("write")).toBe(0);
  });

  it("maxQueue 0 refuses every request over the limit", async () => {
    const { client } = setup({ limits: { read: 1 }, maxQueue: 0 });
    const results = await Promise.allSettled([client.api("a").get(), client.api("b").get()]);
    expect(results.map((r) => r.status)).toEqual(["fulfilled", "rejected"]);
  });

  it("a waiting request leaves the queue when its signal aborts", async () => {
    const { client, bulkhead } = setup({ limits: { read: 1 } });
    const first = client.api("accounts").get();
    const controller = new AbortController();
    const second = client.api("accounts").get({ signal: controller.signal });
    await Promise.resolve();
    expect(bulkhead.inFlight("read")).toBe(1);
    expect(bulkhead.queued("read")).toBe(1);
    controller.abort();
    await expect(second).rejects.toBeInstanceOf(DataverseAbortError);
    expect(bulkhead.queued("read")).toBe(0);
    await first;
    expect(bulkhead.inFlight("read")).toBe(0);
  });

  it("gives the slot back when the request fails", async () => {
    const { client, bulkhead } = setup({ limits: { read: 1 } }, ["network", 204]);
    await expect(client.api("accounts").get()).rejects.toMatchObject({ name: "ConnectionFailed" });
    expect(bulkhead.inFlight("read")).toBe(0);
    await client.api("accounts").get();
  });

  it("per request: category moves a request, bypass skips the bulkhead", async () => {
    const { client, peak } = setup({ limits: { read: 1, import: 2 } });
    const asImport = new MiddlewareRequestOptions([{ type: "bulkhead", category: "import" }]);
    await Promise.all(
      Array.from({ length: 4 }, () => client.api("accounts").get({ middlewareOptions: asImport }))
    );
    expect(peak.get("GET accounts")).toBe(2);

    const bypass = new MiddlewareRequestOptions([{ type: "bulkhead", bypass: true }]);
    await Promise.all(
      Array.from({ length: 4 }, () => client.api("contacts").get({ middlewareOptions: bypass }))
    );
    expect(peak.get("GET contacts")).toBe(4);
  });

  it("prepended, a request keeps its slot across its retries", async () => {
    let seenInFlight = -1;
    const bulkhead = new BulkheadMiddleware({ limits: { read: 1 } });
    let calls = 0;
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      fetchProvider: {
        fetch: () => Promise.resolve(new Response(null, { status: calls++ === 0 ? 503 : 204 })),
      },
      retry: {
        baseDelayMs: 1,
        jitter: false,
        onRetry: () => {
          seenInFlight = bulkhead.inFlight("read");
        },
      },
      middleware: { prepend: [bulkhead] },
    });
    await client.api("accounts").get();
    expect(seenInFlight).toBe(1);
    expect(bulkhead.inFlight("read")).toBe(0);
  });

  it.each<[BulkheadOptions]>([
    [{}],
    [{ limits: { read: 0 } }],
    [{ limits: { write: 1.5 } }],
    [{ defaultLimit: -1 }],
    [{ defaultLimit: 1, maxQueue: -1 }],
    [{ defaultLimit: 1, maxQueue: 0.5 }],
  ])("refuses %j", (options) => {
    expect(() => new BulkheadMiddleware(options)).toThrow(DataverseInvalidRequestError);
  });
});
