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

// EntityMetadataUpdate should allow partial properties
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

// A retrieved definition can be sent back as an update.
expectAssignable<EntityMetadataUpdate>(readEntity);

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
