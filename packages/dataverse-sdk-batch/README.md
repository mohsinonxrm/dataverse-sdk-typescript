# @mohsinonxrm/dataverse-sdk-batch

Batch operations support for the Dataverse SDK, enabling multiple requests to be executed in a single HTTP call with support for transactional changesets.

## Features

- **Batch Multiple Requests**: Combine up to 1000 requests in a single HTTP call
- **Transactional Changesets**: Group related modifications that must succeed or fail together
- **Content-ID References**: Reference earlier requests in changesets using `$1`, `$2` syntax
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

const client = new DataverseClient({
  /* config */
});
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

- **id**: Unique identifier for this request
- **method**: HTTP method (GET, POST, PATCH, DELETE, etc.)
- **url**: Request URL (relative to API base or absolute)
- **headers**: Optional HTTP headers
- **body**: Optional request body (will be JSON stringified if object)
- **dependsOn**: Optional array of request IDs this request depends on

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

batch.addRequest(
  "createAccount",
  "POST",
  "/accounts",
  {},
  {
    name: "Contoso Ltd",
    telephone1: "555-0100",
  }
);

batch.addRequest(
  "createContact1",
  "POST",
  "/contacts",
  {},
  {
    firstname: "John",
    lastname: "Doe",
    "parentcustomerid_account@odata.bind": "$1", // Reference account created above
  }
);

batch.addRequest(
  "createContact2",
  "POST",
  "/contacts",
  {},
  {
    firstname: "Jane",
    lastname: "Smith",
    "parentcustomerid_account@odata.bind": "$1", // Reference same account
  }
);

batch.endChangeset();

const result = await batch.execute();
```

### Content-ID References

Use Content-ID syntax to reference earlier requests in changesets:

```typescript
batch.beginChangeset();

// Content-ID: 1
batch.addRequest(
  "account",
  "POST",
  "/accounts",
  {},
  {
    name: "Adventure Works",
  }
);

// Content-ID: 2 - references Content-ID 1
batch.addRequest(
  "contact",
  "POST",
  "/contacts",
  {},
  {
    firstname: "Nancy",
    lastname: "Davolio",
    "parentcustomerid_account@odata.bind": "$1",
  }
);

// Content-ID: 3 - references Content-ID 2
batch.addRequest(
  "task",
  "POST",
  "/tasks",
  {},
  {
    subject: "Follow up",
    "regardingobjectid_contact@odata.bind": "$2",
  }
);

batch.endChangeset();
```

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
  .addRequest(
    "req2",
    "POST",
    "/accounts",
    {},
    {
      /* invalid data */
    }
  )
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
- **Content-IDs**: Assigned sequentially (1, 2, 3...) within each changeset
- **Cannot nest**: Only one changeset can be active at a time
- **Cannot be empty**: Must contain at least one request

### Content-ID References

- Use `$<number>` syntax to reference earlier requests (e.g., `$1`, `$2`)
- Only valid within the same changeset
- Commonly used in `@odata.bind` properties for associations
- Content-IDs are sequential starting from 1

### Error Handling

- By default, batch execution stops on first error
- Use `continueOnError: true` to process all requests
- `DataverseBatchError` provides detailed per-request error information
- Check `result.success` to determine if all requests succeeded

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
  responses: Map<string, BatchResponseStep>;
  errors: Map<string, Error>;
  success: boolean;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
}
```

### BatchResponseStep

```typescript
interface BatchResponseStep {
  id: string;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: any;
}
```

## License

GNU AGPL-3.0

## Related Packages

- [@mohsinonxrm/dataverse-sdk-core](../dataverse-sdk-core) - Core SDK functionality
- [@mohsinonxrm/dataverse-sdk-xrm](../dataverse-sdk-xrm) - OrganizationService facade
- [@mohsinonxrm/dataverse-sdk-messages](../dataverse-sdk-messages) - SDK messages
