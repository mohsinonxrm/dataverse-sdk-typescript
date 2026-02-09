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

const action = new CreateMultipleAction("accounts", accounts);
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

// Create account
batch.addRequest(client.api("accounts").post({ name: "Contoso" }));

// Update contact
batch.addRequest(client.api("contacts(contact-id)").patch({ firstname: "John" }));

// Delete opportunity
batch.addRequest(client.api("opportunities(opp-id)").delete());

const results = await batch.execute();
```

✅ **Cross-entity operations with references**

```typescript
const batch = new BatchRequestBuilder(client);

batch.beginChangeset();

// Create account (Content-ID: 1)
batch.addRequest(client.api("accounts").post({ name: "Contoso" }));

// Create contact referencing the account
batch.addRequest(
  client.api("contacts").post({
    firstname: "John",
    "parentcustomerid_account@odata.bind": "$1", // References Content-ID 1
  })
);

batch.endChangeset();

await batch.execute();
```

✅ **Need transactional semantics across different entities**

✅ **Want to bundle unrelated operations to reduce HTTP requests**

```typescript
const batch = new BatchRequestBuilder(client);

// Retrieve multiple unrelated records in one request
batch.addRequest(client.api("accounts(account-id)").get());
batch.addRequest(client.api("contacts(contact-id)").get());
batch.addRequest(client.api("opportunities").top(5).get());

const results = await batch.execute();
```

✅ **Need partial success with `continue-on-error`**

```typescript
const batch = new BatchRequestBuilder(client);

// Some operations may fail, but continue processing others
batch.addRequest(
  client.api("accounts").prefer(["odata.continue-on-error"]).post({ name: "Account 1" })
);

batch.addRequest(
  client.api("accounts").post({ invalidfield: "value" }) // Will fail
);

batch.addRequest(
  client.api("accounts").post({ name: "Account 2" }) // Still executes
);

const results = await batch.execute();
// Check results.errors for per-operation failures
```

## Real-World Scenarios

### Scenario 1: Import 500 Contacts from CSV

**Choose:** Bulk Operations (CreateMultiple)

**Why:** Single entity type, all creates, want simple API with ID array response

```typescript
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";
import { parse } from "csv-parse/sync";

const csvData = await fs.readFile("contacts.csv", "utf-8");
const records = parse(csvData, { columns: true });

const contacts = records.map((row) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.contact",
  firstname: row.FirstName,
  lastname: row.LastName,
  emailaddress1: row.Email,
}));

const action = new CreateMultipleAction("contacts", contacts);
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
batch.addRequest(
  client.api("accounts").post({
    name: "Contoso Corporation",
    creditlimit: 100000,
  })
);

// Create 3 contacts, all referencing the account
for (let i = 1; i <= 3; i++) {
  batch.addRequest(
    client.api("contacts").post({
      firstname: `Contact ${i}`,
      lastname: "Contoso",
      "parentcustomerid_account@odata.bind": "$1", // Reference account (Content-ID 1)
    })
  );
}

batch.endChangeset();

await batch.execute();
// If any operation fails, entire change set rolls back
```

### Scenario 3: Update Credit Limits for 200 Accounts

**Choose:** Bulk Operations (UpdateMultiple)

**Why:** Single entity type, all updates, simple operation

```typescript
import { UpdateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const accounts = accountIds.map((id) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  accountid: id,
  creditlimit: 75000,
}));

const action = new UpdateMultipleAction("accounts", accounts);
await client.execute(action);
console.log("Updated", accounts.length, "accounts");
```

### Scenario 4: Daily Sync - Create New + Update Existing

**Choose:** Bulk Operations (UpsertMultiple)

**Why:** Single entity type, mix of creates/updates, simple API

```typescript
import { UpsertMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const products = externalData.map((item) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.product",
  productnumber: item.sku, // Alternate key
  name: item.name,
  price: item.price,
}));

const action = new UpsertMultipleAction("products", products);
await client.execute(action);
console.log("Synced", products.length, "products");
```

### Scenario 5: Retrieve Multiple Unrelated Records

**Choose:** $batch

**Why:** Multiple GETs, different entity types, reduce HTTP requests

```typescript
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);

// No change set needed for read-only operations
batch.addRequest(client.api("accounts(account-id)").get());
batch.addRequest(client.api("contacts").top(10).get());
batch.addRequest(client.api("opportunities").filter("statecode eq 0").get());

const results = await batch.execute();

const account = await results[0].json();
const contacts = await results[1].json();
const opportunities = await results[2].json();
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
  const action = new CreateMultipleAction("accounts", accounts);
  const response = await client.execute(action);
  console.log("Created:", response.Ids);
} catch (error) {
  // All-or-nothing: if one fails, all fail
  console.error("Bulk create failed:", error);
}
```

### Bulk Operations (Elastic Tables with Partial Success)

```typescript
const action = new CreateMultipleAction("accounts", accounts);
const response = await client.execute(action, {
  prefer: ["odata.include-annotations=Microsoft.PowerApps.CDS.ErrorDetails.*"],
});

// Check for per-entity errors in annotations
// Partial success possible with elastic tables
```

### $batch with continue-on-error

```typescript
const batch = new BatchRequestBuilder(client);

batch.addRequest(
  client.api("accounts").prefer(["odata.continue-on-error"]).post({ name: "Account 1" })
);

batch.addRequest(
  client.api("accounts").post({ invalidfield: "value" }) // Will fail but won't stop batch
);

const results = await batch.execute();

results.forEach((result, index) => {
  if (!result.ok) {
    console.error(`Operation ${index} failed:`, result.statusText);
  }
});
```

## Summary

**Default choice:** Start with **Bulk Operations** when working with a single entity type and operation type. They're simpler, faster, and require less code.

**Use $batch when:** You need the flexibility of mixed operations, cross-entity references, or complex transaction scenarios.

**Both are good:** There's no wrong choice for many scenarios. Choose based on your specific needs and code clarity preferences.
