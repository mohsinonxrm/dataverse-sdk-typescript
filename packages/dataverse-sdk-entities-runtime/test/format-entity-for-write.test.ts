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

/** A custom table: not in the SDK's `$metadata` snapshot, so its entity set must be given. */
const widgetId = "99999999-8888-7777-6666-555555555555";
const widgetMetadata: EntityMetadata = {
  typeName: "Microsoft.Dynamics.CRM.new_widget",
  logicalName: "new_widget",
  collectionName: "new_widgetset",
  primaryIdAttribute: "new_widgetid",
  attributeTypes: {},
  navigation: {},
};
accountMetadata.navigation.new_widgetid = {
  name: "new_WidgetId",
  targetType: "new_widget",
  isCollection: false,
  relationshipName: "new_account_widget",
};

const metadataCache = {
  account: accountMetadata,
  contact: contactMetadata,
  new_widget: widgetMetadata,
};

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
  it("binds a lookup through its navigation property; a snapshot table needs no options", () => {
    const body = formatEntityForWrite(
      { name: "Contoso", primarycontactid: createEntityReference("contact", `{${contactId}}`) },
      accountMetadata
    );
    expect(body).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: "Contoso",
      "primarycontactid@odata.bind": `/contacts(${contactId})`,
    });
  });

  it("finds a custom table's entity set on the reference, then entitySetNames, then metadataCache", () => {
    const bind = (reference: unknown, options = {}) =>
      formatEntityForWrite({ new_widgetid: reference }, accountMetadata, options)[
        "new_WidgetId@odata.bind"
      ];
    const plain = createEntityReference("new_widget", widgetId);
    const withSet = createEntityReference("new_widget", widgetId, { entitySetName: "given" });

    expect(bind(withSet, { entitySetNames: { new_widget: "mapped" }, metadataCache })).toBe(
      `/given(${widgetId})`
    );
    expect(bind(plain, { entitySetNames: { new_widget: "mapped" }, metadataCache })).toBe(
      `/mapped(${widgetId})`
    );
    expect(bind(plain, { metadataCache })).toBe(`/new_widgetset(${widgetId})`);
  });

  it("sends a hand-written { logicalName, id } as it is: only createEntityReference makes a reference (#295)", () => {
    const body = formatEntityForWrite(
      { primarycontactid: { logicalName: "contact", id: contactId } },
      accountMetadata
    );
    expect(body).not.toHaveProperty("primarycontactid@odata.bind");
    expect(body.primarycontactid).toEqual({ logicalName: "contact", id: contactId });
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

  it("clears a lookup set to null through its navigation property (#363)", () => {
    expect(formatEntityForWrite({ primarycontactid: null }, accountMetadata)).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      "primarycontactid@odata.bind": null,
    });
    // The navigation property's own casing (custom lookups are often new_ParentId).
    expect(formatEntityForWrite({ new_widgetid: null }, accountMetadata)).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      "new_WidgetId@odata.bind": null,
    });
  });

  it("clears a polymorphic lookup through the navigation property of every target (#363)", () => {
    expect(formatEntityForWrite({ parentcustomerid: null }, contactMetadata)).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.contact",
      "parentcustomerid_account@odata.bind": null,
      "parentcustomerid_contact@odata.bind": null,
    });
    // Not consolidated: the per-target entries in the metadata.
    expect(formatEntityForWrite({ customerid: null }, incidentMetadata)).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.incident",
      "customerid_account@odata.bind": null,
      "customerid_contact@odata.bind": null,
    });
  });

  it("leaves null on a collection-valued navigation property as it is", () => {
    const body = formatEntityForWrite({ contact_customer_accounts: null }, accountMetadata);
    expect(body).toHaveProperty("contact_customer_accounts", null);
  });

  it("throws a DataverseInvalidRequestError when the entity set is unknown", () => {
    expect(() =>
      formatEntityForWrite(
        { new_widgetid: createEntityReference("new_widget", widgetId) },
        accountMetadata
      )
    ).toThrow(DataverseInvalidRequestError);
    expect(() =>
      formatEntityForWrite(
        { new_widgetid: createEntityReference("new_widget", widgetId) },
        accountMetadata,
        { entitySetNames: { toString: "x" } as unknown as Record<string, string> }
      )
    ).toThrow(/no entity set is known for 'new_widget'/);
  });
});
