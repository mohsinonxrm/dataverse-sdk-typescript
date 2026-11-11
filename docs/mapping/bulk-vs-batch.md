# Bulk Operations vs $batch Decision Matrix

When working with multiple records in Dataverse, you have two main approaches: **Bulk operations** (CreateMultiple, UpdateMultiple, etc.) and **$batch** operations. This guide helps you choose the right approach.

## Quick Decision Tree

```
Do you need to mix different operation types?
(e.g., creates + updates + deletes)
├─ YES → Use $batch
└─ NO → Are you working with a single entity type?
    ├─ YES → Are you doing creates, updates, or upserts?
    │   ├─ YES → Use Bulk Operations (simpler API)
    │   └─ NO (deletes) → Is this an elastic table?
    │       ├─ YES → Use DeleteMultipleAction
    │       └─ NO → Use $batch
    └─ NO (multiple entity types) → Use $batch
```

## Comparison Table

| Feature            | Bulk Operations                                                | $batch                                    |
| ------------------ | -------------------------------------------------------------- | ----------------------------------------- |
| **Package**        | `@mohsinonxrm/dataverse-sdk-actions`                           | `@mohsinonxrm/dataverse-sdk-batch`        |
| **Operations**     | CreateMultiple, UpdateMultiple, UpsertMultiple, DeleteMultiple | Any mix of GET, POST, PATCH, DELETE       |
| **HTTP Requests**  | Single POST                                                    | Single POST (multipart/mixed)             |
| **Entity Types**   | Single entity type per request                                 | Multiple entity types in one batch        |
| **Max Records**    | 100-1000 (standard), 100 (elastic)                             | Up to 1000 requests total                 |
| **Transactions**   | Atomic (standard tables)                                       | Change sets provide transactions          |
| **API Complexity** | Simple (single action call)                                    | More complex (batch builder)              |
| **Response**       | CreateMultiple returns IDs array                               | Individual responses per operation        |
| **References**     | N/A                                                            | Content-ID references between operations  |
| **Error Handling** | All-or-nothing (standard tables)                               | Per-operation errors + continue-on-error  |
| **When to Use**    | Bulk creates/updates/upserts of same entity                    | Cross-entity operations, mixed operations |

## Use Bulk Operations When:

✅ **Single entity type, single operation type**

```typescript
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

// Create 100 accounts
const accounts = Array.from({ length: 100 }, (_, i) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  name: `Account ${i + 1}`,
  creditlimit: 50000,
}));

const action = new CreateMultipleAction("accounts", { Targets: accounts });
const response = await client.execute(action);
console.log("Created:", response.Ids.length, "accounts");
```

✅ **100-1000 records (standard tables) or up to 100 (elastic tables)**

✅ **Want simplest API possible**

✅ **Need immediate response with all IDs** (CreateMultiple)

✅ **Working with elastic tables** (DeleteMultiple only works here)

## Use $batch When:

✅ **Mixed operation types** (creates + updates + deletes)

```typescript
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);

// addRequest(id, method, url, headers?, body?, dependsOn?)
// Create account
batch.addRequest("create", "POST", "accounts", undefined, { name: "Contoso" });

// Update contact
batch.addRequest("update", "PATCH", `contacts(${contactId})`, undefined, { firstname: "John" });

// Delete opportunity
batch.addRequest("delete", "DELETE", `opportunities(${opportunityId})`);

const result = await batch.execute();
// result.responses.get("create"), result.results (in request order)
```

✅ **Cross-entity operations with references**

```typescript
const batch = new BatchRequestBuilder(client);

batch.beginChangeset();

// Create account (Content-ID: account)
batch.addRequest("account", "POST", "accounts", undefined, { name: "Contoso" });

// Create contact referencing the account
batch.addRequest(
  "contact",
  "POST",
  "contacts",
  undefined,
  {
    firstname: "John",
    "parentcustomerid_account@odata.bind": "$account", // References Content-ID "account"
  },
  ["account"]
);

batch.endChangeset();

await batch.execute();
```

✅ **Need transactional semantics across different entities**

✅ **Want to bundle unrelated operations to reduce HTTP requests**

```typescript
const batch = new BatchRequestBuilder(client);

// Retrieve multiple unrelated records in one request
batch.addRequest("account", "GET", `accounts(${accountId})`);
batch.addRequest("contact", "GET", `contacts(${contactId})`);
batch.addRequest("opportunities", "GET", "opportunities?$top=5");

const result = await batch.execute();
```

✅ **Need partial success with `continue-on-error`**

```typescript
const batch = new BatchRequestBuilder(client);

batch.addRequest("a1", "POST", "accounts", undefined, { name: "Account 1" });
batch.addRequest("bad", "POST", "accounts", undefined, { invalidfield: "value" }); // Will fail
batch.addRequest("a2", "POST", "accounts", undefined, { name: "Account 2" }); // Still executes

// continueOnError is a batch option (Prefer: odata.continue-on-error on the $batch request)
const result = await batch.execute({ continueOnError: true });
// result.errors.get("bad") is a typed DataverseODataError; nothing is thrown
```

## Real-World Scenarios

### Scenario 1: Import 500 Contacts from CSV

**Choose:** Bulk Operations (CreateMultiple)

**Why:** Single entity type, all creates, want simple API with ID array response

```typescript
import { readFile } from "node:fs/promises";
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";
import { parse } from "csv-parse/sync";

const csvData = await readFile("contacts.csv", "utf-8");
const records: Array<{ FirstName: string; LastName: string; Email: string }> = parse(csvData, {
  columns: true,
});

const contacts = records.map((row) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.contact",
  firstname: row.FirstName,
  lastname: row.LastName,
  emailaddress1: row.Email,
}));

const action = new CreateMultipleAction("contacts", { Targets: contacts });
const response = await client.execute(action);
console.log("Imported:", response.Ids.length, "contacts");
```

### Scenario 2: Create Account + 3 Contacts in Transaction

**Choose:** $batch with change set

**Why:** Cross-entity operations, need references, want transactional semantics

```typescript
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);

batch.beginChangeset();

// Create account
batch.addRequest("account", "POST", "accounts", undefined, {
  name: "Contoso Corporation",
  creditlimit: 100000,
});

// Create 3 contacts, all referencing the account
for (let i = 1; i <= 3; i++) {
  batch.addRequest(
    `contact${i}`,
    "POST",
    "contacts",
    undefined,
    {
      firstname: `Contact ${i}`,
      lastname: "Contoso",
      "parentcustomerid_account@odata.bind": "$account", // Reference account (Content-ID "account")
    },
    ["account"]
  );
}

batch.endChangeset();

await batch.execute();
// If any operation fails, entire change set rolls back and execute() throws DataverseBatchError
```

### Scenario 3: Update Credit Limits for 200 Accounts

**Choose:** Bulk Operations (UpdateMultiple)

**Why:** Single entity type, all updates, simple operation

```typescript
import { UpdateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

// accountIds: string[], the ids of the accounts to update
const accounts = accountIds.map((id) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  accountid: id,
  creditlimit: 75000,
}));

const action = new UpdateMultipleAction("accounts", { Targets: accounts });
await client.execute(action);
console.log("Updated", accounts.length, "accounts");
```

### Scenario 4: Daily Sync - Create New + Update Existing

**Choose:** Bulk Operations (UpsertMultiple)

**Why:** Single entity type, mix of creates/updates, simple API

```typescript
import { UpsertMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";
import { odataKey } from "@mohsinonxrm/dataverse-sdk-core";

// externalData: Array<{ sku: string; name: string; price: number }>, from the other system
const products = externalData.map((item) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.product",
  // An alternate key (here productnumber) names the record to create or update
  "@odata.id": `products(${odataKey({ productnumber: item.sku })})`,
  productnumber: item.sku,
  name: item.name,
  price: item.price,
}));

const action = new UpsertMultipleAction("products", { Targets: products });
await client.execute(action);
console.log("Synced", products.length, "products");
```

### Scenario 5: Retrieve Multiple Unrelated Records

**Choose:** $batch

**Why:** Multiple GETs, different entity types, reduce HTTP requests

```typescript
import { BatchRequestBuilder, type BatchResponseStep } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);

// No change set needed for read-only operations
batch.addRequest("account", "GET", `accounts(${accountId})`);
batch.addRequest("contacts", "GET", "contacts?$top=10");
batch.addRequest("opportunities", "GET", "opportunities?$filter=statecode eq 0");

const result = await batch.execute();

// Bodies are already parsed JSON, keyed by request id. They are `unknown`: name the type of the
// one you read.
type Page = BatchResponseStep<{ value: Array<Record<string, unknown>> }>;
const account = result.responses.get("account")?.body;
const contacts = (result.responses.get("contacts") as Page | undefined)?.body?.value;
const opportunities = (result.responses.get("opportunities") as Page | undefined)?.body?.value;
```

## Performance Considerations

### Bulk Operations

- **Throughput:** High (optimized for bulk inserts/updates)
- **Latency:** Low (single request/response)
- **Best for:** 100-1000 records of same type
- **Recommendation:** Use maximum batch size your table supports

### $batch

- **Throughput:** Good (reduces HTTP overhead)
- **Latency:** Moderate (multipart parsing overhead)
- **Best for:** Mixed operations, cross-entity scenarios
- **Recommendation:** Group operations logically, use change sets for transactions

## Error Handling

### Bulk Operations (Standard Tables)

```typescript
try {
  const action = new CreateMultipleAction("accounts", { Targets: accounts });
  const response = await client.execute(action);
  console.log("Created:", response.Ids);
} catch (error) {
  // All-or-nothing: if one fails, all fail
  console.error("Bulk create failed:", error);
}
```

### Bulk Operations (Elastic Tables with Partial Success)

```typescript
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";
import { DataverseError, Prefer } from "@mohsinonxrm/dataverse-sdk-core";

// An elastic table keeps the records that succeeded. Ask for the error details annotations, and
// the error body says which records failed.
const readings = [
  { "@odata.type": "Microsoft.Dynamics.CRM.contoso_sensordata", contoso_value: 21.5 },
];
try {
  await client.execute(new CreateMultipleAction("contoso_sensordatas", { Targets: readings }), {
    prefer: [Prefer.includeAnnotations("Microsoft.PowerApps.CDS.ErrorDetails.*")],
  });
} catch (error) {
  if (error instanceof DataverseError) {
    // The OData error, with Microsoft.PowerApps.CDS.ErrorDetails.* annotations per failed record
    console.error(error.status, error.body);
  }
}
```

`createMultiple()` and `updateMultiple()` in `@mohsinonxrm/dataverse-sdk-batch` ask for those
annotations and turn them into per-record results:

```typescript
import { createMultiple } from "@mohsinonxrm/dataverse-sdk-batch";

const result = await createMultiple(
  client,
  { logicalName: "contoso_sensordata", entitySetName: "contoso_sensordatas" },
  readings
);
for (const r of result.results) {
  if (r.status === "failed") console.error(`Reading ${r.index}:`, r.error?.message);
}
```

## Bulk helpers

`createMultiple()`, `updateMultiple()`, `upsertMultiple()` and `deleteMultiple()`
(`@mohsinonxrm/dataverse-sdk-batch`) split a long list of records into chunks (`batchSize`,
default 100), send each with `CreateMultiple` / `UpdateMultiple` / `UpsertMultiple` /
`DeleteMultiple`, or with `$batch` for a table without them (`strategy: "batch"`), and report
each record's id or error. `strategy: "auto"` picks between the two with
`getBulkOperationSupport()`, which reads the table's `sdkmessagefilters` once and caches the
answer; it is the default for `deleteMultiple()`, which sends `$batch` `DELETE`s for a standard
table (`DeleteMultiple` exists for elastic tables only). See the
[batch package README](../../packages/dataverse-sdk-batch/README.md#bulk-create-and-update).

### $batch with continue-on-error

```typescript
const batch = new BatchRequestBuilder(client);

batch.addRequest("a1", "POST", "accounts", undefined, { name: "Account 1" });
batch.addRequest("bad", "POST", "accounts", undefined, { invalidfield: "value" }); // Will fail but won't stop batch

const result = await batch.execute({ continueOnError: true });

for (const r of result.results) {
  if (r.status >= 400) {
    console.error(`Operation ${r.id} failed:`, result.errors.get(r.id)?.message);
  }
}
```

Without `continueOnError`, Dataverse stops at the first failure and `execute()` throws `DataverseBatchError`; `error.result` holds the responses received and `skippedRequestIds` the requests that never ran.

## Summary

**Default choice:** Start with **Bulk Operations** when working with a single entity type and operation type. They're simpler, faster, and require less code.

**Use $batch when:** You need the flexibility of mixed operations, cross-entity references, or complex transaction scenarios.

**Both are good:** There's no wrong choice for many scenarios. Choose based on your specific needs and code clarity preferences.
