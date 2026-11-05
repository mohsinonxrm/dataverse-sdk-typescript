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
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

// Create client with token provider
const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com", // Accepts env root or full /api/data/v9.2 URL
  tokenProvider: new MsalNodeTokenProvider({/* MSAL config */}),
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

  // Optional: Custom middleware (appended to built-in middleware)
  middleware: [customMiddleware1, customMiddleware2],

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
  .expand("primarycontactid", {
    // $expand with nested options
    select: ["fullname", "emailaddress1"], // Currently supports simple string expand
  })
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

// All methods support optional RequestOptions
await builder.get({
  headers: { "Custom-Header": "value" },
  timeoutMs: 30000,
  signal: abortController.signal,
});
```

### Fluent API Enhancements

#### Prefer Header Builder

Build complex `Prefer` headers using either fluent PreferBuilder or typed Prefer helper.

```typescript
import { PreferBuilder } from "@mohsinonxrm/dataverse-sdk-core";

// Method 1: Fluent PreferBuilder (recommended for complex scenarios)
await client
  .api("/accounts")
  .prefer() // Returns PreferBuilder instance
  .returnRepresentation() // return=representation
  .formattedValues() // odata.include-annotations="OData.Community.Display.V1.FormattedValue"
  .allAnnotations() // odata.include-annotations="*"
  .maxPageSize(50) // odata.maxpagesize=50
  .continueOnError() // odata.continue-on-error (batch operations)
  .trackChanges() // odata.track-changes (delta queries)
  .post({ name: "Contoso" });

// Method 2: Prefer helper (simple scenarios)
import { Prefer } from "@mohsinonxrm/dataverse-sdk-core";

await client
  .api("/accounts")
  .preferRaw(Prefer.returnRepresentation()) // Type-safe helper
  .post({ name: "Contoso" });

// Method 3: Array syntax (existing API, still supported)
await client
  .api("/accounts")
  .prefer(["return=representation", 'odata.include-annotations="*"'])
  .post({ name: "Contoso" });

// Prefer helper methods available:
Prefer.returnRepresentation(); // 'return=representation'
Prefer.includeAnnotations("*"); // 'odata.include-annotations="*"'
Prefer.continueOnError(); // 'odata.continue-on-error'
```

#### ETag Operations (Optimistic Concurrency)

Convenient methods for optimistic concurrency control and upserts.

```typescript
// Retrieve entity with ETag
const account = await client.api(`/accounts(${accountId})`).get();
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
    console.log(`Status: ${error.statusCode}`); // 412
  }
}

// Default behavior: duplicate detection is SUPPRESSED (follows Microsoft defaults)
await client.api("/accounts").post({ name: "Contoso" });
// Does NOT throw even if duplicates exist
```

**Implementation details:**

- Default: Duplicate detection is **suppressed** (matches Dataverse defaults)
- `.detectDuplicates()` explicitly enables detection
- Returns `DataverseDuplicateError` (extends `DataverseError`) on 412 status
- Error includes `duplicates` array with record details from `error.innererror.duplicaterecords`
- Error includes `duplicateRuleId` from `error.innererror.duplicateruleid`

#### Navigation Property Binding

Simplified syntax for binding single-valued and collection-valued navigation properties.

```typescript
// ========== Single-Valued Navigation (Lookup Fields) ==========

// Approach 1: Fluent bind() method (adds to request body)
await client
  .api("/contacts")
  .post({
    firstname: "John",
    lastname: "Doe",
    emailaddress1: "john@contoso.com",
  })
  .bind("parentcustomerid_account", "accounts", accountId)
  .post({
    firstname: "John",
    lastname: "Doe",
  });
// Merges binding into POST body automatically

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
// Body: { "@odata.id": "/contacts(contactId)" }

// Disassociate single record
await client.api(`/accounts(${accountId})`).disassociate("contact_customer_accounts", contactId);
// DELETE /accounts(accountId)/contact_customer_accounts(contactId)/$ref

// Batch associate multiple records (requires @mohsinonxrm/dataverse-sdk-batch)
await client
  .api(`/accounts(${accountId})`)
  .bindMany("contact_customer_accounts", "contacts", [contactId1, contactId2, contactId3]);
// Internally uses BatchRequestBuilder for efficiency
// Throws error if batch package not installed
```

**Navigation property binding details:**

- Single-valued: Uses `@odata.bind` annotation in request body
- Collection-valued: Uses `/$ref` endpoint for associate/disassociate
- `bindMany()` dynamically imports `@mohsinonxrm/dataverse-sdk-batch` to avoid circular dependency
- All methods properly construct entity set paths and GUIDs

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
- Recommendation: Use `$batch` or FetchXML for complex queries exceeding limits

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

### Error Handling

Typed error classes for different failure scenarios.

```typescript
import {
  DataverseError, // Base error class
  DataverseODataError, // OData protocol errors (4xx/5xx with error payload)
  DataverseThrottleError, // 429 Too Many Requests with Retry-After
  DataverseAuthenticationError, // 401 Unauthorized
  DataverseServiceError, // 5xx server errors
  DataverseInvalidRequestError, // 400 Bad Request
  DataverseNetworkError, // Network/fetch failures
  DataverseBatchError, // Batch operation errors (multi-part)
  DataverseDuplicateError, // 412 duplicate detection
  DataverseUrlError, // Client-side URL validation error
} from "@mohsinonxrm/dataverse-sdk-core";

try {
  await client.api("accounts").get();
} catch (error) {
  if (error instanceof DataverseThrottleError) {
    console.log(`Throttled! Retry after ${String(error.retryAfterMs)} ms`);
  } else if (error instanceof DataverseODataError) {
    console.log(`OData error code: ${error.odataError.code}`);
    console.log(`Message: ${error.odataError.message}`);
    console.log(`Status: ${error.statusCode}`);

    // Access inner error details
    if (error.odataError.innererror) {
      console.log("Stack trace:", error.odataError.innererror.stacktrace);
    }
  } else if (error instanceof DataverseAuthenticationError) {
    console.log("Authentication failed - check token provider");
  } else if (error instanceof DataverseServiceError) {
    console.log(`Server error ${error.statusCode}: ${error.message}`);
  } else if (error instanceof DataverseError) {
    console.log(`Generic Dataverse error: ${error.message}`);
  }
}
```

**Error hierarchy:**

```
DataverseError (base)
├── DataverseODataError (has odataError payload)
│   ├── DataverseThrottleError (429, has retryAfterMs)
│   ├── DataverseDuplicateError (412, has duplicates array)
│   ├── DataverseAuthenticationError (401)
│   ├── DataverseInvalidRequestError (400)
│   └── DataverseServiceError (5xx)
├── DataverseBatchError (batch-specific, has per-part errors)
├── DataverseUrlError (client-side validation)
└── DataverseNetworkError (fetch/network failures)
```

### Middleware Pipeline

Customize request/response processing with middleware. All requests flow through the middleware pipeline in sequence.

```typescript
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
    // Modify request before sending
    request.headers["X-Custom-Header"] = "my-value";
    request.headers["X-Request-Id"] = crypto.randomUUID();

    // Log request details
    ctx.logger?.info(`Sending ${request.method} ${request.url}`);

    // Call next middleware in pipeline
    const startTime = Date.now();
    const response = await next(request, ctx);
    const duration = Date.now() - startTime;

    // Process response
    ctx.logger?.info(`Response ${response.status} in ${duration}ms`);
    ctx.telemetry?.trackDependency("Dataverse", {
      target: new URL(request.url).hostname,
      method: request.method,
      duration,
      success: response.ok,
      resultCode: response.status,
    });

    return response;
  }
}

// ========== Add Middleware to Client ==========
const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  middleware: [new CustomHeaderMiddleware()], // Appended to built-in middleware
});
```

**Built-in Middleware (Execution Order):**

1. **AuthMiddleware** - Adds `Authorization: Bearer <token>` from `AccessTokenProvider`
2. **ODataHeadersMiddleware** - Sets `Accept: application/json`, `OData-Version: 4.0`, `OData-MaxVersion: 4.0`
3. **Custom Middleware** - User-provided middleware (if any)
4. **RetryMiddleware** - Handles 429/502/503/504 with exponential backoff + jitter
5. **ConcurrencyMiddleware** - Semaphore-based rate limiting with adaptive concurrency
6. **TelemetryMiddleware** - Tracks request events and dependencies
7. **LoggingMiddleware** - Logs request/response details
8. **FetchRequestAdapter** - Final adapter that calls native `fetch()`

**Middleware Features:**

- All middleware executes in sequence (not parallel)
- Each middleware can modify request before calling `next()`
- Each middleware can process response after `next()` returns
- Context (`MiddlewareContext`) provides access to logger and telemetry
- Middleware can access attempt number via `ctx.attempt` (for retry scenarios)
- Middleware can short-circuit by not calling `next()` (return early response)

### Advanced Features

#### Impersonation (MSCRMCallerID Header)

Execute requests on behalf of another user.

```typescript
// Impersonate specific user for single request
await client
  .api("accounts")
  .impersonate(userId) // Sets MSCRMCallerID header
  .post({ name: "Contoso" });

// The user must have appropriate privileges in Dataverse
```

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
  if (error instanceof DataverseODataError && error.statusCode === 412) {
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
   ├─ AuthMiddleware (add Bearer token)
   ├─ ODataHeadersMiddleware (add OData headers)
   ├─ Custom Middleware (user-provided)
   ├─ RetryMiddleware (wrap with retry logic)
   ├─ ConcurrencyMiddleware (semaphore rate limiting)
   ├─ TelemetryMiddleware (track metrics)
   └─ LoggingMiddleware (log requests)
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

1. AuthMiddleware - Calls `tokenProvider.getToken()` and adds `Authorization` header
2. ODataHeadersMiddleware - Adds `Accept`, `Content-Type`, `OData-Version`, `OData-MaxVersion`
3. Custom Middleware - User-provided middleware (if any)
4. RetryMiddleware - Wraps next middleware with retry logic (doesn't modify request directly)
5. ConcurrencyMiddleware - Acquires semaphore slot (blocks if at max concurrency)
6. TelemetryMiddleware - Records start time
7. LoggingMiddleware - Logs request details
8. FetchRequestAdapter - Calls `fetch(request.url, { method, headers, body })`

**Response Phase (bottom-up):**

1. FetchRequestAdapter - Returns Response object
2. LoggingMiddleware - Logs response status and duration
3. TelemetryMiddleware - Tracks dependency with duration and result
4. ConcurrencyMiddleware - Releases semaphore, adjusts limit based on `x-ms-dop-hint` header
5. RetryMiddleware - Checks status code, retries if 429/502/503/504 and attempts < maxRetries
6. Custom Middleware - Process response
7. ODataHeadersMiddleware - (no response processing)
8. AuthMiddleware - (no response processing)

### Resiliency Features

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
  PATCH with `If-Match`.
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

#### Adaptive Concurrency

- **Default max concurrent requests:** 8 (Node.js), browser may differ
- **Adaptive tuning:** Enabled by default via `x-ms-dop-hint` response header
  - Dataverse recommends optimal concurrency level per tenant/environment
  - SDK automatically adjusts semaphore limit within bounds
- **Bounds:** `min: 2`, `max: 16` (configurable)
- **Semaphore:** Queue-based implementation with `acquire()` and `release()`
- **Clamp function:** Ensures concurrency stays within `[min, max]` range

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
```

## Interfaces

### AccessTokenProvider

Authentication interface - implement this to provide OAuth tokens.

```typescript
export interface AccessTokenProvider {
  /**
   * Acquire an access token for the specified scopes
   * @param scopes - OAuth scopes (string or string array)
   * @param options - Optional token acquisition options
   * @returns Access token (JWT bearer token as string)
   */
  getToken(scopes: string | string[], options?: TokenOptions): Promise<string>;
}

export interface TokenOptions {
  /** Optional claims challenge from WWW-Authenticate header */
  claims?: string;

  /** Optional tenant ID for multi-tenant scenarios */
  tenantId?: string;

  /** Optional correlation ID for tracing */
  correlationId?: string;
}
```

**Example implementations:**

- `@mohsinonxrm/dataverse-sdk-auth-msal-browser` - Browser-based auth with MSAL.js
- `@mohsinonxrm/dataverse-sdk-auth-msal-node` - Node.js auth (device code, client credentials, auth code flow)
- `@mohsinonxrm/dataverse-sdk-auth-azure-identity` - Azure Identity SDK adapter

**Usage:**

```typescript
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

const tokenProvider = new MsalNodeTokenProvider({
  clientId: "your-app-id",
  authority: "https://login.microsoftonline.com/your-tenant-id",
});

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  tokenProvider,
  scopes: ["https://org.crm.dynamics.com/.default"],
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
  url: string;
  headers: Record<string, string>;
  query?: string;
  body?: unknown;
  timeoutMs?: number;
  signal?: AbortSignal;
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

- **Core package:** ~50KB minified (ESM, tree-shakeable)
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
- Use FetchXML for extremely complex filters
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

- **Issues:** [GitHub Issues](https://github.com/mohsinonxrm/mxrm-dataverse-sdk-typescript/issues)
- **Discussions:** [GitHub Discussions](https://github.com/mohsinonxrm/mxrm-dataverse-sdk-typescript/discussions)
- **Documentation:** [docs/](../../docs/)

---

**Built with ❤️ for the Dataverse community**
