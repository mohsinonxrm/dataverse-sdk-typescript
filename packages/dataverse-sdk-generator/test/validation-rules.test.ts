/**
 * #347: the generated entity metadata carries each column's constraints (MaxLength,
 * MinValue/MaxValue, option values, IsValidForCreate/IsValidForUpdate) and each lookup's
 * (RequiredLevel, IsValidForCreate/IsValidForUpdate), so the runtime's opt-in `validateEntity()`
 * can check a body before it's sent. #433 adds a decimal or currency column's precision, a file or
 * image column's MaxSizeInKB and the state of each status reason.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import {
  createEntityReference,
  type EntityMetadata,
  validateEntity,
} from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import {
  compileToJs,
  fixtureMetadataService,
  generateFixture,
  importGenerated,
  scratchFolders,
  typecheck,
} from "./fixtures/compile.js";
import { VALIDATION_EDMX, VALIDATION_ENTITY_METADATA } from "./fixtures/validation-metadata.js";
import { WRITE_EDMX, WRITE_ENTITY_METADATA } from "./fixtures/write-metadata.js";

const scratch = scratchFolders("validation-rules");
afterAll(scratch.cleanup);

const id = "00000000-0000-0000-0000-000000000001";

describe("validation rules in the generated metadata (#347)", () => {
  let dir = "";
  let account: EntityMetadata;
  let contact: EntityMetadata;

  beforeAll(async () => {
    dir = await scratch.create();
    await generateFixture(fixtureMetadataService(WRITE_EDMX, WRITE_ENTITY_METADATA), dir, {
      entities: ["account", "contact", "systemuser"],
    });
    await compileToJs(dir);
    const entities = await importGenerated<{
      AccountMetadata: EntityMetadata;
      ContactMetadata: EntityMetadata;
    }>(dir, "entities/index.js");
    account = entities.AccountMetadata;
    contact = entities.ContactMetadata;
  });

  it("the metadata with constraints type-checks", async () => {
    expect(await typecheck(dir)).toEqual([]);
  });

  it("columns carry their constraints", () => {
    expect(account.attributes?.name).toMatchObject({ maxLength: 160, isRequired: true });
    expect(account.attributes?.numberofemployees).toMatchObject({ minValue: 0, maxValue: 1000000 });
    expect(account.attributes?.industrycode.optionValues).toEqual([1, 2]);
    expect(account.attributes?.statecode).toMatchObject({
      isValidForCreate: false,
      optionValues: [0, 1],
    });
    expect(account.attributes?.statecode.isValidForUpdate).toBeUndefined();
    expect(account.attributes?.accountid).toMatchObject({ isValidForUpdate: false });
    expect(account.attributes?.createdon).toMatchObject({
      isValidForCreate: false,
      isValidForUpdate: false,
    });
    // A lookup's _value property has no attribute metadata of its own: no flags
    expect(account.attributes?._primarycontactid_value.isValidForCreate).toBeUndefined();
  });

  it("lookups carry theirs on the navigation property", () => {
    expect(account.navigation.contoso_ParentAccountId).toMatchObject({
      lookupAttribute: "contoso_parentaccountid",
    });
    expect(account.navigation.createdby).toMatchObject({
      lookupAttribute: "createdby",
      isValidForCreate: false,
      isValidForUpdate: false,
    });
    expect(contact.navigation.parentcustomerid).toMatchObject({
      lookupAttribute: "parentcustomerid",
      isRequired: true,
      requiredLevel: "ApplicationRequired",
    });
    expect(account.navigation.contact_customer_accounts.lookupAttribute).toBeUndefined();
  });

  it("validateEntity checks a body against them", () => {
    expect(
      validateEntity(
        { name: "Contoso", primarycontactid: createEntityReference("contact", id) },
        account
      )
    ).toEqual([]);

    const issues = validateEntity(
      {
        name: "x".repeat(161),
        numberofemployees: -1,
        industrycode: 9,
        statecode: 0,
        createdby: createEntityReference("systemuser", id),
      },
      account
    );
    expect(issues.map((i) => [i.property, i.code])).toEqual([
      ["name", "maxLength"],
      ["numberofemployees", "minValue"],
      ["industrycode", "invalidOption"],
      ["statecode", "notValidForCreate"],
      ["createdby", "notValidForCreate"],
    ]);

    // A required column and a required (polymorphic) lookup left out of a create
    expect(validateEntity({ firstname: "Jane" }, contact).map((i) => i.property)).toEqual([
      "lastname",
      "parentcustomerid",
    ]);
    expect(
      validateEntity({ accountid: id, numberofemployees: 2_000_000 }, account, { mode: "update" })
    ).toEqual([
      expect.objectContaining({ property: "accountid", code: "notValidForUpdate" }),
      expect.objectContaining({ property: "numberofemployees", code: "maxValue" }),
    ]);
  });

  it("writes only the flags that are false", async () => {
    const source = await fs.readFile(path.join(dir, "entities", "Account.ts"), "utf-8");
    expect(source).not.toContain("isValidForCreate: true");
    expect(source).toContain("maxLength: 160,");
  });

  it("a table without #433's columns is written as before", async () => {
    // account's creditlimit is a currency column without a PrecisionSource
    for (const file of ["Account.ts", "Contact.ts"]) {
      const source = await fs.readFile(path.join(dir, "entities", file), "utf-8");
      expect(source).not.toMatch(/precision:|maxSizeInKB:|optionStates:/);
    }
  });
});

describe("more validation rules in the generated metadata (#433)", () => {
  let dir = "";
  let order: EntityMetadata;
  let source = "";

  beforeAll(async () => {
    dir = await scratch.create();
    await generateFixture(
      fixtureMetadataService(VALIDATION_EDMX, VALIDATION_ENTITY_METADATA),
      dir,
      {
        entities: ["contoso_order"],
      }
    );
    await compileToJs(dir);
    order = (
      await importGenerated<{ contoso_OrderMetadata: EntityMetadata }>(dir, "entities/index.js")
    ).contoso_OrderMetadata;
    source = await fs.readFile(path.join(dir, "entities", "contoso_Order.ts"), "utf-8");
  });

  it("the metadata with the new constraints type-checks", async () => {
    expect(await typecheck(dir)).toEqual([]);
  });

  it("decimal and currency columns carry their precision", () => {
    expect(order.attributes?.contoso_discount).toMatchObject({ precision: 2, maxValue: 100 });
    // PrecisionSource 0, 1 and 2
    expect(order.attributes?.contoso_amount.precision).toBe(1);
    expect(order.attributes?.contoso_listprice.precision).toBe("pricing");
    expect(order.attributes?.contoso_total.precision).toBe("currency");
    // A floating point column doesn't
    expect(order.attributes?.contoso_weight.precision).toBeUndefined();
    expect(source).toContain('precision: "currency",');
  });

  it("a date-only column is an Edm.Date; nothing else is written for dates", () => {
    expect(order.attributes?.contoso_duedate).toMatchObject({
      attributeType: "DateTime",
      odataType: "Edm.Date",
    });
    expect(order.attributes?.contoso_shippedon.odataType).toBe("Edm.DateTimeOffset");
  });

  it("image and file columns carry their largest size", () => {
    expect(order.attributes?.contoso_photo.maxSizeInKB).toBe(1);
    expect(order.attributes?.contoso_contract.maxSizeInKB).toBe(32768);
  });

  it("a status reason column carries the state of each option", () => {
    expect(order.attributes?.statuscode).toMatchObject({
      optionValues: [1, 2, 3],
      optionStates: { 1: 0, 2: 1, 3: 1 },
    });
    expect(order.attributes?.statecode.optionStates).toBeUndefined();
  });

  it("validateEntity checks a body against them", () => {
    const valid = {
      contoso_discount: 12.5,
      contoso_amount: 10.5,
      contoso_total: 99.99,
      contoso_duedate: "2024-12-31",
      contoso_shippedon: "2024-12-31T09:30:00Z",
      contoso_photo: btoa("x".repeat(1024)),
      statecode: 1,
      statuscode: 2,
    };
    expect(validateEntity(valid, order, { currencyPrecision: 2 })).toEqual([]);

    const issues = validateEntity(
      {
        contoso_discount: 12.555,
        contoso_amount: 10.55,
        contoso_listprice: 1.23456,
        contoso_total: 99.999,
        contoso_duedate: "2024-12-31T00:00:00Z",
        contoso_shippedon: "1700-01-01T00:00:00Z",
        contoso_photo: btoa("x".repeat(1025)),
        statecode: 0,
        statuscode: 2,
      },
      order,
      { pricingPrecision: 4, currencyPrecision: 2 }
    );
    expect(issues.map((i) => [i.property, i.code])).toEqual([
      ["contoso_discount", "precision"],
      ["contoso_amount", "precision"],
      ["contoso_listprice", "precision"],
      ["contoso_total", "precision"],
      ["contoso_duedate", "invalidDate"],
      ["contoso_shippedon", "dateOutOfRange"],
      ["contoso_photo", "maxSize"],
      ["statuscode", "invalidStatus"],
    ]);
  });
});
