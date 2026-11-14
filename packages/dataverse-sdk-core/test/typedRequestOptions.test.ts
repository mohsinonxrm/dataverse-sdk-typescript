/**
 * #436: the per-request options added with the typed entries (circuit breaker and adaptive
 * throttling `bypass`), and the `clock` option of the circuit breaker and adaptive throttling.
 * The types themselves are tested in requestOptions.test-d.ts.
 */
import { describe, expect, it } from "vitest";
import {
  AdaptiveThrottlingMiddleware,
  CircuitBreakerMiddleware,
  DataverseCircuitOpenError,
  MiddlewareRequestOptions,
  type Clock,
} from "../src/index.js";
import type { MiddlewareContext, RequestInformation } from "../src/abstractions/http.js";

const request = (): RequestInformation => ({
  method: "GET",
  url: "https://contoso.crm.dynamics.com/api/data/v9.2/accounts",
  headers: {},
});

const ctx = (middlewareOptions?: MiddlewareRequestOptions): MiddlewareContext =>
  middlewareOptions ? { middlewareOptions } : {};

const bypass = (type: "circuitBreaker" | "adaptiveThrottling") =>
  new MiddlewareRequestOptions([{ type, bypass: true }]);

const answer =
  (status: number, headers: Record<string, string> = {}) =>
  () =>
    Promise.resolve(new Response(null, { status, headers }));

/** A clock the test moves; its sleeps resolve at once and move it forward. */
function manualClock(start = 1_000_000) {
  let now = start;
  const sleeps: number[] = [];
  const clock: Clock = {
    now: () => now,
    sleep: (ms) => {
      sleeps.push(ms);
      now += ms;
      return Promise.resolve();
    },
  };
  return {
    clock,
    sleeps,
    advance: (ms: number) => {
      now += ms;
    },
  };
}

describe("#436: circuit breaker bypass", () => {
  it("sends a bypassing request while the circuit is open", async () => {
    const breaker = new CircuitBreakerMiddleware({ failureThreshold: 1 });
    await breaker.execute(request(), ctx(), answer(503));
    expect(breaker.state).toBe("open");
    await expect(breaker.execute(request(), ctx(), answer(200))).rejects.toBeInstanceOf(
      DataverseCircuitOpenError
    );

    let sent = 0;
    const res = await breaker.execute(request(), ctx(bypass("circuitBreaker")), () => {
      sent++;
      return answer(200)();
    });
    expect(res.status).toBe(200);
    expect(sent).toBe(1);
    // Its success doesn't close the circuit.
    expect(breaker.state).toBe("open");
  });

  it("sends a bypassing request while the circuit is isolated", async () => {
    const breaker = new CircuitBreakerMiddleware();
    breaker.isolate();
    const res = await breaker.execute(request(), ctx(bypass("circuitBreaker")), answer(204));
    expect(res.status).toBe(204);
    expect(breaker.isolated).toBe(true);
  });

  it("leaves a bypassing request's failures out of the count", async () => {
    const breaker = new CircuitBreakerMiddleware({ failureThreshold: 2 });
    await breaker.execute(request(), ctx(bypass("circuitBreaker")), answer(503));
    await breaker.execute(request(), ctx(bypass("circuitBreaker")), answer(503));
    await expect(
      breaker.execute(request(), ctx(bypass("circuitBreaker")), () =>
        Promise.reject(new TypeError("fetch failed"))
      )
    ).rejects.toThrow("fetch failed");
    expect(breaker.consecutiveFailures).toBe(0);
    expect(breaker.state).toBe("closed");
  });

  it("applies the circuit as usual without bypass, or with bypass: false", async () => {
    const breaker = new CircuitBreakerMiddleware({ failureThreshold: 2 });
    const off = new MiddlewareRequestOptions([{ type: "circuitBreaker", bypass: false }]);
    await breaker.execute(request(), ctx(off), answer(503));
    await breaker.execute(request(), ctx(), answer(503));
    expect(breaker.state).toBe("open");
  });

  it("reads options set with set()", async () => {
    const breaker = new CircuitBreakerMiddleware({ failureThreshold: 1 });
    await breaker.execute(request(), ctx(), answer(503));
    const options = new MiddlewareRequestOptions();
    options.set("circuitBreaker", { bypass: true });
    const res = await breaker.execute(request(), ctx(options), answer(200));
    expect(res.status).toBe(200);
  });
});

describe("#436: circuit breaker clock", () => {
  it("reads the time from clock", async () => {
    const { clock, advance } = manualClock();
    const breaker = new CircuitBreakerMiddleware({
      failureThreshold: 1,
      breakDurationMs: 5000,
      clock,
    });
    await breaker.execute(request(), ctx(), answer(503));
    const error = await breaker.execute(request(), ctx(), answer(200)).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(DataverseCircuitOpenError);
    expect((error as DataverseCircuitOpenError).retryAfterMs).toBe(5000);
    advance(4999);
    expect(breaker.state).toBe("open");
    advance(1);
    expect(breaker.state).toBe("half-open");
  });

  it("now takes precedence over clock", async () => {
    const { clock, advance } = manualClock();
    let now = 0;
    const breaker = new CircuitBreakerMiddleware({
      failureThreshold: 1,
      breakDurationMs: 5000,
      clock,
      now: () => now,
    });
    await breaker.execute(request(), ctx(), answer(503));
    advance(10_000);
    expect(breaker.state).toBe("open");
    now = 5000;
    expect(breaker.state).toBe("half-open");
  });
});

describe("#436: adaptive throttling bypass", () => {
  it("doesn't hold a bypassing request during the pause after a 429, nor take its turn", async () => {
    const { clock, sleeps } = manualClock();
    const throttle = new AdaptiveThrottlingMiddleware({ clock });
    await throttle.execute(request(), ctx(), answer(429, { "retry-after": "5" }));
    const pausedUntil = throttle.status.pausedUntil;
    expect(pausedUntil).toBe(clock.now() + 5000);

    const res = await throttle.execute(request(), ctx(bypass("adaptiveThrottling")), answer(204));
    expect(res.status).toBe(204);
    expect(sleeps).toEqual([]);
    expect(throttle.status.pausedUntil).toBe(pausedUntil);

    // A request without bypass still waits out the pause.
    await throttle.execute(request(), ctx(), answer(204));
    expect(sleeps).toEqual([5000]);
  });

  it("still reads the bypassing request's response", async () => {
    const { clock } = manualClock();
    const throttle = new AdaptiveThrottlingMiddleware({ clock });
    await throttle.execute(
      request(),
      ctx(bypass("adaptiveThrottling")),
      answer(204, { "x-ms-ratelimit-burst-remaining-xrm-requests": "100" })
    );
    expect(throttle.status.requestsRemaining).toBe(100);
    await throttle.execute(
      request(),
      ctx(bypass("adaptiveThrottling")),
      answer(429, { "retry-after": "2" })
    );
    expect(throttle.status.pausedUntil).toBe(clock.now() + 2000);
  });
});

describe("#436: adaptive throttling clock", () => {
  it("times readings, spacing and pauses on the clock, and waits on it", async () => {
    const { clock, sleeps, advance } = manualClock();
    const throttle = new AdaptiveThrottlingMiddleware({ clock, requestBudget: 1000 });
    const low = { "x-ms-ratelimit-burst-remaining-xrm-requests": "100" }; // 10%: pressure 0.5
    await throttle.execute(request(), ctx(), answer(204, low));
    expect(throttle.status.pressure).toBe(0.5);
    expect(throttle.status.spacingMs).toBe(1000);

    // Requests take turns 1 s apart, waiting on the clock.
    await throttle.execute(request(), ctx(), answer(204, low));
    await throttle.execute(request(), ctx(), answer(204, low));
    expect(sleeps).toEqual([1000]);

    // Readings expire after 5 minutes of the clock's time.
    advance(300_001);
    expect(throttle.status.pressure).toBe(0);
    expect(throttle.status.requestsRemaining).toBeUndefined();
  });
});
