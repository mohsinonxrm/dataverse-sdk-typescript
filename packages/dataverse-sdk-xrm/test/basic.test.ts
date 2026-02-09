import { describe, it, expect } from "vitest";

describe("dataverse-sdk-xrm", () => {
  it("should export OrganizationService", async () => {
    const module = await import("../src/index.js");
    expect(module.OrganizationService).toBeDefined();
  });

  it("should export types", async () => {
    // Type exports don't appear at runtime, but this verifies the module loads
    const module = await import("../src/index.js");
    expect(module).toBeDefined();
  });
});
