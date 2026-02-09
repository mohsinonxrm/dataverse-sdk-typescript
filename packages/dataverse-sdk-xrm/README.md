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

## API Reference

### create

Creates a new entity record.

```typescript
async create<T = unknown>(
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

- `returnRepresentation?: boolean` - Return the created entity instead of just the ID
- `select?: string[]` - Columns to return when using returnRepresentation
- `suppressDuplicateDetection?: boolean` - Bypass duplicate detection rules
- `impersonateUserId?: string` - User ID to impersonate
- `headers?: Record<string, string>` - Additional custom headers

**Returns:** Entity ID (GUID string) by default, or the full entity if `returnRepresentation: true`

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

// Create with duplicate detection suppression
const contactId = await service.create(
  "contacts",
  { firstname: "John", lastname: "Doe" },
  { suppressDuplicateDetection: true }
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
async retrieve<T = unknown>(
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
async update<T = unknown>(
  entitySetName: string,
  id: string,
  entity: Record<string, unknown>,
  options?: UpdateOptions
): Promise<T | void>
```

**Parameters:**

- `entitySetName` - The plural entity set name
- `id` - The GUID of the record to update
- `entity` - The entity data to update
- `options` - Optional update settings

**Options:**

- `etag?: string` - ETag for optimistic concurrency
- `returnRepresentation?: boolean` - Return the updated entity
- `select?: string[]` - Columns to return when using returnRepresentation
- `suppressDuplicateDetection?: boolean` - Bypass duplicate detection rules
- `impersonateUserId?: string` - User ID to impersonate
- `headers?: Record<string, string>` - Additional custom headers

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
  { etag: "*" } // or specific ETag value
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

// Update with duplicate detection suppression
await service.update(
  "contacts",
  contactId,
  { emailaddress1: "new@email.com" },
  { suppressDuplicateDetection: true }
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

**Returns:** `RetrieveMultipleResult<T>` with properties:

- `value: T[]` - Array of entity records
- `@odata.count?: number` - Total count (if `count: true`)
- `@odata.nextLink?: string` - URL for next page (if results are paginated)

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
- `relationship` - The relationship schema name (navigation property)
- `relatedEntities` - Array of entities to associate
- `options` - Optional association settings

**Options:**

- `impersonateUserId?: string` - User ID to impersonate
- `headers?: Record<string, string>` - Additional custom headers

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
async execute<TRequest, TResponse>(
  request: TRequest
): Promise<TResponse>
```

**Parameters:**

- `request` - Request object implementing `Executable<T>` with:
  - `toRequestInformation(baseUrl: string)` method
  - `parseResponse(response: Response)` method

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

// Execute an action
import { WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";

const request = new WinOpportunityAction({
  OpportunityClose: {
    "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
    subject: "Won!",
    "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
  },
  Status: -1, // Won
});
const response = await service.execute(request);

// Execute a message (when available)
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new ExecuteWorkflowRequest(workflowId, entityId);
const response = await service.execute(request);
console.log("Async Operation ID:", response.asyncOperationId);
```

---

### whoAmI

Gets the current user information.

```typescript
async whoAmI(): Promise<{
  UserId: string;
  BusinessUnitId: string;
  OrganizationId: string;
}>
```

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

### assign

Assigns a record to a user or team.

```typescript
async assign(
  entityName: string,
  recordId: string,
  assigneeId: string,
  assigneeType: 'systemuser' | 'team' = 'systemuser'
): Promise<void>
```

**Parameters:**

- `entityName` - The logical name of the entity (e.g., 'account', 'lead')
- `recordId` - The GUID of the record to assign
- `assigneeId` - The GUID of the user or team to assign to
- `assigneeType` - Type of assignee ('systemuser' or 'team'), defaults to 'systemuser'

**Examples:**

```typescript
// Assign account to a user
await service.assign("account", accountId, userId);

// Assign lead to a team
await service.assign("lead", leadId, teamId, "team");
```

---

### setState

Sets the state and status of a record.

```typescript
async setState(
  entityName: string,
  recordId: string,
  stateCode: number,
  statusCode: number
): Promise<void>
```

**Parameters:**

- `entityName` - The logical name of the entity
- `recordId` - The GUID of the record
- `stateCode` - The state code (0 = Active, 1 = Inactive, etc.)
- `statusCode` - The status code (specific to entity and state)

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
  logicalName: string;
  id: string;
  name?: string;
}
```

### ExpandOption

Detailed expand configuration for retrieve operations.

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
// Retrieve with ETag
const response = await client
  .api(`/accounts(${accountId})`)
  .header("Prefer", "return=representation")
  .get();

const etag = response.headers.get("ETag");
const account = await response.json();

// Update with ETag check
try {
  await service.update("accounts", accountId, { revenue: account.revenue + 100000 }, { etag });
} catch (error) {
  // Handle 412 Precondition Failed if record was modified
  console.error("Record was modified by another user");
}

// Use wildcard to require record exists but skip version check
await service.update("accounts", accountId, { revenue: 7000000 }, { etag: "*" });
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

Bypass duplicate detection rules when needed:

```typescript
await service.create(
  "contacts",
  {
    firstname: "John",
    lastname: "Doe",
    emailaddress1: "john.doe@contoso.com",
  },
  { suppressDuplicateDetection: true }
);
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
| `update()`                 | PATCH       | `/{entitySetName}({id})`                                 |
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
const response = await client.api("/accounts").post({ name: "Contoso" });
const id = extractIdFromHeader(response.headers.get("OData-EntityId"));
```

---

## License

GNU AGPL v3.0
