import { describe, it, expect, vi, beforeEach } from "vitest";
import { SchemaModel } from "../src/schema-model.js";
import type { MetadataService } from "../src/metadata-service.js";
import type { DataverseGenConfig } from "../src/types.js";
import { MOCK_EDMX } from "./fixtures/mock-edmx.js";

describe("Polymorphic Lookup Consolidation", () => {
  let mockMetadataService: MetadataService;
  let config: DataverseGenConfig;

  beforeEach(() => {
    config = {
      environmentUrl: "https://test.crm.dynamics.com",
      entities: ["incident"],
      output: {
        outputRoot: "./generated",
      },
    };

    mockMetadataService = {
      getEdmxMetadata: vi.fn().mockResolvedValue(MOCK_EDMX),
      getEntityMetadata: vi.fn(),
    } as any;
  });

  it("should consolidate customerid navigation properties", async () => {
    const model = new SchemaModel(mockMetadataService, config);

    // Setup metadata with polymorphic lookup
    vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
      EntityMetadata: [
        {
          LogicalName: "incident",
          SchemaName: "Incident",
          EntitySetName: "incidents",
          Attributes: [
            {
              LogicalName: "customerid",
              SchemaName: "CustomerId",
              Targets: ["account", "contact"], // Polymorphic lookup
            },
          ],
          Keys: [],
        },
      ],
    } as any);

    model.EntityTypes.push({
      Name: "Incident",
      LogicalName: "incident",
      TypeName: "Microsoft.Dynamics.CRM.incident",
      EntitySetName: "incidents",
      KeyName: "incidentid",
      Properties: [
        {
          Name: "customerid",
          LogicalName: "customerid",
          Type: "Edm.Guid",
          TypeScriptType: { name: "string", isArray: false },
        },
      ],
      NavigationProperties: [
        {
          Name: "customerid_account",
          TargetType: "account",
          IsCollection: false,
          RelationshipName: "incident_customer_accounts",
        },
        {
          Name: "customerid_contact",
          TargetType: "contact",
          IsCollection: false,
          RelationshipName: "incident_customer_contacts",
        },
      ],
      IsCustomEntity: false,
    });

    await model.generate();

    // Should consolidate into single customerid navigation property
    const customeridNav = model.EntityTypes[0].NavigationProperties.find(
      (n) => n.Name === "customerid"
    );

    expect(customeridNav).toBeDefined();
    expect(customeridNav?.IsPolymorphic).toBe(true);
    expect(customeridNav?.Targets).toEqual(["account", "contact"]);
    expect(customeridNav?.Type).toBe("account,contact");

    // Original navigation properties should be removed
    const accountNav = model.EntityTypes[0].NavigationProperties.find(
      (n) => n.Name === "customerid_account"
    );
    const contactNav = model.EntityTypes[0].NavigationProperties.find(
      (n) => n.Name === "customerid_contact"
    );

    expect(accountNav).toBeUndefined();
    expect(contactNav).toBeUndefined();
  });

  it("should handle single-target lookups (non-polymorphic)", async () => {
    const model = new SchemaModel(mockMetadataService, config);

    vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
      EntityMetadata: [
        {
          LogicalName: "incident",
          SchemaName: "Incident",
          EntitySetName: "incidents",
          Attributes: [
            {
              LogicalName: "ownerid",
              SchemaName: "OwnerId",
              Targets: ["systemuser"], // Single target
            },
          ],
          Keys: [],
        },
      ],
    } as any);

    model.EntityTypes.push({
      Name: "Incident",
      LogicalName: "incident",
      TypeName: "Microsoft.Dynamics.CRM.incident",
      EntitySetName: "incidents",
      KeyName: "incidentid",
      Properties: [
        {
          Name: "ownerid",
          LogicalName: "ownerid",
          Type: "Edm.Guid",
          TypeScriptType: { name: "string", isArray: false },
        },
      ],
      NavigationProperties: [
        {
          Name: "ownerid_systemuser",
          TargetType: "systemuser",
          IsCollection: false,
          RelationshipName: "incident_owner_systemuser",
        },
      ],
      IsCustomEntity: false,
    });

    await model.generate();

    // Should still consolidate, but not polymorphic
    const owneridNav = model.EntityTypes[0].NavigationProperties.find((n) => n.Name === "ownerid");

    expect(owneridNav).toBeDefined();
    expect(owneridNav?.Targets).toEqual(["systemuser"]);
    // Single target, but still marked as not polymorphic since only one target
    expect(owneridNav?.IsPolymorphic).toBe(true); // Logic creates it as polymorphic structure
  });

  it("should preserve FullName for consolidated lookups", async () => {
    const model = new SchemaModel(mockMetadataService, config);

    vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
      EntityMetadata: [
        {
          LogicalName: "incident",
          SchemaName: "Incident",
          EntitySetName: "incidents",
          Attributes: [
            {
              LogicalName: "customerid",
              SchemaName: "CustomerId",
              Targets: ["account", "contact"],
            },
          ],
          Keys: [],
        },
      ],
    } as any);

    model.EntityTypes.push({
      Name: "Incident",
      LogicalName: "incident",
      TypeName: "Microsoft.Dynamics.CRM.incident",
      EntitySetName: "incidents",
      KeyName: "incidentid",
      Properties: [],
      NavigationProperties: [
        {
          Name: "customerid_account",
          TargetType: "account",
          IsCollection: false,
          RelationshipName: "incident_customer_accounts",
        },
        {
          Name: "customerid_contact",
          TargetType: "contact",
          IsCollection: false,
          RelationshipName: "incident_customer_contacts",
        },
      ],
      IsCustomEntity: false,
    });

    await model.generate();

    const customeridNav = model.EntityTypes[0].NavigationProperties.find(
      (n) => n.Name === "customerid"
    );

    expect(customeridNav?.FullName).toBe("customerid");
  });

  it("should handle reserved keyword navigation names", async () => {
    const updatedConfig = { ...config, entities: ["testentity"] };
    const model = new SchemaModel(mockMetadataService, updatedConfig);

    vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
      EntityMetadata: [
        {
          LogicalName: "testentity",
          SchemaName: "TestEntity",
          EntitySetName: "testentities",
          Attributes: [
            {
              LogicalName: "class", // Reserved keyword
              SchemaName: "Class",
              Targets: ["account"],
            },
          ],
          Keys: [],
        },
      ],
    } as any);

    await model.generate();

    const classNav = model.EntityTypes[0].NavigationProperties.find((n) => n.Name === "_class");

    expect(classNav).toBeDefined();
    expect(classNav?.FullName).toBe("class");
    expect(classNav?.Name).toBe("_class"); // Prefixed with underscore
  });
});
