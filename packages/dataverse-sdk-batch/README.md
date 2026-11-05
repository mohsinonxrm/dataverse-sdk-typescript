# @mohsinonxrm/dataverse-sdk-batch

Batch operations support for the Dataverse SDK, enabling multiple requests to be executed in a single HTTP call with support for transactional changesets.

## Features

- **Batch Multiple Requests**: Combine up to 1000 requests in a single HTTP call
- **Transactional Changesets**: Group related modifications that must succeed or fail together
- **Content-ID References**: Inside a changeset, a request's id is its Content-ID, so a later request refers to the entity it creates as `$<id>`
- **Request Order Kept**: Requests and changesets are sent, and their results returned, in the order you add them
- **Reusable Codec**: `encodeBatchRequest()` and `decodeBatchResponse()` are exported for tools that build or display `$batch` bodies themselves
- **Error Handling**: Comprehensive error handling with per-request error tracking
- **Continue on Error**: Optional continue-on-error semantics for partial success scenarios
- **Auto-Split Detection**: Prevents exceeding Dataverse's 1000 request limit

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-batch
```

## Quick Start

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const client = new DataverseClient({/* config */});
const batch = new BatchRequestBuilder(client);

// Add individual requests
batch.addRequest("getAccounts", "GET", "/accounts?$top=5");
batch.addRequest("getContacts", "GET", "/contacts?$top=5");

// Execute the batch
const result = await batch.execute();

// Access responses
for (const [id, response] of result.responses) {
  console.log(`Request ${id}:`, response.body);
}
```

## API Reference

### BatchRequestBuilder

#### Constructor

```typescript
constructor(client: DataverseClient)
```

Creates a new batch request builder instance.

- **client**: DataverseClient instance for executing the batch

#### Methods

##### addRequest(id, method, url, headers?, body?, dependsOn?)

Adds a request to the batch.

```typescript
addRequest(
  id: string,
  method: string,
  url: string,
  headers?: Record<string, string>,
  body?: any,
  dependsOn?: string[]
): BatchRequestBuilder
```

- **id**: Unique identifier for this request; results are keyed by it. Inside a changeset it is also sent as the part's `Content-ID`, so it may only contain letters, digits, `.`, `_`, `~` and `-`.
- **method**: HTTP method (GET, POST, PATCH, DELETE, etc.)
- **url**: Request URL: relative to the Web API root (`accounts`, `/accounts`), absolute, or a `$<id>` reference to an earlier request in the same changeset. Relative URLs are resolved against the client's Web API root.
- **headers**: Optional HTTP headers for this request
- **body**: Optional request body. Objects are JSON-encoded, strings are sent as they are, and the part gets `Content-Type: application/json; type=entry` unless `headers` sets a content type.
- **dependsOn**: Optional ids of earlier requests in the same changeset that this request refers to with `$<id>`. They are checked when the request is added: an id that isn't an earlier request of the open changeset throws. It doesn't change what is sent.

Returns the builder for method chaining.

##### beginChangeset()

Starts a new transactional changeset. All requests added after this call will be part of the changeset until `endChangeset()` is called.

```typescript
beginChangeset(): BatchRequestBuilder
```

Changesets provide transactional semantics - either all requests succeed or all fail together.

##### endChangeset()

Ends the current changeset.

```typescript
endChangeset(): BatchRequestBuilder
```

Throws an error if no changeset is active or if the changeset is empty.

##### execute(options?)

Executes the batch request.

```typescript
execute(options?: BatchExecutionOptions): Promise<BatchExecutionResult>
```

**Options:**

- **continueOnError**: Continue processing remaining requests on error (default: false)
- **batchSize**: Size for auto-splitting (not yet implemented)
- **headers**: Additional HTTP headers to include

**Returns:** BatchExecutionResult with responses and errors

##### getTotalRequestCount()

Returns the total number of requests in the batch (including those in changesets).

```typescript
getTotalRequestCount(): number
```

##### clear()

Clears all requests and resets the builder state.

```typescript
clear(): void
```

## Usage Examples

### Individual Requests

Combine multiple read operations in a single HTTP call:

```typescript
const batch = new BatchRequestBuilder(client);

batch
  .addRequest("accounts", "GET", "/accounts?$select=name&$top=10")
  .addRequest("contacts", "GET", "/contacts?$select=fullname&$top=10")
  .addRequest("leads", "GET", "/leads?$select=fullname&$top=10");

const result = await batch.execute();

// Process responses
const accounts = result.responses.get("accounts")?.body;
const contacts = result.responses.get("contacts")?.body;
const leads = result.responses.get("leads")?.body;
```

### Transactional Changesets

Group related create/update/delete operations:

```typescript
const batch = new BatchRequestBuilder(client);

// Create account and related contacts in a transaction
batch.beginChangeset();

batch.addRequest("createAccount", "POST", "accounts", undefined, {
  name: "Contoso Ltd",
  telephone1: "555-0100",
});

batch.addRequest(
  "createContact1",
  "POST",
  "contacts",
  undefined,
  {
    firstname: "John",
    lastname: "Doe",
    "parentcustomerid_account@odata.bind": "$createAccount", // the account created above
  },
  ["createAccount"]
);

batch.addRequest(
  "createContact2",
  "POST",
  "contacts",
  undefined,
  {
    firstname: "Jane",
    lastname: "Smith",
    "parentcustomerid_account@odata.bind": "$createAccount", // the same account
  },
  ["createAccount"]
);

batch.endChangeset();

const result = await batch.execute();
```

### Content-ID References

Inside a changeset, each request's id is sent as its `Content-ID`. A later request in the same changeset refers to the entity an earlier one creates as `$<id>`, in an `@odata.bind` value or as the URL:

```typescript
batch.beginChangeset();

// Content-ID: account
batch.addRequest("account", "POST", "accounts", undefined, { name: "Adventure Works" });

// Content-ID: contact, bound to the account above
batch.addRequest(
  "contact",
  "POST",
  "contacts",
  undefined,
  {
    firstname: "Nancy",
    lastname: "Davolio",
    "parentcustomerid_account@odata.bind": "$account",
  },
  ["account"]
);

// Update the account created above: the URL is the reference itself
batch.addRequest("touch", "PATCH", "$account", undefined, { description: "Created in a batch" }, [
  "account",
]);

batch.endChangeset();
```

An id of `"1"` gives the classic `$1` form.

### Error Handling

Handle errors with comprehensive per-request tracking:

```typescript
try {
  const result = await batch.execute();

  if (!result.success) {
    console.log(`${result.failedRequests} of ${result.totalRequests} requests failed`);
  }
} catch (error) {
  if (error instanceof DataverseBatchError) {
    console.log(`Successful: ${error.successfulRequests}`);
    console.log(`Failed: ${error.failedRequests}`);

    // Check specific request errors
    for (const requestId of error.getFailedRequestIds()) {
      const failedResponse = error.getErrorForRequest(requestId);
      console.log(`Request ${requestId} failed:`, failedResponse?.body);
    }
  }
}
```

### Continue on Error

Process partial successes with continue-on-error semantics:

```typescript
const batch = new BatchRequestBuilder(client);

batch
  .addRequest("req1", "POST", "/accounts", {}, { name: "Valid Account" })
  .addRequest("req2", "POST", "/accounts", {}, {/* invalid data */})
  .addRequest("req3", "POST", "/accounts", {}, { name: "Another Valid Account" });

try {
  const result = await batch.execute({ continueOnError: true });
} catch (error) {
  if (error instanceof DataverseBatchError) {
    // error.successfulRequests will be 2
    // error.failedRequests will be 1

    // Process successful responses
    for (const [id, response] of error.requestErrors) {
      if (response.status >= 200 && response.status < 300) {
        console.log("Success:", response.body);
      } else {
        console.log("Failed:", response.body);
      }
    }
  }
}
```

### Mixed Requests and Changesets

Combine individual requests with transactional changesets:

```typescript
const batch = new BatchRequestBuilder(client);

// Individual read request
batch.addRequest("getConfig", "GET", "/organizations");

// Transactional changeset
batch.beginChangeset();
batch.addRequest("createAccount", "POST", "/accounts", {}, { name: "Test" });
batch.addRequest("createContact", "POST", "/contacts", {}, { firstname: "John" });
batch.endChangeset();

// Another individual request
batch.addRequest("getAccounts", "GET", "/accounts?$top=5");

const result = await batch.execute();
```

## Important Notes

### Request Limits

- **Maximum batch size**: 1000 requests per batch (Dataverse limit)
- **Default batch size**: 10 requests (for auto-split, not yet implemented)
- Exceeding 1000 requests will throw an error

### Changeset Behavior

- **Transactional**: All requests in a changeset succeed or fail together
- **Content-IDs**: Each request's id is its Content-ID, so ids stay unique across the whole batch
- **Cannot nest**: Only one changeset can be active at a time
- **Cannot be empty**: Must contain at least one request
- **Failure**: When a request in a changeset fails, Dataverse rolls the changeset back and answers only with the failing request's response

### Content-ID References

- Use `$<id>` to refer to an earlier request of the same changeset (e.g. `$account`, or `$1` for an id of `"1"`)
- Only valid within the same changeset
- Commonly used in `@odata.bind` properties for associations, or as the URL of a later PATCH or DELETE

### Order

Requests and changesets are sent in the order they're added. Dataverse answers in that order, so each response is matched to its request by position, and inside a changeset by Content-ID.

### Error Handling

- By default, Dataverse stops at the first failed request; later requests get no response
- Use `continueOnError: true` to process all requests
- `DataverseBatchError` provides detailed per-request error information
- Check `result.success` to determine if all requests succeeded
- When the batch as a whole fails (a malformed batch, auth, throttling), Dataverse answers with a JSON error instead of a multipart body, and `execute()` throws the typed error: `DataverseODataError`, or `DataverseThrottleError` for 429

### How it is sent

`execute()` sends one `POST $batch` through `client.send()`, so it goes through the client's pipeline (auth, retries, telemetry). The body is the multipart string exactly as encoded (see `encode(boundary)`), with `Content-Type: multipart/mixed; boundary=…`. Headers from `options.headers` are added to that request; a `Prefer` value there is combined with `odata.continue-on-error`.

## Types

### BatchExecutionOptions

```typescript
interface BatchExecutionOptions {
  continueOnError?: boolean;
  batchSize?: number;
  headers?: Record<string, string>;
}
```

### BatchExecutionResult

```typescript
interface BatchExecutionResult {
  responses: Map<string, BatchResponseStep>; // keyed by the id passed to addRequest
  results: BatchResponseStep[]; // every response received, in request order
  errors: Map<string, Error>; // failed requests, keyed by id
  success: boolean; // every request ran and succeeded
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  skippedRequestIds: string[]; // no response: Dataverse stopped early, or the changeset rolled back
  stoppedEarly: boolean; // Dataverse stopped before reaching every request or changeset
}
```

### BatchResponseStep

```typescript
interface BatchResponseStep {
  id: string; // the id passed to addRequest
  status: number;
  statusText?: string;
  headers: Record<string, string>; // lower-cased names
  body?: any; // parsed JSON for JSON parts, otherwise the text
  bodyText?: string; // the body exactly as received
}
```

## Low-level codec

`encodeBatchRequest()` and `decodeBatchResponse()` are exported for tools that build, send or display `$batch` bodies themselves:

```typescript
import {
  decodeBatchResponse,
  encodeBatchRequest,
  generateBoundary,
} from "@mohsinonxrm/dataverse-sdk-batch";

const api = client.getBaseUrl();
const boundary = generateBoundary();
const body = encodeBatchRequest(
  [
    { id: "who", method: "GET", url: `${api}/WhoAmI` },
    { changeset: [{ id: "1", method: "POST", url: `${api}/accounts`, body: { name: "A" } }] },
  ],
  boundary
);

const res = await client.send({
  method: "POST",
  url: "$batch",
  headers: { "content-type": `multipart/mixed; boundary=${boundary}` },
  body,
});

// One entry per operation response, in order. Change set parts carry their contentId;
// batchIndex is the position of the request or change set they answer.
const parts = decodeBatchResponse(await res.text(), res.headers.get("content-type") ?? "");
```

The encoder writes URLs as given (use absolute URLs or paths relative to the Web API root). The decoder is case-insensitive, accepts quoted boundaries and LF-only line endings, lower-cases header names and never trims bodies. Dataverse answers a `$batch` whose first failure is a 4xx or 5xx with that status, but still with a multipart body, so decode the body whatever the status when its content type is `multipart/mixed`.

## License

GNU AGPL-3.0

## Related Packages

- [@mohsinonxrm/dataverse-sdk-core](../dataverse-sdk-core) - Core SDK functionality
- [@mohsinonxrm/dataverse-sdk-xrm](../dataverse-sdk-xrm) - OrganizationService facade
- [@mohsinonxrm/dataverse-sdk-messages](../dataverse-sdk-messages) - SDK messages
