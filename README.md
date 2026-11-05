# Dataverse SDK for TypeScript

A modern, enterprise-grade TypeScript SDK for Microsoft Dataverse (Online), designed for both Node.js 22+ and modern browsers. Built with ESM-only architecture, native `fetch`, and comprehensive TypeScript typing.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3%2B-blue.svg)](https://www.typescriptlang.org/)

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

| Package                                                                        | Description                                                      | Status      |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ----------- |
| **[@mohsinonxrm/dataverse-sdk-actions](./packages/dataverse-sdk-actions)**     | Typed Web API actions (POST operations with side effects)        | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-functions](./packages/dataverse-sdk-functions)** | Typed Web API functions (GET operations without side effects)    | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-messages](./packages/dataverse-sdk-messages)**   | 1,356+ typed Organization Service messages (direct exports)      | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-metadata](./packages/dataverse-sdk-metadata)**   | Strict metadata typing (EntityMetadata, AttributeMetadata, etc.) | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-files](./packages/dataverse-sdk-files)**         | File/image column operations with chunked upload/download        | ✅ Complete |

### Tools & Utilities

| Package                                                                                      | Description                                      | Status      |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------- |
| **[@mohsinonxrm/dataverse-sdk-generator](./packages/dataverse-sdk-generator)**               | Early-bound entity type generator from $metadata | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-entities-runtime](./packages/dataverse-sdk-entities-runtime)** | Runtime base classes for generated entities      | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-discovery](./packages/dataverse-sdk-discovery)**               | Global Discovery Service (Commercial cloud)      | ✅ Complete |

### Telemetry (Optional)

| Package                                                                            | Description                            | Status      |
| ---------------------------------------------------------------------------------- | -------------------------------------- | ----------- |
| **[@mohsinonxrm/dataverse-sdk-appinsights](./packages/dataverse-sdk-appinsights)** | Application Insights telemetry adapter | ✅ Complete |
| **[@mohsinonxrm/dataverse-sdk-otel](./packages/dataverse-sdk-otel)**               | OpenTelemetry telemetry adapter        | ✅ Complete |

## 🚀 Quick Start

### Installation

```bash
# Core SDK + authentication
npm install @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-node

# Or with pnpm
pnpm add @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-node
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

```typescript
import { DataverseClient } from '@mohsinonxrm/dataverse-sdk-core';
import { MsalBrowserTokenProvider } from '@mohsinonxrm/dataverse-sdk-auth-msal-browser';
import { PublicClientApplication } from '@azure/msal-browser';

// Configure MSAL
const msalInstance = new PublicClientApplication({
  auth: {
    clientId: 'your-app-registration-id',
    authority: 'https://login.microsoftonline.com/your-tenant-id',
    redirectUri: window.location.origin,
  },
});

// Create token provider
const tokenProvider = new MsalBrowserTokenProvider(msalInstance, {
  scopes: ['https://yourorg.crm.dynamics.com/user_impersonation'],
});

// Create client
const client = new DataverseClient({
  baseUrl: 'https://yourorg.crm.dynamics.com',
  tokenProvider,
});

// Use in React component
function AccountList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    client.api('/accounts')
      .select('name', 'revenue')
      .top(50)
      .get()
      .then(setAccounts);
  }, []);

  return <div>{/* Render accounts */}</div>;
}
```

## 🎓 Core Concepts

### Two Developer Experiences ("Front Doors")

#### 1. HTTP-First Fluent API (Microsoft Graph-like)

Modern, chainable API for web/Node.js developers:

```typescript
// OData query building
const highValueAccounts = await client
  .api("/accounts")
  .select("name", "revenue", "industrycode")
  .filter("revenue gt 5000000 and industrycode eq 6")
  .expand("primarycontactid($select=fullname,emailaddress1)")
  .orderBy("revenue desc")
  .top(25)
  .get<Account[]>();

// Create with return
const newAccount = await client
  .api("/accounts")
  .header("Prefer", "return=representation")
  .post<Account>({
    name: "Contoso Ltd",
    revenue: 10000000,
    industrycode: 6,
  });

// Update with optimistic concurrency
await client.api(`/accounts(${accountId})`).ifMatch(etag).patch({
  revenue: 12000000,
});

// Paging support
for await (const account of client.api("/accounts").select("name").iterate()) {
  console.log(account.name);
}
```

#### 2. OrganizationService Facade (C#-familiar)

Familiar API for Dataverse/C# developers:

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";

const org = new OrganizationService(client);

// Create
const accountId = await org.create("accounts", {
  name: "Fabrikam Inc",
  revenue: 5000000,
});

// Retrieve
const account = await org.retrieve("accounts", accountId, {
  select: ["name", "revenue"],
  expand: {
    primarycontactid: { select: ["fullname"] },
  },
});

// Update
await org.update(
  "accounts",
  accountId,
  {
    websiteurl: "https://fabrikam.com",
  },
  { etag: account["@odata.etag"] }
);

// Delete
await org.delete("accounts", accountId);

// Associate
await org.associate("accounts", accountId, "contact_customer_accounts", [contactId1, contactId2]);
```

### Typed Actions & Functions

Actions (POST with side effects):

```typescript
import { CreateMultipleAction, WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";

// Bulk create
const createMultiple = new CreateMultipleAction("accounts", [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 1" },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 2" },
]);

const result = await client.execute(createMultiple);
console.log(result.Ids); // ['guid1', 'guid2']

// Win opportunity
const winAction = new WinOpportunityAction(
  {
    opportunityid: opportunityId,
    "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
    actualrevenue: 100000,
    actualend: new Date(),
  },
  3
); // Status: Won

await client.execute(winAction);
```

Functions (GET without side effects):

```typescript
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const whoAmI = await client.execute(new WhoAmIFunction());
console.log(whoAmI.UserId);
```

### $batch Operations

```typescript
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);

// Non-transactional requests
batch.addRequest("get-accounts", "GET", "/accounts?$top=5");

// Transactional change set
batch.beginChangeset();

// Create account with Content-ID $1
batch.addRequest(
  "create-account",
  "POST",
  "/accounts",
  { "Content-Type": "application/json", Prefer: "return=representation" },
  { name: "Parent Account" }
);

// Create contact referencing $1
batch.addRequest(
  "create-contact",
  "POST",
  "/contacts",
  { "Content-Type": "application/json" },
  {
    firstname: "John",
    lastname: "Doe",
    "parentcustomerid_account@odata.bind": "$1", // References Content-ID
  }
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
  WhoAmIRequest,
  ExecuteWorkflowRequest,
  MergeRequest,
  WinOpportunityRequest,
} from "@mohsinonxrm/dataverse-sdk-messages";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";

const org = new OrganizationService(client);

// Platform messages (1,356+ available)
const whoAmI = await org.execute(new WhoAmIRequest());
console.log("User ID:", whoAmI.result.UserId);

// Execute workflow
const workflowRequest = new ExecuteWorkflowRequest(
  workflowId,
  recordId,
  {} // Input arguments
);
const workflowResponse = await org.execute(workflowRequest);

// Merge records
const mergeRequest = new MergeRequest(
  { logicalName: "account", id: targetAccountId },
  { logicalName: "account", id: subordinateAccountId },
  { name: "Merged Account Name" },
  false // PerformParentingChecks
);
await org.execute(mergeRequest);
```

### Metadata Operations

```typescript
import { MetadataClient, StringAttributeMetadataCreate } from "@mohsinonxrm/dataverse-sdk-metadata";

const metadata = new MetadataClient(client);

// Create custom entity
await metadata.createEntity({
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  SchemaName: "new_CustomEntity",
  DisplayName: {
    LocalizedLabels: [{ Label: "Custom Entity", LanguageCode: 1033 }],
  },
  PrimaryNameAttribute: "new_name",
  Attributes: [
    /* ... */
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

await metadata.createAttribute("new_custentity", attribute);
```

### File Upload (Chunked)

```typescript
import { FileColumnClient } from "@mohsinonxrm/dataverse-sdk-files";

const fileClient = new FileColumnClient(client);

// Upload with progress
await fileClient.upload(
  "accounts",
  accountId,
  "new_logo",
  logoFile, // Blob or Buffer
  {
    chunkSize: 4 * 1024 * 1024, // 4MB chunks
    onProgress: (uploaded, total) => {
      console.log(`Upload: ${Math.round((uploaded / total) * 100)}%`);
    },
  }
);

// Download
const file = await fileClient.download("accounts", accountId, "new_logo");
```

## 🔧 Middleware & Resiliency

The SDK includes production-grade middleware:

### Built-in Middleware

- **AuthMiddleware**: Automatic token acquisition and refresh
- **ODataHeadersMiddleware**: Standard OData headers (Accept, OData-Version, OData-MaxVersion)
- **RetryMiddleware**: Retries 429 (throttling) and ≥502 (transient failures) with exponential backoff + jitter
- **ConcurrencyMiddleware**: Adaptive concurrency using `x-ms-dop-hint` from Dataverse
- **TelemetryMiddleware**: Request/response tracking
- **LoggingMiddleware**: Structured logging

### Custom Middleware

```typescript
import { Middleware } from "@mohsinonxrm/dataverse-sdk-core";

const customMiddleware: Middleware = {
  name: "CustomMiddleware",
  async execute(request, next) {
    console.log(`Request: ${request.method} ${request.url}`);
    const response = await next(request);
    console.log(`Response: ${response.status}`);
    return response;
  },
};

const client = new DataverseClient({
  baseUrl: "https://yourorg.crm.dynamics.com",
  tokenProvider,
  middleware: [customMiddleware],
});
```

## 📊 Telemetry & Observability

### Application Insights

```typescript
import { ApplicationInsightsTelemetryClient } from "@mohsinonxrm/dataverse-sdk-appinsights";
import { ApplicationInsights } from "@azure/monitor-opentelemetry";

const appInsights = new ApplicationInsights({
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
});

const client = new DataverseClient({
  baseUrl: "https://yourorg.crm.dynamics.com",
  tokenProvider,
  telemetryClient: new ApplicationInsightsTelemetryClient(appInsights),
});
```

### OpenTelemetry

```typescript
import { OpenTelemetryClient } from "@mohsinonxrm/dataverse-sdk-otel";
import { trace } from "@opentelemetry/api";

const tracer = trace.getTracer("dataverse-sdk");

const client = new DataverseClient({
  baseUrl: "https://yourorg.crm.dynamics.com",
  tokenProvider,
  telemetryClient: new OpenTelemetryClient(tracer),
});
```

## 🔨 Early-Bound Entity Generation

Generate strongly-typed entity classes from your Dataverse metadata:

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
  "serverUrl": "https://yourorg.crm.dynamics.com",
  "output": "./src/generated",
  "entities": ["account", "contact", "opportunity"],
  "actions": true,
  "functions": true,
  "generateEnums": true
}
```

Use generated entities:

```typescript
import { Account } from "./generated/entities/Account";
import { Contact } from "./generated/entities/Contact";

// Type-safe entity creation
const account = new Account();
account.name = "Contoso Ltd";
account.revenue = 5000000;

const id = await account.save(client);
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

| Sample                                           | Description                    | Features                                      |
| ------------------------------------------------ | ------------------------------ | --------------------------------------------- |
| **[spa-fluentui-v9](./samples/spa-fluentui-v9)** | React 18 SPA with Fluent UI v9 | MSAL React, account management, responsive UI |

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
  ├─> discovery
  ├─> appinsights (optional)
  └─> otel (optional)

generator (standalone tool)
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

## 🧪 Testing

The SDK includes comprehensive test coverage with **435+ tests across all 16 packages (100% passing)**:

- **Unit Tests**: Vitest-based tests for all packages with mocked HTTP responses
- **Contract Tests**: MSW (Mock Service Worker) for HTTP behavior validation
- **Type Tests**: tsd for TypeScript type correctness (metadata package)
- **Integration Tests**: Gated tests against real Dataverse environments (post-v1.0)

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

### v1.0 (Current) - Complete ✅

- ✅ Core HTTP pipeline with middleware
- ✅ MSAL authentication (browser + node)
- ✅ $batch operations with change sets
- ✅ OrganizationService facade
- ✅ Typed actions/functions (minimal set)
- ✅ Messages (1,356+ typed Organization Service messages)
- ✅ Metadata operations with strict typing
- ✅ File/image column operations (chunked)
- ✅ Bulk operations (CreateMultiple, UpdateMultiple, etc.)
- ✅ Global Discovery Service
- ✅ Entity generator
- ✅ Telemetry adapters (App Insights + OpenTelemetry)

### v1.1 (Planned - Q3 2026)

- Expanded actions/functions coverage
- Expanded messages coverage
- Duplicate detection package
- Stream-based file operations
- Enhanced error handling and diagnostics

### v1.2+ (Future)

- Audit operations
- Async operation polling
- Circuit breaker & bulkhead patterns
- FetchXML query builder
- Relationship operations advanced patterns

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
│   └── ... (16 packages total)
├── samples/               # Sample applications
│   ├── node-cli-devicecode/
│   ├── spa-fluentui-v9/
│   └── ... (7 samples total)
├── docs/                  # Documentation
│   ├── adr/              # Architecture Decision Records
│   ├── mapping/          # API mapping docs
│   └── architecture/     # Technical docs
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
