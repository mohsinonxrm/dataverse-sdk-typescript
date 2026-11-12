/**
 * #511: the client's `clock` (`DataverseClientOptions.clock`) times the `timeoutMs` deadline and
 * the retry middleware's waits and deadline checks, and is the default clock of the circuit
 * breaker, adaptive throttling and chaos middleware. With `fakeClock()`, retries and timeouts are
 * tested without waiting.
 */
import { describe, expect, it } from "vitest";
import {
  AdaptiveThrottlingMiddleware,
  CircuitBreakerMiddleware,
  DataverseCircuitOpenError,
  DataverseNetworkError,
  DataverseThrottleError,
  waitForAsyncOperation,
} from "@mohsinonxrm/dataverse-sdk-core";
import {
  createTestClient,
  fakeClock,
  gatewayError,
  jsonResponse,
  slowResponse,
  throttled,
} from "../src/index.js";

const JOB = "4c1a7c3e-1f2b-4d5e-8a9b-0c1d2e3f4a5b";

/** Whether `promise` has settled yet. */
function tracked<T>(promise: Promise<T>) {
  let settled = false;
  const result = promise.then(
    (value) => {
      settled = true;
      return value;
    },
    (err: unknown) => {
      settled = true;
      throw err;
    }
  );
  // Keep an early rejection from being reported before the test awaits it.
  result.catch(() => undefined);
  return { result, settled: () => settled };
}

describe("#511: the client's clock", () => {
  it("is the client's clock property, systemClock by default", () => {
    const clock = fakeClock();
    expect(createTestClient({ clock }).client.clock).toBe(clock);
    expect(createTestClient().client.clock.now()).toBeGreaterThan(0);
  });

  it("a 429 with Retry-After 5 is retried once the clock passes 5 s, with no real waiting", async () => {
    const clock = fakeClock(1_000_000);
    const { client, fake } = createTestClient({ clock, retry: { maxRetries: 1 } });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u" }));
    fake.on("GET", "/WhoAmI", () => throttled(5), 1);
    const started = Date.now();
    const pending = tracked(client.api("WhoAmI").get());
    await clock.advance(4999);
    expect(fake.requests).toHaveLength(1);
    expect(pending.settled()).toBe(false);
    await clock.advance(1);
    await expect(pending.result).resolves.toEqual({ UserId: "u" });
    expect(fake.requests).toHaveLength(2);
    expect(fake.last().headers["retry-attempt"]).toBe("1");
    expect(Date.now() - started).toBeLessThan(2000);
  });

  it("a computed backoff is waited on the clock too", async () => {
    const clock = fakeClock();
    const { client, fake } = createTestClient({
      clock,
      retry: { maxRetries: 1, baseDelayMs: 3000, jitter: false },
    });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u" }));
    fake.on("GET", "/WhoAmI", () => gatewayError(503), 1);
    const pending = tracked(client.api("WhoAmI").get());
    await clock.advance(2999);
    expect(fake.requests).toHaveLength(1);
    await clock.advance(1);
    await expect(pending.result).resolves.toEqual({ UserId: "u" });
  });

  it("timeoutMs is measured on the same clock", async () => {
    const clock = fakeClock();
    const { client, fake } = createTestClient({ clock });
    fake.on("GET", "/WhoAmI", () => new Promise<Response>(() => undefined));
    const pending = tracked(client.api("WhoAmI").get({ timeoutMs: 10_000 }));
    await clock.advance(9999);
    expect(pending.settled()).toBe(false);
    await clock.advance(1);
    const err: unknown = await pending.result.catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect(err).toMatchObject({ name: "RequestTimeout" });
  });

  it("the retry's deadline check reads the clock: a Retry-After past the time left fails at once", async () => {
    const clock = fakeClock(1_000_000);
    const { client, fake } = createTestClient({ clock, retry: { maxRetries: 3 } });
    // The first attempt takes 8 s of the 10 s; a 5 s Retry-After no longer fits.
    fake.on(
      "GET",
      "/WhoAmI",
      slowResponse(() => throttled(5), 8000, clock)
    );
    const pending = tracked(client.api("WhoAmI").get({ timeoutMs: 10_000 }));
    await clock.advance(8000);
    const err: unknown = await pending.result.catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseThrottleError);
    expect((err as DataverseThrottleError).retryAfterMs).toBe(5000);
    expect(fake.requests).toHaveLength(1);
  });

  it("waitForAsyncOperation waits between reads and times out on the client's clock", async () => {
    const clock = fakeClock();
    const { client, fake } = createTestClient({ clock });
    fake.on("GET", `/asyncoperations(${JOB})`, () =>
      jsonResponse({ asyncoperationid: JOB, statecode: 2, statuscode: 20 })
    );
    const pending = tracked(
      waitForAsyncOperation(client, JOB, { intervalMs: 1000, backoff: 1, timeoutMs: 3500 })
    );
    await clock.advance(1000);
    expect(fake.requests).toHaveLength(2);
    await clock.advance(2000);
    expect(fake.requests).toHaveLength(4);
    expect(pending.settled()).toBe(false);
    await clock.advance(500);
    await expect(pending.result).rejects.toMatchObject({ reason: "timeout" });
  });
});

describe("#511: middleware use the client's clock when their own isn't set", () => {
  it("the circuit breaker's break duration", async () => {
    const clock = fakeClock(1_000_000);
    const breaker = new CircuitBreakerMiddleware({ failureThreshold: 1, breakDurationMs: 1000 });
    const { client, fake } = createTestClient({ clock, middleware: { append: [breaker] } });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u" }));
    fake.on("GET", "/WhoAmI", () => gatewayError(503), 1);
    await expect(client.api("WhoAmI").get()).rejects.toMatchObject({ status: 503 });
    const open: unknown = await client
      .api("WhoAmI")
      .get()
      .catch((e: unknown) => e);
    expect(open).toBeInstanceOf(DataverseCircuitOpenError);
    expect((open as DataverseCircuitOpenError).retryAfterMs).toBe(1000);
    await clock.advance(1000);
    expect(breaker.state).toBe("half-open");
    await expect(client.api("WhoAmI").get()).resolves.toEqual({ UserId: "u" });
    expect(breaker.state).toBe("closed");
  });

  it("the circuit breaker's own clock wins", async () => {
    const own = fakeClock(1_000_000);
    const clientClock = fakeClock(5_000_000);
    const breaker = new CircuitBreakerMiddleware({
      failureThreshold: 1,
      breakDurationMs: 1000,
      clock: own,
    });
    const { client, fake } = createTestClient({
      clock: clientClock,
      middleware: { append: [breaker] },
    });
    fake.on("GET", "/WhoAmI", () => gatewayError(503), 1);
    await expect(client.api("WhoAmI").get()).rejects.toMatchObject({ status: 503 });
    await clientClock.advance(5000);
    expect(breaker.state).toBe("open");
    await own.advance(1000);
    expect(breaker.state).toBe("half-open");
  });

  it("adaptive throttling's pause after a 429", async () => {
    const clock = fakeClock(1_000_000);
    const throttling = new AdaptiveThrottlingMiddleware();
    const { client, fake } = createTestClient({ clock, adaptiveThrottling: throttling });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u" }));
    fake.on("GET", "/WhoAmI", () => throttled(2), 1);
    await expect(client.api("WhoAmI").get()).rejects.toBeInstanceOf(DataverseThrottleError);
    expect(throttling.status.pausedUntil).toBe(1_002_000);
    const held = tracked(client.api("WhoAmI").get());
    await clock.advance(1999);
    expect(fake.requests).toHaveLength(1);
    await clock.advance(1);
    await expect(held.result).resolves.toEqual({ UserId: "u" });
    expect(fake.requests).toHaveLength(2);
  });

  it("adaptive throttling's own clock wins", async () => {
    const own = fakeClock(1_000_000);
    const clientClock = fakeClock(9_000_000);
    const throttling = new AdaptiveThrottlingMiddleware({ clock: own });
    const { client, fake } = createTestClient({
      clock: clientClock,
      adaptiveThrottling: throttling,
    });
    fake.on("GET", "/WhoAmI", () => throttled(2), 1);
    await expect(client.api("WhoAmI").get()).rejects.toBeInstanceOf(DataverseThrottleError);
    expect(throttling.status.pausedUntil).toBe(1_002_000);
  });
});
