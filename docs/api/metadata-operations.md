# Metadata Operations - Complete API Reference

Complete documentation for `@mohsinonxrm/dataverse-sdk-metadata` - all 45 methods for managing Dataverse metadata.

## Table of Contents

1. [Entity Operations](#entity-operations)
2. [Column (Attribute) Operations](#column-operations)
3. [Relationship Operations](#relationship-operations)
4. [Global Choice Operations](#global-choice-operations)
5. [Option Value Management](#option-value-management)
6. [Polymorphic Lookups](#polymorphic-lookups)
7. [Relationship Eligibility](#relationship-eligibility)
8. [Metadata Change Tracking](#metadata-change-tracking)

## Entity Operations

### Create Entity

```typescript
const metadataId = await metadataClient.createEntityDefinition({
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  SchemaName: "new_Project",
  DisplayName: {
    LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }],
  },
  DisplayCollectionName: {
    LocalizedLabels: [{ Label: "Projects", LanguageCode: 1033 }],
  },
  OwnershipType: "UserOwned", // or OwnershipTypes.UserOwned
  HasActivities: true,
  Attributes: [
    {
      "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
      SchemaName: "new_Name",
      RequiredLevel: { Value: "ApplicationRequired" },
      MaxLength: 100,
      DisplayName: {
        LocalizedLabels: [{ Label: "Name", LanguageCode: 1033 }],
      },
      IsPrimaryName: true,
    },
  ],
});
```

### Update Entity

**Important**: Uses HTTP PUT (not PATCH) - must send complete definition.

```typescript
await metadataClient.updateEntityDefinition("new_project", {
  // Send complete entity definition with changes
  DisplayName: {
    LocalizedLabels: [{ Label: "Updated Project", LanguageCode: 1033 }],
  },
  // ... all other properties
});
```

## Column Operations

### Create Column - All 12 Types

**Text Column:**

```typescript
const attrId = await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  SchemaName: "new_Description",
  MaxLength: 500,
  DisplayName: {
    LocalizedLabels: [{ Label: "Description", LanguageCode: 1033 }],
  },
});
```

**Choice Column (Local):**

```typescript
await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
  SchemaName: "new_Status",
  OptionSet: {
    Options: [
      { Value: 1, Label: { LocalizedLabels: [{ Label: "Active", LanguageCode: 1033 }] } },
      { Value: 2, Label: { LocalizedLabels: [{ Label: "Inactive", LanguageCode: 1033 }] } },
    ],
  },
  DisplayName: {
    LocalizedLabels: [{ Label: "Status", LanguageCode: 1033 }],
  },
});
```

**Choice Column (Global):**

```typescript
await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
  SchemaName: "new_Priority",
  "GlobalOptionSet@odata.bind": "/GlobalOptionSetDefinitions(new_priorities)",
  DisplayName: {
    LocalizedLabels: [{ Label: "Priority", LanguageCode: 1033 }],
  },
});
```

## Relationship Operations

### Create One-to-Many Relationship

```typescript
const relId = await metadataClient.createOneToManyRelationship({
  "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
  SchemaName: "new_account_project",
  ReferencedEntity: "account",
  ReferencingEntity: "new_project",
  CascadeConfiguration: {
    Assign: "NoCascade",
    Delete: "RemoveLink",
    Merge: "Cascade",
    Reparent: "NoCascade",
    Share: "NoCascade",
    Unshare: "NoCascade",
  },
  Lookup: {
    "@odata.type": "Microsoft.Dynamics.CRM.LookupAttributeMetadata",
    SchemaName: "new_AccountId",
    DisplayName: {
      LocalizedLabels: [{ Label: "Account", LanguageCode: 1033 }],
    },
  },
});
```

### Create Many-to-Many Relationship

```typescript
const relId = await metadataClient.createManyToManyRelationship({
  "@odata.type": "Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata",
  SchemaName: "new_project_contact",
  Entity1LogicalName: "new_project",
  Entity2LogicalName: "contact",
  IntersectEntityName: "new_project_contact",
});
```

## Global Choice Operations

### Create Global Choice

```typescript
const optionSetId = await metadataClient.createGlobalOptionSet({
  "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
  Name: "new_priorities",
  DisplayName: {
    LocalizedLabels: [{ Label: "Priorities", LanguageCode: 1033 }],
  },
  Options: [
    { Value: 1, Label: { LocalizedLabels: [{ Label: "High", LanguageCode: 1033 }] } },
    { Value: 2, Label: { LocalizedLabels: [{ Label: "Medium", LanguageCode: 1033 }] } },
    { Value: 3, Label: { LocalizedLabels: [{ Label: "Low", LanguageCode: 1033 }] } },
  ],
});
```

## Option Value Management

### Insert Option Value

```typescript
const response = await metadataClient.insertOptionValue({
  EntityLogicalName: "new_project",
  AttributeLogicalName: "new_status",
  Value: 3,
  Label: {
    LocalizedLabels: [{ Label: "On Hold", LanguageCode: 1033 }],
  },
});
console.log("New value:", response.NewOptionValue);
```

### Update Option Value

```typescript
await metadataClient.updateOptionValue({
  EntityLogicalName: "new_project",
  AttributeLogicalName: "new_status",
  Value: 1,
  Label: {
    LocalizedLabels: [{ Label: "Updated Active", LanguageCode: 1033 }],
  },
  MergeLabels: true,
});
```

### Delete Option Value

```typescript
await metadataClient.deleteOptionValue({
  EntityLogicalName: "new_project",
  AttributeLogicalName: "new_status",
  Value: 3,
});
```

### Reorder Options

```typescript
await metadataClient.orderOptions({
  EntityLogicalName: "new_project",
  AttributeLogicalName: "new_status",
  Values: [2, 1, 3], // New order
});
```

### Insert Status Value

```typescript
const response = await metadataClient.insertStatusValue({
  EntityLogicalName: "new_project",
  AttributeLogicalName: "statuscode",
  StateCode: 1, // Inactive state
  Label: {
    LocalizedLabels: [{ Label: "Archived", LanguageCode: 1033 }],
  },
});
```

## Polymorphic Lookups

### Create Customer Lookup (Account/Contact)

```typescript
const response = await metadataClient.createCustomerRelationship({
  "@odata.type": "Microsoft.Dynamics.CRM.ComplexLookupAttributeMetadata",
  SchemaName: "new_CustomerId",
  DisplayName: {
    LocalizedLabels: [{ Label: "Customer", LanguageCode: 1033 }],
  },
  // Creates relationships to both account and contact
});
```

### Create Multi-Table Lookup

```typescript
const response = await metadataClient.createPolymorphicLookup({
  LookupAttributeLogicalName: "new_relateditem",
  LookupAttributeDisplayName: {
    LocalizedLabels: [{ Label: "Related Item", LanguageCode: 1033 }],
  },
  OneToManyRelationships: [
    {
      SchemaName: "new_project_relateditem_book",
      ReferencedEntity: "new_book",
      ReferencingEntity: "new_project",
    },
    {
      SchemaName: "new_project_relateditem_video",
      ReferencedEntity: "new_video",
      ReferencingEntity: "new_project",
    },
  ],
});
```

## Relationship Eligibility

### Check if Entity Can Be Primary (1) in 1:N

```typescript
const response = await metadataClient.canBeReferenced("new_project");
console.log("Can be referenced:", response.CanBeReferenced);
```

### Check if Entity Can Be Related (Many) in 1:N

```typescript
const response = await metadataClient.canBeReferencing("new_project");
console.log("Can be referencing:", response.CanBeReferencing);
```

### Check N:N Support

```typescript
const response = await metadataClient.canManyToMany("new_project");
console.log("Supports N:N:", response.CanManyToMany);
```

### Get Valid Referencing Entities

```typescript
const response = await metadataClient.getValidReferencingEntities("account");
console.log("Entities that can reference account:", response.EntityNames);
```

## Metadata Change Tracking

### RetrieveMetadataChanges

```typescript
const response = await metadataClient.retrieveMetadataChanges({
  Query: {
    "@odata.type": "Microsoft.Dynamics.CRM.EntityQueryExpression",
    Criteria: {
      Conditions: [
        {
          PropertyName: "SchemaName",
          ConditionOperator: "Equals",
          Value: { Value: "new_project" },
        },
      ],
    },
    Properties: {
      PropertyNames: ["DisplayName", "SchemaName", "Attributes"],
    },
  },
  ClientVersionStamp: previousVersionStamp, // From previous call
  DeletedMetadataFilters: "Entity",
});

console.log("Server version:", response.ServerVersionStamp);
console.log("Deleted metadata:", response.DeletedMetadata);
```

## Complete Method List

**Entity Operations (5):**

- getEntityDefinitions
- getEntityDefinition
- createEntityDefinition
- updateEntityDefinition (uses PUT)
- deleteEntityDefinition

**Attribute Operations (5):**

- getAttributeDefinitions
- getAttributeDefinition
- createAttributeDefinition
- updateAttributeDefinition (uses PUT)
- deleteAttributeDefinition

**Relationship Operations (11):**

- getOneToManyRelationships
- getManyToOneRelationships
- getManyToManyRelationships
- getRelationshipBySchemaName
- getRelationshipByMetadataId
- createOneToManyRelationship
- createManyToManyRelationship
- updateOneToManyRelationship (uses PUT)
- updateManyToManyRelationship (uses PUT)
- deleteRelationship
- deleteRelationshipBySchemaName

**Global Choice Operations (5):**

- getGlobalOptionSets
- getGlobalOptionSet
- createGlobalOptionSet
- updateGlobalOptionSet (uses PUT)
- deleteGlobalOptionSet

**Option Value Operations (5):**

- insertOptionValue
- updateOptionValue
- deleteOptionValue
- orderOptions
- insertStatusValue

**Polymorphic Lookup Operations (2):**

- createCustomerRelationship
- createPolymorphicLookup

**Relationship Eligibility Operations (6):**

- canBeReferenced
- canBeReferencing
- canManyToMany
- getValidReferencingEntities
- getValidReferencedEntities
- getValidManyToMany

**Metadata Change Tracking (1):**

- retrieveMetadataChanges

**Total: 45 methods**

## Important Notes

1. **Update Operations Use PUT**: Per Microsoft documentation, all metadata update operations must use HTTP PUT (not PATCH). This means you must send the complete definition, not just changed properties.

2. **MSCRM.MergeLabels Header**: When updating, set `MSCRM.MergeLabels: true` header to merge labels instead of replacing them.

3. **Publishing**: Metadata changes must be published using PublishXml or PublishAllXml action before they take effect.

4. **Solution Context**: Use `MSCRM.SolutionUniqueName` header to associate changes with a specific solution.

## Reference Documentation

- [Microsoft Dataverse Web API Metadata Operations](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/use-web-api-metadata)
- [Create and Update Entities](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/create-update-entity-definitions-using-web-api)
- [Create and Update Columns](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/create-update-column-definitions-using-web-api)
- [Create and Update Relationships](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/create-update-entity-relationships-using-web-api)
- [Create and Update Choice](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/create-update-optionsets)
- [Multi-table Lookups](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/multitable-lookup)
