/**
 * #356: an explicit `maxConcurrentRequests` is honoured exactly and caps the DOP hint; the
 * defaults (8, adapting within 2..16) are unchanged; inconsistent settings are refused.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { DataverseInvalidRequestError, type ConcurrencyOptions } from "../src/index.js";
import { resolveConcurrency } from "../src/middleware/ConcurrencyMiddleware.js";
import type { FetchProvider } from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";

/** A client whose fetch holds each request for a moment and records the peak in flight. */
function setup(concurrency: ConcurrencyOptions, dopHint?: string) {
  const stats = { inFlight: 0, peak: 0 };
  const fetchProvider: FetchProvider = {
    fetch: async () => {
      stats.inFlight++;
      stats.peak = Math.max(stats.peak, stats.inFlight);
      await new Promise((resolve) => setTimeout(resolve, 15));
      stats.inFlight--;
      return new Response(null, {
        status: 204,
        headers: dopHint ? { "x-ms-dop-hint": dopHint } : {},
      });
    },
  };
  const client = new DataverseClient({ baseUrl: BASE_URL, fetchProvider, concurrency });
  const burst = async (n: number) => {
    stats.peak = 0;
    await Promise.all(Array.from({ length: n }, () => client.api("WhoAmI").response()));
    return stats.peak;
  };
  return { burst };
}

describe("#356: concurrency options", () => {
  it("maxConcurrentRequests: 1 sends one request at a time", async () => {
    const { burst } = setup({ maxConcurrentRequests: 1, adaptiveFromDopHint: false });
    expect(await burst(4)).toBe(1);
  });

  it("maxConcurrentRequests: 32 allows 32", async () => {
    const { burst } = setup({ maxConcurrentRequests: 32, adaptiveFromDopHint: false });
    expect(await burst(40)).toBe(32);
  });

  it("a DOP hint never raises an explicit maxConcurrentRequests", async () => {
    const { burst } = setup({ maxConcurrentRequests: 4 }, "50");
    await burst(1); // learn the hint
    expect(await burst(20)).toBe(4);
  });

  it("a DOP hint may raise the limit up to an explicit max", async () => {
    const { burst } = setup({ maxConcurrentRequests: 4, max: 12 }, "50");
    await burst(1);
    expect(await burst(20)).toBe(12);
  });

  it("a DOP hint can lower the limit, but not below min", async () => {
    const { burst } = setup({ maxConcurrentRequests: 8, min: 3 }, "1");
    await burst(1);
    expect(await burst(10)).toBe(3);
  });

  it("keeps the defaults: start at 8, adapt within 2..16", () => {
    expect(resolveConcurrency()).toEqual({ start: 8, min: 2, max: 16 });
    expect(resolveConcurrency({ max: 4 })).toEqual({ start: 4, min: 2, max: 4 });
    expect(resolveConcurrency({ maxConcurrentRequests: 1 })).toEqual({ start: 1, min: 1, max: 1 });
  });

  it.each<[ConcurrencyOptions]>([
    [{ maxConcurrentRequests: 0 }],
    [{ maxConcurrentRequests: 2.5 }],
    [{ min: -1 }],
    [{ maxConcurrentRequests: 20, max: 10 }],
    [{ maxConcurrentRequests: 2, min: 4 }],
  ])("refuses %j", (concurrency) => {
    expect(() => new DataverseClient({ baseUrl: BASE_URL, concurrency })).toThrow(
      DataverseInvalidRequestError
    );
  });
});
