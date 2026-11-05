import { describe, expect, it } from "vitest";
import own from "../src/spans.ts?raw";
import twin from "../../dataverse-sdk-appinsights/src/spans.ts?raw";

// `src/spans.ts` is duplicated in the Application Insights adapter instead of shared through a
// package dependency. This keeps the two copies from drifting apart.
describe("spans.ts", () => {
  it("is identical in dataverse-sdk-otel and dataverse-sdk-appinsights", () => {
    expect(own.length).toBeGreaterThan(0);
    expect(twin).toBe(own);
  });
});
