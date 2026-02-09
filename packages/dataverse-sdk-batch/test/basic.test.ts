import { describe, it, expect } from "vitest";

describe("dataverse-sdk-batch", () => {
  it("should export BatchRequestBuilder", async () => {
    const module = await import("../src/index.js");
    expect(module.BatchRequestBuilder).toBeDefined();
  });

  it("should export DataverseBatchError", async () => {
    const module = await import("../src/index.js");
    expect(module.DataverseBatchError).toBeDefined();
  });
});
