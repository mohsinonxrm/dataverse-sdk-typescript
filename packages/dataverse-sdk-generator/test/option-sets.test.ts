import { describe, it, expect, vi, beforeEach } from "vitest";
import { SchemaModel } from "../src/schema-model.js";
import type { MetadataService } from "../src/metadata-service.js";
import type { DataverseGenConfig } from "../src/types.js";
import { MOCK_EDMX } from "./fixtures/mock-edmx.js";

describe("Option Set Enum Generation", () => {
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

  it("should generate enum for local option set", async () => {
    const model = new SchemaModel(mockMetadataService, config);

    vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
      EntityMetadata: [
        {
          LogicalName: "account",
          SchemaName: "Account",
          EntitySetName: "accounts",
          Attributes: [
            {
              LogicalName: "industrycode",
              SchemaName: "IndustryCode",
              OptionSet: {
                Name: "account_industrycode",
                IsGlobal: false,
                Options: [
                  {
                    Value: 1,
                    Label: {
                      UserLocalizedLabel: { Label: "Accounting" },
                    },
                  },
                  {
                    Value: 2,
                    Label: {
                      UserLocalizedLabel: { Label: "Agriculture" },
                    },
                  },
                  {
                    Value: 3,
                    Label: {
                      UserLocalizedLabel: { Label: "Financial Services" },
                    },
                  },
                ],
              },
            },
          ],
          Keys: [],
        },
      ],
    } as any);

    model.EntityTypes.push({
      Name: "Account",
      LogicalName: "account",
      TypeName: "Microsoft.Dynamics.CRM.account",
      EntitySetName: "accounts",
      KeyName: "accountid",
      Properties: [
        {
          Name: "industrycode",
          LogicalName: "industrycode",
          Type: "Edm.Int32",
          TypeScriptType: { name: "number", isArray: false },
        },
      ],
      NavigationProperties: [],
      IsCustomEntity: false,
    });

    await model.generate();

    // Check enum was created
    expect(model.EnumTypes).toHaveLength(1);
    expect(model.EnumTypes[0].Name).toBe("account_industrycode");
    expect(model.EnumTypes[0].IsGlobal).toBe(false);
    expect(model.EnumTypes[0].Members).toHaveLength(3);

    // Check enum members are sorted by value
    expect(model.EnumTypes[0].Members[0].Value).toBe(1);
    expect(model.EnumTypes[0].Members[0].Name).toBe("Accounting");
    expect(model.EnumTypes[0].Members[1].Value).toBe(2);
    expect(model.EnumTypes[0].Members[1].Name).toBe("Agriculture");
    expect(model.EnumTypes[0].Members[2].Value).toBe(3);
    expect(model.EnumTypes[0].Members[2].Name).toBe("Financial Services");

    // Check property was updated to reference enum
    const industryCode = model.EntityTypes[0].Properties.find(
      (p) => p.LogicalName === "industrycode"
    );
    expect(industryCode?.IsEnum).toBe(true);
    expect(industryCode?.EnumName).toBe("account_industrycode");
  });

  it("should skip global option sets (not generate enum)", async () => {
    const model = new SchemaModel(mockMetadataService, config);

    vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
      EntityMetadata: [
        {
          LogicalName: "account",
          SchemaName: "Account",
          EntitySetName: "accounts",
          Attributes: [
            {
              LogicalName: "statecode",
              SchemaName: "StateCode",
              OptionSet: {
                Name: "statecode",
                IsGlobal: true, // Global option set
                Options: [
                  { Value: 0, Label: { UserLocalizedLabel: { Label: "Active" } } },
                  { Value: 1, Label: { UserLocalizedLabel: { Label: "Inactive" } } },
                ],
              },
            },
          ],
          Keys: [],
        },
      ],
    } as any);

    await model.generate();

    // Global option set should not be generated as entity-specific enum
    expect(model.EnumTypes).toHaveLength(0);

    // Property SHOULD be marked as enum (references global option set)
    const stateCode = model.EntityTypes[0].Properties.find((p) => p.LogicalName === "statecode");
    expect(stateCode?.IsEnum).toBe(true);
    expect(stateCode?.EnumName).toBe("statecode"); // References global option set name
  });

  it("should handle multi-select option sets", async () => {
    const model = new SchemaModel(mockMetadataService, config);

    vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
      EntityMetadata: [
        {
          LogicalName: "account",
          SchemaName: "Account",
          EntitySetName: "accounts",
          Attributes: [
            {
              LogicalName: "preferredcontactmethodcode",
              SchemaName: "PreferredContactMethodCode",
              AttributeTypeName: { Value: "MultiSelectPicklistType" },
              OptionSet: {
                Name: "account_preferredcontactmethod",
                IsGlobal: false,
                Options: [
                  { Value: 1, Label: { UserLocalizedLabel: { Label: "Email" } } },
                  { Value: 2, Label: { UserLocalizedLabel: { Label: "Phone" } } },
                  { Value: 3, Label: { UserLocalizedLabel: { Label: "Fax" } } },
                ],
              },
            },
          ],
          Keys: [],
        },
      ],
    } as any);

    model.EntityTypes.push({
      Name: "Account",
      LogicalName: "account",
      TypeName: "Microsoft.Dynamics.CRM.account",
      EntitySetName: "accounts",
      KeyName: "accountid",
      Properties: [
        {
          Name: "preferredcontactmethodcode",
          LogicalName: "preferredcontactmethodcode",
          Type: "Edm.Int32",
          TypeScriptType: { name: "number", isArray: false },
        },
      ],
      NavigationProperties: [],
      IsCustomEntity: false,
    });

    await model.generate();

    // Check property is marked as multi-select
    const prop = model.EntityTypes[0].Properties.find(
      (p) => p.LogicalName === "preferredcontactmethodcode"
    );
    expect(prop?.IsMultiSelect).toBe(true);
    expect(prop?.IsEnum).toBe(true);
  });

  it("should handle option sets with null values (exclude them)", async () => {
    const model = new SchemaModel(mockMetadataService, config);

    vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
      EntityMetadata: [
        {
          LogicalName: "account",
          SchemaName: "Account",
          EntitySetName: "accounts",
          Attributes: [
            {
              LogicalName: "industrycode",
              SchemaName: "IndustryCode",
              OptionSet: {
                Name: "account_industrycode",
                IsGlobal: false,
                Options: [
                  { Value: 1, Label: { UserLocalizedLabel: { Label: "Accounting" } } },
                  { Value: null, Label: { UserLocalizedLabel: { Label: "Unknown" } } }, // Should be filtered
                  { Value: 2, Label: { UserLocalizedLabel: { Label: "Agriculture" } } },
                ],
              },
            },
          ],
          Keys: [],
        },
      ],
    } as any);

    model.EntityTypes.push({
      Name: "Account",
      LogicalName: "account",
      TypeName: "Microsoft.Dynamics.CRM.account",
      EntitySetName: "accounts",
      KeyName: "accountid",
      Properties: [
        {
          Name: "industrycode",
          LogicalName: "industrycode",
          Type: "Edm.Int32",
          TypeScriptType: { name: "number", isArray: false },
        },
      ],
      NavigationProperties: [],
      IsCustomEntity: false,
    });

    await model.generate();

    // Null value should be filtered out
    expect(model.EnumTypes[0].Members).toHaveLength(2);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    expect(model.EnumTypes[0].Members.find((m) => m.Value === null)).toBeUndefined();
  });

  it("should use fallback name for option with missing label", async () => {
    const model = new SchemaModel(mockMetadataService, config);

    vi.mocked(mockMetadataService.getEntityMetadata).mockResolvedValue({
      EntityMetadata: [
        {
          LogicalName: "account",
          SchemaName: "Account",
          EntitySetName: "accounts",
          Attributes: [
            {
              LogicalName: "industrycode",
              SchemaName: "IndustryCode",
              OptionSet: {
                Name: "account_industrycode",
                IsGlobal: false,
                Options: [
                  { Value: 1, Label: {} }, // No label
                  { Value: 2, Label: { UserLocalizedLabel: { Label: "Agriculture" } } },
                ],
              },
            },
          ],
          Keys: [],
        },
      ],
    } as any);

    model.EntityTypes.push({
      Name: "Account",
      LogicalName: "account",
      TypeName: "Microsoft.Dynamics.CRM.account",
      EntitySetName: "accounts",
      KeyName: "accountid",
      Properties: [
        {
          Name: "industrycode",
          LogicalName: "industrycode",
          Type: "Edm.Int32",
          TypeScriptType: { name: "number", isArray: false },
        },
      ],
      NavigationProperties: [],
      IsCustomEntity: false,
    });

    await model.generate();

    // Should use fallback name
    expect(model.EnumTypes[0].Members[0].Name).toBe("Value1");
  });
});
