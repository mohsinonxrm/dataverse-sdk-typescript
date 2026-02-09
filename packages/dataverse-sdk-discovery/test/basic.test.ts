import { describe, it, expect } from "vitest";
import { DiscoveryClient } from "../src/DiscoveryClient.js";

describe("@mohsinonxrm/dataverse-sdk-discovery", () => {
  it("exports DiscoveryClient", () => {
    expect(DiscoveryClient).toBeDefined();
  });
});
