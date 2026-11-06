# Actions & Functions Sample

This sample demonstrates **typed Web API Actions (POST) and Functions (GET)** using `@mohsinonxrm/dataverse-sdk-actions` and `@mohsinonxrm/dataverse-sdk-functions`.

## What are Actions and Functions?

**Functions** are GET operations that:

- Do NOT modify data (read-only, idempotent)
- Return a value
- Can be bound to an entity type or unbound
- Example: `WhoAmI` returns current user information

**Actions** are POST operations that:

- CAN modify data (have side effects)
- May return a value or void
- Can be bound to an entity type or unbound
- Examples: `CreateMultiple`, `WinOpportunity`, `Merge`

### Actions vs Functions vs CRUD

| Operation    | HTTP Method           | Purpose                    | Side Effects     |
| ------------ | --------------------- | -------------------------- | ---------------- |
| **Function** | GET                   | Read data, calculations    | No               |
| **Action**   | POST                  | Business logic, bulk ops   | Yes              |
| **CRUD**     | GET/POST/PATCH/DELETE | Standard entity operations | Yes (except GET) |

## What's in This Sample

This sample demonstrates:

1. **WhoAmI Function** (GET) - Retrieve current user info
2. **CreateMultiple Action** - Bulk create records
3. **UpdateMultiple Action** - Bulk update records
4. **UpsertMultiple Action** - Bulk upsert records
5. **ExecuteWorkflow Action** - Run on-demand workflows
6. **WinOpportunity Action** - Mark opportunity as won
7. **Merge Action** - Merge two records
8. **File Operations Actions** - Chunked file upload

## Prerequisites

### 1. Azure AD App Registration

Create an app registration with:

- **Client credentials** (client secret)
- **API permissions**: `Dynamics CRM > user_impersonation` (delegated) or `Dynamics CRM > .default` (application)
- **Grant admin consent**

### 2. Application User

Create an Application User in your Dataverse environment:

1. Navigate to **Settings > Security > Users**
2. Switch view to **Application Users**
3. Create new application user linked to your Azure AD app
4. Assign **System Administrator** role (required for bulk operations)

### 3. Environment Setup

```bash
# From repository root, install all dependencies
pnpm install

# Navigate to this sample
cd samples/actions-functions

# Copy environment template
cp .env.example .env

# Edit .env with your values
```

Your `.env` should look like:

```env
AZURE_CLIENT_ID=12345678-1234-1234-1234-123456789abc
AZURE_TENANT_ID=87654321-4321-4321-4321-cba987654321
AZURE_CLIENT_SECRET=your-client-secret-here
DATAVERSE_URL=https://your-org.crm.dynamics.com

# Optional: For the ExecuteWorkflow demo
# TEST_WORKFLOW_ID=00000000-0000-0000-0000-000000000000
```

## Running the Sample

### Build the Sample

```bash
# From the sample directory
pnpm build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

### Run the Sample

```bash
# Run directly with tsx (no build needed)
pnpm start

# Or run the built version
node dist/index.js

# Or use tsx directly
npx tsx src/index.ts
```

The sample will:

1. Authenticate using client credentials
2. Run all 8 demos in sequence
3. Show colored output for each demo
4. Clean up test data automatically
5. Print timings for each demo

## How actions and functions run

Every action and function is an object that describes a request. You pass it to the client:

```typescript
const result = await client.execute(new SomeAction(/* positional arguments */));
```

The objects have no `execute()` method of their own. Constructor arguments are positional and
follow the Web API parameter order. A parameter that is a record reference is made with
`createEntityReference(logicalName, id)` from `@mohsinonxrm/dataverse-sdk-actions`, which gives the
Web API shape `{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "<id>" }`.

## Demo 1: WhoAmI Function (GET)

**Function**: Unbound GET operation that returns current user information.

```typescript
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const result = await client.execute(new WhoAmIFunction());

console.log(`User ID: ${result.UserId}`);
console.log(`Business Unit ID: ${result.BusinessUnitId}`);
console.log(`Organization ID: ${result.OrganizationId}`);
```

**Response:**

```json
{
  "UserId": "12345678-1234-1234-1234-123456789abc",
  "BusinessUnitId": "87654321-4321-4321-4321-cba987654321",
  "OrganizationId": "abcdef12-3456-7890-abcd-ef1234567890"
}
```

**When to use:**

- Get current user context
- Verify authentication
- Determine user's business unit
- No side effects - safe to call repeatedly

---

## Demo 2: CreateMultiple Action (Bulk Create)

**Action**: Creates multiple records of the same entity type in a single request. The constructor
takes the entity set name and the targets: `new CreateMultipleAction(entitySetName, targets)`.

```typescript
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const accounts = [
  {
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    name: "Bulk Account 1",
    accountnumber: "BULK-001",
    revenue: 100000,
  },
  {
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    name: "Bulk Account 2",
    accountnumber: "BULK-002",
    revenue: 150000,
  },
  {
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    name: "Bulk Account 3",
    accountnumber: "BULK-003",
    revenue: 200000,
  },
];

const result = await client.execute(new CreateMultipleAction("accounts", accounts));

console.log(`Created IDs: ${result.Ids.join(", ")}`);
```

**Response:**

```json
{
  "Ids": [
    "11111111-1111-1111-1111-111111111111",
    "22222222-2222-2222-2222-222222222222",
    "33333333-3333-3333-3333-333333333333"
  ]
}
```

**Performance:** one request instead of one per record, so the saving grows with the number of
records. Timings depend on your network and the table, so measure with your own data.

**When to use:**

- Creating multiple records of the same type
- Need IDs returned
- Simpler than `$batch` for a single entity type

---

## Demo 3: UpdateMultiple Action (Bulk Update)

**Action**: Updates multiple records in a single request. Returns 204 No Content.

```typescript
import { UpdateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const updates = [
  {
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    accountid: "11111111-1111-1111-1111-111111111111",
    revenue: 250000,
    description: "Updated via UpdateMultiple",
  },
  {
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    accountid: "22222222-2222-2222-2222-222222222222",
    revenue: 300000,
    description: "Updated via UpdateMultiple",
  },
];

await client.execute(new UpdateMultipleAction("accounts", updates));
// No response body - 204 No Content
```

**When to use:**

- Updating multiple records efficiently
- Don't need response data
- Records already exist (have IDs)

---

## Demo 4: UpsertMultiple Action (Bulk Upsert)

**Action**: Creates or updates multiple records based on alternate keys. Returns 204 No Content.

```typescript
import { UpsertMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const accounts = [
  {
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    accountnumber: "UPSERT-001", // Alternate key
    name: "Upsert Account 1",
    revenue: 300000,
  },
  {
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    accountnumber: "UPSERT-002",
    name: "Upsert Account 2",
    revenue: 350000,
  },
];

await client.execute(new UpsertMultipleAction("accounts", accounts));

// Run again with the same alternate keys - updates instead of creates
accounts[0].revenue = 320000;
accounts[1].revenue = 370000;

await client.execute(new UpsertMultipleAction("accounts", accounts));
```

**Alternate Keys:**

- The table must have an alternate key defined (e.g., on `accountnumber`)
- Dataverse uses the key to determine create vs update

**When to use:**

- Integration scenarios (external system IDs)
- Don't know if records exist
- Have alternate key configured

---

## Demo 5: ExecuteWorkflow Action (Bound to workflow)

**Action**: Executes an on-demand workflow against a record. Returns the async operation ID.
`new ExecuteWorkflowAction(workflowId, entityId, inputArguments)`:

```typescript
import { ExecuteWorkflowAction } from "@mohsinonxrm/dataverse-sdk-actions";

const workflowId = "12345678-1234-1234-1234-123456789abc";
const targetAccountId = "11111111-1111-1111-1111-111111111111";

const result = await client.execute(
  new ExecuteWorkflowAction(workflowId, targetAccountId, {
    Arguments: { Count: 0, IsReadOnly: false, Keys: [], Values: [] },
  })
);

console.log(`Async Operation ID: ${result.asyncoperationid}`);
```

**Response:**

```json
{
  "asyncoperationid": "99999999-9999-9999-9999-999999999999"
}
```

**Monitoring:**

- Navigate to **Settings > System Jobs**
- Search by async operation ID
- Monitor workflow execution status

**When to use:**

- Trigger complex business logic
- Run long-running processes
- Asynchronous processing

---

## Demo 6: WinOpportunity Action (Unbound)

**Action**: Marks an opportunity as won and creates an opportunity close record.
`new WinOpportunityAction(opportunityClose, caller, status)`:

```typescript
import { WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";

const opportunityId = "11111111-1111-1111-1111-111111111111";

const opportunityClose = {
  "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
  subject: "Won: Big Deal",
  "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
  actualrevenue: 52000,
  actualend: new Date().toISOString(),
};

// status 3 = Won (a statuscode of the Won state); "" = no caller override
await client.execute(new WinOpportunityAction(opportunityClose, "", 3));
```

**Result:**

- Opportunity `statecode` = 1 (Won)
- Opportunity `statuscode` = 3 (Won)
- Creates an `opportunityclose` activity record
- Sets `actualrevenue` on the opportunity

**When to use:**

- Close opportunities as won
- Set actual revenue
- Trigger win-related plugins/workflows

**Similar actions:**

- `LoseOpportunity` - Mark as lost
- `CloseIncident` - Close case
- `QualifyLead` - Convert lead to account/contact/opportunity

---

## Demo 7: Merge Action (Unbound)

**Action**: Merges two records of the same entity type. Moves related data to the target and
deletes the subordinate. `new MergeAction(target, subordinate, updateContent, performParentingChecks)`,
where the first three are references to records:

```typescript
import { MergeAction, createEntityReference } from "@mohsinonxrm/dataverse-sdk-actions";

const targetId = "11111111-1111-1111-1111-111111111111";
const subordinateId = "22222222-2222-2222-2222-222222222222";

const merge = new MergeAction(
  createEntityReference("account", targetId),
  createEntityReference("account", subordinateId),
  createEntityReference("account", targetId), // UpdateContent, as the sample passes it
  false // PerformParentingChecks
);

await client.execute(merge);
```

**What happens:**

1. Activities, notes and relationships move from the subordinate to the target
2. The subordinate record is **deleted**
3. This cannot be undone

**Supported entities:**

- `account`
- `contact`
- `lead`
- `incident` (case)

**When to use:**

- Deduplicate records
- Consolidate customer data
- Clean up after import

**Best practices:**

- Review related records before merging
- Export subordinate data as backup
- Communicate with users (the record will be deleted)
- Set `performParentingChecks` to `true` if hierarchical relationships exist

---

## Demo 8: File Operations (Chunked Upload)

**Actions**: Upload large files with the three-step chunked upload process. The sample does this
by hand to show the actions; in your own code, `FileColumnClient` from
`@mohsinonxrm/dataverse-sdk-files` runs all three steps (see its
[README](../../packages/dataverse-sdk-files/README.md)).

### Step 1: Initialize Upload

```typescript
import {
  InitializeFileBlocksUploadAction,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-actions";

// new InitializeFileBlocksUploadAction(target, fileName, fileAttributeName)
const initialize = new InitializeFileBlocksUploadAction(
  createEntityReference("account", accountId),
  "document.pdf",
  "entityimage" // or a custom file column
);

const initResult = await client.execute(initialize);

console.log(`Continuation token: ${initResult.FileContinuationToken}`);
```

### Step 2: Upload Blocks

```typescript
import { UploadBlockAction } from "@mohsinonxrm/dataverse-sdk-actions";

const fileData = await fs.readFile("document.pdf");
const blockSize = 4 * 1024 * 1024; // 4 MB, the largest block Dataverse accepts
const blockCount = Math.ceil(fileData.length / blockSize);
const blockIds: string[] = [];

for (let i = 0; i < blockCount; i++) {
  const blockData = fileData.subarray(i * blockSize, (i + 1) * blockSize);
  const blockId = Buffer.from(`block-${i.toString().padStart(6, "0")}`).toString("base64");
  blockIds.push(blockId);

  // new UploadBlockAction(blockId, blockData, fileContinuationToken)
  await client.execute(
    new UploadBlockAction(blockId, blockData.toString("base64"), initResult.FileContinuationToken)
  );

  console.log(`Uploaded block ${i + 1}/${blockCount}`);
}
```

### Step 3: Commit Upload

```typescript
import { CommitFileBlocksUploadAction } from "@mohsinonxrm/dataverse-sdk-actions";

// new CommitFileBlocksUploadAction(fileName, mimeType, blockList, fileContinuationToken)
await client.execute(
  new CommitFileBlocksUploadAction(
    "document.pdf",
    "application/pdf",
    blockIds,
    initResult.FileContinuationToken
  )
);

console.log("File upload complete!");
```

**Supported columns:**

- **File columns** (e.g., `new_attachment`)
- **Image columns** (e.g., `entityimage`)

**Limits:**

- Block size: 4 MB at most
- The maximum file size is set per column (up to 10 GB for file columns)
- Block IDs: base64-encoded strings of the same length

**When to use:**

- Files > 4MB
- Show upload progress
- Resume failed uploads (store block IDs)

---

## Bulk Operations vs $batch

### Decision Matrix

| Scenario                          | Use Bulk Operations               | Use $batch                  |
| --------------------------------- | --------------------------------- | --------------------------- |
| **Single entity type**            | ✅ CreateMultiple, UpdateMultiple | ⚠️ Overkill                 |
| **Multiple entity types**         | ❌ Not supported                  | ✅ $batch                   |
| **Need transactional guarantees** | ⚠️ One request, all or nothing    | ✅ $batch changeset         |
| **Need Content-ID references**    | ❌ Not supported                  | ✅ $batch                   |
| **Need all IDs returned**         | ✅ CreateMultiple returns IDs     | ⚠️ Parse responses          |
| **Simplicity**                    | ✅ Single action call             | ⚠️ Complex multipart format |

### Example: When to use each

**Use CreateMultiple:**

```typescript
// Creating 50 accounts - simple, get all IDs back
const result = await client.execute(new CreateMultipleAction("accounts", accounts));
console.log(result.Ids); // All 50 IDs
```

**Use a $batch changeset:**

```typescript
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

// Create an account and two contacts that reference it, in one transaction
const batch = new BatchRequestBuilder(client);
batch.beginChangeset();
batch.addRequest("account", "POST", "accounts", undefined, account);
batch.addRequest(
  "contact1",
  "POST",
  "contacts",
  undefined,
  { ...contact1, "parentcustomerid_account@odata.bind": "$account" },
  ["account"]
);
batch.addRequest(
  "contact2",
  "POST",
  "contacts",
  undefined,
  { ...contact2, "parentcustomerid_account@odata.bind": "$account" },
  ["account"]
);
batch.endChangeset();
await batch.execute(); // All or nothing; throws DataverseBatchError on failure
```

---

## Common Errors

### 1. Missing @odata.type

**Error:**

```
InvalidArgument: The request payload must include '@odata.type' for each target.
```

**Fix:**

```typescript
// ❌ Wrong
const account = { name: "Test" };

// ✅ Correct
const account = {
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  name: "Test",
};
```

### 2. Workflow Not Found

**Error:**

```
ObjectDoesNotExist: Workflow with Id = 00000000-0000-0000-0000-000000000000 Does Not Exist
```

**Fix:**

1. Verify workflow exists in **Settings > Processes**
2. Workflow must be **Activated** and **On Demand**
3. Use correct workflow GUID in `TEST_WORKFLOW_ID`

### 3. Alternate Key Not Found

**Error:**

```
InvalidArgument: No alternate key attributes are defined for entity 'account'
```

**Fix:**

1. Navigate to **Settings > Customizations > Entities > [Entity] > Keys**
2. Create new alternate key (e.g., `accountnumber`)
3. Publish customizations
4. Wait for key index to be created (check notification)

### 4. Merge Not Supported

**Error:**

```
NotSupported: Merge operation is not supported for entity 'opportunity'
```

**Fix:**

- Merge only supports: `account`, `contact`, `lead`, `incident`

### 5. File Size Limit Exceeded

**Error:**

```
InvalidArgument: The file size exceeds the maximum allowed size
```

**Fix:**

1. Check the maximum file size of the file column (it is a column setting)
2. Split or compress the file if it is larger

---

## Best Practices

### 1. Always Include @odata.type

Bulk operations require `@odata.type` for each target:

```typescript
const targets = accounts.map((account) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  ...account,
}));
```

### 2. Batch Bulk Operations

For thousands of records, split into chunks:

```typescript
const chunkSize = 100;
for (let i = 0; i < accounts.length; i += chunkSize) {
  const chunk = accounts.slice(i, i + chunkSize);
  const result = await client.execute(new CreateMultipleAction("accounts", chunk));
  console.log(`Created ${result.Ids.length} accounts`);
}
```

### 3. Handle Failures

`CreateMultiple` is all or nothing: if one target is invalid, the request fails and none of the
records is created. The error says what was wrong:

```typescript
try {
  const result = await client.execute(new CreateMultipleAction("accounts", accounts));
  console.log(`Created ${result.Ids.length} records`);
} catch (error) {
  // Nothing was created. Fix the data, or create the records one by one to find the bad one.
  console.error(error);
}
```

### 4. Use Alternate Keys for Integrations

When syncing from external systems:

```typescript
// Map external ID to a Dataverse alternate key
const accounts = externalAccounts.map((ext) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  accountnumber: ext.externalId, // Alternate key
  name: ext.name,
}));

await client.execute(new UpsertMultipleAction("accounts", accounts)); // Creates or updates
```

### 5. Monitor Async Operations

For long-running workflows:

```typescript
const result = await client.execute(executeWorkflow);

// Poll for completion
let status;
do {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2s
  status = await client
    .api(`/asyncoperations(${result.asyncoperationid})`)
    .select("statuscode", "message")
    .get<{ statuscode: number; message?: string }>();
} while (status.statuscode < 30); // 0-21: waiting or running; 30 = succeeded

console.log(status.statuscode === 30 ? "Succeeded" : "Failed");
```

### 6. Backup Before Merge

Always keep a copy of the subordinate data:

```typescript
// Export the subordinate record with some related records
const subordinate = await client
  .api(`/accounts(${subordinateId})`)
  .expand("contact_customer_accounts", "opportunity_customer_accounts")
  .get();

await fs.writeFile("backup.json", JSON.stringify(subordinate, null, 2));

// Now safe to merge
await client.execute(merge);
```

---

## Advanced Patterns

### Pattern 1: Bulk Create with Parent-Child Relationships

`CreateMultiple` has no Content-ID references, so create the parents first and bind the children
to their ids:

```typescript
// Step 1: Create parent accounts
const accounts = [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Parent 1" },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Parent 2" },
];

const accountResult = await client.execute(new CreateMultipleAction("accounts", accounts));

// Step 2: Create child contacts bound to their parent
const contacts = accountResult.Ids.map((accountId) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.contact",
  firstname: "Child",
  lastname: "Contact",
  "parentcustomerid_account@odata.bind": `/accounts(${accountId})`,
}));

await client.execute(new CreateMultipleAction("contacts", contacts));
```

### Pattern 2: Conditional Bulk Update

Update only records matching criteria:

```typescript
// Query records to update
const accountsToUpdate = await client
  .api("/accounts")
  .filter("revenue lt 100000 and statecode eq 0")
  .select("accountid")
  .getAll<{ accountid: string }>();

// Build update targets
const updates = accountsToUpdate.map((account) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  accountid: account.accountid,
  description: "Low revenue account - needs attention",
}));

await client.execute(new UpdateMultipleAction("accounts", updates));

console.log(`Updated ${updates.length} low-revenue accounts`);
```

### Pattern 3: Chunked File Upload with Progress

Use `FileColumnClient`, which sends the three upload actions for you and reports progress:

```typescript
import { FileColumnClient } from "@mohsinonxrm/dataverse-sdk-files";

const files = new FileColumnClient(client);

await files.upload(
  "accounts", // entity set name
  accountId,
  "new_attachment", // file column
  await fs.readFile("./large-file.pdf"),
  "large-file.pdf",
  {
    onProgress: ({ percentage }) => console.log(`Upload progress: ${percentage}%`),
  }
);
```

### Pattern 4: Merge with Conflict Resolution

Merge keeps the target's values. To combine data, update the target before you merge:

```typescript
// Retrieve both records
const [target, subordinate] = await Promise.all([
  client
    .api(`/accounts(${targetId})`)
    .select("name", "revenue", "description")
    .get<{ name: string; revenue?: number; description?: string }>(),
  client
    .api(`/accounts(${subordinateId})`)
    .select("name", "revenue", "description")
    .get<{ name: string; revenue?: number; description?: string }>(),
]);

// Resolve conflicts on the target
await client.api(`/accounts(${targetId})`).patch({
  revenue: (target.revenue ?? 0) + (subordinate.revenue ?? 0), // Sum revenues
  description: `${target.description ?? ""}\n\nMerged from ${subordinate.name}: ${subordinate.description ?? ""}`,
});

// Then merge
await client.execute(
  new MergeAction(
    createEntityReference("account", targetId),
    createEntityReference("account", subordinateId),
    createEntityReference("account", targetId),
    false
  )
);
```

---

## Summary

This sample demonstrated:

✅ **Functions** (GET, read-only): `WhoAmI`  
✅ **Bulk Operations**: `CreateMultiple`, `UpdateMultiple`, `UpsertMultiple`  
✅ **Business Actions**: `ExecuteWorkflow`, `WinOpportunity`, `Merge`  
✅ **File Operations**: Chunked upload with the file actions  
✅ **Decision matrix**: When to use bulk operations vs $batch  
✅ **Best practices**: @odata.type, chunking, error handling, monitoring  
✅ **Advanced patterns**: Parent-child, conditional updates, progress tracking, merge conflicts

**Key Takeaways:**

1. **Functions** are GET operations with no side effects
2. **Actions** are POST operations that modify data
3. Both run with `client.execute(new XxxAction(...))`; the constructor arguments are positional
4. **Bulk operations** are faster than individual calls; each request is all or nothing
5. **$batch changesets** provide transactions across entity types
6. **@odata.type** is required for all bulk operation targets
7. **File operations** use a three-step chunked upload for large files

**Next Steps:**

- Explore `@mohsinonxrm/dataverse-sdk-batch` for transactional operations
- See the `messages-sales-cs` sample for the `OrganizationService.execute()` pattern
- Review `docs/mapping/supported-operations.md` for the complete list

## License

This sample is part of `@mohsinonxrm/dataverse-sdk-typescript` and is licensed under GNU AGPL v3.0.
