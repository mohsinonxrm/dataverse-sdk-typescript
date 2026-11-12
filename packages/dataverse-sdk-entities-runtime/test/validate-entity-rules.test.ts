/**
 * #433: the rules `validateEntity()` added to #347's: the decimal places of a decimal or currency
 * column (`precision`, with the organization's pricing precision or the record currency's precision
 * as options), date-only and date-and-time values and Dataverse's date range, file and image sizes
 * (`maxSizeInKB`), and a status reason that belongs to the state (`optionStates`).
 */
import { describe, expect, it } from "vitest";
import { type AttributeMetadata, type EntityMetadata, validateEntity } from "../src/index.js";

function column(
  logicalName: string,
  attributeType: string,
  extra: Partial<AttributeMetadata> = {}
): AttributeMetadata {
  return {
    logicalName,
    schemaName: logicalName,
    attributeType,
    typescriptType: "unknown",
    ...extra,
  };
}

const orderMetadata: EntityMetadata = {
  typeName: "Microsoft.Dynamics.CRM.contoso_order",
  logicalName: "contoso_order",
  collectionName: "contoso_orders",
  primaryIdAttribute: "contoso_orderid",
  attributeTypes: {},
  navigation: {},
  attributes: {
    contoso_discount: column("contoso_discount", "Decimal", {
      odataType: "Edm.Decimal",
      precision: 2,
      minValue: 0,
      maxValue: 100,
    }),
    contoso_amount: column("contoso_amount", "Money", { odataType: "Edm.Decimal", precision: 0 }),
    contoso_listprice: column("contoso_listprice", "Money", {
      odataType: "Edm.Decimal",
      precision: "pricing",
    }),
    contoso_total: column("contoso_total", "Money", {
      odataType: "Edm.Decimal",
      precision: "currency",
    }),
    contoso_quantity: column("contoso_quantity", "Double", { odataType: "Edm.Double" }),
    contoso_duedate: column("contoso_duedate", "DateTime", { odataType: "Edm.Date" }),
    contoso_shippedon: column("contoso_shippedon", "DateTime", {
      odataType: "Edm.DateTimeOffset",
    }),
    contoso_photo: column("contoso_photo", "Virtual", { odataType: "Edm.Binary", maxSizeInKB: 1 }),
    statecode: column("statecode", "State", { optionValues: [0, 1] }),
    statuscode: column("statuscode", "Status", {
      optionValues: [1, 2, 3],
      optionStates: { 1: 0, 2: 1, 3: 1 },
    }),
  },
};

const codes = (body: object, options?: Parameters<typeof validateEntity>[2]) =>
  validateEntity(body, orderMetadata, { mode: "update", ...options }).map((i) => [
    i.property,
    i.code,
  ]);

describe("validateEntity: decimal places (#433)", () => {
  it("a decimal column keeps its precision", () => {
    expect(codes({ contoso_discount: 12.5, contoso_amount: 100 })).toEqual([]);
    expect(codes({ contoso_discount: 12 })).toEqual([]);
    expect(codes({ contoso_discount: 12.345, contoso_amount: 100.5 })).toEqual([
      ["contoso_discount", "precision"],
      ["contoso_amount", "precision"],
    ]);
    expect(validateEntity({ contoso_discount: 0.125 }, orderMetadata, { mode: "update" })).toEqual([
      {
        property: "contoso_discount",
        code: "precision",
        message: "contoso_discount is 0.125; the column keeps 2 decimal places.",
      },
    ]);
  });

  it("counts decimal places in exponent notation", () => {
    expect(codes({ contoso_discount: 1e-7 })).toEqual([["contoso_discount", "precision"]]);
    expect(codes({ contoso_discount: 1e2 })).toEqual([]);
  });

  it("a range issue is reported before the precision", () => {
    expect(codes({ contoso_discount: 100.555 })).toEqual([["contoso_discount", "maxValue"]]);
  });

  it("a currency column on the pricing or the currency precision needs it as an option", () => {
    // Not known from the metadata: not checked
    expect(codes({ contoso_listprice: 9.12345, contoso_total: 9.12345 })).toEqual([]);
    expect(
      codes(
        { contoso_listprice: 9.12345, contoso_total: 9.12345 },
        { pricingPrecision: 4, currencyPrecision: 2 }
      )
    ).toEqual([
      ["contoso_listprice", "precision"],
      ["contoso_total", "precision"],
    ]);
    expect(
      codes(
        { contoso_listprice: 9.1234, contoso_total: 9.12 },
        { pricingPrecision: 4, currencyPrecision: 2 }
      )
    ).toEqual([]);
    // The pricing precision applies only to the "pricing" columns, the currency's to the others
    expect(codes({ contoso_total: 9.1234 }, { pricingPrecision: 4 })).toEqual([]);
    expect(codes({ contoso_listprice: 9.123 }, { pricingPrecision: 0 })).toEqual([
      ["contoso_listprice", "precision"],
    ]);
    expect(
      validateEntity({ contoso_listprice: 1.5 }, orderMetadata, {
        mode: "update",
        pricingPrecision: 0,
      })[0].message
    ).toBe("contoso_listprice is 1.5; the column keeps 0 decimal places.");
  });

  it("a column without a precision isn't checked", () => {
    expect(codes({ contoso_quantity: 1.23456789 })).toEqual([]);
  });

  it("null and undefined aren't checked", () => {
    expect(codes({ contoso_discount: null, contoso_amount: undefined })).toEqual([]);
  });
});

describe("validateEntity: dates (#433)", () => {
  it("a date-only column takes yyyy-mm-dd", () => {
    expect(codes({ contoso_duedate: "2024-12-31" })).toEqual([]);
    expect(codes({ contoso_duedate: "2024-02-29" })).toEqual([]);
    for (const value of [
      "2024-12-31T00:00:00Z",
      "31/12/2024",
      "2024-1-5",
      "2023-02-29",
      "2024-13-01",
      "2024-04-31",
      "",
      new Date("2024-12-31"),
      20241231,
    ]) {
      expect(codes({ contoso_duedate: value }), String(value)).toEqual([
        ["contoso_duedate", "invalidDate"],
      ]);
    }
  });

  it("a date-only column takes dates from 1753-01-01", () => {
    expect(codes({ contoso_duedate: "1753-01-01" })).toEqual([]);
    expect(codes({ contoso_duedate: "9999-12-31" })).toEqual([]);
    expect(validateEntity({ contoso_duedate: "1752-12-31" }, orderMetadata)).toEqual([
      {
        property: "contoso_duedate",
        code: "dateOutOfRange",
        message:
          "contoso_duedate is 1752-12-31; Dataverse stores dates from 1753-01-01 to 9999-12-31.",
      },
    ]);
  });

  it("a date and time column takes ISO 8601 text or a Date", () => {
    for (const value of [
      "2024-12-31T09:30:00Z",
      "2024-12-31T09:30:00.123Z",
      "2024-12-31T09:30:00+05:30",
      "2024-12-31T09:30Z",
      "2024-12-31T09:30:00",
      "2024-12-31",
      new Date("2024-12-31T09:30:00Z"),
    ]) {
      expect(codes({ contoso_shippedon: value }), String(value)).toEqual([]);
    }
    for (const value of [
      "yesterday",
      "2024-12-31 09:30:00",
      "2024-12-31T24:00:00Z",
      "2024-12-31T09:60:00Z",
      "2024-02-30T09:30:00Z",
      new Date("not a date"),
      1735637400000,
      true,
    ]) {
      expect(codes({ contoso_shippedon: value }), String(value)).toEqual([
        ["contoso_shippedon", "invalidDate"],
      ]);
    }
  });

  it("a date and time column takes Dataverse's range, in UTC", () => {
    expect(codes({ contoso_shippedon: "1753-01-01T00:00:00Z" })).toEqual([]);
    expect(codes({ contoso_shippedon: "9999-12-31T23:59:59Z" })).toEqual([]);
    expect(codes({ contoso_shippedon: "1753-01-01T03:00:00-02:00" })).toEqual([]);
    for (const value of [
      "1752-12-31T23:59:59Z",
      // 1752-12-31T23:30:00Z
      "1753-01-01T00:30:00+01:00",
      // 10000-01-01T01:00:00Z
      "9999-12-31T23:00:00-02:00",
      "0099-01-01T00:00:00Z",
      new Date(Date.UTC(1700, 0, 1)),
    ]) {
      expect(codes({ contoso_shippedon: value }), String(value)).toEqual([
        ["contoso_shippedon", "dateOutOfRange"],
      ]);
    }
  });

  it("null clears a date; undefined is skipped", () => {
    expect(codes({ contoso_duedate: null, contoso_shippedon: undefined })).toEqual([]);
  });

  it("metadata without an OData type: a DateTime column is a date and time", () => {
    const bare: EntityMetadata = {
      ...orderMetadata,
      attributes: { createdon: column("createdon", "DateTime") },
    };
    expect(validateEntity({ createdon: "2024-01-01" }, bare)).toEqual([]);
    expect(validateEntity({ createdon: "1600-01-01" }, bare).map((i) => i.code)).toEqual([
      "dateOutOfRange",
    ]);
  });
});

describe("validateEntity: file and image sizes (#433)", () => {
  // 1024 bytes are 1368 base64 characters, the last two padding
  const base64Of = (bytes: number) => btoa("\0".repeat(bytes));

  it("base64 text", () => {
    expect(codes({ contoso_photo: base64Of(1024) })).toEqual([]);
    expect(codes({ contoso_photo: base64Of(1025) })).toEqual([["contoso_photo", "maxSize"]]);
    expect(codes({ contoso_photo: base64Of(1023) })).toEqual([]);
    expect(validateEntity({ contoso_photo: base64Of(2048) }, orderMetadata)).toEqual([
      {
        property: "contoso_photo",
        code: "maxSize",
        message: "contoso_photo is 2 KB; the column takes at most 1 KB.",
      },
    ]);
  });

  it("an ArrayBuffer, a typed array or a Blob", () => {
    expect(codes({ contoso_photo: new ArrayBuffer(1024) })).toEqual([]);
    expect(codes({ contoso_photo: new ArrayBuffer(1025) })).toEqual([["contoso_photo", "maxSize"]]);
    expect(codes({ contoso_photo: new Uint8Array(1025) })).toEqual([["contoso_photo", "maxSize"]]);
    expect(codes({ contoso_photo: new Blob([new Uint8Array(1025)]) })).toEqual([
      ["contoso_photo", "maxSize"],
    ]);
    expect(codes({ contoso_photo: new Blob([new Uint8Array(10)]) })).toEqual([]);
  });

  it("null, undefined and values it can't measure aren't checked", () => {
    expect(codes({ contoso_photo: null })).toEqual([]);
    expect(codes({ contoso_photo: undefined })).toEqual([]);
    expect(codes({ contoso_photo: 42 })).toEqual([]);
  });
});

describe("validateEntity: status reason and state (#433)", () => {
  it("a status reason that belongs to the state", () => {
    expect(codes({ statecode: 0, statuscode: 1 })).toEqual([]);
    expect(codes({ statecode: 1, statuscode: 3 })).toEqual([]);
  });

  it("a status reason of another state", () => {
    expect(
      validateEntity({ statecode: 0, statuscode: 2 }, orderMetadata, { mode: "update" })
    ).toEqual([
      {
        property: "statuscode",
        code: "invalidStatus",
        message: "statuscode 2 belongs to statecode 1, not 0.",
      },
    ]);
  });

  it("isn't checked without both, or when either already has an issue", () => {
    // The record's state isn't known
    expect(codes({ statuscode: 2 })).toEqual([]);
    expect(codes({ statecode: 0 })).toEqual([]);
    expect(codes({ statecode: null, statuscode: 2 })).toEqual([]);
    // Not an option: reported once, as invalidOption
    expect(codes({ statecode: 0, statuscode: 9 })).toEqual([["statuscode", "invalidOption"]]);
    expect(codes({ statecode: 5, statuscode: 2 })).toEqual([["statecode", "invalidOption"]]);
  });

  it("isn't checked without optionStates", () => {
    const { statuscode, ...rest } = orderMetadata.attributes ?? {};
    const metadata: EntityMetadata = {
      ...orderMetadata,
      attributes: { ...rest, statuscode: { ...statuscode, optionStates: undefined } },
    };
    expect(validateEntity({ statecode: 0, statuscode: 2 }, metadata, { mode: "update" })).toEqual(
      []
    );
  });
});
