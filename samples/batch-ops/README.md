# Batch Operations Sample - $batch with Changesets

Comprehensive sample demonstrating Dataverse `$batch` operations including:

- **Changesets** (transactional groups - all succeed or all fail)
- **Content-ID references** ($1, $2, etc.) for linking records
- **Continue-on-error** for partial success scenarios
- **Mixed operations** (create, update, delete, query in one batch)
- **Performance comparison** (individual vs batch vs bulk)
- **Error handling** and batch response parsing

This sample is perfect for:

- Understanding batch request structure and multipart/mixed format
- Creating parent-child relationships in a single request
- Processing multiple operations atomically
- Optimizing API call performance (3-5x faster than individual calls)
- Handling partial failures gracefully

---

## What is $batch?

The `$batch` endpoint in Dataverse Web API allows you to:

- **Group multiple operations** into a single HTTP request
- **Create transactions** using changesets (all-or-nothing execution)
- **Reference previous operations** using Content-ID ($1, $2, etc.)
- **Reduce network overhead** by combining operations
- **Handle up to 1000 operations** per batch request

### Batch vs Bulk Operations

| Feature             | $batch              | Bulk (CreateMultiple/UpdateMultiple) |
| ------------------- | ------------------- | ------------------------------------ |
| Max operations      | 1000                | 100-1000 (table dependent)           |
| Transaction support | ✅ Yes (changesets) | ❌ No                                |
| Multi-entity        | ✅ Yes              | ❌ Same entity only                  |
| Content-ID refs     | ✅ Yes              | ❌ No                                |
| Query operations    | ✅ Yes              | ❌ No                                |
| Performance         | Good (3-5x)         | Best (5-10x)                         |
| Use case            | Complex workflows   | High-volume same-entity              |

**Rule of thumb:**

- Use **bulk** for simple same-entity creates/updates
- Use **batch** for relationships, transactions, and mixed operations

---

## Prerequisites

### 1. Azure AD App Registration

See [daemon-clientcredentials sample](../daemon-clientcredentials/README.md#prerequisites) for complete app registration steps.

**Quick checklist:**

- ✅ App registration created
- ✅ Client secret generated
- ✅ API permissions: Dynamics CRM / user_impersonation
- ✅ Admin consent granted
- ✅ Application User created in Dataverse

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
cd samples/batch-ops
cp .env.example .env
```

Edit `.env` and fill in your values:

```bash
AZURE_CLIENT_ID=your-app-registration-client-id
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_SECRET=your-client-secret

DATAVERSE_URL=https://yourorg.crm.dynamics.com
```

---

## Running the Sample

### Run All Demos

```bash
pnpm start
```

This executes 6 comprehensive demos:

1. **Simple Batch** - parallel independent operations (no transaction)
2. **Changeset** - transactional group (atomic commit)
3. **Content-ID References** - create parent and link children using $1
4. **Continue-on-Error** - partial success handling
5. **Mixed Operations** - CRUD + query in one batch
6. **Performance Comparison** - individual vs batch vs bulk

### Development Mode

```bash
pnpm dev
```

Changes to `src/index.ts` will automatically reload.

---

## Demo Explanations

### Demo 1: Simple Batch (No Changeset)

Creates 3 accounts in parallel without a transaction:

```typescript
const batch = batchClient.createBatch();

batch.addCreate("accounts", { name: "Account 1" }, "1");
batch.addCreate("accounts", { name: "Account 2" }, "2");
batch.addCreate("accounts", { name: "Account 3" }, "3");

const response = await batchClient.executeBatch(batch);
```

**Characteristics:**

- Operations execute **independently**
- If one fails, others may still succeed
- No rollback if failures occur
- Faster execution (parallel processing)

**Use when:**

- Operations are unrelated
- Partial success is acceptable
- Maximum throughput needed

---

### Demo 2: Changeset (Transactional)

Creates account + 2 contacts atomically:

```typescript
const batch = batchClient.createBatch();

batch.beginChangeset(); // Start transaction

batch.addCreate("accounts", { name: "Parent" }, "1");
batch.addCreate("contacts", { firstname: "John" }, "2");
batch.addCreate("contacts", { firstname: "Jane" }, "3");

batch.endChangeset(); // End transaction

const response = await batchClient.executeBatch(batch);
```

**Characteristics:**

- **All operations succeed or all fail** (ACID transaction)
- Automatic rollback on any failure
- Operations execute sequentially
- Slightly slower than non-changeset

**Use when:**

- Data integrity is critical
- Operations are dependent
- No partial success allowed

**Example scenario:** Creating an opportunity with multiple products - if any product fails, the entire opportunity should not be created.

---

### Demo 3: Content-ID References

Creates account and links 2 contacts using `$1` reference:

```typescript
const batch = batchClient.createBatch();

batch.beginChangeset();

// Create account with Content-ID = 1
batch.addCreate("accounts", { name: "Parent" }, "1");

// Link contact to account using $1
batch.addCreate(
  "contacts",
  {
    firstname: "Child",
    "parentcustomerid_account@odata.bind": "$1", // References Content-ID 1
  },
  "2"
);

batch.endChangeset();
```

**How Content-IDs work:**

1. Assign Content-ID to create operation (e.g., `'1'`)
2. Reference it as `$1` in navigation properties
3. Server resolves `$1` to the actual created ID

**Use cases:**

- Parent-child relationships
- Multi-level hierarchies
- Complex data graphs
- Avoiding multiple round trips

**Example:** Create account → create contact → create opportunity for that contact, all in one request.

---

### Demo 4: Continue-on-Error

Processes 5 operations, 1 fails, 4 succeed:

```typescript
const batch = batchClient.createBatch();

batch.setContinueOnError(true); // Enable partial success

batch.addCreate("accounts", { name: "Valid 1" }, "1");
batch.addCreate("accounts", { name: "Valid 2" }, "2");
batch.addCreate(
  "accounts",
  {
    name: "Invalid",
    "primarycontactid@odata.bind": "/contacts(00000000-0000-0000-0000-000000000000)", // Non-existent
  },
  "3"
);
batch.addCreate("accounts", { name: "Valid 3" }, "4");
batch.addCreate("accounts", { name: "Valid 4" }, "5");

const response = await batchClient.executeBatch(batch);

// Check each response
for (const resp of response.responses) {
  if (resp.status >= 200 && resp.status < 300) {
    console.log("Success:", resp.status);
  } else {
    console.error("Failed:", resp.status, resp.body);
  }
}
```

**Default behavior (without continue-on-error):**

- Batch fails on first error
- Remaining operations are skipped
- Returns error immediately

**With continue-on-error:**

- All operations are attempted
- Each response indicates success/failure
- Caller decides how to handle failures

**Use when:**

- Importing data with potential bad records
- Best-effort processing acceptable
- Need visibility into all failures

**Example:** Bulk data import where you want to import valid records and log/fix invalid ones separately.

---

### Demo 5: Mixed Operations

Combines query, create, update, delete in one batch:

```typescript
const batch = batchClient.createBatch();

// Query operation (outside changeset)
batch.addGet("/accounts?$select=name&$top=5", "1");

// Transactional operations
batch.beginChangeset();

batch.addCreate("accounts", { name: "New" }, "2");
batch.addUpdate("accounts", existingId, { websiteurl: "https://updated.com" }, "3");
batch.addDelete("accounts", deleteId, "4");

batch.endChangeset();

const response = await batchClient.executeBatch(batch);
```

**Batch structure:**

```
Batch
├─ GET /accounts (query - outside changeset)
└─ Changeset
   ├─ POST /accounts (create)
   ├─ PATCH /accounts(id) (update)
   └─ DELETE /accounts(id) (delete)
```

**Rules:**

- **GET operations** must be outside changesets (queries are read-only)
- **Changesets** can contain POST, PATCH, PUT, DELETE
- Mix changesets and individual operations as needed

**Use cases:**

- Fetch data, then create/update based on results (requires 2 batches)
- Atomic multi-record updates with cleanup
- Complex workflows

---

### Demo 6: Performance Comparison

Measures actual performance for 10 account creates:

**Individual API calls:**

```typescript
for (let i = 0; i < 10; i++) {
  await client.api("/accounts").post({ name: `Account ${i}` });
}
// Result: ~6-12 seconds (0.8-1.7 records/sec)
```

**Batch with changeset:**

```typescript
const batch = batchClient.createBatch();
batch.beginChangeset();
for (let i = 0; i < 10; i++) {
  batch.addCreate("accounts", { name: `Account ${i}` }, String(i));
}
batch.endChangeset();
await batchClient.executeBatch(batch);
// Result: ~2-4 seconds (2.5-5 records/sec) - 3-5x faster
```

**Bulk operation (CreateMultiple):**

```typescript
const accounts = Array.from({ length: 10 }, (_, i) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  name: `Account ${i}`,
}));
const action = new CreateMultipleAction("accounts", accounts);
await client.execute(action);
// Result: ~1-2 seconds (5-10 records/sec) - 6-12x faster
```

**Performance summary:**

- **Individual:** Baseline (slowest)
- **Batch:** 3-5x faster than individual
- **Bulk:** 6-12x faster than individual (same-entity only)

---

## Batch Response Structure

```typescript
interface BatchResponse {
  responses: Array<{
    contentId: string; // Matches request Content-ID
    status: number; // HTTP status (200, 201, 204, 4xx, 5xx)
    headers: Record<string, string>;
    body?: any; // Response data (if any)
  }>;
}
```

**Parsing responses:**

```typescript
const response = await batchClient.executeBatch(batch);

for (const resp of response.responses) {
  console.log(`Content-ID ${resp.contentId}: ${resp.status}`);

  if (resp.status === 201) {
    // Created
    const id = resp.body.accountid;
    console.log("Created:", id);
  } else if (resp.status === 204) {
    // Updated or deleted (no body)
    console.log("Success (no content)");
  } else if (resp.status >= 400) {
    // Error
    console.error("Error:", resp.body.error.message);
  }
}
```

---

## Best Practices

### 1. Batch Size Limits

- **Maximum:** 1000 operations per batch
- **Recommended:** 100-500 for reliability
- **Large batches:** May timeout or fail

**Auto-splitting (not yet implemented in v1):**

```typescript
// Future feature
const largeBatch = createBatchWithAutoSplit({ maxSize: 500 });
// Automatically splits into multiple batch requests
```

### 2. Changeset Design

**✅ Good:** Small, focused changesets

```typescript
batch.beginChangeset();
batch.addCreate("accounts", parent, "1");
batch.addCreate("contacts", child1, "2");
batch.addCreate("contacts", child2, "3");
batch.endChangeset();
```

**❌ Bad:** Everything in one giant changeset

```typescript
batch.beginChangeset();
// 500 operations here - slow, risky
batch.endChangeset();
```

**Why:** Large changesets:

- Hold database locks longer
- Higher chance of conflicts
- Harder to debug failures

### 3. Error Handling Strategies

**Strategy A: Fail-fast (default)**

```typescript
const batch = batchClient.createBatch();
// If any operation fails, entire batch fails
```

Use for critical workflows where partial success is unacceptable.

**Strategy B: Continue-on-error**

```typescript
batch.setContinueOnError(true);
// Process all operations, handle failures individually
```

Use for bulk imports where you want to identify all bad records.

**Strategy C: Hybrid (multiple changesets)**

```typescript
// Changeset 1: Critical operations (fail-fast)
batch.beginChangeset();
batch.addCreate("accounts", critical);
batch.endChangeset();

// Changeset 2: Optional operations (separate transaction)
batch.beginChangeset();
batch.addCreate("contacts", optional);
batch.endChangeset();
```

Use for workflows with varying importance levels.

### 4. Content-ID Best Practices

**✅ Use sequential numbers:**

```typescript
batch.addCreate("accounts", data, "1");
batch.addCreate("contacts", data, "2");
```

**❌ Avoid complex IDs:**

```typescript
batch.addCreate("accounts", data, "parent-account-uuid-123"); // Harder to track
```

**✅ Document relationships:**

```typescript
// Create parent (Content-ID 1)
batch.addCreate("accounts", { name: "Parent" }, "1");

// Create children referencing parent ($1)
batch.addCreate(
  "contacts",
  {
    firstname: "Child 1",
    "parentcustomerid_account@odata.bind": "$1",
  },
  "2"
);
```

### 5. Debugging Batch Requests

Enable SDK logging to see raw batch request/response:

```typescript
const client = new DataverseClient({
  baseUrl: env.dataverseUrl,
  tokenProvider,
  logger: console, // Log all requests
});
```

**Inspect multipart/mixed format:**

- Batch boundary markers
- Content-ID assignments
- Individual request headers/bodies

---

## Common Errors and Solutions

### Error: "Request length too large"

**Cause:** Batch exceeds maximum size (typically ~4MB)

**Solutions:**

1. Reduce number of operations
2. Reduce payload size (omit unnecessary fields)
3. Split into multiple batches

### Error: "Invalid content-id reference"

**Cause:** Referencing `$X` when Content-ID X doesn't exist or is outside changeset

**Solutions:**

1. Verify Content-ID is assigned before reference
2. Ensure both operations are in same changeset
3. Use correct syntax: `$1` not `1` or `${1}`

### Error: "Changeset failed to commit"

**Cause:** One operation in changeset failed, rolling back all

**Solutions:**

1. Check individual response statuses
2. Validate data before batching
3. Use continue-on-error if partial success acceptable

### Error: "404 Not Found" for navigation property

**Cause:** Invalid navigation property syntax

**Solutions:**

```typescript
// ❌ Wrong
'parentcustomerid@odata.bind': 'accounts(id)'

// ✅ Correct
'parentcustomerid_account@odata.bind': '/accounts(id)'

// ✅ With Content-ID
'parentcustomerid_account@odata.bind': '$1'
```

---

## Advanced Patterns

### Pattern 1: Hierarchical Data Creation

Create multi-level hierarchy in one batch:

```typescript
batch.beginChangeset();

// Level 1: Parent account
batch.addCreate("accounts", { name: "Corporation" }, "1");

// Level 2: Subsidiary accounts
batch.addCreate(
  "accounts",
  {
    name: "Subsidiary 1",
    "parentaccountid@odata.bind": "$1",
  },
  "2"
);

// Level 3: Contact under subsidiary
batch.addCreate(
  "contacts",
  {
    firstname: "Employee",
    "parentcustomerid_account@odata.bind": "$2",
  },
  "3"
);

batch.endChangeset();
```

### Pattern 2: Conditional Operations

Query first, then create/update based on results (requires 2 batches):

```typescript
// Batch 1: Query
const batch1 = batchClient.createBatch();
batch1.addGet("/accounts?$filter=name eq 'Contoso'&$select=accountid", "1");
const response1 = await batchClient.executeBatch(batch1);

// Batch 2: Create or update based on query
const batch2 = batchClient.createBatch();
const exists = response1.responses[0].body.value.length > 0;

if (exists) {
  const id = response1.responses[0].body.value[0].accountid;
  batch2.addUpdate("accounts", id, { websiteurl: "https://updated.com" }, "1");
} else {
  batch2.addCreate("accounts", { name: "Contoso" }, "1");
}

await batchClient.executeBatch(batch2);
```

### Pattern 3: Bulk Update with Rollback

Update multiple records atomically:

```typescript
const accountIds = ["id1", "id2", "id3", "id4", "id5"];

batch.beginChangeset(); // Atomic - all or nothing

for (const id of accountIds) {
  batch.addUpdate(
    "accounts",
    id,
    {
      industrycode: 1, // Change industry
      ownerid: newOwnerId, // Reassign owner
    },
    id
  );
}

batch.endChangeset();

try {
  await batchClient.executeBatch(batch);
  console.log("All accounts updated");
} catch (error) {
  console.log("Update failed - all rolled back");
}
```

---

## Code Structure

```
src/
  index.ts              Main demo logic with 6 comprehensive demos
.env.example            Environment variable template
.env                    Your actual config (gitignored)
package.json            Dependencies and scripts
tsconfig.json           TypeScript configuration
README.md               This file
```

---

## Learn More

- [Dataverse SDK Core Documentation](../../packages/dataverse-sdk-core/README.md)
- [Batch Package Documentation](../../packages/dataverse-sdk-batch/README.md)
- [Actions Package - Bulk Operations](../../packages/dataverse-sdk-actions/README.md)
- [Microsoft Docs: Execute batch operations](https://learn.microsoft.com/power-apps/developer/data-platform/webapi/execute-batch-operations-using-web-api)

---

## License

This sample is part of the `dataverse-sdk-typescript` monorepo and is licensed under **GNU AGPL v3.0**. See [LICENSE](../../LICENSE) for details.
