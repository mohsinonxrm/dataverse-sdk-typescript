/**
 * #254: `odataLiteral.parameter()` is the one OData literal serializer for operation parameters.
 * `formatParameterAlias` in entities-runtime and in the generated functions package call it, so the
 * cases from #202 and #224 are its contract, plus the cases where the copies used to differ from
 * core (they wrote invalid values through; the Web API answers 400 or 500 to those).
 */
import { describe, expect, it } from "vitest";
import { DataverseInvalidRequestError } from "../src/errors/NamedErrors.js";
import { odataLiteral } from "../src/odata/literal.js";
import * as core from "../src/index.js";

const id = "6f6a7d4e-1b2c-4d5e-8f90-0123456789ab";
const ref = { logicalName: "account", id: `{${id}}`, entitySetName: "accounts" };

describe("odataLiteral.parameter: the #202 / #224 contract", () => {
  it.each([
    ["Edm.String", "O'Brien", "'O''Brien'"],
    [
      "Edm.String",
      "<fetch><entity name='account'/></fetch>",
      "'<fetch><entity name=''account''/></fetch>'",
    ],
    ["Edm.String", "", "''"],
    ["Edm.String", "''", "''''''"],
    ["Edm.Guid", `{${id}}`, id],
    ["Edm.Int32", 42, "42"],
    ["Edm.Decimal", 1.5, "1.5"],
    ["Edm.Boolean", false, "false"],
    ["Edm.Boolean", true, "true"],
    ["Edm.DateTimeOffset", new Date("2024-05-01T10:00:00Z"), "2024-05-01T10:00:00.000Z"],
    ["Edm.DateTimeOffset", "2024-05-01T10:00:00Z", "2024-05-01T10:00:00Z"],
    ["Edm.Date", new Date("2024-05-01T10:00:00Z"), "2024-05-01"],
    ["Edm.Date", "2024-05-01", "2024-05-01"],
    ["Edm.Duration", "P1D", "duration'P1D'"],
    ["Edm.Binary", "a+b/c==", "binary'a-b_c'"],
  ])("%s %j -> %s", (type, value, expected) => {
    expect(odataLiteral.parameter(value, type)).toBe(expected);
  });

  it("writes null for null and undefined", () => {
    expect(odataLiteral.parameter(null, "Edm.String")).toBe("null");
    expect(odataLiteral.parameter(undefined, "Edm.Int32")).toBe("null");
  });

  it("writes enum values as enum literals, by number or member name", () => {
    expect(odataLiteral.parameter(1, "mscrm.EntityFilters", "EnumerationType")).toBe(
      "Microsoft.Dynamics.CRM.EntityFilters'1'"
    );
    expect(
      odataLiteral.parameter("Entity", "Microsoft.Dynamics.CRM.EntityFilters", "EnumerationType")
    ).toBe("Microsoft.Dynamics.CRM.EntityFilters'Entity'");
  });

  it("writes collections and complex values as JSON", () => {
    expect(
      odataLiteral.parameter(["account", "it's"], "Collection(Edm.String)", "Collection")
    ).toBe('["account","it\'s"]');
    expect(
      odataLiteral.parameter({ PageNumber: 1, Count: 50 }, "mscrm.PagingInfo", "ComplexType")
    ).toBe('{"PageNumber":1,"Count":50}');
  });

  it("writes an entity reference as @odata.id, also inside collections and complex values", () => {
    expect(odataLiteral.parameter(ref, "mscrm.crmbaseentity", "EntityType")).toBe(
      `{"@odata.id":"accounts(${id})"}`
    );
    expect(odataLiteral.parameter([ref], "Collection(mscrm.crmbaseentity)", "Collection")).toBe(
      `[{"@odata.id":"accounts(${id})"}]`
    );
    expect(odataLiteral.parameter({ Target: ref }, "mscrm.Something", "ComplexType")).toBe(
      `{"Target":{"@odata.id":"accounts(${id})"}}`
    );
    // An entity given as data (e.g. RetrieveDuplicates' BusinessEntity) is sent as it is.
    expect(
      odataLiteral.parameter(
        { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Contoso" },
        "mscrm.crmbaseentity",
        "EntityType"
      )
    ).toBe('{"@odata.type":"Microsoft.Dynamics.CRM.account","name":"Contoso"}');
  });

  it("throws a DataverseInvalidRequestError for a reference without an entity set", () => {
    expect(() =>
      odataLiteral.parameter({ logicalName: "account", id }, "mscrm.crmbaseentity", "EntityType")
    ).toThrow(DataverseInvalidRequestError);
  });
});

describe("odataLiteral.parameter: values the old copies wrote through (#254)", () => {
  const rejects = (value: unknown, type: string, kind?: core.ODataParameterKind) => {
    expect(() => odataLiteral.parameter(value, type, kind)).toThrow(DataverseInvalidRequestError);
  };

  it("GUIDs: braces and spaces are removed, case is kept, anything else throws", () => {
    expect(odataLiteral.parameter(` ${id.toUpperCase()} `, "Edm.Guid")).toBe(id.toUpperCase());
    // The Web API answers 500 to MetadataId=@p1?@p1=abc.
    rejects("abc", "Edm.Guid");
    rejects(`${id}) or (1 eq 1`, "Edm.Guid");
    rejects(`'${id}'`, "Edm.Guid");
  });

  it("DateTimeOffset: a zone is required; a date alone is read as midnight UTC", () => {
    expect(odataLiteral.parameter("2024-05-01T10:00:00+02:00", "Edm.DateTimeOffset")).toBe(
      "2024-05-01T10:00:00+02:00"
    );
    expect(odataLiteral.parameter("2024-05-01T10:00:00.1234567Z", "Edm.DateTimeOffset")).toBe(
      "2024-05-01T10:00:00.1234567Z"
    );
    expect(odataLiteral.parameter("2024-05-01", "Edm.DateTimeOffset")).toBe("2024-05-01");
    // "The DateTimeOffset text '…' should be in format 'yyyy-mm-ddThh:mm:ss('.'s+)?(zzzzzz)?'"
    rejects("2024-05-01T10:00:00", "Edm.DateTimeOffset");
    rejects("yesterday", "Edm.DateTimeOffset");
    rejects(new Date("not a date"), "Edm.DateTimeOffset");
  });

  it("Date: a date-time string gives its date; anything else throws", () => {
    expect(odataLiteral.parameter("2024-05-01T23:30:00Z", "Edm.Date")).toBe("2024-05-01");
    rejects("01/05/2024", "Edm.Date");
  });

  it("integers: Int64 takes a bigint, digits as a string; NaN and fractions throw", () => {
    expect(odataLiteral.parameter(9007199254740993n, "Edm.Int64")).toBe("9007199254740993");
    expect(odataLiteral.parameter("9007199254740993", "Edm.Int64")).toBe("9007199254740993");
    expect(odataLiteral.parameter(-7, "Edm.Int16")).toBe("-7");
    // The old copies wrote NaN as null, which the Web API reads as a missing parameter.
    rejects(Number.NaN, "Edm.Int32");
    // "Expression of type 'Edm.Single' cannot be converted to type 'Edm.Int32'"
    rejects(1.5, "Edm.Int32");
    rejects("12abc", "Edm.Int32");
    rejects(true, "Edm.Int32");
  });

  it("decimals and doubles: finite numbers, bigints and numeric strings", () => {
    expect(odataLiteral.parameter(0.1, "Edm.Double")).toBe("0.1");
    expect(odataLiteral.parameter(10n, "Edm.Decimal")).toBe("10");
    expect(odataLiteral.parameter("1000.25", "Edm.Decimal")).toBe("1000.25");
    rejects(Number.POSITIVE_INFINITY, "Edm.Double");
    rejects("1,5", "Edm.Decimal");
  });

  it("booleans: true and false, also as strings; anything else throws", () => {
    expect(odataLiteral.parameter("true", "Edm.Boolean")).toBe("true");
    rejects(1, "Edm.Boolean");
    rejects("yes", "Edm.Boolean");
  });

  it("strings: a number or boolean is quoted as text", () => {
    expect(odataLiteral.parameter(42, "Edm.String")).toBe("'42'");
    expect(odataLiteral.parameter(false, "Edm.String")).toBe("'false'");
  });

  it("enums: members split on commas, numbers kept; a quote or a bad name throws", () => {
    const type = "mscrm.EntityFilters";
    expect(odataLiteral.parameter("Entity, Attributes", type, "EnumerationType")).toBe(
      "Microsoft.Dynamics.CRM.EntityFilters'Entity,Attributes'"
    );
    expect(odataLiteral.parameter("1,2", type, "EnumerationType")).toBe(
      "Microsoft.Dynamics.CRM.EntityFilters'1,2'"
    );
    expect(odataLiteral.parameter(-1, type, "EnumerationType")).toBe(
      "Microsoft.Dynamics.CRM.EntityFilters'-1'"
    );
    rejects("Entity'", type, "EnumerationType");
    rejects("", type, "EnumerationType");
    rejects(1.5, type, "EnumerationType");
  });

  it("durations and binaries are checked", () => {
    expect(odataLiteral.parameter("PT1H30M", "Edm.Duration")).toBe("duration'PT1H30M'");
    expect(odataLiteral.parameter("-P2DT0.5S", "Edm.Duration")).toBe("duration'-P2DT0.5S'");
    rejects("P", "Edm.Duration");
    rejects("P1Y", "Edm.Duration");
    rejects("1 day", "Edm.Duration");
    expect(odataLiteral.parameter("AQID", "Edm.Binary")).toBe("binary'AQID'");
    rejects("not base64!", "Edm.Binary");
  });

  it("other types: a number as written (finite only), text as it is", () => {
    expect(odataLiteral.parameter(1.25, "Edm.Something")).toBe("1.25");
    expect(odataLiteral.parameter(true, "Edm.Something")).toBe("true");
    expect(odataLiteral.parameter("raw", "Edm.Something")).toBe("raw");
    rejects(Number.NaN, "Edm.Something");
  });
});

describe("odataLiteral: JSON, references, enums from text (#254)", () => {
  it("recordPath builds <entity set>(<id>) and keeps an alternate key as written", () => {
    expect(odataLiteral.recordPath(ref)).toBe(`accounts(${id})`);
    expect(
      odataLiteral.recordPath({
        logicalName: "account",
        id: "accountnumber='A1'",
        entitySetName: "accounts",
      })
    ).toBe("accounts(accountnumber='A1')");
    expect(() => odataLiteral.recordPath({ logicalName: "account", id })).toThrow(
      DataverseInvalidRequestError
    );
  });

  it('reference writes {"@odata.id": …}', () => {
    expect(odataLiteral.reference(ref)).toBe(`{"@odata.id":"accounts(${id})"}`);
  });

  it("json turns nested references into @odata.id and leaves other values alone", () => {
    expect(odataLiteral.json({ a: [ref], b: "it's", c: null })).toBe(
      `{"a":[{"@odata.id":"accounts(${id})"}],"b":"it's","c":null}`
    );
  });

  it("enum splits a string on commas", () => {
    expect(odataLiteral.enum("Microsoft.Dynamics.CRM.EntityFilters", "Entity,Attributes")).toBe(
      "Microsoft.Dynamics.CRM.EntityFilters'Entity,Attributes'"
    );
    expect(() => odataLiteral.enum("Microsoft.Dynamics.CRM.EntityFilters", "Entity,")).toThrow(
      DataverseInvalidRequestError
    );
  });

  it("duration and binary reject values of the wrong type", () => {
    expect(() => odataLiteral.duration(1 as unknown as string)).toThrow(
      DataverseInvalidRequestError
    );
    expect(() => odataLiteral.binary(1 as unknown as string)).toThrow(DataverseInvalidRequestError);
  });

  it("is exported from the package root, with its types", () => {
    const kind: core.ODataParameterKind = "Collection";
    const reference: core.ODataRecordReference = ref;
    expect(core.odataLiteral.parameter([reference], "Collection(mscrm.crmbaseentity)", kind)).toBe(
      `[{"@odata.id":"accounts(${id})"}]`
    );
  });
});
