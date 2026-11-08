# Dataverse SDK for TypeScript

A modern, enterprise-grade TypeScript SDK for Microsoft Dataverse (Online), designed for both Node.js 22+ and modern browsers. Built with ESM-only architecture, native `fetch`, and comprehensive TypeScript typing.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Node Version](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3%2B-blue.svg)](https://www.typescriptlang.org/)

> **Upgrading from 1.x?** See the [2.0 migration guide](./docs/migration-2.0.md).

## 🎯 Project Vision

Provide a **production-ready**, **type-safe**, and **developer-friendly** SDK for Microsoft Dataverse that:

- ✅ **Works everywhere**: Node.js 22+ and modern browsers (ESM-only)
- ✅ **Two developer experiences**: HTTP-first fluent API (Microsoft Graph-like) + C#-familiar OrganizationService facade
- ✅ **Enterprise resilience**: Built-in retry, adaptive concurrency, throttling awareness
- ✅ **Type-safe operations**: Strongly typed Web API actions/functions, messages, and metadata operations
- ✅ **Modern DX**: Native `fetch`, promise-based, async iterators, middleware pipeline
- ✅ **Production telemetry**: Application Insights and OpenTelemetry support

## 📦 Packages

The SDK is organized as a monorepo with focused, composable packages:

### Core SDK

| Package                                                                | Description                                                                  | Status      |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------- |
| **[@mohsinonxrm/dataverse-sdk-core](./packages/dataverse-sdk-core)**   | HTTP pipeline, middleware, fluent request builder, OData query support       | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-batch](./packages/dataverse-sdk-batch)** | $batch operations with change sets, Content-ID references, auto-split        | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-xrm](./packages/dataverse-sdk-xrm)**     | OrganizationService facade (create/retrieve/update/delete/associate/execute) | ✅ Complete |

### Authentication

| Package                                                                                            | Description                                                | Status      |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| **[@mohsinonxrm/dataverse-sdk-auth-msal-browser](./packages/dataverse-sdk-auth-msal-browser)**     | MSAL browser token provider (SPA authentication)           | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-auth-msal-node](./packages/dataverse-sdk-auth-msal-node)**           | MSAL node token provider (device code, client credentials) | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-auth-azure-identity](./packages/dataverse-sdk-auth-azure-identity)** | Azure Identity token provider (DefaultAzureCredential)     | ✅ Complete |

### Operations

| Package                                                                        | Description                                                                                                                 | Status      |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ----------- |
| **[@mohsinonxrm/dataverse-sdk-actions](./packages/dataverse-sdk-actions)**     | Typed Web API actions (POST) of the platform, Sales and Customer Service                                                    | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-functions](./packages/dataverse-sdk-functions)** | Typed Web API functions (GET) of the platform, Sales and Customer Service                                                   | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-messages](./packages/dataverse-sdk-messages)**   | <!-- count:messages -->1,072<!-- /count --> typed Organization Service messages of the platform, Sales and Customer Service | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-metadata](./packages/dataverse-sdk-metadata)**   | Strict metadata typing (EntityMetadata, AttributeMetadata, etc.)                                                            | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-files](./packages/dataverse-sdk-files)**         | File/image column operations with chunked upload/download                                                                   | ✅ Complete |

### Tools & Utilities

| Package                                                                                      | Description                                                                | Status      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------- |
| **[@mohsinonxrm/dataverse-sdk-generator](./packages/dataverse-sdk-generator)**               | Early-bound entity type generator from $metadata                           | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-entities-runtime](./packages/dataverse-sdk-entities-runtime)** | Runtime base classes for generated entities                                | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-discovery](./packages/dataverse-sdk-discovery)**               | Global Discovery Service (Commercial, GCC, GCC High, DoD and China clouds) | ✅ Complete |

### Telemetry (Optional)

| Package                                                                            | Description                            | Status      |
| ---------------------------------------------------------------------------------- | -------------------------------------- | ----------- |
| **[@mohsinonxrm/dataverse-sdk-appinsights](./packages/dataverse-sdk-appinsights)** | Application Insights telemetry adapter | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-otel](./packages/dataverse-sdk-otel)**               | OpenTelemetry telemetry adapter        | ✅ Complete |

## 🚀 Quick Start

### Installation

```bash
# Core SDK + authentication
npm install @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-node @azure/msal-node

# Or with pnpm
pnpm add @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-node @azure/msal-node
```

### Basic Usage (Node.js - Client Credentials)

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { ConfidentialClientApplication } from "@azure/msal-node";

// Configure MSAL
const cca = new ConfidentialClientApplication({
  auth: {
    clientId: process.env.AZURE_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET!,
  },
});

// Create token provider
const tokenProvider = new MsalNodeTokenProvider(cca, {
  flow: "clientCredentials",
  scopes: ["https://yourorg.crm.dynamics.com/.default"],
});

// Create Dataverse client
const client = new DataverseClient({
  baseUrl: "https://yourorg.crm.dynamics.com",
  tokenProvider,
});

// Query data
const accounts = await client
  .api("/accounts")
  .select("name", "revenue")
  .filter("revenue gt 1000000")
  .orderBy("revenue desc")
  .top(10)
  .get();

console.log(accounts);
```

### Browser Usage (SPA with MSAL)

```tsx
import { useEffect, useState } from "react";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalBrowserTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { PublicClientApplication } from "@azure/msal-browser";

// Configure MSAL
const msalInstance = new PublicClientApplication({
  auth: {
    clientId: "your-app-registration-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
    redirectUri: window.location.origin,
  },
});

// Create token provider
const tokenProvider = new MsalBrowserTokenProvider(msalInstance, {
  scopes: ["https://yourorg.crm.dynamics.com/user_impersonation"],
});

// Create client
const client = new DataverseClient({
  baseUrl: "https://yourorg.crm.dynamics.com",
  tokenProvider,
});

interface Account {
  accountid: string;
  name: string;
}

// Use in React component: get() resolves to the response body, { value: [...] } for a collection
function AccountList() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    client
      .api("/accounts")
      .select("accountid", "name")
      .top(50)
      .get<{ value: Account[] }>()
      .then((page) => setAccounts(page.value));
  }, []);

  return (
    <ul>
      {accounts.map((account) => (
        <li key={account.accountid}>{account.name}</li>
      ))}
    </ul>
  );
}
```

For app registration, CORS, Content-Security-Policy and browser limits, see [docs/browser.md](./docs/browser.md).

## 🎓 Core Concepts

### Two Developer Experiences ("Front Doors")

#### 1. HTTP-First Fluent API (Microsoft Graph-like)

Modern, chainable API for web/Node.js developers:

```typescript
import { Prefer } from "@mohsinonxrm/dataverse-sdk-core";

interface Account {
  accountid: string;
  name: string;
  revenue?: number;
  "@odata.etag": string;
}

// OData query building
const highValueAccounts = await client
  .api("/accounts")
  .select("name", "revenue", "industrycode")
  .filter("revenue gt 5000000 and industrycode eq 6")
  .expand("primarycontactid", { select: ["fullname", "emailaddress1"] })
  .orderBy("revenue desc")
  .top(25)
  .get<{ value: Account[] }>();

// Create, and get the new record back
const newAccount = await client
  .api("/accounts")
  .prefer(Prefer.returnRepresentation())
  .post<Account>({
    name: "Contoso Ltd",
    revenue: 10000000,
    industrycode: 6,
  });

// Update with optimistic concurrency: fails with 412 if the record changed since it was read
await client.api(`/accounts(${newAccount.accountid})`).ifMatch(newAccount["@odata.etag"]).patch({
  revenue: 12000000,
});

// Paging: iterate() follows @odata.nextLink page by page
for await (const account of client.api("/accounts").select("name").iterate<Account>()) {
  console.log(account.name);
}
```

#### 2. OrganizationService Facade (C#-familiar)

Familiar API for Dataverse/C# developers:

```typescript
import { OrganizationService, createEntityReference } from "@mohsinonxrm/dataverse-sdk-xrm";

const org = new OrganizationService(client);

// Create
const accountId = await org.create("accounts", {
  name: "Fabrikam Inc",
  revenue: 5000000,
});

// Retrieve
const account = await org.retrieve("accounts", accountId, {
  select: ["name", "revenue"],
  expand: [{ navigationProperty: "primarycontactid", select: ["fullname"] }],
});

// Update (never creates a missing record; with an etag, fails with 412 if it changed)
await org.update(
  "accounts",
  accountId,
  {
    websiteurl: "https://fabrikam.com",
  },
  { etag: account["@odata.etag"] }
);

// Associate: references from createEntityReference (any SDK package's: they are one type)
await org.associate("accounts", accountId, "contact_customer_accounts", [
  createEntityReference("contact", contactId1),
  createEntityReference("contact", contactId2),
]);

// Delete
await org.delete("accounts", accountId);
```

### Typed Actions & Functions

Actions (POST with side effects):

```typescript
import { CreateMultipleAction, WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";

// Bulk create
const createMultiple = new CreateMultipleAction("accounts", {
  Targets: [
    { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 1" },
    { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 2" },
  ],
});

const result = await client.execute(createMultiple);
console.log(result.Ids); // ['guid1', 'guid2']

// Win opportunity
const winAction = new WinOpportunityAction({
  OpportunityClose: {
    "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
    "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
    actualrevenue: 100000,
  },
  Status: 3, // Won
});

await client.execute(winAction);
```

Functions (GET without side effects):

```typescript
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const whoAmI = await client.execute(new WhoAmIFunction());
console.log(whoAmI.UserId);
```

The actions, functions and messages packages hold the operations of the platform, Sales and
Customer Service, chosen by the solution each comes from (the
[solution table](./tools/generate-sdk-types/metadata/README.md#which-operations-are-prebuilt)
lists them). For Contact Center (`CCaaS_*`), Field Service, Project Operations, Customer
Insights - Journeys (`msdynmkt_*`) and the other apps, and for your own custom APIs, generate
typed classes from your org with `dataverse-gen`: see
[Generate the rest with dataverse-gen](./docs/getting-started.md#generate-the-rest-with-dataverse-gen).

### $batch Operations

```typescript
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);

// Non-transactional requests
batch.addRequest("get-accounts", "GET", "/accounts?$top=5");

// Transactional change set
batch.beginChangeset();

// Create account; its id is the Content-ID, so later requests can refer to it as $create-account
batch.addRequest(
  "create-account",
  "POST",
  "/accounts",
  { "Content-Type": "application/json", Prefer: "return=representation" },
  { name: "Parent Account" }
);

// Create contact referencing the account
batch.addRequest(
  "create-contact",
  "POST",
  "/contacts",
  { "Content-Type": "application/json" },
  {
    firstname: "John",
    lastname: "Doe",
    "parentcustomerid_account@odata.bind": "$create-account", // References the Content-ID
  },
  ["create-account"]
);

batch.endChangeset();

// Execute
const result = await batch.execute();

if (result.success) {
  console.log("All operations succeeded");
} else {
  for (const [id, error] of result.errors) {
    console.error(`Request ${id} failed:`, error);
  }
}
```

### Messages (Organization Service Pattern)

```typescript
import {
  ExecuteWorkflowRequest,
  MergeRequest,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-messages";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";

const org = new OrganizationService(client);

// WhoAmI is a Web API function: use org.whoAmI(), or WhoAmIFunction from the functions package
const whoAmI = await org.whoAmI();
console.log("User ID:", whoAmI.UserId);

// Execute workflow
const workflowRequest = new ExecuteWorkflowRequest(workflowId, {
  EntityId: recordId,
  InputArguments: {},
});
const workflowResponse = await org.execute(workflowRequest);

// Merge records
// Parameters go in one object, by their Web API names; optional ones can be left out
const mergeRequest = new MergeRequest({
  Target: createEntityReference("account", targetAccountId),
  Subordinate: createEntityReference("account", subordinateAccountId),
  UpdateContent: { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Merged Account Name" },
  PerformParentingChecks: false,
});
await org.execute(mergeRequest);
```

### Metadata Operations

```typescript
import { MetadataClient } from "@mohsinonxrm/dataverse-sdk-metadata";
import type { StringAttributeMetadataCreate } from "@mohsinonxrm/dataverse-sdk-metadata";

const metadata = new MetadataClient(client);

// Create custom entity (returns its MetadataId); Attributes must include the primary name column
const entityId = await metadata.createEntityDefinition({
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  SchemaName: "new_CustomEntity",
  DisplayName: {
    LocalizedLabels: [{ Label: "Custom Entity", LanguageCode: 1033 }],
  },
  DisplayCollectionName: {
    LocalizedLabels: [{ Label: "Custom Entities", LanguageCode: 1033 }],
  },
  OwnershipType: "UserOwned",
  IsActivity: false,
  HasActivities: false,
  HasNotes: false,
  Attributes: [
    {
      "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
      SchemaName: "new_Name",
      IsPrimaryName: true,
      MaxLength: 100,
      DisplayName: { LocalizedLabels: [{ Label: "Name", LanguageCode: 1033 }] },
    },
  ],
});

// Create string attribute
const attribute: StringAttributeMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  SchemaName: "new_Description",
  MaxLength: 500,
  DisplayName: {
    LocalizedLabels: [{ Label: "Description", LanguageCode: 1033 }],
  },
};

await metadata.createAttributeDefinition("new_customentity", attribute);
```

### File Upload (Chunked)

```typescript
import { FileColumnClient } from "@mohsinonxrm/dataverse-sdk-files";

const fileClient = new FileColumnClient(client);

// Upload with progress (entity set, record id, column, data, file name, options)
await fileClient.upload("accounts", accountId, "new_logo", logoFile, "logo.png", {
  chunkSize: 4 * 1024 * 1024, // 4MB, the default and the maximum
  onProgress: ({ percentage }) => {
    console.log(`Upload: ${percentage}%`);
  },
});

// Download: resolves to a Blob
const file = await fileClient.download("accounts", accountId, "new_logo");
```

## 🔧 Middleware & Resiliency

The SDK includes production-grade middleware:

### Built-in Middleware

In the order they run:

- **ODataHeadersMiddleware**: Standard OData headers (Accept, OData-Version, OData-MaxVersion), plus `defaultHeaders` and `defaultPrefer`
- **RetryMiddleware**: Retries 429 (throttling) for every request, and 502/503/504 for idempotent ones (GET, PUT, DELETE, PATCH with `If-Match`), with exponential backoff + jitter, honouring `Retry-After`
- **ConcurrencyMiddleware**: Adaptive concurrency using `x-ms-dop-hint` from Dataverse
- **AuthMiddleware**: Adds the bearer token; after a 401 gets a new one and retries once (when a token provider is set)
- **TelemetryMiddleware**: Diagnostic headers; tracks dependencies and exceptions
- **LoggingMiddleware**: Request/response logging (when a `logger` is set)

### Custom Middleware

```typescript
import { DataverseClient, type Middleware } from "@mohsinonxrm/dataverse-sdk-core";

const timing: Middleware = {
  name: "Timing",
  async execute(request, ctx, next) {
    const started = Date.now();
    const response = await next(request, ctx);
    console.log(
      `${request.method} ${request.url}: ${response.status} in ${Date.now() - started} ms`
    );
    return response;
  },
};

const client = new DataverseClient({
  baseUrl: "https://yourorg.crm.dynamics.com",
  tokenProvider,
  // prepend runs before the built-in middleware, append right before fetch;
  // replace receives the built-in list and returns the one to use
  middleware: { append: [timing] },
});
```

See the [core README](./packages/dataverse-sdk-core/README.md#middleware-pipeline) for the
pipeline in detail.

## 📊 Telemetry & Observability

### Application Insights

The adapter emits OpenTelemetry spans that the Azure Monitor OpenTelemetry distro exports:

```typescript
import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import { ApplicationInsightsTelemetryClient } from "@mohsinonxrm/dataverse-sdk-appinsights";

useAzureMonitor({
  azureMonitorExporterOptions: {
    connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
  },
});

const client = new DataverseClient({
  baseUrl: "https://yourorg.crm.dynamics.com",
  tokenProvider,
  telemetry: new ApplicationInsightsTelemetryClient(),
});
```

Or pass `{ connectionString }` to `ApplicationInsightsTelemetryClient` and it calls
`useAzureMonitor()` for you; see the [appinsights README](./packages/dataverse-sdk-appinsights).

### OpenTelemetry

```typescript
import { OpenTelemetryClient } from "@mohsinonxrm/dataverse-sdk-otel";
import { trace } from "@opentelemetry/api";

const client = new DataverseClient({
  baseUrl: "https://yourorg.crm.dynamics.com",
  tokenProvider,
  // Without a tracer (or tracerProvider), the global tracer provider is used
  telemetry: new OpenTelemetryClient({ tracer: trace.getTracer("my-app") }),
});
```

## 🔨 Early-Bound Entity Generation

Generate strongly-typed entity interfaces from your Dataverse metadata:

```bash
# Install generator
npm install -D @mohsinonxrm/dataverse-sdk-generator

# Initialize configuration
npx dataverse-gen init

# Edit .dataverse-gen.json with your settings

# Generate entities
npx dataverse-gen generate
```

Configuration example (`.dataverse-gen.json`):

```json
{
  "environmentUrl": "https://yourorg.crm.dynamics.com",
  "entities": ["account", "contact", "opportunity"],
  "actions": [],
  "functions": [],
  "output": { "outputRoot": "./src/generated" },
  "auth": { "flow": "clientCredentials" }
}
```

`actions` and `functions` list the operations to generate by name; an empty list generates all of them.
This is how you get the operations the prebuilt packages leave out (other apps' and your custom
APIs); see
[Generate the rest with dataverse-gen](./docs/getting-started.md#generate-the-rest-with-dataverse-gen). With the client-credentials flow,
the tenant id, client id and secret come from `DATAVERSE_TENANT_ID`, `DATAVERSE_CLIENT_ID` and
`DATAVERSE_CLIENT_SECRET`. See the [generator README](./packages/dataverse-sdk-generator) for every option.

Use generated entities (plain interfaces, with a metadata constant per table):

```typescript
import { formatEntityForWrite } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { type Account, AccountMetadata } from "./generated/entities/Account.js";
import { EntityMetadataCache } from "./generated/metadata.js";

const account: Account = {
  name: "Contoso Ltd",
  revenue: 5000000,
};

// formatEntityForWrite adds @odata.type and turns lookups into @odata.bind entries
const id = await client
  .api(`/${AccountMetadata.collectionName}`)
  .createAndGetId(
    formatEntityForWrite(account, AccountMetadata, { metadataCache: EntityMetadataCache })
  );
```

## 📚 Samples

Comprehensive sample projects demonstrating SDK capabilities:

### Node.js Samples

| Sample                                                             | Description                           | Features                                                     |
| ------------------------------------------------------------------ | ------------------------------------- | ------------------------------------------------------------ |
| **[node-cli-devicecode](./samples/node-cli-devicecode)**           | Interactive CLI with device code flow | MSAL device code, WhoAmI, basic queries                      |
| **[daemon-clientcredentials](./samples/daemon-clientcredentials)** | Daemon application (no user)          | Client credentials, bulk operations                          |
| **[actions-functions](./samples/actions-functions)**               | Typed actions & functions             | CreateMultiple, ExecuteWorkflow, WinOpportunity, file upload |
| **[batch-ops](./samples/batch-ops)**                               | $batch operations                     | Change sets, Content-ID refs, error handling                 |
| **[messages-sales-cs](./samples/messages-sales-cs)**               | Organization Service messages         | WinOpportunity, Merge, ExecuteWorkflow                       |
| **[metadata-ops](./samples/metadata-ops)**                         | Metadata operations                   | Entity/attribute creation, RetrieveMetadataChanges           |

### Browser Sample

| Sample                                           | Description                    | Features                                                                                                                                                                                                                                |
| ------------------------------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[spa-fluentui-v9](./samples/spa-fluentui-v9)** | React 18 SPA with Fluent UI v9 | A page per SDK area (queries, CRUD, concurrency, `$batch`, `OrganizationService`, messages, metadata, files, discovery, telemetry), each showing its code, result and every request; demo mode needs no org; MSAL loads only on sign-in |

## 🏗️ Architecture

### Design Principles

1. **ESM-Only**: All packages use ES Modules (no CommonJS)
2. **Zero Legacy Dependencies**: Native `fetch`, no axios/request
3. **Composable Packages**: Small, focused packages that can be used independently
4. **Type-Safe**: Strict TypeScript with no `any` in public APIs
5. **Middleware Pipeline**: Microsoft Graph SDK-inspired extensible middleware
6. **Two Front Doors**: HTTP-first + C#-familiar facades

### Package Dependency Graph

```
dataverse-sdk-core (foundation)
  ├─> auth-msal-browser
  ├─> auth-msal-node
  ├─> auth-azure-identity
  ├─> batch
  ├─> xrm
  │   └─> messages
  ├─> actions
  ├─> functions
  ├─> metadata
  ├─> files
  │   └─> actions
  ├─> entities-runtime (used by messages, actions, functions, xrm and generated code)
  ├─> discovery
  ├─> appinsights (optional)
  └─> otel (optional)

generator (dataverse-gen CLI)
  ├─> auth-msal-node
  ├─> metadata
  └─> entities-runtime
```

### Key Architectural Decisions (ADRs)

- [ADR-0001: Monorepo Architecture & Core SDK Design](./docs/adr/0001-architecture.md)
- [ADR-0002: Strict Typed Metadata](./docs/adr/0002-typed-metadata.md)
- [ADR-0003: Typed Actions & Functions](./docs/adr/0003-actions-functions.md)
- [ADR-0004: Messages (Direct Exports)](./docs/adr/0004-messages.md)
- [ADR-0005: File & Image Column Operations](./docs/adr/0005-file-image-operations.md)
- [ADR-0006: Bulk Operations Strategy](./docs/adr/0006-bulk-operations.md)
- [ADR-0007: Versioning & Release Strategy](./docs/adr/0007-versioning-release.md)
- [ADR-0008: Telemetry & Observability Strategy](./docs/adr/0008-telemetry-observability.md)
- [ADR-0009: Typed Per-Entity-Set Request Builders](./docs/adr/0009-typed-request-builders.md)

## 🧪 Testing

Every package has its own Vitest suite:

- **Unit and contract tests**: a real `DataverseClient` against a recording fake `fetch` (the internal [testing package](./packages/dataverse-sdk-testing)), asserting what reaches the wire; some core and metadata tests use MSW (Mock Service Worker)
- **Type tests**: tsd for TypeScript type correctness (actions, functions, messages and metadata)
- **Browser smoke tests**: the browser packages bundled with Vite and run in Chromium under a strict Content-Security-Policy (`pnpm test:browser`, [browser-tests](./packages/dataverse-sdk-browser-tests))
- **Integration tests**: live tests against a real Dataverse org, gated on `DATAVERSE_*` environment variables (`pnpm test:integration`, [integration-tests](./packages/dataverse-sdk-integration-tests))

Run tests:

```bash
# All tests
pnpm test

# Specific package
pnpm --filter @mohsinonxrm/dataverse-sdk-core test

# Watch mode
pnpm --filter @mohsinonxrm/dataverse-sdk-core test:watch
```

## 🛣️ Roadmap

### 2.0.0 (next release)

2.0.0 is the next major release after 1.0.0; the [2.0 migration guide](./docs/migration-2.0.md)
lists the breaking changes. It ships:

- ✅ Core HTTP pipeline with a customisable middleware pipeline, retry, adaptive concurrency and 401 recovery
- ✅ Authentication: MSAL (browser + node) and Azure Identity
- ✅ $batch operations with change sets
- ✅ OrganizationService facade
- ✅ Typed actions (<!-- count:actions -->1,072<!-- /count -->) and functions (<!-- count:functions -->209<!-- /count -->) of the platform, Sales and Customer Service
- ✅ Messages (<!-- count:messages -->1,072<!-- /count --> typed Organization Service messages)
- ✅ Metadata operations with strict typing
- ✅ File/image column operations (chunked and streamed upload, ranged download)
- ✅ FetchXML queries, with paging cookies and saved/user views
- ✅ Bulk operations (CreateMultiple, UpdateMultiple, etc.) as typed actions
- ✅ Global Discovery Service, in every cloud
- ✅ Entity and operation generator (`dataverse-gen`)
- ✅ Telemetry adapters (App Insights + OpenTelemetry)

### Planned

Not in 2.0.0:

- `waitForAsyncOperation()` poller for async jobs ([#318](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/318))
- Change tracking with delta links ([#319](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/319))
- Bulk helpers with chunking and per-record results ([#310](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/310))
- Adaptive throttling from the service-protection headers ([#309](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/309))
- Fault-injection middleware for testing apps against 429/5xx ([#308](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/308))
- Throttle, retry and batch telemetry events, and W3C trace context ([#97](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/97))
- A browser Application Insights adapter ([#158](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/158))
- Audit operations, circuit breaker & bulkhead middleware, advanced relationship patterns and the other items the ADRs promise ([#100](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/100))

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Clone repository
git clone https://github.com/mohsinonxrm/dataverse-sdk-typescript.git
cd dataverse-sdk-typescript

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint
```

### Monorepo Structure

```
dataverse-sdk-typescript/
├── packages/              # SDK packages
│   ├── dataverse-sdk-core/
│   ├── dataverse-sdk-auth-msal-node/
│   └── ... (16 published, plus 3 internal test packages)
├── samples/               # Sample applications
│   ├── node-cli-devicecode/
│   ├── spa-fluentui-v9/
│   └── ... (7 samples total)
├── tools/
│   └── generate-sdk-types/ # Generates the actions, functions, messages and metadata types
├── docs/                  # Documentation
│   ├── adr/              # Architecture Decision Records
│   ├── api/              # API guides
│   ├── mapping/          # API mapping docs
│   └── testing/          # Test strategy and matrix
├── .changeset/           # Changesets for versioning
└── turbo.json            # Turborepo configuration
```

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

See [LICENSE](./LICENSE) for full text.

### Why AGPL-3.0?

The AGPL-3.0 license ensures that:

- The SDK remains open source
- Any modifications must be shared back to the community
- Cloud services using this SDK must provide source code to users

For commercial licensing options, please contact the maintainers.

## 🙏 Acknowledgments

- **Microsoft Graph SDK**: Inspiration for middleware pipeline architecture
- **scottdurow/dataverse-gen**: Reference implementation for entity generation patterns
- **Microsoft Dataverse Team**: Comprehensive Web API documentation

## 📞 Support & Community

- **Documentation**: [Full API Docs](./docs/)
- **Issues**: [GitHub Issues](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mohsinonxrm/dataverse-sdk-typescript/discussions)

## 🔗 Links

- [Microsoft Dataverse Web API Reference](https://docs.microsoft.com/power-apps/developer/data-platform/webapi/overview)
- [OData v4.0 Specification](https://www.odata.org/documentation/)
- [MSAL.js Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js)

---

**Built with ❤️ for the Dataverse community**
