/**
 * #476: retry `backoff`, `jitter: "decorrelated"`, `retryAfterJitterMs`, the third argument of
 * `shouldRetry`, and `retryAttemptTimeouts`. Defaults are unchanged.
 */
import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { DataverseThrottleError } from "../src/errors/DataverseThrottleError.js";
import { DataverseNetworkError } from "../src/errors/NamedErrors.js";
import type { FetchProvider, HttpMethod } from "../src/abstractions/http.js";
import type { RetryInfo, RetryOptions, ShouldRetryInfo } from "../src/abstractions/options.js";

const BASE_URL = "https://contoso.crm.dynamics.com";

/** A status, a network failure, or an attempt that never answers (until its signal aborts). */
type Step = number | "network" | "hang";

function setup(steps: Step[], retry: RetryOptions = {}) {
  let calls = 0;
  const retries: RetryInfo[] = [];
  const fetchProvider: FetchProvider = {
    fetch: (_input, init) => {
      const step = steps[Math.min(calls, steps.length - 1)] ?? 204;
      calls++;
      if (step === "network") return Promise.reject(new TypeError("fetch failed"));
      if (step === "hang") {
        return new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });
        });
      }
      const headers: Record<string, string> = { "content-type": "application/json" };
      return Promise.resolve(
        new Response(step === 204 ? null : JSON.stringify({ error: { message: "x" } }), {
          status: step,
          headers,
        })
      );
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    concurrency: { adaptiveFromDopHint: false },
    retry: { onRetry: (info) => retries.push(info), ...retry },
  });
  return { client, retries, calls: () => calls, delays: () => retries.map((r) => r.delayMs) };
}

/** Like `setup`, but every status response carries `Retry-After: <seconds>`. */
function throttled(retryAfterSeconds: number, then: number, retry: RetryOptions = {}) {
  let calls = 0;
  const retries: RetryInfo[] = [];
  const fetchProvider: FetchProvider = {
    fetch: () => {
      calls++;
      return Promise.resolve(
        calls === 1
          ? new Response("{}", {
              status: 429,
              headers: {
                "content-type": "application/json",
                "retry-after": String(retryAfterSeconds),
              },
            })
          : new Response(null, { status: then })
      );
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    concurrency: { adaptiveFromDopHint: false },
    retry: { onRetry: (info) => retries.push(info), maxDelayMs: 30_000, ...retry },
  });
  return { client, retries, calls: () => calls };
}

function send(client: DataverseClient, method: HttpMethod = "GET", extra: object = {}) {
  return client.send({
    method,
    url: "accounts",
    headers: {},
    body: method === "POST" || method === "PATCH" ? { name: "x" } : undefined,
    ...extra,
  });
}

/** Run `p` to the end, moving fake time on as its waits need. */
async function settle(p: Promise<unknown>): Promise<unknown> {
  const result = p.then(
    (v) => v,
    (e: unknown) => e
  );
  await vi.runAllTimersAsync();
  return result;
}

/** Polly's DecorrelatedJitterBackoffV2, written out separately to check the middleware against. */
function pollyDecorrelated(randoms: number[], baseDelayMs: number): number[] {
  let prev = 0;
  return randoms.map((r, attempt) => {
    const t = attempt + r;
    const next = 2 ** t * Math.tanh(Math.sqrt(4 * t));
    const delay = Math.floor((next - prev) * (1 / 1.4) * baseDelayMs);
    prev = next;
    return delay;
  });
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("#476: backoff", () => {
  const base = { maxRetries: 5, baseDelayMs: 100, maxDelayMs: 10_000, jitter: false } as const;

  it.each<[RetryOptions["backoff"], number[]]>([
    [undefined, [100, 200, 400, 800, 1600]],
    ["exponential", [100, 200, 400, 800, 1600]],
    ["linear", [100, 200, 300, 400, 500]],
    ["constant", [100, 100, 100, 100, 100]],
  ])("%s waits %j", async (backoff, expected) => {
    const t = setup([503], { ...base, backoff });
    expect(await settle(send(t.client))).toMatchObject({ status: 503 });
    expect(t.delays()).toEqual(expected);
    expect(t.calls()).toBe(6);
  });

  it.each<[RetryOptions["backoff"], number[]]>([
    ["exponential", [100, 200, 250, 250, 250]],
    ["linear", [100, 200, 250, 250, 250]],
    ["constant", [100, 100, 100, 100, 100]],
  ])("%s is capped at maxDelayMs", async (backoff, expected) => {
    const t = setup([503], { ...base, maxDelayMs: 250, backoff });
    await settle(send(t.client));
    expect(t.delays()).toEqual(expected);
  });

  it("jitter: true spreads each backoff by ±20%", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const low = setup([503], { ...base, maxRetries: 3, jitter: true, backoff: "linear" });
    await settle(send(low.client));
    expect(low.delays()).toEqual([80, 160, 240]);

    vi.spyOn(Math, "random").mockReturnValue(0.999_999);
    const high = setup([503], { ...base, maxRetries: 3, jitter: true, backoff: "constant" });
    await settle(send(high.client));
    expect(high.delays()).toEqual([119, 119, 119]);
  });

  it("the default is still exponential with ±20% jitter", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const t = setup([503], { maxRetries: 3, baseDelayMs: 1000 });
    await settle(send(t.client));
    expect(t.delays()).toEqual([800, 1600, 3200]);
  });
});

describe('#476: jitter: "decorrelated"', () => {
  it("follows Polly's DecorrelatedJitterBackoffV2", async () => {
    const randoms = [0.5, 0.1, 0.9, 0.3, 0.7];
    let i = 0;
    vi.spyOn(Math, "random").mockImplementation(() => randoms[i++ % randoms.length] ?? 0);
    const t = setup([503], {
      maxRetries: 5,
      baseDelayMs: 1000,
      maxDelayMs: 1_000_000,
      jitter: "decorrelated",
    });
    await settle(send(t.client));
    const expected = pollyDecorrelated(randoms, 1000);
    expect(t.delays()).toEqual(expected);
    // Medians land near baseDelayMs * 2^n: with r = 0.5 the first delay is about 1 s.
    expect(expected[0]).toBeGreaterThan(850);
    expect(expected[0]).toBeLessThan(1150);
  });

  it("stays between 0 and baseDelayMs * 2^(n+1) / 1.4, and never above maxDelayMs", async () => {
    for (let run = 0; run < 50; run++) {
      const t = setup([503], {
        maxRetries: 6,
        baseDelayMs: 100,
        maxDelayMs: 2_500,
        jitter: "decorrelated",
      });
      await settle(send(t.client));
      t.delays().forEach((delay, n) => {
        expect(Number.isInteger(delay)).toBe(true);
        expect(delay).toBeGreaterThanOrEqual(0);
        expect(delay).toBeLessThanOrEqual(Math.min(2_500, (100 * 2 ** (n + 1)) / 1.4));
      });
    }
  });

  it("is capped at maxDelayMs", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    const t = setup([503], {
      maxRetries: 6,
      baseDelayMs: 1000,
      maxDelayMs: 5000,
      jitter: "decorrelated",
    });
    await settle(send(t.client));
    const uncapped = pollyDecorrelated([0.99, 0.99, 0.99, 0.99, 0.99, 0.99], 1000);
    expect(t.delays()).toEqual(uncapped.map((d) => Math.min(5000, d)));
    expect(t.delays().slice(-3)).toEqual([5000, 5000, 5000]);
  });

  it("is 0 with baseDelayMs: 0", async () => {
    const t = setup([503], { maxRetries: 2, baseDelayMs: 0, jitter: "decorrelated" });
    await settle(send(t.client));
    expect(t.delays()).toEqual([0, 0]);
  });

  it("acts as jitter: true with linear or constant backoff", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const t = setup([503], {
      maxRetries: 3,
      baseDelayMs: 100,
      jitter: "decorrelated",
      backoff: "linear",
    });
    await settle(send(t.client));
    expect(t.delays()).toEqual([80, 160, 240]);
  });

  it("starts again for each request", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const t = setup([503, 503, 204], {
      maxRetries: 2,
      baseDelayMs: 1000,
      maxDelayMs: 1_000_000,
      jitter: "decorrelated",
    });
    await settle(send(t.client));
    const first = t.delays();
    t.retries.length = 0;
    const again = setup([503, 503, 204], {
      maxRetries: 2,
      baseDelayMs: 1000,
      maxDelayMs: 1_000_000,
      jitter: "decorrelated",
    });
    await settle(send(again.client));
    expect(again.delays()).toEqual(first);
    expect(first).toEqual(pollyDecorrelated([0.5, 0.5], 1000));
  });
});

describe("#476: retryAfterJitterMs", () => {
  it("adds 0..N ms to a Retry-After wait", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const t = throttled(2, 204, { retryAfterJitterMs: 1000 });
    expect(await settle(send(t.client))).toMatchObject({ status: 204 });
    expect(t.retries[0]).toMatchObject({ delayMs: 2500, retryAfterMs: 2000 });
  });

  it.each([
    [0, 2000],
    [0.999_99, 3000],
  ])("with random() = %d the wait is %d ms", async (random, delay) => {
    vi.spyOn(Math, "random").mockReturnValue(random);
    const t = throttled(2, 204, { retryAfterJitterMs: 1000 });
    await settle(send(t.client));
    expect(t.retries[0]?.delayMs).toBe(delay);
  });

  it("stays within 0..N over many requests", async () => {
    for (let run = 0; run < 50; run++) {
      const t = throttled(1, 204, { retryAfterJitterMs: 300 });
      await settle(send(t.client));
      const delay = t.retries[0]?.delayMs ?? -1;
      expect(delay).toBeGreaterThanOrEqual(1000);
      expect(delay).toBeLessThanOrEqual(1300);
    }
  });

  it("defaults to 0: the wait is Retry-After exactly, with no random number drawn", async () => {
    const random = vi.spyOn(Math, "random");
    const t = throttled(2, 204);
    await settle(send(t.client));
    expect(t.retries[0]).toMatchObject({ delayMs: 2000, retryAfterMs: 2000 });
    expect(random).not.toHaveBeenCalled();
  });

  it("is not added to the computed backoff", async () => {
    const t = setup([503], {
      maxRetries: 2,
      baseDelayMs: 100,
      jitter: false,
      retryAfterJitterMs: 5000,
    });
    await settle(send(t.client));
    expect(t.delays()).toEqual([100, 200]);
  });

  it("maxRetryAfterMs is compared with Retry-After itself", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999_99);
    const t = throttled(2, 204, { maxRetryAfterMs: 2000, retryAfterJitterMs: 1000 });
    expect(await settle(send(t.client))).toMatchObject({ status: 204 });
    expect(t.retries[0]?.delayMs).toBe(3000);
  });

  it("shrinks so the wait still ends before the deadline (#471)", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999_99);
    const t = throttled(9, 204, { retryAfterJitterMs: 5000 });
    expect(await settle(send(t.client, "GET", { timeoutMs: 10_000 }))).toMatchObject({
      status: 204,
    });
    const delay = t.retries[0]?.delayMs ?? 0;
    expect(delay).toBeGreaterThanOrEqual(9000);
    expect(delay).toBeLessThan(10_000);
    expect(t.calls()).toBe(2);
  });

  it("a Retry-After past the deadline still fails at once (#471)", async () => {
    const t = throttled(11, 204, { retryAfterJitterMs: 5000 });
    const err = await settle(t.client.api("accounts").get({ timeoutMs: 10_000 }));
    expect(err).toBeInstanceOf(DataverseThrottleError);
    expect(t.calls()).toBe(1);
    expect(t.retries).toEqual([]);
  });
});

describe("#476: shouldRetry(status, error, { request, response, attempt })", () => {
  it("gets the request, the response and the attempt", async () => {
    const seen: Array<[number, Error | undefined, ShouldRetryInfo]> = [];
    const t = setup([503, 502, 204], {
      baseDelayMs: 1,
      shouldRetry: (status, error, info) => {
        seen.push([status, error, info]);
        return status >= 500;
      },
    });
    expect(await settle(send(t.client))).toMatchObject({ status: 204 });
    expect(seen.map(([s, e, i]) => [s, e, i.attempt, i.response?.status])).toEqual([
      [503, undefined, 0, 503],
      [502, undefined, 1, 502],
      [204, undefined, 2, 204],
    ]);
    const request = seen[0]?.[2].request;
    expect(request).toMatchObject({ method: "GET" });
    expect(seen[0]?.[2].request.url).toContain("/accounts");
  });

  it("gets the error and no response after a network error", async () => {
    const seen: Array<[number, Error | undefined, ShouldRetryInfo]> = [];
    const t = setup(["network", 204], {
      baseDelayMs: 1,
      shouldRetry: (status, error, info) => {
        seen.push([status, error, info]);
        return status === 0;
      },
    });
    await settle(send(t.client));
    expect(seen).toHaveLength(2);
    expect(seen[0]?.[0]).toBe(0);
    expect(seen[0]?.[1]).toBeInstanceOf(DataverseNetworkError);
    expect(seen[0]?.[2]).toMatchObject({ attempt: 0 });
    expect(seen[0]?.[2].response).toBeUndefined();
  });

  it("the idempotency guard still applies after it: a POST answered 502 is not retried (#483)", async () => {
    const shouldRetry = vi.fn((_s: number, _e: Error | undefined, _i: ShouldRetryInfo) => true);
    const t = setup([502, 204], { baseDelayMs: 1, shouldRetry });
    expect(await settle(send(t.client, "POST"))).toMatchObject({ status: 502 });
    expect(shouldRetry).toHaveBeenCalledOnce();
    expect(shouldRetry.mock.calls[0]?.[2].request.method).toBe("POST");
    expect(t.calls()).toBe(1);
  });

  it("a predicate with one or two parameters still works", async () => {
    const one: RetryOptions["shouldRetry"] = (status) => status === 503;
    const two: RetryOptions["shouldRetry"] = (status, error?: Error) => !error && status === 503;
    expectTypeOf(one).not.toBeUndefined();
    for (const shouldRetry of [one, two]) {
      const t = setup([503, 204], { baseDelayMs: 1, shouldRetry });
      expect(await settle(send(t.client))).toMatchObject({ status: 204 });
      expect(t.calls()).toBe(2);
    }
  });
});

describe("#476: retryAttemptTimeouts", () => {
  const timeouts = { baseDelayMs: 100, jitter: false, retryAttemptTimeouts: true } as const;

  it("is off by default: a timed-out attempt fails the request", async () => {
    const t = setup(["hang", 204], { baseDelayMs: 100 });
    const err = await settle(send(t.client, "GET", { attemptTimeoutMs: 1000 }));
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect((err as Error).name).toBe("RequestTimeout");
    expect(t.calls()).toBe(1);
  });

  it.each<[HttpMethod, Record<string, string>]>([
    ["GET", {}],
    ["DELETE", {}],
    ["PUT", {}],
    ["PATCH", { "if-match": "*" }],
  ])("retries a %s whose attempt timed out", async (method, headers) => {
    const t = setup(["hang", 204], timeouts);
    const res = await settle(send(t.client, method, { attemptTimeoutMs: 1000, headers }));
    expect(res).toMatchObject({ status: 204 });
    expect(t.calls()).toBe(2);
    expect(t.retries[0]).toMatchObject({ status: 0, delayMs: 100 });
    expect(t.retries[0]?.error?.name).toBe("RequestTimeout");
  });

  it.each<[HttpMethod]>([["POST"], ["PATCH"]])(
    "never retries a %s (without If-Match) on its own",
    async (method) => {
      const t = setup(["hang", 204], timeouts);
      const err = await settle(send(t.client, method, { attemptTimeoutMs: 1000 }));
      expect((err as Error).name).toBe("RequestTimeout");
      expect(t.calls()).toBe(1);
    }
  );

  it("retries a POST with retryNonIdempotent: true, or one marked idempotent", async () => {
    const opted = setup(["hang", 204], { ...timeouts, retryNonIdempotent: true });
    expect(await settle(send(opted.client, "POST", { attemptTimeoutMs: 1000 }))).toMatchObject({
      status: 204,
    });
    expect(opted.calls()).toBe(2);

    const marked = setup(["hang", 204], timeouts);
    const res = await settle(
      send(marked.client, "POST", { attemptTimeoutMs: 1000, idempotent: true })
    );
    expect(res).toMatchObject({ status: 204 });
    expect(marked.calls()).toBe(2);
  });

  it("a shouldRetry that says no keeps it from retrying", async () => {
    const shouldRetry = vi.fn(() => false);
    const t = setup(["hang", 204], { ...timeouts, shouldRetry });
    const err = await settle(send(t.client, "GET", { attemptTimeoutMs: 1000 }));
    expect((err as Error).name).toBe("RequestTimeout");
    expect(shouldRetry).toHaveBeenCalledWith(
      0,
      expect.objectContaining({ name: "RequestTimeout" }),
      expect.objectContaining({ attempt: 0 })
    );
    expect(t.calls()).toBe(1);
  });

  it("never retries past the deadline", async () => {
    // The attempt times out at 1 s; a 1 s backoff would end at 2 s, after the 1.5 s deadline.
    const t = setup(["hang", 204], { ...timeouts, baseDelayMs: 1000 });
    const err = await settle(send(t.client, "GET", { attemptTimeoutMs: 1000, timeoutMs: 1500 }));
    expect((err as Error).name).toBe("RequestTimeout");
    expect(t.calls()).toBe(1);
    expect(t.retries).toEqual([]);
  });

  it("never retries a request whose own timeoutMs ran out", async () => {
    const t = setup(["hang", 204], timeouts);
    const err = await settle(send(t.client, "GET", { attemptTimeoutMs: 5000, timeoutMs: 1000 }));
    expect((err as Error).name).toBe("RequestTimeout");
    expect(t.calls()).toBe(1);
  });

  it("stops after maxRetries", async () => {
    const t = setup(["hang"], { ...timeouts, maxRetries: 2 });
    const err = await settle(send(t.client, "GET", { attemptTimeoutMs: 1000 }));
    expect((err as Error).name).toBe("RequestTimeout");
    expect(t.calls()).toBe(3);
  });
});
