# @mohsinonxrm/dataverse-sdk-core

> Core HTTP client and middleware pipeline for the Dataverse TypeScript SDK. Foundation package providing HTTP-first fluent API, adaptive resiliency, and extensible middleware architecture.

This package is the SDK's main path: `client.api()` for queries and CRUD, and
`client.execute()` for the typed operations of
[`@mohsinonxrm/dataverse-sdk-actions`](../dataverse-sdk-actions) and
[`@mohsinonxrm/dataverse-sdk-functions`](../dataverse-sdk-functions), or the classes and typed
client `dataverse-gen` writes. Every other package (batch, metadata, files, discovery, and the .NET
compatibility layer, `OrganizationService` and the messages) runs on this `DataverseClient` and its
pipeline. The [root README](../../README.md#-which-package-do-i-need) says which package does what.

## Features

- 🌐 **HTTP-first fluent API** - Graph-style request builder with full OData query support
- ⚡ **Resilience by default** - Automatic retry with exponential backoff and jitter for 429/502/503/504
- 🎯 **Adaptive concurrency** - Respects `x-ms-dop-hint` from Dataverse for optimal throughput
- 📄 **Smart paging** - AsyncIterable pattern with automatic `@odata.nextLink` following
- 🔌 **Extensible middleware** - Built-in auth, retry, concurrency, telemetry, and logging middleware
- 🎨 **Type-safe** - Full TypeScript support with strict types and typed error classes
- 🌍 **Universal** - Works in Node 22+ and modern browsers (ESM-only, uses native `fetch`)
- 🛡️ **Built-in validation** - Automatic URL length validation (32KB limit per Microsoft specs)
- 🔄 **Duplicate detection** - First-class support for Dataverse duplicate detection with typed errors
- 🔁 **Change tracking** - `trackChanges()` and `changesSince(deltaLink)` read only what changed since the last sync ([Change Tracking](#change-tracking))
- ⏳ **System jobs** - `waitForAsyncOperation()` polls an `asyncoperation` until it ends ([Waiting for System Jobs](#waiting-for-system-jobs-asyncoperation))
- 🛡️ **Opt-in resilience middleware** - adaptive throttling from the service-protection headers, circuit breaker, bulkhead, and `ChaosMiddleware` for fault-injection tests ([Resiliency Features](#resiliency-features))
- 📊 **Telemetry** - a dependency per request attempt with W3C trace context, and throttle, retry, concurrency and batch events ([TelemetryClient](#telemetryclient))

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-core
```

## Quick Start

```typescript
import { ConfidentialClientApplication } from "@azure/msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

// Token provider: an MSAL client application plus the flow and scopes to use
const cca = new ConfidentialClientApplication({
  auth: {
    clientId: "your-client-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
    clientSecret: process.env.CLIENT_SECRET!,
  },
});

// Create client with token provider
const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com", // Accepts env root or full /api/data/v9.2 URL
  tokenProvider: new MsalNodeTokenProvider(cca, {
    flow: "clientCredentials",
    scopes: ["https://org.crm.dynamics.com/.default"],
  }),
});

// Execute OData query with fluent API
const accounts = await client
  .api("accounts")
  .select("name", "accountnumber", "revenue")
  .filter("revenue gt 1000000")
  .orderBy("revenue desc")
  .top(10)
  .get<{ value: Account[] }>();

console.log(`Found ${accounts.value.length} accounts`);
```

## Core Concepts

### DataverseClient

The main entry point for all HTTP operations. Manages middleware pipeline, base URL normalization, and request execution.

```typescript
import { DataverseClient, Prefer } from "@mohsinonxrm/dataverse-sdk-core";
import { ConsoleLogger } from "@mohsinonxrm/dataverse-sdk-core"; // Opt-in console logger
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const client = new DataverseClient({
  // Required: Base URL (accepts environment root or full API path)
  baseUrl: "https://org.crm.dynamics.com", // Normalized to /api/data/v9.2

  // Optional: API version (default: 'v9.2')
  apiVersion: "v9.2",

  // Optional: Token provider for authenticated requests
  tokenProvider: myTokenProvider, // Must implement AccessTokenProvider interface

  // Optional: OAuth scopes (default based on baseUrl)
  scopes: ["https://org.crm.dynamics.com/.default"],

  // Optional: Retry configuration
  retry: {
    maxRetries: 6, // Default: 6 retries
    baseDelayMs: 3000, // Default: 3 seconds
    maxDelayMs: 30000, // Default: 30 seconds (max backoff)
    maxRetryAfterMs: 30000, // Default: maxDelayMs (a longer Retry-After is returned to you, not waited out)
    jitter: true, // Default: true (±20% on the computed backoff, never on Retry-After)
    retryableStatusCodes: [429, 502, 503, 504], // Default codes
    retryNonIdempotent: false, // Default: false (POST / PATCH without If-Match not replayed after 5xx)
    retryNetworkErrors: undefined, // Default: unset (idempotent requests are retried when fetch itself fails; false turns it off)
  },

  // Optional: Concurrency configuration
  concurrency: {
    maxConcurrentRequests: 8, // Default: 8 (Node.js and browsers); a value you set is used exactly
    adaptiveFromDopHint: true, // Default: true (follows x-ms-dop-hint, within min..max)
    min: 2, // Default: 2 (lowest limit the hint can set)
    max: 16, // Default: maxConcurrentRequests when set, otherwise 16 (highest limit the hint can set)
  },

  // Optional: Logger (implements Logger interface)
  logger: new ConsoleLogger(), // Default: none (the SDK logs nothing unless you pass a logger)
  logging: { fullUrls: false }, // Default: URLs logged as origin + path, keys as (…), query as ?…

  // Optional: Telemetry client (implements TelemetryClient interface)
  telemetry: myTelemetryClient,

  // Optional: Customise the middleware pipeline (see "Middleware Pipeline")
  middleware: { append: [customMiddleware] }, // also prepend, replace

  // Optional: Prefer values added to every request (a request's own value for the same preference wins)
  defaultPrefer: [Prefer.includeAnnotations("*")],

  // Optional: Custom fetch provider (for testing/mocking)
  fetchProvider: { fetch: customFetch },
});

// Access base URL (normalized)
const baseUrl = client.getBaseUrl(); // "https://org.crm.dynamics.com/api/data/v9.2"

// Create request builder
const builder = client.api("accounts"); // Relative path
const builder2 = client.api("/accounts(guid)"); // Absolute path
const builder3 = client.api("https://org.crm.dynamics.com/api/data/v9.2/accounts"); // Full URL

// Execute typed actions/functions (implements Executable<T>)
const result = await client.execute(new WhoAmIFunction());

// Create navigation property bindings
const binding = client.bind("parentcustomerid_account", "accounts", "account-guid");
// Returns: { "parentcustomerid_account@odata.bind": "/accounts(account-guid)" }
```

**Base URL Normalization:**

- `https://org.crm.dynamics.com` → `https://org.crm.dynamics.com/api/data/v9.2`
- `https://org.crm.dynamics.com/api/data/v9.2` → `https://org.crm.dynamics.com/api/data/v9.2`
- Trailing slashes are removed
- API version defaults to `v9.2`

### DataverseRequestBuilder

Fluent API for building OData-compliant Web API requests with method chaining.

```typescript
import { Prefer } from "@mohsinonxrm/dataverse-sdk-core";

// OData Query Options
client
  .api("accounts")
  .select("name", "accountnumber", "revenue") // $select (comma-separated)
  .filter("revenue gt 1000000 and statecode eq 0") // $filter (OData expression)
  .expand("primarycontactid", { select: ["fullname", "emailaddress1"] }) // $expand with options
  .expand("contact_customer_accounts", { select: ["fullname"], orderBy: "fullname", top: 5 }) // calls add up
  // or inline: .expand("primarycontactid($select=fullname,emailaddress1)")
  .orderBy("name asc", "revenue desc") // $orderby (multiple fields)
  .top(50) // $top (Dataverse has no $skip: page with @odata.nextLink, see iterate() / getAll())
  .count(true) // $count=true
  .apply("groupby((industrycode))"); // $apply (aggregation)

// HTTP Methods
await builder.get<T>(); // GET - returns single page
await builder.post<T>(body); // POST - create
await builder.createAndGetId(body); // POST - create, resolves the new id (from OData-EntityId)
// With Prefer: return=representation the id is only in the body: name the primary key
await builder.createAndGetId(body, {
  prefer: [Prefer.returnRepresentation()],
  primaryIdAttribute: "accountid",
});
await builder.patch<T>(body); // PATCH - update
await builder.put<T>(body); // PUT - full replace
await builder.delete(); // DELETE

// Non-JSON content: these send Accept: */* unless you set an Accept header
await client.api("$metadata").text(); // CSDL XML
await client.api(`annotations(${id})/documentbody/$value`).text();
await client.api(`accounts(${id})/entityimage/$value`).blob(); // or .arrayBuffer()

// All methods support optional RequestOptions
await builder.get({
  headers: { "Custom-Header": "value" },
  timeoutMs: 30000, // the whole request: attempts, retry waits and the wait for a slot
  attemptTimeoutMs: 10000, // optional: each attempt
  signal: abortController.signal,
});
```

`timeoutMs` is a deadline for the whole request, from the call until the response headers arrive:
every attempt, every retry wait (including `Retry-After`) and the wait for a concurrency slot. When it
passes, the request rejects with `DataverseNetworkError` named `RequestTimeout`, even if retries were
left. `attemptTimeoutMs` limits a single attempt; a timed-out attempt is not retried. A caller's
`signal` aborting rejects with `DataverseAbortError`. A caller's signal that times out
(`AbortSignal.timeout(ms)`) rejects like `timeoutMs`, with `DataverseNetworkError` named
`RequestTimeout`, and its `TimeoutError` is the `cause`. Neither the SDK's timers nor its listeners stay
on your `signal` after the request, so one signal can be shared by any number of requests.

### Fluent API Enhancements

#### Prefer Header Builder

Build complex `Prefer` headers using either fluent PreferBuilder or typed Prefer helper.

```typescript
import { Prefer } from "@mohsinonxrm/dataverse-sdk-core";

// Method 1: Prefer helper values (chains like any other builder method)
await client
  .api("/accounts")
  .prefer(Prefer.returnRepresentation(), Prefer.includeAnnotations("*"))
  .post({ name: "Contoso" });

// The same values as an array
await client
  .api("/accounts")
  .prefer([Prefer.returnRepresentation(), Prefer.includeAnnotations("*")])
  .post({ name: "Contoso" });

// Method 2: Raw string, for a preference without a helper
await client.api("/accounts").preferRaw("odata.maxpagesize=50").get();

// Method 3: Fluent PreferBuilder. prefer() with no arguments returns a PreferBuilder; done()
// returns the request builder, so the chain goes on:
const page = await client
  .api("/accounts")
  .prefer() // Returns a PreferBuilder
  .formattedValues() // odata.include-annotations="OData.Community.Display.V1.FormattedValue"
  .maxPageSize(50) // odata.maxpagesize=50
  .done() // Back to the request builder
  .get();

// Or configure it in a callback, which returns the request builder:
await client
  .api("/accounts")
  .prefer((p) => p.allAnnotations().maxPageSize(50))
  .get();
// PreferBuilder also has returnRepresentation(), allAnnotations() (odata.include-annotations="*"),
// continueOnError() and trackChanges() (odata.track-changes; see Change Tracking for the
// typed trackChanges() terminal, which reads the delta link and deleted rows for you).

// Prefer helper values available:
Prefer.returnRepresentation(); // 'return=representation'
Prefer.includeAnnotations("*"); // 'odata.include-annotations="*"'
Prefer.continueOnError(); // 'odata.continue-on-error'
```

`DataverseClientOptions.defaultPrefer` adds `Prefer` values to every request; a request that sets
the same preference keeps its own value.

#### ETag Operations (Optimistic Concurrency)

Convenient methods for optimistic concurrency control and upserts.

```typescript
// Retrieve entity with ETag
const account = await client.api(`/accounts(${accountId})`).get<{ "@odata.etag": string }>();
const etag = account["@odata.etag"]; // e.g., 'W/"12345678"'

// Optimistic concurrency - update only if not modified
await client
  .api(`/accounts(${accountId})`)
  .updateOnly(etag) // Alias for .ifMatch(etag)
  .patch({ name: "Updated Name" });

// Upsert - create only if doesn't exist (prevent overwrite)
await client
  .api(`/accounts(${accountId})`)
  .createOnly() // Alias for .ifNoneMatch('*')
  .patch({ name: "New Account" });

// Direct If-Match and If-None-Match headers
await client
  .api(`/accounts(${accountId})`)
  .ifMatch(etag) // Sets If-Match header
  .patch({ revenue: 2000000 });

await client
  .api(`/accounts(${accountId})`)
  .ifNoneMatch("*") // Sets If-None-Match: * header
  .patch({ name: "New" });

// Returns 412 Precondition Failed if condition not met
```

#### Duplicate Detection

Enable duplicate detection for create/update operations with specialized error handling.

```typescript
import { DataverseDuplicateError } from "@mohsinonxrm/dataverse-sdk-core";

try {
  // Enable duplicate detection (default is suppressed)
  await client
    .api("/accounts")
    .detectDuplicates() // Sets MSCRM.SuppressDuplicateDetection: false
    .post({
      name: "Contoso Ltd",
      telephone1: "555-1234",
    });
} catch (error) {
  if (error instanceof DataverseDuplicateError) {
    console.log(`Duplicate detection error: ${error.message}`);
    console.log(`Duplicate rule ID: ${error.duplicateRuleId}`);
    console.log(`Found ${error.duplicates.length} duplicate(s):`);

    // Access duplicate record details
    error.duplicates.forEach((dup) => {
      console.log(`  - ${dup["@odata.id"]}`);
      console.log(`    Name: ${dup.name}`);
    });

    // HTTP status is always 412 Precondition Failed
    console.log(`Status: ${error.status}`); // 412
  }
}

// Default behavior: duplicate detection is SUPPRESSED (follows Microsoft defaults)
await client.api("/accounts").post({ name: "Contoso" });
// Does NOT throw even if duplicates exist
```

**Implementation details:**

- Default: Duplicate detection is **suppressed** (matches Dataverse defaults)
- `.detectDuplicates()` explicitly enables detection
- Returns `DataverseDuplicateError` (extends `DataverseError`) for a 412 with Dataverse's
  duplicate code `0x80040333`. Any other 412, such as an `If-Match` etag mismatch (`0x80060882`),
  rejects with the usual `DataverseODataError`, even with `.detectDuplicates()` on
- Error includes `duplicates` array with record details from `error.innererror.duplicaterecords`,
  when Dataverse sends them (a plain duplicate-detection 412 carries only the code and message, so
  the array is often empty)
- Error includes `duplicateRuleId` from `error.innererror.duplicateruleid`, when present

#### Navigation Property Binding

Simplified syntax for binding single-valued and collection-valued navigation properties.

```typescript
// ========== Single-Valued Navigation (Lookup Fields) ==========

// Approach 1: Fluent bind() method, before the terminal call
await client.api("/contacts").bind("parentcustomerid_account", "accounts", accountId).post({
  firstname: "John",
  lastname: "Doe",
  emailaddress1: "john@contoso.com",
});
// The binding is merged into the body of post(), patch(), createAndGetId() and
// response("POST" | "PATCH", body). put() sends its body unchanged: use client.bind() there.

// Approach 2: client.bind() helper (manual spread)
await client.api("/contacts").post({
  firstname: "John",
  lastname: "Doe",
  ...client.bind("parentcustomerid_account", "accounts", accountId),
});
// client.bind() returns: { "parentcustomerid_account@odata.bind": "/accounts(guid)" }

// ========== Collection-Valued Navigation (Many-to-Many) ==========

// Associate single record
await client
  .api(`/accounts(${accountId})`)
  .associate("contact_customer_accounts", "contacts", contactId);
// POST /accounts(accountId)/contact_customer_accounts/$ref
// Body: { "@odata.id": "https://org.crm.dynamics.com/api/data/v9.2/contacts(contactId)" }

// Disassociate single record
await client.api(`/accounts(${accountId})`).disassociate("contact_customer_accounts", contactId);
// DELETE /accounts(accountId)/contact_customer_accounts(contactId)/$ref

// Associate several records: one $ref POST per id, in order (bindMany returns a Promise)
await client
  .api(`/accounts(${accountId})`)
  .bindMany("contact_customer_accounts", "contacts", [contactId1, contactId2, contactId3]);

// Or as a single $batch, with the executor from the batch package
import { createBindManyExecutor } from "@mohsinonxrm/dataverse-sdk-batch";
await client
  .api(`/accounts(${accountId})`)
  .bindMany("contact_customer_accounts", "contacts", ids, createBindManyExecutor());
```

**Navigation property binding details:**

- Single-valued: Uses `@odata.bind` annotation in request body
- Collection-valued: Uses `/$ref` endpoint for associate/disassociate
- `bindMany()` sends one `$ref` POST per id by default; it stops at the first failure (earlier ids stay associated). It never uses `eval` or `new Function`, so it works under a strict CSP
- All methods properly construct entity set paths and GUIDs
- The target can be a GUID (braces are removed) or an alternate key object, whose values are
  escaped: `bind("parentcustomerid_account", "accounts", { accountnumber: "O'Brien" })` binds
  `/accounts(accountnumber='O''Brien')`. Any other string is used as written.

#### OData Literals

Values put inside a URL must be OData literals: a string is wrapped in `'` with every embedded
`'` doubled. Interpolating `'${value}'` breaks on `O'Brien`, and a value from user input can change
the query. `odataLiteral`, `odataKey` and the `odata` filter helpers do the escaping.

```typescript
import { odata, odataKey, odataLiteral } from "@mohsinonxrm/dataverse-sdk-core";

// Filters: values are escaped and typed
client.api("contacts").filter(odata.and(odata.eq("lastname", input), odata.ge("createdon", since)));
client.api("contacts").filter(`_parentcustomerid_value eq ${odataLiteral.guid(accountId)}`);

// Keys: a GUID, or an alternate key object (escaped, and safe for the URL path)
client.api(`accounts(${odataKey({ accountnumber: input })})`); // accounts(accountnumber='O''Brien')
client.api(`EntityDefinitions(${odataKey({ LogicalName: "account" })})`);

// Function parameters, inline or as an alias (URL-encode an alias value)
client.api(`MyFunction(Name=${odataLiteral.string(input)})`);
client.api(`MyFunction(Name=@p1)?@p1=${encodeURIComponent(odataLiteral.string(input))}`);
```

| Helper                                    | Writes                                                |
| ----------------------------------------- | ----------------------------------------------------- |
| `odataLiteral.string("O'Brien")`          | `'O''Brien'`                                          |
| `odataLiteral.guid("{0000…}")`            | `0000…` (unquoted; anything but a GUID throws)        |
| `odataLiteral.int(5)` / `.number(1.5)`    | `5` / `1.5` (non-integers or non-finite throw)        |
| `odataLiteral.bool(true)`                 | `true`                                                |
| `odataLiteral.datetime(date)`             | `2024-05-01T08:30:00.000Z` (`Edm.DateTimeOffset`)     |
| `odataLiteral.date(date)`                 | `2024-05-01` (`Edm.Date`)                             |
| `odataLiteral.enum("NS.Type", ["A","B"])` | `NS.Type'A,B'` (a string `"A, B"` is split on commas) |
| `odataLiteral.duration("P1D")`            | `duration'P1D'`                                       |
| `odataLiteral.binary("a+b/c==")`          | `binary'a-b_c'` (base64url, no padding)               |
| `odataLiteral.json(value)`                | JSON, with record references as `@odata.id`           |
| `odataLiteral.reference(ref)`             | `{"@odata.id":"accounts(<id>)"}`                      |
| `odataLiteral.recordPath(ref)`            | `accounts(<id>)` (needs `ref.entitySetName`)          |
| `odataLiteral.value(v)`                   | picks one of the above from the JavaScript type       |
| `odataLiteral.parameter(v, "Edm.Guid")`   | picks one from the parameter's OData type (below)     |
| `odataKey(guid \| { col: value, … })`     | `guid` or `col='…',col2=5`, percent-encoded for paths |

A value that doesn't fit the helper throws `DataverseInvalidRequestError` (`InvalidParameter`)
instead of producing a broken URL.

`odataLiteral.parameter(value, odataType, kind?)` writes an operation parameter from its OData type
(`Edm.String`, `Edm.Guid`, `Edm.Int64`, an enum with `kind: "EnumerationType"`, an entity with
`"EntityType"`, a `"ComplexType"` or a `"Collection"`). It is the one OData literal serializer: the
generated functions and `formatParameterAlias` in `@mohsinonxrm/dataverse-sdk-entities-runtime`
call it.

```typescript
odataLiteral.parameter("O'Brien", "Edm.String"); // 'O''Brien'
odataLiteral.parameter(9007199254740993n, "Edm.Int64"); // 9007199254740993
odataLiteral.parameter("Entity, Attributes", "mscrm.EntityFilters", "EnumerationType");
// Microsoft.Dynamics.CRM.EntityFilters'Entity,Attributes'
odataLiteral.parameter(
  { logicalName: "account", id, entitySetName: "accounts" },
  "mscrm.crmbaseentity",
  "EntityType"
);
// {"@odata.id":"accounts(<id>)"}
```

#### URL Validation

Automatic validation against Microsoft's documented 32KB URL length limit with escape hatch.

```typescript
import { DataverseUrlError } from "@mohsinonxrm/dataverse-sdk-core";

try {
  // Build very long filter expression
  const longFilter = 'name eq "test" or ' + 'accountnumber eq "123" or '.repeat(1000);

  await client.api("/accounts").filter(longFilter).select("name", "accountnumber").get();
} catch (error) {
  if (error instanceof DataverseUrlError) {
    console.log(`URL exceeds maximum length`);
    console.log(`Actual: ${error.actualLength} bytes`);
    console.log(`Maximum: ${error.maxLength} bytes`);
    console.log(`Recommendation: ${error.message}`);
  }
}

// Skip validation for edge cases (use with caution)
await client
  .api("/accounts")
  .filter(veryLongFilter)
  .skipUrlValidation() // Bypasses client-side URL validation
  .get();
// Warning: Server may still reject requests exceeding limits
```

**URL validation details:**

- Default limit: **32KB** (32,768 bytes) per Microsoft documentation
- Validates full URL including query string before sending request
- Throws `DataverseUrlError` if limit exceeded
- `.skipUrlValidation()` disables check for edge cases
- Recommendation: Use `$batch` or [`fetchXml()`](#fetchxml) for complex queries exceeding limits

### Paging

Handle multi-page result sets efficiently with automatic `@odata.nextLink` following.

```typescript
// ========== Single Page (Default Behavior) ==========
const page1 = await client
  .api("accounts")
  .select("name", "accountnumber")
  .top(5000) // Request up to 5000 records
  .get<{ value: Account[] }>();

console.log(`Retrieved ${page1.value.length} accounts`);

// ========== Get Page with Next Link ==========
const pageResult = await client.api("accounts").select("name").getPage<Account>();

console.log(`Page has ${pageResult.value.length} records`);

if (pageResult["@odata.nextLink"]) {
  // Follow next link manually
  const page2 = await client.api(pageResult["@odata.nextLink"]).getPage<Account>();
  console.log(`Page 2 has ${page2.value.length} records`);
}

// ========== AsyncIterator (Automatic Paging) ==========
// Automatically follows @odata.nextLink until exhausted
for await (const account of client.api("accounts").select("name").iterate<Account>()) {
  console.log(account.name);
  // Yields individual records, not pages
}

// ========== Get All with Limits ==========
const allAccounts = await client.api("accounts").select("name", "accountnumber").getAll<Account>({
  maxItems: 1000, // Stop after 1000 total items
  maxPages: 10, // Stop after 10 pages
});

console.log(`Retrieved ${allAccounts.length} accounts`);
```

**Paging implementation details:**

- `.get()`: Returns single page as `T` (default behavior)
- `.getPage()`: Returns `PageResponse<T>` with `value` array and `@odata.nextLink`
- `.iterate()`: Returns `AsyncIterable<T>` that yields individual items across all pages. Nothing is
  sent until the first `next()`
- `.getAll()`: Collects all items into array with optional limits (`maxItems`, `maxPages`, both
  checked before the next page is requested) and an optional `signal`
- Pages after the first are requested with the first request's headers: `Prefer` (so
  `odata.maxpagesize` and `odata.include-annotations` hold on every page), `MSCRMCallerID` /
  `CallerObjectId` and custom headers. `If-Match` / `If-None-Match` apply to the first page only
- A `@odata.nextLink` to another origin is refused (`TokenOriginRefused`) before the token is sent
  there, unless that origin is in `allowedTokenOrigins`
- `PageIterator` class internally manages `@odata.nextLink` traversal
- Server-side paging limit: typically 5000 records per page (configurable in Dataverse)

### FetchXML

`fetchXml()` runs a FetchXML query and returns **one page** with its paging state. It doesn't loop,
so an app that keeps its own paging state (a query editor, a grid) can use it as is.

```typescript
import { buildPagedFetchXml, parsePagingCookie } from "@mohsinonxrm/dataverse-sdk-core";

let xml = `<fetch count="50" returntotalrecordcount="true">
  <entity name="account"><attribute name="name"/><attribute name="statecode"/><order attribute="name"/></entity>
</fetch>`;

let page = await client.fetchXml<Account>("accounts", xml); // or client.api("accounts").fetchXml(xml)
console.log(page.totalRecordCount); // 1234 (-1 without returntotalrecordcount="true")
console.log(page.value[0]["statecode@OData.Community.Display.V1.FormattedValue"]); // "Active"

while (page.moreRecords) {
  const next = parsePagingCookie(page.pagingCookie); // { pageNumber: 2, pagingCookie: "<cookie page=\"1\">…" }
  xml = buildPagedFetchXml(xml, {
    page: next?.pageNumber ?? 2,
    pagingCookie: next?.pagingCookie, // without a cookie, Dataverse pages by number
  });
  page = await client.fetchXml<Account>("accounts", xml);
}
```

`FetchXmlPage<T>` has:

| Field                           | From                                                                              |
| ------------------------------- | --------------------------------------------------------------------------------- |
| `value`                         | the records, with their annotations (formatted values, lookup logical names)      |
| `pagingCookie`                  | `@Microsoft.Dynamics.CRM.fetchxmlpagingcookie`, as sent; absent on the last page  |
| `moreRecords`                   | `@Microsoft.Dynamics.CRM.morerecords`; `false` when absent (the last page)        |
| `totalRecordCount`              | `@Microsoft.Dynamics.CRM.totalrecordcount`; `-1` without `returntotalrecordcount` |
| `totalRecordCountLimitExceeded` | `@Microsoft.Dynamics.CRM.totalrecordcountlimitexceeded` (more than 5000 rows)     |
| `nextLink`                      | `@odata.nextLink`, which saved and user queries can return                        |

- **Annotations.** `fetchXml()` sends `Prefer: odata.include-annotations="*"` by default, replacing
  any `include-annotations` preference on the builder or in `defaultPrefer` (Dataverse drops the
  paging annotations when it gets two). Pass `annotations: ["OData.Community.Display.V1.FormattedValue"]`
  to ask for less; `Microsoft.Dynamics.CRM.*` is added, because `moreRecords` and
  `totalRecordCount` come from it.
- **Encoding.** The query is encoded with `encodeURIComponent` (`%20` for spaces), as in Microsoft's samples.
- **Long queries.** A query whose GET URL would be longer than `maxUrlLength` (default 32,768
  characters, the Web API limit) is sent as a `POST $batch` that carries the GET, and returns the
  same page. Inside `$batch` the URL can be up to about 65,000 characters (beyond that Dataverse
  answers "Invalid URI: The Uri string is too long"), which is roughly 40–45 KB of FetchXML.
  Dataverse also allows at most 500 conditions in a query.
- **Views.** `client.savedQuery("accounts", id)` and `client.userQuery("accounts", id)` run a system
  or personal view and return the same page shape.
- `fetchXml()` can't be combined with `.select()`, `.filter()` and the other query options; they
  throw `DataverseInvalidRequestError` (`InvalidParameter`). Headers, `.impersonate()` and request
  options apply as usual.

### Change Tracking

Keep an external store in step with a table by reading only what changed since the last sync.
The table must have change tracking enabled: check `ChangeTrackingEnabled` with
`client.api("EntityDefinitions(LogicalName='account')").select("ChangeTrackingEnabled").get()`
(`account` has it on by default; once on, it can't be turned off).

```typescript
import { isDeltaLinkExpired } from "@mohsinonxrm/dataverse-sdk-core";

// First sync: every row, as of now, and the delta link (Prefer: odata.track-changes).
const first = await client.api("accounts").select("name", "revenue").trackChanges<Account>();
await store.replaceAll(first.changed);
await store.saveDeltaLink(first.deltaLink);

// Every later sync: rows created or updated, rows deleted, and the next delta link.
try {
  const changes = await client.changesSince<Account>(await store.loadDeltaLink());
  await store.upsert(changes.changed); // each row has its primary key, e.g. accountid
  await store.remove(changes.deleted.map((d) => d.id));
  await store.saveDeltaLink(changes.deltaLink);
} catch (err) {
  if (!isDeltaLinkExpired(err)) throw err;
  // Too old: start again with a full sync.
}
```

- **Results.** `trackChanges()` and `changesSince()` follow `@odata.nextLink` through every page
  and return `TrackedChanges<T>`: `changed` (new and updated rows), `deleted` (`{ id, reason }`,
  from the `$deletedEntity` entries) and `deltaLink`. For tables too large to hold in memory,
  `iterateChanges()` and `client.iterateChangesSince(deltaLink)` yield one `TrackedChangesPage<T>`
  at a time; the last page carries `deltaLink`. `maxPageSize` sets `odata.maxpagesize`.
- **Storing the delta link.** Save the whole `deltaLink` string (an absolute URL with a
  `$deltatoken`; it keeps the `$select` of the first sync), and save it only after the changes
  are applied, so a failed sync is retried from the same point. Replaying a delta link is safe: it
  returns the same changes again, plus newer ones. When nothing changed, `deltaLink` may be the
  one you passed in.
- **Expiry.** Dataverse keeps changes for `ExpireChangeTrackingInDays` days (an `organization`
  setting, 7 by default). An older delta link is refused with `ExpiredVersionStamp`
  (`0x80044352`), which `isDeltaLinkExpired(err)` recognises: run `trackChanges()` again and
  replace the store's contents.
- **Query options.** Dataverse doesn't support `$filter`, `$orderby`, `$expand` or `$top` with
  change tracking, so `trackChanges()` rejects them with `DataverseInvalidRequestError`
  (`InvalidParameter`) before sending. A response without a delta link (change tracking off)
  rejects with `NoDeltaLink`.
- A row created and deleted between two syncs comes back as deleted, though the store never had
  it. Deleted rows usually follow the changed ones. Reading changes needs organization-level read
  access to the table.

### Error Handling

Typed error classes for different failure scenarios.

```typescript
import {
  DataverseError, // Base class: every error the SDK throws is an instance
  DataverseODataError, // HTTP error response (4xx/5xx)
  DataverseThrottleError, // 429, with retryAfterMs
  DataverseNetworkError, // fetch failed (ConnectionFailed: DNS/TLS/CORS) or timed out (RequestTimeout: timeoutMs or AbortSignal.timeout())
  DataverseAbortError, // cancelled through an AbortSignal (name "AbortError")
  DataverseInvalidRequestError, // refused before sending (e.g. TokenOriginRefused)
  DataverseAuthenticationError, // auth helpers (e.g. EmptyAccessToken)
  DataverseUrlError, // client-side URL validation
} from "@mohsinonxrm/dataverse-sdk-core";

try {
  await client.api("accounts").get();
} catch (error) {
  if (error instanceof DataverseThrottleError) {
    console.log(`Throttled! Retry after ${String(error.retryAfterMs)} ms`);
  } else if (error instanceof DataverseODataError) {
    console.log(`HTTP ${error.status}, code ${error.code}: ${error.message}`);
    console.log("Request id for support:", error.requestId); // x-ms-service-request-id
    console.log("Correlation id:", error.correlationId); // the x-ms-correlation-id the SDK sent
    console.log("Headers:", error.headers); // lower-cased names
    console.log("Body:", error.body); // parsed JSON, or the text
    console.log("Inner error:", error.innerError?.message, error.innerError?.stacktrace);
  } else if (error instanceof DataverseAbortError) {
    // The caller cancelled; error.cause is the original DOMException.
  } else if (error instanceof DataverseNetworkError) {
    console.log(`${error.name}: ${error.message}`); // ConnectionFailed / RequestTimeout
  } else if (error instanceof DataverseError) {
    console.log(`Dataverse SDK error: ${error.message}`);
  }
}
```

Every `DataverseError` has `status?`, `code?`, `message`, `headers?`, `body?` (also `raw`),
`innerError?`, `requestId?`, `correlationId?`, `cause?` and `date`. Errors thrown by your own
middleware or token provider are passed through unchanged.

**Error hierarchy:**

```
DataverseError (base)
├── DataverseODataError (HTTP 4xx/5xx)
├── DataverseThrottleError (429, has retryAfterMs)
├── DataverseDuplicateError (412, has duplicates array)
├── DataverseBatchError (a failed $batch: partErrors, requestErrors, result; the batch package re-exports it)
├── DataverseUrlError (client-side validation)
├── DataverseNetworkError (ConnectionFailed, RequestTimeout)
├── DataverseAbortError (cancelled; name "AbortError")
├── DataverseInvalidRequestError (refused before sending)
├── DataverseAuthenticationError (auth helpers)
└── DataverseServiceError (DataverseServiceError.fromResponse helper)
```

### Middleware Pipeline

Customize request/response processing with middleware. All requests flow through the middleware pipeline in sequence.

```typescript
import { DataverseClient, LoggingMiddleware } from "@mohsinonxrm/dataverse-sdk-core";
import type {
  Middleware,
  RequestInformation,
  MiddlewareContext,
  NextMiddleware,
} from "@mohsinonxrm/dataverse-sdk-core";

// ========== Custom Middleware Implementation ==========
class CustomHeaderMiddleware implements Middleware {
  name = "CustomHeaderMiddleware"; // Required for logging/debugging

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    // Modify request before sending (header names are lower-case)
    request.headers["x-custom-header"] = "my-value";

    // Log request details
    ctx.logger?.info(`Sending ${request.method} ${request.url}`);

    // Call next middleware in pipeline
    const startTime = Date.now();
    const response = await next(request, ctx);
    const duration = Date.now() - startTime;

    // Process response
    ctx.logger?.info(`Response ${response.status} in ${duration}ms`);

    return response;
  }
}

// ========== Add Middleware to Client ==========
const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  tokenProvider,
  middleware: {
    // Runs last, right before fetch: sees the final headers, including authorization.
    append: [new CustomHeaderMiddleware()],
    // Runs first, before Auth.
    prepend: [],
    // Receives the built-in list (a fresh array) and returns the one to use.
    replace: (defaults) => defaults.filter((m) => !(m instanceof LoggingMiddleware)),
  },
});
```

The built-in classes (`AuthMiddleware`, `ODataHeadersMiddleware`, `ConcurrencyMiddleware`,
`RetryMiddleware`, `TelemetryMiddleware`, `LoggingMiddleware`), `buildDefaultMiddleware`,
`Pipeline` and `FetchRequestAdapter` are exported.

`request.url` in middleware does not include the query options the builder set: they are in
`request.query`. `buildUrl(request)` returns the exact URL `fetch` receives, encoded as described
in [URL Construction](#url-construction), so a request inspector never has to re-encode the query:

```typescript
import { buildUrl, type Middleware } from "@mohsinonxrm/dataverse-sdk-core";

const inspector: Middleware = {
  name: "inspector",
  execute: async (request, ctx, next) => {
    const url = buildUrl(request); // read before next(): later middleware may change the request
    const response = await next(request, ctx);
    console.log(request.method, url, response.status);
    return response;
  },
};
```

**Built-in Middleware (Execution Order):**

1. **prepend** middleware (if any)
2. **ODataHeadersMiddleware** - Sets `Accept`, `OData-Version`, `OData-MaxVersion`, a JSON `Content-Type` for JSON bodies, `defaultHeaders` and `defaultPrefer`
3. **RetryMiddleware** - Handles 429/502/503/504 with exponential backoff + jitter
4. **ConcurrencyMiddleware** - Semaphore-based rate limiting with adaptive concurrency, one slot per attempt
5. **AuthMiddleware** - Adds `Authorization: Bearer <token>` on every attempt; after a 401 gets a new token (passing a claims challenge) and retries once (only when a token provider is set)
6. **TelemetryMiddleware** - Diagnostic headers; tracks dependencies and exceptions
7. **LoggingMiddleware** - Logs request/response details (only when a logger is set)
8. **append** middleware (if any)
9. **FetchRequestAdapter** - Final adapter that calls native `fetch()`

**Middleware Features:**

- All middleware executes in sequence (not parallel)
- Each middleware can modify request before calling `next()`
- Each middleware can process response after `next()` returns
- Context (`MiddlewareContext`) provides access to logger and telemetry
- Middleware can access attempt number via `ctx.attempt` (for retry scenarios)
- Middleware can short-circuit by not calling `next()` (return early response)

### Advanced Features

#### Impersonation (MSCRMCallerID / CallerObjectId Headers)

Execute requests on behalf of another user.

```typescript
// By the user's Microsoft Entra object id (recommended: the same in every environment)
await client
  .api("accounts")
  .impersonateByObjectId(entraObjectId) // Sets CallerObjectId; same as impersonate(id, { by: "aadObjectId" })
  .post({ name: "Contoso" });

// By systemuserid
await client
  .api("accounts")
  .impersonate(systemUserId) // Sets MSCRMCallerID
  .post({ name: "Contoso" });
```

- Exactly one header is sent; a later `impersonate()` call replaces an earlier one. A request that
  would carry both (for example one set with `.header()`) is refused with
  `DataverseInvalidRequestError` (`InvalidParameter`) before it is sent.
- The calling identity needs the "Act on behalf of another user" privilege (System Administrators
  have it). The request then runs with the impersonated user's privileges: a user without them gets
  `0x80040220` naming that user. `createdby` is the impersonated user and `createdonbehalfby` the caller.
- `WhoAmI` returns the calling identity either way, so it can't be used to check impersonation.
- Pages after the first carry the same header (see [Paging](#paging)).

#### Custom Headers

Set Dataverse-specific or custom HTTP headers per request.

```typescript
// Suppress duplicate detection (default)
await client
  .api("/accounts")
  .header("MSCRM.SuppressDuplicateDetection", "true") // Default behavior
  .post({ name: "Contoso" });

// Bypass custom plugin execution
await client
  .api("/accounts")
  .header("MSCRM.BypassCustomPluginExecution", "true")
  .post({ name: "Test Account" });

// Solution-aware operations
await client
  .api("/accounts")
  .header("MSCRM.SolutionUniqueName", "MySolution")
  .post({ name: "Solution-Specific Account" });

// Merge labels (for localization)
await client.api("/accounts").header("MSCRM.MergeLabels", "true").patch({ name: "Updated" });

// Chain multiple headers
await client
  .api("/contacts")
  .header("Custom-Header-1", "value1")
  .header("Custom-Header-2", "value2")
  .get();
```

#### Execute Typed Actions/Functions

Execute actions/functions that implement the `Executable<T>` interface.

```typescript
import type { Executable } from "@mohsinonxrm/dataverse-sdk-core";

// Example: WhoAmI function implementation
class WhoAmIFunction implements Executable<WhoAmIResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    return {
      method: "GET",
      url: `${baseUrl}/WhoAmI`,
      headers: {},
    };
  }

  async parseResponse(response: Response): Promise<WhoAmIResponse> {
    return response.json();
  }
}

interface WhoAmIResponse {
  UserId: string;
  BusinessUnitId: string;
  OrganizationId: string;
}

// Execute via client
const result = await client.execute(new WhoAmIFunction());
console.log(`User ID: ${result.UserId}`);
console.log(`Business Unit: ${result.BusinessUnitId}`);
console.log(`Organization: ${result.OrganizationId}`);
```

**Executable Pattern:**

- Actions/functions in `@mohsinonxrm/dataverse-sdk-actions` and `@mohsinonxrm/dataverse-sdk-functions` implement this interface
- `toRequestInformation()` builds the HTTP request (method, URL, headers, body)
- `parseResponse()` deserializes the response into typed result
- Enables type-safe execution with IntelliSense support

#### Waiting for System Jobs (asyncoperation)

Bulk delete, `ExecuteWorkflow`, `ImportSolutionAsync`, `ExportSolutionAsync`, data import and
similar operations start a system job (an `asyncoperation` record) and return at once.
`waitForAsyncOperation(client, job, options?)` reads the job until it completes:

```typescript
import {
  DataverseAsyncOperationError,
  waitForAsyncOperation,
} from "@mohsinonxrm/dataverse-sdk-core";

const response = await client.api("BulkDelete").post<{ JobId: string }>({
  QuerySet: [
    {
      EntityName: "account",
      Criteria: {
        FilterOperator: "And",
        Conditions: [
          {
            AttributeName: "name",
            Operator: "Equal",
            Values: [{ Type: "System.String", Value: "Old" }],
          },
        ],
      },
    },
  ],
  JobName: "Delete old accounts",
  SendEmailNotification: false,
  ToRecipients: [],
  CCRecipients: [],
  RecurrencePattern: "",
  StartDateTime: new Date().toISOString(),
});

try {
  const job = await waitForAsyncOperation(client, response, {
    timeoutMs: 10 * 60_000, // give up after 10 minutes (the job keeps running)
    onProgress: (op) => console.log(`statecode ${op.statecode}, statuscode ${op.statuscode}`),
  });
  console.log(`Completed on ${job.completedon}`);
} catch (err) {
  if (err instanceof DataverseAsyncOperationError) {
    console.error(err.reason, err.message, err.code); // "failed" | "canceled" | "timeout"
  }
  throw err;
}
```

- **What it takes:** the job's id, or the response that names it: `{ JobId }` (`BulkDelete`,
  `BulkDetectDuplicates`), `{ AsyncOperationId }` (the `…Async` actions) or the `asyncoperation`
  record itself (`ExecuteWorkflow`, `ImportRecordsImport`, …). `null` (an action that answered 204)
  and values that aren't GUIDs throw `DataverseInvalidRequestError` before anything is sent.
- **Polling:** the first read is immediate; then it waits `intervalMs` (default 2 s), each wait
  `backoff` (default 1.5) times longer, up to `maxIntervalMs` (default 30 s). Each read is
  `GET asyncoperations(<id>)?$select=…` through the client, so its retry, concurrency, auth and
  logging apply. `select` adds columns; `requestOptions` (headers, `middlewareOptions`, …) apply
  to every read.
- **Outcome:** it resolves with the job when `statuscode` is Succeeded (30). Failed (31) and
  Canceled (32) reject with `DataverseAsyncOperationError` (`reason` `"failed"` or `"canceled"`):
  its `message` is the job's `friendlymessage` (else `message`), `code` is the job's `errorcode`
  in hex (e.g. `"0x80040265"`) and `operation` is the job as read. A suspended job (statecode 1) is
  waited for like any other.
- **Bounds:** no time limit by default. `timeoutMs` rejects with `reason: "timeout"` (and the last
  state as `operation`); `signal` rejects with `DataverseAbortError`. Either way, only the waiting
  stops: the job keeps running in Dataverse.
- **Read errors** pass through: a job that doesn't exist (or that was deleted when it succeeded, as
  workflows set to delete completed jobs do) rejects with `DataverseODataError`, status 404.
- `AsyncOperationStateCode` and `AsyncOperationStatusCode` name the `statecode` and `statuscode`
  values, for `onProgress`.

#### Optimistic Concurrency (Full Example)

```typescript
// Retrieve entity with ETag
const account = await client
  .api(`/accounts(${accountId})`)
  .select("name", "revenue", "telephone1")
  .get<Account & { "@odata.etag": string }>(); // every record comes back with its ETag

const etag = account["@odata.etag"]; // e.g., 'W/"12345678"'

try {
  // Update with If-Match header (fails if record changed)
  await client.api(`/accounts(${accountId})`).ifMatch(etag).patch({ revenue: 5000000 });

  console.log("Update successful");
} catch (error) {
  if (error instanceof DataverseODataError && error.status === 412) {
    console.log("Precondition failed - record was modified by another user");
    // Retrieve latest version and retry
  }
}

// Alternatively, use updateOnly() alias
await client.api(`/accounts(${accountId})`).updateOnly(etag).patch({ revenue: 5000000 });
```

## Architecture

### Request Flow

```
User Code (client.api().get())
   ↓
DataverseRequestBuilder.send()
   ↓
RequestInformation (method, url, headers, query, body)
   ↓
Pipeline.execute()
   ↓
Middleware Chain (sequential execution)
   ├─ prepend middleware (user-provided, optional)
   ├─ ODataHeadersMiddleware (add OData headers, defaultHeaders, defaultPrefer)
   ├─ RetryMiddleware (retry on 429/502/503/504)
   ├─ ConcurrencyMiddleware (rate limiting, a slot per attempt)
   ├─ AuthMiddleware (Bearer token per attempt; one refresh-and-retry after a 401)
   ├─ TelemetryMiddleware (diagnostic headers, a dependency and traceparent per attempt)
   ├─ LoggingMiddleware (log requests, when a logger is set)
   └─ append middleware (user-provided, optional)
   ↓
FetchRequestAdapter.send()
   ↓
Native fetch() API
   ↓
HTTP Response
   ↓
Middleware Chain (response processing in reverse)
   ↓
DataverseRequestBuilder (parse response or throw error)
   ↓
User Code (typed result)
```

### Middleware Execution Order

**Request Phase (top-down):**

1. `prepend` middleware (if any)
2. ODataHeadersMiddleware - Adds `Accept`, `Content-Type`, `OData-Version`, `OData-MaxVersion`, `defaultHeaders`, `defaultPrefer`
3. RetryMiddleware - Wraps the rest of the chain with retry logic (adds `retry-attempt` on retries)
4. ConcurrencyMiddleware - Acquires a semaphore slot for this attempt (blocks if at max concurrency)
5. AuthMiddleware - Calls `tokenProvider.getToken()` (every attempt) and adds `Authorization` header
6. TelemetryMiddleware - Adds diagnostic headers, starts the attempt's dependency and adds its `traceparent`
7. LoggingMiddleware - Logs request details
8. `append` middleware (if any)
9. FetchRequestAdapter - Calls `fetch(url, { method, headers, body })`

**Response Phase (bottom-up):**

1. FetchRequestAdapter - Returns Response object
2. `append` middleware
3. LoggingMiddleware - Logs response status and duration
4. TelemetryMiddleware - Ends the dependency with its result; a `dataverse.throttle` event for a 429
5. AuthMiddleware - On a 401, gets a new token (with the claims challenge, if any) and resends once
6. ConcurrencyMiddleware - Releases the semaphore slot, adjusts limit based on `x-ms-dop-hint` header
7. RetryMiddleware - Checks status code, waits and retries if 429/502/503/504 and attempts < maxRetries (the wait holds no slot)
8. ODataHeadersMiddleware - (no response processing)
9. `prepend` middleware

### Resiliency Features

#### Token per attempt and 401 recovery

- `AuthMiddleware` runs inside `RetryMiddleware`, so every attempt gets a current token from the
  provider (providers cache, so this is cheap) and a long retry wait can't send an expired token.
- After a `401`, it gets a new token and resends the request **once**. If `WWW-Authenticate` carries a
  Conditional Access / CAE claims challenge, the decoded claims go to `getToken(scopes, { claims })`;
  otherwise it calls `getToken(scopes, { forceRefresh: true })`. A second `401` is returned as the error
  (with `headers["www-authenticate"]`). Turn it off with `refreshTokenOn401: false`.
- In browsers, Dataverse doesn't expose `WWW-Authenticate` to scripts (not a CORS-exposed header), so
  claims can't be read there; the recovery is always a forced refresh. `parseClaimsChallenge(header)` is
  exported for handling a challenge yourself in Node.js.
- `getToken` also receives the request's `correlationId`.

#### Retry with Exponential Backoff

- **Retryable status codes:** 429 (throttle), 502/503/504 (server errors); change with `retryableStatusCodes`
- **Default settings:**
  - `maxRetries: 6`
  - `baseDelayMs: 3000` (3 seconds)
  - `maxDelayMs: 30000` (30 seconds)
  - `maxRetryAfterMs`: same as `maxDelayMs`
  - `jitter: true` (±20% on the computed backoff)
  - `retryNonIdempotent: false`; `retryNetworkErrors` unset (idempotent requests are retried after a network error)
- **Retry-After header:** Waited out exactly (no jitter) when it is at most `maxRetryAfterMs`. A longer
  `Retry-After` is not waited out: the response is returned at once (a 429 throws
  `DataverseThrottleError` with `retryAfterMs`), so your code decides whether to wait. Delta-seconds
  (including decimals such as `1.5`) and HTTP-dates are both understood.
- **Backoff formula:** `min(maxDelayMs, baseDelayMs * 2^attempt)`, then ±20% jitter (still capped at `maxDelayMs`)
- **Methods:** 429 is retried for every method (Dataverse rejects throttled requests before doing any
  work). After 502/503/504 only idempotent requests are replayed: GET, HEAD, OPTIONS, PUT, DELETE, and
  PATCH with `If-Match`. The one exception for 429: a non-idempotent request (such as a `$batch`
  POST) whose 429 response has a `multipart/mixed` body is handed back, not replayed, because
  Dataverse processed the batch and some of its parts may have run.
- **Network errors:** a `fetch` rejection becomes a `DataverseNetworkError` named `ConnectionFailed`
  (the original error is its `cause`). By default, idempotent requests (GET, HEAD, OPTIONS, PUT,
  DELETE, and PATCH with `If-Match`) are retried with backoff, as after a 503. POST and other PATCHes
  aren't, because the connection can drop after Dataverse applied them. They are retried only with both
  `retryNetworkErrors: true` and `retryNonIdempotent: true`. `retryNetworkErrors: false` turns
  network-error retries off. Aborts, timeouts and requests with a stream body are never retried.
- **`shouldRetry(statusCode, error?)`:** replaces the status-code, method and network-error checks
  (called with status `0` for a network error); the counts and delays still apply.
- **Watching retries:** `onRetry(info)` runs once before each retry, with `attempt`, `maxRetries`,
  `status` (0 for a network error), `delayMs`, `retryAfterMs`, `correlationId` and the request. A
  per-request `onRetry` replaces the client's; an error it throws is logged and ignored.
  `getRetryAttempts(res)` returns every attempt behind a response from `send()` or `response()`:

  ```typescript
  const client = new DataverseClient({
    baseUrl,
    tokenProvider,
    retry: {
      onRetry: ({ attempt, maxRetries, status, delayMs }) =>
        console.log(
          `HTTP ${status}, retrying in ${Math.round(delayMs / 1000)} s (${attempt}/${maxRetries})`
        ),
    },
  });
  const res = await client.api("accounts").response();
  getRetryAttempts(res); // [{ attempt: 0, status: 429, retryAfterMs: 12000, delayMs: 12000 }, { attempt: 1, status: 200 }]
  ```

- **Per request:** the same `RetryOptions` type overrides the client's values for one request, e.g.
  `client.api("accounts").get({ middlewareOptions: new MiddlewareRequestOptions([{ type: "retry", maxRetries: 0 }]) })`.
- **Retry-Attempt header:** Added to retried requests for server-side diagnostics (turn off with
  `diagnosticHeaders: { retryAttempt: false }`)
- **Streams:** a request with a `ReadableStream` body is never retried (it can be read only once), and neither is a response whose `Content-Type` is binary (`application/octet-stream`, `application/pdf`, `image/*`, `video/*`, `audio/*`)
- **Discarded responses:** the body of a response that is retried is cancelled at once, so the
  connection goes back to the pool instead of waiting for garbage collection. The response you
  get back (success, or the last failure when retries run out) is never read by the retry logic.

#### Adaptive Throttling (Service-Protection Headers)

Every Web API response tells you how much of the user's
[service protection](https://learn.microsoft.com/power-apps/developer/data-platform/api-limits)
budget is left in the 5-minute window: `x-ms-ratelimit-burst-remaining-xrm-requests` (requests,
e.g. `7999`) and `x-ms-ratelimit-time-remaining-xrm-requests` (combined execution time, e.g.
`1,200.00`). The opt-in `AdaptiveThrottlingMiddleware` reads them and slows down before a 429
instead of only reacting after one:

```typescript
import { AdaptiveThrottlingMiddleware, DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const throttle = new AdaptiveThrottlingMiddleware({
  threshold: 0.2, // start slowing down below 20% of either budget (default)
  maxSpacingMs: 2000, // gap between request starts when a budget is used up (default)
  onDelay: ({ delayMs, reason }) => console.log(`Holding a request ${delayMs} ms (${reason})`),
});

const client = new DataverseClient({
  baseUrl,
  tokenProvider,
  // append: it runs inside the retry middleware, so it sees every attempt's response, 429s included
  middleware: { append: [throttle] },
});

throttle.status; // { requestsRemaining, requestBudget, timeRemaining, timeBudget, pressure, spacingMs, pausedUntil? }
```

- **Spacing:** while both budgets are above `threshold` of their full value, nothing changes. Below
  it, request starts are spaced out, in turn, by up to `maxSpacingMs` as the lower budget nears
  empty. The full value is the highest value seen. Readings older than 5 minutes are dropped. Set
  `requestBudget` / `timeBudget` when you know the limits, e.g. if your app may start with a
  budget that is already partly used.
- **Pause after a 429:** a 429 with `Retry-After` holds every new request until the wait has
  passed, not only the one that was throttled, because Dataverse rejects the user's requests until
  then anyway. The retry middleware still retries the throttled request. Turn it off with
  `pauseOnRetryAfter: false`; `maxPauseMs` (default 30 s) caps it. A held request still honours
  its `signal` and `timeoutMs`.
- **A soft brake, not a guarantee:** Microsoft documents these headers as being for debugging.
  Each web server counts on its own, and in Node.js (no affinity cookie) consecutive responses may
  come from different servers. The middleware lowers the odds of a 429; the retry middleware still
  handles the ones that come.
- **Browsers:** Dataverse doesn't expose the two headers to CORS, so in a browser only the pause
  after a 429 applies (`Retry-After` is exposed).

#### Adaptive Concurrency

- **Default limit:** 8 requests at once (`concurrency.maxConcurrentRequests`), in Node.js and browsers.
  A value you set is used exactly: `maxConcurrentRequests: 1` sends one request at a time.
- **Adaptive tuning:** on by default (`adaptiveFromDopHint`). The limit follows Dataverse's
  `x-ms-dop-hint` response header (its recommended degree of parallelism), within `min` and `max`.
- **Bounds:** `min` defaults to 2 and `max` to 16. When you set `maxConcurrentRequests`, `max`
  defaults to that value, so the hint can lower your limit but never raise it; set `max` as well
  to let it rise. Settings that aren't whole numbers of at least 1, or don't fit
  `min <= maxConcurrentRequests <= max`, throw `DataverseInvalidRequestError` when the client is
  created.
- **Per request:** `new MiddlewareRequestOptions([{ type: "concurrency", bypass: true }])` sends a
  request without waiting for a slot.
- **A slot per attempt:** each attempt takes a slot and releases it when its response arrives, so a
  request waiting on `Retry-After` or a backoff doesn't block other requests. A retry queues for
  a slot again like any new request.
- **Browsers:** `x-ms-dop-hint` isn't readable there (see [docs/browser.md](../../docs/browser.md)),
  so the limit stays at `maxConcurrentRequests`.

#### Circuit Breaker & Bulkhead

Both are opt-in middleware: they aren't in the default pipeline, and you add them with the
`middleware` option.

```typescript
import {
  BulkheadMiddleware,
  CircuitBreakerMiddleware,
  DataverseCircuitOpenError,
  DataverseClient,
} from "@mohsinonxrm/dataverse-sdk-core";

const breaker = new CircuitBreakerMiddleware({
  failureThreshold: 5, // failures in a row that open the circuit (default 5)
  breakDurationMs: 30_000, // how long it stays open before a probe (default 30 s)
  onStateChange: ({ from, to }) => telemetry.trackEvent("dataverse.circuit", { from, to }),
});

const client = new DataverseClient({
  baseUrl,
  tokenProvider,
  middleware: {
    // Outermost: a request keeps its bulkhead slot across its retries.
    prepend: [new BulkheadMiddleware({ limits: { read: 8, write: 2 } })],
    // Innermost: every attempt counts, and retries stop as soon as the circuit opens.
    append: [breaker],
  },
});

try {
  await client.api("accounts").get();
} catch (err) {
  if (err instanceof DataverseCircuitOpenError) {
    console.log(`Dataverse is failing; try again in ${err.retryAfterMs} ms`);
  }
}
```

**Circuit breaker** (`CircuitBreakerMiddleware`):

- **Closed → open:** after `failureThreshold` failures in a row. A failure is a response with a
  status of 500 or more, or a `DataverseNetworkError` (a failed connection or a timed-out attempt).
  A 2xx or 3xx response resets the count. A 429 or another 4xx (400, 401, 403, 404, 409, 412...)
  is neutral, like a request its caller aborted: it neither counts nor resets the count, so a run
  of 503s with 429s between them still opens the circuit. Throttling is the retry and adaptive
  throttling middleware's job, and a 4xx says the request was wrong, not that the service is
  healthy. `isFailure(status, error?)` replaces the failure rule (`status` is 0 when no response
  came back); a response it doesn't count is a success below 400 and neutral from 400 up.
- **Open:** requests fail at once, without being sent, with `DataverseCircuitOpenError`.
  `retryAfterMs` says when a probe may go. Inside the retry middleware this ends the retries.
- **Half-open:** after `breakDurationMs`, one request goes through as a probe, and others fail fast
  while it is in flight (`retryAfterMs` is then `undefined`). A successful probe closes the
  circuit. A failed probe opens it for another `breakDurationMs`. A neutral probe (a 429 or another
  4xx) leaves it half-open, and the next request probes.
- **State:** `breaker.state` (`"closed"`, `"open"` or `"half-open"`), `breaker.consecutiveFailures`
  and `onStateChange({ from, to, consecutiveFailures })` are there for telemetry. `breaker.reset()`
  closes it. The state belongs to the instance: use one breaker per client (org).

**Bulkhead** (`BulkheadMiddleware`):

- **Limits per category**, on top of the client's overall `concurrency` limit, so one kind of work
  can't take every slot. By default GET and HEAD are `"read"` and everything else (a `$batch` POST
  included) is `"write"`. `limits` sets each category's limit; `defaultLimit` applies to categories
  not listed. A category with no limit isn't limited.
- **`categorize(request)`** chooses the category, e.g. one per entity set:
  `categorize: (r) => new URL(r.url).pathname.split("/").pop()?.split("(")[0]` with `defaultLimit: 2`.
  Returning `undefined` leaves the request unlimited.
- **Waiting:** requests over the limit wait for a slot, and leave the queue when their `signal`
  aborts. With `maxQueue` (default unlimited), a request beyond that many waiting is refused at once
  with `DataverseBulkheadRejectedError` (with its `category`).
- **Per request:** `new MiddlewareRequestOptions([{ type: "bulkhead", category: "import" }])`
  counts a request in another category; `{ type: "bulkhead", bypass: true }` skips the bulkhead.
- `bulkhead.inFlight(category)` and `bulkhead.queued(category)` show the current load.
- **Placement:** with `prepend`, a request holds its slot through its retries, so the limit counts
  requests. With `append`, it counts attempts, like the concurrency limit.

### URL Construction

```typescript
// Input: baseUrl = 'https://org.crm.dynamics.com'
// After normalization: 'https://org.crm.dynamics.com/api/data/v9.2'

// Relative path
client.api("accounts");
// → 'https://org.crm.dynamics.com/api/data/v9.2/accounts'

// Absolute path (starts with /)
client.api("/contacts");
// → 'https://org.crm.dynamics.com/api/data/v9.2/contacts'

// Full URL (for nextLink)
client.api("https://org.crm.dynamics.com/api/data/v9.2/accounts?$skiptoken=...");
// → 'https://org.crm.dynamics.com/api/data/v9.2/accounts?$skiptoken=...'

// Query building
client.api("accounts").select("name").filter("revenue gt 1000000");
// → 'https://org.crm.dynamics.com/api/data/v9.2/accounts?$select=name&$filter=revenue%20gt%201000000'

// A query string you encoded yourself is kept as written; builder options are added after it
client.api("accounts?$filter=name%20eq%20'a%26b'").select("name");
// → "https://org.crm.dynamics.com/api/data/v9.2/accounts?$filter=name%20eq%20'a%26b'&$select=name"
```

Query option values are encoded with `encodeURIComponent` (a space is `%20`, not `+`), keeping `$`,
`'`, `(`, `)`, `,`, `/`, `:`, `@` and `=` literal as in Microsoft's examples. A query string that is
already in the path is never re-encoded; only an option the builder sets again (for example
`$select`) replaces the one there.

`buildUrl(request)` applies these rules to a `RequestInformation` (see
[Middleware Pipeline](#middleware-pipeline)).

## Interfaces

### AccessTokenProvider

Authentication interface - implement this to provide OAuth tokens.

```typescript
export interface AccessTokenProvider {
  /**
   * @param scopes - Scopes to request. When omitted, the provider uses its configured default scopes.
   * @returns Access token (JWT bearer token as string)
   */
  getToken(scopes?: string | string[], options?: TokenOptions): Promise<string>;
}

export interface TokenOptions {
  /** Claims from a Conditional Access / CAE challenge (decoded JSON), set by the SDK after a 401 */
  claims?: string;

  /** Tenant ID for multi-tenant scenarios */
  tenantId?: string;

  /** The SDK's correlation id for the request */
  correlationId?: string;

  /** Skip any cached token and get a new one. Set by the SDK after a 401 without a claims challenge */
  forceRefresh?: boolean;
}
```

The SDK passes the client's `scopes` option to `getToken` when it is set, and `undefined`
otherwise, so the provider uses its own default scopes. Whether a provider honours `forceRefresh` is up to the provider: the msal-node and msal-browser
providers skip MSAL's token cache when it is set; Azure Identity has no equivalent option, so that
provider ignores it ([#167](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/167)).

**Example implementations:**

- `@mohsinonxrm/dataverse-sdk-auth-msal-browser` - Browser-based auth with MSAL.js
- `@mohsinonxrm/dataverse-sdk-auth-msal-node` - Node.js auth (device code, client credentials, auth code flow)
- `@mohsinonxrm/dataverse-sdk-auth-azure-identity` - Azure Identity SDK adapter

**Usage:**

```typescript
import { PublicClientApplication } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

const pca = new PublicClientApplication({
  auth: {
    clientId: "your-app-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
  },
});

const tokenProvider = new MsalNodeTokenProvider(pca, {
  flow: "deviceCode",
  scopes: ["https://org.crm.dynamics.com/.default"],
  deviceCodeCallback: (response) => console.log(response.message),
});

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  tokenProvider,
});
```

### Logger

Logging interface for request/response debugging and monitoring.

```typescript
export interface Logger {
  debug(message: string, meta?: unknown): void;
  info(message: string, meta?: unknown): void;
  warn(message: string, meta?: unknown): void;
  error(message: string, meta?: unknown): void;
}
```

**Default:** no logger, so the SDK writes nothing to the console. Request URLs carry filters,
record ids and alternate keys, so logging is opt-in.

**Built-in implementation:** `ConsoleLogger` writes to `console.debug` / `info` / `warn` / `error`,
with the meta object as a separate argument. `new ConsoleLogger({ level: "warn" })` drops debug
and info messages.

Request logs show URLs as origin and path, with key values in parentheses as `(…)` and the query as
`?…` (e.g. `GET https://org.crm.dynamics.com/api/data/v9.2/contacts?…`). Set
`logging: { fullUrls: true }` to log full URLs while debugging.

**Usage:**

```typescript
import { ConsoleLogger, DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import type { Logger } from "@mohsinonxrm/dataverse-sdk-core";

// Built-in console logger
const debugClient = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  logger: new ConsoleLogger(),
});

// Custom logger implementation
class CustomLogger implements Logger {
  debug(msg: string, meta?: unknown) {
    /* ... */
  }
  info(msg: string, meta?: unknown) {
    /* ... */
  }
  warn(msg: string, meta?: unknown) {
    /* ... */
  }
  error(msg: string, meta?: unknown) {
    /* ... */
  }
}

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  logger: new CustomLogger(),
});
```

### TelemetryClient

Telemetry interface for events, dependencies (one per request attempt, with W3C trace context) and
exceptions.

<!-- no-check -->

```typescript
export interface TelemetryClient {
  /** Custom events, and the SDK's own (see TelemetryEvents below). */
  trackEvent(
    name: string,
    props?: Record<string, string>,
    measurements?: Record<string, number>
  ): void;

  /**
   * A request attempt starts: called before it is sent, in the caller's context. Each retry and
   * each resend after a 401 is its own dependency.
   */
  startDependency(
    name: string, // "dataverse"
    data: DependencyTelemetry // target, method, url (redacted), properties
  ): DependencyHandle;

  /** An error thrown by a request (network failure, abort, timeout). */
  trackException(error: unknown, props?: Record<string, string>): void;
}

export interface DependencyHandle {
  /** `traceparent` (and `tracestate`) to send with this attempt. Optional. */
  headers?: Record<string, string>;
  /** Run the attempt with this dependency as the active span. Optional. */
  run?<T>(fn: () => Promise<T>): Promise<T>;
  /** The attempt finished: durationMs, success, resultCode, and the properties again. */
  end(data: DependencyTelemetry): void;
}
```

A minimal client records each attempt when it ends:

```typescript
import type { TelemetryClient } from "@mohsinonxrm/dataverse-sdk-core";

const telemetry: TelemetryClient = {
  trackEvent: (name, props, measurements) => console.info(name, props, measurements),
  startDependency: (name) => ({
    end: (d) => console.info(name, d.method, d.resultCode, d.durationMs, d.url),
  }),
  trackException: (error, props) => console.error(error, props),
};
```

**Trace context.** When the handle has `headers`, the SDK sends a valid `traceparent` (and
`tracestate`) from it with that attempt, so Dataverse sees the request as a child of the
dependency. Other header names are ignored. The headers go only to origins that may receive the
access token (`baseUrl` and `allowedTokenOrigins`), and `diagnosticHeaders: false` or
`{ traceContext: false }` turns them off. `run` keeps the dependency active while the attempt runs,
so work done during it (for example `fetch` auto-instrumentation) nests under it. The
`@mohsinonxrm/dataverse-sdk-otel` adapter provides both: a CLIENT span per attempt, a child of your
active span, injected with your registered propagator.

**Events (`TelemetryEvents`).** Every event carries `correlation.id`:

| Event                         | When                                                      | Properties / measurements                                                                                                                                                           |
| ----------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dataverse.throttle`          | A 429 response, per attempt                               | `request.method`, `request.url`, `throttle.limit` (`requests`, `execution_time`, `concurrent_requests`) and `error.code` when known / `retry.attempt`, `retry.after_ms`, `dop_hint` |
| `dataverse.retry`             | Before each retry wait (when `onRetry` runs)              | `request.method`, `request.url`, `retry.reason` (`status`, `network_error`), `error.type` / `retry.attempt`, `retry.max`, `retry.delay_ms`, `retry.after_ms`, `status`              |
| `dataverse.concurrency.wait`  | A request waited for a concurrency slot                   | `request.method`, `request.url` / `wait_ms`, `concurrency.limit`, `concurrency.queued`                                                                                              |
| `dataverse.concurrency.limit` | `x-ms-dop-hint` changed the concurrency limit             | `concurrency.limit`, `concurrency.previous_limit`, `dop_hint`                                                                                                                       |
| `dataverse.batch`             | A `$batch` came back (`@mohsinonxrm/dataverse-sdk-batch`) | `batch.continue_on_error` / `batch.requests`, `batch.succeeded`, `batch.failed`, `duration_ms`, `status`                                                                            |

A request with `{ type: "telemetry", disable: true }` sends none of them.
`client.trackEvent(name, props, measurements)` sends your own event to the client's telemetry,
guarded like the SDK's.

**Privacy and safety:**

- URLs are redacted before they reach telemetry (and logs): origin and path only, with GUID keys as
  `({id})`, other keys as `(…)` and the query as `?…`. For example, a request to
  `accounts(…guid…)?$filter=…` is reported as `https://org.crm.dynamics.com/api/data/v9.2/accounts({id})?…`.
  Pass `redactUrl: (url) => …` on the client to change this (`(url) => url.href` reports full URLs).
  `defaultRedactUrl` is exported if you want to wrap it.
- Calls into the telemetry client are guarded: if any method (or a handle's `run` or `end`) throws,
  the error is logged with `logger.warn` and dropped, and the request carries on (or rejects with its
  own error).
- `sdk.version` and the `x-ms-sdk-version` header carry the real package version (`SDK_VERSION`).

**Example implementations:**

- `@mohsinonxrm/dataverse-sdk-appinsights` - Application Insights adapter (Node.js), and
  `@mohsinonxrm/dataverse-sdk-appinsights/browser` on `@microsoft/applicationinsights-web`
- `@mohsinonxrm/dataverse-sdk-otel` - OpenTelemetry adapter

**Usage:**

```typescript
import { ApplicationInsightsTelemetryClient } from "@mohsinonxrm/dataverse-sdk-appinsights";

// Node.js only. Or call useAzureMonitor() yourself and pass no options.
const telemetry = new ApplicationInsightsTelemetryClient({
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
});

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  telemetry,
});
```

### Executable<T>

Interface for typed action/function execution.

<!-- no-check -->

```typescript
export interface Executable<T> {
  /**
   * Build the HTTP request information
   * @param baseUrl - Normalized base URL (e.g., https://org.crm.dynamics.com/api/data/v9.2)
   * @returns Request information (method, url, headers, body)
   */
  toRequestInformation(baseUrl: string): RequestInformation;

  /**
   * Parse the HTTP response into typed result
   * @param response - HTTP Response object
   * @returns Typed result
   */
  parseResponse(response: Response): Promise<T>;
}

export interface RequestInformation {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  /** Absolute URL, or a path relative to the Web API root */
  url: string;
  headers: Record<string, string>;
  /** Query parameters (URL-encoded when sent) */
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  /** Deadline for the whole request (attempts, retry waits, slot waits) */
  timeoutMs?: number;
  /** Limit for each attempt */
  attemptTimeoutMs?: number;
  signal?: AbortSignal;
  /** Sent as x-ms-correlation-id; a new one is generated when omitted */
  correlationId?: string;
  /** Per-request middleware overrides, e.g. new MiddlewareRequestOptions([{ type: "retry", maxRetries: 0 }]) */
  middlewareOptions?: MiddlewareRequestOptions;
}
```

**Example usage:**

```typescript
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";
import { WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";

// Execute function (GET)
const whoami = await client.execute(new WhoAmIFunction());

// Execute action (POST)
const result = await client.execute(
  new WinOpportunityAction({ OpportunityClose: opportunityClose, Status: 3 })
);
```

## Testing

The package's Vitest suite runs a real `DataverseClient` against a recording fake `fetch` (the
repository's internal testing package) and asserts what reaches the wire: query serialization,
`Prefer` and ETag headers, `@odata.bind`, URL validation and encoding, error parsing, retry with
backoff and `Retry-After`, concurrency, 401 recovery, paging, FetchXML, change tracking,
`waitForAsyncOperation()`, the opt-in middleware and telemetry. Some tests use MSW (Mock Service
Worker). Typed operations are checked with `tsd` in the operation packages.

**Run tests:**

```bash
pnpm --filter @mohsinonxrm/dataverse-sdk-core test         # Run the tests
pnpm --filter @mohsinonxrm/dataverse-sdk-core exec vitest  # Watch mode
```

### Fault Injection (ChaosMiddleware)

To see how your app copes with throttling and outages, add `ChaosMiddleware` (modelled on the
Microsoft Graph SDK's `ChaosHandler`). It answers some requests itself, with a fake 429 (with
`Retry-After`), 502, 503 or 504, or fails them like a dropped connection, without sending them.
It is never in the default pipeline; add it only in test or development builds.

```typescript
import { ChaosMiddleware, DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const client = new DataverseClient({
  baseUrl,
  tokenProvider,
  middleware: {
    // append: it runs last, so its faults go through retry, concurrency and telemetry like real ones
    append: [
      new ChaosMiddleware({
        percentage: 20, // default 10
        faults: [{ status: 429, retryAfterSeconds: 2 }, { status: 503 }, { status: "network" }],
        match: /\/accounts/, // only requests whose URL matches (default: every request)
      }),
    ],
  },
});

// A script decides instead of the percentage: here, the first two attempts of each request fail.
new ChaosMiddleware({
  script: (request, { attempt }) => (attempt < 2 ? { status: 503 } : undefined),
});
```

- **Faults:** `{ status }` with any status from 200 to 599, plus optional `retryAfterSeconds`
  (default 1 for a 429), `headers` and `body` (default: a Dataverse error body; for a 429 the
  service-protection error `0x80072322`). `status: "network"` throws a `DataverseNetworkError`
  named `ConnectionFailed`, as `fetch` failing does. The default faults are 429 (`Retry-After: 1`),
  502, 503 and 504, picked at random.
- **Choosing requests:** `percentage` (0 to 100) of the requests that pass `match` (a `RegExp`
  tested against the full URL, or a function of the request). A `script` replaces `percentage`
  and `faults`: it gets the request and `{ requestIndex, attempt }`, and returns a fault or
  `undefined`. Each retry attempt is a request of its own. `random` takes a seeded generator for repeatable runs, and `onFault` is told
  about each fault.
- **Per request:** `new MiddlewareRequestOptions([{ type: "chaos", disable: true }])` keeps a
  request clean; `{ type: "chaos", fault: { status: 504 } }` forces a fault on it (`ChaosRequestOptions`).

## Bundle Size

- **ESM only**, marked `"sideEffects": false` so bundlers can tree-shake it
- **Zero dependencies** (runtime)
- **Peer dependencies:** None (works with any auth provider implementing `AccessTokenProvider`)

## Browser Compatibility

- Modern browsers with native `fetch()` support
- ES2020+ (async/await, optional chaining, nullish coalescing)
- No polyfills included (use Vite/Next.js for automatic polyfilling if needed)

### Diagnostic headers and CORS

Besides the headers a request needs (`authorization`, `accept`, `odata-*`, and `content-type`,
`prefer` or `if-match` when used), the SDK sends its own diagnostic headers:
`x-ms-sdk-version`, `x-ms-correlation-id`, `x-ms-feature-usage`, `retry-attempt` on retries, and
`traceparent` / `tracestate` when the telemetry client provides trace context (the OpenTelemetry
adapter does). Trace context goes only to the origins that may receive the access token.

In a browser every non-safelisted header is part of the CORS preflight. Dataverse's preflight
currently allows the `x-ms-*` and `retry-attempt` headers, so they work from SPAs. `traceparent`
and `tracestate` must be allowed too before you send them from a browser (with the OpenTelemetry
adapter there, check it, or turn them off with `traceContext: false`). You can turn any of them
off to send only what the request needs, for example in a tool that shows "the exact request that
was sent":

```typescript
new DataverseClient({ baseUrl, tokenProvider, diagnosticHeaders: false }); // none of them
new DataverseClient({ baseUrl, tokenProvider, diagnosticHeaders: { featureUsage: false } }); // one off
new DataverseClient({ baseUrl, tokenProvider, diagnosticHeaders: { traceContext: false } }); // no traceparent
```

Telemetry still records the correlation id when the header is off. The SDK never changes the
`RequestInformation` you pass to `send()`: headers are added to a per-request copy.

## Node.js Compatibility

- **Node.js 22+** (native `fetch()` available)
- ES Modules (ESM) only - no CommonJS build
- Works with TypeScript 4.9+

## License

**GNU AGPL v3.0**

See [LICENSE](../../LICENSE) file in repository root.

## Related Packages

### Core Ecosystem

- **[@mohsinonxrm/dataverse-sdk-auth-msal-browser](../dataverse-sdk-auth-msal-browser)** - Browser authentication
- **[@mohsinonxrm/dataverse-sdk-auth-msal-node](../dataverse-sdk-auth-msal-node)** - Node.js authentication
- **[@mohsinonxrm/dataverse-sdk-auth-azure-identity](../dataverse-sdk-auth-azure-identity)** - Azure Identity SDK
- **[@mohsinonxrm/dataverse-sdk-batch](../dataverse-sdk-batch)** - Batch operations ($batch)
- **[@mohsinonxrm/dataverse-sdk-xrm](../dataverse-sdk-xrm)** - OrganizationService facade
- **[@mohsinonxrm/dataverse-sdk-actions](../dataverse-sdk-actions)** - Typed Web API actions
- **[@mohsinonxrm/dataverse-sdk-functions](../dataverse-sdk-functions)** - Typed Web API functions
- **[@mohsinonxrm/dataverse-sdk-messages](../dataverse-sdk-messages)** - SDK Messages (request/response)
- **[@mohsinonxrm/dataverse-sdk-metadata](../dataverse-sdk-metadata)** - Metadata operations
- **[@mohsinonxrm/dataverse-sdk-files](../dataverse-sdk-files)** - File/image column operations
- **[@mohsinonxrm/dataverse-sdk-discovery](../dataverse-sdk-discovery)** - Global Discovery Service

### Optional Packages

- **[@mohsinonxrm/dataverse-sdk-appinsights](../dataverse-sdk-appinsights)** - Application Insights telemetry
- **[@mohsinonxrm/dataverse-sdk-otel](../dataverse-sdk-otel)** - OpenTelemetry telemetry
- **[@mohsinonxrm/dataverse-sdk-generator](../dataverse-sdk-generator)** - Early-bound entity generator

## Troubleshooting

### Common Issues

**Authentication failures (401):**

- Verify token provider is configured correctly
- Check scopes match environment URL (e.g., `https://org.crm.dynamics.com/.default`)
- Ensure app registration has appropriate Dataverse permissions

**Throttling (429):**

- SDK automatically retries with exponential backoff
- Check `RetryMiddleware` configuration
- Consider reducing concurrency: `concurrency: { maxConcurrentRequests: 4 }`

**URL too long (DataverseUrlError):**

- Use `$batch` for complex queries
- Use FetchXML through `fetchXml()`, which sends long queries as `$batch` itself (see [FetchXML](#fetchxml))
- Call `.skipUrlValidation()` if you know what you're doing (not recommended)

**TypeScript errors:**

- Ensure TypeScript 4.9+ is installed
- Check `tsconfig.json` has `"moduleResolution": "bundler"` or `"node16"`
- Verify `"type": "module"` in package.json

**Import errors:**

- This is an ESM-only package
- Node.js requires `"type": "module"` in package.json
- Use `.js` extensions in imports

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for development setup and guidelines.

## Support

- **Issues:** [GitHub Issues](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues)
- **Discussions:** [GitHub Discussions](https://github.com/mohsinonxrm/dataverse-sdk-typescript/discussions)
- **Documentation:** [docs/](../../docs/)

---

**Built with ❤️ for the Dataverse community**
