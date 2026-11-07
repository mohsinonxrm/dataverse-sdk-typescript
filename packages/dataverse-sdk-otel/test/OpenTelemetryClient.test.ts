import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { SpanKind, SpanStatusCode, context, trace } from "@opentelemetry/api";
import type { Tracer } from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
  type ReadableSpan,
} from "@opentelemetry/sdk-trace-base";
import {
  TEST_API_URL,
  createTestClient,
  jsonResponse,
  odataError,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { OpenTelemetryClient } from "../src/index.js";
import { redactUrl } from "../src/spans.js";

const CORRELATION_ID = "0b2f8e6a-5f2b-4d8e-9a43-1f7b6c2d9e10";

let exporter: InMemorySpanExporter;
let provider: BasicTracerProvider;
let tracer: Tracer;

beforeEach(() => {
  exporter = new InMemorySpanExporter();
  provider = new BasicTracerProvider({ spanProcessors: [new SimpleSpanProcessor(exporter)] });
  tracer = provider.getTracer("test");
});

afterEach(async () => {
  await provider.shutdown();
});

function spans(): ReadableSpan[] {
  return exporter.getFinishedSpans();
}

function onlySpan(): ReadableSpan {
  const all = spans();
  expect(all).toHaveLength(1);
  return all[0] as ReadableSpan;
}

function durationMs(span: ReadableSpan): number {
  return span.duration[0] * 1000 + span.duration[1] / 1e6;
}

describe("OpenTelemetryClient.trackDependency", () => {
  it("records a CLIENT span with HTTP and Dataverse attributes", () => {
    const client = new OpenTelemetryClient({ tracer });
    client.trackDependency("dataverse", {
      method: "GET",
      // As core passes it: already redacted with the app's redactUrl.
      url: `${TEST_API_URL}/contacts?…`,
      durationMs: 120,
      success: true,
      resultCode: "200",
      properties: {
        "sdk.version": "1.0.0",
        "correlation.id": CORRELATION_ID,
        "retry.attempt": "0",
      },
    });

    const span = onlySpan();
    expect(span.name).toBe("GET dataverse");
    expect(span.kind).toBe(SpanKind.CLIENT);
    expect(span.attributes).toEqual({
      "http.request.method": "GET",
      "url.full": `${TEST_API_URL}/contacts?…`,
      "server.address": "contoso.crm.dynamics.com",
      "server.port": 443,
      "http.response.status_code": 200,
      "dataverse.correlation_id": CORRELATION_ID,
      "dataverse.sdk.version": "1.0.0",
      "dataverse.retry.attempt": "0",
    });
    expect(span.status.code).toBe(SpanStatusCode.UNSET);
    expect(durationMs(span)).toBeGreaterThanOrEqual(119);
    expect(durationMs(span)).toBeLessThan(1000);
  });

  it("marks a failed response with status ERROR and error.type", () => {
    const client = new OpenTelemetryClient({ tracer });
    client.trackDependency("dataverse", {
      method: "POST",
      url: `${TEST_API_URL}/accounts`,
      durationMs: 5,
      success: false,
      resultCode: "500",
    });

    const span = onlySpan();
    expect(span.status).toEqual({ code: SpanStatusCode.ERROR, message: "HTTP 500" });
    expect(span.attributes["error.type"]).toBe("500");
    expect(span.attributes["http.response.status_code"]).toBe(500);
  });

  it("marks a call that never got a response with the error type it was given", () => {
    const client = new OpenTelemetryClient({ tracer });
    client.trackDependency("dataverse", {
      method: "GET",
      url: `${TEST_API_URL}/accounts`,
      success: false,
      properties: { "error.type": "TypeError" },
    });

    const span = onlySpan();
    expect(span.status).toEqual({ code: SpanStatusCode.ERROR, message: "TypeError" });
    expect(span.attributes["error.type"]).toBe("TypeError");
    expect(span.attributes["http.response.status_code"]).toBeUndefined();
  });

  it("treats a 4xx/5xx status as a failure when success is not given", () => {
    const client = new OpenTelemetryClient({ tracer });
    client.trackDependency("dataverse", { method: "GET", resultCode: "404" });
    expect(onlySpan().status.code).toBe(SpanStatusCode.ERROR);
  });

  it("sets server.address to the host name and server.port separately (#384)", () => {
    const client = new OpenTelemetryClient({ tracer });
    client.trackDependency("dataverse", {
      method: "GET",
      // As core passes it: `target` is `URL.host`, which keeps a non-default port.
      target: "contoso.crm.dynamics.com:8443",
      url: "https://contoso.crm.dynamics.com:8443/api/data/v9.2/WhoAmI",
      resultCode: "200",
    });
    client.trackDependency("dataverse", { method: "GET", target: "contoso.crm.dynamics.com:8443" });
    client.trackDependency("dataverse", {
      method: "GET",
      target: "contoso.crm.dynamics.com",
      url: `${TEST_API_URL}/WhoAmI`,
    });

    const [withUrl, targetOnly, defaultPort] = spans().map((s) => s.attributes);
    expect(withUrl?.["server.address"]).toBe("contoso.crm.dynamics.com");
    expect(withUrl?.["server.port"]).toBe(8443);
    expect(targetOnly?.["server.address"]).toBe("contoso.crm.dynamics.com");
    expect(targetOnly?.["server.port"]).toBe(8443);
    expect(defaultPort?.["server.address"]).toBe("contoso.crm.dynamics.com");
    expect(defaultPort?.["server.port"]).toBe(443);
  });

  it("records url.full as core passes it, already redacted by the app's redactUrl (#384)", () => {
    const client = new OpenTelemetryClient({ tracer });
    client.trackDependency("dataverse", { method: "GET", url: `${TEST_API_URL}/accounts?$top=5` });
    client.trackDependency("dataverse", { method: "GET", url: `${TEST_API_URL}/accounts({id})?…` });

    expect(spans().map((s) => s.attributes["url.full"])).toEqual([
      `${TEST_API_URL}/accounts?$top=5`,
      `${TEST_API_URL}/accounts({id})?…`,
    ]);
  });

  it("derives the span status from the status code when there is one (#384)", () => {
    const client = new OpenTelemetryClient({ tracer });
    // A core that sets `success` from `res.ok` reports a 304 as unsuccessful; it isn't an error.
    client.trackDependency("dataverse", { method: "GET", success: false, resultCode: "304" });
    client.trackDependency("dataverse", { method: "GET", success: true, resultCode: "503" });
    client.trackDependency("dataverse", { method: "GET", success: false });

    const [notModified, unavailable, thrown] = spans();
    expect(notModified?.status.code).toBe(SpanStatusCode.UNSET);
    expect(notModified?.attributes["error.type"]).toBeUndefined();
    expect(unavailable?.status).toEqual({ code: SpanStatusCode.ERROR, message: "HTTP 503" });
    expect(unavailable?.attributes["error.type"]).toBe("503");
    expect(thrown?.status.code).toBe(SpanStatusCode.ERROR);
  });

  it("uses the tracerProvider option", () => {
    const client = new OpenTelemetryClient({ tracerProvider: provider });
    client.trackDependency("dataverse", { method: "GET", url: TEST_API_URL });
    expect(onlySpan().instrumentationScope.name).toBe("@mohsinonxrm/dataverse-sdk-otel");
  });

  it("uses the global tracer provider by default", () => {
    trace.setGlobalTracerProvider(provider);
    try {
      new OpenTelemetryClient().trackDependency("dataverse", { method: "GET", url: TEST_API_URL });
      expect(onlySpan().name).toBe("GET dataverse");
    } finally {
      trace.disable();
    }
  });

  it("records nothing when disableTelemetry is set", () => {
    const client = new OpenTelemetryClient({ tracer, disableTelemetry: true });
    client.trackDependency("dataverse", { method: "GET", url: TEST_API_URL });
    client.trackEvent("event");
    client.trackException(new Error("boom"));
    expect(spans()).toHaveLength(0);
  });
});

describe("redactUrl", () => {
  it.each([
    [
      `${TEST_API_URL}/contacts?$filter=emailaddress1 eq 'jane@contoso.com'&$top=5`,
      `${TEST_API_URL}/contacts?$filter=REDACTED&$top=REDACTED`,
    ],
    [
      `${TEST_API_URL}/contacts(emailaddress1='jane@contoso.com')`,
      `${TEST_API_URL}/contacts(emailaddress1='REDACTED')`,
    ],
    [
      `${TEST_API_URL}/contacts(emailaddress1=%27jane%40contoso.com%27)`,
      `${TEST_API_URL}/contacts(emailaddress1='REDACTED')`,
    ],
    [
      "https://user:secret@contoso.crm.dynamics.com/api/data/v9.2/WhoAmI#frag",
      `${TEST_API_URL}/WhoAmI`,
    ],
    ["/contacts?$filter=fullname eq 'Jane'", "/contacts?$filter=REDACTED"],
    [
      `${TEST_API_URL}/accounts(00000000-0000-0000-0000-000000000001)`,
      `${TEST_API_URL}/accounts(00000000-0000-0000-0000-000000000001)`,
    ],
    // `&` and `?` inside a quoted value
    [
      `${TEST_API_URL}/accounts?$filter=name eq 'Smith&Jones Jane'&$top=1`,
      `${TEST_API_URL}/accounts?$filter=REDACTED&$top=REDACTED`,
    ],
    [
      `${TEST_API_URL}/contacts(fullname='Jane Doe?')?$select=fullname`,
      `${TEST_API_URL}/contacts(fullname='REDACTED')?$select=REDACTED`,
    ],
    // a quote left open
    [`${TEST_API_URL}/contacts(fullname='Jane Doe`, `${TEST_API_URL}/contacts(fullname='REDACTED'`],
    // a query with no recognisable parameter name
    [`${TEST_API_URL}/WhoAmI?jane@contoso.com`, `${TEST_API_URL}/WhoAmI?REDACTED`],
  ])("%s", (input, expected) => {
    expect(redactUrl(input)).toBe(expected);
    expect(expected).not.toMatch(/jane|smith|jones|doe/i);
  });
});

describe("OpenTelemetryClient.trackException", () => {
  it("records an exception span with status ERROR and redacted URLs", () => {
    const client = new OpenTelemetryClient({ tracer });
    const error = new TypeError(
      `fetch failed for ${TEST_API_URL}/contacts?$filter=fullname eq 'Jane Doe'`
    );
    client.trackException(error, {
      "correlation.id": CORRELATION_ID,
      "request.method": "GET",
      // Core redacted it with the app's redactUrl: recorded as is.
      "request.url": `${TEST_API_URL}/contacts?…`,
      note: `see ${TEST_API_URL}/contacts?$filter=fullname eq 'Jane Doe'`,
    });

    const span = onlySpan();
    expect(span.name).toBe("dataverse.exception");
    expect(span.kind).toBe(SpanKind.INTERNAL);
    expect(span.status.code).toBe(SpanStatusCode.ERROR);
    expect(span.attributes).toEqual({
      "dataverse.correlation_id": CORRELATION_ID,
      "dataverse.request.method": "GET",
      "dataverse.request.url": `${TEST_API_URL}/contacts?…`,
      "dataverse.note": `see ${TEST_API_URL}/contacts?$filter=REDACTED`,
    });
    const event = span.events[0];
    expect(event?.name).toBe("exception");
    expect(event?.attributes?.["exception.type"]).toBe("TypeError");
    expect(event?.attributes?.["exception.message"]).toBe(
      `fetch failed for ${TEST_API_URL}/contacts?$filter=REDACTED`
    );
    expect(JSON.stringify([span.attributes, span.events, span.status])).not.toContain("Jane");
  });

  it("accepts values that are not Error instances", () => {
    const client = new OpenTelemetryClient({ tracer });
    client.trackException({ reason: "nope" });
    client.trackException("plain string");
    client.trackException(undefined);
    const messages = spans().map((s) => s.events[0]?.attributes?.["exception.message"]);
    expect(messages).toEqual(['{"reason":"nope"}', "plain string", "undefined"]);
  });
});

describe("OpenTelemetryClient.trackEvent", () => {
  it("records an INTERNAL span when no span is active", () => {
    const client = new OpenTelemetryClient({ tracer });
    client.trackEvent("retry", { reason: "429" }, { delayMs: 500 });

    const span = onlySpan();
    expect(span.name).toBe("retry");
    expect(span.kind).toBe(SpanKind.INTERNAL);
    expect(span.attributes).toEqual({ "dataverse.reason": "429", "dataverse.delayMs": 500 });
  });

  it("adds an event to the active span", () => {
    const manager = new AsyncLocalStorageContextManager().enable();
    context.setGlobalContextManager(manager);
    try {
      const client = new OpenTelemetryClient({ tracer });
      tracer.startActiveSpan("parent", (parent) => {
        client.trackEvent("throttled", { "retry.after": "5" });
        parent.end();
      });

      const parent = onlySpan();
      expect(parent.events).toHaveLength(1);
      expect(parent.events[0]?.name).toBe("throttled");
      expect(parent.events[0]?.attributes).toEqual({ "dataverse.retry.after": "5" });
    } finally {
      context.disable();
    }
  });
});

describe("OpenTelemetryClient never throws", () => {
  it("swallows errors from the tracer", () => {
    const broken = {
      startSpan: () => {
        throw new Error("tracer is broken");
      },
      startActiveSpan: () => {
        throw new Error("tracer is broken");
      },
    } as unknown as Tracer;
    const client = new OpenTelemetryClient({ tracer: broken });
    expect(() => {
      client.trackDependency("dataverse", { method: "GET", url: TEST_API_URL });
      client.trackEvent("event");
      client.trackException(new Error("boom"));
    }).not.toThrow();
  });

  it("swallows malformed input from JavaScript callers", () => {
    const client = new OpenTelemetryClient({ tracer });
    const loose = client as unknown as {
      trackDependency(name: unknown, data: unknown): void;
      trackEvent(name: unknown, props: unknown, measurements: unknown): void;
    };
    expect(() => {
      loose.trackDependency("dataverse", null);
      loose.trackDependency("dataverse", { url: 42, properties: { n: 1 } });
      loose.trackEvent("event", { n: 1 }, { bad: "x", nan: NaN });
    }).not.toThrow();
  });
});

describe("DataverseClient with OpenTelemetryClient", () => {
  it("completes a request and records its dependency span", async () => {
    const { client, fake } = createTestClient({ telemetry: new OpenTelemetryClient({ tracer }) });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));

    await expect(client.api("WhoAmI").get()).resolves.toEqual({ UserId: "u1" });

    const span = onlySpan();
    expect(span.name).toBe("GET dataverse");
    expect(span.kind).toBe(SpanKind.CLIENT);
    expect(span.attributes["http.response.status_code"]).toBe(200);
    expect(span.attributes["url.full"]).toBe(`${TEST_API_URL}/WhoAmI`);
    expect(span.attributes["dataverse.correlation_id"]).toBe(
      fake.last().headers["x-ms-correlation-id"]
    );
    expect(span.status.code).toBe(SpanStatusCode.UNSET);
  });

  it("does not record $filter values", async () => {
    const { client, fake } = createTestClient({ telemetry: new OpenTelemetryClient({ tracer }) });
    fake.on("GET", "/contacts", () => jsonResponse({ value: [] }));

    await client.api("contacts").filter("emailaddress1 eq 'jane@contoso.com'").get();

    expect(fake.last().url).toContain("jane");
    const span = onlySpan();
    // Core redacts the query (#35), and the adapter records that URL as is (#384).
    expect(span.attributes["url.full"]).toBe(`${TEST_API_URL}/contacts?…`);
    expect(JSON.stringify(span.attributes)).not.toContain("jane");
  });

  it("records the URL the app's redactUrl returns (#384)", async () => {
    const { client, fake } = createTestClient({
      telemetry: new OpenTelemetryClient({ tracer }),
      redactUrl: (url) => `${url.origin}${url.pathname}?$top=${url.searchParams.get("$top") ?? ""}`,
    });
    fake.on("GET", "/accounts", () => jsonResponse({ value: [] }));

    await client.api("accounts").top(5).get();

    expect(onlySpan().attributes["url.full"]).toBe(`${TEST_API_URL}/accounts?$top=5`);
  });

  it("keeps the Dataverse error of a failed request and marks the span as failed", async () => {
    const { client, fake } = createTestClient({ telemetry: new OpenTelemetryClient({ tracer }) });
    fake.on("GET", /^\/accounts/, () => odataError(404, "0x80040217", "Does Not Exist"));

    await expect(client.api("accounts(x)").get()).rejects.toMatchObject({
      status: 404,
      code: "0x80040217",
    });

    const span = onlySpan();
    expect(span.status.code).toBe(SpanStatusCode.ERROR);
    expect(span.attributes["http.response.status_code"]).toBe(404);
  });

  it("records the dependency and the exception when fetch fails", async () => {
    const { client, fake } = createTestClient({ telemetry: new OpenTelemetryClient({ tracer }) });
    fake.on("GET", "/WhoAmI", () => {
      throw new TypeError("fetch failed");
    });

    await expect(client.api("WhoAmI").get()).rejects.toThrow();

    const [dependency, exception] = spans();
    expect(dependency?.kind).toBe(SpanKind.CLIENT);
    expect(dependency?.status.code).toBe(SpanStatusCode.ERROR);
    expect(exception?.name).toBe("dataverse.exception");
    expect(exception?.events[0]?.name).toBe("exception");
  });
});
