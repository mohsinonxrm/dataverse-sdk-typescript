import { describe, it, expect } from "vitest";
import {
  type IEntity,
  type EntityReference,
  type EntityMetadata,
  isEntityReference,
  isEntity,
  createEntityReference,
  getODataType,
  getCollectionUrl,
  getEntityUrl,
  formatEntityForWrite,
} from "../src/index.js";

describe("IEntity", () => {
  it("should allow dynamic properties", () => {
    const entity: IEntity = {
      logicalName: "account",
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Contoso",
      creditlimit: 50000,
    };

    expect(entity.logicalName).toBe("account");
    expect(entity.id).toBeDefined();
    expect(entity.name).toBe("Contoso");
  });
});

describe("EntityReference", () => {
  it("keeps a display name, not sent", () => {
    const ref = createEntityReference("account", "123", { name: "Contoso" });

    expect(ref.logicalName).toBe("account");
    expect(ref.id).toBe("123");
    expect(ref.name).toBe("Contoso");
    expect(JSON.stringify(ref)).toBe(
      '{"@odata.type":"Microsoft.Dynamics.CRM.account","accountid":"123"}'
    );
  });

  it("has no name unless one is given", () => {
    const ref = createEntityReference("contact", "456");

    expect(ref.logicalName).toBe("contact");
    expect(ref.id).toBe("456");
    expect(ref.name).toBeUndefined();
  });
});

describe("Type Guards", () => {
  it("isEntityReference identifies what createEntityReference makes", () => {
    const ref: EntityReference = createEntityReference("account", "123");

    expect(isEntityReference(ref)).toBe(true);
    expect(isEntityReference({})).toBe(false);
    expect(isEntityReference(null)).toBe(false);
    expect(isEntityReference("account")).toBe(false);
    expect(isEntityReference({ logicalName: "account" })).toBe(false);
    expect(isEntityReference({ id: "123" })).toBe(false);
    // Without @odata.type it isn't the reference shape (#295)
    expect(isEntityReference({ logicalName: "account", id: "123" })).toBe(false);
  });

  it("isEntity should identify IEntity", () => {
    const entity: IEntity = { logicalName: "account", name: "Test" };

    expect(isEntity(entity)).toBe(true);
    expect(isEntity({})).toBe(false);
    expect(isEntity(null)).toBe(false);
    expect(isEntity({ name: "Test" })).toBe(false);
  });
});

describe("Metadata Helpers", () => {
  const accountMetadata: EntityMetadata = {
    typeName: "Microsoft.Dynamics.CRM.account",
    logicalName: "account",
    collectionName: "accounts",
    primaryIdAttribute: "accountid",
    primaryNameAttribute: "name",
    attributeTypes: {
      accountid: "Guid",
      name: "String",
      creditlimit: "Money",
    },
    navigation: {
      primarycontactid: {
        name: "primarycontactid",
        targetType: "contact",
        isCollection: false,
        relationshipName: "account_primary_contact",
        referencedProperty: "contactid",
      },
    },
  };

  it("getODataType should return typeName", () => {
    expect(getODataType(accountMetadata)).toBe("Microsoft.Dynamics.CRM.account");
  });

  it("getCollectionUrl should construct collection URL", () => {
    const url = getCollectionUrl(accountMetadata, "https://org.crm.dynamics.com/api/data/v9.2");
    expect(url).toBe("https://org.crm.dynamics.com/api/data/v9.2/accounts");
  });

  it("getEntityUrl should construct single entity URL", () => {
    const url = getEntityUrl(
      accountMetadata,
      "123e4567-e89b-12d3-a456-426614174000",
      "https://org.crm.dynamics.com/api/data/v9.2"
    );
    expect(url).toBe(
      "https://org.crm.dynamics.com/api/data/v9.2/accounts(123e4567-e89b-12d3-a456-426614174000)"
    );
  });
});

describe("formatEntityForWrite", () => {
  const accountMetadata: EntityMetadata = {
    typeName: "Microsoft.Dynamics.CRM.account",
    logicalName: "account",
    collectionName: "accounts",
    primaryIdAttribute: "accountid",
    attributeTypes: {},
    navigation: {},
  };

  it("should add @odata.type annotation", () => {
    const entity: Partial<IEntity> = {
      logicalName: "account",
      name: "Contoso",
    };

    const formatted = formatEntityForWrite(entity, accountMetadata);

    expect(formatted["@odata.type"]).toBe("Microsoft.Dynamics.CRM.account");
  });

  it("should exclude id and logicalName from output", () => {
    const entity: Partial<IEntity> = {
      id: "123",
      logicalName: "account",
      name: "Contoso",
      creditlimit: 50000,
    };

    const formatted = formatEntityForWrite(entity, accountMetadata);

    expect(formatted.id).toBeUndefined();
    expect(formatted.logicalName).toBeUndefined();
    expect(formatted.name).toBe("Contoso");
    expect(formatted.creditlimit).toBe(50000);
  });

  it("should filter undefined values", () => {
    const entity: Partial<IEntity> = {
      logicalName: "account",
      name: "Contoso",
      creditlimit: undefined,
    };

    const formatted = formatEntityForWrite(entity, accountMetadata);

    expect(formatted.name).toBe("Contoso");
    expect("creditlimit" in formatted).toBe(false);
  });

  it("should preserve null values (explicit clear)", () => {
    const entity: Partial<IEntity> = {
      logicalName: "account",
      name: "Contoso",
      creditlimit: null,
    };

    const formatted = formatEntityForWrite(entity, accountMetadata);

    expect(formatted.creditlimit).toBeNull();
  });
});
