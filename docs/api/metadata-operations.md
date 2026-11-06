# Metadata Operations - Complete API Reference

Complete documentation for `@mohsinonxrm/dataverse-sdk-metadata`: the `MetadataClient` methods for managing Dataverse metadata.

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
  OwnershipType: 1, // UserOwned
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

**Important**: Uses HTTP PUT (not PATCH), which replaces the definition. A property you leave
out is reset to its default, so send the complete definition.

```typescript
// Retrieve the current definition, apply the change and PUT the result
await metadataClient.mergeAndUpdateEntityDefinition("new_project", {
  DisplayName: {
    LocalizedLabels: [{ Label: "Updated Project", LanguageCode: 1033 }],
  },
});
```

### Created IDs and Solutions

Every `create*` method returns the new component's `MetadataId`, read from the `OData-EntityId`
header of Dataverse's `204 No Content` response. Every create and update takes an optional last
argument `{ solutionUniqueName }`, sent as `MSCRM.SolutionUniqueName`:

```typescript
const id = await metadataClient.createEntityDefinition(definition, {
  solutionUniqueName: "ContosoProjects",
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

`canBeReferenced`, `canBeReferencing` and `canManyToMany` send Web API actions
(`POST /CanBeReferenced` with `{ "EntityName": "…" }`) and return a `boolean`. The `getValid*`
methods send functions (`GET`) and return `string[]`.

### Check if Entity Can Be Primary (1) in 1:N

```typescript
const canBeReferenced: boolean = await metadataClient.canBeReferenced("new_project");
```

### Check if Entity Can Be Related (Many) in 1:N

```typescript
const canBeReferencing: boolean = await metadataClient.canBeReferencing("new_project");
```

### Check N:N Support

```typescript
const canManyToMany: boolean = await metadataClient.canManyToMany("new_project");
```

### Get Valid Referencing and Referenced Entities

```typescript
// Tables that can reference account (be the "many" side)
const referencing: string[] = await metadataClient.getValidReferencingEntities("account");
// Tables that contact can reference (be the "one" side)
const referenced: string[] = await metadataClient.getValidReferencedEntities("contact");
// Every table that can take part in an N:N relationship; takes no argument
const manyToMany: string[] = await metadataClient.getValidManyToMany();
```

## Metadata Change Tracking

### RetrieveMetadataChanges

`retrieveMetadataChanges(query, clientVersionStamp?, deletedMetadataFilters?)` takes positional
arguments. `RetrieveMetadataChanges` is a function, so the SDK sends
`GET /RetrieveMetadataChanges(Query=@p1,ClientVersionStamp=@p2,DeletedMetadataFilters=@p3)?@p1=<json>…`.

```typescript
import {
  LogicalOperator,
  MetadataConditionOperator,
  type EntityQueryExpression,
} from "@mohsinonxrm/dataverse-sdk-metadata";

const query: EntityQueryExpression = {
  Criteria: {
    FilterOperator: LogicalOperator.And,
    Conditions: [
      {
        PropertyName: "SchemaName",
        ConditionOperator: MetadataConditionOperator.Equals,
        Value: { Type: "System.String", Value: "new_project" },
      },
    ],
  },
  Properties: { AllProperties: false, PropertyNames: ["DisplayName", "SchemaName"] },
};

const first = await metadataClient.retrieveMetadataChanges(query);

// Later: only what changed since the first call, including deleted tables
const response = await metadataClient.retrieveMetadataChanges(
  query,
  first.ServerVersionStamp,
  "Default" // DeletedMetadataFilters member name(s), e.g. "Default", "Attribute", "All"
);

console.log("Server version:", response.ServerVersionStamp);
console.log("Deleted metadata:", response.DeletedMetadata);
```

Enum members in the query are sent by name (`"And"`, `"Equals"`); Dataverse rejects numbers there.

## Complete Method List

**Entity Operations (6):**

- getEntityDefinitions
- getEntityDefinition
- createEntityDefinition
- updateEntityDefinition (uses PUT)
- mergeAndUpdateEntityDefinition (retrieve, merge, PUT)
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

## Important Notes

1. **Update Operations Use PUT**: Per Microsoft documentation, all metadata update operations must use HTTP PUT (not PATCH). A PUT replaces the definition, so send the complete definition, not just changed properties, or use `mergeAndUpdateEntityDefinition()` for tables.

2. **MSCRM.MergeLabels Header**: Every update sends `MSCRM.MergeLabels: true`, so labels are merged instead of replaced.

3. **Publishing**: Metadata changes must be published using PublishXml or PublishAllXml action before they take effect.

4. **Solution Context**: Pass `{ solutionUniqueName }` as the last argument of any create or update; the SDK sends it as the `MSCRM.SolutionUniqueName` header.

## Reference Documentation

- [Microsoft Dataverse Web API Metadata Operations](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/use-web-api-metadata)
- [Create and Update Entities](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/create-update-entity-definitions-using-web-api)
- [Create and Update Columns](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/create-update-column-definitions-using-web-api)
- [Create and Update Relationships](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/create-update-entity-relationships-using-web-api)
- [Create and Update Choice](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/create-update-optionsets)
- [Multi-table Lookups](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/multitable-lookup)
