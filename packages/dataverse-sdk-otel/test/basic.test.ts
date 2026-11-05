import { describe, it, expect } from "vitest";
import { OpenTelemetryClient } from "../src/OpenTelemetryClient.js";

describe("OpenTelemetryClient", () => {
  it("should be constructable with or without options", () => {
    expect(new OpenTelemetryClient()).toBeDefined();
    expect(new OpenTelemetryClient({ disableTelemetry: true })).toBeDefined();
  });

  it("should not throw from any method with the global no-op tracer", () => {
    const client = new OpenTelemetryClient();
    expect(() => {
      client.trackEvent("test");
      client.trackDependency("test", {});
      client.trackException(new Error("test"));
    }).not.toThrow();
  });
});
