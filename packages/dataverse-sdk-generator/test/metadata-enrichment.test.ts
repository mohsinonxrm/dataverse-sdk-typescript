import { describe, it, expect, vi, beforeEach } from "vitest";
import { SchemaModel } from "../src/schema-model.js";
import type { MetadataService } from "../src/metadata-service.js";
import type { DataverseGenConfig } from "../src/types.js";
import { MOCK_EDMX } from "./fixtures/mock-edmx.js";

describe("Metadata Enrichment", () => {
  let mockMetadataService: MetadataService;
  let config: DataverseGenConfig;

  beforeEach(() => {
    config = {
      environmentUrl: "https://test.crm.dynamics.com",
      entities: ["account"],
      output: {
        outputRoot: "./generated",
      },
    };

    mockMetadataService = {
      getEdmxMetadata: vi.fn().mockResolvedValue(MOCK_EDMX),
      getEntityMetadata: vi.fn(),
    } as any;
  });

  describe("enrichWithDetailedMetadata", () => {
    it("should throw error for non-existent entity", async () => {
      const model = new SchemaModel(mockMetadataService, config);

      // Setup mock to return empty EntityMetadata array
      vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
        EntityMetadata: [],
      });

      // Call generate which triggers enrichment
      await expect(model.generate()).rejects.toThrow(
        "account is not a Dataverse entity, remove it from the .dataverse-gen.json"
      );
    });

    it("should set SchemaName and EntitySetName from metadata", async () => {
      const model = new SchemaModel(mockMetadataService, config);

      vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
        EntityMetadata: [
          {
            LogicalName: "account",
            SchemaName: "Account",
            EntitySetName: "accounts",
            Attributes: [],
            Keys: [],
          },
        ],
      });

      await model.generate();

      expect(model.EntityTypes[0].SchemaName).toBe("Account");
      expect(model.EntityTypes[0].EntitySetName).toBe("accounts");
    });

    it("should mark required fields based on RequiredLevel", async () => {
      const model = new SchemaModel(mockMetadataService, config);

      vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
        EntityMetadata: [
          {
            LogicalName: "account",
            SchemaName: "Account",
            EntitySetName: "accounts",
            Attributes: [
              // The Web API sends the member name, as seen live (#325).
              {
                LogicalName: "name",
                SchemaName: "Name",
                RequiredLevel: { Value: "ApplicationRequired" },
              },
              {
                LogicalName: "revenue",
                SchemaName: "Revenue",
                RequiredLevel: { Value: "None" },
              },
              {
                LogicalName: "accountid",
                SchemaName: "AccountId",
                RequiredLevel: { Value: "SystemRequired" },
              },
              {
                LogicalName: "telephone1",
                SchemaName: "Telephone1",
                RequiredLevel: { Value: "Recommended" },
              },
            ],
            Keys: [],
          },
        ],
      });

      await model.generate();

      const nameAttr = model.EntityTypes[0].Properties.find((p) => p.LogicalName === "name");
      const revenueAttr = model.EntityTypes[0].Properties.find((p) => p.LogicalName === "revenue");

      const idAttr = model.EntityTypes[0].Properties.find((p) => p.LogicalName === "accountid");
      const phoneAttr = model.EntityTypes[0].Properties.find((p) => p.LogicalName === "telephone1");

      expect(nameAttr?.IsRequired).toBe(true);
      expect(nameAttr?.RequiredLevel).toBe("ApplicationRequired");
      expect(revenueAttr?.IsRequired).toBe(false);
      expect(revenueAttr?.RequiredLevel).toBeUndefined();
      // System-required columns are filled in by Dataverse, so they aren't business-required.
      expect(idAttr?.IsRequired).toBe(false);
      expect(idAttr?.RequiredLevel).toBe("SystemRequired");
      expect(phoneAttr?.IsRequired).toBe(false);
      expect(phoneAttr?.RequiredLevel).toBe("Recommended");
    });

    it("should detect calculated and rollup fields via SourceType", async () => {
      const model = new SchemaModel(mockMetadataService, config);

      vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
        EntityMetadata: [
          {
            LogicalName: "account",
            SchemaName: "Account",
            EntitySetName: "accounts",
            Attributes: [
              {
                LogicalName: "revenue",
                SchemaName: "Revenue",
                SourceType: 1, // Calculated
              },
              {
                LogicalName: "totalamount",
                SchemaName: "TotalAmount",
                SourceType: 2, // Rollup
              },
            ],
            Keys: [],
          },
        ],
      });

      await model.generate();

      const revenue = model.EntityTypes[0].Properties.find((p) => p.LogicalName === "revenue");
      const totalAmount = model.EntityTypes[0].Properties.find(
        (p) => p.LogicalName === "totalamount"
      );

      expect(revenue?.SourceType).toBe(1);
      expect(totalAmount?.SourceType).toBe(2);
    });

    it("should extract DisplayName and Description labels", async () => {
      const model = new SchemaModel(mockMetadataService, config);

      vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
        EntityMetadata: [
          {
            LogicalName: "account",
            SchemaName: "Account",
            EntitySetName: "accounts",
            Attributes: [
              {
                LogicalName: "name",
                SchemaName: "Name",
                DisplayName: {
                  UserLocalizedLabel: { Label: "Account Name" },
                },
                Description: {
                  UserLocalizedLabel: { Label: "The name of the account" },
                },
              },
            ],
            Keys: [],
          },
        ],
      });

      await model.generate();

      const nameAttr = model.EntityTypes[0].Properties.find((p) => p.LogicalName === "name");

      expect(nameAttr?.DisplayName).toBe("Account Name");
      expect(nameAttr?.Description).toBe("The name of the account");
    });

    it("should map alternate keys from metadata", async () => {
      const model = new SchemaModel(mockMetadataService, config);

      vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
        EntityMetadata: [
          {
            LogicalName: "account",
            SchemaName: "Account",
            EntitySetName: "accounts",
            Attributes: [],
            Keys: [
              {
                LogicalName: "accountnumber_key",
                SchemaName: "AccountNumberKey",
                DisplayName: {
                  UserLocalizedLabel: { Label: "Account Number Key" },
                },
                KeyAttributes: ["accountnumber"],
              },
            ],
          },
        ],
      });

      await model.generate();

      expect(model.EntityTypes[0].Keys).toHaveLength(1);
      expect(model.EntityTypes[0].Keys?.[0].LogicalName).toBe("accountnumber_key");
      expect(model.EntityTypes[0].Keys?.[0].DisplayName).toBe("Account Number Key");
      expect(model.EntityTypes[0].Keys?.[0].KeyAttributes).toEqual(["accountnumber"]);
    });
  });
});
