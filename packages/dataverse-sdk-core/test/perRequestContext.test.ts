import { describe, it, expect } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import type { FetchProvider, TelemetryClient } from "../src/abstractions/http.js";
import {
  getGlobalFeatureTracker,
  resetGlobalFeatureTracker,
} from "../src/telemetry/FeatureUsageTracker.js";

const BASE_URL = "https://org.crm.dynamics.com";

interface Call {
  path: string;
  correlationId: string | null;
  featureUsage: string | null;
}

function recording(
  respond: (path: string, n: number) => Response = () => new Response(null, { status: 204 })
) {
  const calls: Call[] = [];
  const counts = new Map<string, number>();
  const fetchProvider: FetchProvider = {
    fetch: (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      const path = new URL(url).pathname.split("/").pop() ?? "";
      const h = new Headers(init?.headers);
      calls.push({
        path,
        correlationId: h.get("x-ms-correlation-id"),
        featureUsage: h.get("x-ms-feature-usage"),
      });
      const n = (counts.get(path) ?? 0) + 1;
      counts.set(path, n);
      return Promise.resolve(respond(path, n));
    },
  };
  return { fetchProvider, calls };
}

describe("#15: every request gets its own middleware context", () => {
  it("sequential requests get different correlation ids", async () => {
    const rec = recording();
    const client = new DataverseClient({ baseUrl: BASE_URL, fetchProvider: rec.fetchProvider });
    await client.api("a").delete();
    await client.api("b").delete();
    const [a, b] = rec.calls;
    expect(a.correlationId).toMatch(/^[0-9a-f-]{36}$/);
    expect(b.correlationId).toMatch(/^[0-9a-f-]{36}$/);
    expect(a.correlationId).not.toBe(b.correlationId);
  });

  it("a caller-supplied correlation id is used, through send(), the builder and execute()", async () => {
    const rec = recording();
    const client = new DataverseClient({ baseUrl: BASE_URL, fetchProvider: rec.fetchProvider });
    await client.send({ method: "GET", url: "x", headers: {}, correlationId: "corr-send" });
    await client.api("y").delete({ correlationId: "corr-builder" });
    await client.execute(
      {
        toRequestInformation: (base: string) => ({
          method: "POST",
          url: `${base}/Act`,
          headers: {},
          body: {},
        }),
        parseResponse: () => Promise.resolve(undefined),
      },
      { correlationId: "corr-execute" }
    );
    expect(rec.calls.map((c) => c.correlationId)).toEqual([
      "corr-send",
      "corr-builder",
      "corr-execute",
    ]);
  });

  it("a retried request keeps one correlation id across attempts", async () => {
    const rec = recording((_path, n) =>
      n === 1
        ? new Response(null, { status: 429, headers: { "retry-after": "0" } })
        : new Response(null, { status: 204 })
    );
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      fetchProvider: rec.fetchProvider,
      retry: { maxRetries: 1, baseDelayMs: 1, maxDelayMs: 2 },
    });
    await client.api("a").delete();
    expect(rec.calls).toHaveLength(2);
    expect(rec.calls[0]?.correlationId).toBe(rec.calls[1]?.correlationId);
  });

  it("concurrent requests report their own retry attempt numbers", async () => {
    const attempts: Array<{ corr: string | undefined; attempt: string | undefined }> = [];
    const telemetry: TelemetryClient = {
      trackEvent: () => undefined,
      trackException: () => undefined,
      startDependency: (_name, data) => ({
        end: () => {
          attempts.push({
            corr: data.properties?.["correlation.id"],
            attempt: data.properties?.["retry.attempt"],
          });
        },
      }),
    };
    // "slow" fails twice, "fast" succeeds at once while "slow" is still retrying.
    const rec = recording((path, n) =>
      path === "slow" && n <= 2
        ? new Response(null, { status: 429, headers: { "retry-after": "0" } })
        : new Response(null, { status: 204 })
    );
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      fetchProvider: rec.fetchProvider,
      telemetry,
      retry: { maxRetries: 3, baseDelayMs: 1, maxDelayMs: 2 },
    });
    await Promise.all([client.api("slow").delete(), client.api("fast").delete()]);
    const fastCorr = rec.calls.find((c) => c.path === "fast")?.correlationId ?? undefined;
    const fast = attempts.filter((a) => a.corr === fastCorr).map((a) => a.attempt);
    const slow = attempts.filter((a) => a.corr !== fastCorr).map((a) => a.attempt);
    expect(fast).toEqual(["0"]);
    expect(slow).toEqual(["0", "1", "2"]);
  });

  it("feature-usage flags are tracked per client, not in the process-wide tracker", async () => {
    resetGlobalFeatureTracker();
    const before = getGlobalFeatureTracker().getFlagsHex();
    const rec = recording();
    const client = new DataverseClient({ baseUrl: BASE_URL, fetchProvider: rec.fetchProvider });
    await client.api("x").delete();
    expect(rec.calls[0]?.featureUsage).toMatch(/^0x[0-9a-f]+$/i);
    expect(getGlobalFeatureTracker().getFlagsHex()).toBe(before);
  });
});
