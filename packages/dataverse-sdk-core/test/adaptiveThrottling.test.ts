/**
 * #309: AdaptiveThrottlingMiddleware spaces requests out as Dataverse's service-protection budgets
 * (x-ms-ratelimit-*-remaining-xrm-requests) run low, and pauses everything after a 429.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Record each wait instead of sleeping.
const waits: number[] = [];
vi.mock("../src/utils/sleep.js", () => ({
  sleep: (ms: number) => {
    waits.push(ms);
    return Promise.resolve();
  },
}));

import { DataverseClient } from "../src/client/DataverseClient.js";
import {
  AdaptiveThrottlingMiddleware,
  buildDefaultMiddleware,
  DataverseInvalidRequestError,
  DataverseThrottleError,
  type AdaptiveThrottlingDelay,
  type AdaptiveThrottlingOptions,
} from "../src/index.js";
import type { FetchProvider } from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
const REQUESTS = "x-ms-ratelimit-burst-remaining-xrm-requests";
const TIME = "x-ms-ratelimit-time-remaining-xrm-requests";

/** Headers of a live org's response (see dataverse-sdk-testing's dataverseHeaders()). */
const live = (requests: string, time = "1,200.00") => ({ [REQUESTS]: requests, [TIME]: time });

/** A client with the middleware appended; each fetch answers with the next headers (last repeats). */
function setup(
  responses: Array<{ status?: number; headers?: Record<string, string> }>,
  options: AdaptiveThrottlingOptions = {}
) {
  let calls = 0;
  const delays: AdaptiveThrottlingDelay[] = [];
  const fetchProvider: FetchProvider = {
    fetch: () => {
      const r = responses[Math.min(calls, responses.length - 1)] ?? {};
      calls++;
      return Promise.resolve(new Response(null, { status: r.status ?? 204, headers: r.headers }));
    },
  };
  const throttle = new AdaptiveThrottlingMiddleware({
    onDelay: (d) => delays.push(d),
    ...options,
  });
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    retry: { maxRetries: 0 },
    middleware: { append: [throttle] },
  });
  const send = () => client.api("accounts").response();
  return { client, throttle, delays, send, calls: () => calls };
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
});

afterEach(() => {
  vi.useRealTimers();
  waits.length = 0;
});

describe("#309: AdaptiveThrottlingMiddleware", () => {
  it("is not part of the default pipeline", () => {
    const names = buildDefaultMiddleware({ baseUrl: BASE_URL }).map((m) => m.name);
    expect(names).not.toContain("AdaptiveThrottlingMiddleware");
  });

  it("does nothing without the headers, or while the budgets are high", async () => {
    const without = setup([{}]);
    for (let i = 0; i < 3; i++) await without.send();
    expect(without.throttle.status).toEqual({ pressure: 0, spacingMs: 0 });

    const high = setup([{ headers: live("7999") }, { headers: live("7000", "1,100.00") }]);
    for (let i = 0; i < 5; i++) await high.send();
    expect(waits).toEqual([]);
    expect(high.throttle.status).toMatchObject({
      requestsRemaining: 7000,
      requestBudget: 7999,
      timeRemaining: 1100,
      timeBudget: 1200,
      pressure: 0,
    });
  });

  it("spaces requests out as the request budget runs low", async () => {
    // Budget 8000 (the highest seen); 800 left is 10%, half way below the 20% threshold.
    const { throttle, delays, send } = setup([{ headers: live("8000") }, { headers: live("800") }]);
    await send(); // learns the budget
    await send(); // learns 800 left
    expect(throttle.status).toMatchObject({ pressure: 0.5, spacingMs: 1000 });
    await send(); // starts now, the next one 1 s later
    await send();
    await send();
    expect(waits).toEqual([1000, 2000]);
    expect(delays.map((d) => [d.delayMs, d.reason, d.pressure])).toEqual([
      [1000, "pressure", 0.5],
      [2000, "pressure", 0.5],
    ]);
  });

  it("reads the time header's thousands separators and decimals, and uses the lower budget", async () => {
    const { throttle, send } = setup([
      { headers: live("8000", "1,200.00") },
      { headers: live("7999", "60.00") },
    ]);
    await send();
    await send();
    // 60 of 1200 is 5%: pressure (0.2 - 0.05) / 0.2.
    expect(throttle.status).toMatchObject({ timeRemaining: 60, timeBudget: 1200 });
    expect(throttle.status.pressure).toBeCloseTo(0.75);
    expect(throttle.status.spacingMs).toBeCloseTo(1500);
  });

  it("reaches maxSpacingMs when a budget is used up", async () => {
    const { throttle, send } = setup([{ headers: live("100") }, { headers: live("0") }], {
      maxSpacingMs: 500,
    });
    await send();
    await send();
    expect(throttle.status).toMatchObject({ pressure: 1, spacingMs: 500 });
  });

  it("measures against requestBudget / timeBudget when set", async () => {
    // Without requestBudget, 1000 would be the full budget; against 8000 it is 12.5%.
    const { throttle, send } = setup([{ headers: live("1000") }], { requestBudget: 8000 });
    await send();
    expect(throttle.status).toMatchObject({ requestBudget: 8000 });
    expect(throttle.status.pressure).toBeCloseTo(0.375);
  });

  it("ignores readings older than the 5-minute window", async () => {
    const { throttle, send } = setup([{ headers: live("8000") }, { headers: live("10") }]);
    await send();
    await send();
    expect(throttle.status.pressure).toBeGreaterThan(0.9);
    vi.advanceTimersByTime(300_001);
    expect(throttle.status).toEqual({ pressure: 0, spacingMs: 0 });
  });

  it("ignores header values that aren't numbers", async () => {
    const { throttle, send } = setup([{ headers: live("n/a", "") }]);
    await send();
    expect(throttle.status).toEqual({ pressure: 0, spacingMs: 0 });
  });

  it("after a 429 with Retry-After, holds every new request until it has passed", async () => {
    const { throttle, delays, client, send } = setup([
      { status: 429, headers: { "retry-after": "5" } },
      {},
    ]);
    await expect(client.api("accounts").get()).rejects.toBeInstanceOf(DataverseThrottleError);
    expect(throttle.status.pausedUntil).toBe(Date.now() + 5000);
    await send();
    expect(waits).toEqual([5000]);
    expect(delays[0]).toMatchObject({ delayMs: 5000, reason: "retry-after" });
    vi.advanceTimersByTime(5000);
    await send();
    expect(waits).toEqual([5000]);
  });

  it("cuts the pause to maxPauseMs, and skips it with pauseOnRetryAfter: false", async () => {
    const capped = setup([{ status: 429, headers: { "retry-after": "600" } }, {}], {
      maxPauseMs: 10_000,
    });
    await capped.send();
    await capped.send();
    expect(waits).toEqual([10_000]);

    waits.length = 0;
    const off = setup([{ status: 429, headers: { "retry-after": "5" } }, {}], {
      pauseOnRetryAfter: false,
    });
    await off.send();
    await off.send();
    expect(waits).toEqual([]);
  });

  it("ignores an error thrown by onDelay", async () => {
    const { send, calls } = setup([{ status: 429, headers: { "retry-after": "1" } }, {}], {
      onDelay: () => {
        throw new Error("ignored");
      },
    });
    await send();
    await send();
    expect(calls()).toBe(2);
  });

  it.each<[AdaptiveThrottlingOptions]>([
    [{ threshold: 0 }],
    [{ threshold: 1.5 }],
    [{ maxSpacingMs: -1 }],
    [{ maxPauseMs: Number.NaN }],
    [{ requestBudget: 0 }],
    [{ timeBudget: -5 }],
  ])("refuses %j", (options) => {
    expect(() => new AdaptiveThrottlingMiddleware(options)).toThrow(DataverseInvalidRequestError);
  });
});
