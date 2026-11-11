# Getting Started with Dataverse SDK for TypeScript

This guide will walk you through setting up and using the Dataverse SDK for TypeScript in your applications.

It follows the SDK's main path: a `DataverseClient`, `client.api()` for queries and CRUD, typed
action and function classes run with `client.execute()`, and types generated for your org with
`dataverse-gen`. If you are porting code from the .NET SDK, the `OrganizationService` and message
classes keep the .NET names; see [Coming from the .NET SDK](#coming-from-the-net-sdk).

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Authentication](#authentication)
4. [Basic CRUD Operations](#basic-crud-operations)
5. [Advanced Queries](#advanced-queries)
6. [Typed Actions and Functions](#typed-actions-and-functions)
7. [Generate the rest with dataverse-gen](#generate-the-rest-with-dataverse-gen)
8. [Batch and Bulk Operations](#batch-and-bulk-operations)
9. [File Operations](#file-operations)
10. [Change Tracking and System Jobs](#change-tracking-and-system-jobs)
11. [Coming from the .NET SDK](#coming-from-the-net-sdk)
12. [Next Steps](#next-steps)

## Prerequisites

- **Node.js**: Version 22 or higher (or a modern browser)
- **Package Manager**: pnpm, npm, or yarn
- **Dataverse Environment**: Access to a Microsoft Dataverse organization
- **Azure AD App Registration**: For authentication (see [Authentication Setup](#authentication-setup))

## Installation

### Core Package + Authentication

```bash
# Using pnpm (recommended)
pnpm add @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-node @azure/msal-node

# Using npm
npm install @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-node @azure/msal-node

# Using yarn
yarn add @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-node @azure/msal-node
```

### Optional Packages

```bash
# Typed actions and functions (WinOpportunity, WhoAmI, ...)
pnpm add @mohsinonxrm/dataverse-sdk-actions @mohsinonxrm/dataverse-sdk-functions

# Types for your tables, the typed client, custom APIs (dataverse-gen)
pnpm add -D @mohsinonxrm/dataverse-sdk-generator
pnpm add @mohsinonxrm/dataverse-sdk-entities-runtime

# $batch and the bulk create/update helpers
pnpm add @mohsinonxrm/dataverse-sdk-batch

# File and image columns
pnpm add @mohsinonxrm/dataverse-sdk-files

# Tables, columns, relationships and choices
pnpm add @mohsinonxrm/dataverse-sdk-metadata

# .NET compatibility layer: OrganizationService and the *Request messages
pnpm add @mohsinonxrm/dataverse-sdk-xrm @mohsinonxrm/dataverse-sdk-messages
```

The [root README](../README.md#-which-package-do-i-need) has a table of which package does what.

## Authentication

### Authentication Setup

1. **Register an Azure AD Application**:
   - Go to [Azure Portal](https://portal.azure.com/) → Azure Active Directory → App registrations
   - Click "New registration"
   - Set redirect URI (e.g., `http://localhost` for device code flow)
   - Note the Application (client) ID and Directory (tenant) ID

2. **Configure API Permissions** (apps where a user signs in):
   - Add the Dynamics CRM API permission
   - Grant the `user_impersonation` delegated permission

3. **Create Client Secret** (for daemon apps):
   - Certificates & secrets → New client secret
   - Note the secret value immediately

4. **Create an Application User** (for daemon apps):
   - App-only access isn't granted by an API permission: Dynamics CRM has no application
     permissions. Instead, in the [Power Platform admin center](https://admin.powerplatform.microsoft.com),
     open the environment → Settings → Users + permissions → Application users → **New app user**,
     pick the app registration and give it a security role

### Device Code Flow (CLI Applications)

Perfect for interactive command-line tools:

```typescript
import { PublicClientApplication } from "@azure/msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

// MSAL public client application
const pca = new PublicClientApplication({
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
  },
});

// Token provider using device code flow
const tokenProvider = new MsalNodeTokenProvider(pca, {
  flow: "deviceCode",
  scopes: ["https://YOUR_ORG.crm.dynamics.com/.default"],
  deviceCodeCallback: (response) => console.log(response.message),
});

// Create Dataverse client
const client = new DataverseClient({
  baseUrl: "https://YOUR_ORG.crm.dynamics.com/api/data/v9.2",
  tokenProvider,
});

// Ready to use!
```

### Client Credentials Flow (Daemon Applications)

For background services and automation:

<!-- live -->

```typescript
import { ConfidentialClientApplication } from "@azure/msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

const cca = new ConfidentialClientApplication({
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
    clientSecret: process.env.CLIENT_SECRET!, // never hard-code the secret
  },
});

const tokenProvider = new MsalNodeTokenProvider(cca, {
  flow: "clientCredentials",
  scopes: ["https://YOUR_ORG.crm.dynamics.com/.default"],
});

const client = new DataverseClient({
  baseUrl: "https://YOUR_ORG.crm.dynamics.com/api/data/v9.2",
  tokenProvider,
});
```

### Browser Authentication (SPA)

```typescript
import { PublicClientApplication } from "@azure/msal-browser";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalBrowserTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";

// The provider takes an initialized PublicClientApplication, not an MSAL config
const pca = new PublicClientApplication({
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
    redirectUri: window.location.origin,
  },
});
await pca.initialize();

const tokenProvider = new MsalBrowserTokenProvider(pca, {
  scopes: ["https://YOUR_ORG.crm.dynamics.com/user_impersonation"],
});

const client = new DataverseClient({
  baseUrl: "https://YOUR_ORG.crm.dynamics.com/api/data/v9.2",
  tokenProvider,
});
```

## Basic CRUD Operations

### Create a Record

<!-- live -->

```typescript
const account = {
  name: "Contoso Inc",
  revenue: 5000000,
  industrycode: 1, // Manufacturing
  address1_city: "Redmond",
  address1_stateorprovince: "WA",
};

// Dataverse answers a create with 204 No Content and the new record's URL in OData-EntityId
const accountId = await client.api("/accounts").createAndGetId(account);

console.log("Created account:", accountId);
```

### Create with Return Representation

<!-- live -->

```typescript
import { Prefer } from "@mohsinonxrm/dataverse-sdk-core";

const account = {
  name: "Contoso Inc",
  revenue: 5000000,
};

const newAccount = await client
  .api("/accounts")
  .prefer(Prefer.returnRepresentation()) // or .header("Prefer", "return=representation")
  .post<{ accountid: string; name: string }>(account);

console.log("Created account ID:", newAccount.accountid);
console.log("Created account name:", newAccount.name);
```

### Retrieve a Record

<!-- live -->

```typescript
// Get by ID: accountId is the id createAndGetId() returned above
const account = await client
  .api(`/accounts(${accountId})`)
  .select("name", "revenue", "industrycode")
  .get<{ "@odata.etag": string; name: string; revenue: number; industrycode: number }>();

console.log("Account name:", account.name);
console.log("Revenue:", account.revenue);
```

### Update a Record

<!-- live -->

```typescript
await client.api(`/accounts(${accountId})`).patch({
  revenue: 6000000,
  numberofemployees: 150,
});

console.log("Account updated successfully");
```

### Update with Optimistic Concurrency

<!-- live -->

```typescript
// Read the record's ETag (every retrieved record has @odata.etag)
const { "@odata.etag": etag } = await client
  .api(`/accounts(${accountId})`)
  .select("revenue")
  .get<{ "@odata.etag": string; revenue: number }>();

// .ifMatch(etag) sets the If-Match header; a 412 means the record changed since you read it
await client.api(`/accounts(${accountId})`).ifMatch(etag).patch({
  revenue: 6000000,
});
```

### Delete a Record

<!-- live -->

```typescript
await client.api(`/accounts(${accountId})`).delete();

console.log("Account deleted successfully");
```

## Advanced Queries

### Filter, Sort, and Paginate

<!-- live -->

```typescript
const accounts = await client
  .api("/accounts")
  .select("name", "revenue", "createdon")
  .filter("revenue gt 100000")
  .orderBy("revenue desc")
  .top(10)
  .get<{ value: { name: string; revenue: number; createdon: string }[] }>();

console.log(`Found ${accounts.value.length} accounts`);
accounts.value.forEach((account) => {
  console.log(`${account.name}: $${account.revenue}`);
});
```

### Expand Related Records

<!-- live -->

```typescript
// expand() takes strings: write nested query options inline, in OData syntax
const account = await client
  .api(`/accounts(${accountId})`)
  .select("name", "revenue")
  .expand(
    "primarycontactid($select=fullname,emailaddress1)",
    "Account_Tasks($select=subject,scheduledend;$filter=statecode eq 0;$top=5)" // Active tasks
  )
  .get<{
    name: string;
    primarycontactid?: { fullname: string };
    Account_Tasks: { subject: string }[];
  }>();

console.log("Account:", account.name);
console.log("Primary Contact:", account.primarycontactid?.fullname);
console.log("Active Tasks:", account.Account_Tasks.length);
```

### Iterate Through All Pages

<!-- live -->

```typescript
// Iterate through all records (handles paging automatically)
const allAccounts = [];

for await (const account of client.api("/accounts").select("name").iterate()) {
  allAccounts.push(account);

  // Optional: early termination
  if (allAccounts.length >= 1000) break;
}

console.log(`Total accounts: ${allAccounts.length}`);
```

### Get All with Limits

<!-- live -->

```typescript
const accounts = await client
  .api("/accounts")
  .select("name", "revenue")
  .filter("revenue gt 50000")
  .getAll({ maxItems: 500, maxPages: 10 });

console.log(`Retrieved ${accounts.length} accounts`);
```

### Advanced Filtering

<!-- live -->

```typescript
// Complex filter
const accounts = await client
  .api("/accounts")
  .filter("(revenue gt 100000 and industrycode eq 1) or (numberofemployees gt 500)")
  .get();

// Filter with dates
const recentOpportunities = await client
  .api("/opportunities")
  .filter("createdon gt 2024-01-01T00:00:00Z")
  .get();

// Filter with contains
const contosoAccounts = await client.api("/accounts").filter("contains(name, 'Contoso')").get();
```

### Query functions

Dataverse's query functions (`LastXDays`, `InFiscalYear`, `In`, `Under`, `EqualUserId`, …) work
only inside `$filter`. `queryFunctions` in `@mohsinonxrm/dataverse-sdk-functions` writes them, with
the values escaped, and `odata` from core combines them with other conditions:

<!-- live -->

```typescript
import { odata } from "@mohsinonxrm/dataverse-sdk-core";
import { queryFunctions } from "@mohsinonxrm/dataverse-sdk-functions";

const myRecentAccounts = await client
  .api("/accounts")
  .filter(
    odata.and(
      queryFunctions.lastXDays({ PropertyName: "createdon", PropertyValue: 30 }),
      queryFunctions.equalUserId({ PropertyName: "ownerid" }),
      odata.eq("statecode", 0)
    )
  )
  .get();
```

See [Query functions in `$filter`](../packages/dataverse-sdk-functions/README.md#query-functions-in-filter)
for the list.

## Typed Actions and Functions

Dataverse's named operations are Web API **actions** (`POST`, with side effects: `WinOpportunity`,
`ExportSolution`, `CreateMultiple`, …) and **functions** (`GET`: `WhoAmI`,
`RetrieveTotalRecordCount`, …). `@mohsinonxrm/dataverse-sdk-actions` and
`@mohsinonxrm/dataverse-sdk-functions` have a typed class for each one; `client.execute()` sends
it and resolves its typed result. Parameters go in one object, by their Web API names, and a bound
operation takes its record id (or entity set) first.

<!-- live -->

```typescript
import { QualifyLeadAction, WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

// Unbound function: no parameters
const { UserId, BusinessUnitId } = await client.execute(new WhoAmIFunction());

// Unbound action: an entity parameter takes the record's columns and its @odata.type
await client.execute(
  new WinOpportunityAction({
    OpportunityClose: {
      "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
      "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
      subject: "Won the deal",
    },
    Status: 3,
  })
);

// Bound action: the lead's id first; it resolves the records it created
const created = await client.execute(
  new QualifyLeadAction(leadId, {
    CreateAccount: true,
    CreateContact: true,
    CreateOpportunity: false,
    Status: 3,
  })
);
console.log(UserId, BusinessUnitId, created.length);
```

The packages are prebuilt: a typed class for each Web API operation of

- the **platform**: Dataverse and the Power Platform solutions every environment has
  (`WhoAmI`, `CreateMultiple`, `ExportSolution`, `RetrieveMetadataChanges`, …, and the query
  functions such as `LastXDays` as [`$filter` helpers](#query-functions));
- **Sales**: opportunities, quotes, orders, invoices, leads, campaigns and marketing lists, with
  Sales Insights, Copilot in Sales and the sales agents (`WinOpportunity`, `QualifyLead`,
  `ConvertQuoteToSalesOrder`, …);
- **Customer Service**: cases, knowledge, SLAs and entitlements, with Copilot in Customer
  Service (`CloseIncident`, `RenewEntitlement`, …).

They are chosen by the solution each operation comes from; the
[solution table](../tools/generate-sdk-types/metadata/README.md#which-operations-are-prebuilt)
lists every solution and whether its operations are in. The packages don't have the operations of
Contact Center (Omnichannel, unified routing, voice: `CCaaS_*`), Field Service, Project
Operations, Universal Resource Scheduling, Customer Insights - Journeys (`msdynmkt_*`), Customer
Voice, Connected Customer Service (IoT), Power Pages or Process Mining, nor your own custom APIs.
Generate those from your org, as below.

The [actions](../packages/dataverse-sdk-actions/README.md) and
[functions](../packages/dataverse-sdk-functions/README.md) READMEs describe the return values,
entity and enum parameters, and the operations each package lists.

## Generate the rest with dataverse-gen

`dataverse-gen` (`@mohsinonxrm/dataverse-sdk-generator`) reads your org's `$metadata` and writes
types for your tables, a typed client, and typed classes for the operations you name: another
app's, or your own custom APIs and custom process actions. They implement the same `Executable` interface as the prebuilt classes, so
`client.execute()` runs them the same way and resolves the same return values.

```bash
pnpm add -D @mohsinonxrm/dataverse-sdk-generator
pnpm add @mohsinonxrm/dataverse-sdk-entities-runtime @mohsinonxrm/dataverse-sdk-core
```

The generated files are ES modules: your project's `package.json` needs `"type": "module"` (or a
bundler).

### Your tables and the typed client

List your tables in `entities` and set `"typedClient": true`:

```json
{
  "environmentUrl": "https://yourorg.crm.dynamics.com",
  "entities": ["account", "contact"],
  "actions": [],
  "functions": [],
  "typedClient": true,
  "output": { "outputRoot": "./src/generated" },
  "auth": { "flow": "clientCredentials" }
}
```

That writes an interface per table (`Account`), the columns a create and an update accept
(`AccountCreate`, `AccountUpdate`), the choices as enums, the tables' metadata, and
`createTypedClient()`: a request builder per table, keyed by entity set name, whose columns and
payloads are checked against the table.

<!-- live -->

```typescript
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { createTypedClient } from "./generated/client.js";

const typed = createTypedClient(client);

const accountId = await typed.accounts.create({
  name: "Contoso",
  primarycontactid: createEntityReference("contact", contactId), // sent as @odata.bind
});
const account = await typed.accounts.byId(accountId).get({ select: ["name", "creditlimit"] });
await typed.accounts.byId(accountId).update({ creditlimit: 25000 }); // If-Match: *
const contacts = await typed.contacts.list({ select: ["fullname"], top: 10 });

// typed.accounts.byId(accountId).get({ select: ["nmae"] }) doesn't compile: not a column
console.log(account.name, contacts.length);
```

`typed.accounts.query()` returns core's request builder for anything else (`$apply`, `$count`,
FetchXML). The [generator README](../packages/dataverse-sdk-generator/README.md#typed-client) has
the details, and the options for validation rules, form contexts and incremental generation.

### An excluded app's operations

For example the Universal Resource Scheduling action `msdyn_BookRequirementGroup` and the Contact
Center function `CCaaS_GetAgents`. Name them in `.dataverse-gen.json`, with the table of a bound
operation in `entities` (an empty `entities` list generates every table):

```json
{
  "environmentUrl": "https://yourorg.crm.dynamics.com",
  "entities": ["msdyn_requirementgroup"],
  "actions": ["msdyn_BookRequirementGroup"],
  "functions": ["CCaaS_GetAgents"],
  "output": { "outputRoot": "./src/generated" },
  "auth": { "flow": "clientCredentials" }
}
```

```bash
# The app registration is an application user in the org; the secret stays out of the file
DATAVERSE_TENANT_ID=... DATAVERSE_CLIENT_ID=... DATAVERSE_CLIENT_SECRET=... npx dataverse-gen generate
```

That writes `src/generated/actions/msdyn_BookRequirementGroupAction.ts`,
`src/generated/functions/CCaaS_GetAgentsFunction.ts`, the table's interface, and the complex types
and enums of the org's `$metadata`:

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { msdyn_BookRequirementGroupAction } from "./generated/actions/msdyn_BookRequirementGroupAction.js";
import { CCaaS_GetAgentsFunction } from "./generated/functions/CCaaS_GetAgentsFunction.js";

// Bound: the requirement group's id first, then the parameters by their $metadata names
const booking = await client.execute(
  new msdyn_BookRequirementGroupAction(requirementGroupId, {
    Start: new Date("2026-11-09T09:00:00Z"),
    Duration: 60,
    BookingResources: JSON.stringify([resourceId]),
  })
);

const agents = await client.execute(new CCaaS_GetAgentsFunction({ ApiVersion: "1.0" }));
```

### Your custom API

A custom API is generated the same way, by its unique name: in `actions`, or in `functions` when
it's a function (`isfunction`). For an unbound custom API `contoso_CalculateDiscount` with the
request parameters `OrderId` (Guid) and `Percentage` (Decimal) and the response property
`Discount` (Money):

```json
{
  "environmentUrl": "https://yourorg.crm.dynamics.com",
  "entities": ["salesorder"],
  "actions": ["contoso_CalculateDiscount"],
  "functions": [],
  "output": { "outputRoot": "./src/generated" },
  "auth": { "flow": "clientCredentials" }
}
```

```typescript
import { contoso_CalculateDiscountAction } from "./generated/actions/contoso_CalculateDiscountAction.js";

const { Discount } = await client.execute(
  new contoso_CalculateDiscountAction({ OrderId: orderId, Percentage: 12.5 })
);
```

Generate again after you change the custom API, so the classes match its parameters. Keep
`actions` and `functions` listing the operations you call: an empty list generates every action
(or function) in the org. The [generator README](../packages/dataverse-sdk-generator/README.md)
has every option.

## Batch and Bulk Operations

### Basic $batch Request

<!-- live -->

```typescript
import { BatchRequestBuilder, type BatchResponseStep } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);

// addRequest(id, method, url, headers?, body?, dependsOn?)
// URLs are relative to the Web API root (or absolute).
batch.addRequest("accounts", "GET", "accounts?$select=name");
batch.addRequest("contacts", "GET", "contacts?$select=fullname&$top=10");
batch.addRequest("account", "GET", `accounts(${accountId})`);

// Execute batch: one POST $batch
const result = await batch.execute();

// Responses are keyed by the ids above (and listed in order in result.results). A body is
// `unknown` (a batch mixes responses), so name the type of the one you read.
type Page<T> = BatchResponseStep<{ value: T[] }>;
const accounts = result.responses.get("accounts") as Page<{ name: string }> | undefined;
const contacts = result.responses.get("contacts") as Page<{ fullname: string }> | undefined;
console.log("Accounts:", accounts?.body?.value);
console.log("Contacts:", contacts?.body?.value);
console.log("Account detail:", result.responses.get("account")?.body);
```

### Batch with Change Sets

<!-- live -->

```typescript
import { BatchRequestBuilder, DataverseBatchError } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);

// Begin change set for transactional updates
batch.beginChangeset();

// All operations in change set succeed or fail together
batch.addRequest("a1", "POST", "accounts", undefined, { name: "Account 1" });
// "$a1" refers to the account created by request "a1"
batch.addRequest(
  "c1",
  "POST",
  "contacts",
  undefined,
  { lastname: "Smith", "parentcustomerid_account@odata.bind": "$a1" },
  ["a1"]
);
batch.addRequest("upd", "PATCH", `accounts(${existingId})`, undefined, { revenue: 100000 });

batch.endChangeset();

// Execute with error handling
try {
  const result = await batch.execute();
  console.log("All changes committed:", result.responses.get("a1")?.headers["odata-entityid"]);
} catch (error) {
  if (error instanceof DataverseBatchError) {
    // The change set was rolled back; error.result has the failing response
    console.error("Batch failed, all changes rolled back:", error.result?.errors);
  }
}
```

Without `continueOnError`, Dataverse stops at the first failure and `execute()` throws `DataverseBatchError`. With `execute({ continueOnError: true })` it runs every request and returns the result. More than 1000 requests are split into several `$batch` requests. See the [batch package README](../packages/dataverse-sdk-batch/README.md).

### Bulk Create and Update

To write many records of one table, `createMultiple()` and `updateMultiple()` from the batch
package split them into chunks, send each chunk as one `CreateMultiple` / `UpdateMultiple`
request (or as a `$batch` for a table without those messages, with `strategy: "auto"`), and
return what happened to each record:

<!-- live -->

```typescript
import { createMultiple, updateMultiple } from "@mohsinonxrm/dataverse-sdk-batch";

const account = { logicalName: "account", entitySetName: "accounts" };

const created = await createMultiple(client, account, [
  { name: "Account 1", revenue: 50000 },
  { name: "Account 2", revenue: 75000 },
  { name: "Account 3", revenue: 100000 },
]);
console.log(`Created ${created.succeeded} accounts`);

const updated = await updateMultiple(
  client,
  account,
  created.results.map((r) => ({ accountid: r.id, creditlimit: 10000 }))
);
for (const r of updated.results) {
  if (r.status === "failed") console.error(`Record ${r.index}:`, r.error?.message);
}
```

`getBulkOperationSupport(client, "account")` tells which bulk messages a table supports. To send
one bulk request yourself, use the action:

<!-- live -->

```typescript
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const action = new CreateMultipleAction("accounts", {
  Targets: [
    { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 1", revenue: 50000 },
    { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 2", revenue: 75000 },
  ],
});
const result = await client.execute(action);
result.Ids.forEach((id) => console.log("Created ID:", id));
```

[Bulk vs batch](./mapping/bulk-vs-batch.md) compares the two, and the
[batch README](../packages/dataverse-sdk-batch/README.md#bulk-create-and-update) has every option.

## File Operations

### Upload a File (Chunked)

```typescript
import { FileColumnClient } from "@mohsinonxrm/dataverse-sdk-files";
import { readFileSync } from "fs";

const fileClient = new FileColumnClient(client);

// Read the file; a Node.js Buffer is accepted as it is (Blob, ArrayBuffer and Uint8Array too)
const fileContent = readFileSync("./documents/proposal.pdf");

// Upload (entity set, record id, file column, data, file name, options).
// Files over 4 MB (the default and maximum chunkSize) are sent in chunks.
await fileClient.upload("accounts", accountId, "new_document", fileContent, "proposal.pdf", {
  onProgress: ({ percentage }) => {
    console.log(`Upload progress: ${percentage}%`);
  },
});

console.log("File uploaded successfully");
```

The same call works for image columns such as `entityimage`. The MIME type comes from the `Blob` you pass (`application/octet-stream` for other data).

### Download a File

```typescript
import { writeFileSync } from "fs";

// download() resolves to a Blob
const blob = await fileClient.download("accounts", accountId, "new_document");

console.log("File size:", blob.size);
console.log("MIME type:", blob.type);

// Save to disk
writeFileSync("./downloaded-file.pdf", Buffer.from(await blob.arrayBuffer()));
```

A column with no file is a 404 `DataverseODataError`. `fileClient.delete("accounts", accountId, "new_document")` removes the file.

## Change Tracking and System Jobs

### Change Tracking

For a table with change tracking enabled, `trackChanges()` reads every row and a delta link;
`changesSince(deltaLink)` later returns only the rows created, updated and deleted since:

<!-- live -->

```typescript
import { isDeltaLinkExpired } from "@mohsinonxrm/dataverse-sdk-core";

const first = await client
  .api("/accounts")
  .select("name", "revenue")
  .trackChanges<{ accountid: string; name: string }>();
let deltaLink = first.deltaLink; // save it with the data

try {
  const changes = await client.changesSince<{ accountid: string; name: string }>(deltaLink);
  console.log(`${changes.changed.length} changed, ${changes.deleted.length} deleted`);
  deltaLink = changes.deltaLink;
} catch (error) {
  if (!isDeltaLinkExpired(error)) throw error; // too old: start again with trackChanges()
}
```

See [Change Tracking](../packages/dataverse-sdk-core/README.md#change-tracking) in the core
README for paging through large tables, expiry and the query options Dataverse allows.

### Waiting for System Jobs

`ExecuteWorkflow`, `BulkDelete`, `ImportSolutionAsync` and similar operations start a system job
(an `asyncoperation`) and return at once. `waitForAsyncOperation()` reads the job until it ends:

```typescript
import {
  DataverseAsyncOperationError,
  waitForAsyncOperation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { ExecuteWorkflowAction } from "@mohsinonxrm/dataverse-sdk-actions";

const started = await client.execute(
  new ExecuteWorkflowAction(workflowId, { EntityId: accountId })
);
try {
  const job = await waitForAsyncOperation(client, started, { timeoutMs: 5 * 60_000 });
  console.log("Completed on", job.completedon);
} catch (error) {
  if (error instanceof DataverseAsyncOperationError) console.error(error.reason, error.message);
  throw error;
}
```

[Waiting for System Jobs](../packages/dataverse-sdk-core/README.md#waiting-for-system-jobs-asyncoperation)
in the core README describes polling, timeouts and the responses it accepts.

## Coming from the .NET SDK

`@mohsinonxrm/dataverse-sdk-xrm` and `@mohsinonxrm/dataverse-sdk-messages` are a compatibility
layer for code written against `IOrganizationService`: `OrganizationService` has the .NET method
names, and the messages are the .NET `<Name>Request` / `<Name>Response` classes. They run on the
same `DataverseClient`, so you can port first and move to the main path call by call. The
[.NET SDK mapping](./mapping/message-to-webapi.md#0-from-the-net-sdk-to-the-main-path) has the
main-path equivalent of each .NET call.

```typescript
import { OrganizationService, createEntityReference } from "@mohsinonxrm/dataverse-sdk-xrm";
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const service = new OrganizationService(client);

// CRUD methods take the entity set name ("accounts"), not the logical name ("account").

// Create: returns the new id
const accountId = await service.create("accounts", {
  name: "Contoso Inc",
  revenue: 5000000,
});

// Retrieve
const account = await service.retrieve("accounts", accountId, {
  select: ["name", "revenue", "industrycode"],
});

// Update (sends If-Match: *, so a missing record fails with 404 instead of being created)
await service.update("accounts", accountId, {
  revenue: 6000000,
});

// Execute a message: the same request as ExecuteWorkflowAction, with a .NET-style response
const workflowRequest = new ExecuteWorkflowRequest(workflowId, {
  EntityId: accountId,
  InputArguments: {},
});
const workflowResponse = await service.execute(workflowRequest);
console.log(workflowResponse.result?.asyncoperationid);

// Associate: related records are references from createEntityReference(logicalName, id)
await service.associate("accounts", accountId, "contact_customer_accounts", [
  createEntityReference("contact", contactId),
]);

// Disassociate: the related record's id
await service.disassociate("accounts", accountId, "contact_customer_accounts", contactId);

// Delete
await service.delete("accounts", accountId);
console.log(account.name);
```

| .NET                                         | Main path in this SDK                                             |
| -------------------------------------------- | ----------------------------------------------------------------- |
| `service.Create` / `Retrieve` / `Update`     | `client.api("accounts").createAndGetId(…)`, `.get()`, `.patch(…)` |
| `service.RetrieveMultiple(QueryExpression)`  | `client.api("accounts").select(…).filter(…).getAll()`             |
| `service.Execute(new WinOpportunityRequest)` | `client.execute(new WinOpportunityAction({ … }))`                 |
| `ExecuteMultipleRequest`                     | `BatchRequestBuilder`, or `createMultiple()` / `updateMultiple()` |
| Early-bound classes                          | `dataverse-gen` and `createTypedClient()`                         |

## Next Steps

### Explore Advanced Features

- **Metadata Operations**: `MetadataClient` and the `Metadata` builders in `@mohsinonxrm/dataverse-sdk-metadata` create and update tables, columns, relationships and choices ([reference](./api/metadata-operations.md))
- **Resilience**: opt-in adaptive throttling, circuit breaker and bulkhead middleware, and `ChaosMiddleware` to test your app against 429s, outages and slow responses in dev and test environments ([core README](../packages/dataverse-sdk-core/README.md#resiliency-features), [Testing your app's resilience](testing-resilience.md))
- **Telemetry**: the OpenTelemetry and Application Insights adapters record a dependency per request attempt, with W3C trace context and the SDK's throttle, retry and batch events ([core README](../packages/dataverse-sdk-core/README.md#telemetryclient))
- **FetchXML and views**: `client.fetchXml()`, `client.savedQuery()` and `client.userQuery()` ([core README](../packages/dataverse-sdk-core/README.md#fetchxml))
- **Discovery**: find the environments a user can open, in every cloud (`@mohsinonxrm/dataverse-sdk-discovery`)

### Review Samples

Check out the `samples/` directory for complete working examples:

- `node-cli-devicecode/` - CLI app with device code authentication
- `daemon-clientcredentials/` - Background service with client credentials
- `actions-functions/` - Typed actions and functions
- `batch-ops/` - Batch operations demonstrations
- `metadata-ops/` - Metadata operations
- `messages-sales-cs/` - OrganizationService message examples (.NET compatibility layer)
- `spa-fluentui-v9/` - Browser SPA (React, Fluent UI v9) with a page per SDK area

### Read Documentation

- **Usage patterns**: [SDK-USAGE-PATTERNS.md](./SDK-USAGE-PATTERNS.md) shows each kind of call on the main path and in the compatibility layer
- **ADRs**: Architecture Decision Records in `docs/adr/`
- **Mapping Docs**: .NET and Web API mappings in `docs/mapping/`
- **Package READMEs**: Specific package documentation

### Get Help

- **GitHub Issues**: [https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues)
- **Discussions**: [https://github.com/mohsinonxrm/dataverse-sdk-typescript/discussions](https://github.com/mohsinonxrm/dataverse-sdk-typescript/discussions)

## Troubleshooting

### Authentication Errors

**Error**: "AADSTS50076: Due to a configuration change made by your administrator..."

**Solution**: Multi-factor authentication required. Use device code flow or interactive browser flow.

### Rate Limiting (429 Errors)

The SDK automatically retries 429 errors with `Retry-After` header respect. To adjust:

<!-- live -->

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const client = new DataverseClient({
  baseUrl: "https://YOUR_ORG.crm.dynamics.com/api/data/v9.2",
  tokenProvider,
  retry: {
    maxRetries: 5, // default 6
    baseDelayMs: 1000, // default 3000; the backoff doubles per retry
    maxDelayMs: 30000, // default 30000
    jitter: true, // default true (±20% on the computed backoff)
  },
});
```

`Retry-After` is waited out as sent when it's at most `maxRetryAfterMs` (default: `maxDelayMs`)
and ends before the request's `timeoutMs`; otherwise the 429 is returned to you at once as a
`DataverseThrottleError` with `retryAfterMs`. `shouldRetry` picks which statuses to retry; only
`retryNonIdempotent` lets a create or an action be replayed after a 5xx. See the
[core README](../packages/dataverse-sdk-core/README.md#retry-with-exponential-backoff) for
`retryableStatusCodes`, `retryNonIdempotent`, `retryNetworkErrors`, `shouldRetry` and `onRetry`.

### Type Safety

All operations support TypeScript auto-completion. Business entity types such as `Account` are
generated for your org by `@mohsinonxrm/dataverse-sdk-generator` (the metadata package holds only
metadata types such as `EntityMetadata`):

<!-- live -->

```typescript
import type { Account } from "./generated/entities/Account.js";

const account: Account = await client.api(`/accounts(${id})`).get();
//    ^^^^^^^ Full type safety
```

With `"typedClient": true`, `createTypedClient(client)` checks the columns you select and the
payloads you write too (see [Your tables and the typed client](#your-tables-and-the-typed-client)).

### Debugging

The SDK logs nothing by default. Pass a `Logger` (`debug`, `info`, `warn` and `error` methods) to
see its diagnostics; `ConsoleLogger` writes to the console:

<!-- live -->

```typescript
import { ConsoleLogger, DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const client = new DataverseClient({
  baseUrl: "https://YOUR_ORG.crm.dynamics.com/api/data/v9.2",
  tokenProvider,
  logger: new ConsoleLogger(), // or new ConsoleLogger({ level: "warn" })
  logging: { fullUrls: true }, // while debugging; by default the query and keys are hidden
});
```

---

**Happy coding with Dataverse SDK for TypeScript!** 🚀
