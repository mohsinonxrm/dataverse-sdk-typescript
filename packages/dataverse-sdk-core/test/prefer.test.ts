import { describe, it, expect } from "vitest";
import { Prefer } from "../src/abstractions/options.js";

describe("Prefer helpers", () => {
  it("brands and formats values", () => {
    expect(Prefer.returnRepresentation()).toContain("return=representation");
    expect(Prefer.includeAnnotations("*")).toContain("odata.include-annotations");
    expect(Prefer.continueOnError()).toContain("odata.continue-on-error");
  });
});
