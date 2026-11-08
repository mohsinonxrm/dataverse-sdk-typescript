/**
 * #97: every `$batch` that comes back is reported to the client's telemetry as `dataverse.batch`.
 */
import { describe, expect, it } from "vitest";
import { batchResponse, createTestClient, throttled } from "@mohsinonxrm/dataverse-sdk-testing";
import { TelemetryEvents, type TelemetryClient } from "@mohsinonxrm/dataverse-sdk-core";
import { BatchRequestBuilder } from "../src/index.js";

interface TrackedEvent {
  name: string;
  props: Record<string, string> | undefined;
  measurements: Record<string, number> | undefined;
}

function recordingTelemetry() {
  const events: TrackedEvent[] = [];
  const telemetry: TelemetryClient = {
    trackEvent: (name, props, measurements) => events.push({ name, props, measurements }),
    trackException: () => undefined,
    startDependency: () => ({ end: () => undefined }),
  };
  return { telemetry, events };
}

const batchEvents = (events: TrackedEvent[]) =>
  events.filter((e) => e.name === TelemetryEvents.batch);

describe("#97: dataverse.batch events", () => {
  it("reports the requests, the outcome and the correlation id sent with the $batch", async () => {
    const t = recordingTelemetry();
    const { client, fake } = createTestClient({ telemetry: t.telemetry });
    fake.on("POST", "/$batch", () =>
      batchResponse([
        { status: 200, body: { value: [] } },
        { status: 404, body: { error: { code: "0x80040217", message: "Not found" } } },
      ])
    );
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("a", "GET", "/accounts?$top=1");
    batch.addRequest("b", "GET", "/contacts(00000000-0000-0000-0000-000000000001)");
    await batch.execute({ continueOnError: true });

    const [event] = batchEvents(t.events);
    expect(batchEvents(t.events)).toHaveLength(1);
    expect(event.props).toEqual({
      "correlation.id": fake.last().headers["x-ms-correlation-id"],
      "batch.continue_on_error": "true",
    });
    expect(event.measurements).toMatchObject({
      "batch.requests": 2,
      "batch.succeeded": 1,
      "batch.failed": 1,
      status: 200,
    });
    expect(event.measurements?.duration_ms).toBeGreaterThanOrEqual(0);
  });

  it("one event per $batch of a split execution, each with its own correlation id", async () => {
    const t = recordingTelemetry();
    const { client, fake } = createTestClient({ telemetry: t.telemetry });
    fake.on("POST", "/$batch", () => batchResponse([{ status: 204 }]));
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("a", "DELETE", "/accounts(00000000-0000-0000-0000-000000000001)");
    batch.addRequest("b", "DELETE", "/accounts(00000000-0000-0000-0000-000000000002)");
    await batch.execute({ batchSize: 1 });

    const events = batchEvents(t.events);
    expect(events.map((e) => e.measurements?.["batch.requests"])).toEqual([1, 1]);
    expect(events.map((e) => e.props?.["correlation.id"])).toEqual(
      fake.requests.map((r) => r.headers["x-ms-correlation-id"])
    );
    expect(new Set(events.map((e) => e.props?.["correlation.id"])).size).toBe(2);
  });

  it("a $batch that failed as a whole reports its status without per-request counts", async () => {
    const t = recordingTelemetry();
    const { client, fake } = createTestClient({ telemetry: t.telemetry });
    fake.on("POST", "/$batch", () => throttled(30));
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("a", "GET", "/accounts?$top=1");
    await expect(batch.execute({ correlationId: "corr-b" })).rejects.toThrow();

    const [event] = batchEvents(t.events);
    expect(event.props?.["correlation.id"]).toBe("corr-b");
    expect(event.measurements).toMatchObject({ "batch.requests": 1, status: 429 });
    expect(event.measurements).not.toHaveProperty("batch.failed");
    // The 429 itself is reported by core.
    expect(t.events.some((e) => e.name === TelemetryEvents.throttle)).toBe(true);
  });

  it("without telemetry nothing is tracked and the batch still runs", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () => batchResponse([{ status: 204 }]));
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("a", "DELETE", "/accounts(00000000-0000-0000-0000-000000000001)");
    await expect(batch.execute()).resolves.toMatchObject({ success: true });
  });
});
