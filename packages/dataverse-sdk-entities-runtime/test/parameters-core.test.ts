/**
 * #254: `formatParameterAlias` and `formatRecordPath` call core's `odataLiteral`, the one OData
 * literal serializer, so dataverse-gen output and the functions package write the same literals.
 */
import { describe, expect, it } from "vitest";
import { DataverseInvalidRequestError, odataLiteral } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias, formatRecordPath, type ParameterKind } from "../src/index.js";

const id = "6f6a7d4e-1b2c-4d5e-8f90-0123456789ab";
const ref = { logicalName: "account", id: `{${id}}`, entitySetName: "accounts" };

describe("#254: formatParameterAlias is core's odataLiteral.parameter", () => {
  it.each<[string, unknown, string, ParameterKind?]>([
    ["string with quotes", "it's 'quoted'", "Edm.String"],
    ["GUID in braces", `{${id}}`, "Edm.Guid"],
    ["Int64 bigint", 9007199254740993n, "Edm.Int64"],
    ["decimal", 1000.25, "Edm.Decimal"],
    ["boolean", false, "Edm.Boolean"],
    ["Date", new Date("2024-05-01T10:00:00Z"), "Edm.DateTimeOffset"],
    ["date-time to date", "2024-05-01T10:00:00Z", "Edm.Date"],
    ["enum names", "Entity, Attributes", "mscrm.EntityFilters", "EnumerationType"],
    ["entity reference", ref, "mscrm.crmbaseentity", "EntityType"],
    ["collection of references", [ref], "Collection(mscrm.crmbaseentity)", "Collection"],
    ["null", null, "Edm.Guid"],
  ])("%s", (_label, value, type, kind) => {
    expect(formatParameterAlias(value, type, kind)).toBe(odataLiteral.parameter(value, type, kind));
  });

  it("writes bigint Int64 values in full and rejects values the Web API refuses", () => {
    expect(formatParameterAlias(9007199254740993n, "Edm.Int64")).toBe("9007199254740993");
    expect(() => formatParameterAlias("abc", "Edm.Guid")).toThrow(DataverseInvalidRequestError);
    expect(() => formatParameterAlias(Number.NaN, "Edm.Int32")).toThrow(
      DataverseInvalidRequestError
    );
    expect(() => formatParameterAlias("Entity'", "mscrm.EntityFilters", "EnumerationType")).toThrow(
      DataverseInvalidRequestError
    );
  });

  it("formatRecordPath is odataLiteral.recordPath", () => {
    expect(formatRecordPath(ref)).toBe(odataLiteral.recordPath(ref));
  });
});
