/**
 * #308: ChaosMiddleware answers some requests with a fake 429/5xx or a network failure.
 */
import { afterEach, describe, expect, it, vi } from "vitest";

// Record retry waits instead of sleeping.
const waits: number[] = [];
vi.mock("../src/utils/sleep.js", () => ({
  sleep: (ms: number) => {
    waits.push(ms);
    return Promise.resolve();
  },
}));

import { DataverseClient } from "../src/client/DataverseClient.js";
import {
  buildDefaultMiddleware,
  ChaosMiddleware,
  DataverseAbortError,
  DataverseError,
  DataverseInvalidRequestError,
  DataverseNetworkError,
  DataverseODataError,
  DataverseThrottleError,
  MiddlewareRequestOptions,
  type ChaosFault,
  type ChaosOptions,
  type RetryOptions,
} from "../src/index.js";
import type { FetchProvider, RequestInformation } from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";

/** A client with the chaos middleware appended, whose real fetch always answers 200. */
function setup(chaos: ChaosOptions, retry: RetryOptions = { maxRetries: 0 }) {
  const urls: string[] = [];
  const fetchProvider: FetchProvider = {
    fetch: (input) => {
      urls.push(input instanceof Request ? input.url : input.toString());
      return Promise.resolve(
        new Response(JSON.stringify({ value: [] }), {
          status: 200,
          headers: { "content-type": "application/json" },
        })
      );
    },
  };
  const middleware = new ChaosMiddleware(chaos);
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    retry: { jitter: false, baseDelayMs: 100, ...retry },
    middleware: { append: [middleware] },
  });
  return { client, urls, middleware };
}

/** Random numbers from a fixed list (repeating), for predictable picks. */
function sequence(...values: number[]) {
  let i = 0;
  return () => values[i++ % values.length] ?? 0;
}

afterEach(() => {
  waits.length = 0;
});

describe("#308: ChaosMiddleware", () => {
  it("is not part of the default pipeline", () => {
    const names = buildDefaultMiddleware({ baseUrl: BASE_URL }).map((m) => m.name);
    expect(names).not.toContain("ChaosMiddleware");
  });

  it("with percentage 100, answers every request itself and sends nothing", async () => {
    const { client, urls } = setup({ percentage: 100, faults: [{ status: 503 }] });
    const err = await client
      .api("accounts")
      .get()
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ status: 503, code: "ChaosFault" });
    expect(urls).toHaveLength(0);
  });

  it("with percentage 0, sends every request", async () => {
    const { client, urls } = setup({ percentage: 0 });
    for (let i = 0; i < 5; i++) await client.api("accounts").get();
    expect(urls).toHaveLength(5);
  });

  it("faults about `percentage` of requests (10 by default)", async () => {
    // random() < 0.1 means a fault; the second number picks which.
    const { client, urls } = setup({ random: sequence(0.05, 0, 0.5, 0.95, 0.2, 0.99) });
    const results: string[] = [];
    for (let i = 0; i < 4; i++) {
      results.push(
        await client
          .api("accounts")
          .get()
          .then(
            () => "sent",
            () => "fault"
          )
      );
    }
    expect(results).toEqual(["fault", "sent", "sent", "sent"]);
    expect(urls).toHaveLength(3);
  });

  it("picks among the default faults: 429 with Retry-After 1, 502, 503, 504", async () => {
    const seen: Array<number | string> = [];
    for (const pick of [0, 0.3, 0.6, 0.9]) {
      const { client } = setup({ percentage: 100, random: sequence(0, pick) });
      const err = await client
        .api("accounts")
        .get()
        .catch((e: unknown) => e);
      seen.push(err instanceof DataverseError ? (err.status ?? 0) : "none");
      if (pick === 0) {
        expect(err).toBeInstanceOf(DataverseThrottleError);
        expect(err).toMatchObject({ retryAfterMs: 1000, code: "0x80072322" });
      }
    }
    expect(seen).toEqual([429, 502, 503, 504]);
  });

  it("goes through the retry middleware like a real fault: a 429 is retried after Retry-After", async () => {
    let n = 0;
    const { client, urls } = setup(
      {
        script: () => (n++ === 0 ? { status: 429, retryAfterSeconds: 3 } : undefined),
      },
      { maxRetries: 2 }
    );
    await client.api("accounts").get();
    expect(waits).toEqual([3000]);
    expect(urls).toHaveLength(1);
  });

  it('fails like a dropped connection for status "network"', async () => {
    const { client, urls } = setup({ percentage: 100, faults: [{ status: "network" }] });
    const err = await client
      .api("accounts")
      .post({ name: "x" })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect(err).toMatchObject({ name: "ConnectionFailed" });
    expect((err as Error).cause).toBeInstanceOf(TypeError);
    expect(urls).toHaveLength(0);
  });

  it("a network fault on a GET is retried by the retry middleware", async () => {
    const { client, urls } = setup(
      { script: (_r, { attempt }) => (attempt < 2 ? { status: "network" } : undefined) },
      { maxRetries: 3 }
    );
    await client.api("accounts").get();
    expect(waits).toHaveLength(2);
    expect(urls).toHaveLength(1);
  });

  it("gives the script the request index and the retry attempt", async () => {
    const calls: Array<[string, number, number]> = [];
    const { client } = setup(
      {
        script: (request, { requestIndex, attempt }) => {
          calls.push([request.method, requestIndex, attempt]);
          return requestIndex === 0 ? { status: 503 } : undefined;
        },
      },
      { maxRetries: 2 }
    );
    await client.api("accounts").get();
    await client.api("contacts").get();
    expect(calls).toEqual([
      ["GET", 0, 0],
      ["GET", 1, 1],
      ["GET", 2, 0],
    ]);
  });

  it("only touches requests that match a RegExp (full URL) or a function", async () => {
    const byRegExp = setup({ percentage: 100, faults: [{ status: 503 }], match: /\/accounts\?/g });
    await expect(byRegExp.client.api("accounts").top(1).get()).rejects.toMatchObject({
      status: 503,
    });
    await expect(byRegExp.client.api("accounts").top(1).get()).rejects.toMatchObject({
      status: 503,
    });
    await byRegExp.client.api("accounts").get();
    await byRegExp.client.api("contacts").top(1).get();
    expect(byRegExp.urls).toHaveLength(2);

    const byFunction = setup({
      percentage: 100,
      faults: [{ status: 503 }],
      match: (r: RequestInformation) => r.method === "POST",
    });
    await byFunction.client.api("accounts").get();
    await expect(byFunction.client.api("accounts").post({})).rejects.toMatchObject({
      status: 503,
    });
  });

  it("per request: disable skips the fault, and fault forces one", async () => {
    const { client, urls } = setup({ percentage: 100, faults: [{ status: 503 }] });
    await client.api("accounts").get({
      middlewareOptions: new MiddlewareRequestOptions([{ type: "chaos", disable: true }]),
    });
    expect(urls).toHaveLength(1);

    const quiet = setup({ percentage: 0 });
    await expect(
      quiet.client.api("accounts").get({
        middlewareOptions: new MiddlewareRequestOptions([
          { type: "chaos", fault: { status: 504 } satisfies ChaosFault },
        ]),
      })
    ).rejects.toMatchObject({ status: 504 });
  });

  it("uses the fault's body and headers when given", async () => {
    const { client } = setup({
      percentage: 100,
      faults: [{ status: 500, body: "plain text", headers: { "x-test": "1" } }],
    });
    const res = await client.api("accounts").response();
    expect(res.status).toBe(500);
    expect(await res.text()).toBe("plain text");
    expect(res.headers.get("x-test")).toBe("1");
    expect(res.headers.get("retry-after")).toBeNull();
  });

  it("can fake a success with no body (e.g. 204)", async () => {
    const { client, urls } = setup({ percentage: 100, faults: [{ status: 204 }] });
    const res = await client.api("accounts").response();
    expect(res.status).toBe(204);
    expect(urls).toHaveLength(0);
  });

  it("tells onFault about each fault, and ignores an error it throws", async () => {
    const seen: Array<number | string> = [];
    const { client } = setup({
      percentage: 100,
      faults: [{ status: 502 }],
      onFault: (fault) => {
        seen.push(fault.status);
        throw new Error("ignored");
      },
    });
    await expect(client.api("accounts").get()).rejects.toMatchObject({ status: 502 });
    expect(seen).toEqual([502]);
  });

  it("rejects an aborted request as aborted, not with the fault", async () => {
    const { client } = setup({ percentage: 100, faults: [{ status: 503 }] });
    const controller = new AbortController();
    controller.abort();
    await expect(client.api("accounts").get({ signal: controller.signal })).rejects.toBeInstanceOf(
      DataverseAbortError
    );
  });

  it.each<[ChaosOptions]>([
    [{ percentage: -1 }],
    [{ percentage: 101 }],
    [{ percentage: Number.NaN }],
    [{ faults: [] }],
    [{ faults: [{ status: 99 }] }],
    [{ faults: [{ status: 600 }] }],
    [{ faults: [{ status: 429, retryAfterSeconds: -1 }] }],
  ])("refuses %j", (options) => {
    expect(() => new ChaosMiddleware(options)).toThrow(DataverseInvalidRequestError);
  });

  it("refuses an invalid fault returned by a script", async () => {
    const { client } = setup({ script: () => ({ status: 42 }) });
    await expect(client.api("accounts").get()).rejects.toMatchObject({
      name: "InvalidParameter",
    });
  });
});
