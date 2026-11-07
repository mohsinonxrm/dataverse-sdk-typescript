# @mohsinonxrm/dataverse-sdk-metadata

Complete TypeScript metadata management for Microsoft Dataverse - create, read, update, and delete entities, columns, relationships, and choices with full type safety.

## Features

- ✅ **Entity definitions** - create, read, update, delete custom tables
- ✅ **Column definitions** - all attribute types with strict typing:
  - Text (Single Line, Multiple Lines)
  - Numbers (Integer, Decimal, Currency)
  - Date & Time
  - Choices (Local & Global)
  - Yes/No (Boolean)
  - Lookup (Single-table & Polymorphic)
  - File & Image
- ✅ **Relationships** - one-to-many (1:N), many-to-one (N:1), many-to-many (N:N)
- ✅ **Global choices (option sets)** - create, update, delete global choice lists
- ✅ **Option value management** - insert, update, delete, reorder choice options
- ✅ **Polymorphic lookups** - customer and multi-table lookup columns
- ✅ **Relationship eligibility** - check which entities can participate in relationships
- ✅ **Metadata change tracking** - RetrieveMetadataChanges with version stamps
- ✅ **Strict typing** - separate Read/Create/Update types, internal fields excluded
- ✅ **ESM-only** - works in Node 22+ and browsers

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-metadata @mohsinonxrm/dataverse-sdk-core
```

## Quick Start

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MetadataClient } from "@mohsinonxrm/dataverse-sdk-metadata";

const client = new DataverseClient({
  baseUrl: "https://yourorg.crm.dynamics.com",
  tokenProvider: yourTokenProvider,
});

const metadataClient = new MetadataClient(client);

// Create a custom table
const entityId = await metadataClient.createEntityDefinition({
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
  HasNotes: true,
  Attributes: [
    // Primary name column (required)
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

---

## Entity Operations

### Create Entity

```typescript
const metadataId = await metadataClient.createEntityDefinition({
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  SchemaName: "new_Task",
  DisplayName: { LocalizedLabels: [{ Label: "Task", LanguageCode: 1033 }] },
  DisplayCollectionName: { LocalizedLabels: [{ Label: "Tasks", LanguageCode: 1033 }] },
  Description: { LocalizedLabels: [{ Label: "Project task tracking", LanguageCode: 1033 }] },
  OwnershipType: "UserOwned", // or OwnershipTypes.UserOwned
  IsActivity: false,
  HasActivities: true,
  HasNotes: true,
  Attributes: [
    {
      "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
      SchemaName: "new_Name",
      DisplayName: { LocalizedLabels: [{ Label: "Task Name", LanguageCode: 1033 }] },
      RequiredLevel: { Value: "ApplicationRequired" },
      MaxLength: 100,
      IsPrimaryName: true,
    },
  ],
});
```

### Read Entities

```typescript
// Get all custom entities
const customEntities = await metadataClient.getEntityDefinitions({
  filter: "IsCustomEntity eq true",
  select: ["LogicalName", "DisplayName", "SchemaName"],
});

// Get specific entity with attributes expanded
const projectEntity = await metadataClient.getEntityDefinition("new_project", {
  expand: "Attributes",
});

// Labels in specific languages (LCIDs), sent as LabelLanguages
const labels = await metadataClient.getEntityDefinition("account", {
  select: ["DisplayName"],
  labelLanguages: [1033, 1036],
});
```

### Entity Set Names

`getEntitySetName()` reads the entity set name used in Web API URLs from metadata, so you don't
have to guess the plural. The first call loads every table's name in one request and caches the
map on the `MetadataClient`; `clearEntitySetNameCache()` forgets it.

```typescript
const set = await metadataClient.getEntitySetName("opportunity"); // "opportunities"
const record = await client.api(`${set}(${id})`).get();
```

### Read Columns by Type

Type-specific properties, such as a choice column's options, a lookup's `Targets` or a text
column's `MaxLength`, are only available through a type cast. Pass `cast` and the results are
typed accordingly:

```typescript
// GET EntityDefinitions(LogicalName='account')/Attributes/Microsoft.Dynamics.CRM.PicklistAttributeMetadata
//   ?LabelLanguages=1033&$select=LogicalName&$expand=OptionSet($select=Options),GlobalOptionSet($select=Options)
const picklists = await metadataClient.getAttributeDefinitions("account", {
  cast: "PicklistAttributeMetadata",
  select: ["LogicalName"],
  expand: ["OptionSet($select=Options)", "GlobalOptionSet($select=Options)"],
  labelLanguages: 1033,
});
const options = picklists[0]?.OptionSet?.Options; // picklists is PicklistAttributeMetadata[]

const lookups = await metadataClient.getAttributeDefinitions("account", {
  cast: "LookupAttributeMetadata",
  select: ["LogicalName", "Targets"],
});

const name = await metadataClient.getAttributeDefinition("account", "name", {
  cast: "StringAttributeMetadata",
  select: ["MaxLength", "Format"],
});
```

`cast` takes any attribute metadata type name: `StringAttributeMetadata`, `MemoAttributeMetadata`,
`IntegerAttributeMetadata`, `BigIntAttributeMetadata`, `DecimalAttributeMetadata`,
`DoubleAttributeMetadata`, `MoneyAttributeMetadata`, `DateTimeAttributeMetadata`,
`BooleanAttributeMetadata`, `PicklistAttributeMetadata`, `MultiSelectPicklistAttributeMetadata`,
`StateAttributeMetadata`, `StatusAttributeMetadata`, `LookupAttributeMetadata`,
`FileAttributeMetadata`, `ImageAttributeMetadata`, `UniqueIdentifierAttributeMetadata`,
`EntityNameAttributeMetadata`, `EnumAttributeMetadata` or `ManagedPropertyAttributeMetadata`.

Key values (logical names, schema names, option set names) are escaped, so a name containing `'`
is sent as `'O''Brien'`.

Every `create*` method returns the new component's `MetadataId`. Dataverse answers a metadata
create with `204 No Content` and the id in the `OData-EntityId` header, which is where the SDK
reads it.

### Create in a Solution

Every create and update takes an optional last argument, `{ solutionUniqueName }`, sent as the
`MSCRM.SolutionUniqueName` header. The component is added to that unmanaged solution; without it
the change goes to the default solution.

```typescript
const metadataId = await metadataClient.createEntityDefinition(definition, {
  solutionUniqueName: "ContosoProjects",
});
```

### Update Entity

Metadata updates use `PUT`, which **replaces** the whole definition: a property you leave out is
reset to its default. Either send the complete definition to `updateEntityDefinition()`, or let
the SDK retrieve it, apply your changes and send it back:

```typescript
// Change only the description; every other property keeps its current value
await metadataClient.mergeAndUpdateEntityDefinition("new_project", {
  Description: { LocalizedLabels: [{ Label: "Manage projects and tasks", LanguageCode: 1033 }] },
});
```

### Delete Entity

```typescript
await metadataClient.deleteEntityDefinition("new_obsoleteentity");
```

---

## Column (Attribute) Operations

### Text Columns

#### Single Line of Text

```typescript
await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  SchemaName: "new_ProjectCode",
  DisplayName: { LocalizedLabels: [{ Label: "Project Code", LanguageCode: 1033 }] },
  RequiredLevel: { Value: "None" },
  MaxLength: 50,
  Format: "Text",
});
```

#### Multiple Lines of Text

```typescript
await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.MemoAttributeMetadata",
  SchemaName: "new_Description",
  DisplayName: { LocalizedLabels: [{ Label: "Description", LanguageCode: 1033 }] },
  RequiredLevel: { Value: "None" },
  MaxLength: 2000,
  Format: "TextArea",
});
```

### Number Columns

#### Whole Number

```typescript
await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.IntegerAttributeMetadata",
  SchemaName: "new_Priority",
  DisplayName: { LocalizedLabels: [{ Label: "Priority", LanguageCode: 1033 }] },
  RequiredLevel: { Value: "None" },
  MinValue: 1,
  MaxValue: 100,
  Format: "None",
});
```

#### Decimal Number

```typescript
await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.DecimalAttributeMetadata",
  SchemaName: "new_CompletionPercentage",
  DisplayName: { LocalizedLabels: [{ Label: "Completion %", LanguageCode: 1033 }] },
  RequiredLevel: { Value: "None" },
  MinValue: 0,
  MaxValue: 100,
  Precision: 2,
});
```

#### Currency

```typescript
await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.MoneyAttributeMetadata",
  SchemaName: "new_Budget",
  DisplayName: { LocalizedLabels: [{ Label: "Budget", LanguageCode: 1033 }] },
  RequiredLevel: { Value: "None" },
  MinValue: 0,
  MaxValue: 1000000000,
  Precision: 2,
  PrecisionSource: 2, // Precision = 2
});
```

### Date & Time

```typescript
await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.DateTimeAttributeMetadata",
  SchemaName: "new_DueDate",
  DisplayName: { LocalizedLabels: [{ Label: "Due Date", LanguageCode: 1033 }] },
  RequiredLevel: { Value: "None" },
  Format: "DateOnly", // or 'DateAndTime'
  ImeMode: "Disabled",
});
```

### Choice (Local)

```typescript
await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
  SchemaName: "new_Status",
  DisplayName: { LocalizedLabels: [{ Label: "Status", LanguageCode: 1033 }] },
  RequiredLevel: { Value: "None" },
  OptionSet: {
    "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
    IsGlobal: false,
    Options: [
      { Value: 1, Label: { LocalizedLabels: [{ Label: "Not Started", LanguageCode: 1033 }] } },
      { Value: 2, Label: { LocalizedLabels: [{ Label: "In Progress", LanguageCode: 1033 }] } },
      { Value: 3, Label: { LocalizedLabels: [{ Label: "Completed", LanguageCode: 1033 }] } },
    ],
  },
});
```

### Yes/No (Boolean)

```typescript
await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.BooleanAttributeMetadata",
  SchemaName: "new_IsActive",
  DisplayName: { LocalizedLabels: [{ Label: "Is Active", LanguageCode: 1033 }] },
  RequiredLevel: { Value: "None" },
  DefaultValue: true,
  OptionSet: {
    "@odata.type": "Microsoft.Dynamics.CRM.BooleanOptionSetMetadata",
    TrueOption: { Value: 1, Label: { LocalizedLabels: [{ Label: "Yes", LanguageCode: 1033 }] } },
    FalseOption: { Value: 0, Label: { LocalizedLabels: [{ Label: "No", LanguageCode: 1033 }] } },
  },
});
```

### Lookup (Single-table)

```typescript
// Create 1:N relationship (creates lookup column on related entity)
const relationshipId = await metadataClient.createOneToManyRelationship({
  "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
  SchemaName: "new_project_tasks",
  ReferencedEntity: "new_project",
  ReferencedAttribute: "new_projectid",
  ReferencingEntity: "new_task",
  Lookup: {
    "@odata.type": "Microsoft.Dynamics.CRM.LookupAttributeMetadata",
    SchemaName: "new_ProjectId",
    DisplayName: { LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }] },
    RequiredLevel: { Value: "ApplicationRequired" },
  },
});
```

### File Column

```typescript
await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.FileAttributeMetadata",
  SchemaName: "new_Attachment",
  DisplayName: { LocalizedLabels: [{ Label: "Attachment", LanguageCode: 1033 }] },
  RequiredLevel: { Value: "None" },
  MaxSizeInKB: 32768, // 32 MB
});
```

### Image Column

```typescript
await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.ImageAttributeMetadata",
  SchemaName: "new_Logo",
  DisplayName: { LocalizedLabels: [{ Label: "Project Logo", LanguageCode: 1033 }] },
  RequiredLevel: { Value: "None" },
  MaxSizeInKB: 10240, // 10 MB
  CanStoreFullImage: true,
});
```

---

## Relationship Operations

### One-to-Many (1:N) Relationship

```typescript
// Create relationship (creates lookup on "many" side)
const relationshipId = await metadataClient.createOneToManyRelationship({
  "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
  SchemaName: "new_account_projects",
  ReferencedEntity: "account", // "One" side (parent)
  ReferencedAttribute: "accountid",
  ReferencingEntity: "new_project", // "Many" side (child)
  Lookup: {
    "@odata.type": "Microsoft.Dynamics.CRM.LookupAttributeMetadata",
    SchemaName: "new_AccountId",
    DisplayName: { LocalizedLabels: [{ Label: "Account", LanguageCode: 1033 }] },
    RequiredLevel: { Value: "None" },
  },
});
```

### Many-to-Many (N:N) Relationship

```typescript
// Create N:N relationship (creates intersect table)
const relationshipId = await metadataClient.createManyToManyRelationship({
  "@odata.type": "Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata",
  SchemaName: "new_project_contact",
  Entity1LogicalName: "new_project",
  Entity2LogicalName: "contact",
  IntersectEntityName: "new_project_contact",
  Entity1NavigationPropertyName: "new_project_contact_projects",
  Entity2NavigationPropertyName: "new_project_contact_contacts",
});
```

### Read Relationships

```typescript
// Get all 1:N relationships for an entity
const oneToManyRels = await metadataClient.getOneToManyRelationships("new_project", {
  select: ["SchemaName", "ReferencedEntity", "ReferencingEntity"],
});

// Get all N:N relationships
const manyToManyRels = await metadataClient.getManyToManyRelationships("new_project");
```

---

## Global Choice (Option Set) Operations

### Create Global Choice

```typescript
const optionSetId = await metadataClient.createGlobalOptionSet({
  "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
  Name: "new_projecttype",
  DisplayName: { LocalizedLabels: [{ Label: "Project Type", LanguageCode: 1033 }] },
  IsGlobal: true,
  OptionSetType: "Picklist",
  Options: [
    { Value: 100000, Label: { LocalizedLabels: [{ Label: "Internal", LanguageCode: 1033 }] } },
    { Value: 100001, Label: { LocalizedLabels: [{ Label: "External", LanguageCode: 1033 }] } },
    { Value: 100002, Label: { LocalizedLabels: [{ Label: "Research", LanguageCode: 1033 }] } },
  ],
});
```

### Use Global Choice in Column

A choice or choices (multi-select) column uses an existing global choice through
`"GlobalOptionSet@odata.bind"` instead of an `OptionSet` of its own; the create types accept
exactly one of the two. Dataverse binds by `MetadataId` only (`(Name='…')` is rejected), so keep
the id `createGlobalOptionSet` returns, or read it with `getGlobalOptionSet(name)`.

```typescript
// Bind the column to the global choice created above, by its MetadataId
await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
  SchemaName: "new_Type",
  DisplayName: { LocalizedLabels: [{ Label: "Type", LanguageCode: 1033 }] },
  RequiredLevel: { Value: "None" },
  "GlobalOptionSet@odata.bind": `/GlobalOptionSetDefinitions(${optionSetId})`,
});

// A choices (multi-select) column on a global choice found by name
const { MetadataId: projectTypeId } = await metadataClient.getGlobalOptionSet("new_projecttype", {
  select: ["MetadataId"],
});
await metadataClient.createAttributeDefinition("new_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata",
  SchemaName: "new_Types",
  DisplayName: { LocalizedLabels: [{ Label: "Types", LanguageCode: 1033 }] },
  RequiredLevel: { Value: "None" },
  "GlobalOptionSet@odata.bind": `/GlobalOptionSetDefinitions(${projectTypeId})`,
});
```

### Insert Option Value

The option-value methods (`insertOptionValue`, `updateOptionValue`, `deleteOptionValue`,
`orderOptions`) take either `OptionSetName`, for a global choice, or `EntityLogicalName` and
`AttributeLogicalName`, for a column's own choice; passing both, or neither, is a type error and
throws `DataverseInvalidRequestError` before anything is sent. A column bound to a global choice
has no options of its own, so change the global choice. `insertStatusValue` always takes the
table and its `statuscode` column. `updateOptionValue` requires `MergeLabels`.

```typescript
// Add new option to existing global choice
const result = await metadataClient.insertOptionValue({
  OptionSetName: "new_projecttype",
  Label: { LocalizedLabels: [{ Label: "Maintenance", LanguageCode: 1033 }] },
  Value: 100003, // Optional, auto-assigned if omitted
});

console.log("New option value:", result.NewOptionValue);
```

---

## Polymorphic (Multi-table) Lookup Operations

### Customer Lookup

```typescript
// Create customer lookup (targets account OR contact)
const result = await metadataClient.createCustomerRelationship({
  Lookup: {
    "@odata.type": "Microsoft.Dynamics.CRM.ComplexLookupAttributeMetadata",
    SchemaName: "new_CustomerId",
    DisplayName: { LocalizedLabels: [{ Label: "Customer", LanguageCode: 1033 }] },
    RequiredLevel: { Value: "ApplicationRequired" },
  },
  OneToManyRelationships: [
    {
      "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
      SchemaName: "new_account_projects",
      ReferencedEntity: "account",
      ReferencedAttribute: "accountid",
      ReferencingEntity: "new_project",
    },
    {
      "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
      SchemaName: "new_contact_projects",
      ReferencedEntity: "contact",
      ReferencedAttribute: "contactid",
      ReferencingEntity: "new_project",
    },
  ],
});
```

### Custom Polymorphic Lookup

```typescript
// Create lookup targeting multiple custom entities
const result = await metadataClient.createPolymorphicLookup({
  OneToManyRelationships: [
    {
      "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
      SchemaName: "new_task_regarding_project",
      ReferencedEntity: "new_project",
      ReferencedAttribute: "new_projectid",
      ReferencingEntity: "new_task",
    },
    {
      "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
      SchemaName: "new_task_regarding_milestone",
      ReferencedEntity: "new_milestone",
      ReferencedAttribute: "new_milestoneid",
      ReferencingEntity: "new_task",
    },
  ],
  Lookup: {
    "@odata.type": "Microsoft.Dynamics.CRM.ComplexLookupAttributeMetadata",
    SchemaName: "new_RegardingId",
    DisplayName: { LocalizedLabels: [{ Label: "Regarding", LanguageCode: 1033 }] },
    RequiredLevel: { Value: "None" },
  },
});
```

---

## Relationship Eligibility Checks

`CanBeReferenced`, `CanBeReferencing` and `CanManyToMany` are Web API actions (sent as `POST`);
the `GetValid*` methods are functions (sent as `GET`). Each method returns the plain value.

```typescript
// Can the table be the parent (referenced) table in a 1:N relationship?
const canBeParent: boolean = await metadataClient.canBeReferenced("new_project");

// Can the table be the child (referencing) table in a 1:N relationship?
const canBeChild: boolean = await metadataClient.canBeReferencing("new_task");

// Can the table take part in an N:N relationship?
const canDoManyToMany: boolean = await metadataClient.canManyToMany("new_project");

// Tables that can reference account, and tables that contact can reference
const children: string[] = await metadataClient.getValidReferencingEntities("account");
const parents: string[] = await metadataClient.getValidReferencedEntities("contact");

// Every table that can take part in an N:N relationship (no argument)
const manyToManyTables: string[] = await metadataClient.getValidManyToMany();
```

---

## RetrieveMetadataChanges

Track metadata changes with version stamps for incremental sync. The method is positional:
`retrieveMetadataChanges(query, clientVersionStamp?, deletedMetadataFilters?)`.
`RetrieveMetadataChanges` is a Web API function, so the SDK sends it as a `GET` with the query as
a JSON parameter alias.

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
        PropertyName: "IsCustomEntity",
        ConditionOperator: MetadataConditionOperator.Equals,
        // A condition value is { Type, Value }
        Value: { Type: "System.Boolean", Value: "true" },
      },
    ],
  },
  Properties: { AllProperties: false, PropertyNames: ["LogicalName", "DisplayName"] },
};

// Initial query: the metadata, plus a version stamp
const result = await metadataClient.retrieveMetadataChanges(query);
console.log("Entities:", result.EntityMetadata);
console.log("Server version:", result.ServerVersionStamp);

// Later: only what changed since the stamp, including deleted tables
const changes = await metadataClient.retrieveMetadataChanges(
  query,
  result.ServerVersionStamp, // the previous stamp
  "Default" // DeletedMetadataFilters: "Default" (tables), "Attribute", "All", or a comma-separated list
);
console.log("Changed entities:", changes.EntityMetadata);
console.log("Deleted metadata:", changes.DeletedMetadata);
```

Enum members in the query are sent by name (`"And"`, `"Equals"`), the only form Dataverse
accepts.

---

## Important Notes

### Update Operations Use PUT

Per Microsoft documentation, all metadata update operations use HTTP PUT (not PATCH). A PUT
replaces the definition, so a property you leave out is reset to its default. Send the complete
definition, not just the changed properties. For tables, `mergeAndUpdateEntityDefinition()`
retrieves the current definition, applies your changes and sends the result:

```typescript
// Only the changed properties: the SDK fills in the rest from the current definition
await metadataClient.mergeAndUpdateEntityDefinition("new_project", {
  DisplayName: { LocalizedLabels: [{ Label: "Updated Project", LanguageCode: 1033 }] },
  Description: { LocalizedLabels: [{ Label: "Updated description", LanguageCode: 1033 }] },
});
```

For columns, relationships and global choices, retrieve the definition, change it and pass the
whole object to the `update*` method.

The SDK automatically sets the `MSCRM.MergeLabels: true` header to merge labels instead of replacing them, preserving labels for other languages.

### Strict Typing

The metadata package uses strict type separation:

- **Read types** - include all properties returned from the server (e.g., `EntityMetadata`)
- **Create types** - exclude read-only and internal properties, and require what a create needs (e.g., `EntityMetadataCreate`, `StringAttributeMetadataCreate`)
- **Update types** - every property optional (e.g., `EntityMetadataUpdate`); a retrieved definition can be passed back

This ensures you cannot accidentally send read-only fields like `MetadataId`, `ObjectTypeCode`, or internal-use fields in create/update operations. The create types leave out every property Dataverse sets itself, such as a date column's `MinSupportedValue` and `MaxSupportedValue`, a text column's `DatabaseLength`, `AttributeType` (the type comes from `@odata.type`) and `IsValidForRead`.

Column creates take `AttributeMetadataCreateTypes`, a union discriminated on `@odata.type`
(`"Microsoft.Dynamics.CRM.StringAttributeMetadata"`, …), so the type-specific properties
(`MaxLength`, `MinValue`, `Targets`, …) are checked for the type you name. Column, relationship
and global choice creates require `@odata.type`; for a table it's optional.

### Enums Are Member Names

The Web API reads and writes enum members by name (`"UserOwned"`, `"ApplicationRequired"`); a
number such as `OwnershipType: 1` is rejected. The exported enums (`OwnershipTypes`,
`AttributeRequiredLevel`, `StringFormat`, …) are string-valued, so `OwnershipTypes.UserOwned` is
`"UserOwned"` and you can write either form. Read types use the same names, so
`entity.OwnershipType === OwnershipTypes.UserOwned` works on a retrieved definition.

---

## TypeScript Examples

All examples in this README use TypeScript. For pure JavaScript, omit type annotations:

```javascript
// JavaScript equivalent
const metadataClient = new MetadataClient(client);

const entityId = await metadataClient.createEntityDefinition({
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  SchemaName: "new_Project",
  DisplayName: {
    LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }],
  },
  // ... rest of definition
});
```

---

## Publishing Changes

Metadata changes must be published before they take effect in the application. Use PublishXml or PublishAllXml actions from the messages package.

## License

This package is part of the `dataverse-sdk-typescript` monorepo and is licensed under **GNU AGPL v3.0**. See [LICENSE](../../LICENSE) for details.

## Related Packages

- [@mohsinonxrm/dataverse-sdk-core](../dataverse-sdk-core) - Core client and request builder
- [@mohsinonxrm/dataverse-sdk-messages](../dataverse-sdk-messages) - SDK messages including PublishXml
