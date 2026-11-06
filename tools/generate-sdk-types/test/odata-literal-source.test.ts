/**
 * #254 drift guard: the functions generator writes `internal/odataLiteral.ts` exactly as committed
 * in packages/dataverse-sdk-functions, and that file only calls core's `odataLiteral`, so there is
 * one OData literal serializer. A hand edit to either side fails here.
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { ODATA_LITERAL_SOURCE } from "../src/generators/functions-generator.js";

const COMMITTED = fileURLToPath(
  new URL("../../../packages/dataverse-sdk-functions/src/internal/odataLiteral.ts", import.meta.url)
);

describe("functions internal/odataLiteral.ts (#254)", () => {
  it("is emitted exactly as committed", async () => {
    expect(ODATA_LITERAL_SOURCE).toBe(await readFile(COMMITTED, "utf8"));
  });

  it("delegates to core's odataLiteral instead of holding its own literal rules", () => {
    expect(ODATA_LITERAL_SOURCE).toContain(
      "return odataLiteral.parameter(value, odataType, kind);"
    );
    expect(ODATA_LITERAL_SOURCE).toContain("return odataLiteral.recordPath(reference);");
    expect(ODATA_LITERAL_SOURCE).not.toMatch(/replace\(|JSON\.stringify|switch \(/);
  });
});
