# Batch Operations Sample - $batch with Changesets

Comprehensive sample demonstrating Dataverse `$batch` operations including:

- **Changesets** (transactional groups - all succeed or all fail)
- **Content-ID references** (`$<id>`) for linking records
- **Continue-on-error** for partial success scenarios
- **Mixed operations** (create, update, delete, query in one batch)
- **Performance comparison** (individual vs batch vs bulk)
- **Error handling** and batch response parsing

This sample is perfect for:

- Understanding batch request structure and multipart/mixed format
- Creating parent-child relationships in a single request
- Processing multiple operations atomically
- Comparing individual calls, `$batch` and `CreateMultiple`
- Handling partial failures gracefully

---

## What is $batch?

The `$batch` endpoint in Dataverse Web API allows you to:

- **Group multiple operations** into a single HTTP request
- **Create transactions** using changesets (all-or-nothing execution)
- **Reference previous operations** using Content-ID (`$<id>`)
- **Reduce network overhead** by combining operations
- **Handle up to 1000 operations** per `$batch` request (the SDK splits larger batches for you)

### Batch vs Bulk Operations

| Feature             | $batch              | Bulk (CreateMultiple/UpdateMultiple) |
| ------------------- | ------------------- | ------------------------------------ |
| Max operations      | 1000                | 100-1000 (table dependent)           |
| Transaction support | ✅ Yes (changesets) | ❌ No                                |
| Multi-entity        | ✅ Yes              | ❌ Same entity only                  |
| Content-ID refs     | ✅ Yes              | ❌ No                                |
| Query operations    | ✅ Yes              | ❌ No                                |
| Performance         | Good                | Best                                 |
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
3. **Content-ID References** - create parent and link children using `$account`
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

Every demo builds a `BatchRequestBuilder` and sends it with `execute()`. The signature is
`addRequest(id, method, url, headers?, body?, dependsOn?)`; the `id` keys the result and, inside a
changeset, is also the part's Content-ID.

```typescript
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);
```

### Demo 1: Simple Batch (No Changeset)

Three creates without a transaction. If one fails, the others are not rolled back:

```typescript
const prefer = { Prefer: "return=representation" };
batch.addRequest("req1", "POST", "/accounts", prefer, { name: "Account 1" });
batch.addRequest("req2", "POST", "/accounts", prefer, { name: "Account 2" });
batch.addRequest("req3", "POST", "/accounts", prefer, { name: "Account 3" });

const result = await batch.execute();
console.log(result.success, result.responses.size); // true 3
```

### Demo 2: Changeset (Transactional)

Requests between `beginChangeset()` and `endChangeset()` succeed or fail together:

```typescript
batch.beginChangeset();
batch.addRequest("create-account", "POST", "/accounts", undefined, {
  name: "Transactional Account",
});
batch.addRequest("create-contact1", "POST", "/contacts", undefined, {
  firstname: "John",
  lastname: "Doe",
});
batch.addRequest("create-contact2", "POST", "/contacts", undefined, {
  firstname: "Jane",
  lastname: "Smith",
});
batch.endChangeset();

await batch.execute();
```

If one request fails, Dataverse rolls the changeset back and `execute()` throws a
`DataverseBatchError` whose `result` holds the failing response.

### Demo 3: Content-ID References

Inside a changeset, a request's id is its Content-ID. A later request refers to the record an
earlier one creates as `$<id>`:

```typescript
batch.beginChangeset();

// The id "account" is the Content-ID
batch.addRequest("account", "POST", "/accounts", undefined, { name: "Parent Account" });

// $account resolves to the account created above. dependsOn names the earlier request
// the body refers to; it is checked when the request is added.
batch.addRequest(
  "contact1",
  "POST",
  "/contacts",
  undefined,
  { firstname: "Child", lastname: "Contact 1", "parentcustomerid_account@odata.bind": "$account" },
  ["account"]
);
batch.addRequest(
  "contact2",
  "POST",
  "/contacts",
  undefined,
  { firstname: "Child", lastname: "Contact 2", "parentcustomerid_account@odata.bind": "$account" },
  ["account"]
);

batch.endChangeset();
await batch.execute();
```

Ids inside a changeset may only contain letters, digits, `.`, `_`, `~` and `-`, and `$<id>`
only works within the same changeset. An id such as `"1"` gives the classic `$1`.

### Demo 4: Continue-on-Error

By default Dataverse stops at the first failure. With `continueOnError: true` it runs every
request and `execute()` returns the result instead of throwing:

```typescript
// req3 binds to a contact that does not exist
const result = await batch.execute({ continueOnError: true });

for (const [id, response] of result.responses) {
  console.log(id, response.status); // req1 201, req2 201, req3 4xx, req4 201, req5 201
}
for (const [id, error] of result.errors) {
  console.log(id, error.message); // typed errors, as client.api() would throw
}
console.log(result.success, result.successfulRequests, result.failedRequests); // false 4 1
```

### Demo 5: Mixed Operations

A query followed by a changeset with a create, an update and a delete:

```typescript
batch.addRequest("query", "GET", "/accounts?$select=name&$top=5");

batch.beginChangeset();
batch.addRequest("create", "POST", "/accounts", undefined, {
  name: "New Account from Mixed Batch",
});
batch.addRequest("update", "PATCH", `/accounts(${testAccountId})`, undefined, {
  websiteurl: "https://updated.example.com",
});
batch.addRequest("delete", "DELETE", `/accounts(${deleteAccountId})`);
batch.endChangeset();

const result = await batch.execute();
const rows = (result.responses.get("query")?.body as { value: { name: string }[] }).value;
```

### Demo 6: Performance Comparison

Creates 10 accounts three ways and prints the time of each: one request per record, one `$batch`
changeset, and one `CreateMultiple` call. The bulk call is
`client.execute(new CreateMultipleAction("accounts", targets))`, where each target carries
`"@odata.type": "Microsoft.Dynamics.CRM.account"`. Timings depend on your network and
environment; with 10 records the differences are small. The sample then deletes everything it
created, in one batch.

---

## Batch Response Structure

`execute()` returns a `BatchExecutionResult`:

```typescript
interface BatchExecutionResult {
  responses: Map<string, BatchResponseStep>; // keyed by the id passed to addRequest
  results: BatchResponseStep[]; // every response received, in request order
  errors: Map<string, Error>; // failed requests, keyed by id
  success: boolean; // every request ran and succeeded
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  skippedRequestIds: string[]; // no response: Dataverse stopped early, or the changeset rolled back
  stoppedEarly: boolean;
}

interface BatchResponseStep {
  id: string;
  status: number; // 200, 201, 204, 4xx, 5xx
  headers: Record<string, string>;
  body?: any; // parsed JSON, otherwise the text
}
```

```typescript
const result = await batch.execute({ continueOnError: true });

for (const [id, response] of result.responses) {
  if (response.status === 201) {
    console.log(id, "created", response.body?.accountid); // with Prefer: return=representation
  } else if (response.status === 204) {
    console.log(id, "succeeded (no content)");
  }
}
```

See the [batch package README](../../packages/dataverse-sdk-batch/README.md) for the full API.

---

## Best Practices

### 1. Batch Size

- **Maximum:** 1000 requests per `$batch`.
- `execute()` splits larger batches into several `$batch` requests, one after the other, and never splits a changeset. Set `batchSize` (1 to 1000) to send smaller ones.
- Without `continueOnError`, the batches after one with a failure are not sent; their ids are in `skippedRequestIds`.

### 2. Changeset Design

- Keep changesets small and related (a parent plus its children).
- A changeset cannot be nested or empty, and cannot hold more than 1000 requests.
- Put `GET` requests outside changesets.

### 3. Error Handling

```typescript
import { DataverseBatchError } from "@mohsinonxrm/dataverse-sdk-batch";

try {
  await batch.execute();
} catch (error) {
  if (error instanceof DataverseBatchError && error.result) {
    const { results, errors, skippedRequestIds } = error.result;
    // results: what was received; errors: typed failures; skippedRequestIds: never ran
  }
}
```

Use `continueOnError: true` when partial success is acceptable.

### 4. Content-ID Best Practices

- Use descriptive ids (`"account"`, `"contact1"`); they are your result keys too.
- Add the referenced request first; a `dependsOn` that names a later request throws when you add it.
- Reference with `$<id>` in `@odata.bind` values or as the URL of a later `PATCH` or `DELETE`.

### 5. Debugging Batch Requests

`batch.encode(boundary)` returns the multipart body `execute()` would send for a batch that fits
in one `$batch`:

```typescript
console.log(batch.encode("batch_debug"));
```

---

## Common Errors and Solutions

### Error: "Request length too large"

**Cause:** the batch body is too large. **Solutions:** reduce the payload, or lower `batchSize`.

### Error: "Invalid request ID in a changeset" or "depends on ... not an earlier request"

**Cause:** an id with characters outside letters, digits, `.`, `_`, `~` and `-`, or a `dependsOn`
that names a request outside the open changeset. **Solution:** rename the id, and add the
referenced request first, in the same changeset.

### Error: a `DataverseBatchError` for a changeset

**Cause:** one request in the changeset failed, so Dataverse rolled all of them back.
**Solutions:** read `error.result.errors` for the failing request, validate data first, or move
the independent requests out of the changeset.

### Error: "404 Not Found" for navigation property

**Cause:** the navigation property or reference is wrong.

```typescript
// Wrong
"parentcustomerid@odata.bind": "accounts(id)"

// Correct
"parentcustomerid_account@odata.bind": "/accounts(id)"

// With a Content-ID
"parentcustomerid_account@odata.bind": "$account"
```

---

## Advanced Patterns

### Pattern 1: Hierarchical Data Creation

```typescript
batch.beginChangeset();
batch.addRequest("corp", "POST", "/accounts", undefined, { name: "Corporation" });
batch.addRequest(
  "sub1",
  "POST",
  "/accounts",
  undefined,
  { name: "Subsidiary 1", "parentaccountid@odata.bind": "$corp" },
  ["corp"]
);
batch.addRequest(
  "employee",
  "POST",
  "/contacts",
  undefined,
  { firstname: "Employee", "parentcustomerid_account@odata.bind": "$sub1" },
  ["sub1"]
);
batch.endChangeset();
```

### Pattern 2: Conditional Operations

A batch cannot branch on its own results, so query first and send a second batch:

```typescript
const first = new BatchRequestBuilder(client);
first.addRequest("find", "GET", "/accounts?$filter=name eq 'Contoso'&$select=accountid");
const found = await first.execute();
const rows = (found.responses.get("find")?.body as { value: { accountid: string }[] }).value;

const second = new BatchRequestBuilder(client);
if (rows.length > 0) {
  second.addRequest("write", "PATCH", `/accounts(${rows[0].accountid})`, undefined, {
    websiteurl: "https://updated.example.com",
  });
} else {
  second.addRequest("write", "POST", "/accounts", undefined, { name: "Contoso" });
}
await second.execute();
```

### Pattern 3: Bulk Update with Rollback

```typescript
batch.beginChangeset(); // all or nothing
for (const id of accountIds) {
  batch.addRequest(`update-${id}`, "PATCH", `/accounts(${id})`, undefined, { industrycode: 1 });
}
batch.endChangeset();

try {
  await batch.execute();
} catch (error) {
  // the changeset was rolled back; nothing was updated
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
