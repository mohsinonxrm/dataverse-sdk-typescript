/**
 * #285: `serviceName` is gone from `OpenTelemetryConfig`. It was ignored (`service.name` is a
 * resource attribute set on the OpenTelemetry SDK), so passing it is now a type error.
 */
import { describe, expect, expectTypeOf, it } from "vitest";
import { OpenTelemetryClient } from "../src/OpenTelemetryClient.js";
import type { OpenTelemetryConfig } from "../src/types.js";

describe("#285: removed OpenTelemetryConfig options", () => {
  it("serviceName is not an option", () => {
    expectTypeOf<OpenTelemetryConfig>().not.toHaveProperty("serviceName");
    // @ts-expect-error -- serviceName was removed
    const config: OpenTelemetryConfig = { serviceName: "my-app" };
    expect(new OpenTelemetryClient(config)).toBeDefined();
  });
});
