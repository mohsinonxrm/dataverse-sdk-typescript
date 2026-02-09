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
pnpm add @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-node

# Using npm
npm install @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-node

# Using yarn
yarn add @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-node
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

2. **Configure API Permissions**:
   - Add Dynamics CRM API permission
   - Grant `user_impersonation` delegated permission
   - (For daemon apps) Grant admin consent for application permissions

3. **Create Client Secret** (for daemon apps):
   - Certificates & secrets → New client secret
   - Note the secret value immediately

### Device Code Flow (CLI Applications)

Perfect for interactive command-line tools:

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
  },
};

// Token provider using device code flow
const tokenProvider = new MsalNodeTokenProvider(msalConfig, {
  scopes: ["https://YOUR_ORG.crm.dynamics.com/.default"],
  useDeviceCodeFlow: true,
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
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
  },
};

const tokenProvider = new MsalNodeTokenProvider(msalConfig, {
  scopes: ["https://YOUR_ORG.crm.dynamics.com/.default"],
  useClientCredentials: true,
});

const client = new DataverseClient({
  baseUrl: "https://YOUR_ORG.crm.dynamics.com/api/data/v9.2",
  tokenProvider,
});
```

### Browser Authentication (SPA)

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalBrowserTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";

const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
    redirectUri: window.location.origin,
  },
};

const tokenProvider = new MsalBrowserTokenProvider(msalConfig, {
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

const response = await client.api("/accounts").post(account);

console.log("Created account:", response["@odata.id"]);
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
  .header(Prefer.returnRepresentation())
  .post(account);

console.log("Created account ID:", newAccount.accountid);
console.log("Created account name:", newAccount.name);
```

### Retrieve a Record

```typescript
// Get by ID
const accountId = "00000000-0000-0000-0000-000000000001";
const account = await client
  .api(`/accounts(${accountId})`)
  .select(["name", "revenue", "industrycode"])
  .get();

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
await client.api(`/accounts(${accountId})`).header("If-Match", account["@odata.etag"]).patch({
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
  .select(["name", "revenue", "createdon"])
  .filter("revenue gt 100000")
  .orderby("revenue desc")
  .top(10)
  .get();

console.log(`Found ${accounts.value.length} accounts`);
accounts.value.forEach((account) => {
  console.log(`${account.name}: $${account.revenue}`);
});
```

### Expand Related Records

```typescript
const account = await client
  .api(`/accounts(${accountId})`)
  .select(["name", "revenue"])
  .expand({
    primarycontactid: {
      select: ["fullname", "emailaddress1"],
    },
    Account_Tasks: {
      select: ["subject", "scheduledend"],
      filter: "statecode eq 0", // Active tasks
      top: 5,
    },
  })
  .get();

console.log("Account:", account.name);
console.log("Primary Contact:", account.primarycontactid?.fullname);
console.log("Active Tasks:", account.Account_Tasks.length);
```

### Iterate Through All Pages

```typescript
// Iterate through all records (handles paging automatically)
const allAccounts = [];

for await (const account of client.api("/accounts").select(["name"]).iterate()) {
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
  .select(["name", "revenue"])
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
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);

// Add multiple operations
batch.addRequest(client.api("/accounts").select(["name"]));
batch.addRequest(client.api("/contacts").select(["fullname"]).top(10));
batch.addRequest(client.api(`/accounts(${accountId})`));

// Execute batch
const responses = await batch.execute();

console.log("Accounts:", responses[0].value);
console.log("Contacts:", responses[1].value);
console.log("Account detail:", responses[2]);
```

### Batch with Change Sets

```typescript
const batch = new BatchRequestBuilder(client);

// Begin change set for transactional updates
batch.beginChangeSet();

// All operations in change set succeed or fail together
batch.addRequest(client.api("/accounts").post({ name: "Account 1" }));
batch.addRequest(client.api("/accounts").post({ name: "Account 2" }));
batch.addRequest(client.api(`/accounts(${existingId})`).patch({ revenue: 100000 }));

batch.endChangeSet();

// Execute with error handling
try {
  const responses = await batch.execute();
  console.log("All changes committed successfully");
} catch (error) {
  console.error("Batch failed, all changes rolled back:", error);
}
```

### Bulk Operations (Alternative to $batch)

For simple bulk creates/updates/upserts, consider using bulk actions:

```typescript
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const accounts = [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 1", revenue: 50000 },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 2", revenue: 75000 },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 3", revenue: 100000 },
];

const action = new CreateMultipleAction(accounts, "Default");
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

// Read file content
const fileContent = readFileSync("./documents/proposal.pdf");
const base64Content = fileContent.toString("base64");

// Upload with chunking (auto-chunks files >4MB)
await fileClient.upload({
  entitySetName: "accounts",
  entityId: accountId,
  attributeName: "entityimage", // or any file column
  fileName: "proposal.pdf",
  mimeType: "application/pdf",
  fileContent: base64Content,
  onProgress: (progress) => {
    console.log(`Upload progress: ${progress.percentage}%`);
  },
});

console.log("File uploaded successfully");
```

### Download a File

```typescript
const fileData = await fileClient.download({
  entitySetName: "accounts",
  entityId: accountId,
  attributeName: "entityimage",
});

console.log("File name:", fileData.fileName);
console.log("File size:", fileData.fileSize);
console.log("MIME type:", fileData.mimeType);

// Save to disk
writeFileSync("./downloaded-file.pdf", Buffer.from(fileData.fileContent, "base64"));
```

## OrganizationService Pattern

For developers familiar with the C# SDK, use the OrganizationService pattern:

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { ExecuteWorkflowRequest, MergeRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const service = new OrganizationService(client);

// Create
const accountId = await service.create("account", {
  name: "Contoso Inc",
  revenue: 5000000,
});

// Retrieve
const account = await service.retrieve("account", accountId, ["name", "revenue", "industrycode"]);

// Update
await service.update("account", accountId, {
  revenue: 6000000,
});

// Delete
await service.delete("account", accountId);

// Execute Message
const workflowRequest = new ExecuteWorkflowRequest("workflow-id", accountId, {});
const workflowResponse = await service.execute(workflowRequest);
console.log("Workflow execution ID:", workflowResponse.result.asyncoperationid);

// Associate
await service.associate("account", accountId, "contact_customer_accounts", "contact", contactId);

// Disassociate
await service.disassociate("account", accountId, "contact_customer_accounts", "contact", contactId);
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
- `file-ops/` - File upload/download examples
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
  retryOptions: {
    maxRetries: 5,
    retryDelay: 1000,
  },
});
```

### Type Safety

All operations support TypeScript auto-completion. Use generated types:

```typescript
import type { Account } from "@mohsinonxrm/dataverse-sdk-metadata";

const account: Account = await client.api(`/accounts(${id})`).get();
//    ^^^^^^^ Full type safety
```

### Debugging

Enable detailed logging:

```typescript
const client = new DataverseClient({
  baseUrl: "https://YOUR_ORG.crm.dynamics.com/api/data/v9.2",
  tokenProvider,
  logger: {
    log: (level, message, data) => {
      console.log(`[${level}] ${message}`, data);
    },
  },
});
```

---

**Happy coding with Dataverse SDK for TypeScript!** 🚀
