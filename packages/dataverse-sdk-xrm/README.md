# @mohsinonxrm/dataverse-sdk-xrm

C#-familiar facade over the Dataverse Web API, providing OrganizationService-like operations.

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-xrm @mohsinonxrm/dataverse-sdk-core
```

## Quick Start

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  tokenProvider: yourTokenProvider,
});

const service = new OrganizationService(client);

// CRUD methods take the entity set name ("accounts"), not the logical name ("account").

// Create
const accountId = await service.create("accounts", {
  name: "Contoso Ltd",
  revenue: 5000000,
});

// Retrieve
const account = await service.retrieve("accounts", accountId, {
  select: ["name", "revenue", "createdon"],
});

// Update
await service.update("accounts", accountId, {
  revenue: 6000000,
});

// Delete
await service.delete("accounts", accountId);
```

Every method goes through the client's request builder (`client.api()`), so auth, retry and
throttling handling apply, and a failed request rejects with the core error types
(`DataverseError` and its subclasses, such as `DataverseDuplicateError` for a 412 from duplicate
detection).

## API Reference

### create

Creates a new entity record.

```typescript
async create<T = any>(
  entitySetName: string,
  entity: Record<string, unknown>,
  options?: CreateOptions
): Promise<string | T>
```

**Parameters:**

- `entitySetName` - The plural entity set name (e.g., 'accounts', 'contacts')
- `entity` - The entity data to create
- `options` - Optional creation settings

**Options:**

- `returnRepresentation?: boolean` - Return the created entity instead of just the ID (sends `Prefer: return=representation`)
- `select?: string[]` - Columns to return when using returnRepresentation
- `detectDuplicates?: boolean` - Run duplicate detection rules (sends `MSCRM.SuppressDuplicateDetection: false`); a duplicate rejects with `DataverseDuplicateError`
- `suppressDuplicateDetection?: boolean` - The Web API skips duplicate detection by default, so `true` changes nothing; `false` is the same as `detectDuplicates: true`
- `impersonateUserId?: string` - User ID to impersonate (sends `MSCRMCallerID`)
- `headers?: Record<string, string>` - Additional custom headers
- `signal?: AbortSignal` - Cancels the request; see [Cancellation](#cancellation)

**Returns:** Entity ID (GUID string, read from the `OData-EntityId` response header) by default, or the full entity if `returnRepresentation: true`

**Examples:**

```typescript
// Basic create - returns ID
const accountId = await service.create("accounts", {
  name: "Contoso Ltd",
  revenue: 5000000,
});

// Create with returnRepresentation - returns entity
const account = await service.create<Account>(
  "accounts",
  { name: "Contoso Ltd" },
  {
    returnRepresentation: true,
    select: ["accountid", "name", "createdon"],
  }
);

// Create with duplicate detection (off by default in the Web API)
const contactId = await service.create(
  "contacts",
  { firstname: "John", lastname: "Doe" },
  { detectDuplicates: true }
);

// Create with impersonation
const leadId = await service.create(
  "leads",
  { subject: "New Lead" },
  { impersonateUserId: "user-guid" }
);
```

---

### retrieve

Retrieves an entity record by ID.

```typescript
async retrieve<T = any>(
  entitySetName: string,
  id: string,
  options?: RetrieveOptions
): Promise<T>
```

**Parameters:**

- `entitySetName` - The plural entity set name
- `id` - The GUID of the record (with or without braces)
- `options` - Optional retrieval settings

**Options:**

- `select?: string[]` - Columns to return
- `expand?: string | ExpandOption[]` - Related entities to expand
- `impersonateUserId?: string` - User ID to impersonate
- `headers?: Record<string, string>` - Additional custom headers
- `signal?: AbortSignal` - Cancels the request; see [Cancellation](#cancellation)

**Examples:**

```typescript
// Basic retrieve
const account = await service.retrieve<Account>("accounts", accountId);

// Retrieve with select
const account = await service.retrieve("accounts", accountId, {
  select: ["name", "revenue", "createdon"],
});

// Retrieve with simple expand
const account = await service.retrieve("accounts", accountId, {
  select: ["name"],
  expand: "primarycontactid($select=fullname,emailaddress1)",
});

// Retrieve with complex expand
const account = await service.retrieve("accounts", accountId, {
  select: ["name"],
  expand: [
    {
      navigationProperty: "primarycontactid",
      select: ["fullname", "emailaddress1"],
    },
    {
      navigationProperty: "Account_Tasks",
      select: ["subject", "scheduledend"],
      filter: "statecode eq 0",
      orderBy: "createdon desc",
      top: 5,
    },
  ],
});

// GUID normalization - all these work:
await service.retrieve("accounts", "{12345678-1234-1234-1234-123456789012}");
await service.retrieve("accounts", "12345678-1234-1234-1234-123456789012");
await service.retrieve("accounts", "{12345678-1234-1234-1234-123456789012}".toUpperCase());
```

---

### update

Updates an existing entity record.

```typescript
async update<T = any>(
  entitySetName: string,
  id: string,
  entity: Record<string, unknown>,
  options?: UpdateOptions
): Promise<T | undefined>
```

Like the C# `Update`, this never creates a record. The PATCH carries `If-Match: *` (or
`If-Match: <etag>` when `etag` is set), so updating a record that doesn't exist rejects with a
404 instead of creating it. For an upsert, use `client.api(...).patch()`.

**Parameters:**

- `entitySetName` - The plural entity set name
- `id` - The GUID of the record to update
- `entity` - The entity data to update
- `options` - Optional update settings

**Options:**

- `etag?: string` - ETag for optimistic concurrency, sent as `If-Match` (default `*`); a stale ETag rejects with 412
- `returnRepresentation?: boolean` - Return the updated entity (sends `Prefer: return=representation`)
- `select?: string[]` - Columns to return when using returnRepresentation
- `detectDuplicates?: boolean` - Run duplicate detection rules
- `suppressDuplicateDetection?: boolean` - `false` is the same as `detectDuplicates: true`; `true` is the default
- `impersonateUserId?: string` - User ID to impersonate
- `headers?: Record<string, string>` - Additional custom headers
- `signal?: AbortSignal` - Cancels the request; see [Cancellation](#cancellation)

**Returns:** `void` by default, or the updated entity if `returnRepresentation: true`

**Examples:**

```typescript
// Basic update
await service.update("accounts", accountId, {
  revenue: 6000000,
  numberofemployees: 150,
});

// Update with optimistic concurrency
await service.update(
  "accounts",
  accountId,
  { revenue: 6000000 },
  { etag: account["@odata.etag"] } // rejects with 412 if the record changed since it was read
);

// Update with returnRepresentation
const updatedAccount = await service.update<Account>(
  "accounts",
  accountId,
  { revenue: 7000000 },
  {
    returnRepresentation: true,
    select: ["revenue", "modifiedon"],
  }
);

// Update with duplicate detection
await service.update(
  "contacts",
  contactId,
  { emailaddress1: "new@email.com" },
  { detectDuplicates: true }
);
```

---

### delete

Deletes an entity record.

```typescript
async delete(
  entitySetName: string,
  id: string,
  options?: DeleteOptions
): Promise<void>
```

**Parameters:**

- `entitySetName` - The plural entity set name
- `id` - The GUID of the record to delete
- `options` - Optional deletion settings

**Options:**

- `etag?: string` - ETag for optimistic concurrency
- `impersonateUserId?: string` - User ID to impersonate
- `headers?: Record<string, string>` - Additional custom headers
- `signal?: AbortSignal` - Cancels the request; see [Cancellation](#cancellation)

**Examples:**

```typescript
// Basic delete
await service.delete("accounts", accountId);

// Delete with optimistic concurrency
await service.delete("accounts", accountId, {
  etag: "*", // or specific ETag value
});

// Delete with impersonation
await service.delete("leads", leadId, {
  impersonateUserId: "user-guid",
});
```

---

### retrieveMultiple

Retrieves multiple entity records matching a query.

```typescript
async retrieveMultiple<T = any>(
  entitySetName: string,
  options?: RetrieveMultipleOptions
): Promise<RetrieveMultipleResult<T>>
```

**Parameters:**

- `entitySetName` - The plural entity set name
- `options` - Optional query settings

**Options:**

- `select?: string[]` - Columns to return
- `filter?: string` - OData filter expression
- `orderBy?: string | string[]` - Columns to sort by
- `top?: number` - Maximum number of records to return
- `skip?: number` - Number of records to skip
- `count?: boolean` - Include total count in response
- `expand?: string | ExpandOption[]` - Related entities to expand
- `impersonateUserId?: string` - User ID to impersonate
- `headers?: Record<string, string>` - Additional custom headers
- `signal?: AbortSignal` - Cancels the request; see [Cancellation](#cancellation)

**Returns:** one page, as `RetrieveMultipleResult<T>` with properties:

- `value: T[]` - Array of entity records
- `@odata.count?: number` - Total count (if `count: true`)
- `@odata.nextLink?: string` - URL for next page (if results are paginated); fetch it with `client.api(nextLink).get()`, or use `client.api(...).iterate()` to walk every page

**Examples:**

```typescript
// Basic query
const result = await service.retrieveMultiple("accounts");
console.log(result.value); // Array of account records

// With filter and select
const result = await service.retrieveMultiple("accounts", {
  filter: "revenue gt 1000000",
  select: ["name", "revenue", "industrycode"],
});

// With ordering and paging
const result = await service.retrieveMultiple("contacts", {
  select: ["fullname", "emailaddress1"],
  orderBy: ["createdon desc"],
  top: 50,
  count: true,
});
console.log(`Total: ${result["@odata.count"]}`);

// With expand
const result = await service.retrieveMultiple("opportunities", {
  select: ["name", "estimatedvalue"],
  expand: [
    {
      navigationProperty: "parentaccountid",
      select: ["name", "accountnumber"],
    },
  ],
  filter: "estimatedvalue gt 100000",
  orderBy: "estimatedvalue desc",
  top: 25,
});
```

---

### associate

Associates entities through a relationship.

```typescript
async associate(
  entitySetName: string,
  id: string,
  relationship: string,
  relatedEntities: EntityReference[],
  options?: AssociateOptions
): Promise<void>
```

**Parameters:**

- `entitySetName` - The plural entity set name
- `id` - The GUID of the primary record
- `relationship` - The collection-valued navigation property name
- `relatedEntities` - Array of `EntityReference`s (`{ logicalName, id }`, with the logical name such as `"contact"`) to associate; each is sent as one `POST …/$ref`. The entity set name comes from `getEntitySetName()`, or from the reference's `entitySetName` when set
- `options` - Optional association settings

**Options:**

- `impersonateUserId?: string` - User ID to impersonate
- `headers?: Record<string, string>` - Additional custom headers
- `signal?: AbortSignal` - Cancels the request; see [Cancellation](#cancellation)

**Examples:**

```typescript
// Associate a single contact to an account
await service.associate("accounts", accountId, "contact_customer_accounts", [
  { logicalName: "contact", id: contactId },
]);

// Associate multiple contacts
await service.associate("accounts", accountId, "contact_customer_accounts", [
  { logicalName: "contact", id: contactId1 },
  { logicalName: "contact", id: contactId2 },
  { logicalName: "contact", id: contactId3 },
]);

// Associate with impersonation
await service.associate(
  "opportunities",
  opportunityId,
  "opportunitycompetitors_association",
  [{ logicalName: "competitor", id: competitorId }],
  { impersonateUserId: "user-guid" }
);
```

---

### disassociate

Disassociates entities from a relationship.

```typescript
async disassociate(
  entitySetName: string,
  id: string,
  relationship: string,
  relatedId?: string,
  options?: DisassociateOptions
): Promise<void>
```

**Parameters:**

- `entitySetName` - The plural entity set name
- `id` - The GUID of the primary record
- `relationship` - The relationship schema name (navigation property)
- `relatedId` - (Optional) The GUID of the related record. Omit for single-valued navigation properties.
- `options` - Optional disassociation settings

**Options:**

- `impersonateUserId?: string` - User ID to impersonate
- `headers?: Record<string, string>` - Additional custom headers
- `signal?: AbortSignal` - Cancels the request; see [Cancellation](#cancellation)

**Examples:**

```typescript
// Disassociate from a collection-valued navigation (many-to-many)
await service.disassociate("accounts", accountId, "contact_customer_accounts", contactId);

// Disassociate from a single-valued navigation (lookup)
await service.disassociate("accounts", accountId, "primarycontactid");

// Disassociate with impersonation
await service.disassociate(
  "opportunities",
  opportunityId,
  "opportunitycompetitors_association",
  competitorId,
  { impersonateUserId: "user-guid" }
);
```

---

### execute

Executes a request implementing the `Executable<T>` interface.

Works with:

- Actions from `@mohsinonxrm/dataverse-sdk-actions`
- Functions from `@mohsinonxrm/dataverse-sdk-functions`
- Messages from `@mohsinonxrm/dataverse-sdk-messages`

```typescript
async execute<TResponse>(request: unknown, options?: OperationOptions): Promise<TResponse>
```

**Parameters:**

- `request` - Request object implementing `Executable<T>` with:
  - `toRequestInformation(baseUrl: string)` method
  - `parseResponse(response: Response)` method
- `options.signal` - Cancels the request; see [Cancellation](#cancellation)

**Returns:** Response object of type `TResponse`

**Throws:** Error if request doesn't implement `Executable<T>` interface

**Examples:**

```typescript
// Execute a function
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const whoAmI = await service.execute(new WhoAmIFunction());
console.log("User ID:", whoAmI.UserId);
console.log("Business Unit:", whoAmI.BusinessUnitId);
console.log("Organization:", whoAmI.OrganizationId);

// Execute an action: the constructor takes one object with the parameters, by their Web API names
import { WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";

const winRequest = new WinOpportunityAction({
  OpportunityClose: {
    subject: "Won!",
    "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
  },
  Status: 3,
});
await service.execute(winRequest);

// Execute a message: a bound one takes the record id first, then the parameters
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const workflowResponse = await service.execute(
  new ExecuteWorkflowRequest(workflowId, { EntityId: entityId, InputArguments: {} })
);
```

---

### whoAmI

Gets the current user information.

```typescript
async whoAmI(options?: OperationOptions): Promise<{
  UserId: string;
  BusinessUnitId: string;
  OrganizationId: string;
}>
```

**Parameters:**

- `options.signal` - Cancels the request; see [Cancellation](#cancellation)

**Returns:** Object containing:

- `UserId` - GUID of the current user
- `BusinessUnitId` - GUID of user's business unit
- `OrganizationId` - GUID of the organization

**Example:**

```typescript
const whoAmI = await service.whoAmI();
console.log("User ID:", whoAmI.UserId);
console.log("Business Unit:", whoAmI.BusinessUnitId);
console.log("Organization:", whoAmI.OrganizationId);
```

---

### getEntitySetName

Resolves a table's entity set name from its logical name.

```typescript
getEntitySetName(logicalName: string, options?: OperationOptions): Promise<string>
setEntitySetName(logicalName: string, entitySetName: string): void
```

Methods that take a logical name (`assign()`, `setState()` and the `EntityReference`s of
`associate()`) use this. Entity set names are not always the logical name plus "s"
(`opportunity` → `opportunities`, custom tables can use any name), so the service reads
`EntityDefinitions(LogicalName='…')?$select=EntitySetName` once per logical name and caches it.
An unknown table rejects with the 404 `DataverseError` instead of a guessed URL.

Concurrent calls for the same name share one lookup. Aborting one caller's `signal` rejects that
call only; the lookup request is cancelled once every caller waiting on it has aborted.

To skip the lookup, give the names up front, per call, or later:

```typescript
const service = new OrganizationService(client, {
  entitySetNames: { new_widget: "new_widgets" },
});
service.setEntitySetName("new_gadget", "new_gadgetry");

await service.associate("accounts", accountId, "new_account_widgets", [
  { logicalName: "new_widget", id: widgetId, entitySetName: "new_widgets" },
]);

await service.getEntitySetName("opportunity"); // "opportunities" (one metadata request, then cached)
```

---

### assign

Assigns a record to a user or team. Sends `If-Match: *`, so a missing record rejects with 404 instead of being created.

```typescript
async assign(
  entityName: string,
  recordId: string,
  assigneeId: string,
  assigneeType: 'systemuser' | 'team' = 'systemuser',
  options?: OperationOptions
): Promise<void>
```

**Parameters:**

- `entityName` - The logical name of the entity (e.g., 'account', 'lead'); its entity set name comes from `getEntitySetName()`
- `recordId` - The GUID of the record to assign
- `assigneeId` - The GUID of the user or team to assign to
- `assigneeType` - Type of assignee ('systemuser' or 'team'), defaults to 'systemuser'
- `options.signal` - Cancels the request and the entity set name lookups it needs; see [Cancellation](#cancellation)

**Examples:**

```typescript
// Assign account to a user
await service.assign("account", accountId, userId);

// Assign lead to a team
await service.assign("lead", leadId, teamId, "team");
```

---

### setState

Sets the state and status of a record. Sends `If-Match: *`, so a missing record rejects with 404 instead of being created.

```typescript
async setState(
  entityName: string,
  recordId: string,
  stateCode: number,
  statusCode: number,
  options?: OperationOptions
): Promise<void>
```

**Parameters:**

- `entityName` - The logical name of the entity; its entity set name comes from `getEntitySetName()`
- `recordId` - The GUID of the record
- `stateCode` - The state code (0 = Active, 1 = Inactive, etc.)
- `statusCode` - The status code (specific to entity and state)
- `options.signal` - Cancels the request and the entity set name lookup it needs; see [Cancellation](#cancellation)

**Examples:**

```typescript
// Deactivate an account
await service.setState("account", accountId, 1, 2);

// Activate a contact
await service.setState("contact", contactId, 0, 1);

// Cancel an opportunity
await service.setState("opportunity", opportunityId, 2, 5);
```

---

## Types

### EntityReference

Represents a reference to an entity record.

```typescript
interface EntityReference {
  logicalName: string; // e.g. "contact"
  id: string;
  name?: string;
  entitySetName?: string; // e.g. "contacts"; resolved from logicalName when omitted
}
```

### OperationOptions

What every method takes. The options of `create()`, `retrieve()`, `update()`, `delete()`,
`retrieveMultiple()`, `associate()` and `disassociate()` extend it; `execute()`, `whoAmI()`,
`getEntitySetName()`, `assign()` and `setState()` take it as their last argument.

```typescript
interface OperationOptions {
  signal?: AbortSignal; // cancels the request; see Cancellation
}
```

### OrganizationServiceOptions

```typescript
interface OrganizationServiceOptions {
  entitySetNames?: Record<string, string>; // logical name → entity set name, no lookup needed
}
```

### ExpandOption

Detailed expand configuration for retrieve operations. A list of them becomes one `$expand`,
e.g. `primarycontactid($select=fullname),Account_Tasks($select=subject;$top=5)`.

```typescript
interface ExpandOption {
  navigationProperty: string; // The navigation property name
  select?: string[]; // Columns to select from expanded entity
  filter?: string; // Filter for expanded entity
  orderBy?: string; // OrderBy for expanded entity
  top?: number; // Limit results from expanded entity
}
```

---

## Advanced Features

### Optimistic Concurrency

Prevent concurrent update conflicts using ETags:

```typescript
// Every retrieved record carries its ETag
const account = await service.retrieve("accounts", accountId, { select: ["revenue"] });
const etag = account["@odata.etag"];

// Update with ETag check
try {
  await service.update("accounts", accountId, { revenue: account.revenue + 100000 }, { etag });
} catch (error) {
  // 412 Precondition Failed: the record was modified since it was read
  console.error("Record was modified by another user");
}

// Without an etag, update() sends If-Match: * (the record must exist; no version check)
await service.update("accounts", accountId, { revenue: 7000000 });
```

### Impersonation

Perform operations on behalf of another user:

```typescript
const targetUserId = "12345678-1234-1234-1234-123456789012";

await service.create("accounts", { name: "Contoso" }, { impersonateUserId: targetUserId });

await service.update(
  "accounts",
  accountId,
  { revenue: 5000000 },
  { impersonateUserId: targetUserId }
);

await service.delete("accounts", accountId, {
  impersonateUserId: targetUserId,
});
```

### Duplicate Detection

The Web API skips duplicate detection rules unless a request asks for them. Turn them on per
request with `detectDuplicates`; a duplicate rejects with `DataverseDuplicateError` (412):

```typescript
import { DataverseDuplicateError } from "@mohsinonxrm/dataverse-sdk-core";

try {
  await service.create(
    "contacts",
    {
      firstname: "John",
      lastname: "Doe",
      emailaddress1: "john.doe@contoso.com",
    },
    { detectDuplicates: true }
  );
} catch (error) {
  if (error instanceof DataverseDuplicateError) {
    console.warn("A matching contact already exists");
  } else {
    throw error;
  }
}
```

### Cancellation

Every method takes an `AbortSignal`: in its options object, or as its last argument for
`execute()`, `whoAmI()`, `getEntitySetName()`, `assign()` and `setState()`. Aborting it cancels
the request in flight (and the requests the method hasn't sent yet), and the call rejects with
`DataverseAbortError`, whose `name` is `"AbortError"`. A signal that is already aborted rejects
without sending anything.

```typescript
import { DataverseAbortError } from "@mohsinonxrm/dataverse-sdk-core";

const controller = new AbortController();
// e.g. cancel when the user leaves the page
window.addEventListener("pagehide", () => controller.abort());

try {
  const page = await service.retrieveMultiple("accounts", {
    select: ["name"],
    signal: controller.signal,
  });
  // Methods without an options object take it as their last argument
  await service.assign("account", accountId, userId, "systemuser", { signal: controller.signal });
} catch (error) {
  if (!(error instanceof DataverseAbortError)) throw error; // cancelled: nothing to report
}
```

### GUID Normalization

IDs are automatically normalized (braces removed, lowercased):

```typescript
// All these are equivalent:
await service.retrieve("accounts", "{12345678-1234-1234-1234-123456789012}");
await service.retrieve("accounts", "12345678-1234-1234-1234-123456789012");
await service.retrieve("accounts", "{12345678-1234-1234-1234-123456789012}".toUpperCase());
```

---

## Relationship to DataverseClient

`OrganizationService` wraps the core `DataverseClient` and translates C#-familiar method names to HTTP operations:

| OrganizationService Method | HTTP Method | URL Pattern                                              |
| -------------------------- | ----------- | -------------------------------------------------------- |
| `create()`                 | POST        | `/{entitySetName}`                                       |
| `retrieve()`               | GET         | `/{entitySetName}({id})`                                 |
| `update()`                 | PATCH       | `/{entitySetName}({id})` with `If-Match`                 |
| `delete()`                 | DELETE      | `/{entitySetName}({id})`                                 |
| `retrieveMultiple()`       | GET         | `/{entitySetName}?query`                                 |
| `associate()`              | POST        | `/{entitySetName}({id})/{relationship}/$ref`             |
| `disassociate()`           | DELETE      | `/{entitySetName}({id})/{relationship}(relatedId?)/$ref` |
| `whoAmI()`                 | GET         | `/WhoAmI` (function)                                     |
| `assign()`                 | PATCH       | `/{entitySetName}({id})` with ownerid                    |
| `setState()`               | PATCH       | `/{entitySetName}({id})` with statecode/statuscode       |
| `execute()`                | Varies      | Calls `client.execute(request)`                          |

You can use `OrganizationService` for convenience or use `DataverseClient` directly for more control:

```typescript
// Using OrganizationService (C#-familiar)
const id = await service.create("accounts", { name: "Contoso" });

// Using DataverseClient directly (HTTP-first)
const id = await client.api("/accounts").createAndGetId({ name: "Contoso" });
```

---

## License

GNU AGPL v3.0
