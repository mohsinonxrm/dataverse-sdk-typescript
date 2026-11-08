/**
 * #347: `validateEntity()` checks a create or update body against the column constraints the
 * generator writes into the entity metadata (MaxLength, MinValue/MaxValue, the choices of a
 * choice column, RequiredLevel, IsValidForCreate/IsValidForUpdate). It's opt-in: nothing else
 * calls it.
 */
import { describe, expect, it } from "vitest";
import { type EntityMetadata, createEntityReference, validateEntity } from "../src/index.js";

const id = "11111111-2222-3333-4444-555555555555";

const accountMetadata: EntityMetadata = {
  typeName: "Microsoft.Dynamics.CRM.account",
  logicalName: "account",
  collectionName: "accounts",
  primaryIdAttribute: "accountid",
  attributeTypes: {},
  attributes: {
    accountid: {
      logicalName: "accountid",
      schemaName: "AccountId",
      attributeType: "Uniqueidentifier",
      typescriptType: "string",
      isValidForUpdate: false,
    },
    name: {
      logicalName: "name",
      schemaName: "Name",
      attributeType: "String",
      typescriptType: "string",
      isRequired: true,
      requiredLevel: "ApplicationRequired",
      maxLength: 10,
    },
    numberofemployees: {
      logicalName: "numberofemployees",
      schemaName: "NumberOfEmployees",
      attributeType: "Integer",
      typescriptType: "number",
      minValue: 0,
      maxValue: 1000,
    },
    creditlimit: {
      logicalName: "creditlimit",
      schemaName: "CreditLimit",
      attributeType: "Money",
      typescriptType: "number",
      minValue: 0,
      maxValue: 1_000_000,
    },
    creditonhold: {
      logicalName: "creditonhold",
      schemaName: "CreditOnHold",
      attributeType: "Boolean",
      typescriptType: "boolean",
    },
    industrycode: {
      logicalName: "industrycode",
      schemaName: "IndustryCode",
      attributeType: "Picklist",
      typescriptType: "account_industrycode",
      optionValues: [1, 2],
    },
    preferredcontactmethodcode: {
      logicalName: "preferredcontactmethodcode",
      schemaName: "PreferredContactMethodCode",
      attributeType: "Virtual",
      typescriptType: "string",
      isMultiSelect: true,
      optionValues: [1, 2, 3],
    },
    statecode: {
      logicalName: "statecode",
      schemaName: "StateCode",
      attributeType: "State",
      typescriptType: "account_statecode",
      isValidForCreate: false,
      optionValues: [0, 1],
    },
    createdon: {
      logicalName: "createdon",
      schemaName: "CreatedOn",
      attributeType: "DateTime",
      typescriptType: "string",
      isValidForCreate: false,
      isValidForUpdate: false,
    },
  },
  navigation: {
    primarycontactid: {
      name: "primarycontactid",
      targetType: "contact",
      isCollection: false,
      relationshipName: "account_primary_contact",
      lookupAttribute: "primarycontactid",
      isRequired: true,
      requiredLevel: "ApplicationRequired",
    },
    createdby: {
      name: "createdby",
      targetType: "systemuser",
      isCollection: false,
      relationshipName: "lk_accountbase_createdby",
      lookupAttribute: "createdby",
      isValidForCreate: false,
      isValidForUpdate: false,
    },
  },
};

const contact = () => createEntityReference("contact", id);

describe("validateEntity (#347)", () => {
  it("a valid create has no issues", () => {
    expect(
      validateEntity(
        {
          name: "Contoso",
          numberofemployees: 10,
          creditlimit: 1000.5,
          creditonhold: false,
          industrycode: 2,
          preferredcontactmethodcode: "1,3",
          primarycontactid: contact(),
        },
        accountMetadata
      )
    ).toEqual([]);
  });

  it("a create misses a business-required column or lookup", () => {
    expect(validateEntity({ name: null }, accountMetadata)).toEqual([
      expect.objectContaining({ property: "name", code: "required" }),
      expect.objectContaining({ property: "primarycontactid", code: "required" }),
    ]);
  });

  it("an update needs only the columns it sets, and can't clear a required one", () => {
    expect(validateEntity({ numberofemployees: 5 }, accountMetadata, { mode: "update" })).toEqual(
      []
    );
    expect(
      validateEntity({ name: null, primarycontactid: null }, accountMetadata, { mode: "update" })
    ).toEqual([
      expect.objectContaining({ property: "name", code: "required" }),
      expect.objectContaining({ property: "primarycontactid", code: "required" }),
    ]);
  });

  it("columns and lookups a create or an update can't set", () => {
    const base = { name: "Contoso", primarycontactid: contact() };
    expect(
      validateEntity(
        { ...base, statecode: 0, createdon: "2024-01-01", createdby: contact() },
        accountMetadata
      ).map((i) => [i.property, i.code])
    ).toEqual([
      ["statecode", "notValidForCreate"],
      ["createdon", "notValidForCreate"],
      ["createdby", "notValidForCreate"],
    ]);
    expect(
      validateEntity({ accountid: id, statecode: 1 }, accountMetadata, { mode: "update" }).map(
        (i) => [i.property, i.code]
      )
    ).toEqual([["accountid", "notValidForUpdate"]]);
  });

  it("length, range, whole numbers and choices", () => {
    const issues = validateEntity(
      {
        name: "Contoso Limited",
        numberofemployees: 1.5,
        creditlimit: -1,
        industrycode: 7,
        preferredcontactmethodcode: "1,9",
        primarycontactid: contact(),
      },
      accountMetadata
    );
    expect(issues.map((i) => [i.property, i.code])).toEqual([
      ["name", "maxLength"],
      ["numberofemployees", "notAnInteger"],
      ["creditlimit", "minValue"],
      ["industrycode", "invalidOption"],
      ["preferredcontactmethodcode", "invalidOption"],
    ]);
    expect(issues[0].message).toBe("name is 15 characters long; the column holds at most 10.");
    expect(
      validateEntity({ numberofemployees: 1001 }, accountMetadata, { mode: "update" })
    ).toEqual([expect.objectContaining({ property: "numberofemployees", code: "maxValue" })]);
  });

  it("values of the wrong type", () => {
    expect(
      validateEntity(
        {
          name: 5,
          numberofemployees: "10",
          creditonhold: "yes",
          industrycode: "1",
          primarycontactid: id,
        },
        accountMetadata,
        { mode: "update" }
      ).map((i) => [i.property, i.code])
    ).toEqual([
      ["name", "invalidType"],
      ["numberofemployees", "invalidType"],
      ["creditonhold", "invalidType"],
      ["industrycode", "invalidType"],
      ["primarycontactid", "invalidType"],
    ]);
  });

  it("leaves out what the metadata doesn't describe", () => {
    const bare: EntityMetadata = { ...accountMetadata, attributes: undefined, navigation: {} };
    expect(
      validateEntity({ anything: 1, "x@odata.bind": "/accounts(1)", name: "x".repeat(99) }, bare)
    ).toEqual([]);
    // Annotations, undefined values and unknown properties are skipped
    expect(
      validateEntity(
        {
          name: "Contoso",
          primarycontactid: contact(),
          "@odata.type": "Microsoft.Dynamics.CRM.account",
          numberofemployees: undefined,
          notacolumn: 1,
        },
        accountMetadata
      )
    ).toEqual([]);
  });
});
