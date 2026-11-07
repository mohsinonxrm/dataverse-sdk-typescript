import { createRequire } from "node:module";
import { describe, expect, it, vi } from "vitest";
import { SeverityNumber } from "@opentelemetry/api-logs";
import type { Logger } from "@opentelemetry/api-logs";
import { setPeerLoader } from "../src/optionalPeers.js";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";

// The real distro registers global providers and exports over the network; only check the call.
// The peers are require()d, which vi.mock doesn't reach, so the loader is replaced instead.
const useAzureMonitor = vi.fn();
const realRequire = createRequire(import.meta.url);
setPeerLoader((name) =>
  name === "@azure/monitor-opentelemetry" ? { useAzureMonitor } : realRequire(name)
);

const { ApplicationInsightsTelemetryClient } = await import("../src/index.js");

const CONNECTION_STRING = "InstrumentationKey=00000000-0000-0000-0000-000000000000";
const OTHER_CONNECTION_STRING = "InstrumentationKey=11111111-1111-1111-1111-111111111111";

describe("ApplicationInsightsTelemetryClient with a connection string", () => {
  it("does not start Azure Monitor without a connection string or when disabled", () => {
    new ApplicationInsightsTelemetryClient();
    new ApplicationInsightsTelemetryClient({ connectionString: "" });
    new ApplicationInsightsTelemetryClient({
      connectionString: CONNECTION_STRING,
      disableTelemetry: true,
    });
    expect(useAzureMonitor).not.toHaveBeenCalled();
  });

  it("starts Azure Monitor once per process, with the cloud role name as service.name", () => {
    new ApplicationInsightsTelemetryClient({
      connectionString: CONNECTION_STRING,
      cloudRoleName: "my-dataverse-app",
    });
    new ApplicationInsightsTelemetryClient({ connectionString: CONNECTION_STRING });

    expect(useAzureMonitor).toHaveBeenCalledTimes(1);
    const options = useAzureMonitor.mock.calls[0]?.[0] as {
      azureMonitorExporterOptions: { connectionString: string };
      resource: { attributes: Record<string, unknown> };
    };
    expect(options.azureMonitorExporterOptions.connectionString).toBe(CONNECTION_STRING);
    expect(options.resource.attributes["service.name"]).toBe("my-dataverse-app");
  });

  it("warns through the configured logger when a later client asks for another connection string (#384)", () => {
    new ApplicationInsightsTelemetryClient({ connectionString: CONNECTION_STRING });
    const emit = vi.fn();
    const logger = { emit } as unknown as Logger;

    new ApplicationInsightsTelemetryClient({ connectionString: CONNECTION_STRING, logger });
    expect(emit).not.toHaveBeenCalled();

    new ApplicationInsightsTelemetryClient({ connectionString: OTHER_CONNECTION_STRING, logger });
    expect(emit).toHaveBeenCalledTimes(1);
    const record = emit.mock.calls[0]?.[0] as { severityNumber: number; body: string };
    expect(record.severityNumber).toBe(SeverityNumber.WARN);
    expect(record.body).toMatch(/different connectionString/);
    // The connection string carries the instrumentation key: never logged.
    expect(JSON.stringify(record)).not.toContain("InstrumentationKey");
    expect(useAzureMonitor).toHaveBeenCalledTimes(1);
  });

  it("warns once on the console when there is no logger (#384)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    try {
      new ApplicationInsightsTelemetryClient({ connectionString: CONNECTION_STRING });
      new ApplicationInsightsTelemetryClient({ connectionString: OTHER_CONNECTION_STRING });
      new ApplicationInsightsTelemetryClient({ connectionString: OTHER_CONNECTION_STRING });

      expect(warn).toHaveBeenCalledTimes(1);
      expect(String(warn.mock.calls[0]?.[0])).toMatch(/different connectionString/);
      expect(String(warn.mock.calls[0]?.[0])).not.toContain("InstrumentationKey");
    } finally {
      warn.mockRestore();
    }
  });

  it("lets a DataverseClient request succeed (the 1.0.0 repro)", async () => {
    const { client, fake } = createTestClient({
      telemetry: new ApplicationInsightsTelemetryClient({ connectionString: CONNECTION_STRING }),
    });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));

    await expect(client.api("WhoAmI").get()).resolves.toEqual({ UserId: "u1" });
  });
});
