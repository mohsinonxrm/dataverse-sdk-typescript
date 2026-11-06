# Getting Started with Dataverse SDK for TypeScript

This guide will walk you through setting up and using the Dataverse SDK for TypeScript in your applications.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Authentication](#authentication)
4. [Basic CRUD Operations](#basic-crud-operations)
5. [Advanced Queries](#advanced-queries)
6. [Batch Operations](#batch-operations)
7. [File Operations](#file-operations)
8. [OrganizationService Pattern](#organizationservice-pattern)
9. [Next Steps](#next-steps)

## Prerequisites

- **Node.js**: Version 18 or higher
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
# For OrganizationService pattern (C#-familiar)
pnpm add @mohsinonxrm/dataverse-sdk-xrm @mohsinonxrm/dataverse-sdk-messages

# For batch operations
pnpm add @mohsinonxrm/dataverse-sdk-batch

# For file operations
pnpm add @mohsinonxrm/dataverse-sdk-files

# For typed actions/functions
pnpm add @mohsinonxrm/dataverse-sdk-actions @mohsinonxrm/dataverse-sdk-functions

# For metadata operations
pnpm add @mohsinonxrm/dataverse-sdk-metadata
```

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

```typescript
// Get by ID
const accountId = "00000000-0000-0000-0000-000000000001";
const account = await client
  .api(`/accounts(${accountId})`)
  .select("name", "revenue", "industrycode")
  .get<{ "@odata.etag": string; name: string; revenue: number; industrycode: number }>();

console.log("Account name:", account.name);
console.log("Revenue:", account.revenue);
```

### Update a Record

```typescript
const accountId = "00000000-0000-0000-0000-000000000001";

await client.api(`/accounts(${accountId})`).patch({
  revenue: 6000000,
  numberofemployees: 150,
});

console.log("Account updated successfully");
```

### Update with Optimistic Concurrency

```typescript
// .ifMatch(etag) sets the If-Match header; a 412 means the record changed since you read it
await client.api(`/accounts(${accountId})`).ifMatch(account["@odata.etag"]).patch({
  revenue: 6000000,
});
```

### Delete a Record

```typescript
const accountId = "00000000-0000-0000-0000-000000000001";

await client.api(`/accounts(${accountId})`).delete();

console.log("Account deleted successfully");
```

## Advanced Queries

### Filter, Sort, and Paginate

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

```typescript
const accounts = await client
  .api("/accounts")
  .select("name", "revenue")
  .filter("revenue gt 50000")
  .getAll({ maxItems: 500, maxPages: 10 });

console.log(`Retrieved ${accounts.length} accounts`);
```

### Advanced Filtering

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
const accounts = await client.api("/accounts").filter("contains(name, 'Contoso')").get();
```

## Batch Operations

### Basic $batch Request

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

### Bulk Operations (Alternative to $batch)

For simple bulk creates/updates/upserts, consider using bulk actions:

```typescript
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const accounts = [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 1", revenue: 50000 },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 2", revenue: 75000 },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 3", revenue: 100000 },
];

const action = new CreateMultipleAction("accounts", accounts);
const result = await client.execute(action);

console.log(`Created ${result.Ids.length} accounts`);
result.Ids.forEach((id) => console.log("Created ID:", id));
```

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

## OrganizationService Pattern

For developers familiar with the C# SDK, use the OrganizationService pattern:

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
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

// Execute Message
const workflowRequest = new ExecuteWorkflowRequest(workflowId, accountId, {});
const workflowResponse = await service.execute(workflowRequest);

// Associate: related records are EntityReferences with a logical name
await service.associate("accounts", accountId, "contact_customer_accounts", [
  { logicalName: "contact", id: contactId },
]);

// Disassociate: the related record's id
await service.disassociate("accounts", accountId, "contact_customer_accounts", contactId);

// Delete
await service.delete("accounts", accountId);
```

## Next Steps

### Explore Advanced Features

- **Metadata Operations**: Use `@mohsinonxrm/dataverse-sdk-metadata` to read/write entity definitions, attributes, relationships
- **Typed Actions**: Import specific actions from `@mohsinonxrm/dataverse-sdk-actions`
- **Typed Functions**: Import specific functions from `@mohsinonxrm/dataverse-sdk-functions`
- **Telemetry**: Add Application Insights or OpenTelemetry adapters for observability

### Review Samples

Check out the `samples/` directory for complete working examples:

- `node-cli-devicecode/` - CLI app with device code authentication
- `daemon-clientcredentials/` - Background service with client credentials
- `batch-ops/` - Batch operations demonstrations
- `metadata-ops/` - Metadata operations
- `messages-sales-cs/` - OrganizationService message examples

### Read Documentation

- **ADRs**: Architecture Decision Records in `docs/adr/`
- **Mapping Docs**: Web API mappings in `docs/mapping/`
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

```typescript
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

`Retry-After` is waited out as sent when it's at most `maxRetryAfterMs` (default: `maxDelayMs`);
a longer wait is returned to you as a `DataverseThrottleError` with `retryAfterMs`. See the
[core README](../packages/dataverse-sdk-core/README.md#retry-with-exponential-backoff) for
`retryableStatusCodes`, `retryNonIdempotent`, `retryNetworkErrors`, `shouldRetry` and `onRetry`.

### Type Safety

All operations support TypeScript auto-completion. Business entity types such as `Account` are
generated for your org by `@mohsinonxrm/dataverse-sdk-generator` (the metadata package holds only
metadata types such as `EntityMetadata`):

```typescript
import type { Account } from "./generated/entities/Account.js";

const account: Account = await client.api(`/accounts(${id})`).get();
//    ^^^^^^^ Full type safety
```

### Debugging

The SDK logs nothing by default. Pass a `Logger` (`debug`, `info`, `warn` and `error` methods) to
see its diagnostics; `ConsoleLogger` writes to the console:

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
