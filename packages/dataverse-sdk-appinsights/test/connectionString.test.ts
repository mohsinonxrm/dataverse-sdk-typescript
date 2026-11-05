import { describe, expect, it, vi } from "vitest";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";

// The real distro registers global providers and exports over the network; only check the call.
const { useAzureMonitor } = vi.hoisted(() => ({ useAzureMonitor: vi.fn() }));
vi.mock("@azure/monitor-opentelemetry", () => ({ useAzureMonitor }));

const { ApplicationInsightsTelemetryClient } = await import("../src/index.js");

const CONNECTION_STRING = "InstrumentationKey=00000000-0000-0000-0000-000000000000";

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

  it("lets a DataverseClient request succeed (the 1.0.0 repro)", async () => {
    const { client, fake } = createTestClient({
      telemetry: new ApplicationInsightsTelemetryClient({ connectionString: CONNECTION_STRING }),
    });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));

    await expect(client.api("WhoAmI").get()).resolves.toEqual({ UserId: "u1" });
  });
});
