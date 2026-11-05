import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { SpanKind, SpanStatusCode } from "@opentelemetry/api";
import type { Tracer } from "@opentelemetry/api";
import { SeverityNumber } from "@opentelemetry/api-logs";
import type { Logger } from "@opentelemetry/api-logs";
import {
  InMemoryLogRecordExporter,
  LoggerProvider,
  SimpleLogRecordProcessor,
  type ReadableLogRecord,
} from "@opentelemetry/sdk-logs";
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
import { ApplicationInsightsTelemetryClient } from "../src/index.js";

const CORRELATION_ID = "0b2f8e6a-5f2b-4d8e-9a43-1f7b6c2d9e10";

let spanExporter: InMemorySpanExporter;
let tracerProvider: BasicTracerProvider;
let logExporter: InMemoryLogRecordExporter;
let loggerProvider: LoggerProvider;

beforeEach(() => {
  spanExporter = new InMemorySpanExporter();
  tracerProvider = new BasicTracerProvider({
    spanProcessors: [new SimpleSpanProcessor(spanExporter)],
  });
  logExporter = new InMemoryLogRecordExporter();
  loggerProvider = new LoggerProvider({
    processors: [new SimpleLogRecordProcessor({ exporter: logExporter })],
  });
});

afterEach(async () => {
  await tracerProvider.shutdown();
  await loggerProvider.shutdown();
});

function adapter(): ApplicationInsightsTelemetryClient {
  return new ApplicationInsightsTelemetryClient({ tracerProvider, loggerProvider });
}

function spans(): ReadableSpan[] {
  return spanExporter.getFinishedSpans();
}

function onlySpan(): ReadableSpan {
  const all = spans();
  expect(all).toHaveLength(1);
  return all[0] as ReadableSpan;
}

function onlyLog(): ReadableLogRecord {
  const all = logExporter.getFinishedLogRecords();
  expect(all).toHaveLength(1);
  return all[0] as ReadableLogRecord;
}

describe("ApplicationInsightsTelemetryClient.trackDependency", () => {
  it("records a CLIENT span that Application Insights maps to an HTTP dependency", () => {
    adapter().trackDependency("dataverse", {
      method: "GET",
      url: `${TEST_API_URL}/contacts?$select=fullname&$filter=emailaddress1 eq 'jane@contoso.com'`,
      durationMs: 80,
      success: true,
      resultCode: "200",
      properties: { "correlation.id": CORRELATION_ID, "sdk.version": "1.0.0" },
    });

    const span = onlySpan();
    expect(span.name).toBe("GET dataverse");
    expect(span.kind).toBe(SpanKind.CLIENT);
    expect(span.instrumentationScope.name).toBe("@mohsinonxrm/dataverse-sdk-appinsights");
    expect(span.attributes).toEqual({
      "http.request.method": "GET",
      "url.full": `${TEST_API_URL}/contacts?$select=REDACTED&$filter=REDACTED`,
      "server.address": "contoso.crm.dynamics.com",
      "server.port": 443,
      "http.response.status_code": 200,
      "dataverse.correlation_id": CORRELATION_ID,
      "dataverse.sdk.version": "1.0.0",
    });
    expect(span.status.code).toBe(SpanStatusCode.UNSET);
  });

  it("marks a failed response with status ERROR", () => {
    adapter().trackDependency("dataverse", {
      method: "PATCH",
      url: `${TEST_API_URL}/accounts(00000000-0000-0000-0000-000000000001)`,
      success: false,
      resultCode: "412",
    });

    const span = onlySpan();
    expect(span.status).toEqual({ code: SpanStatusCode.ERROR, message: "HTTP 412" });
    expect(span.attributes["error.type"]).toBe("412");
  });
});

describe("ApplicationInsightsTelemetryClient.trackEvent", () => {
  it("emits a log record that Azure Monitor exports as a custom event", () => {
    adapter().trackEvent("retry", { reason: "429" }, { delayMs: 500, bad: NaN });

    const log = onlyLog();
    expect(log.severityNumber).toBe(SeverityNumber.INFO);
    expect(log.attributes).toEqual({
      "microsoft.custom_event.name": "retry",
      "microsoft.custom_measurements": JSON.stringify({ delayMs: 500 }),
      "dataverse.reason": "429",
    });
  });
});

describe("ApplicationInsightsTelemetryClient.trackException", () => {
  it("emits a log record that Azure Monitor exports as an exception, with URLs redacted", () => {
    const error = new TypeError(
      `fetch failed for ${TEST_API_URL}/contacts?$filter=fullname eq 'Jane Doe'`
    );
    adapter().trackException(error, {
      "correlation.id": CORRELATION_ID,
      "request.url": `${TEST_API_URL}/contacts?$filter=fullname eq 'Jane Doe'`,
    });

    const log = onlyLog();
    expect(log.severityNumber).toBe(SeverityNumber.ERROR);
    expect(log.attributes["exception.type"]).toBe("TypeError");
    expect(log.attributes["exception.message"]).toBe(
      `fetch failed for ${TEST_API_URL}/contacts?$filter=REDACTED`
    );
    expect(log.attributes["exception.stacktrace"]).toMatch(/^TypeError: fetch failed/);
    expect(log.attributes["dataverse.correlation_id"]).toBe(CORRELATION_ID);
    expect(log.attributes["dataverse.request.url"]).toBe(
      `${TEST_API_URL}/contacts?$filter=REDACTED`
    );
    expect(JSON.stringify([log.attributes, log.body])).not.toContain("Jane");
  });

  it("gives a non-Error value a stack trace so the exporter still maps it", () => {
    adapter().trackException("plain string");
    const log = onlyLog();
    expect(log.attributes["exception.type"]).toBe("string");
    expect(log.attributes["exception.stacktrace"]).toBe("string: plain string");
  });
});

describe("ApplicationInsightsTelemetryClient never throws", () => {
  it("swallows errors from the tracer and the logger", () => {
    const fail = () => {
      throw new Error("broken");
    };
    const client = new ApplicationInsightsTelemetryClient({
      tracer: { startSpan: fail, startActiveSpan: fail } as unknown as Tracer,
      logger: { emit: fail, enabled: fail } as unknown as Logger,
    });
    expect(() => {
      client.trackDependency("dataverse", { method: "GET", url: TEST_API_URL });
      client.trackEvent("event", { a: "b" }, { n: 1 });
      client.trackException(new Error("boom"));
    }).not.toThrow();
  });

  it("records nothing when disableTelemetry is set", () => {
    const client = new ApplicationInsightsTelemetryClient({
      tracerProvider,
      loggerProvider,
      disableTelemetry: true,
    });
    client.trackDependency("dataverse", { method: "GET", url: TEST_API_URL });
    client.trackEvent("event");
    client.trackException(new Error("boom"));
    expect(spans()).toHaveLength(0);
    expect(logExporter.getFinishedLogRecords()).toHaveLength(0);
  });
});

describe("DataverseClient with ApplicationInsightsTelemetryClient", () => {
  it("completes a request and records its dependency span", async () => {
    const { client, fake } = createTestClient({ telemetry: adapter() });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));

    await expect(client.api("WhoAmI").get()).resolves.toEqual({ UserId: "u1" });

    const span = onlySpan();
    expect(span.kind).toBe(SpanKind.CLIENT);
    expect(span.attributes["http.response.status_code"]).toBe(200);
    expect(span.attributes["dataverse.correlation_id"]).toBe(
      fake.last().headers["x-ms-correlation-id"]
    );
  });

  it("keeps the Dataverse error of a failed request", async () => {
    const { client, fake } = createTestClient({ telemetry: adapter() });
    fake.on("GET", /^\/accounts/, () => odataError(404, "0x80040217", "Does Not Exist"));

    await expect(client.api("accounts(x)").get()).rejects.toMatchObject({
      status: 404,
      code: "0x80040217",
    });
    expect(onlySpan().status.code).toBe(SpanStatusCode.ERROR);
  });

  it("records the dependency and the exception when fetch fails", async () => {
    const { client, fake } = createTestClient({ telemetry: adapter() });
    fake.on("GET", "/WhoAmI", () => {
      throw new TypeError("fetch failed");
    });

    await expect(client.api("WhoAmI").get()).rejects.toThrow();

    expect(onlySpan().status.code).toBe(SpanStatusCode.ERROR);
    expect(onlyLog().attributes["exception.type"]).toBeDefined();
  });
});
