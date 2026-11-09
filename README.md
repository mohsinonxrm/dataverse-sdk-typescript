# Dataverse SDK for TypeScript

A modern, enterprise-grade TypeScript SDK for Microsoft Dataverse (Online), designed for both Node.js 22+ and modern browsers. Built with ESM-only architecture, native `fetch`, and comprehensive TypeScript typing.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Node Version](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3%2B-blue.svg)](https://www.typescriptlang.org/)

> **Upgrading from 1.x?** See the [2.0 migration guide](./docs/migration-2.0.md).

## 🧭 One main path

Every Dataverse call in this SDK goes through one `DataverseClient` and its middleware pipeline
(auth, retry, throttling, concurrency, telemetry). On that client, the documented way to work is:

1. **`client.api()`**: the fluent Web API request builder, for queries and CRUD (`$select`,
   `$filter`, `$expand`, paging, ETags, change tracking, FetchXML).
2. **Typed operations**: `client.execute(new WinOpportunityAction({ … }))`. The
   [actions](./packages/dataverse-sdk-actions) and [functions](./packages/dataverse-sdk-functions)
   packages hold a typed class for each Web API action and function of the platform, Sales and
   Customer Service; `queryFunctions` writes the `$filter` query functions.
3. **Generated types**: `dataverse-gen` writes interfaces for your tables, their create and update
   types, a typed client (`typed.accounts.byId(id).get()`), and classes for your custom APIs and
   other apps' operations.

The [batch](./packages/dataverse-sdk-batch), [metadata](./packages/dataverse-sdk-metadata),
[files](./packages/dataverse-sdk-files) and [discovery](./packages/dataverse-sdk-discovery)
packages add their own clients for `$batch` and bulk writes, schema changes, file columns and
environment discovery, on the same `DataverseClient`.

**Coming from the .NET SDK?** [`OrganizationService`](./packages/dataverse-sdk-xrm) and the
[messages](./packages/dataverse-sdk-messages) (`WinOpportunityRequest`, `CreateRequest`,
`ExecuteMultipleRequest`, …) are a compatibility layer with the .NET names, so `IOrganizationService`
code ports line by line. They send the same requests through the same client. New code should use
the main path; see [Coming from the .NET SDK](#-coming-from-the-net-sdk-compatibility-layer).

## 📦 Which package do I need?

| I want to…                                                                   | Install                                                              | Use                                                         |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------- |
| Query, create, update and delete records                                     | `dataverse-sdk-core` and an auth package                             | `client.api()`                                              |
| Sign in from a Node.js service, script or CLI                                | `dataverse-sdk-auth-msal-node` (or `-auth-azure-identity`)           | `MsalNodeTokenProvider`, `AzureIdentityTokenProvider`       |
| Sign in from a single-page app                                               | `dataverse-sdk-auth-msal-browser`                                    | `MsalBrowserTokenProvider`                                  |
| Call an action or function (`WinOpportunity`, `WhoAmI`, `ExportSolution`, …) | `dataverse-sdk-actions`, `dataverse-sdk-functions`                   | `client.execute(new <Name>Action(…))`                       |
| Filter with `LastXDays`, `Under`, `EqualUserId`, …                           | `dataverse-sdk-functions`                                            | `queryFunctions`                                            |
| Types for my tables, my custom APIs or another app's operations              | `dataverse-sdk-generator` (dev) and `dataverse-sdk-entities-runtime` | `dataverse-gen`, `createTypedClient()`                      |
| Send many requests in one call, or bulk-create and bulk-update records       | `dataverse-sdk-batch`                                                | `BatchRequestBuilder`, `createMultiple()`                   |
| Create tables, columns, relationships and choices                            | `dataverse-sdk-metadata`                                             | `MetadataClient`, `Metadata.*` builders                     |
| Upload and download file and image columns                                   | `dataverse-sdk-files`                                                | `FileColumnClient`                                          |
| Find the environments a user can open                                        | `dataverse-sdk-discovery`                                            | `DiscoveryClient`                                           |
| Send the SDK's telemetry to OpenTelemetry or Application Insights            | `dataverse-sdk-otel`, `dataverse-sdk-appinsights`                    | `OpenTelemetryClient`, `ApplicationInsightsTelemetryClient` |
| Port .NET code that uses `IOrganizationService` and `*Request` messages      | `dataverse-sdk-xrm`, `dataverse-sdk-messages`                        | `OrganizationService`, `<Name>Request`                      |

Every package name starts with `@mohsinonxrm/`.

### Main path

| Package                                                                                      | Description                                                                                      |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **[@mohsinonxrm/dataverse-sdk-core](./packages/dataverse-sdk-core)**                         | `DataverseClient`: the request builder, middleware pipeline, paging, change tracking, FetchXML   |
| **[@mohsinonxrm/dataverse-sdk-actions](./packages/dataverse-sdk-actions)**                   | Typed Web API actions (POST) of the platform, Sales and Customer Service                         |
| **[@mohsinonxrm/dataverse-sdk-functions](./packages/dataverse-sdk-functions)**               | Typed Web API functions (GET) of the platform, Sales and Customer Service, and `queryFunctions`  |
| **[@mohsinonxrm/dataverse-sdk-generator](./packages/dataverse-sdk-generator)**               | `dataverse-gen`: table types, typed client, form contexts, custom API and other apps' operations |
| **[@mohsinonxrm/dataverse-sdk-entities-runtime](./packages/dataverse-sdk-entities-runtime)** | What generated code imports: `EntityReference`, `formatEntityForWrite()`, `EntitySetClient`      |

### Specialised clients

| Package                                                                        | Description                                                                         |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| **[@mohsinonxrm/dataverse-sdk-batch](./packages/dataverse-sdk-batch)**         | `$batch` with change sets and Content-ID references; bulk create and update helpers |
| **[@mohsinonxrm/dataverse-sdk-metadata](./packages/dataverse-sdk-metadata)**   | `MetadataClient` and the `Metadata` builders, with strict metadata types            |
| **[@mohsinonxrm/dataverse-sdk-files](./packages/dataverse-sdk-files)**         | File and image columns: chunked and streamed upload, ranged download                |
| **[@mohsinonxrm/dataverse-sdk-discovery](./packages/dataverse-sdk-discovery)** | Global Discovery Service (Commercial, GCC, GCC High, DoD and China clouds)          |

### Authentication

| Package                                                                                            | Description                                                |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **[@mohsinonxrm/dataverse-sdk-auth-msal-browser](./packages/dataverse-sdk-auth-msal-browser)**     | MSAL browser token provider (SPA authentication)           |
| **[@mohsinonxrm/dataverse-sdk-auth-msal-node](./packages/dataverse-sdk-auth-msal-node)**           | MSAL node token provider (device code, client credentials) |
| **[@mohsinonxrm/dataverse-sdk-auth-azure-identity](./packages/dataverse-sdk-auth-azure-identity)** | Azure Identity token provider (DefaultAzureCredential)     |

### Telemetry (optional)

| Package                                                                            | Description                                                     |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **[@mohsinonxrm/dataverse-sdk-otel](./packages/dataverse-sdk-otel)**               | OpenTelemetry adapter: a span per request attempt               |
| **[@mohsinonxrm/dataverse-sdk-appinsights](./packages/dataverse-sdk-appinsights)** | Application Insights adapter, for Node.js and (`/browser`) SPAs |

### .NET compatibility layer

| Package                                                                      | Description                                                                                                                                                 |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[@mohsinonxrm/dataverse-sdk-xrm](./packages/dataverse-sdk-xrm)**           | `OrganizationService`: `create`, `retrieve`, `update`, `delete`, `associate`, `execute`, … with the .NET method names                                       |
| **[@mohsinonxrm/dataverse-sdk-messages](./packages/dataverse-sdk-messages)** | <!-- count:messages -->1,281<!-- /count --> `<Name>Request` / `<Name>Response` messages, plus the CRUD, `ExecuteMultiple` and `ExecuteTransaction` messages |

## 🚀 Quick Start

### Installation

```bash
# Core SDK + authentication
npm install @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-node @azure/msal-node

# Typed actions and functions
npm install @mohsinonxrm/dataverse-sdk-actions @mohsinonxrm/dataverse-sdk-functions
```

### Node.js (client credentials)

<!-- live -->

```typescript
import { ConfidentialClientApplication } from "@azure/msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const cca = new ConfidentialClientApplication({
  auth: {
    clientId: process.env.AZURE_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET!,
  },
});

const client = new DataverseClient({
  baseUrl: "https://yourorg.crm.dynamics.com",
  tokenProvider: new MsalNodeTokenProvider(cca, {
    flow: "clientCredentials",
    scopes: ["https://yourorg.crm.dynamics.com/.default"],
  }),
});

// Query with client.api(): get() resolves to the response body, { value: [...] } for a collection
const accounts = await client
  .api("/accounts")
  .select("name", "revenue")
  .filter("revenue gt 1000000")
  .orderBy("revenue desc")
  .top(10)
  .get<{ value: { name: string; revenue: number }[] }>();

// Create: resolves the new record's id
const id = await client.api("/accounts").createAndGetId({ name: "Contoso Ltd" });

// A typed operation: client.execute() resolves the function's typed result
const { UserId } = await client.execute(new WhoAmIFunction());
console.log(accounts.value.length, id, UserId);
```

### Browser (SPA with MSAL)

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
The [getting started guide](./docs/getting-started.md) walks through authentication and every
step below.

## 🎓 The Main Path

### 1. `client.api()`: queries and CRUD

<!-- live -->

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

// Delete
await client.api(`/accounts(${newAccount.accountid})`).delete();
```

Dataverse has no `$skip`: page with `iterate()`, `getAll()` or `getPage()`. The
[core README](./packages/dataverse-sdk-core/README.md) covers the builder in full: ETags,
duplicate detection, `@odata.bind`, impersonation, FetchXML, saved views, errors and timeouts.

### 2. Typed operations: actions and functions

Actions (POST, with side effects) and functions (GET) are classes that `client.execute()` runs.
Parameters go in one object, by their Web API names; the result is typed.

<!-- live -->

```typescript
import { CreateMultipleAction, WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";
import { RetrieveTotalRecordCountFunction } from "@mohsinonxrm/dataverse-sdk-functions";

// Bulk create (bound to the table's entity set)
const created = await client.execute(
  new CreateMultipleAction("accounts", {
    Targets: [
      { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 1" },
      { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 2" },
    ],
  })
);
console.log(created.Ids); // ['guid1', 'guid2']

// Win an opportunity
await client.execute(
  new WinOpportunityAction({
    OpportunityClose: {
      "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
      "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
      actualrevenue: 100000,
    },
    Status: 3, // Won
  })
);

// A function with parameters
const counts = await client.execute(
  new RetrieveTotalRecordCountFunction({ EntityNames: ["account", "contact"] })
);
console.log(counts.EntityRecordCountCollection);
```

The `$filter` query functions (`LastXDays`, `Under`, `In`, `EqualUserId`, …) aren't operations
you execute: `queryFunctions` writes them as filter expressions.

<!-- live -->

```typescript
import { odata } from "@mohsinonxrm/dataverse-sdk-core";
import { queryFunctions } from "@mohsinonxrm/dataverse-sdk-functions";

const mine = await client
  .api("/accounts")
  .filter(
    odata.and(
      queryFunctions.lastXDays({ PropertyName: "createdon", PropertyValue: 30 }),
      queryFunctions.equalUserId({ PropertyName: "ownerid" })
    )
  )
  .get();
```

The actions and functions packages hold the operations of the platform, Sales and Customer
Service, chosen by the solution each comes from (the
[solution table](./tools/generate-sdk-types/metadata/README.md#which-operations-are-prebuilt)
lists them). For Contact Center (`CCaaS_*`), Field Service, Project Operations, Customer
Insights - Journeys (`msdynmkt_*`) and the other apps, and for your own custom APIs, generate
typed classes from your org with `dataverse-gen`: see
[Generate the rest with dataverse-gen](./docs/getting-started.md#generate-the-rest-with-dataverse-gen).
They run with `client.execute()` the same way.

### 3. Generated types and the typed client

`dataverse-gen` reads your org's `$metadata` and writes an interface per table, its
`<Table>Create` and `<Table>Update` types, choices as enums, and the operations you name:

```bash
npm install -D @mohsinonxrm/dataverse-sdk-generator
npm install @mohsinonxrm/dataverse-sdk-entities-runtime

npx dataverse-gen init      # writes .dataverse-gen.json
npx dataverse-gen generate  # signs in and writes ./src/generated
```

```json
{
  "environmentUrl": "https://yourorg.crm.dynamics.com",
  "entities": ["account", "contact", "opportunity"],
  "actions": [],
  "functions": [],
  "typedClient": true,
  "output": { "outputRoot": "./src/generated" },
  "auth": { "flow": "clientCredentials" }
}
```

`actions` and `functions` list the operations to generate by name; an empty list generates all of
them. With the client-credentials flow, the tenant id, client id and secret come from
`DATAVERSE_TENANT_ID`, `DATAVERSE_CLIENT_ID` and `DATAVERSE_CLIENT_SECRET`. See the
[generator README](./packages/dataverse-sdk-generator) for every option, including validation
rules, form contexts for model-driven form scripts and incremental generation.

With `"typedClient": true`, `createTypedClient()` gives a typed request builder per table, keyed
by entity set name. Columns, create and update payloads are checked against your tables:

<!-- live -->

```typescript
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { createTypedClient } from "./generated/client.js";

const typed = createTypedClient(client);

const id = await typed.accounts.create({
  name: "Contoso",
  primarycontactid: createEntityReference("contact", contactId), // sent as @odata.bind
});
const account = await typed.accounts.byId(id).get({ select: ["name", "creditlimit"] });
const active = await typed.accounts.list({ select: ["name"], filter: "statecode eq 0", top: 50 });
await typed.accounts.byId(id).update({ creditlimit: 5000 });
console.log(account.name, active.length);
```

Without the typed client, the generated types work with `client.api()` directly:

<!-- live -->

```typescript
import { formatEntityForWrite } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { type AccountCreate, AccountMetadata } from "./generated/entities/Account.js";
import { EntityMetadataCache } from "./generated/metadata.js";

const account: AccountCreate = {
  name: "Contoso Ltd",
  creditlimit: 50000,
};

// formatEntityForWrite adds @odata.type and turns lookups into @odata.bind entries
const accountId = await client
  .api(`/${AccountMetadata.collectionName}`)
  .createAndGetId(
    formatEntityForWrite(account, AccountMetadata, { metadataCache: EntityMetadataCache })
  );
```

## ✨ 2.0 Features at a Glance

One short example each; the linked sections have the details.

### Change tracking

Read only what changed since the last sync, with a delta link
([core README](./packages/dataverse-sdk-core/README.md#change-tracking)):

<!-- live -->

```typescript
import { isDeltaLinkExpired } from "@mohsinonxrm/dataverse-sdk-core";

interface Account {
  accountid: string;
  name: string;
}

// First sync: every row, and the delta link to save
const first = await client.api("accounts").select("name").trackChanges<Account>();
let deltaLink = first.deltaLink;

// Later: rows created or updated, rows deleted, and the next delta link
try {
  const changes = await client.changesSince<Account>(deltaLink);
  console.log(
    changes.changed.length,
    changes.deleted.map((d) => d.id)
  );
  deltaLink = changes.deltaLink;
} catch (err) {
  if (!isDeltaLinkExpired(err)) throw err; // too old: run trackChanges() again
}
```

### Bulk create and update

`createMultiple()` and `updateMultiple()` chunk the records, send `CreateMultiple` /
`UpdateMultiple` (or `$batch` for tables without them) and return a result per record
([batch README](./packages/dataverse-sdk-batch/README.md#bulk-create-and-update)):

<!-- live -->

```typescript
import { createMultiple, getBulkOperationSupport } from "@mohsinonxrm/dataverse-sdk-batch";

const support = await getBulkOperationSupport(client, "account"); // { createMultiple: true, … }

const result = await createMultiple(
  client,
  { logicalName: "account", entitySetName: "accounts" },
  [{ name: "Contoso" }, { name: "Fabrikam" }],
  { batchSize: 100, strategy: "auto" }
);
for (const r of result.results) {
  if (r.status === "failed") console.error(`Record ${r.index}:`, r.error?.message);
}
console.log(support.createMultiple, result.succeeded);
```

### Waiting for a system job

`waitForAsyncOperation()` polls the `asyncoperation` that `ExecuteWorkflow`, `BulkDelete`,
`ImportSolutionAsync` and similar operations start
([core README](./packages/dataverse-sdk-core/README.md#waiting-for-system-jobs-asyncoperation)):

```typescript
import { waitForAsyncOperation } from "@mohsinonxrm/dataverse-sdk-core";
import { ExecuteWorkflowAction } from "@mohsinonxrm/dataverse-sdk-actions";

const started = await client.execute(new ExecuteWorkflowAction(workflowId, { EntityId: recordId }));
const job = await waitForAsyncOperation(client, started, { timeoutMs: 10 * 60_000 });
console.log(job.statuscode); // 30: succeeded (failed and canceled jobs reject)
```

### Resilience middleware

Retry with backoff, `Retry-After` and adaptive concurrency are on by default. Adaptive throttling,
the circuit breaker, the bulkhead and fault injection are opt-in middleware
([core README](./packages/dataverse-sdk-core/README.md#resiliency-features)):

<!-- live -->

```typescript
import {
  AdaptiveThrottlingMiddleware,
  BulkheadMiddleware,
  ChaosMiddleware,
  CircuitBreakerMiddleware,
  DataverseClient,
} from "@mohsinonxrm/dataverse-sdk-core";

const resilient = new DataverseClient({
  baseUrl,
  tokenProvider,
  middleware: {
    // Outermost: at most 2 writes at once, whatever the reads do
    prepend: [new BulkheadMiddleware({ limits: { read: 8, write: 2 } })],
    append: [
      // Slows down before a 429, from the service-protection headers
      new AdaptiveThrottlingMiddleware(),
      // Fails fast after 5 failures in a row, for 30 s
      new CircuitBreakerMiddleware({ failureThreshold: 5, breakDurationMs: 30_000 }),
    ],
  },
});

// In tests: answer 20% of the requests with a fake 429 or 503
const chaos = new ChaosMiddleware({
  percentage: 20,
  faults: [{ status: 429, retryAfterSeconds: 1 }, { status: 503 }],
});
```

### Telemetry and trace context

A telemetry adapter records a dependency per request attempt and sends its W3C `traceparent` to
Dataverse; throttling, retries, concurrency waits and `$batch` results arrive as events
(`dataverse.throttle`, `dataverse.retry`, …). See the
[core README](./packages/dataverse-sdk-core/README.md#telemetryclient):

<!-- live -->

```typescript
import { trace } from "@opentelemetry/api";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { OpenTelemetryClient } from "@mohsinonxrm/dataverse-sdk-otel";

const traced = new DataverseClient({
  baseUrl,
  tokenProvider,
  // A CLIENT span per attempt, a child of your active span
  telemetry: new OpenTelemetryClient({ tracer: trace.getTracer("my-app") }),
});

traced.trackEvent("import.started", { source: "csv" }); // your own event, same telemetry
```

For Application Insights, use `ApplicationInsightsTelemetryClient` from
[`@mohsinonxrm/dataverse-sdk-appinsights`](./packages/dataverse-sdk-appinsights) (Node.js) or
`@mohsinonxrm/dataverse-sdk-appinsights/browser` (SPAs).

### Metadata builders

`Metadata.*` builders write the create payloads for tables, columns, relationships and choices
([metadata README](./packages/dataverse-sdk-metadata/README.md#builders)):

```typescript
import { Metadata, MetadataClient } from "@mohsinonxrm/dataverse-sdk-metadata";

const metadata = new MetadataClient(client);

await metadata.createEntityDefinition(
  Metadata.entity("new_Project", {
    displayName: "Project",
    displayCollectionName: "Projects",
    primaryName: Metadata.primaryName("new_Name", { displayName: "Name" }),
    attributes: [Metadata.string("new_Code", { displayName: "Code", maxLength: 20 })],
  })
);
await metadata.createAttributeDefinition(
  "new_project",
  Metadata.picklist("new_Status", { displayName: "Status", options: ["Open", "Closed"] })
);
```

### Typed client

`createTypedClient()` from `dataverse-gen`: see
[Generated types and the typed client](#3-generated-types-and-the-typed-client).

## 🧩 Specialised Clients

### $batch

<!-- live -->

```typescript
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);

// Non-transactional requests
batch.addRequest("get-accounts", "GET", "/accounts?$top=5");

// Transactional change set
batch.beginChangeset();

// Create account; its id is the Content-ID, so later requests can refer to it as $create-account.
// No Prefer: return=representation on a request others refer to: Dataverse then doesn't
// register its Content-ID.
batch.addRequest(
  "create-account",
  "POST",
  "/accounts",
  { "Content-Type": "application/json" },
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

See the [batch README](./packages/dataverse-sdk-batch), and
[bulk vs batch](./docs/mapping/bulk-vs-batch.md) for when to use `$batch` and when the bulk
helpers.

### Metadata

`MetadataClient` creates, reads, updates and deletes tables, columns, relationships and choices,
with the [builders above](#metadata-builders) or the strict metadata types. See the
[metadata README](./packages/dataverse-sdk-metadata) and the
[metadata operations reference](./docs/api/metadata-operations.md).

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

## 🔁 Coming from the .NET SDK (Compatibility Layer)

`@mohsinonxrm/dataverse-sdk-xrm` and `@mohsinonxrm/dataverse-sdk-messages` keep the .NET names,
so code written against `IOrganizationService` reads the same:

- `OrganizationService` has `create`, `retrieve`, `retrieveMultiple`, `update`, `delete`,
  `associate`, `disassociate`, `execute`, plus `assign`, `setState` and `whoAmI` helpers. Each one
  is a `client.api()` call.
- Each message (`WinOpportunityRequest`, `ExportSolutionRequest`, `WhoAmIRequest`, …) sends the
  same request as the action or function of the same name, takes its parameters in one object
  (kept in `Parameters`) and returns a `<Name>Response` with `result`. `CreateRequest`,
  `RetrieveMultipleRequest` (FetchXML), `ExecuteMultipleRequest` and `ExecuteTransactionRequest`
  are there too, and `OrganizationRequest` sends any action by name.

Both run on the same `DataverseClient` and pipeline as the main path, so you can port first and
move to the main path call by call. For new code, use the main path: it has the Web API's own
shapes, and the typed client checks your columns.

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { createEntityReference, MergeRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const org = new OrganizationService(client);

// IOrganizationService.Create / Retrieve / Update / Delete
const accountId = await org.create("accounts", { name: "Fabrikam Inc" });
const account = await org.retrieve("accounts", accountId, { select: ["name"] });
await org.update("accounts", accountId, { websiteurl: "https://fabrikam.com" });

// IOrganizationService.Execute(new MergeRequest { ... })
await org.execute(
  new MergeRequest({
    Target: createEntityReference("account", targetAccountId),
    Subordinate: createEntityReference("account", subordinateAccountId),
    PerformParentingChecks: false,
  })
);

await org.delete("accounts", accountId);
console.log(account.name);
```

| .NET                                                        | Compatibility layer                                  | Main path                                                      |
| ----------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| `service.Create(entity)`                                    | `org.create("accounts", record)`                     | `client.api("accounts").createAndGetId(record)`                |
| `service.Retrieve(name, id, columnSet)`                     | `org.retrieve("accounts", id, { select })`           | ``client.api(`accounts(${id})`).select(…).get()``              |
| `service.RetrieveMultiple(query)`                           | `org.retrieveMultiple("accounts", { filter })`       | `client.api("accounts").filter(…).getAll()`                    |
| `service.Update(entity)`                                    | `org.update("accounts", id, changes)`                | ``client.api(`accounts(${id})`).ifMatch("*").patch(changes)``  |
| `service.Delete(name, id)`                                  | `org.delete("accounts", id)`                         | ``client.api(`accounts(${id})`).delete()``                     |
| `service.Execute(new WinOpportunityRequest)`                | `org.execute(new WinOpportunityRequest({ … }))`      | `client.execute(new WinOpportunityAction({ … }))`              |
| `service.Execute(new WhoAmIRequest())`                      | `org.execute(new WhoAmIRequest())`                   | `client.execute(new WhoAmIFunction())`                         |
| `ExecuteMultipleRequest`                                    | `new ExecuteMultipleRequest({ Requests, Settings })` | `BatchRequestBuilder`, `createMultiple()` / `updateMultiple()` |
| `CreateEntityRequest`, `CreateAttributeRequest` (.NET only) | (none)                                               | `MetadataClient` with the `Metadata` builders                  |

The [.NET SDK to TypeScript mapping](./docs/mapping/message-to-webapi.md#0-from-the-net-sdk-to-the-main-path)
has the full table, including Assign, SetState, Associate and early-bound types.

## 🔧 Middleware & Resiliency

### Built-in Middleware

In the order they run:

- **ODataHeadersMiddleware**: Standard OData headers (Accept, OData-Version, OData-MaxVersion), plus `defaultHeaders` and `defaultPrefer`
- **RetryMiddleware**: Retries 429 (throttling) for every request, and 502/503/504 for idempotent ones (GET, PUT, DELETE, PATCH with `If-Match`), with exponential backoff + jitter, honouring `Retry-After`
- **ConcurrencyMiddleware**: Adaptive concurrency using `x-ms-dop-hint` from Dataverse
- **AuthMiddleware**: Adds the bearer token; after a 401 gets a new one and retries once (when a token provider is set)
- **TelemetryMiddleware**: Diagnostic headers and W3C trace context; a dependency per attempt, exceptions and the SDK's telemetry events
- **LoggingMiddleware**: Request/response logging (when a `logger` is set)

Opt-in, added with the `middleware` option: `AdaptiveThrottlingMiddleware`,
`CircuitBreakerMiddleware`, `BulkheadMiddleware` and, for tests, `ChaosMiddleware` (see
[Resilience middleware](#resilience-middleware)).

### Custom Middleware

<!-- live -->

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
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
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
In a browser, use `@mohsinonxrm/dataverse-sdk-appinsights/browser`, on
`@microsoft/applicationinsights-web`.

### OpenTelemetry

<!-- live -->

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { OpenTelemetryClient } from "@mohsinonxrm/dataverse-sdk-otel";
import { trace } from "@opentelemetry/api";

const client = new DataverseClient({
  baseUrl: "https://yourorg.crm.dynamics.com",
  tokenProvider,
  // Without a tracer (or tracerProvider), the global tracer provider is used
  telemetry: new OpenTelemetryClient({ tracer: trace.getTracer("my-app") }),
});
```

## 📚 Samples

Comprehensive sample projects demonstrating SDK capabilities:

### Node.js Samples

| Sample                                                             | Description                                              | Features                                                     |
| ------------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| **[node-cli-devicecode](./samples/node-cli-devicecode)**           | Interactive CLI with device code flow                    | MSAL device code, WhoAmI, basic queries                      |
| **[daemon-clientcredentials](./samples/daemon-clientcredentials)** | Daemon application (no user)                             | Client credentials, bulk operations                          |
| **[actions-functions](./samples/actions-functions)**               | Typed actions & functions                                | CreateMultiple, ExecuteWorkflow, WinOpportunity, file upload |
| **[batch-ops](./samples/batch-ops)**                               | $batch operations                                        | Change sets, Content-ID refs, error handling                 |
| **[messages-sales-cs](./samples/messages-sales-cs)**               | Organization Service messages (.NET compatibility layer) | WinOpportunity, Merge, ExecuteWorkflow                       |
| **[metadata-ops](./samples/metadata-ops)**                         | Metadata operations                                      | Entity/attribute creation, RetrieveMetadataChanges           |

### Browser Sample

| Sample                                           | Description                                                              | Features                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **[spa-fluentui-v9](./samples/spa-fluentui-v9)** | React 18 SPA with Fluent UI v9; also the [explorer site](./docs/site.md) | An explorer for any Web API request or typed operation, with its SDK code, a request preview and the response; a page per SDK area (queries, CRUD, concurrency, `$batch`, `OrganizationService`, messages, metadata, files, discovery, telemetry), each showing its code, result and every request; demo mode needs no org; MSAL loads only on sign-in |

## 🏗️ Architecture

### Design Principles

1. **ESM-Only**: All packages use ES Modules (no CommonJS)
2. **Zero Legacy Dependencies**: Native `fetch`, no axios/request
3. **Composable Packages**: Small, focused packages that can be used independently
4. **Type-Safe**: Strict TypeScript with no `any` in public APIs
5. **Middleware Pipeline**: Microsoft Graph SDK-inspired extensible middleware
6. **One Main Path**: `client.api()` and typed operations, with `OrganizationService` and the messages as a .NET compatibility layer on the same client

### Package Dependency Graph

```
dataverse-sdk-core (foundation: DataverseClient, the pipeline, client.api())
  ├─> auth-msal-browser, auth-msal-node, auth-azure-identity
  ├─> entities-runtime (EntityReference, formatEntityForWrite, EntitySetClient)
  ├─> actions, functions (typed operations; use entities-runtime)
  ├─> batch
  ├─> metadata
  ├─> files (uses actions)
  ├─> discovery
  ├─> appinsights, otel (optional)
  └─> .NET compatibility layer
      ├─> messages (uses batch and entities-runtime)
      └─> xrm (uses messages and entities-runtime)

generator (dataverse-gen CLI)
  ├─> auth-msal-node
  ├─> metadata
  └─> entities-runtime (what generated code imports)
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
- **Integration tests**: live tests against a real Dataverse org, gated on `DATAVERSE_*` environment variables (`pnpm test:integration`, [integration-tests](./packages/dataverse-sdk-integration-tests)); the non-interactive Node samples run against the same org too (`pnpm samples:live`)

Run tests:

```bash
# All tests
pnpm test

# Specific package
pnpm --filter @mohsinonxrm/dataverse-sdk-core test

# Watch mode
pnpm --filter @mohsinonxrm/dataverse-sdk-core exec vitest
```

## 🛣️ Roadmap

### 2.0.0 (next release)

2.0.0 is the next major release after 1.0.0; the [2.0 migration guide](./docs/migration-2.0.md)
lists the breaking changes. It ships:

- ✅ Core HTTP pipeline with a customisable middleware pipeline, retry, adaptive concurrency and 401 recovery
- ✅ Resilience middleware: adaptive throttling from the service-protection headers, circuit breaker, bulkhead and fault injection (`ChaosMiddleware`)
- ✅ Authentication: MSAL (browser + node) and Azure Identity
- ✅ $batch operations with change sets
- ✅ Bulk helpers with per-record results (`createMultiple()`, `updateMultiple()`) and bulk-operation support detection
- ✅ Typed actions (<!-- count:actions -->1,072<!-- /count -->) and functions (<!-- count:functions -->209<!-- /count -->) of the platform, Sales and Customer Service, and `$filter` query functions
- ✅ Change tracking (`trackChanges()`, `changesSince()`) and `waitForAsyncOperation()` for system jobs
- ✅ Metadata operations with strict typing, and the `Metadata` builders
- ✅ File/image column operations (chunked and streamed upload, ranged download)
- ✅ FetchXML queries, with paging cookies and saved/user views
- ✅ Global Discovery Service, in every cloud
- ✅ Entity and operation generator (`dataverse-gen`): create/update types, validation rules, form contexts, incremental generation, custom templates and the typed client
- ✅ Telemetry adapters (OpenTelemetry, and Application Insights for Node.js and browsers), with telemetry events and W3C trace context
- ✅ .NET compatibility layer: `OrganizationService` and <!-- count:messages -->1,281<!-- /count --> typed messages, with the CRUD, `ExecuteMultiple` and `ExecuteTransaction` messages
- ✅ An SDK explorer site, built on the Fluent UI sample ([docs/site.md](./docs/site.md))

### Planned

[#100](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/100) indexes what the ADRs
and the v1 review promised: what shipped, what is tracked in its own issue and what was dropped.
New roadmap items get their own issue.

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
