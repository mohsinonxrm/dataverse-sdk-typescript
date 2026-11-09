/**
 * #347: the generated entity metadata carries each column's constraints (MaxLength,
 * MinValue/MaxValue, option values, IsValidForCreate/IsValidForUpdate) and each lookup's
 * (RequiredLevel, IsValidForCreate/IsValidForUpdate), so the runtime's opt-in `validateEntity()`
 * can check a body before it's sent.
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
});
