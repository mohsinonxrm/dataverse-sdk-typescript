import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import type { DataverseClientOptions } from "../src/abstractions/options.js";
import type {
  FetchProvider,
  RequestInformation,
  TelemetryClient,
} from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
const DIAGNOSTIC = [
  "x-ms-sdk-version",
  "x-ms-correlation-id",
  "x-ms-feature-usage",
  "retry-attempt",
];

/** 503 once, then 200, recording the headers fetch receives on each attempt. */
function setup(options: Partial<DataverseClientOptions> = {}) {
  const sent: Array<Record<string, string>> = [];
  let calls = 0;
  const fetchProvider: FetchProvider = {
    fetch: (_input, init) => {
      const h: Record<string, string> = {};
      new Headers(init?.headers).forEach((v, k) => (h[k] = v));
      sent.push(h);
      calls++;
      return Promise.resolve(
        calls === 1
          ? new Response(null, { status: 503 })
          : new Response("{}", { status: 200, headers: { "content-type": "application/json" } })
      );
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    tokenProvider: { getToken: () => Promise.resolve("t") },
    retry: { baseDelayMs: 1, maxDelayMs: 1 },
    ...options,
  });
  return { client, sent };
}

const diagnosticNames = (h: Record<string, string> | undefined) =>
  Object.keys(h ?? {}).filter((k) => DIAGNOSTIC.includes(k));

describe("#13: diagnostic headers can be turned off", () => {
  it("are all sent by default (retry-attempt on the retry)", async () => {
    const { client, sent } = setup();
    await client.api("WhoAmI").get();
    expect(diagnosticNames(sent[0]).sort()).toEqual([
      "x-ms-correlation-id",
      "x-ms-feature-usage",
      "x-ms-sdk-version",
    ]);
    expect(diagnosticNames(sent[1]).sort()).toEqual([
      "retry-attempt",
      "x-ms-correlation-id",
      "x-ms-feature-usage",
      "x-ms-sdk-version",
    ]);
  });

  it("diagnosticHeaders: false sends none of the four, on any attempt", async () => {
    const dependencies: Array<Record<string, string> | undefined> = [];
    const telemetry: TelemetryClient = {
      trackEvent: () => undefined,
      trackDependency: (_n, d) => dependencies.push(d.properties),
      trackException: () => undefined,
    };
    const { client, sent } = setup({ diagnosticHeaders: false, telemetry });
    await client.api("WhoAmI").get();
    expect(sent).toHaveLength(2);
    expect(sent.map(diagnosticNames)).toEqual([[], []]);
    expect(Object.keys(sent[0] ?? {}).sort()).toEqual([
      "accept",
      "authorization",
      "odata-maxversion",
      "odata-version",
    ]);
    // Telemetry still gets a correlation id.
    expect(dependencies[0]?.["correlation.id"]).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("an object turns headers off one by one", async () => {
    const { client, sent } = setup({
      diagnosticHeaders: { featureUsage: false, retryAttempt: false },
    });
    await client.api("WhoAmI").get();
    expect(diagnosticNames(sent[1]).sort()).toEqual(["x-ms-correlation-id", "x-ms-sdk-version"]);
  });

  it("send() leaves the caller's request object unchanged, even after a retry", async () => {
    const { client, sent } = setup();
    const request: RequestInformation = {
      method: "GET",
      url: "WhoAmI",
      headers: { Accept: "application/json" },
    };
    const before = structuredClone(request);
    await client.send(request);
    expect(sent).toHaveLength(2);
    expect(request).toEqual(before);
  });
});
