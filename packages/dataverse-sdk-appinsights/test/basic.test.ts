import { describe, it, expect } from "vitest";
import { ApplicationInsightsTelemetryClient } from "../src/ApplicationInsightsTelemetryClient.js";

describe("ApplicationInsightsTelemetryClient", () => {
  it("should be constructable", () => {
    const client = new ApplicationInsightsTelemetryClient({
      connectionString: "InstrumentationKey=test",
    });
    expect(client).toBeDefined();
  });

  it("should throw on trackEvent (not implemented)", () => {
    const client = new ApplicationInsightsTelemetryClient({
      connectionString: "InstrumentationKey=test",
    });
    expect(() => client.trackEvent("test")).toThrow("not implemented");
  });

  it("should throw on trackDependency (not implemented)", () => {
    const client = new ApplicationInsightsTelemetryClient({
      connectionString: "InstrumentationKey=test",
    });
    expect(() => client.trackDependency("test", {})).toThrow("not implemented");
  });

  it("should throw on trackException (not implemented)", () => {
    const client = new ApplicationInsightsTelemetryClient({
      connectionString: "InstrumentationKey=test",
    });
    expect(() => client.trackException(new Error("test"))).toThrow("not implemented");
  });
});
