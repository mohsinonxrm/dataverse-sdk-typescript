/**
 * Live: the OpenTelemetry adapter (#97, #159, #384) on real Dataverse requests. The app's setup is
 * an in-memory exporter, the W3C propagator and the async-hooks context manager (what
 * `NodeSDK.start()` registers). A real WhoAmI and a real 404 each record one CLIENT span with the
 * HTTP client attributes, the URL as core redacted it, and ERROR status for the 404 only; the
 * request on the wire carries a `traceparent` naming that span. Nothing is created.
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { SpanKind, SpanStatusCode, context, propagation } from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
  type ReadableSpan,
} from "@opentelemetry/sdk-trace-base";
import {
  DataverseClient,
  DataverseODataError,
  type FetchProvider,
} from "@mohsinonxrm/dataverse-sdk-core";
import { OpenTelemetryClient } from "@mohsinonxrm/dataverse-sdk-otel";
import { live, liveClient, orgUrl } from "./env.js";

const MISSING = "00000000-0000-0000-0000-000000000000";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface SentRequest {
  url: string;
  headers: Headers;
}

const exporter = new InMemorySpanExporter();
const tracerProvider = new BasicTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(exporter)],
});
const sent: SentRequest[] = [];

beforeAll(() => {
  context.setGlobalContextManager(new AsyncLocalStorageContextManager().enable());
  propagation.setGlobalPropagator(new W3CTraceContextPropagator());
});

afterAll(async () => {
  propagation.disable();
  context.disable();
  await tracerProvider.shutdown();
});

beforeEach(() => {
  exporter.reset();
  sent.length = 0;
});

function otelClient(): DataverseClient {
  const fetchProvider: FetchProvider = {
    fetch: (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      sent.push({ url, headers: new Headers(init?.headers) });
      return fetch(input, init);
    },
  };
  const noop = (): void => undefined;
  return new DataverseClient({
    baseUrl: orgUrl,
    tokenProvider: liveClient().tokenProvider,
    fetchProvider,
    telemetry: new OpenTelemetryClient({ tracerProvider }),
    logger: { debug: noop, info: noop, warn: noop, error: noop },
  });
}

function onlyClientSpan(): ReadableSpan {
  const spans = exporter.getFinishedSpans().filter((s) => s.kind === SpanKind.CLIENT);
  expect(spans).toHaveLength(1);
  return spans[0];
}

/** The `traceparent` a sampled span sends. */
function traceparentOf(span: ReadableSpan): string {
  const { traceId, spanId } = span.spanContext();
  return `00-${traceId}-${spanId}-01`;
}

describe.skipIf(!live)("live: OpenTelemetry adapter", () => {
  it("a WhoAmI records one CLIENT span, and the request carries its traceparent", async () => {
    const client = otelClient();
    const host = new URL(orgUrl).hostname;

    const who = await client.api("WhoAmI").get<{ UserId: string }>();
    expect(who.UserId).toMatch(UUID);

    const span = onlyClientSpan();
    expect(span.name).toBe("GET dataverse");
    expect(span.instrumentationScope.name).toBe("@mohsinonxrm/dataverse-sdk-otel");
    expect(span.attributes["http.request.method"]).toBe("GET");
    expect(span.attributes["server.address"]).toBe(host);
    expect(String(span.attributes["server.address"])).not.toContain(":");
    expect(span.attributes["server.port"]).toBe(443);
    expect(span.attributes["http.response.status_code"]).toBe(200);
    expect(span.attributes["url.full"]).toBe(client.resolveUrl("WhoAmI"));
    expect(span.attributes["dataverse.correlation_id"]).toMatch(UUID);
    expect(span.attributes["error.type"]).toBeUndefined();
    expect(span.status.code).toBe(SpanStatusCode.UNSET);
    expect(span.parentSpanContext).toBeUndefined();

    const request = sent.find((r) => r.url.includes("/WhoAmI"));
    expect(request?.headers.get("traceparent")).toBe(traceparentOf(span));
    // The correlation id on the wire is the one on the span.
    expect(request?.headers.get("x-ms-correlation-id")).toBe(
      span.attributes["dataverse.correlation_id"]
    );
  });

  it("a 404 records a CLIENT span with ERROR status and the redacted URL", async () => {
    const client = otelClient();

    const error: unknown = await client
      .api(`accounts(${MISSING})`)
      .select("name")
      .get()
      .then(
        () => undefined,
        (e: unknown) => e
      );
    expect(error).toBeInstanceOf(DataverseODataError);
    expect((error as DataverseODataError).status).toBe(404);

    const span = onlyClientSpan();
    expect(span.name).toBe("GET dataverse");
    expect(span.attributes["http.response.status_code"]).toBe(404);
    expect(span.attributes["error.type"]).toBe("404");
    expect(span.status).toEqual({ code: SpanStatusCode.ERROR, message: "HTTP 404" });
    // Default redaction (#35): the key as `({id})`, the query as `?…`.
    expect(span.attributes["url.full"]).toBe(`${client.resolveUrl("accounts")}({id})?…`);
    expect(String(span.attributes["url.full"])).not.toContain(MISSING);
    expect(String(span.attributes["url.full"])).not.toContain("$select");
    expect(span.attributes["server.address"]).toBe(new URL(orgUrl).hostname);

    const request = sent.find((r) => r.url.includes("/accounts("));
    expect(request?.headers.get("traceparent")).toBe(traceparentOf(span));
  });

  it("an attempt that gets no response records an ERROR span and a dataverse.exception span", async () => {
    const client = otelClient();

    // 1 ms per attempt: the real fetch is aborted before Dataverse answers (not retried).
    const error: unknown = await client
      .api("WhoAmI")
      .get({ attemptTimeoutMs: 1 })
      .then(
        () => undefined,
        (e: unknown) => e
      );
    expect((error as Error | undefined)?.name).toBe("RequestTimeout");

    const span = onlyClientSpan();
    expect(span.attributes["http.response.status_code"]).toBeUndefined();
    expect(span.attributes["error.type"]).toBe("RequestTimeout");
    expect(span.status).toEqual({ code: SpanStatusCode.ERROR, message: "RequestTimeout" });

    const exception = exporter.getFinishedSpans().find((s) => s.name === "dataverse.exception");
    expect(exception?.kind).toBe(SpanKind.INTERNAL);
    expect(exception?.status.code).toBe(SpanStatusCode.ERROR);
    expect(exception?.events[0]?.name).toBe("exception");
    expect(exception?.events[0]?.attributes?.["exception.type"]).toBe("RequestTimeout");
    expect(exception?.attributes["dataverse.request.url"]).toBe(client.resolveUrl("WhoAmI"));
  });

  it("a request inside an app span is a child span in the app's trace", async () => {
    const client = otelClient();
    const appTracer = tracerProvider.getTracer("live-test-app");

    await appTracer.startActiveSpan("handle order", async (appSpan) => {
      await client.api("WhoAmI").get();
      appSpan.end();
    });

    const app = exporter.getFinishedSpans().find((s) => s.name === "handle order");
    const dependency = onlyClientSpan();
    expect(dependency.spanContext().traceId).toBe(app?.spanContext().traceId);
    expect(dependency.parentSpanContext?.spanId).toBe(app?.spanContext().spanId);
    const request = sent.find((r) => r.url.includes("/WhoAmI"));
    expect(request?.headers.get("traceparent")).toBe(traceparentOf(dependency));
  });
});
