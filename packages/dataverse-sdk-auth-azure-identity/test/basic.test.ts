import { describe, it, expect } from "vitest";

describe("dataverse-sdk-auth-azure-identity", () => {
  it("should export AzureIdentityTokenProvider", async () => {
    const module = await import("../src/index.js");
    expect(module.AzureIdentityTokenProvider).toBeDefined();
  });
});
