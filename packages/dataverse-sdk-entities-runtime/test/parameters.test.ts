import { describe, expect, it } from "vitest";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias, formatRecordPath } from "../src/index.js";

const id = "6f6a7d4e-1b2c-4d5e-8f90-0123456789ab";

describe("formatParameterAlias (#77)", () => {
  it.each([
    ["Edm.String", "O'Brien", "'O''Brien'"],
    [
      "Edm.String",
      "<fetch><entity name='account'/></fetch>",
      "'<fetch><entity name=''account''/></fetch>'",
    ],
    ["Edm.Guid", `{${id}}`, id],
    ["Edm.Int32", 42, "42"],
    ["Edm.Decimal", 1.5, "1.5"],
    ["Edm.Boolean", false, "false"],
    ["Edm.DateTimeOffset", new Date("2024-05-01T10:00:00Z"), "2024-05-01T10:00:00.000Z"],
    ["Edm.DateTimeOffset", "2024-05-01T10:00:00Z", "2024-05-01T10:00:00Z"],
    ["Edm.Date", new Date("2024-05-01T10:00:00Z"), "2024-05-01"],
    ["Edm.Date", "2024-05-01", "2024-05-01"],
    ["Edm.Duration", "P1D", "duration'P1D'"],
    ["Edm.Binary", "a+b/c==", "binary'a-b_c'"],
  ])("%s %j -> %s", (type, value, expected) => {
    expect(formatParameterAlias(value, type)).toBe(expected);
  });

  it("writes null for null and undefined", () => {
    expect(formatParameterAlias(null, "Edm.String")).toBe("null");
    expect(formatParameterAlias(undefined, "Edm.Int32")).toBe("null");
  });

  it("writes enum values as enum literals, by number or member name", () => {
    expect(formatParameterAlias(1, "mscrm.EntityFilters", "EnumerationType")).toBe(
      "Microsoft.Dynamics.CRM.EntityFilters'1'"
    );
    expect(
      formatParameterAlias("Entity", "Microsoft.Dynamics.CRM.EntityFilters", "EnumerationType")
    ).toBe("Microsoft.Dynamics.CRM.EntityFilters'Entity'");
  });

  it("writes collections and complex values as JSON", () => {
    expect(formatParameterAlias(["account", "it's"], "Collection(Edm.String)", "Collection")).toBe(
      '["account","it\'s"]'
    );
    expect(
      formatParameterAlias({ PageNumber: 1, Count: 50 }, "mscrm.PagingInfo", "ComplexType")
    ).toBe('{"PageNumber":1,"Count":50}');
  });

  it("writes an entity reference as @odata.id, also inside collections and complex values", () => {
    const ref = { logicalName: "account", id: `{${id}}`, entitySetName: "accounts" };
    expect(formatParameterAlias(ref, "mscrm.crmbaseentity", "EntityType")).toBe(
      `{"@odata.id":"accounts(${id})"}`
    );
    expect(formatParameterAlias([ref], "Collection(mscrm.crmbaseentity)", "Collection")).toBe(
      `[{"@odata.id":"accounts(${id})"}]`
    );
    // An entity given as data (e.g. RetrieveDuplicates' BusinessEntity) is sent as it is.
    expect(
      formatParameterAlias(
        { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Contoso" },
        "mscrm.crmbaseentity",
        "EntityType"
      )
    ).toBe('{"@odata.type":"Microsoft.Dynamics.CRM.account","name":"Contoso"}');
  });
});

describe("formatRecordPath (#77)", () => {
  it("builds <entity set>(<id>)", () => {
    expect(formatRecordPath({ logicalName: "account", id, entitySetName: "accounts" })).toBe(
      `accounts(${id})`
    );
  });

  it("throws a DataverseInvalidRequestError without an entity set", () => {
    expect(() => formatRecordPath({ logicalName: "account", id })).toThrow(
      DataverseInvalidRequestError
    );
  });
});
