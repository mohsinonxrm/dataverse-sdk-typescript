/**
 * @fileoverview #159: `@azure/monitor-opentelemetry` and `@opentelemetry/resources` are optional
 * peers. An app that calls `useAzureMonitor()` itself (or exports another way) can use the adapter
 * without them; only `connectionString` / `cloudRoleName` need them, and then the error says what
 * to install.
 *
 * Both packages are mocked as missing: importing them fails as it does when they aren't installed.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SpanKind } from "@opentelemetry/api";
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";

vi.mock("@azure/monitor-opentelemetry", () => {
  throw new Error("Cannot find package '@azure/monitor-opentelemetry'");
});
vi.mock("@opentelemetry/resources", () => {
  throw new Error("Cannot find package '@opentelemetry/resources'");
});

const { ApplicationInsightsTelemetryClient } = await import("../src/index.js");

let exporter: InMemorySpanExporter;
let tracerProvider: BasicTracerProvider;

beforeEach(() => {
  exporter = new InMemorySpanExporter();
  tracerProvider = new BasicTracerProvider({ spanProcessors: [new SimpleSpanProcessor(exporter)] });
});

afterEach(async () => {
  await tracerProvider.shutdown();
});

describe("#159: appinsights without the optional peers", () => {
  it("imports, and records dependency spans for a Dataverse request", async () => {
    const { client, fake } = createTestClient({
      telemetry: new ApplicationInsightsTelemetryClient({ tracerProvider }),
    });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));

    await expect(client.api("/WhoAmI").get()).resolves.toEqual({ UserId: "u1" });

    const [span] = exporter.getFinishedSpans();
    expect(span?.kind).toBe(SpanKind.CLIENT);
  });

  it("connectionString without @azure/monitor-opentelemetry says what to install", () => {
    let error: unknown;
    try {
      new ApplicationInsightsTelemetryClient({ connectionString: "InstrumentationKey=00000000" });
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(DataverseInvalidRequestError);
    expect((error as Error).message).toContain("npm install @azure/monitor-opentelemetry");
    // The import failure is kept as cause.
    expect((error as Error).cause).toBeInstanceOf(Error);
  });

  it("disableTelemetry needs neither package", () => {
    expect(
      () =>
        new ApplicationInsightsTelemetryClient({
          connectionString: "InstrumentationKey=00000000",
          disableTelemetry: true,
        })
    ).not.toThrow();
  });
});
