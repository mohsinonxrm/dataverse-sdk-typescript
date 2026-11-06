/**
 * #44: a request waiting to be retried must not hold a concurrency slot. With one slot, a second
 * request has to be able to run while the first sleeps on its retry delay.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { buildDefaultMiddleware } from "../src/pipeline/DefaultMiddleware.js";

const ORG = "https://contoso.crm.dynamics.com";

/** A client with exactly one concurrency slot and a fetch that records the order of calls. */
function oneSlotClient(respond: (path: string, n: number) => Response) {
  const calls: string[] = [];
  const counts = new Map<string, number>();
  const client = new DataverseClient({
    baseUrl: ORG,
    concurrency: { maxConcurrentRequests: 1, min: 1, max: 1, adaptiveFromDopHint: false },
    retry: { maxRetries: 1, baseDelayMs: 200, jitter: false },
    fetchProvider: {
      fetch: (input) => {
        const url = new URL(input instanceof Request ? input.url : input.toString());
        const path = url.pathname.slice(url.pathname.lastIndexOf("/") + 1);
        const n = (counts.get(path) ?? 0) + 1;
        counts.set(path, n);
        calls.push(`${path}#${String(n)}`);
        return Promise.resolve(respond(path, n));
      },
    },
  });
  return { client, calls };
}

const ok = () => new Response("{}", { headers: { "content-type": "application/json" } });

describe("#44: retry waits don't hold a concurrency slot", () => {
  it("another request runs while the first one waits on a backoff", async () => {
    const { client, calls } = oneSlotClient((path, n) =>
      path === "slow" && n === 1 ? new Response(null, { status: 503 }) : ok()
    );
    const slow = client.api("slow").get();
    // Let the first attempt of "slow" take the slot and get its 503.
    await new Promise((r) => setTimeout(r, 20));
    const started = Date.now();
    await client.api("fast").get();
    const fastTook = Date.now() - started;
    await slow;

    expect(calls).toEqual(["slow#1", "fast#1", "slow#2"]);
    // "fast" didn't wait for the 200 ms backoff of "slow".
    expect(fastTook).toBeLessThan(150);
  });

  it("another request runs while the first one waits on Retry-After", async () => {
    const { client, calls } = oneSlotClient((path, n) =>
      path === "slow" && n === 1
        ? new Response(null, { status: 429, headers: { "retry-after": "1" } })
        : ok()
    );
    const slow = client.api("slow").get();
    await new Promise((r) => setTimeout(r, 20));
    await client.api("fast").get();
    expect(calls).toEqual(["slow#1", "fast#1"]);
    await slow;
    expect(calls).toEqual(["slow#1", "fast#1", "slow#2"]);
  });

  it("the slot limit still applies to attempts in flight", async () => {
    let inFlight = 0;
    let peak = 0;
    const client = new DataverseClient({
      baseUrl: ORG,
      concurrency: { maxConcurrentRequests: 1, min: 1, max: 1, adaptiveFromDopHint: false },
      retry: { maxRetries: 0 },
      fetchProvider: {
        fetch: async () => {
          inFlight++;
          peak = Math.max(peak, inFlight);
          await new Promise((r) => setTimeout(r, 10));
          inFlight--;
          return ok();
        },
      },
    });
    await Promise.all([1, 2, 3].map((i) => client.api(`r${String(i)}`).get()));
    expect(peak).toBe(1);
  });

  it("the default order puts Retry outside Concurrency", () => {
    expect(
      buildDefaultMiddleware({
        baseUrl: ORG,
        tokenProvider: { getToken: () => Promise.resolve("t") },
      }).map((m) => m.name)
    ).toEqual([
      "ODataHeadersMiddleware",
      "RetryMiddleware",
      "ConcurrencyMiddleware",
      "AuthMiddleware",
      "TelemetryMiddleware",
      "LoggingMiddleware",
    ]);
  });
});
