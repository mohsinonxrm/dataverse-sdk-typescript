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
import { SpanKind, context, trace } from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
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
