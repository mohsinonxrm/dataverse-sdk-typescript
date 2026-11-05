import { afterEach, describe, expect, it, vi } from "vitest";

// Record every retry wait instead of sleeping.
const waits: number[] = [];
vi.mock("../src/utils/sleep.js", () => ({
  sleep: (ms: number) => {
    waits.push(ms);
    return Promise.resolve();
  },
}));

import { DataverseClient } from "../src/client/DataverseClient.js";
import { RequestOptions as MiddlewareRequestOptions } from "../src/middleware/RequestOptions.js";
import { getRetryAttempts } from "../src/index.js";
import type { RetryInfo, RetryOptions } from "../src/abstractions/options.js";
import type { FetchProvider } from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";

/** A client whose fetch plays `steps` in order (the last one repeats). */
function setup(steps: Array<Response | Error>, retry?: RetryOptions) {
  let calls = 0;
  const fetchProvider: FetchProvider = {
    fetch: () => {
      const step = steps[Math.min(calls, steps.length - 1)];
      calls++;
      if (step instanceof Error) return Promise.reject(step);
      return Promise.resolve(step.clone());
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    retry: { jitter: false, baseDelayMs: 100, ...retry },
  });
  return { client, calls: () => calls };
}

const status = (code: number, headers: Record<string, string> = {}) =>
  new Response(code === 204 ? null : "{}", {
    status: code,
    headers: { "content-type": "application/json", ...headers },
  });

const get = (client: DataverseClient, extra: object = {}) =>
  client.send({ method: "GET", url: "accounts", headers: {}, ...extra });

afterEach(() => {
  waits.length = 0;
});

describe("#32: onRetry", () => {
  it("fires once per retry, before the wait, with the right delay", async () => {
    const seen: RetryInfo[] = [];
    const { client } = setup([status(429, { "retry-after": "2" }), status(503), status(204)], {
      onRetry: (info) => {
        // The wait for this retry hasn't happened yet.
        expect(waits).toHaveLength(seen.length);
        seen.push(info);
      },
    });
    const res = await get(client, { correlationId: "corr-1" });
    expect(res.status).toBe(204);
    expect(seen.map(({ request: _r, ...rest }) => rest)).toEqual([
      {
        attempt: 1,
        maxRetries: 6,
        status: 429,
        delayMs: 2000,
        retryAfterMs: 2000,
        correlationId: "corr-1",
        error: undefined,
      },
      {
        attempt: 2,
        maxRetries: 6,
        status: 503,
        delayMs: 200,
        retryAfterMs: undefined,
        correlationId: "corr-1",
        error: undefined,
      },
    ]);
    expect(seen[0]?.request.url).toContain("accounts");
    expect(waits).toEqual([2000, 200]);
  });

  it("does not fire when nothing is retried", async () => {
    const onRetry = vi.fn();
    const { client } = setup([status(200)], { onRetry });
    await get(client);
    expect(onRetry).not.toHaveBeenCalled();
  });

  it("fires for a retried network error with status 0 and the error", async () => {
    const seen: RetryInfo[] = [];
    const { client } = setup([new TypeError("fetch failed"), status(204)], {
      retryNetworkErrors: true,
      onRetry: (info) => seen.push(info),
    });
    await get(client);
    expect(seen).toHaveLength(1);
    expect(seen[0]?.status).toBe(0);
    expect(seen[0]?.error?.name).toBe("ConnectionFailed");
  });

  it("a per-request onRetry replaces the client's", async () => {
    const clientHook = vi.fn();
    const requestHook = vi.fn();
    const { client } = setup([status(503), status(204)], { onRetry: clientHook });
    await get(client, {
      middlewareOptions: new MiddlewareRequestOptions([{ type: "retry", onRetry: requestHook }]),
    });
    expect(requestHook).toHaveBeenCalledTimes(1);
    expect(clientHook).not.toHaveBeenCalled();
  });

  it("an onRetry that throws does not break the request", async () => {
    const { client, calls } = setup([status(503), status(204)], {
      onRetry: () => {
        throw new Error("UI gone");
      },
    });
    expect((await get(client)).status).toBe(204);
    expect(calls()).toBe(2);
  });
});

describe("#32: attempt history", () => {
  it("can be read from the response after send()", async () => {
    const { client } = setup([status(429, { "retry-after": "1" }), status(503), status(204)]);
    const res = await get(client);
    expect(getRetryAttempts(res)).toEqual([
      { attempt: 0, status: 429, retryAfterMs: 1000, delayMs: 1000 },
      { attempt: 1, status: 503, delayMs: 200 },
      { attempt: 2, status: 204 },
    ]);
  });

  it("has one entry when there was no retry", async () => {
    const { client } = setup([status(200)]);
    expect(getRetryAttempts(await get(client))).toEqual([{ attempt: 0, status: 200 }]);
  });

  it("records the network errors that were retried", async () => {
    const { client } = setup([new TypeError("fetch failed"), status(204)], {
      retryNetworkErrors: true,
    });
    const attempts = getRetryAttempts(await get(client));
    expect(attempts?.map((a) => [a.status, a.error?.name, a.delayMs])).toEqual([
      [0, "ConnectionFailed", 100],
      [204, undefined, undefined],
    ]);
  });

  it("shows the final failure when retries are exhausted", async () => {
    const { client } = setup([status(503)], { maxRetries: 2 });
    const res = await get(client);
    expect(res.status).toBe(503);
    expect(getRetryAttempts(res)?.map((a) => a.status)).toEqual([503, 503, 503]);
  });

  it("works with the builder's response()", async () => {
    const { client } = setup([status(503), status(204)]);
    const res = await client.api("accounts").response();
    expect(getRetryAttempts(res)).toHaveLength(2);
  });

  it("is undefined for a response the client never saw", () => {
    expect(getRetryAttempts(new Response(null))).toBeUndefined();
  });
});
