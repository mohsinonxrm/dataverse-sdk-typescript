/**
 * @fileoverview #159: with no tracer passed, the adapter records into the app's own OpenTelemetry
 * setup. The app registers a global tracer provider and context manager (what `NodeSDK.start()`
 * does), starts a span, and makes a Dataverse request inside it: the dependency span must be a
 * child of the app's span, in the same trace.
 *
 * That only works when the adapter and the app share one `@opentelemetry/api`, which is why the API
 * is a peer dependency. The packed-install check in the PR covers the copies; this test covers
 * the trace.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { SpanKind, context, propagation, trace } from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
  type ReadableSpan,
} from "@opentelemetry/sdk-trace-base";
import { createTestClient, jsonResponse, throttled } from "@mohsinonxrm/dataverse-sdk-testing";
import { OpenTelemetryClient } from "../src/index.js";

let exporter: InMemorySpanExporter;
let provider: BasicTracerProvider;

beforeEach(() => {
  exporter = new InMemorySpanExporter();
  provider = new BasicTracerProvider({ spanProcessors: [new SimpleSpanProcessor(exporter)] });
  context.setGlobalContextManager(new AsyncLocalStorageContextManager().enable());
  trace.setGlobalTracerProvider(provider);
});

afterEach(async () => {
  trace.disable();
  context.disable();
  await provider.shutdown();
});

describe("#159: the adapter's span joins the app's active trace", () => {
  it("a Dataverse request inside an app span records a child CLIENT span", async () => {
    const { client, fake } = createTestClient({ telemetry: new OpenTelemetryClient() });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));
    const appTracer = trace.getTracer("my-app");

    await appTracer.startActiveSpan("handle order", async (appSpan) => {
      await client.api("/WhoAmI").get();
      appSpan.end();
    });

    const finished = exporter.getFinishedSpans();
    const appSpan = finished.find((s) => s.name === "handle order");
    const dependency = finished.find((s) => s.kind === SpanKind.CLIENT);
    expect(appSpan).toBeDefined();
    expect(dependency).toBeDefined();
    expect(dependency?.instrumentationScope.name).toBe("@mohsinonxrm/dataverse-sdk-otel");
    expect(dependency?.spanContext().traceId).toBe(appSpan?.spanContext().traceId);
    expect(dependency?.parentSpanContext?.spanId).toBe(appSpan?.spanContext().spanId);
  });

  it("outside an app span, the dependency span starts its own trace", async () => {
    const { client, fake } = createTestClient({ telemetry: new OpenTelemetryClient() });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));

    await client.api("/WhoAmI").get();

    const [dependency] = exporter.getFinishedSpans();
    expect(dependency?.kind).toBe(SpanKind.CLIENT);
    expect(dependency?.parentSpanContext).toBeUndefined();
  });
});

describe("#97: the dependency span is active and its trace context reaches Dataverse", () => {
  beforeEach(() => {
    propagation.setGlobalPropagator(new W3CTraceContextPropagator());
  });
  afterEach(() => {
    propagation.disable();
  });

  const clientSpans = () => exporter.getFinishedSpans().filter((s) => s.kind === SpanKind.CLIENT);
  const traceparentOf = (s: ReadableSpan) =>
    `00-${s.spanContext().traceId}-${s.spanContext().spanId}-01`;

  it("each attempt sends the traceparent of its own span, and the span is active during it", async () => {
    const { client, fake } = createTestClient({ telemetry: new OpenTelemetryClient() });
    const activeDuringFetch: Array<string | undefined> = [];
    fake.on("GET", "/WhoAmI", () => {
      activeDuringFetch.push(trace.getActiveSpan()?.spanContext().spanId);
      return jsonResponse({ UserId: "u1" });
    });

    await trace.getTracer("my-app").startActiveSpan("handle order", async (appSpan) => {
      await client.api("/WhoAmI").get();
      appSpan.end();
    });

    const [dependency] = clientSpans();
    expect(dependency).toBeDefined();
    expect(fake.last().headers.traceparent).toBe(traceparentOf(dependency as ReadableSpan));
    expect(activeDuringFetch).toEqual([dependency?.spanContext().spanId]);
  });

  it("a retry and a resend after a 401 are spans of their own, children of the app's span", async () => {
    const { client, fake } = createTestClient({
      telemetry: new OpenTelemetryClient(),
      retry: { baseDelayMs: 1, maxDelayMs: 1, jitter: false },
    });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));
    fake.on("GET", "/WhoAmI", () => new Response(null, { status: 401 }), 1);
    fake.on("GET", "/WhoAmI", () => throttled(0), 1);

    let appSpanContext: { traceId: string; spanId: string } | undefined;
    await trace.getTracer("my-app").startActiveSpan("handle order", async (appSpan) => {
      appSpanContext = appSpan.spanContext();
      await client.api("/WhoAmI").get();
      appSpan.end();
    });

    const dependencies = clientSpans();
    expect(dependencies.map((s) => s.attributes["http.response.status_code"])).toEqual([
      429, 401, 200,
    ]);
    for (const span of dependencies) {
      expect(span.spanContext().traceId).toBe(appSpanContext?.traceId);
      expect(span.parentSpanContext?.spanId).toBe(appSpanContext?.spanId);
    }
    expect(dependencies.map((s) => s.attributes["http.request.resend_count"])).toEqual([
      undefined,
      1,
      1,
    ]);
    expect(fake.requests.map((r) => r.headers.traceparent)).toEqual(
      dependencies.map((s) => traceparentOf(s))
    );
    // The throttle and the retry are events on the app's span.
    const appSpan = exporter.getFinishedSpans().find((s) => s.name === "handle order");
    expect(appSpan?.events.map((e) => e.name)).toEqual(
      expect.arrayContaining(["dataverse.throttle", "dataverse.retry"])
    );
  });

  it("diagnosticHeaders: { traceContext: false } keeps the header off; the span is still recorded", async () => {
    const { client, fake } = createTestClient({
      telemetry: new OpenTelemetryClient(),
      diagnosticHeaders: { traceContext: false },
    });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));
    await client.api("/WhoAmI").get();
    expect(fake.last().headers.traceparent).toBeUndefined();
    expect(clientSpans()).toHaveLength(1);
  });

  it("without a registered propagator there is no header to send", async () => {
    propagation.disable();
    const { client, fake } = createTestClient({ telemetry: new OpenTelemetryClient() });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));
    await client.api("/WhoAmI").get();
    expect(fake.last().headers.traceparent).toBeUndefined();
    expect(clientSpans()).toHaveLength(1);
  });

  it("disableTelemetry sends no trace context", async () => {
    const { client, fake } = createTestClient({
      telemetry: new OpenTelemetryClient({ disableTelemetry: true }),
    });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));
    await client.api("/WhoAmI").get();
    expect(fake.last().headers.traceparent).toBeUndefined();
    expect(exporter.getFinishedSpans()).toHaveLength(0);
  });
});
