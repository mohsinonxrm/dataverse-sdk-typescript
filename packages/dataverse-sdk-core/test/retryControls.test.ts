import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";

// Record every retry wait instead of sleeping, so long Retry-After values run instantly.
const waits: number[] = [];
vi.mock("../src/utils/sleep.js", () => ({
  sleep: (ms: number, signal?: AbortSignal) => {
    waits.push(ms);
    return signal?.aborted
      ? Promise.reject(new DOMException("Aborted", "AbortError"))
      : Promise.resolve();
  },
}));

import { DataverseClient } from "../src/client/DataverseClient.js";
import { RequestOptions as MiddlewareRequestOptions } from "../src/middleware/RequestOptions.js";
import type { RetryOptions } from "../src/abstractions/options.js";
import type * as core from "../src/index.js";
import type { FetchProvider, HttpMethod } from "../src/abstractions/http.js";
import { DataverseThrottleError } from "../src/errors/DataverseThrottleError.js";
import { DataverseNetworkError } from "../src/errors/NamedErrors.js";
import { parseODataError } from "../src/errors/parseODataError.js";
import { parseRetryAfter } from "../src/utils/HeaderUtils.js";

const BASE_URL = "https://contoso.crm.dynamics.com";

type Step = Response | Error;

/** A client whose fetch plays `steps` in order (the last one repeats), counting calls. */
function setup(steps: Step[], retry?: RetryOptions) {
  let calls = 0;
  const fetchProvider: FetchProvider = {
    fetch: (_input, init) => {
      const step = steps[Math.min(calls, steps.length - 1)];
      calls++;
      if (init?.signal?.aborted) return Promise.reject(new DOMException("Aborted", "AbortError"));
      if (step instanceof Error) return Promise.reject(step);
      return Promise.resolve(step.clone());
    },
  };
  const client = new DataverseClient({ baseUrl: BASE_URL, fetchProvider, retry });
  return { client, calls: () => calls };
}

const status = (code: number, headers: Record<string, string> = {}) =>
  new Response(
    code === 204 ? null : JSON.stringify({ error: { message: `HTTP ${String(code)}` } }),
    {
      status: code,
      headers: { "content-type": "application/json", ...headers },
    }
  );

function send(client: DataverseClient, method: HttpMethod = "GET", extra: object = {}) {
  return client.send({
    method,
    url: "accounts",
    headers: {},
    body: method === "POST" ? { name: "x" } : undefined,
    ...extra,
  });
}

afterEach(() => {
  waits.length = 0;
  vi.restoreAllMocks();
});

describe("#17: Retry-After is capped", () => {
  it("a 429 with Retry-After: 300 and the default config returns at once", async () => {
    const { client, calls } = setup([status(429, { "retry-after": "300" }), status(204)]);
    const err = await client
      .api("accounts")
      .get()
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseThrottleError);
    expect((err as DataverseThrottleError).retryAfterMs).toBe(300_000);
    expect(calls()).toBe(1);
    expect(waits).toEqual([]);
  });

  it("a Retry-After within the cap is waited out exactly, without jitter", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const { client, calls } = setup([status(429, { "retry-after": "2" }), status(204)]);
    const res = await send(client);
    expect(res.status).toBe(204);
    expect(calls()).toBe(2);
    expect(waits).toEqual([2000]);
  });

  it("maxRetryAfterMs defaults to maxDelayMs", async () => {
    const { client, calls } = setup([status(503, { "retry-after": "2" }), status(204)], {
      maxDelayMs: 1000,
    });
    expect((await send(client)).status).toBe(503);
    expect(calls()).toBe(1);
  });

  it("maxRetryAfterMs: Infinity always honours Retry-After", async () => {
    const { client } = setup([status(429, { "retry-after": "300" }), status(204)], {
      maxRetryAfterMs: Number.POSITIVE_INFINITY,
    });
    expect((await send(client)).status).toBe(204);
    expect(waits).toEqual([300_000]);
  });

  it("maxRetryAfterMs can be set per request", async () => {
    const { client } = setup([status(429, { "retry-after": "300" }), status(204)]);
    const res = await send(client, "GET", {
      middlewareOptions: new MiddlewareRequestOptions([
        { type: "retry", maxRetryAfterMs: 600_000 },
      ]),
    });
    expect(res.status).toBe(204);
    expect(waits).toEqual([300_000]);
  });
});

describe("#17: jitter", () => {
  it("is applied to the computed backoff by default (seeded RNG)", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0); // the lowest factor: 0.8
    const { client } = setup([status(503), status(503), status(204)], { baseDelayMs: 1000 });
    await send(client);
    expect(waits).toEqual([800, 1600]);
  });

  it("varies with the RNG", async () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0.25).mockReturnValueOnce(0.75);
    const { client } = setup([status(503), status(503), status(204)], { baseDelayMs: 1000 });
    await send(client);
    expect(waits).toEqual([900, 2200]);
  });

  it("is off with jitter: false", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const { client } = setup([status(503), status(503), status(204)], {
      baseDelayMs: 1000,
      jitter: false,
    });
    await send(client);
    expect(waits).toEqual([1000, 2000]);
  });

  it("never pushes a wait past maxDelayMs", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    const { client } = setup([status(503), status(503), status(204)], {
      baseDelayMs: 1000,
      maxDelayMs: 1500,
    });
    await send(client);
    expect(waits).toEqual([1196, 1500]);
  });
});

describe("#17: one RetryOptions type", () => {
  it("the per-request type is the client type, exported once as RetryOptions", () => {
    expectTypeOf<core.RetryOptions>().toEqualTypeOf<RetryOptions>();
    // @ts-expect-error MiddlewareRetryOptions was a second name for RetryOptions; removed before 2.0.0
    expectTypeOf<core.MiddlewareRetryOptions>().toBeUnknown();
  });

  it("retryableStatusCodes works at client level", async () => {
    const { client, calls } = setup([status(500), status(204)], {
      retryableStatusCodes: [500],
      baseDelayMs: 1,
    });
    expect((await send(client)).status).toBe(204);
    expect(calls()).toBe(2);
  });

  it("shouldRetry works at client level and a per-request one replaces it", async () => {
    const { client, calls } = setup([status(500), status(204)], {
      shouldRetry: (code) => code === 500,
      baseDelayMs: 1,
    });
    expect((await send(client)).status).toBe(204);
    expect(calls()).toBe(2);

    const second = setup([status(500), status(204)], { shouldRetry: () => true, baseDelayMs: 1 });
    const res = await send(second.client, "GET", {
      middlewareOptions: new MiddlewareRequestOptions([
        { type: "retry", shouldRetry: () => false },
      ]),
    });
    expect(res.status).toBe(500);
    expect(second.calls()).toBe(1);
  });
});

describe("#17: network errors", () => {
  const failed = () => new TypeError("fetch failed");

  it("a fetch rejection becomes a DataverseNetworkError and is not retried by default", async () => {
    const { client, calls } = setup([failed(), status(204)], { baseDelayMs: 1 });
    const err = await send(client).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect((err as Error).name).toBe("ConnectionFailed");
    expect((err as Error).cause).toBeInstanceOf(TypeError);
    expect(calls()).toBe(1);
  });

  it("retryNetworkErrors retries idempotent requests with backoff", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const { client, calls } = setup([failed(), failed(), status(204)], {
      retryNetworkErrors: true,
      baseDelayMs: 10,
    });
    expect((await send(client)).status).toBe(204);
    expect(calls()).toBe(3);
    expect(waits).toEqual([10, 20]);
  });

  it("retryNetworkErrors gives up after maxRetries", async () => {
    const { client, calls } = setup([failed()], {
      retryNetworkErrors: true,
      maxRetries: 2,
      baseDelayMs: 1,
    });
    await expect(send(client)).rejects.toMatchObject({ name: "ConnectionFailed" });
    expect(calls()).toBe(3);
  });

  it("retryNetworkErrors does not replay a POST", async () => {
    const { client, calls } = setup([failed(), status(204)], {
      retryNetworkErrors: true,
      baseDelayMs: 1,
    });
    await expect(send(client, "POST")).rejects.toMatchObject({ name: "ConnectionFailed" });
    expect(calls()).toBe(1);
  });

  it("an abort is never retried and keeps its AbortError", async () => {
    const controller = new AbortController();
    controller.abort();
    const { client, calls } = setup([status(204)], { retryNetworkErrors: true, baseDelayMs: 1 });
    const err = await send(client, "GET", { signal: controller.signal }).catch((e: unknown) => e);
    expect((err as Error).name).toBe("AbortError");
    // Already aborted: it stops before taking a concurrency slot, so it never reaches fetch.
    expect(calls()).toBe(0);
  });

  it("a timeout is never retried", async () => {
    let calls = 0;
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      retry: { retryNetworkErrors: true, baseDelayMs: 1 },
      fetchProvider: {
        fetch: (_input, init) => {
          calls++;
          return new Promise((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => {
              reject(new DOMException("Aborted", "AbortError"));
            });
          });
        },
      },
    });
    await expect(send(client, "GET", { timeoutMs: 5 })).rejects.toMatchObject({
      name: "RequestTimeout",
    });
    expect(calls).toBe(1);
  });
});

describe("#17: one Retry-After parser", () => {
  it.each([
    ["120", 120_000],
    ["1.5", 1500],
    [" 3 ", 3000],
    ["0", 0],
    ["-5", undefined],
    ["12abc", undefined],
    ["", undefined],
    ["soon", undefined],
  ])("parseRetryAfter(%j) = %j", (value, expected) => {
    expect(parseRetryAfter(value)).toBe(expected);
  });

  it("an HTTP-date gives the time until then", () => {
    const ms = parseRetryAfter(new Date(Date.now() + 10_000).toUTCString());
    expect(ms).toBeGreaterThan(8_000);
    expect(ms).toBeLessThanOrEqual(10_000);
  });

  it("the error parser agrees with the retry middleware on decimals", async () => {
    const err = await parseODataError(status(429, { "retry-after": "1.5" }));
    expect(err).toBeInstanceOf(DataverseThrottleError);
    expect((err as DataverseThrottleError).retryAfterMs).toBe(parseRetryAfter("1.5"));
    expect((err as DataverseThrottleError).retryAfterMs).toBe(1500);
  });
});
