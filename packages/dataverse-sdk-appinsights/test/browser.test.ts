/**
 * #158: the browser entry (`@mohsinonxrm/dataverse-sdk-appinsights/browser`) on a fake
 * `ApplicationInsights` instance from `@microsoft/applicationinsights-web`.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type {
  ApplicationInsights,
  IDependencyTelemetry,
  IEventTelemetry,
  IExceptionTelemetry,
} from "@microsoft/applicationinsights-web";
import { TEST_API_URL, createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import {
  ApplicationInsightsBrowserTelemetryClient,
  type ApplicationInsightsBrowserConfig,
} from "../src/browser.js";

const TRACE_ID = "4bf92f3577b34da6a3ce929d0e0e4736";

/** Records what the adapter sends, like an `ApplicationInsights` instance after loadAppInsights(). */
function fakeAppInsights(traceId: string | null = TRACE_ID) {
  const dependencies: IDependencyTelemetry[] = [];
  const events: IEventTelemetry[] = [];
  const exceptions: IExceptionTelemetry[] = [];
  const appInsights = {
    trackDependencyData: (d: IDependencyTelemetry) => dependencies.push(d),
    trackEvent: (e: IEventTelemetry) => events.push(e),
    trackException: (e: IExceptionTelemetry) => exceptions.push(e),
    getTraceCtx: () =>
      traceId === null ? null : { getTraceId: () => traceId, getTraceFlags: () => 1 },
  } as unknown as ApplicationInsightsBrowserConfig["appInsights"];
  return { appInsights, dependencies, events, exceptions };
}

// A real instance fits the config: this line fails to compile if the web SDK's methods change.
const real: ApplicationInsightsBrowserConfig["appInsights"] =
  null as unknown as ApplicationInsights;
void real;

describe("#158: ApplicationInsightsBrowserTelemetryClient", () => {
  it("one SDK request records exactly one dependency, with the correlation id and no query values", async () => {
    const ai = fakeAppInsights();
    const { client, fake } = createTestClient({
      telemetry: new ApplicationInsightsBrowserTelemetryClient({ appInsights: ai.appInsights }),
    });
    fake.on("GET", "/contacts", () => jsonResponse({ value: [] }));

    await client.api("contacts").filter("emailaddress1 eq 'jane@contoso.com'").get();

    expect(ai.dependencies).toHaveLength(1);
    const [dependency] = ai.dependencies;
    expect(dependency).toMatchObject({
      name: "GET /api/data/v9.2/contacts",
      type: "Fetch",
      data: `${TEST_API_URL}/contacts?…`,
      target: "contoso.crm.dynamics.com",
      success: true,
      responseCode: 200,
      properties: {
        "dataverse.correlation_id": fake.last().headers["x-ms-correlation-id"],
        "dataverse.retry.attempt": "0",
        HttpMethod: "GET",
      },
    });
    expect(dependency?.id).toMatch(new RegExp(`^\\|${TRACE_ID}\\.[0-9a-f]{16}$`));
    expect(dependency?.startTime).toBeInstanceOf(Date);
    expect(dependency?.duration).toBeGreaterThanOrEqual(0);
    expect(JSON.stringify(dependency)).not.toContain("jane");
    // Off by default: nothing is added to the CORS preflight.
    expect(fake.last().headers.traceparent).toBeUndefined();
  });

  it("names a 404 a failure and a 304 a success, as the Node adapter does", async () => {
    const ai = fakeAppInsights();
    const { client, fake } = createTestClient({
      telemetry: new ApplicationInsightsBrowserTelemetryClient({ appInsights: ai.appInsights }),
    });
    fake.on("GET", "/accounts(1)", () => new Response(null, { status: 304 }));
    fake.on("GET", "/accounts(2)", () => jsonResponse({}, { status: 404 }));
    await client.api("accounts(1)").response();
    await client
      .api("accounts(2)")
      .get()
      .catch(() => undefined);
    expect(ai.dependencies.map((d) => [d.responseCode, d.success])).toEqual([
      [304, true],
      [404, false],
    ]);
  });

  it("a request that fails without a response: a failed dependency and a redacted exception", async () => {
    const ai = fakeAppInsights();
    const { client, fake } = createTestClient({
      telemetry: new ApplicationInsightsBrowserTelemetryClient({ appInsights: ai.appInsights }),
    });
    fake.on("GET", "/contacts", () => {
      throw new TypeError(`Failed to fetch ${TEST_API_URL}/contacts?$filter=name eq 'jane'`);
    });
    await expect(client.api("contacts").get()).rejects.toThrow();

    expect(ai.dependencies).toMatchObject([
      { success: false, responseCode: 0, properties: { "error.type": "ConnectionFailed" } },
    ]);
    expect(ai.exceptions).toHaveLength(1);
    const exception = ai.exceptions[0]?.exception as Error;
    expect(exception.name).toBe("ConnectionFailed");
    expect(JSON.stringify([exception.message, exception.stack])).not.toContain("jane");
    expect(ai.exceptions[0]?.properties?.["dataverse.correlation_id"]).toBeDefined();
  });

  it("propagateTraceContext sends a traceparent that names the dependency, in the page's trace", async () => {
    const ai = fakeAppInsights();
    const { client, fake } = createTestClient({
      telemetry: new ApplicationInsightsBrowserTelemetryClient({
        appInsights: ai.appInsights,
        propagateTraceContext: true,
      }),
    });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));
    await client.api("WhoAmI").get();

    const spanId = ai.dependencies[0]?.id.split(".")[1];
    expect(fake.last().headers.traceparent).toBe(`00-${TRACE_ID}-${String(spanId)}-01`);
  });

  it("without a page trace context, a traceparent still names the dependency in a new trace", () => {
    const ai = fakeAppInsights(null);
    const handle = new ApplicationInsightsBrowserTelemetryClient({
      appInsights: ai.appInsights,
      propagateTraceContext: true,
    }).startDependency("dataverse", { method: "GET" });
    handle.end({ method: "GET", resultCode: "200" });
    const [, traceId, spanId] = handle.headers?.traceparent?.split("-") ?? [];
    expect(traceId).toMatch(/^[0-9a-f]{32}$/);
    expect(ai.dependencies[0]?.id).toBe(`|${String(traceId)}.${String(spanId)}`);
  });

  it("trackEvent maps properties and keeps finite measurements", () => {
    const ai = fakeAppInsights();
    new ApplicationInsightsBrowserTelemetryClient({ appInsights: ai.appInsights }).trackEvent(
      "dataverse.retry",
      { "correlation.id": "c1", "request.url": `${TEST_API_URL}/accounts?…` },
      { "retry.attempt": 1, bad: NaN }
    );
    expect(ai.events).toEqual([
      {
        name: "dataverse.retry",
        properties: {
          "dataverse.correlation_id": "c1",
          "dataverse.request.url": `${TEST_API_URL}/accounts?…`,
        },
        measurements: { "retry.attempt": 1 },
      },
    ]);
  });

  it("records each dependency once, even if end is called twice", () => {
    const ai = fakeAppInsights();
    const handle = new ApplicationInsightsBrowserTelemetryClient({
      appInsights: ai.appInsights,
    }).startDependency("dataverse", { method: "GET" });
    handle.end({ resultCode: "200" });
    handle.end({ resultCode: "200" });
    expect(ai.dependencies).toHaveLength(1);
  });

  it("never throws, and disableTelemetry records nothing", () => {
    const fail = () => {
      throw new Error("broken");
    };
    const broken = {
      trackDependencyData: fail,
      trackEvent: fail,
      trackException: fail,
      getTraceCtx: fail,
    } as unknown as ApplicationInsightsBrowserConfig["appInsights"];
    const client = new ApplicationInsightsBrowserTelemetryClient({
      appInsights: broken,
      propagateTraceContext: true,
    });
    expect(() => {
      client.startDependency("dataverse", { method: "GET" }).end({ resultCode: "200" });
      client.trackEvent("e", { a: "b" }, { n: 1 });
      client.trackException(new Error("boom"));
    }).not.toThrow();

    const ai = fakeAppInsights();
    const off = new ApplicationInsightsBrowserTelemetryClient({
      appInsights: ai.appInsights,
      disableTelemetry: true,
    });
    const handle = off.startDependency("dataverse", { method: "GET" });
    handle.end({ resultCode: "200" });
    off.trackEvent("e");
    off.trackException(new Error("boom"));
    expect(handle.headers).toBeUndefined();
    expect([ai.dependencies, ai.events, ai.exceptions]).toEqual([[], [], []]);
  });
});

describe("#158: the browser entry is separate from the Node entry", () => {
  const exportsOf = () =>
    (
      JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as {
        exports: Record<string, unknown>;
      }
    ).exports;

  it("is published as ./browser", () => {
    expect(exportsOf()["./browser"]).toEqual({
      types: "./dist/browser.d.ts",
      default: "./dist/browser.js",
    });
  });

  it("imports nothing from Node.js, OpenTelemetry or the Azure Monitor distro", () => {
    const sources = [
      "../src/browser.ts",
      "../src/browser/ApplicationInsightsBrowserTelemetryClient.ts",
      "../src/browser/types.ts",
      "../src/redaction.ts",
    ]
      .map((p) => readFileSync(new URL(p, import.meta.url), "utf8"))
      .join("\n");
    // Import and export statements only, not the examples in doc comments.
    const imports = [...sources.matchAll(/^(?:import|export)\b[^;]*?from\s+"([^"]+)"/gm)].map(
      (m) => m[1] ?? ""
    );
    // Both are type-only imports: the built browser.js imports neither (see the bundle check).
    expect([...new Set(imports.filter((i) => !i.startsWith(".")))].sort()).toEqual([
      "@microsoft/applicationinsights-web",
      "@mohsinonxrm/dataverse-sdk-core",
    ]);
  });
});
