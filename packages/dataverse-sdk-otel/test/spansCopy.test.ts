import { describe, expect, it } from "vitest";
import ownSpans from "../src/spans.ts?raw";
import twinSpans from "../../dataverse-sdk-appinsights/src/spans.ts?raw";
import ownRedaction from "../src/redaction.ts?raw";
import twinRedaction from "../../dataverse-sdk-appinsights/src/redaction.ts?raw";

// `src/spans.ts` and `src/redaction.ts` are duplicated in the Application Insights adapter instead
// of shared through a package dependency. This keeps the copies from drifting apart.
describe("shared adapter files", () => {
  it("spans.ts is identical in dataverse-sdk-otel and dataverse-sdk-appinsights", () => {
    expect(ownSpans.length).toBeGreaterThan(0);
    expect(twinSpans).toBe(ownSpans);
  });

  it("redaction.ts is identical in dataverse-sdk-otel and dataverse-sdk-appinsights", () => {
    expect(ownRedaction.length).toBeGreaterThan(0);
    expect(twinRedaction).toBe(ownRedaction);
  });

  it("redaction.ts imports nothing, so the browser entry pulls in no OpenTelemetry", () => {
    expect(ownRedaction).not.toMatch(/^\s*import\b/m);
  });
});
