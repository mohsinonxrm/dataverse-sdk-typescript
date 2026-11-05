import { describe, it, expect } from "vitest";
import { ApplicationInsightsTelemetryClient } from "../src/ApplicationInsightsTelemetryClient.js";

describe("ApplicationInsightsTelemetryClient", () => {
  it("should be constructable without starting Azure Monitor", () => {
    expect(new ApplicationInsightsTelemetryClient()).toBeDefined();
    expect(new ApplicationInsightsTelemetryClient({ disableTelemetry: true })).toBeDefined();
  });

  it("should not throw from any method with the global no-op providers", () => {
    const client = new ApplicationInsightsTelemetryClient();
    expect(() => {
      client.trackEvent("test");
      client.trackDependency("test", {});
      client.trackException(new Error("test"));
    }).not.toThrow();
  });
});
