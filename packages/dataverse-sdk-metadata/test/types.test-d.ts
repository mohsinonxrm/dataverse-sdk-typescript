/**
 * Type tests for metadata package using tsd
 * These tests verify compile-time type safety for metadata operations
 */

import { expectType, expectError, expectAssignable, expectNotAssignable } from "tsd";
import {
  AttributeRequiredLevel,
  DeletedMetadataFilters,
  LogicalOperator,
  OwnershipTypes,
} from "../src/types/index.js";
import type { MetadataClient } from "../src/MetadataClient.js";
import type {
  EntityMetadata,
  EntityMetadataCreate,
  EntityMetadataUpdate,
  StringAttributeMetadataCreate,
  IntegerAttributeMetadataCreate,
  LookupAttributeMetadataCreate,
  AttributeMetadataCreateTypes,
  OneToManyRelationshipMetadataCreate,
  ManyToManyRelationshipMetadataCreate,
  OptionSetMetadataCreate,
  Label,
  LocalizedLabel,
  AttributeMetadataUpdateTypes,
  EntityMetadataChanges,
  ManyToManyRelationshipMetadataUpdate,
  OneToManyRelationshipMetadata,
  OneToManyRelationshipMetadataUpdate,
  OptionSetMetadata,
  OptionSetMetadataChanges,
  OptionSetMetadataUpdate,
  StringAttributeMetadata,
} from "../src/types/index.js";

// ==================== Entity Metadata Type Tests ====================

// EntityMetadataCreate takes a typed @odata.type and string enum members
const entityCreate: EntityMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  SchemaName: "new_custom",
  DisplayName: {
    "@odata.type": "Microsoft.Dynamics.CRM.Label",
    LocalizedLabels: [
      {
        "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
        Label: "Custom Entity",
        LanguageCode: 1033,
      },
    ],
  },
  OwnershipType: "UserOwned",
  HasActivities: false,
  HasNotes: false,
};

expectType<EntityMetadataCreate>(entityCreate);

// EntityMetadataCreate should reject read-only fields
expectError<EntityMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  SchemaName: "new_custom",
  DisplayName: {
    "@odata.type": "Microsoft.Dynamics.CRM.Label",
    LocalizedLabels: [],
  },
  OwnershipType: "UserOwned",
  HasActivities: false,
  HasNotes: false,
  // MetadataId is set by Dataverse: excess property
  MetadataId: "00000000-0000-0000-0000-000000000001",
});

// EntityMetadataUpdate is the complete definition, typed by its @odata.type
const entityUpdate: EntityMetadataUpdate = {
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  DisplayName: {
    "@odata.type": "Microsoft.Dynamics.CRM.Label",
    LocalizedLabels: [
      {
        "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
        Label: "Updated Entity",
        LanguageCode: 1033,
      },
    ],
  },
};

expectType<EntityMetadataUpdate>(entityUpdate);

// ==================== Attribute Metadata Type Tests ====================

// StringAttributeMetadataCreate should require @odata.type
const stringAttrCreate: StringAttributeMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  SchemaName: "new_field",
  DisplayName: {
    "@odata.type": "Microsoft.Dynamics.CRM.Label",
    LocalizedLabels: [
      {
        "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
        Label: "Field",
        LanguageCode: 1033,
      },
    ],
  },
  RequiredLevel: { Value: "None" },
  MaxLength: 100,
};

expectType<StringAttributeMetadataCreate>(stringAttrCreate);

// Should be assignable to union type
expectAssignable<AttributeMetadataCreateTypes>(stringAttrCreate);

// IntegerAttributeMetadataCreate should have correct structure
const intAttrCreate: IntegerAttributeMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.IntegerAttributeMetadata",
  SchemaName: "new_number",
  DisplayName: {
    "@odata.type": "Microsoft.Dynamics.CRM.Label",
    LocalizedLabels: [
      {
        "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
        Label: "Number",
        LanguageCode: 1033,
      },
    ],
  },
  RequiredLevel: { Value: "None" },
  MinValue: 0,
  MaxValue: 1000,
};

expectType<IntegerAttributeMetadataCreate>(intAttrCreate);
expectAssignable<AttributeMetadataCreateTypes>(intAttrCreate);

// LookupAttributeMetadataCreate should have correct structure
const lookupAttrCreate: LookupAttributeMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.LookupAttributeMetadata",
  SchemaName: "new_parentid",
  DisplayName: {
    "@odata.type": "Microsoft.Dynamics.CRM.Label",
    LocalizedLabels: [
      {
        "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
        Label: "Parent",
        LanguageCode: 1033,
      },
    ],
  },
  RequiredLevel: { Value: "None" },
};

expectType<LookupAttributeMetadataCreate>(lookupAttrCreate);
expectAssignable<AttributeMetadataCreateTypes>(lookupAttrCreate);

// Attribute create should reject wrong @odata.type
expectError<StringAttributeMetadataCreate>({
  // Wrong @odata.type
  "@odata.type": "Microsoft.Dynamics.CRM.IntegerAttributeMetadata",
  SchemaName: "new_field",
  DisplayName: {
    "@odata.type": "Microsoft.Dynamics.CRM.Label",
    LocalizedLabels: [],
  },
  RequiredLevel: { Value: "None" },
  MaxLength: 100,
});

// ==================== Relationship Metadata Type Tests ====================

// OneToManyRelationshipMetadataCreate should require all fields
const oneToManyCreate: OneToManyRelationshipMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
  SchemaName: "new_parent_child",
  ReferencedEntity: "new_parent",
  ReferencingEntity: "new_child",
  Lookup: {
    "@odata.type": "Microsoft.Dynamics.CRM.LookupAttributeMetadata",
    SchemaName: "new_ParentId",
    DisplayName: {
      "@odata.type": "Microsoft.Dynamics.CRM.Label",
      LocalizedLabels: [
        {
          "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
          Label: "Parent",
          LanguageCode: 1033,
        },
      ],
    },
  },
};

expectType<OneToManyRelationshipMetadataCreate>(oneToManyCreate);

// ManyToManyRelationshipMetadataCreate should require all fields
const manyToManyCreate: ManyToManyRelationshipMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata",
  SchemaName: "new_entity1_entity2",
  Entity1LogicalName: "new_entity1",
  Entity2LogicalName: "new_entity2",
  IntersectEntityName: "new_entity1_entity2",
};

expectType<ManyToManyRelationshipMetadataCreate>(manyToManyCreate);

// ==================== Option Set Metadata Type Tests ====================

// OptionSetMetadataCreate should require correct structure
const optionSetCreate: OptionSetMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
  Name: "new_colors",
  DisplayName: {
    "@odata.type": "Microsoft.Dynamics.CRM.Label",
    LocalizedLabels: [
      {
        "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
        Label: "Colors",
        LanguageCode: 1033,
      },
    ],
  },
  OptionSetType: "Picklist",
  Options: [
    {
      Value: 1,
      Label: {
        "@odata.type": "Microsoft.Dynamics.CRM.Label",
        LocalizedLabels: [
          {
            "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
            Label: "Red",
            LanguageCode: 1033,
          },
        ],
      },
    },
  ],
};

expectType<OptionSetMetadataCreate>(optionSetCreate);

// ==================== Label Type Tests ====================

// Label should require @odata.type
const label: Label = {
  "@odata.type": "Microsoft.Dynamics.CRM.Label",
  LocalizedLabels: [
    {
      "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
      Label: "Test",
      LanguageCode: 1033,
    },
  ],
};

expectType<Label>(label);

// LocalizedLabel should require all fields
const localizedLabel: LocalizedLabel = {
  "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
  Label: "Test Label",
  LanguageCode: 1033,
};

expectType<LocalizedLabel>(localizedLabel);

// LocalizedLabel should reject missing required fields
expectError<LocalizedLabel>({
  "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
  // Label is missing
  LanguageCode: 1033,
});

expectError<LocalizedLabel>({
  "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
  Label: "Test",
  // LanguageCode is missing
});

// ==================== Discriminated Union Tests ====================

// AttributeMetadataCreateTypes should enforce correct @odata.type
function processAttribute(attr: AttributeMetadataCreateTypes) {
  if (attr["@odata.type"] === "Microsoft.Dynamics.CRM.StringAttributeMetadata") {
    // Within this block, TypeScript should narrow to StringAttributeMetadataCreate
    expectType<number | undefined>(attr.MaxLength);
  } else if (attr["@odata.type"] === "Microsoft.Dynamics.CRM.IntegerAttributeMetadata") {
    // Within this block, TypeScript should narrow to IntegerAttributeMetadataCreate
    expectType<number | undefined>(attr.MinValue);
    expectType<number | undefined>(attr.MaxValue);
  }
}

// Should accept valid string attribute
processAttribute(stringAttrCreate);

// Should accept valid integer attribute
processAttribute(intAttrCreate);

// ==================== EntityMetadata Read Type Tests ====================

// EntityMetadata should include read-only fields
const entityRead: EntityMetadata = {
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  MetadataId: "00000000-0000-0000-0000-000000000001",
  LogicalName: "account",
  SchemaName: "Account",
  EntitySetName: "accounts",
  DisplayName: {
    UserLocalizedLabel: { Label: "Account", LanguageCode: 1033 },
    LocalizedLabels: [{ Label: "Account", LanguageCode: 1033 }],
  },
  IsCustomEntity: false,
  IsActivity: false,
};

expectType<EntityMetadata>(entityRead);

// MetadataId should be present in read type
expectType<string | undefined>(entityRead.MetadataId);

// LogicalName should be present in read type
expectType<string | undefined>(entityRead.LogicalName);

// ==================== Enums are member names (#66) ====================

// The Web API reads and writes enum members by name; numbers are rejected.
expectType<"UserOwned">(OwnershipTypes.UserOwned);
expectType<"ApplicationRequired">(AttributeRequiredLevel.ApplicationRequired);
expectType<"And">(LogicalOperator.And);
expectType<"All">(DeletedMetadataFilters.All);
expectAssignable<OwnershipTypes>("UserOwned");
expectAssignable<OwnershipTypes>(OwnershipTypes.OrganizationOwned);
expectNotAssignable<OwnershipTypes>(1);
expectNotAssignable<AttributeRequiredLevel>(2);
expectNotAssignable<OwnershipTypes>("userowned");

// Read types use the same names, so comparing a response value with a member type-checks.
declare const readEntity: EntityMetadata;
expectType<OwnershipTypes | undefined>(readEntity.OwnershipType);

expectError<EntityMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  SchemaName: "new_custom",
  OwnershipType: 1,
});

expectError<StringAttributeMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  SchemaName: "new_field",
  RequiredLevel: { Value: 2 },
});

// ==================== Create payloads (#171) ====================

// Column, relationship and choice creates need @odata.type (their collections hold several
// types); a table create needs SchemaName, and @odata.type is optional.
expectAssignable<EntityMetadataCreate>({ SchemaName: "new_custom" });
expectError<EntityMetadataCreate>({ DisplayName: { LocalizedLabels: [] } });
expectError<EntityMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.AttributeMetadata",
  SchemaName: "new_custom",
});
expectError<OptionSetMetadataCreate>({ Name: "new_colors" });
expectError<StringAttributeMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
});

// The abstract AttributeMetadata can't be created ("Attribute of type AttributeMetadata cannot be
// created through the SDK"), so it is not a member of the create union.
expectNotAssignable<AttributeMetadataCreateTypes>({
  "@odata.type": "Microsoft.Dynamics.CRM.AttributeMetadata",
  SchemaName: "new_field",
});

// A table create can carry its primary name column as a column create payload.
expectAssignable<EntityMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  SchemaName: "new_project",
  OwnershipType: OwnershipTypes.UserOwned,
  HasActivities: false,
  Attributes: [stringAttrCreate],
});

// A retrieved definition can be sent back as an update, with its @odata.type (#359).
expectAssignable<EntityMetadataUpdate>({
  ...readEntity,
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
});

// A 1:N create needs both tables and the lookup.
expectError<OneToManyRelationshipMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
  SchemaName: "new_parent_child",
  ReferencedEntity: "new_parent",
});

// ==================== MetadataClient signatures ====================

declare const metadata: MetadataClient;
expectType<Promise<string>>(metadata.createEntityDefinition(entityCreate));
expectType<Promise<string>>(metadata.createAttributeDefinition("account", intAttrCreate));
expectType<Promise<string>>(metadata.createOneToManyRelationship(oneToManyCreate));
expectType<Promise<string>>(metadata.createManyToManyRelationship(manyToManyCreate));
expectType<Promise<string>>(metadata.createGlobalOptionSet(optionSetCreate));

// ==================== Updates are full definitions (#359) ====================
// A metadata update is a PUT that replaces the definition, so an update body is the complete
// definition with its @odata.type, not a few changed properties.

declare const displayName: Label;
declare const readString: StringAttributeMetadata;
declare const readOptionSet: OptionSetMetadata;
declare const readOneToMany: OneToManyRelationshipMetadata;

// A partial body without @odata.type doesn't compile.
expectError(metadata.updateAttributeDefinition("account", "new_field", { DisplayName: displayName }));
expectError(metadata.updateEntityDefinition("account", { DisplayName: displayName }));
expectError(metadata.updateGlobalOptionSet("new_colors", { DisplayName: displayName }));
expectError(metadata.updateOneToManyRelationship("new_rel", { IsValidForAdvancedFind: true }));
expectError(metadata.updateManyToManyRelationship("new_rel", { IsValidForAdvancedFind: true }));
expectNotAssignable<AttributeMetadataUpdateTypes>({ DisplayName: displayName });
expectNotAssignable<OptionSetMetadataUpdate>({ DisplayName: displayName });
expectNotAssignable<OneToManyRelationshipMetadataUpdate>({ IsValidForAdvancedFind: true });
expectNotAssignable<ManyToManyRelationshipMetadataUpdate>({ IsValidForAdvancedFind: true });
// The abstract AttributeMetadata isn't a column type to update either.
expectNotAssignable<AttributeMetadataUpdateTypes>({
  "@odata.type": "Microsoft.Dynamics.CRM.AttributeMetadata",
  DisplayName: displayName,
});

// The retrieve, change, PUT pattern: a retrieved definition plus its @odata.type.
expectType<Promise<void>>(
  metadata.updateAttributeDefinition("account", "new_field", {
    ...readString,
    "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
    DisplayName: displayName,
  })
);
expectType<Promise<void>>(
  metadata.updateGlobalOptionSet("new_colors", {
    ...readOptionSet,
    "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
  })
);
expectType<Promise<void>>(
  metadata.updateOneToManyRelationship("new_rel", {
    ...readOneToMany,
    "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
  })
);
// The @odata.type narrows the column's own properties: MaxLength is a text column's.
expectError<AttributeMetadataUpdateTypes>({
  "@odata.type": "Microsoft.Dynamics.CRM.BooleanAttributeMetadata",
  MaxLength: 100,
});

// The merge helpers take only the changes. Columns and relationships name their type, which the
// GET casts to; a table and a global choice have one type.
expectType<Promise<void>>(
  metadata.mergeAndUpdateAttributeDefinition("account", "new_field", {
    "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
    MaxLength: 200,
  })
);
expectError(
  metadata.mergeAndUpdateAttributeDefinition("account", "new_field", { MaxLength: 200 })
);
expectType<Promise<void>>(
  metadata.mergeAndUpdateRelationship("new_rel", {
    "@odata.type": "Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata",
    IsValidForAdvancedFind: false,
  })
);
expectError(metadata.mergeAndUpdateRelationship("new_rel", { IsValidForAdvancedFind: false }));
expectType<Promise<void>>(
  metadata.mergeAndUpdateGlobalOptionSet("new_colors", { DisplayName: displayName })
);
expectType<Promise<void>>(
  metadata.mergeAndUpdateEntityDefinition("account", { DisplayName: displayName })
);
expectAssignable<EntityMetadataChanges>({ HasNotes: true });
expectAssignable<OptionSetMetadataChanges>({ DisplayName: displayName });

// ==================== Polymorphic lookup actions (#219) ====================

import type {
  CreateCustomerRelationshipsParams,
  CreatePolymorphicLookupAttributeParams,
} from "../src/types/index.js";

const polyLabel: Label = { LocalizedLabels: [{ Label: "Customer", LanguageCode: 1033 }] };

// Every parameter of both actions (Lookup, OneToManyRelationships, SolutionUniqueName) and the
// documented nested properties are accepted without a cast.
expectAssignable<CreateCustomerRelationshipsParams>({
  Lookup: {
    "@odata.type": "Microsoft.Dynamics.CRM.ComplexLookupAttributeMetadata",
    SchemaName: "new_CustomerId",
    DisplayName: polyLabel,
    Description: polyLabel,
    RequiredLevel: { Value: AttributeRequiredLevel.ApplicationRequired },
  },
  OneToManyRelationships: [
    {
      "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
      SchemaName: "new_account_projects",
      ReferencedEntity: "account",
      ReferencedAttribute: "accountid",
      ReferencingEntity: "new_project",
      CascadeConfiguration: { Delete: "RemoveLink" },
    },
  ],
  SolutionUniqueName: "MySolution",
});

expectAssignable<CreatePolymorphicLookupAttributeParams>({
  Lookup: {
    "@odata.type": "Microsoft.Dynamics.CRM.ComplexLookupAttributeMetadata",
    SchemaName: "new_RegardingId",
    DisplayName: polyLabel,
    Targets: ["account", "contact"],
  },
  OneToManyRelationships: [
    { SchemaName: "a", ReferencedEntity: "account", ReferencingEntity: "new_task" },
    { SchemaName: "b", ReferencedEntity: "contact", ReferencingEntity: "new_task" },
  ],
  SolutionUniqueName: "MySolution",
});

// Required members stay required.
expectNotAssignable<CreateCustomerRelationshipsParams>({
  Lookup: { SchemaName: "new_CustomerId" },
  OneToManyRelationships: [{ SchemaName: "a", ReferencedEntity: "account" }],
});
expectNotAssignable<CreatePolymorphicLookupAttributeParams>({
  Lookup: { SchemaName: "new_RegardingId" },
  OneToManyRelationships: [],
});

// ==================== Accurate create and action types (#324) ====================

import type {
  DateTimeAttributeMetadataCreate,
  DeleteOptionValueParams,
  InsertOptionValueParams,
  InsertStatusValueParams,
  MoneyAttributeMetadataCreate,
  MultiSelectPicklistAttributeMetadataCreate,
  OrderOptionParams,
  PicklistAttributeMetadataCreate,
  UpdateOptionValueParams,
} from "../src/types/index.js";

const choiceLabel: Label = { LocalizedLabels: [{ Label: "Choice", LanguageCode: 1033 }] };

// A date column needs no MinSupportedValue / MaxSupportedValue: Dataverse sets them.
const dueDate: DateTimeAttributeMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.DateTimeAttributeMetadata",
  SchemaName: "new_DueDate",
  DisplayName: choiceLabel,
  RequiredLevel: { Value: "None" },
  Format: "DateOnly",
};
expectAssignable<AttributeMetadataCreateTypes>(dueDate);
expectType<Promise<string>>(metadata.createAttributeDefinition("account", dueDate));

// ... and doesn't accept them, nor other read-only properties.
expectError<DateTimeAttributeMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.DateTimeAttributeMetadata",
  SchemaName: "new_DueDate",
  MinSupportedValue: "1753-01-01T00:00:00Z",
});
expectError<StringAttributeMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  SchemaName: "new_field",
  DatabaseLength: 200,
});
expectError<StringAttributeMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  SchemaName: "new_field",
  AttributeType: "String",
});
expectError<StringAttributeMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  SchemaName: "new_field",
  IsValidForRead: true,
});
expectError<MoneyAttributeMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.MoneyAttributeMetadata",
  SchemaName: "new_amount",
  IsBaseCurrency: true,
});
expectError<OptionSetMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
  Name: "new_colors",
  Options: [{ Value: 1, Label: choiceLabel, MetadataId: "00000000-0000-0000-0000-000000000001" }],
});
// A table create ignores these (checked live), so they aren't accepted.
expectError<EntityMetadataCreate>({ SchemaName: "new_custom", IsImportable: false });
expectError<EntityMetadataCreate>({ SchemaName: "new_custom", LogicalCollectionName: "x" });
expectAssignable<EntityMetadataCreate>({ SchemaName: "new_custom", IsBPFEntity: false });

// A choice column binds to an existing global choice by MetadataId ...
const boundById: PicklistAttributeMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
  SchemaName: "new_Color",
  DisplayName: choiceLabel,
  "GlobalOptionSet@odata.bind": "/GlobalOptionSetDefinitions(00000000-0000-0000-0000-000000000001)",
};
expectAssignable<AttributeMetadataCreateTypes>(boundById);
expectAssignable<MultiSelectPicklistAttributeMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata",
  SchemaName: "new_Colors",
  "GlobalOptionSet@odata.bind": "/GlobalOptionSetDefinitions(00000000-0000-0000-0000-000000000001)",
});
expectType<Promise<string>>(metadata.createAttributeDefinition("account", boundById));
// An id read at run time is interpolated without a cast.
declare const globalChoiceId: string;
expectAssignable<PicklistAttributeMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
  SchemaName: "new_Color",
  "GlobalOptionSet@odata.bind": `/GlobalOptionSetDefinitions(${globalChoiceId})`,
});

// ... or has its own options, without @odata.type on the nested OptionSet but with
// IsGlobal: false, which Dataverse requires ("IsGlobal is not specified").
const localChoice: PicklistAttributeMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
  SchemaName: "new_Size",
  OptionSet: {
    IsGlobal: false,
    OptionSetType: "Picklist",
    Options: [{ Value: 1, Label: choiceLabel }],
  },
};
expectAssignable<AttributeMetadataCreateTypes>(localChoice);
expectAssignable<MultiSelectPicklistAttributeMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata",
  SchemaName: "new_Sizes",
  OptionSet: { IsGlobal: false, Options: [{ Value: 1, Label: choiceLabel }] },
});
expectNotAssignable<PicklistAttributeMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
  SchemaName: "new_Size",
  OptionSet: { Options: [{ Value: 1, Label: choiceLabel }] },
});

// Exactly one of the two (Dataverse accepts both and picks one), and the bind is a
// GlobalOptionSetDefinitions path.
expectNotAssignable<PicklistAttributeMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
  SchemaName: "new_Color",
  "GlobalOptionSet@odata.bind": "/GlobalOptionSetDefinitions(00000000-0000-0000-0000-000000000001)",
  OptionSet: { IsGlobal: false, Options: [] },
});
expectNotAssignable<PicklistAttributeMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
  SchemaName: "new_Color",
});
expectNotAssignable<PicklistAttributeMetadataCreate>({
  "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
  SchemaName: "new_Color",
  "GlobalOptionSet@odata.bind": "new_colors",
});

// Option-value actions target a local choice or a global choice: exactly one.
expectAssignable<InsertOptionValueParams>({ OptionSetName: "new_colors", Label: choiceLabel });
expectAssignable<InsertOptionValueParams>({
  EntityLogicalName: "account",
  AttributeLogicalName: "new_size",
  Label: choiceLabel,
  Value: 100000003,
  Description: choiceLabel,
  Color: "#FF0000",
  IsHidden: false,
  SolutionUniqueName: "MySolution",
});
expectNotAssignable<InsertOptionValueParams>({
  OptionSetName: "new_colors",
  EntityLogicalName: "account",
  AttributeLogicalName: "new_size",
  Label: choiceLabel,
});
expectNotAssignable<InsertOptionValueParams>({ Label: choiceLabel });
expectNotAssignable<InsertOptionValueParams>({ EntityLogicalName: "account", Label: choiceLabel });

expectAssignable<UpdateOptionValueParams>({
  OptionSetName: "new_colors",
  Value: 1,
  Label: choiceLabel,
  MergeLabels: true,
});
expectNotAssignable<UpdateOptionValueParams>({ OptionSetName: "new_colors", Value: 1 });
expectNotAssignable<UpdateOptionValueParams>({
  OptionSetName: "new_colors",
  EntityLogicalName: "account",
  AttributeLogicalName: "new_size",
  Value: 1,
  MergeLabels: true,
});

expectAssignable<DeleteOptionValueParams>({ OptionSetName: "new_colors", Value: 1 });
expectAssignable<DeleteOptionValueParams>({
  EntityLogicalName: "account",
  AttributeLogicalName: "new_size",
  Value: 1,
  SolutionUniqueName: "MySolution",
});
expectNotAssignable<DeleteOptionValueParams>({
  OptionSetName: "new_colors",
  AttributeLogicalName: "new_size",
  Value: 1,
});

expectAssignable<OrderOptionParams>({ OptionSetName: "new_colors", Values: [2, 1] });
expectAssignable<OrderOptionParams>({
  EntityLogicalName: "account",
  AttributeLogicalName: "new_size",
  Values: [2, 1],
});
expectNotAssignable<OrderOptionParams>({
  OptionSetName: "new_colors",
  EntityLogicalName: "account",
  AttributeLogicalName: "new_size",
  Values: [2, 1],
});

// Status reasons belong to a table's statuscode column: a local target only.
expectAssignable<InsertStatusValueParams>({
  EntityLogicalName: "account",
  AttributeLogicalName: "statuscode",
  StateCode: 1,
  Label: choiceLabel,
  Description: choiceLabel,
});
expectNotAssignable<InsertStatusValueParams>({
  OptionSetName: "new_colors",
  StateCode: 1,
  Label: choiceLabel,
});

expectType<Promise<void>>(metadata.deleteOptionValue({ OptionSetName: "new_colors", Value: 1 }));
