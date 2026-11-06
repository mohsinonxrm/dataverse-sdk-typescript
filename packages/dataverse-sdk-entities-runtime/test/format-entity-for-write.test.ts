import { describe, expect, it } from "vitest";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import {
  type EntityMetadata,
  type IEntity,
  createEntityReference,
  formatEntityForWrite,
  isEntity,
} from "../src/index.js";

const contactId = "6f6a7d4e-1b2c-4d5e-8f90-0123456789ab";
const accountId = "11111111-2222-3333-4444-555555555555";

const accountMetadata: EntityMetadata = {
  typeName: "Microsoft.Dynamics.CRM.account",
  logicalName: "account",
  collectionName: "accounts",
  primaryIdAttribute: "accountid",
  attributeTypes: { name: "Edm.String", _primarycontactid_value: "Edm.Guid" },
  navigation: {
    primarycontactid: {
      name: "primarycontactid",
      targetType: "contact",
      isCollection: false,
      relationshipName: "account_primary_contact",
    },
    contact_customer_accounts: {
      name: "contact_customer_accounts",
      targetType: "contact",
      isCollection: true,
      relationshipName: "contact_customer_accounts",
    },
  },
};

const contactMetadata: EntityMetadata = {
  typeName: "Microsoft.Dynamics.CRM.contact",
  logicalName: "contact",
  collectionName: "contacts",
  primaryIdAttribute: "contactid",
  attributeTypes: {},
  navigation: {
    // A polymorphic lookup as the generator emits it (consolidated from parentcustomerid_account
    // and parentcustomerid_contact).
    parentcustomerid: {
      name: "parentcustomerid",
      fullName: "parentcustomerid",
      targetType: "account",
      isPolymorphic: true,
      targets: ["account", "contact"],
      isCollection: false,
      relationshipName: "contact_customer_accounts",
    },
  },
};

const incidentMetadata: EntityMetadata = {
  typeName: "Microsoft.Dynamics.CRM.incident",
  logicalName: "incident",
  collectionName: "incidents",
  primaryIdAttribute: "incidentid",
  attributeTypes: {},
  // Not consolidated: one navigation property per target, as in $metadata.
  navigation: {
    customerid_account: {
      name: "customerid_account",
      targetType: "account",
      isCollection: false,
      relationshipName: "incident_customer_accounts",
    },
    customerid_contact: {
      name: "customerid_contact",
      targetType: "contact",
      isCollection: false,
      relationshipName: "incident_customer_contacts",
    },
  },
};

const metadataCache = { account: accountMetadata, contact: contactMetadata };

describe("formatEntityForWrite: payload (#79)", () => {
  it("an entity without logicalName is valid, and logicalName is never sent", () => {
    const account: IEntity = { name: "Contoso" };
    expect(formatEntityForWrite(account, accountMetadata)).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: "Contoso",
    });
    expect(
      formatEntityForWrite({ logicalName: "account", name: "Contoso" }, accountMetadata)
    ).not.toHaveProperty("logicalName");
  });

  it("isEntity still recognises objects that carry a logicalName", () => {
    expect(isEntity({ logicalName: "account" })).toBe(true);
    expect(isEntity({ name: "Contoso" })).toBe(false);
  });
});

describe("formatEntityForWrite: lookups become @odata.bind (#79)", () => {
  it("binds a lookup through its navigation property, finding the entity set in metadataCache", () => {
    const body = formatEntityForWrite(
      { name: "Contoso", primarycontactid: createEntityReference("contact", contactId) },
      accountMetadata,
      { metadataCache }
    );
    expect(body).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: "Contoso",
      "primarycontactid@odata.bind": `/contacts(${contactId})`,
    });
  });

  it("uses the reference's entitySetName, then entitySetNames", () => {
    const withSet = formatEntityForWrite(
      { primarycontactid: { logicalName: "contact", id: contactId, entitySetName: "contacts" } },
      accountMetadata
    );
    expect(withSet["primarycontactid@odata.bind"]).toBe(`/contacts(${contactId})`);

    const withMap = formatEntityForWrite(
      { primarycontactid: createEntityReference("contact", `{${contactId}}`) },
      accountMetadata,
      { entitySetNames: { contact: "contacts" } }
    );
    expect(withMap["primarycontactid@odata.bind"]).toBe(`/contacts(${contactId})`);
  });

  it("binds a polymorphic lookup through the navigation property for the reference's table", () => {
    const toAccount = formatEntityForWrite(
      { parentcustomerid: createEntityReference("account", accountId) },
      contactMetadata,
      { metadataCache }
    );
    expect(toAccount).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.contact",
      "parentcustomerid_account@odata.bind": `/accounts(${accountId})`,
    });

    const toContact = formatEntityForWrite(
      { parentcustomerid: createEntityReference("contact", contactId) },
      contactMetadata,
      { metadataCache }
    );
    expect(toContact["parentcustomerid_contact@odata.bind"]).toBe(`/contacts(${contactId})`);
  });

  it("finds the per-target navigation property when the lookup isn't consolidated", () => {
    const body = formatEntityForWrite(
      { customerid: createEntityReference("contact", contactId) },
      incidentMetadata,
      { metadataCache }
    );
    expect(body["customerid_contact@odata.bind"]).toBe(`/contacts(${contactId})`);
  });

  it("binds an array of references for a collection-valued navigation property", () => {
    const body = formatEntityForWrite(
      {
        contact_customer_accounts: [
          createEntityReference("contact", contactId),
          createEntityReference("contact", accountId),
        ],
      },
      accountMetadata,
      { metadataCache }
    );
    expect(body["contact_customer_accounts@odata.bind"]).toEqual([
      `/contacts(${contactId})`,
      `/contacts(${accountId})`,
    ]);
  });

  it("keeps null (clears the column) and plain objects (deep insert) as they are", () => {
    const body = formatEntityForWrite(
      { description: null, primarycontactid: { lastname: "Smith" } },
      accountMetadata
    );
    expect(body.description).toBeNull();
    expect(body.primarycontactid).toEqual({ lastname: "Smith" });
  });

  it("throws a DataverseInvalidRequestError when the entity set is unknown", () => {
    expect(() =>
      formatEntityForWrite(
        { primarycontactid: createEntityReference("contact", contactId) },
        accountMetadata
      )
    ).toThrow(DataverseInvalidRequestError);
    expect(() =>
      formatEntityForWrite(
        { primarycontactid: createEntityReference("contact", contactId) },
        accountMetadata,
        { entitySetNames: { toString: "x" } as unknown as Record<string, string> }
      )
    ).toThrow(/no entity set is known for 'contact'/);
  });
});
