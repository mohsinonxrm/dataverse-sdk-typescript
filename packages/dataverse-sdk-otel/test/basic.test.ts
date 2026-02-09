import { describe, it, expect } from "vitest";
import { OpenTelemetryClient } from "../src/OpenTelemetryClient.js";

// Mock tracer
const mockTracer = {
  startSpan: () => ({}),
  startActiveSpan: () => ({}),
} as any;

describe("OpenTelemetryClient", () => {
  it("should be constructable", () => {
    const client = new OpenTelemetryClient({
      tracer: mockTracer,
    });
    expect(client).toBeDefined();
  });

  it("should throw on trackEvent (not implemented)", () => {
    const client = new OpenTelemetryClient({
      tracer: mockTracer,
    });
    expect(() => client.trackEvent("test")).toThrow("not implemented");
  });

  it("should throw on trackDependency (not implemented)", () => {
    const client = new OpenTelemetryClient({
      tracer: mockTracer,
    });
    expect(() => client.trackDependency("test", {})).toThrow("not implemented");
  });

  it("should throw on trackException (not implemented)", () => {
    const client = new OpenTelemetryClient({
      tracer: mockTracer,
    });
    expect(() => client.trackException(new Error("test"))).toThrow("not implemented");
  });
});
