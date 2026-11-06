# @mohsinonxrm/dataverse-sdk-core

> Core HTTP client and middleware pipeline for the Dataverse TypeScript SDK. Foundation package providing HTTP-first fluent API, adaptive resiliency, and extensible middleware architecture.

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
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { ConsoleLogger } from "@mohsinonxrm/dataverse-sdk-core"; // Opt-in console logger

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
    retryNetworkErrors: false, // Default: false (retry idempotent requests when fetch itself fails)
  },

  // Optional: Concurrency configuration
  concurrency: {
    maxConcurrentRequests: 8, // Default: 8 for Node.js
    adaptiveFromDopHint: true, // Default: true (adjusts based on x-ms-dop-hint)
    min: 2, // Default: 2 (minimum concurrent requests)
    max: 16, // Default: 16 (maximum concurrent requests)
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
// OData Query Options
client
  .api("accounts")
  .select("name", "accountnumber", "revenue") // $select (comma-separated)
  .filter("revenue gt 1000000 and statecode eq 0") // $filter (OData expression)
  .expand("primarycontactid($select=fullname,emailaddress1)") // $expand (strings; nested options inline)
  .orderBy("name asc", "revenue desc") // $orderby (multiple fields)
  .top(50) // $top
  .skip(100) // $skip
  .count(true) // $count=true
  .search("Contoso") // $search
  .apply("groupby((industrycode))"); // $apply (aggregation)

// HTTP Methods
await builder.get<T>(); // GET - returns single page
await builder.post<T>(body); // POST - create
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
`signal` aborting rejects with `DataverseAbortError`. Neither the SDK's timers nor its listeners stay
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

// Method 3: Fluent PreferBuilder. prefer() with no arguments returns a PreferBuilder, which has
// no terminal methods (get/post/...), so keep a reference to the request builder:
const request = client.api("/accounts");
request
  .prefer() // Returns a PreferBuilder
  .formattedValues() // odata.include-annotations="OData.Community.Display.V1.FormattedValue"
  .maxPageSize(50); // odata.maxpagesize=50
const page = await request.get();
// PreferBuilder also has returnRepresentation(), allAnnotations() (odata.include-annotations="*"),
// continueOnError() and trackChanges() (odata.track-changes, for change tracking queries).

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
client.api(`EntityDefinitions(${odataKey({ LogicalName: name })})`);

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
| `odataLiteral.enum("NS.Type", ["A","B"])` | `NS.Type'A,B'`                                        |
| `odataLiteral.value(v)`                   | picks one of the above from the JavaScript type       |
| `odataKey(guid \| { col: value, … })`     | `guid` or `col='…',col2=5`, percent-encoded for paths |

A value that doesn't fit the helper throws `DataverseInvalidRequestError` (`InvalidParameter`)
instead of producing a broken URL.

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
- `.iterate()`: Returns `AsyncIterable<T>` that yields individual items across all pages
- `.getAll()`: Collects all items into array with optional limits
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

### Error Handling

Typed error classes for different failure scenarios.

```typescript
import {
  DataverseError, // Base class: every error the SDK throws is an instance
  DataverseODataError, // HTTP error response (4xx/5xx)
  DataverseThrottleError, // 429, with retryAfterMs
  DataverseNetworkError, // fetch failed (ConnectionFailed: DNS/TLS/CORS) or timed out (RequestTimeout)
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
`innerError?`, `requestId?`, `correlationId?`, `cause?` and `date`. `statusCode` still works as a
deprecated alias of `status`. Errors thrown by your own middleware or token provider are passed
through unchanged.

**Error hierarchy:**

```
DataverseError (base)
├── DataverseODataError (HTTP 4xx/5xx)
├── DataverseThrottleError (429, has retryAfterMs)
├── DataverseDuplicateError (412, has duplicates array)
├── DataverseBatchError (batch-specific, has per-part errors)
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

#### Optimistic Concurrency (Full Example)

```typescript
// Retrieve entity with ETag
const account = await client
  .api(`/accounts(${accountId})`)
  .select("name", "revenue", "telephone1")
  .get<Account>();

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
   ├─ TelemetryMiddleware (diagnostic headers, track dependencies)
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
6. TelemetryMiddleware - Adds diagnostic headers, records start time
7. LoggingMiddleware - Logs request details
8. `append` middleware (if any)
9. FetchRequestAdapter - Calls `fetch(url, { method, headers, body })`

**Response Phase (bottom-up):**

1. FetchRequestAdapter - Returns Response object
2. `append` middleware
3. LoggingMiddleware - Logs response status and duration
4. TelemetryMiddleware - Tracks dependency with duration and result
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
  - `retryNonIdempotent: false`, `retryNetworkErrors: false`
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
  (the original error is its `cause`). With `retryNetworkErrors: true` idempotent requests are retried
  with backoff. Aborts and timeouts are never retried.
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
        setStatus(
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
- **Stream content:** Not retried (detected via Content-Type header)
- **Discarded responses:** the body of a response that is retried is cancelled at once, so the
  connection goes back to the pool instead of waiting for garbage collection. The response you
  get back (success, or the last failure when retries run out) is never read by the retry logic.

#### Adaptive Concurrency

- **Default max concurrent requests:** 8 (Node.js), browser may differ
- **Adaptive tuning:** Enabled by default via `x-ms-dop-hint` response header
  - Dataverse recommends optimal concurrency level per tenant/environment
  - SDK automatically adjusts semaphore limit within bounds
- **Bounds:** `min: 2`, `max: 16` (configurable)
- **Semaphore:** Queue-based implementation with `acquire()` and `release()`
- **Clamp function:** Ensures concurrency stays within `[min, max]` range
- **A slot per attempt:** each attempt takes a slot and releases it when its response arrives, so a
  request waiting on `Retry-After` or a backoff doesn't block other requests. A retry queues for
  a slot again like any new request.
- **Browsers:** `x-ms-dop-hint` isn't readable there (see [docs/browser.md](../../docs/browser.md)),
  so the limit stays at `maxConcurrentRequests`.

#### Circuit Breaker & Bulkhead

**Not currently implemented** - placeholders exist in options interface for future enhancement.

### URL Construction

```typescript
// Input: baseUrl = 'https://org.crm.dynamics.com'
// After normalization: 'https://org.crm.dynamics.com/api/data/v9.2'

// Relative path
client.api('accounts')
→ 'https://org.crm.dynamics.com/api/data/v9.2/accounts'

// Absolute path (starts with /)
client.api('/contacts')
→ 'https://org.crm.dynamics.com/api/data/v9.2/contacts'

// Full URL (for nextLink)
client.api('https://org.crm.dynamics.com/api/data/v9.2/accounts?$skiptoken=...')
→ 'https://org.crm.dynamics.com/api/data/v9.2/accounts?$skiptoken=...'

// Query building
client.api('accounts').select('name').filter('revenue gt 1000000')
→ 'https://org.crm.dynamics.com/api/data/v9.2/accounts?$select=name&$filter=revenue%20gt%201000000'

// A query string you encoded yourself is kept as written; builder options are added after it
client.api("accounts?$filter=name%20eq%20'a%26b'").select('name')
→ "https://org.crm.dynamics.com/api/data/v9.2/accounts?$filter=name%20eq%20'a%26b'&$select=name"
```

Query option values are encoded with `encodeURIComponent` (a space is `%20`, not `+`), keeping `$`,
`'`, `(`, `)`, `,`, `/`, `:`, `@` and `=` literal as in Microsoft's examples. A query string that is
already in the path is never re-encoded; only an option the builder sets again (for example
`$select`) replaces the one there.

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

Telemetry interface for tracking events and dependencies (metrics, distributed tracing).

```typescript
export interface TelemetryClient {
  /**
   * Track custom events
   */
  trackEvent(
    name: string,
    props?: Record<string, string>,
    measurements?: Record<string, number>
  ): void;

  /**
   * Track HTTP dependencies (outbound calls): one per request attempt
   */
  trackDependency(
    name: string, // "dataverse"
    data: {
      target?: string; // Host, e.g. "org.crm.dynamics.com"
      method?: string; // HTTP method
      url?: string; // Redacted URL (see below)
      durationMs?: number; // Duration in milliseconds
      success?: boolean; // Whether the call succeeded
      resultCode?: string; // HTTP status code
      properties?: Record<string, string>; // sdk.version, correlation.id, retry.attempt, …
    }
  ): void;

  /**
   * Track an error thrown by a request (network failure, abort, timeout)
   */
  trackException(error: unknown, props?: Record<string, string>): void;
}
```

**Privacy and safety:**

- URLs are redacted before they reach telemetry (and logs): origin and path only, with GUID keys as
  `({id})`, other keys as `(…)` and the query as `?…`. For example, a request to
  `accounts(…guid…)?$filter=…` is reported as `https://org.crm.dynamics.com/api/data/v9.2/accounts({id})?…`.
  Pass `redactUrl: (url) => …` on the client to change this (`(url) => url.href` reports full URLs).
  `defaultRedactUrl` is exported if you want to wrap it.
- Calls into the telemetry client are guarded: if `trackDependency` or `trackException` throws, the
  error is logged with `logger.warn` and dropped, and the request carries on (or rejects with its own
  error).
- `sdk.version` and the `x-ms-sdk-version` header carry the real package version (`SDK_VERSION`).

**Example implementations:**

- `@mohsinonxrm/dataverse-sdk-appinsights` - Application Insights adapter
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
const result = await client.execute(new WinOpportunityAction(/* params */));
```

## Testing

The SDK includes comprehensive test coverage:

- **Unit Tests:** 109+ tests using Vitest
  - Request builder query serialization (`$select`, `$filter`, `$expand`, etc.)
  - Prefer header construction (fluent builder and helper)
  - ETag operations (`If-Match`, `If-None-Match`)
  - Navigation property binding
  - URL validation and normalization
  - Error parsing and typed error classes
  - Retry middleware with backoff and jitter
  - Concurrency middleware with semaphore logic

- **Contract Tests:** MSW (Mock Service Worker) for HTTP behavior
  - 429 throttling with `Retry-After` header handling
  - 502/503/504 retry behavior
  - Batch operations multipart formatting
  - OData error response parsing
  - Duplicate detection (412) responses

- **Paging Tests:**
  - Single page retrieval
  - `@odata.nextLink` following
  - AsyncIterator implementation
  - Bounded `getAll()` with limits

- **Type Tests:** (via `tsd` in downstream packages)
  - Type-safe Prefer options
  - Executable interface compliance

**Run tests:**

```bash
pnpm test                    # Run all tests
pnpm test --watch           # Watch mode
pnpm test --coverage        # Generate coverage report
```

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
`x-ms-sdk-version`, `x-ms-correlation-id`, `x-ms-feature-usage`, and `retry-attempt` on retries.

In a browser every non-safelisted header is part of the CORS preflight. Dataverse's preflight
currently allows these headers, so they work from SPAs, but you can turn them off to send only what
the request needs, for example in a tool that shows "the exact request that was sent":

```typescript
new DataverseClient({ baseUrl, tokenProvider, diagnosticHeaders: false }); // none of them
new DataverseClient({ baseUrl, tokenProvider, diagnosticHeaders: { featureUsage: false } }); // one off
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
- Consider reducing concurrency: `concurrency: { max: 4 }`

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
