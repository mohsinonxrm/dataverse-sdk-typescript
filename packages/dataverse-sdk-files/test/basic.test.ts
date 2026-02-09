import { describe, it, expect } from "vitest";
import { FileColumnClient } from "../src/index.js";

describe("@mohsinonxrm/dataverse-sdk-files", () => {
  it("should export FileColumnClient", () => {
    expect(FileColumnClient).toBeDefined();
  });

  it("FileColumnClient should be a constructor", () => {
    expect(typeof FileColumnClient).toBe("function");
  });
});
