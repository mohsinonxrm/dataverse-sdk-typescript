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

# Optional: For ExecuteWorkflow demo
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
5. Display performance metrics

## Demo 1: WhoAmI Function (GET)

**Function**: Unbound GET operation that returns current user information.

```typescript
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const whoAmiFn = new WhoAmIFunction();
const result = await whoAmiFn.execute(client);

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

**Action**: Creates multiple records of the same entity type in a single request.

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

const createMultiple = new CreateMultipleAction({
  Targets: accounts,
});

const result = await createMultiple.execute(client);

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

**Performance:**

- **3 records**: ~0.5-1s (2-6 records/sec) vs individual creates ~1.5-3s
- **10 records**: ~1-2s (5-10 records/sec) vs individual creates ~5-15s
- **100 records**: ~5-15s (6-20 records/sec) vs individual creates ~50-150s

**When to use:**

- Creating multiple records of the same type
- Need IDs returned
- Don't need transactional guarantees across all records
- Simpler than $batch for single entity type

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

const updateMultiple = new UpdateMultipleAction({
  Targets: updates,
});

await updateMultiple.execute(client);
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

const upsertMultiple = new UpsertMultipleAction({
  Targets: accounts,
});

await upsertMultiple.execute(client);

// Run again with same alternate keys - updates instead of creates
accounts[0].revenue = 320000;
accounts[1].revenue = 370000;

await upsertMultiple.execute(client);
```

**Alternate Keys:**

- Entity must have an alternate key defined (e.g., `accountnumber`)
- Dataverse uses the key to determine create vs update
- Atomicity: Each record is upserted independently

**When to use:**

- Integration scenarios (external system IDs)
- Don't know if records exist
- Have alternate key configured

---

## Demo 5: ExecuteWorkflow Action (Bound to workflow)

**Action**: Executes an on-demand workflow against a record. Returns async operation ID.

```typescript
import { ExecuteWorkflowAction } from "@mohsinonxrm/dataverse-sdk-actions";

const workflowId = "12345678-1234-1234-1234-123456789abc";
const targetAccountId = "11111111-1111-1111-1111-111111111111";

const executeWorkflow = new ExecuteWorkflowAction(workflowId, {
  EntityId: targetAccountId,
});

const result = await executeWorkflow.execute(client);

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

```typescript
import { WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";

const opportunityId = "11111111-1111-1111-1111-111111111111";

const winOpp = new WinOpportunityAction({
  OpportunityClose: {
    "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
    subject: "Won: Big Deal",
    opportunityid: {
      "@odata.type": "Microsoft.Dynamics.CRM.opportunity",
      opportunityid: opportunityId,
    },
    actualrevenue: 52000,
    actualend: new Date().toISOString(),
  },
  Status: -1, // Won (statuscode)
});

await winOpp.execute(client);
```

**Result:**

- Opportunity `statecode` = 1 (Won)
- Opportunity `statuscode` = 3 (Won)
- Creates `opportunityclose` activity record
- Updates `actualrevenue` on opportunity

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

**Action**: Merges two records of the same entity type. Moves all related data to target and deletes subordinate.

```typescript
import { MergeAction } from "@mohsinonxrm/dataverse-sdk-actions";

const targetId = "11111111-1111-1111-1111-111111111111";
const subordinateId = "22222222-2222-2222-2222-222222222222";

const merge = new MergeAction({
  Target: {
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    accountid: targetId,
  },
  Subordinate: subordinateId,
  UpdateContent: {
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    revenue: 800000, // Combined revenue
  },
  PerformParentingChecks: false,
});

await merge.execute(client);
```

**What happens:**

1. All activities, notes, relationships move from subordinate to target
2. Target record is updated with `UpdateContent`
3. Subordinate record is **deleted**
4. Cannot be undone!

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
- Communicate with users (record will be deleted)
- Set `PerformParentingChecks: true` if hierarchical relationships exist

---

## Demo 8: File Operations (Chunked Upload)

**Actions**: Upload large files using three-step chunked upload process.

### Step 1: Initialize Upload

```typescript
import { InitializeFileBlocksUploadAction } from "@mohsinonxrm/dataverse-sdk-actions";

const initialize = new InitializeFileBlocksUploadAction("accounts", accountId, {
  Target: {
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    accountid: accountId,
  },
  FileAttributeName: "entityimage", // or custom file column
  FileName: "document.pdf",
});

const initResult = await initialize.execute(client);

console.log(`Upload Token: ${initResult.UploadToken}`);
console.log(`Block Size: ${initResult.BlockSize}`); // Default 4MB
```

### Step 2: Upload Blocks

```typescript
import { UploadBlockAction } from "@mohsinonxrm/dataverse-sdk-actions";

const fileData = await fs.readFile("document.pdf");
const blockSize = initResult.BlockSize;
const blockCount = Math.ceil(fileData.length / blockSize);
const blockIds: string[] = [];

for (let i = 0; i < blockCount; i++) {
  const start = i * blockSize;
  const end = Math.min(start + blockSize, fileData.length);
  const blockData = fileData.slice(start, end);
  const blockId = Buffer.from(`block-${i.toString().padStart(6, "0")}`).toString("base64");

  blockIds.push(blockId);

  const uploadBlock = new UploadBlockAction(initResult.UploadToken, {
    BlockId: blockId,
    BlockData: blockData.toString("base64"),
  });

  await uploadBlock.execute(client);

  console.log(`Uploaded block ${i + 1}/${blockCount}`);
}
```

### Step 3: Commit Upload

```typescript
import { CommitFileBlocksUploadAction } from "@mohsinonxrm/dataverse-sdk-actions";

const commit = new CommitFileBlocksUploadAction(initResult.UploadToken, {
  BlockList: blockIds,
  FileName: "document.pdf",
});

await commit.execute(client);

console.log("File upload complete!");
```

**Supported columns:**

- **File columns** (e.g., `new_attachment`)
- **Image columns** (e.g., `entityimage`)

**Limits:**

- Max file size: 128 MB (configurable in environment settings)
- Default chunk size: 4 MB
- Block ID: base64-encoded string

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
| **Multiple entity types**         | ❌ Not supported                  | ✅ $batch changeset         |
| **Need transactional guarantees** | ❌ Independent operations         | ✅ $batch changeset         |
| **Need Content-ID references**    | ❌ Not supported                  | ✅ $batch                   |
| **Need all IDs returned**         | ✅ CreateMultiple returns IDs     | ⚠️ Parse responses          |
| **Simplicity**                    | ✅ Single action call             | ⚠️ Complex multipart format |
| **Performance (100+ records)**    | ✅ 6-20 records/sec               | ⚠️ 2-10 records/sec         |

### Example: When to use each

**Use CreateMultiple:**

```typescript
// Creating 50 accounts - simple, fast, get all IDs back
const createMultiple = new CreateMultipleAction({
  Targets: accounts,
});
const result = await createMultiple.execute(client);
console.log(result.Ids); // All 50 IDs
```

**Use $batch changeset:**

```typescript
// Create account + 3 contacts + 2 opportunities - transactional
const batch = client.batch();
batch.beginChangeset();
batch.addRequest(client.api("/accounts").post(account)); // $1
batch.addRequest(client.api("/contacts").post({ ...contact1, parentcustomerid: "$1" }));
batch.addRequest(client.api("/contacts").post({ ...contact2, parentcustomerid: "$1" }));
batch.addRequest(client.api("/opportunities").post({ ...opp1, customerid: "$1" }));
batch.endChangeset();
await batch.execute(); // All or nothing
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
NotSupported: Merge operation is not supported for entity 'lead'
```

**Fix:**

- Merge only supports: `account`, `contact`, `lead`, `incident`
- For leads, use `MergeLead` message instead (not in v1)

### 5. File Size Limit Exceeded

**Error:**

```
InvalidArgument: The file size exceeds the maximum allowed size
```

**Fix:**

1. Check environment file size limit: **Settings > Email Configuration > Set file size limit**
2. Default: 5MB (can increase to 128MB)
3. Split files if > 128MB

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

For thousands of records, split into batches:

```typescript
const batchSize = 100;
for (let i = 0; i < accounts.length; i += batchSize) {
  const batch = accounts.slice(i, i + batchSize);
  const createMultiple = new CreateMultipleAction({ Targets: batch });
  const result = await createMultiple.execute(client);
  console.log(`Created ${result.Ids.length} accounts`);
}
```

### 3. Handle Partial Failures

Bulk operations fail atomically per record:

```typescript
try {
  const result = await createMultiple.execute(client);
  console.log(`Created ${result.Ids.length} records`);
} catch (error) {
  // Check if partial success
  if (error.response?.CreatedIds) {
    console.log(`Partial success: ${error.response.CreatedIds.length} created`);
  }
}
```

### 4. Use Alternate Keys for Integrations

When syncing from external systems:

```typescript
// Map external ID to Dataverse alternate key
const accounts = externalAccounts.map((ext) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  accountnumber: ext.externalId, // Alternate key
  name: ext.name,
}));

const upsert = new UpsertMultipleAction({ Targets: accounts });
await upsert.execute(client); // Creates or updates
```

### 5. Monitor Async Operations

For long-running workflows:

```typescript
const result = await executeWorkflow.execute(client);

// Poll for completion
let status;
do {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2s
  status = await client
    .api(`/asyncoperations(${result.asyncoperationid})`)
    .select("statuscode", "message")
    .get();
} while (status.statuscode === 0); // 0 = In Progress

console.log(status.statuscode === 30 ? "Succeeded" : "Failed");
```

### 6. Backup Before Merge

Always backup subordinate data:

```typescript
// Export subordinate record
const subordinate = await client
  .api(`/accounts(${subordinateId})`)
  .expand("contact_customer_accounts", "opportunity_customer_accounts")
  .get();

await fs.writeFile("backup.json", JSON.stringify(subordinate, null, 2));

// Now safe to merge
await merge.execute(client);
```

---

## Advanced Patterns

### Pattern 1: Bulk Create with Parent-Child Relationships

Since `CreateMultiple` doesn't support Content-ID references, create parents first:

```typescript
// Step 1: Create parent accounts
const accounts = [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Parent 1" },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Parent 2" },
];

const createAccounts = new CreateMultipleAction({ Targets: accounts });
const accountResult = await createAccounts.execute(client);

// Step 2: Create child contacts with parent references
const contacts = accountResult.Ids.map((accountId) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.contact",
  firstname: "Child",
  lastname: "Contact",
  parentcustomerid_account: {
    "@odata.id": `/accounts(${accountId})`,
  },
}));

const createContacts = new CreateMultipleAction({ Targets: contacts });
await createContacts.execute(client);
```

### Pattern 2: Conditional Bulk Update

Update only records matching criteria:

```typescript
// Query records to update
const accountsToUpdate = await client
  .api("/accounts")
  .filter("revenue lt 100000 and statecode eq 0")
  .select("accountid")
  .getAll();

// Build update targets
const updates = accountsToUpdate.map((account) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  accountid: account.accountid,
  description: "Low revenue account - needs attention",
  customertypecode: 3, // Low priority
}));

const updateMultiple = new UpdateMultipleAction({ Targets: updates });
await updateMultiple.execute(client);

console.log(`Updated ${updates.length} low-revenue accounts`);
```

### Pattern 3: Chunked File Upload with Progress

```typescript
async function uploadFileWithProgress(
  client: DataverseClient,
  entitySetName: string,
  recordId: string,
  filePath: string,
  columnName: string,
  onProgress?: (percent: number) => void
): Promise<void> {
  const fileData = await fs.readFile(filePath);
  const fileName = path.basename(filePath);

  // Initialize
  const initialize = new InitializeFileBlocksUploadAction(entitySetName, recordId, {
    Target: {
      "@odata.type": `Microsoft.Dynamics.CRM.${entitySetName}`,
      [`${entitySetName}id`]: recordId,
    },
    FileAttributeName: columnName,
    FileName: fileName,
  });

  const initResult = await initialize.execute(client);
  const blockSize = initResult.BlockSize;
  const blockCount = Math.ceil(fileData.length / blockSize);
  const blockIds: string[] = [];

  // Upload blocks with progress
  for (let i = 0; i < blockCount; i++) {
    const start = i * blockSize;
    const end = Math.min(start + blockSize, fileData.length);
    const blockData = fileData.slice(start, end);
    const blockId = Buffer.from(`block-${i.toString().padStart(6, "0")}`).toString("base64");

    blockIds.push(blockId);

    const uploadBlock = new UploadBlockAction(initResult.UploadToken, {
      BlockId: blockId,
      BlockData: blockData.toString("base64"),
    });

    await uploadBlock.execute(client);

    if (onProgress) {
      onProgress(((i + 1) / blockCount) * 100);
    }
  }

  // Commit
  const commit = new CommitFileBlocksUploadAction(initResult.UploadToken, {
    BlockList: blockIds,
    FileName: fileName,
  });

  await commit.execute(client);
}

// Usage
await uploadFileWithProgress(
  client,
  "accounts",
  accountId,
  "./large-file.pdf",
  "new_attachment",
  (percent) => console.log(`Upload progress: ${percent.toFixed(1)}%`)
);
```

### Pattern 4: Merge with Conflict Resolution

Handle merge conflicts by updating target with combined data:

```typescript
// Retrieve both records
const [target, subordinate] = await Promise.all([
  client.api(`/accounts(${targetId})`).select("name", "revenue", "description").get(),
  client.api(`/accounts(${subordinateId})`).select("name", "revenue", "description").get(),
]);

// Resolve conflicts
const updateContent = {
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  name: target.name, // Keep target name
  revenue: (target.revenue || 0) + (subordinate.revenue || 0), // Sum revenues
  description: `${target.description || ""}\n\nMerged from ${subordinate.name}: ${subordinate.description || ""}`, // Combine descriptions
};

// Merge with resolved data
const merge = new MergeAction({
  Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: targetId },
  Subordinate: subordinateId,
  UpdateContent: updateContent,
  PerformParentingChecks: false,
});

await merge.execute(client);
```

---

## Summary

This sample demonstrated:

✅ **Functions** (GET, read-only): `WhoAmI`  
✅ **Bulk Operations**: `CreateMultiple`, `UpdateMultiple`, `UpsertMultiple`  
✅ **Business Actions**: `ExecuteWorkflow`, `WinOpportunity`, `Merge`  
✅ **File Operations**: Chunked upload with progress  
✅ **Decision matrix**: When to use bulk operations vs $batch  
✅ **Best practices**: @odata.type, batching, error handling, monitoring  
✅ **Advanced patterns**: Parent-child, conditional updates, progress tracking, merge conflicts

**Key Takeaways:**

1. **Functions** are GET operations with no side effects
2. **Actions** are POST operations that modify data
3. **Bulk operations** are faster than individual calls but not transactional
4. **$batch changesets** provide transactional guarantees across entity types
5. **@odata.type** is required for all bulk operation targets
6. **File operations** use three-step chunked upload for large files

**Next Steps:**

- Explore `@mohsinonxrm/dataverse-sdk-batch` for transactional operations
- See `messages-sales-cs` sample for OrganizationService.execute() pattern
- Review `docs/mapping/supported-actions.md` for complete action list

## License

This sample is part of `@mohsinonxrm/dataverse-sdk-typescript` and is licensed under GNU AGPL v3.0.
