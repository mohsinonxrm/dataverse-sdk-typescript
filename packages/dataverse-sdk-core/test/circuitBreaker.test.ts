/**
 * #343: CircuitBreakerMiddleware fails fast after repeated 5xx/network failures, then probes.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import {
  buildDefaultMiddleware,
  CircuitBreakerMiddleware,
  DataverseCircuitOpenError,
  DataverseInvalidRequestError,
  DataverseNetworkError,
  type CircuitBreakerOptions,
  type CircuitStateChange,
  type RetryOptions,
} from "../src/index.js";
import type { FetchProvider, RequestInformation } from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
const request: RequestInformation = { method: "GET", url: `${BASE_URL}/accounts`, headers: {} };

type Step = number | "network" | { status: number; hold: Promise<void> };

/**
 * A client with the breaker appended. Each fetch plays the next step (the last repeats): a status,
 * a network failure, or a status sent once `hold` resolves.
 */
function setup(
  steps: Step[],
  options: CircuitBreakerOptions = {},
  retry: RetryOptions = { maxRetries: 0 }
) {
  let calls = 0;
  const changes: CircuitStateChange[] = [];
  const fetchProvider: FetchProvider = {
    fetch: async () => {
      const step = steps[Math.min(calls, steps.length - 1)] ?? 200;
      calls++;
      if (step === "network") throw new TypeError("fetch failed");
      if (typeof step === "object") await step.hold;
      const status = typeof step === "object" ? step.status : step;
      return new Response(status === 204 ? null : "{}", {
        status,
        headers: { "content-type": "application/json" },
      });
    },
  };
  const breaker = new CircuitBreakerMiddleware({
    onStateChange: (change) => changes.push(change),
    ...options,
  });
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    retry: { jitter: false, baseDelayMs: 1, ...retry },
    middleware: { append: [breaker] },
  });
  const get = () =>
    client
      .api("accounts")
      .get()
      .then(
        () => "ok",
        (e: unknown) => e
      );
  return { client, breaker, changes, get, calls: () => calls };
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
});

afterEach(() => {
  vi.useRealTimers();
});

describe("#343: CircuitBreakerMiddleware", () => {
  it("is not part of the default pipeline", () => {
    const names = buildDefaultMiddleware({ baseUrl: BASE_URL }).map((m) => m.name);
    expect(names).not.toContain("CircuitBreakerMiddleware");
  });

  it("opens after failureThreshold 5xx in a row, then fails fast without sending", async () => {
    const { breaker, changes, get, calls } = setup([503], { failureThreshold: 3 });
    for (let i = 0; i < 3; i++) expect(await get()).toMatchObject({ status: 503 });
    expect(breaker.state).toBe("open");
    expect(breaker.consecutiveFailures).toBe(3);
    expect(changes).toEqual([{ from: "closed", to: "open", consecutiveFailures: 3 }]);

    vi.advanceTimersByTime(10_000);
    const err = await get();
    expect(err).toBeInstanceOf(DataverseCircuitOpenError);
    expect((err as DataverseCircuitOpenError).retryAfterMs).toBe(20_000);
    expect((err as DataverseCircuitOpenError).correlationId).toEqual(expect.any(String));
    expect(calls()).toBe(3);
  });

  it("uses 5 failures and 30 s by default", async () => {
    const { breaker, get } = setup([500]);
    for (let i = 0; i < 4; i++) await get();
    expect(breaker.state).toBe("closed");
    await get();
    expect(breaker.state).toBe("open");
    expect(await get()).toMatchObject({ retryAfterMs: 30_000 });
  });

  it("a success resets the count", async () => {
    const { breaker, get } = setup([503, 503, 200, 503, 503], { failureThreshold: 3 });
    for (let i = 0; i < 5; i++) await get();
    expect(breaker.state).toBe("closed");
    expect(breaker.consecutiveFailures).toBe(2);
  });

  it("doesn't count 429 or 4xx: the service answered", async () => {
    const { breaker, get } = setup([503, 503, 429, 503, 503, 404], { failureThreshold: 3 });
    for (let i = 0; i < 6; i++) await get();
    expect(breaker.state).toBe("closed");
    expect(breaker.consecutiveFailures).toBe(0);
  });

  it("counts network failures and timed-out attempts, but not a request the caller aborted", async () => {
    const { breaker, get } = setup(["network"], { failureThreshold: 3 });
    expect(await get()).toBeInstanceOf(DataverseNetworkError);
    expect(breaker.consecutiveFailures).toBe(1);

    const controller = new AbortController();
    controller.abort();
    const aborted = breaker.execute({ ...request, signal: controller.signal }, {}, () =>
      Promise.reject(new DOMException("Aborted", "AbortError"))
    );
    await expect(aborted).rejects.toThrow("Aborted");
    expect(breaker.consecutiveFailures).toBe(1);

    const timedOut = breaker.execute(request, {}, () =>
      Promise.reject(DataverseNetworkError.timeout(100))
    );
    await expect(timedOut).rejects.toMatchObject({ name: "RequestTimeout" });
    expect(breaker.consecutiveFailures).toBe(2);
    await get();
    expect(breaker.state).toBe("open");
  });

  it("after breakDurationMs lets one probe through; its success closes the circuit", async () => {
    let release: () => void = () => undefined;
    const hold = new Promise<void>((resolve) => {
      release = resolve;
    });
    const { breaker, changes, get, calls } = setup([503, 503, { status: 200, hold }, 200], {
      failureThreshold: 2,
      breakDurationMs: 1000,
    });
    await get();
    await get();
    vi.advanceTimersByTime(1000);
    expect(breaker.state).toBe("half-open");

    const probe = get();
    await vi.waitFor(() => {
      expect(calls()).toBe(3);
    });
    // While the probe is in flight, others fail fast with no retryAfterMs.
    const other = await get();
    expect(other).toBeInstanceOf(DataverseCircuitOpenError);
    expect((other as DataverseCircuitOpenError).retryAfterMs).toBeUndefined();

    release();
    expect(await probe).toBe("ok");
    expect(breaker.state).toBe("closed");
    expect(await get()).toBe("ok");
    expect(changes.map((c) => c.to)).toEqual(["open", "half-open", "closed"]);
  });

  it("a failed probe opens the circuit for another breakDurationMs", async () => {
    const { breaker, changes, get, calls } = setup([503], {
      failureThreshold: 2,
      breakDurationMs: 1000,
    });
    await get();
    await get();
    vi.advanceTimersByTime(1500);
    expect(await get()).toMatchObject({ status: 503 });
    expect(calls()).toBe(3);
    expect(breaker.state).toBe("open");
    expect(await get()).toMatchObject({ retryAfterMs: 1000 });
    expect(changes.map((c) => c.to)).toEqual(["open", "half-open", "open"]);
  });

  it("an aborted probe leaves it half-open, so the next request probes", async () => {
    const breaker = new CircuitBreakerMiddleware({ failureThreshold: 1, breakDurationMs: 1000 });
    await breaker.execute(request, {}, () => Promise.resolve(new Response(null, { status: 503 })));
    expect(breaker.state).toBe("open");
    vi.advanceTimersByTime(1000);

    const controller = new AbortController();
    const probe = breaker.execute({ ...request, signal: controller.signal }, {}, () => {
      controller.abort();
      return Promise.reject(new DOMException("Aborted", "AbortError"));
    });
    await expect(probe).rejects.toThrow("Aborted");
    expect(breaker.state).toBe("half-open");

    await breaker.execute(request, {}, () => Promise.resolve(new Response(null, { status: 204 })));
    expect(breaker.state).toBe("closed");
  });

  it("inside the retry middleware, retries stop as soon as the circuit opens", async () => {
    const { get, calls } = setup([503], { failureThreshold: 2 }, { maxRetries: 5 });
    const err = await get();
    expect(err).toBeInstanceOf(DataverseCircuitOpenError);
    expect(calls()).toBe(2);
  });

  it("takes a custom isFailure", async () => {
    const { breaker, get } = setup([429], {
      failureThreshold: 2,
      isFailure: (status) => status === 429,
    });
    await get();
    await get();
    expect(breaker.state).toBe("open");
  });

  it("reset() closes the circuit", async () => {
    const { breaker, changes, get } = setup([503, 503, 200], { failureThreshold: 2 });
    await get();
    await get();
    breaker.reset();
    expect(breaker.state).toBe("closed");
    expect(breaker.consecutiveFailures).toBe(0);
    expect(await get()).toBe("ok");
    expect(changes.map((c) => c.to)).toEqual(["open", "closed"]);
  });

  it("ignores an error thrown by onStateChange", async () => {
    const { breaker, get } = setup([503], {
      failureThreshold: 1,
      onStateChange: () => {
        throw new Error("ignored");
      },
    });
    expect(await get()).toMatchObject({ status: 503 });
    expect(breaker.state).toBe("open");
  });

  it.each<[CircuitBreakerOptions]>([
    [{ failureThreshold: 0 }],
    [{ failureThreshold: 1.5 }],
    [{ breakDurationMs: -1 }],
    [{ breakDurationMs: Number.NaN }],
  ])("refuses %j", (options) => {
    expect(() => new CircuitBreakerMiddleware(options)).toThrow(DataverseInvalidRequestError);
  });
});
