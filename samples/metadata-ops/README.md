# Metadata Operations Sample

Comprehensive sample demonstrating Dataverse metadata operations (schema management):

- **Entity (table) creation** with primary name columns
- **Attribute (column) creation** - text and integer columns, through `client.api()` and `MetadataClient`
- **1:N relationships** (one-to-many) with a lookup column
- **Global choices** (option sets) creation
- **Metadata querying** with `$select` and `$expand`
- **Proper cleanup** (deletion order matters!)

This sample is perfect for:

- Understanding Dataverse schema management
- Building data model automation tools
- Creating custom tables programmatically
- Implementing configuration-as-code patterns
- Migrating schema between environments

---

## What is Metadata?

**Metadata** in Dataverse defines the structure of your data:

- **Entities** = Tables (e.g., Account, Contact, custom tables)
- **Attributes** = Columns (e.g., name, email, phone)
- **Relationships** = How tables connect (1:N, N:N)
- **Option Sets** = Choices/picklists (e.g., Status, Priority)

**Why manage metadata programmatically?**

- ✅ **Automation** - create hundreds of tables/columns via script
- ✅ **Version control** - track schema changes in Git
- ✅ **Environment parity** - deploy same schema to dev/test/prod
- ✅ **Configuration-as-code** - define schema in TypeScript
- ✅ **Dynamic schema** - build multi-tenant SaaS solutions

---

## Prerequisites

### 1. Azure AD App Registration

See [daemon-clientcredentials sample](../daemon-clientcredentials/README.md#prerequisites) for complete app registration steps.

**Additional permission required:**

- The Application User must have **System Administrator** or **System Customizer** role to create metadata

**Quick checklist:**

- ✅ App registration created
- ✅ Client secret generated
- ✅ API permissions: Dynamics CRM / user_impersonation
- ✅ Admin consent granted
- ✅ Application User created with System Administrator role

### 2. Node.js 22+

```bash
node --version  # Should be v22.0.0 or higher
```

---

## Setup

### 1. Install Dependencies

From the repository root:

```bash
pnpm install
```

### 2. Configure Environment

Copy the example environment file:

```bash
cd samples/metadata-ops
cp .env.example .env
```

Edit `.env` and fill in your values:

```bash
AZURE_CLIENT_ID=your-app-registration-client-id
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_SECRET=your-client-secret

DATAVERSE_URL=https://yourorg.crm.dynamics.com

# Optional: change schema prefix (default: sample)
SCHEMA_PREFIX=sample
```

**Schema Prefix:**

- All created entities will use this prefix (e.g., `sample_project`, `sample_milestone`)
- Use `new` for production, `demo` or `test` for samples
- Must follow naming rules: lowercase, start with letter

---

## Running the Sample

### Run All Demos

```bash
pnpm start
```

This runs 6 demos, three of which show the same task two ways (the HTTP-first `client.api()`
call, and the typed `MetadataClient` method):

1. **Create entities** - `<prefix>_project` through `client.api("/EntityDefinitions")` and
   `<prefix>_milestone` through `metadataClient.createEntityDefinition()`, each with a primary
   name column
2. **Add attributes** - a multi-line text column (`client.api()`) and an integer column with a
   1 to 10 range (`metadataClient.createAttributeDefinition()`)
3. **Query metadata** - read an entity with `$select` and `$expand=Attributes(...)`, both ways
4. **Create a 1:N relationship** - project has many milestones, with a lookup column
   (`client.api("/RelationshipDefinitions")`)
5. **Create a global choice** - a project type option set (`metadataClient.createGlobalOptionSet()`)
6. **Delete an entity** - `DELETE /EntityDefinitions(LogicalName='...')`

**Cleanup:**
After the demos, the sample waits 2 seconds and deletes everything it created (relationships,
then entities, then global choices). If a demo fails, it tries the same cleanup before exiting.

### Development Mode

```bash
pnpm dev
```

Changes to `src/index.ts` will automatically reload.

### Skip Cleanup (for inspection)

The cleanup step has no switch. To keep the metadata, comment out the `await cleanup(metadataClient)` call in `main()`, and the one in its `catch` block:

```typescript
// await cleanup(metadataClient); // Comment this to keep metadata
```

Then inspect your custom tables in the Power Apps maker portal.

---

## Important: Metadata Types vs Business Entity Types

This sample uses **metadata types** from `@mohsinonxrm/dataverse-sdk-metadata`:

- `EntityMetadata`, `EntityMetadataCreate`, `EntityMetadataUpdate`
- `AttributeMetadata` and derived types (`StringAttributeMetadata`, etc.)
- `RelationshipMetadata`
- `OptionSetMetadata`

These are **NOT** business entity types (like `Account`, `Contact`), which would be:

- Generated per-org using `@mohsinonxrm/dataverse-sdk-generator`
- Specific to your Dataverse environment
- Optional for SDK usage

**Key Distinction:**

- **Metadata types** = Types for managing the schema itself (ships with SDK)
- **Business entity types** = Types for your data (generated per-org, optional)

---

## Demo Explanations

The sample builds one `MetadataClient` over the `DataverseClient`, and also uses
`client.api(...)` directly where the HTTP call is the point of the demo:

```typescript
import {
  AttributeRequiredLevel,
  MetadataClient,
  OptionSetType,
  OwnershipTypes,
  type EntityMetadata,
} from "@mohsinonxrm/dataverse-sdk-metadata";

const metadataClient = new MetadataClient(client);
```

### Demo 1: Create Entities

**HTTP-first** - POST the definition with its `@odata.type`, then add the primary name column:

```typescript
const response = await client
  .api("/EntityDefinitions")
  .preferRaw("return=representation")
  .post<EntityMetadata>({
    "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
    SchemaName: "sample_project",
    DisplayName: { LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }] },
    DisplayCollectionName: { LocalizedLabels: [{ Label: "Projects", LanguageCode: 1033 }] },
    OwnershipType: OwnershipTypes.UserOwned,
    HasActivities: true,
    HasNotes: true,
  });

await client.api("/EntityDefinitions(LogicalName='sample_project')/Attributes").post({
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  SchemaName: "sample_Name",
  DisplayName: { LocalizedLabels: [{ Label: "Project Name", LanguageCode: 1033 }] },
  RequiredLevel: { Value: AttributeRequiredLevel.None },
  MaxLength: 100,
  IsPrimaryName: true,
});
```

**MetadataClient** - the same for `sample_milestone`. `createEntityDefinition()` returns the new
`MetadataId`, and `createAttributeDefinition(entityLogicalName, attribute)` adds the column:

```typescript
const metadataId = await metadataClient.createEntityDefinition({
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  SchemaName: "sample_milestone",
  // ...DisplayName, DisplayCollectionName, OwnershipType as above
});

await metadataClient.createAttributeDefinition("sample_milestone", {
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  SchemaName: "sample_Name",
  MaxLength: 100,
  IsPrimaryName: true,
  // ...DisplayName, RequiredLevel
});
```

### Demo 2: Add Attributes

A multi-line text column through `client.api()`, and an integer column through the client:

```typescript
await client.api("/EntityDefinitions(LogicalName='sample_project')/Attributes").post({
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  SchemaName: "sample_Description",
  MaxLength: 500,
  FormatName: { Value: "Text" },
});

await metadataClient.createAttributeDefinition("sample_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.IntegerAttributeMetadata",
  SchemaName: "sample_Priority",
  MinValue: 1,
  MaxValue: 10,
  // ...DisplayName, RequiredLevel
});
```

`MetadataClient` also creates the other column types the same way (money, date and time, yes/no,
choice); see the [metadata README](../../packages/dataverse-sdk-metadata/README.md).

### Demo 3: Query Metadata

```typescript
// HTTP-first
const entity = await client
  .api("/EntityDefinitions(LogicalName='sample_project')")
  .select("LogicalName", "DisplayName", "SchemaName", "OwnershipType")
  .expand("Attributes($select=LogicalName,AttributeType,DisplayName)")
  .get<EntityMetadata>();

// MetadataClient
const same = await metadataClient.getEntityDefinition("sample_project", {
  select: ["LogicalName", "DisplayName", "SchemaName", "OwnershipType"],
  expand: "Attributes($select=LogicalName,AttributeType,DisplayName)",
});
```

The sample prints the name, ownership, attribute count and the first custom attributes.

### Demo 4: Create a 1:N Relationship

Project (1) to milestone (N), with the lookup column created on the milestone:

```typescript
await client
  .api("/RelationshipDefinitions")
  .preferRaw("return=representation")
  .post({
    "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
    SchemaName: "sample_project_milestones",
    ReferencedEntity: "sample_project",
    ReferencedAttribute: "sample_projectid",
    ReferencingEntity: "sample_milestone",
    Lookup: {
      "@odata.type": "Microsoft.Dynamics.CRM.LookupAttributeMetadata",
      SchemaName: "sample_ProjectId",
      DisplayName: { LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }] },
      RequiredLevel: { Value: AttributeRequiredLevel.ApplicationRequired },
    },
  });
```

`metadataClient.createOneToManyRelationship()` and `createManyToManyRelationship()` do the same
through the client.

### Demo 5: Create a Global Choice

```typescript
const metadataId = await metadataClient.createGlobalOptionSet({
  "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
  Name: "sample_projecttype",
  IsGlobal: true,
  OptionSetType: OptionSetType.Picklist,
  Options: [
    { Value: 100000, Label: { LocalizedLabels: [{ Label: "Internal", LanguageCode: 1033 }] } },
    { Value: 100001, Label: { LocalizedLabels: [{ Label: "External", LanguageCode: 1033 }] } },
    { Value: 100002, Label: { LocalizedLabels: [{ Label: "Research", LanguageCode: 1033 }] } },
  ],
  // ...DisplayName, Description
});
```

To change a choice later, use `metadataClient.insertOptionValue()`, `updateOptionValue()`,
`deleteOptionValue()` and `orderOptions()`. The sample does not call them.

### Demo 6: Delete an Entity

```typescript
await client.api("/EntityDefinitions(LogicalName='sample_milestone')").delete();
```

---

## Cleanup Order (Critical!)

Metadata deletion must follow the correct order or it will fail:

```
1. Delete relationships (1:N and N:N)
   ↓
2. Delete entities
   ↓
3. Delete global option sets
```

**Why this order?**

- Can't delete an entity if relationships reference it
- Can't delete a global choice if columns use it

**Sample cleanup code:**

```typescript
// 1. Delete relationships first: look the relationship up by schema name, then delete it by id
const relationship = await metadataClient.getRelationshipBySchemaName("sample_project_milestones");
if (relationship.MetadataId) {
  await metadataClient.deleteRelationship(relationship.MetadataId);
}
// or, in one call: await metadataClient.deleteRelationshipBySchemaName("sample_project_milestones");

// 2. Then delete entities
await metadataClient.deleteEntityDefinition("sample_milestone");
await metadataClient.deleteEntityDefinition("sample_project");

// 3. Finally delete global choices
await metadataClient.deleteGlobalOptionSet("sample_projecttype");
```

---

## Best Practices

### 1. Schema Naming Conventions

**✅ Good:**

```typescript
SchemaName: "contoso_Project"; // Publisher prefix + PascalCase
LogicalName: "contoso_project"; // Auto-generated lowercase
```

**❌ Bad:**

```typescript
SchemaName: "project"; // No prefix (reserved)
SchemaName: "Contoso Project"; // Spaces not allowed
SchemaName: "123project"; // Can't start with number
```

### 2. Primary Name Column Requirements

Every custom entity **must** have exactly one primary name column:

```typescript
Attributes: [
  {
    "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
    SchemaName: "sample_Name",
    IsPrimaryName: true, // REQUIRED
    RequiredLevel: { Value: "ApplicationRequired" },
    MaxLength: 100,
  },
];
```

### 3. Use Global Choices Wisely

**Use global choices when:**

- ✅ Options used by multiple entities
- ✅ Options change frequently
- ✅ Centralized management needed

**Use local choices when:**

- ✅ Options unique to one entity
- ✅ Options rarely change
- ✅ Isolation preferred

---

## Troubleshooting

### "Permission Denied" Errors

**Problem:** `401 Unauthorized` or `403 Forbidden` when creating metadata

**Solution:**

1. Verify Application User has **System Administrator** or **System Customizer** role
2. Check API permissions in Azure AD app registration
3. Ensure admin consent was granted

### "Entity Already Exists" Errors

**Problem:** Sample fails because entities already exist from previous run

**Solution:**

1. Change `SCHEMA_PREFIX` in `.env` to a different value
2. Or manually delete existing entities in Power Apps maker portal
3. Ensure cleanup ran successfully last time

---

## Learn More

- [Metadata Package Documentation](../../packages/dataverse-sdk-metadata/README.md)
- [Microsoft Docs: Create and update table definitions](https://learn.microsoft.com/power-apps/developer/data-platform/webapi/create-update-entity-definitions-using-web-api)
- [Microsoft Docs: Query table definitions](https://learn.microsoft.com/power-apps/developer/data-platform/webapi/query-metadata-web-api)
- [Microsoft Docs: RetrieveMetadataChanges](https://learn.microsoft.com/power-apps/developer/data-platform/webapi/retrieve-detect-changes-metadata)

---

## License

This sample is part of the `dataverse-sdk-typescript` monorepo and is licensed under **GNU AGPL v3.0**. See [LICENSE](../../LICENSE) for details.
