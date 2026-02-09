# Metadata Operations Sample

Comprehensive sample demonstrating Dataverse metadata operations (schema management):

- **Entity (table) creation** with primary name columns
- **Attribute (column) creation** - 6+ types (text, number, currency, date, choice, yes/no)
- **1:N relationships** (one-to-many) with lookup columns
- **N:N relationships** (many-to-many) with intersect tables
- **Global choices** (option sets) creation and reuse
- **Option value management** (adding choices dynamically)
- **RetrieveMetadataChanges** for incremental sync and change tracking
- **Metadata querying** with expansions
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

### 2. Node.js 18+

```bash
node --version  # Should be v18.0.0 or higher
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

- All created entities will use this prefix (e.g., `sample_project`, `sample_task`)
- Use `new` for production, `demo` or `test` for samples
- Must follow naming rules: lowercase, start with letter

---

## Running the Sample

### Run All Demos

```bash
pnpm start
```

This executes 9 comprehensive demos:

1. **Create Project Entity** - custom table with primary name column
2. **Add 6 Attribute Types** - text, integer, money, date, choice, yes/no
3. **Create Task Entity** - second table for relationships
4. **Create 1:N Relationship** - project has many tasks
5. **Create N:N Relationship** - projects and contacts (team members)
6. **Create Global Choice** - project type option set
7. **Add Option to Choice** - dynamically add "Maintenance" option
8. **RetrieveMetadataChanges** - track schema changes over time
9. **Query Metadata** - inspect created schema

**Cleanup:**
After demos complete, all created metadata is automatically deleted (with 3-second warning).

### Development Mode

```bash
pnpm dev
```

Changes to `src/index.ts` will automatically reload.

### Skip Cleanup (for inspection)

Modify `main()` function to comment out cleanup:

```typescript
// await cleanup(metadataClient); // Comment this to keep metadata
```

Then inspect your custom tables in Power Apps maker portal.

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

### Demo 1: Create Project Entity

Creates a custom table named `sample_project` with primary name column:

```typescript
const entityDefinition: EntityMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  SchemaName: "sample_project",
  DisplayName: {
    LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }],
  },
  DisplayCollectionName: {
    LocalizedLabels: [{ Label: "Projects", LanguageCode: 1033 }],
  },
  OwnershipType: 1, // UserOwned (tracks owner)
  HasActivities: true, // Can have tasks, emails, appointments
  HasNotes: true, // Can have notes and attachments
  Attributes: [
    // Primary name column (REQUIRED)
    {
      "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
      SchemaName: "sample_Name",
      DisplayName: { LocalizedLabels: [{ Label: "Project Name", LanguageCode: 1033 }] },
      RequiredLevel: { Value: "ApplicationRequired" },
      MaxLength: 100,
      IsPrimaryName: true, // Marks as primary name
    },
  ],
};

const metadataId = await metadataClient.createEntityDefinition(entityDefinition);
```

**Key concepts:**

- **Primary name column** is required for every custom entity
- **OwnershipType:** 1 = UserOwned, 2 = OrganizationOwned, 4 = TeamOwned
- **HasActivities/HasNotes:** Enable activity and note tracking
- **LocalizedLabels:** Support multi-language (1033 = English)

---

### Demo 2: Add Multiple Attribute Types

Demonstrates 6 common column types:

#### Text (Single Line)

```typescript
await metadataClient.createAttributeDefinition("sample_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  SchemaName: "sample_ProjectCode",
  DisplayName: { LocalizedLabels: [{ Label: "Project Code", LanguageCode: 1033 }] },
  MaxLength: 20,
  Format: "Text",
});
```

#### Integer (Whole Number)

```typescript
await metadataClient.createAttributeDefinition("sample_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.IntegerAttributeMetadata",
  SchemaName: "sample_Priority",
  DisplayName: { LocalizedLabels: [{ Label: "Priority", LanguageCode: 1033 }] },
  MinValue: 1,
  MaxValue: 10,
});
```

#### Money (Currency)

```typescript
await metadataClient.createAttributeDefinition("sample_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.MoneyAttributeMetadata",
  SchemaName: "sample_Budget",
  DisplayName: { LocalizedLabels: [{ Label: "Budget", LanguageCode: 1033 }] },
  MinValue: 0,
  MaxValue: 1000000000,
  Precision: 2, // 2 decimal places
  PrecisionSource: 2,
});
```

#### DateTime (Date/Time)

```typescript
await metadataClient.createAttributeDefinition("sample_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.DateTimeAttributeMetadata",
  SchemaName: "sample_StartDate",
  DisplayName: { LocalizedLabels: [{ Label: "Start Date", LanguageCode: 1033 }] },
  Format: "DateOnly", // or 'DateAndTime'
});
```

#### Choice (Local Picklist)

```typescript
await metadataClient.createAttributeDefinition("sample_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
  SchemaName: "sample_Status",
  DisplayName: { LocalizedLabels: [{ Label: "Status", LanguageCode: 1033 }] },
  OptionSet: {
    "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
    IsGlobal: false, // Local to this entity
    Options: [
      { Value: 1, Label: { LocalizedLabels: [{ Label: "Not Started", LanguageCode: 1033 }] } },
      { Value: 2, Label: { LocalizedLabels: [{ Label: "In Progress", LanguageCode: 1033 }] } },
      { Value: 3, Label: { LocalizedLabels: [{ Label: "Completed", LanguageCode: 1033 }] } },
      { Value: 4, Label: { LocalizedLabels: [{ Label: "On Hold", LanguageCode: 1033 }] } },
    ],
  },
});
```

#### Yes/No (Boolean)

```typescript
await metadataClient.createAttributeDefinition("sample_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.BooleanAttributeMetadata",
  SchemaName: "sample_IsActive",
  DisplayName: { LocalizedLabels: [{ Label: "Is Active", LanguageCode: 1033 }] },
  DefaultValue: true,
  OptionSet: {
    "@odata.type": "Microsoft.Dynamics.CRM.BooleanOptionSetMetadata",
    TrueOption: { Value: 1, Label: { LocalizedLabels: [{ Label: "Yes", LanguageCode: 1033 }] } },
    FalseOption: { Value: 0, Label: { LocalizedLabels: [{ Label: "No", LanguageCode: 1033 }] } },
  },
});
```

**Other attribute types** (not in sample but supported):

- **Memo** - multi-line text
- **Decimal** - precise decimal numbers
- **Lookup** - created via relationships (see Demo 4)
- **File** - file attachments
- **Image** - image columns
- **MultiSelectPicklist** - multiple choice selection

---

### Demo 3: Create Task Entity

Creates a second custom table for relationship demonstration:

```typescript
const taskEntity: EntityMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  SchemaName: "sample_task",
  DisplayName: { LocalizedLabels: [{ Label: "Task", LanguageCode: 1033 }] },
  DisplayCollectionName: { LocalizedLabels: [{ Label: "Tasks", LanguageCode: 1033 }] },
  OwnershipType: 1,
  Attributes: [
    {
      "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
      SchemaName: "sample_Name",
      DisplayName: { LocalizedLabels: [{ Label: "Task Name", LanguageCode: 1033 }] },
      MaxLength: 100,
      IsPrimaryName: true,
    },
  ],
};
```

This table will be used to demonstrate 1:N relationships.

---

### Demo 4: Create 1:N Relationship

Creates a **one-to-many** relationship: one project can have many tasks.

```typescript
const relationship: OneToManyRelationshipMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
  SchemaName: "sample_project_tasks",
  ReferencedEntity: "sample_project", // "One" side (parent)
  ReferencedAttribute: "sample_projectid", // Primary key of parent
  ReferencingEntity: "sample_task", // "Many" side (child)
  Lookup: {
    SchemaName: "sample_ProjectId", // Lookup column name on child table
    DisplayName: { LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }] },
    RequiredLevel: { Value: "ApplicationRequired" }, // Required lookup
  },
};

await metadataClient.createOneToManyRelationship(relationship);
```

**Result:**

- Creates lookup column `sample_ProjectId` on `sample_task` table
- Tasks can now reference their parent project
- Deleting a project can cascade delete tasks (if configured)

**Navigation:**

- From project: `project.sample_project_tasks` (collection of tasks)
- From task: `task.sample_ProjectId` (parent project)

---

### Demo 5: Create N:N Relationship

Creates a **many-to-many** relationship: projects can have many contacts, contacts can work on many projects.

```typescript
const relationship: ManyToManyRelationshipMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata",
  SchemaName: "sample_project_contact",
  Entity1LogicalName: "sample_project",
  Entity2LogicalName: "contact", // Standard Dataverse entity
  IntersectEntityName: "sample_project_contact", // Junction/intersect table
  Entity1NavigationPropertyName: "sample_project_contact_projects",
  Entity2NavigationPropertyName: "sample_project_contact_contacts",
};

await metadataClient.createManyToManyRelationship(relationship);
```

**Result:**

- Creates intersect table `sample_project_contact` (hidden in UI)
- Projects can be associated with multiple contacts
- Contacts can be associated with multiple projects

**Use cases:**

- Team members on projects
- Products in orders
- Students in courses

**Associate records (via Web API):**

```typescript
// Associate contact with project
await client.api(`/sample_projects(${projectId})/sample_project_contact_contacts/$ref`).post({
  "@odata.id": `${env.dataverseUrl}/api/data/v9.2/contacts(${contactId})`,
});
```

---

### Demo 6: Create Global Choice

Creates a **global option set** that can be reused across multiple entities:

```typescript
const optionSet: OptionSetMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
  Name: "sample_projecttype",
  DisplayName: { LocalizedLabels: [{ Label: "Project Type", LanguageCode: 1033 }] },
  IsGlobal: true, // Reusable across entities
  OptionSetType: "Picklist",
  Options: [
    { Value: 100000, Label: { LocalizedLabels: [{ Label: "Internal", LanguageCode: 1033 }] } },
    { Value: 100001, Label: { LocalizedLabels: [{ Label: "External", LanguageCode: 1033 }] } },
    { Value: 100002, Label: { LocalizedLabels: [{ Label: "Research", LanguageCode: 1033 }] } },
    { Value: 100003, Label: { LocalizedLabels: [{ Label: "Consulting", LanguageCode: 1033 }] } },
  ],
};

await metadataClient.createGlobalOptionSet(optionSet);
```

**Then reference it in a column:**

```typescript
await metadataClient.createAttributeDefinition("sample_project", {
  "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
  SchemaName: "sample_Type",
  DisplayName: { LocalizedLabels: [{ Label: "Project Type", LanguageCode: 1033 }] },
  GlobalOptionSet: {
    "@odata.bind": `/GlobalOptionSetDefinitions(Name='sample_projecttype')`,
  },
});
```

**Benefits of global choices:**

- ✅ Reuse across multiple tables
- ✅ Centralized option management
- ✅ Add options without changing multiple columns

---

### Demo 7: Add Option to Global Choice

Dynamically adds a new option to existing global choice:

```typescript
const result = await metadataClient.insertOptionValue({
  OptionSetName: "sample_projecttype",
  Label: { LocalizedLabels: [{ Label: "Maintenance", LanguageCode: 1033 }] },
  // Value auto-assigned if omitted (usually next available number)
});

console.log("New option value:", result.NewOptionValue);
```

**Use cases:**

- Adding new statuses as business evolves
- User-configurable options
- Multi-tenant SaaS (different options per tenant)

**Other option operations:**

- `updateOptionValue` - change label/description
- `deleteOptionValue` - remove option (if not used)
- `updateOrderOfOptions` - reorder options

---

### Demo 8: RetrieveMetadataChanges

Tracks metadata changes over time using version stamps:

```typescript
// Initial query - get all metadata + version stamp
const initialResult = await metadataClient.retrieveMetadataChanges(
  {
    Criteria: {
      FilterOperator: "And",
      Conditions: [{ PropertyName: "SchemaName", Value: "sample_project" }],
    },
    Properties: {
      PropertyNames: ["LogicalName", "DisplayName", "Attributes"],
    },
  },
  "Entity" // Track entity deletions
);

console.log("Version:", initialResult.ServerVersionStamp);

// Store this version stamp for later

// Later... query only changes since last sync
const changesResult = await metadataClient.retrieveMetadataChanges(
  {
    Criteria: {
      /* same criteria */
    },
    Properties: { PropertyNames: ["LogicalName", "DisplayName"] },
  },
  "Entity",
  initialResult.ServerVersionStamp // Pass stored version
);

console.log("Modified entities:", changesResult.EntityMetadata);
console.log("Deleted entities:", changesResult.DeletedMetadata);
```

**Use cases:**

- **Metadata sync** - keep external systems in sync
- **Change detection** - alert on schema changes
- **Audit trail** - track who changed what
- **Environment comparison** - diff dev vs prod schemas

**How it works:**

1. First call returns all metadata + version stamp
2. Store version stamp (string, opaque)
3. Later calls pass version stamp
4. Server returns only changes since that version
5. Includes both modifications and deletions

---

### Demo 9: Query Metadata

Inspects created metadata using query operations:

```typescript
// Get entity with expanded attributes
const entity = await metadataClient.getEntityDefinition("sample_project", {
  expand: "Attributes", // Include all columns
});

console.log("Attributes:", entity.Attributes.length);

// Query 1:N relationships
const oneToManyRels = await metadataClient.getOneToManyRelationships("sample_project");
for (const rel of oneToManyRels) {
  console.log(`${rel.ReferencedEntity} → ${rel.ReferencingEntity}`);
}

// Query N:N relationships
const manyToManyRels = await metadataClient.getManyToManyRelationships("sample_project");
for (const rel of manyToManyRels) {
  console.log(`${rel.Entity1LogicalName} ↔ ${rel.Entity2LogicalName}`);
}
```

**Query options:**

- `select` - choose specific properties
- `filter` - filter entities/attributes
- `expand` - include related metadata
- `orderby` - sort results

---

## Cleanup Order (Critical!)

Metadata deletion must follow correct order or it will fail:

```
1. Delete relationships (1:N and N:N)
   ↓
2. Delete entities
   ↓
3. Delete global option sets
```

**Why this order?**

- Can't delete entity if relationships reference it
- Can't delete global choice if columns use it

**Sample cleanup code:**

```typescript
// 1. Delete relationships first
await metadataClient.deleteOneToManyRelationship("sample_project_tasks");
await metadataClient.deleteManyToManyRelationship("sample_project_contact");

// 2. Then delete entities
await metadataClient.deleteEntityDefinition("sample_task");
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
