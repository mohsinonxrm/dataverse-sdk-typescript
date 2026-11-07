# @mohsinonxrm/dataverse-sdk-batch

Batch operations support for the Dataverse SDK, enabling multiple requests to be executed in a single HTTP call with support for transactional changesets.

## Features

- **Batch Multiple Requests**: Combine up to 1000 requests in a single HTTP call
- **Transactional Changesets**: Group related modifications that must succeed or fail together
- **Content-ID References**: Inside a changeset, a request's id is its Content-ID, so a later request refers to the entity it creates as `$<id>`
- **Request Order Kept**: Requests and changesets are sent, and their results returned, in the order you add them
- **Created Record Ids**: `entityIdFromBatchResponse()` reads the id a create returned, from its headers or, for `Prefer: return=representation`, from its body
- **Reusable Codec**: `encodeBatchRequest()` and `decodeBatchResponse()` are exported for tools that build or display `$batch` bodies themselves
- **Error Handling**: Comprehensive error handling with per-request error tracking
- **Continue on Error**: Optional continue-on-error semantics for partial success scenarios
- **Auto-Split**: More than 1000 requests (or `batchSize`) are sent as several `$batch` requests, one after the other, without splitting a changeset

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-batch
```

## Quick Start

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const client = new DataverseClient({ baseUrl: "https://contoso.crm.dynamics.com", tokenProvider });
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

<!-- no-check -->

```typescript
constructor(client: DataverseClient)
```

Creates a new batch request builder instance.

- **client**: DataverseClient instance for executing the batch

#### Methods

##### addRequest(id, method, url, headers?, body?, dependsOn?)

Adds a request to the batch.

<!-- no-check -->

```typescript
addRequest(
  id: string,
  method: string,
  url: string,
  headers?: Record<string, string>,
  body?: unknown,
  dependsOn?: string[]
): BatchRequestBuilder
```

- **id**: Unique identifier for this request; results are keyed by it. Inside a changeset it is also sent as the part's `Content-ID`, so it may only contain letters, digits, `.`, `_`, `~` and `-`.
- **method**: HTTP method (GET, POST, PATCH, DELETE, etc.)
- **url**: Request URL: relative to the Web API root (`accounts`, `/accounts`), absolute, or a `$<id>` reference to an earlier request in the same changeset. Relative URLs are resolved against the client's Web API root.
- **headers**: Optional HTTP headers for this request
- **body**: Optional request body. Strings are sent as they are; anything else is JSON-encoded (`null` and `undefined` send no body). The part gets `Content-Type: application/json; type=entry` unless `headers` sets a content type.
- **dependsOn**: Optional ids of earlier requests in the same changeset that this request refers to with `$<id>`. They are checked when the request is added: an id that isn't an earlier request of the open changeset throws. It doesn't change what is sent.

Returns the builder for method chaining.

##### beginChangeset()

Starts a new transactional changeset. All requests added after this call will be part of the changeset until `endChangeset()` is called.

<!-- no-check -->

```typescript
beginChangeset(): BatchRequestBuilder
```

Changesets provide transactional semantics - either all requests succeed or all fail together.

##### endChangeset()

Ends the current changeset.

<!-- no-check -->

```typescript
endChangeset(): BatchRequestBuilder
```

Throws an error if no changeset is active or if the changeset is empty.

##### execute(options?)

Executes the batch request.

<!-- no-check -->

```typescript
execute(options?: BatchExecutionOptions): Promise<BatchExecutionResult>
```

**Options:**

- **continueOnError**: Run every request even when one fails (`Prefer: odata.continue-on-error`), and return the result instead of throwing (default: false)
- **batchSize**: Maximum requests per `$batch`, 1 to 1000 (default: 1000, the Dataverse limit). Larger batches are split, keeping each changeset whole.
- **headers**: Additional HTTP headers for the `$batch` request

**Returns:** a `BatchExecutionResult` with every response, keyed by request id and in request order.

**Throws:**

- `DataverseBatchError` when a request fails and `continueOnError` is not set. Its `result` holds everything that was received.
- `DataverseODataError` or `DataverseThrottleError` when the batch fails as a whole (a malformed batch, auth, throttling).
- `DataverseBatchError` with that typed error as its `cause`, when a later batch of a split one fails as a whole. Its `result` holds the batches that ran.

##### encode(boundary)

Returns the multipart body `execute()` would send for a batch that fits in one `$batch`, with URLs resolved. Useful for logging or for showing the request.

##### getTotalRequestCount()

Returns the total number of requests in the batch (including those in changesets).

<!-- no-check -->

```typescript
getTotalRequestCount(): number
```

##### clear()

Clears all requests and resets the builder state.

<!-- no-check -->

```typescript
clear(): BatchRequestBuilder
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

// Process responses. Each body is `unknown`: name the type of the one you read.
type Page<T> = BatchResponseStep<{ value: T[] }>;
const accounts = result.responses.get("accounts") as Page<{ name: string }> | undefined;
const contacts = result.responses.get("contacts") as Page<{ fullname: string }> | undefined;
const leads = result.responses.get("leads")?.body; // unknown

console.log(accounts?.body?.value.map((a) => a.name));
console.log(contacts?.body?.value.length);
```

### Reading response bodies

A response's `body` is parsed JSON when the part is JSON, otherwise the text, and `undefined` when
it is empty. A batch mixes responses (and a failed request's body is an OData error), so `body` is
`unknown` and `execute()` can't type it for you. Name the type of a response you know with
`BatchResponseStep<TBody>`, or check the value first:

```typescript
import type { BatchResponseStep } from "@mohsinonxrm/dataverse-sdk-batch";

interface WhoAmIResponse {
  UserId: string;
  BusinessUnitId: string;
  OrganizationId: string;
}

batch.addRequest("who", "GET", "WhoAmI");
const result = await batch.execute();

const who = result.responses.get("who") as BatchResponseStep<WhoAmIResponse> | undefined;
console.log(who?.body?.UserId);

// Or check it
const body = result.responses.get("who")?.body;
if (typeof body === "object" && body !== null && "UserId" in body) console.log(body.UserId);
```

`decodeBatchResponse()` returns `BatchResponsePart<unknown>` the same way; `BatchResponsePart<TBody>`
names its body type.

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

### Ids of Created Records

`entityIdFromBatchResponse(part, options?)` returns the id of the record a create in the batch made. It takes a `BatchResponseStep` from `execute()` or a `BatchResponsePart` from `decodeBatchResponse()`:

- **A plain create** (`204 No Content`) carries the record URL in its `OData-EntityId` header (or `Location`), and the id is read from there, as `entityIdFromResponse()` in core does for a `Response`.
- **A create with `Prefer: return=representation`** (`201 Created`) has neither header: Dataverse returns the record in the body instead, inside a changeset or not. Pass the table's primary key as `primaryIdAttribute` (e.g. `"contactid"`) to read the id from the body. The headers win when both are present.

It throws `DataverseInvalidRequestError` when no header holds an id and the body has no GUID in `primaryIdAttribute` (or none was given), for example when the request was not a create. The message says which is missing.

```typescript
import { BatchRequestBuilder, entityIdFromBatchResponse } from "@mohsinonxrm/dataverse-sdk-batch";

batch.beginChangeset();
batch.addRequest("account", "POST", "accounts", undefined, { name: "Contoso" });
batch.addRequest(
  "contact",
  "POST",
  "contacts",
  { prefer: "return=representation" },
  {
    lastname: "Doe",
  }
);
batch.endChangeset();

const result = await batch.execute();
const accountId = entityIdFromBatchResponse(result.responses.get("account")!);
const contactId = entityIdFromBatchResponse(result.responses.get("contact")!, {
  primaryIdAttribute: "contactid",
});
```

### Error Handling

Without `continueOnError`, Dataverse stops at the first failed request and `execute()` throws a `DataverseBatchError`. Its `result` holds every response received, in order, and the ids of the requests that never ran:

```typescript
import { DataverseBatchError } from "@mohsinonxrm/dataverse-sdk-batch";

try {
  await batch.execute();
} catch (error) {
  if (error instanceof DataverseBatchError && error.result) {
    const { results, errors, skippedRequestIds, stoppedEarly } = error.result;
    for (const r of results) {
      console.log(r.id, r.status); // successes and the failure, in request order
    }
    for (const [id, err] of errors) {
      console.log(`Request ${id} failed:`, err.message); // a typed DataverseODataError
    }
    if (stoppedEarly) {
      console.log("Not run:", skippedRequestIds); // e.g. retry these one by one
    }
  }
}
```

`error.requestErrors` (and `getFailedRequestIds()` and `getErrorForRequest(id)`) hold only the failed responses. The successful ones are in `error.result.responses`.

### Continue on Error

With `continueOnError: true`, Dataverse runs every request even when some fail, and `execute()` returns the result instead of throwing:

```typescript
const batch = new BatchRequestBuilder(client);

batch
  .addRequest("req1", "POST", "accounts", undefined, { name: "Valid Account" })
  .addRequest("req2", "DELETE", "accounts(00000000-0000-0000-0000-000000000001)") // doesn't exist
  .addRequest("req3", "POST", "accounts", undefined, { name: "Another Valid Account" });

const result = await batch.execute({ continueOnError: true });

result.success; // false
result.successfulRequests; // 2
result.failedRequests; // 1
result.errors.get("req2")?.message; // "Entity 'Account' With Id = … Does Not Exist"
for (const r of result.results) {
  console.log(r.id, r.status); // req1 204, req2 404, req3 204
}
```

Each value in `result.errors` is the typed error `client.api()` would throw for the same response: `DataverseODataError` (or `DataverseThrottleError` for 429), with `status`, `code`, `headers`, `body` and `requestId`.

### Large Batches

More than `batchSize` requests (default and maximum: 1000) are sent as several `$batch` requests, one after the other, in order. A changeset is never split, and a changeset over 1000 requests throws. Without `continueOnError`, the batches after the first one with a failure aren't sent, and their requests are listed in `skippedRequestIds`:

```typescript
for (const id of ids) {
  batch.addRequest(`delete-${id}`, "DELETE", `accounts(${id})`);
}
// 2,500 deletes go as 3 $batch requests: 1000, 1000 and 500.
const result = await batch.execute({ continueOnError: true });
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

- **Maximum batch size**: 1000 requests per `$batch` (Dataverse limit)
- **Default batch size**: 1000. Set `batchSize` (1 to 1000) to send smaller `$batch` requests.
- More requests are split into several `$batch` requests, without splitting a changeset. A changeset over 1000 requests throws.

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

- By default, Dataverse stops at the first failed request; later requests get no response, and `execute()` throws `DataverseBatchError` with the whole `result`
- Use `continueOnError: true` to process all requests; `execute()` then returns the result
- `result.errors` holds typed errors (`DataverseODataError`, `DataverseThrottleError`)
- Check `result.success` to determine if all requests ran and succeeded, and `result.stoppedEarly` / `result.skippedRequestIds` for requests that never ran
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
interface BatchResponseStep<TBody = unknown> {
  id: string; // the id passed to addRequest
  status: number;
  statusText?: string;
  headers: Record<string, string>; // lower-cased names
  body?: TBody; // parsed JSON for JSON parts, otherwise the text; unknown unless you name it
  bodyText?: string; // the body exactly as received
}
```

### DataverseBatchError

This is the same class as `DataverseBatchError` in `@mohsinonxrm/dataverse-sdk-core`, so `instanceof` works whichever package you import it from.

```typescript
declare class DataverseBatchError extends DataverseError {
  result?: BatchExecutionResult; // everything received (set by execute())
  partErrors?: { index: number; status: number; error: DataverseError }[]; // the failed parts, in order
  requestErrors: Map<string, BatchResponseStep>; // the failed responses only
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  cause?: unknown; // a split batch's typed error, when a later batch failed as a whole
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
