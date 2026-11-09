/**
 * Live: the Application Insights adapter's Node entry on real Dataverse requests. No
 * `connectionString`, so nothing goes to Azure Monitor: the adapter records into in-memory
 * OpenTelemetry tracer and logger providers, which is what the Azure Monitor distro exports.
 * Covered: dependency spans for a real WhoAmI, 404 and `$batch`; custom events (the batch
 * package's `dataverse.batch` and `client.trackEvent()`) as log records with the attributes the
 * exporter maps to customEvents; and an exception record for an attempt without a response.
 * The browser entry (`./browser`) needs a browser and `@microsoft/applicationinsights-web`, so it
 * is not run live. Nothing is created.
 */
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { SpanKind, SpanStatusCode } from "@opentelemetry/api";
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
import { ApplicationInsightsTelemetryClient } from "@mohsinonxrm/dataverse-sdk-appinsights";
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";
import { DataverseClient, DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient, orgUrl } from "./env.js";

const MISSING = "00000000-0000-0000-0000-000000000000";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Attributes the Azure Monitor exporter maps to a custom event's name and measurements. */
const EVENT_NAME = "microsoft.custom_event.name";
const EVENT_MEASUREMENTS = "microsoft.custom_measurements";

const spanExporter = new InMemorySpanExporter();
const tracerProvider = new BasicTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(spanExporter)],
});
const logExporter = new InMemoryLogRecordExporter();
const loggerProvider = new LoggerProvider({
  processors: [new SimpleLogRecordProcessor({ exporter: logExporter })],
});

afterAll(async () => {
  await tracerProvider.shutdown();
  await loggerProvider.shutdown();
});

beforeEach(() => {
  spanExporter.reset();
  logExporter.reset();
});

function appInsightsClient(): DataverseClient {
  const noop = (): void => undefined;
  return new DataverseClient({
    baseUrl: orgUrl,
    tokenProvider: liveClient().tokenProvider,
    telemetry: new ApplicationInsightsTelemetryClient({ tracerProvider, loggerProvider }),
    logger: { debug: noop, info: noop, warn: noop, error: noop },
  });
}

function clientSpans(): ReadableSpan[] {
  return spanExporter.getFinishedSpans().filter((s) => s.kind === SpanKind.CLIENT);
}

function customEvents(name: string): ReadableLogRecord[] {
  return logExporter.getFinishedLogRecords().filter((r) => r.attributes[EVENT_NAME] === name);
}

/** The one item of items. */
function onlyOne<T>(items: T[]): T {
  expect(items).toHaveLength(1);
  return items[0];
}

/** A custom event's measurements, which the adapter writes as a JSON object. */
function measurementsOf(event: ReadableLogRecord): Record<string, number> {
  const json = event.attributes[EVENT_MEASUREMENTS];
  expect(typeof json).toBe("string");
  return JSON.parse(json as string) as Record<string, number>;
}

describe.skipIf(!live)("live: Application Insights adapter (Node entry)", () => {
  it("a WhoAmI and a 404 record dependency spans; only the 404 is an error", async () => {
    const client = appInsightsClient();
    const host = new URL(orgUrl).hostname;

    const who = await client.api("WhoAmI").get<{ UserId: string }>();
    expect(who.UserId).toMatch(UUID);
    const error: unknown = await client
      .api(`accounts(${MISSING})`)
      .select("name")
      .get()
      .then(
        () => undefined,
        (e: unknown) => e
      );
    expect(error).toBeInstanceOf(DataverseODataError);

    const spans = clientSpans();
    expect(spans).toHaveLength(2);
    const [ok, notFound] = spans as [ReadableSpan, ReadableSpan];

    expect(ok.name).toBe("GET dataverse");
    expect(ok.instrumentationScope.name).toBe("@mohsinonxrm/dataverse-sdk-appinsights");
    expect(ok.attributes["http.request.method"]).toBe("GET");
    expect(ok.attributes["server.address"]).toBe(host);
    expect(ok.attributes["http.response.status_code"]).toBe(200);
    expect(ok.attributes["url.full"]).toBe(client.resolveUrl("WhoAmI"));
    expect(ok.attributes["dataverse.correlation_id"]).toMatch(UUID);
    expect(ok.status.code).toBe(SpanStatusCode.UNSET);

    expect(notFound.attributes["http.response.status_code"]).toBe(404);
    expect(notFound.attributes["error.type"]).toBe("404");
    expect(notFound.attributes["url.full"]).toBe(`${client.resolveUrl("accounts")}({id})?…`);
    expect(notFound.status).toEqual({ code: SpanStatusCode.ERROR, message: "HTTP 404" });
  });

  it("a real $batch records its dependency span and the dataverse.batch custom event", async () => {
    const client = appInsightsClient();
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("who", "GET", "WhoAmI");
    batch.addRequest("who-again", "GET", "WhoAmI");

    const result = await batch.execute();
    expect(result.success).toBe(true);

    const span = onlyOne(clientSpans());
    expect(span.name).toBe("POST dataverse");
    expect(span.attributes["url.full"]).toBe(client.resolveUrl("$batch"));
    expect(span.attributes["http.response.status_code"]).toBe(200);

    const event = onlyOne(customEvents("dataverse.batch"));
    expect(event.instrumentationScope.name).toBe("@mohsinonxrm/dataverse-sdk-appinsights");
    expect(event.attributes["dataverse.batch.continue_on_error"]).toBe("false");
    expect(event.attributes["dataverse.correlation_id"]).toMatch(UUID);
    const measurements = measurementsOf(event);
    expect(measurements).toMatchObject({
      "batch.requests": 2,
      "batch.succeeded": 2,
      "batch.failed": 0,
      status: 200,
    });
    expect(measurements.duration_ms).toBeGreaterThanOrEqual(0);
  });

  it("client.trackEvent() records a custom event with its properties and measurements", async () => {
    const client = appInsightsClient();
    await client.api("WhoAmI").get();

    client.trackEvent("live.test", { "test.case": "trackEvent" }, { "test.value": 42 });

    const event = onlyOne(customEvents("live.test"));
    expect(event.attributes["dataverse.test.case"]).toBe("trackEvent");
    expect(measurementsOf(event)).toEqual({ "test.value": 42 });
  });

  it("an attempt that gets no response records an ERROR span and an exception record", async () => {
    const client = appInsightsClient();

    // 1 ms per attempt: the real fetch is aborted before Dataverse answers (not retried).
    const error: unknown = await client
      .api("WhoAmI")
      .get({ attemptTimeoutMs: 1 })
      .then(
        () => undefined,
        (e: unknown) => e
      );
    expect((error as Error | undefined)?.name).toBe("RequestTimeout");

    const span = onlyOne(clientSpans());
    expect(span.attributes["error.type"]).toBe("RequestTimeout");
    expect(span.status.code).toBe(SpanStatusCode.ERROR);

    const exception = logExporter
      .getFinishedLogRecords()
      .find((r) => r.attributes["exception.type"] !== undefined);
    expect(exception?.severityText).toBe("ERROR");
    expect(exception?.attributes["exception.type"]).toBe("RequestTimeout");
    expect(typeof exception?.attributes["exception.stacktrace"]).toBe("string");
    expect(exception?.attributes["dataverse.request.url"]).toBe(client.resolveUrl("WhoAmI"));
  });
});
