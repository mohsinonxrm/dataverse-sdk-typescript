/**
 * @fileoverview #159: with no tracer or logger passed, the adapter records into the global
 * providers the app registered (what `useAzureMonitor()` does). A Dataverse request inside an app
 * span records a dependency span that is a child of it, and a failed request's exception log
 * record carries the same trace, so Application Insights shows them in one operation.
 *
 * That only works when the adapter and the app share one `@opentelemetry/api` (and
 * `@opentelemetry/api-logs`), which is why they are peer dependencies.
 */

import { createRequire } from "node:module";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SpanKind, context, trace } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import {
  InMemoryLogRecordExporter,
  LoggerProvider,
  SimpleLogRecordProcessor,
} from "@opentelemetry/sdk-logs";
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import { setPeerLoader } from "../src/optionalPeers.js";

// The adapter must not start the real distro here; the app's providers stand in for it.
const realRequire = createRequire(import.meta.url);
setPeerLoader((name) =>
  name === "@azure/monitor-opentelemetry" ? { useAzureMonitor: vi.fn() } : realRequire(name)
);

const { ApplicationInsightsTelemetryClient } = await import("../src/index.js");

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
  context.setGlobalContextManager(new AsyncLocalStorageContextManager().enable());
  trace.setGlobalTracerProvider(tracerProvider);
  logs.setGlobalLoggerProvider(loggerProvider);
});

afterEach(async () => {
  trace.disable();
  logs.disable();
  context.disable();
  await tracerProvider.shutdown();
  await loggerProvider.shutdown();
});

describe("#159: appinsights telemetry joins the app's active trace", () => {
  it("the dependency span is a child of the app's span", async () => {
    const { client, fake } = createTestClient({
      telemetry: new ApplicationInsightsTelemetryClient(),
    });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));

    await trace.getTracer("my-app").startActiveSpan("GET /orders", async (appSpan) => {
      await client.api("/WhoAmI").get();
      appSpan.end();
    });

    const finished = spanExporter.getFinishedSpans();
    const appSpan = finished.find((s) => s.name === "GET /orders");
    const dependency = finished.find((s) => s.kind === SpanKind.CLIENT);
    expect(dependency?.instrumentationScope.name).toBe("@mohsinonxrm/dataverse-sdk-appinsights");
    expect(dependency?.spanContext().traceId).toBe(appSpan?.spanContext().traceId);
    expect(dependency?.parentSpanContext?.spanId).toBe(appSpan?.spanContext().spanId);
  });

  it("an exception log record carries the app span's trace", async () => {
    const { client, fake } = createTestClient({
      telemetry: new ApplicationInsightsTelemetryClient(),
    });
    fake.on("GET", "/WhoAmI", () => {
      throw new TypeError("fetch failed");
    });

    let appTraceId = "";
    await trace.getTracer("my-app").startActiveSpan("GET /orders", async (appSpan) => {
      appTraceId = appSpan.spanContext().traceId;
      await client
        .api("/WhoAmI")
        .get()
        .catch(() => undefined);
      appSpan.end();
    });

    const records = logExporter.getFinishedLogRecords();
    const exception = records.find((r) => r.attributes["exception.type"] !== undefined);
    expect(exception).toBeDefined();
    expect(exception?.spanContext?.traceId).toBe(appTraceId);
  });
});
