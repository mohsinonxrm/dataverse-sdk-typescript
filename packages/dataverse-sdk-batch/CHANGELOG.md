# @mohsinonxrm/dataverse-sdk-batch

## 2.0.0-beta.1

### Minor Changes

- c81fc72: Bulk helpers: `createMultiple()` and `updateMultiple()` (#310).

  - **Chunks.** The records are split into chunks of `batchSize` (1 to 1000, default 100), each sent as one `CreateMultiple` / `UpdateMultiple` request (`strategy: "bulk"`, the default) or as one `$batch` with a request per record and `odata.continue-on-error` (`strategy: "batch"`, for tables without bulk support; updates are `PATCH` with `If-Match: *`, so a missing row isn't created). `maxParallel` sends several chunks at once; the client's retry policy and concurrency limit apply to every request.
  - **Per-record results.** `BulkOperationResult.results` has one entry per record, in input order: `"succeeded"` with its `id` (the created id, or the updated row's key), `"failed"` with the typed `error`, or `"skipped"` (not sent: without `continueOnError`, no chunk is sent after one with a failure). On a standard table a failed chunk fails all its records (Dataverse rolls it back); on an elastic table only the records named by the `Microsoft.PowerApps.CDS.ErrorDetails.*` annotations fail, each with its own status.
  - **Cancellation.** `signal`, `timeoutMs` (the whole operation), `attemptTimeoutMs` and `correlationId`, as for `execute()`. Stopped after a request finished, the helpers reject with the new `DataverseBulkOperationError`, whose `result` holds every record's outcome so far.
  - New types: `BulkTable`, `BulkStrategy`, `BulkOperationOptions`, `BulkOperationResult`, `BulkRecordResult`, `BulkRecordStatus`, `DataverseBulkOperationErrorInit`.

- 0e1dc6f: Detect which bulk-operation messages a table supports (#346).

  - **`getBulkOperationSupport(client, logicalName, options?)`** returns `BulkOperationSupport`: `elastic`, `createMultiple`, `updateMultiple`, `upsertMultiple` and `deleteMultiple`. Elastic tables support all four; a standard table supports `CreateMultiple` / `UpdateMultiple` when it has an `sdkmessagefilter` for the message, `UpsertMultiple` when it supports both, and never `DeleteMultiple`. Two read-only `GET`s (the table's `TableType` and its `sdkmessagefilters`), cached per client and table; `refresh: true` reads again, and a failed lookup isn't cached. `BulkOperationSupportOptions` also takes `signal` and `timeoutMs`.
  - **`strategy: "auto"`** for `createMultiple()` and `updateMultiple()`: the bulk message when the table supports it, otherwise `$batch`. `result.strategy` says which was used.

- ff655da: **Breaking.** Telemetry events and W3C trace context (#97).

  - **`TelemetryClient.trackDependency` is replaced by `startDependency(name, data)`** (core). The SDK calls it before each request attempt and calls `end(data)` on the `DependencyHandle` it returns once the attempt is done, with `durationMs`, `success` and `resultCode`. The handle can carry `headers` (`traceparent`, `tracestate`), which the SDK sends with the attempt, and `run(fn)`, which makes the dependency the active span while the attempt runs. A custom client moves its `trackDependency` body into `end` (see the 2.0 migration guide). Each retry and each resend after a 401 is its own dependency, started in the caller's context.
  - **Trace context goes to Dataverse.** Only a valid `traceparent` and its `tracestate` are sent, only to origins that may receive the access token (`baseUrl` and `allowedTokenOrigins`), and `diagnosticHeaders: false` or the new `diagnosticHeaders: { traceContext: false }` turns it off.
  - **Events.** `trackEvent` now receives `dataverse.throttle` (each 429, with the limit hit, `Retry-After` and `x-ms-dop-hint`), `dataverse.retry` (before each retry wait), `dataverse.concurrency.wait` (a request waited for a slot) and `dataverse.concurrency.limit` (`x-ms-dop-hint` changed the limit). The names are exported as `TelemetryEvents`. A request with telemetry turned off sends none.
  - **`DataverseClient.trackEvent(name, props, measurements)`** sends an event to the client's telemetry, guarded like the SDK's own calls. The batch package uses it to report `dataverse.batch` for each `$batch` (requests, succeeded, failed, duration, status, correlation id); `execute()` now generates the `$batch` correlation id itself when you don't pass one.
  - **otel and appinsights:** `OpenTelemetryClient` and `ApplicationInsightsTelemetryClient` implement `startDependency`: the CLIENT span starts with the active context, is active while the attempt runs (so `fetch` auto-instrumentation spans are its children), carries `http.request.resend_count` on retries, and its context is injected with the registered propagator, so the request carries its `traceparent`. `trackDependency` is removed from both.

### Patch Changes

- 9c6d970: README: a request that later ones refer to as `$<id>` can't use `Prefer: return=representation`; Dataverse doesn't register its Content-ID then.
- Updated dependencies [9bb1db9]
- Updated dependencies [83f2256]
- Updated dependencies [f780438]
- Updated dependencies [e606f24]
- Updated dependencies [f988456]
- Updated dependencies [1ca3a58]
- Updated dependencies [ff655da]
- Updated dependencies [b1bd587]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0-beta.1

## 2.0.0-beta.0

### Major Changes

- d9eebf3: **2.0.0.** Every package moves to 2.0.0 together. Most of 2.0 fixes code that didn't work against Dataverse in 1.0, and several changes alter existing behaviour. See [docs/migration-2.0.md](https://github.com/mohsinonxrm/dataverse-sdk-typescript/blob/main/docs/migration-2.0.md) for what to change. In short:

  - **Install:** Node 22+. `@azure/msal-browser`, `@azure/msal-node`, and the OpenTelemetry and Azure Monitor packages are now peer dependencies of the auth and telemetry packages (#24, #85, #159).
  - **core:** nothing is logged by default. URLs in logs and telemetry are redacted.
  - **core, retries:** a `Retry-After` beyond `retry.maxRetryAfterMs` (30 s) is returned instead of waited out, and non-idempotent requests aren't replayed after 502/503/504.
  - **core, timeouts:** `timeoutMs` covers the whole request.
  - **core, pipeline:** the default middleware order is ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging.
  - **core, queries:** query options are encoded with `%20`, and `expand()` calls add up.
  - **core, removed options:** `RetryOptions.delay` and `useExponentialBackoff`, `circuitBreaker`, `bulkhead` and `DataverseError.statusCode` are gone (#285).
  - **errors:** every SDK error extends `DataverseError`. Network failures and aborts are `DataverseNetworkError` and `DataverseAbortError`. A 412 is a `DataverseDuplicateError` only for `0x80040333`.
  - **metadata:** enums are string member names, and creates return the id from `OData-EntityId`.
  - **xrm:** record ids must be GUIDs, and entity sets come from metadata. `execute()` infers its result from the request, and records are `EntityRecord` instead of `any`.
  - **discovery:** `OrganizationDetail` matches the v2.0 response.
  - **actions, functions, messages:**
    - constructors take one object with the parameters by name; a bound operation's record id or entity set comes first, and bulk operations take the entity set first (#96);
    - each binding of an overloaded operation has its own class, and the plain-name classes of bound-only operations are removed (#286);
    - one `EntityReference` for the whole SDK: `createEntityReference` returns the Web API shape and takes an options object (#295);
    - `client.execute()` resolves the operation's value, not the OData envelope: the entity (`null` for a 204), the array, the primitive, or nothing (#300);
    - `toRequestBody()` is removed.

  See each package's CHANGELOG for the full list.

### Minor Changes

- da62e18: The batch encoder writes what Dataverse accepts, and the decoder keeps every response (#55, #56).

  - **Encoder.** A part without a body now ends its headers with a blank line (without it Dataverse rejected the whole batch with 400 `0x80060888`). A part with a body gets `Content-Type: application/json; type=entry` unless the request sets a content type (without it Dataverse answered 400 `0x80048d19`). Requests and changesets are sent in the order they were added, instead of all requests first.
  - **Content-IDs.** Inside a changeset each request's own id is its `Content-ID`, so ids no longer collide across changesets and a later request can refer to an earlier one as `$<id>`. Changeset ids may only contain letters, digits, `.`, `_`, `~` and `-`. `dependsOn` is now checked: every id must be an earlier request of the same changeset.
  - **URLs.** `BatchRequestBuilder` resolves relative URLs (`accounts`, `/accounts`) against the client's Web API root, and leaves `$<id>` references alone.
  - **Decoder.** `decodeBatchResponse()` returns every operation response in order, including the ones outside a changeset that have no `Content-ID` (they were all dropped). It parses header names and media types case-insensitively, accepts quoted boundaries, LF-only line endings and trailing whitespace on boundary lines, lower-cases header names and never trims bodies (`bodyText` keeps the exact text).
  - **Results.** Responses are keyed by the id passed to `addRequest()` (they were keyed by Content-ID). `BatchExecutionResult` gains `results` (in request order), `skippedRequestIds` and `stoppedEarly`. `BatchResponseStep.headers` names are lower-cased, and `bodyText` is new.
  - **Exports.** `encodeBatchRequest`, `decodeBatchResponse`, `generateBoundary`, `generateChangesetBoundary`, `extractBoundary`, `JSON_PART_CONTENT_TYPE` and the `BatchItem`, `BatchChangeset`, `BatchResponsePart` and `EncodeBatchOptions` types. `BatchRequestBuilder.encode(boundary)` returns the body `execute()` sends.

- 6c7af76: `continueOnError` returns the result, errors carry it, and large batches are split (#57).

  - **`continueOnError`.** `execute({ continueOnError: true })` no longer throws when a request fails: it returns the result, with `success: false` and the failures in `errors`. Without it, Dataverse stops at the first failure and `execute()` throws `DataverseBatchError` as before, but the error now has `result` with every response received, in order, plus `skippedRequestIds` and `stoppedEarly`. `requestErrors` still holds only the failures.
  - **Typed per-request errors.** Each value in `result.errors` is the error `client.api()` would throw for the same response: `DataverseODataError` (or `DataverseThrottleError` for 429), with `status`, `code`, Dataverse's `message`, `headers`, `body` and `requestId`.
  - **Auto-split.** More than `batchSize` requests (default and maximum: 1000, the Dataverse limit; it was documented as 10 but never used) are sent as several `$batch` requests, one after the other, without splitting a changeset. Without `continueOnError`, the batches after the first one with a failure are not sent. If a later batch fails as a whole, `execute()` throws `DataverseBatchError` with the earlier batches' `result` and the typed error as `cause`. A changeset over 1000 requests, or a `batchSize` outside 1 to 1000, throws. `execute()` threw "split manually" for more than 1000 requests before.
  - **Docs.** The batch sections of the getting-started guide, the bulk-vs-batch guide, the supported-messages guide, the API surface, ADR-0001 and the samples list now show the real `addRequest(id, method, url, …)` signature, `beginChangeset()`, results keyed by id, `continueOnError` as a batch option, and `$<id>` references.

- bf38170: Every type the public API uses is now exported, so an app can name it, for example to type a wrapper or a mock (#397):

  - core: `DependencyTelemetry` (what `TelemetryClient.trackDependency` receives, now a named interface), `BuiltInMiddlewareOptions`, and `EqValue` (the values `odata.eq()` / `odata.ne()` take). The per-request retry options are the same `RetryOptions` type as the client's, so there is one `RetryOptions`.
  - batch: `DataverseBatchErrorConstructor`.
  - files: `FileSource` (what `upload()` accepts).
  - generator: `EntityKeyType`, and `RetrieveMetadataChangesResponse` with the metadata detail types it uses.
  - otel, appinsights: their dependency data is core's `DependencyTelemetry`.
  - metadata: `RequiredEntityProperty`.

- 254a8ec: No `any` in the public API. **Breaking for TypeScript callers.**

  - **batch:** `BatchResponseStep.body` and `BatchResponsePart.body` are `unknown`. Both types take a generic for the body, `BatchResponseStep<TBody = unknown>`, so name the type of a response you know (`result.responses.get("who") as BatchResponseStep<WhoAmIResponse> | undefined`) or check the value. The request body of `addRequest()` and `BatchRequestStep` is `unknown`; every value is still accepted.
  - **entities-runtime:** `IEntity`'s index signature is `[key: string]: unknown`. Declared columns keep their types; any other property must be checked before use.
  - **core:** `DataverseServiceError.fromResponse(response, body?)` takes `body` as `unknown` and reads `code` and `message` only when they are strings. A response body that isn't JSON is kept as the text instead of making `fromResponse()` throw. `DataverseBatchError<TResult, TStep>` defaults its type parameters to `unknown` instead of `any` (the batch package still narrows them).
  - **auth-msal-node, generator:** internal `as any` casts replaced with narrowing; no behaviour change.

- 496b4cb: Land the repository review fixes.

  - `DataverseClient` now rejects non-HTTPS base URLs with `DataverseInvalidRequestError` (`InvalidBaseUrl`). Plain `http://` is still allowed for `localhost`, `127.0.0.1` and `[::1]`.
  - `getAll({ maxPages })` now stops after `maxPages` requests (previously the limit was ignored), and `maxItems` stops paging as soon as it is reached.
  - A request that exceeds `timeoutMs` now rejects with `DataverseNetworkError` (`RequestTimeout`) instead of a raw `AbortError`.
  - `iterate()` and `getPage()` accept a `signal`, which is passed to every follow-up page request.
  - New `odata` filter helper (`odata.eq`, `contains`, `and`, …) that escapes single quotes in string literals.
  - `AccessTokenProvider.getToken()` now declares `scopes` as optional, which matches every built-in provider.
  - **Behaviour change:** `bindMany()` no longer loads the batch package with `new Function("import(...)")`, which failed under a strict Content-Security-Policy and in bundlers. To send the associations as one `$batch`, pass an executor: `bindMany(nav, entitySet, ids, createBindManyExecutor())`, using the new `createBindManyExecutor` from `@mohsinonxrm/dataverse-sdk-batch`. Without an executor, `bindMany()` sends one request per id (#20).

- 2d4323f: Small API additions (#274):

  - core: `buildUrl(request)` is exported. It returns the exact URL `fetch` receives for a `RequestInformation` (the URL plus `request.query`, encoded the SDK's way), so middleware can log or inspect it without re-encoding the query.
  - discovery: `DiscoveryClientOptions.middleware` customises the discovery pipeline (`prepend`, `append`, `replace`), as `DataverseClientOptions.middleware` does, so requests can be recorded without wrapping `fetchProvider`.
  - batch: `entityIdFromBatchResponse(part, options?)` returns the id of the record a create in a `$batch` made, from a `BatchResponseStep` or a decoded `BatchResponsePart`. A plain create's id comes from its `OData-EntityId` (or `Location`) header. A create sent with `Prefer: return=representation` is answered `201` with no id header (verified live, inside and outside a change set), so pass `{ primaryIdAttribute: "contactid" }` to read the id from the returned record. It throws `DataverseInvalidRequestError` saying what is missing when neither has an id.

### Patch Changes

- f256212: `execute()` can be cancelled and timed out, and `addRequest()` rejects parts that can't be sent (#379).

  - **Cancellation.** `BatchExecutionOptions` has `signal`, `timeoutMs`, `attemptTimeoutMs` and `correlationId`, passed to every `$batch` request. Aborting stops the `$batch` in flight and sends no later `$batch` of a split batch. `timeoutMs` covers the whole execution, every `$batch` included. Before or during the first `$batch`, `execute()` rejects with `DataverseAbortError` (or `DataverseNetworkError` named `RequestTimeout`); after one has run, with a `DataverseBatchError` whose `cause` is that error and whose `result` holds what ran.
  - **Validation.** `addRequest()` throws `DataverseInvalidRequestError`, and doesn't add the request, for a GET inside a changeset (Dataverse forbids it); a CR, LF or NUL in a header value or the URL, an invalid header name or an invalid method (they would add lines to the multipart body); and a `$<id>` URL outside a changeset or naming no earlier request of the open changeset (Content-ID references only work inside one). Write a path such as `$metadata` as `/$metadata`.

- b9457f1: `BatchRequestBuilder.execute()` works against Dataverse (#54). It sent the batch through `client.api("/$batch").post(body, headers)`, which took the headers as request options and dropped them, sent the body as `application/json` and parsed the multipart response as JSON, so every batch failed. It now sends one `POST $batch` through `client.send()` with the multipart body unchanged, `Content-Type: multipart/mixed; boundary=…` and, with `continueOnError`, `Prefer: odata.continue-on-error` (combined with any `Prefer` in `options.headers`). It decodes the multipart response whatever its status, because Dataverse answers a batch whose first failure is a 4xx with that status but still a multipart body. A batch that fails as a whole (JSON error) throws the typed `DataverseODataError`, or `DataverseThrottleError` for 429. `createBindManyExecutor()` works through it.
- aec5a48: `bindMany()` works without the batch package, and `associate()` works against Dataverse (#20).

  - **`bindMany()` without an executor.** The executor argument is now optional. Without it, `bindMany()` sends one `POST …/{nav}/$ref` per id, in order, through the client's pipeline, and stops at the first failure. Pass `createBindManyExecutor()` to send a single `$batch` instead. No `eval` or `new Function` is involved, so it works under a strict CSP, and the browser smoke test checks that.
  - **`associate()` sends an absolute `@odata.id`.** Dataverse rejected the relative `/contacts(id)` it used to send with "the odata.context annotation is missing from the payload", so `associate()`, and with it `bindMany()`, never worked live. The batch package's `createBindManyExecutor()` gets the same fix.
  - **Lint.** `no-eval`, `no-new-func` and `@typescript-eslint/no-implied-eval` are now errors.

- 56dfa86: README: `clear()` returns the builder.
- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- dd2acd8: One `DataverseBatchError`. Core now holds the class (with `partErrors`, `requestErrors`, `result` and the request helpers) and the batch package re-exports it, so `err instanceof DataverseBatchError` is true whichever package it is imported from. `execute()` still throws it with `result`, and now also fills `partErrors`. Core's constructor accepts both its old short form and the batch form.
- 9728b8c: `associate()`, `disassociate()` and `bindMany()` now send their `$ref` requests with the builder's impersonation (`MSCRMCallerID` / `CallerObjectId`) and custom headers (#355). Before, `client.api(…).impersonate(userId).associate(…)` ran as the calling identity. They also take request options (`signal`, `timeoutMs`, `headers`, `correlationId`, …) as a last argument.

  A `BindManyExecutor` receives those headers and options as a sixth argument, and `createBindManyExecutor()` from the batch package sends them on its `$batch`. It also does nothing for an empty list (it used to throw "Cannot execute empty batch"), associates an id listed twice once, and formats keys the way `associate()` does (`odataKey`).

- Updated dependencies [ca11ddf]
- Updated dependencies [aec5a48]
- Updated dependencies [c262ad7]
- Updated dependencies [f900b0c]
- Updated dependencies [9d1e26d]
- Updated dependencies [78e7716]
- Updated dependencies [a32fd68]
- Updated dependencies [b1f2738]
- Updated dependencies [eb27877]
- Updated dependencies [afb5242]
- Updated dependencies [60ccef3]
- Updated dependencies [7096f24]
- Updated dependencies [08efbd7]
- Updated dependencies [6b0dc00]
- Updated dependencies [4c62fee]
- Updated dependencies [1848068]
- Updated dependencies [c3337f8]
- Updated dependencies [63ee065]
- Updated dependencies [39b3917]
- Updated dependencies [bf38170]
- Updated dependencies [2bb4ed3]
- Updated dependencies [7b1ef12]
- Updated dependencies [c426eac]
- Updated dependencies [0bfa5fe]
- Updated dependencies [02038b3]
- Updated dependencies [7e13e73]
- Updated dependencies [4f96909]
- Updated dependencies [ac42045]
- Updated dependencies [e3dcff1]
- Updated dependencies [254a8ec]
- Updated dependencies [6bbb784]
- Updated dependencies [dd2acd8]
- Updated dependencies [652ad75]
- Updated dependencies [329c0b0]
- Updated dependencies [608d915]
- Updated dependencies [9728b8c]
- Updated dependencies [d9eebf3]
- Updated dependencies [365ceca]
- Updated dependencies [3d4614d]
- Updated dependencies [61bd4aa]
- Updated dependencies [4e804b4]
- Updated dependencies [b040687]
- Updated dependencies [496b4cb]
- Updated dependencies [d3a1a01]
- Updated dependencies [2d4323f]
- Updated dependencies [e237826]
- Updated dependencies [6df2528]
- Updated dependencies [a464f3a]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0-beta.0

## 1.0.0

### Major Changes

- 78fc1e1: Initial v1.0.0 release of Dataverse SDK for TypeScript

### Patch Changes

- Updated dependencies [78fc1e1]
  - @mohsinonxrm/dataverse-sdk-core@1.0.0

## 1.0.0

### Major Changes

- # v1.0.0 - Initial Release 🎉

  The first stable release of the Dataverse SDK for TypeScript! This modern, type-safe SDK provides comprehensive access to Microsoft Dataverse (Power Platform) with two complementary front doors:
  1. **HTTP/OData Fluent API** - Microsoft Graph-inspired request builder pattern
  2. **OrganizationService** - C#-familiar interface for Dataverse developers

  ## 🚀 Key Features

  ### Core Infrastructure
  - **Middleware Pipeline** - Extensible request/response processing with auth, retry, concurrency, and telemetry
  - **Automatic Retries** - Smart retry logic honors `Retry-After` headers (429, 502+)
  - **Adaptive Concurrency** - Respects `x-ms-dop-hint` for optimal throughput
  - **Type-Safe** - Strict TypeScript throughout with 1,356+ generated message types
  - **ESM-Only** - Modern, tree-shakeable ES Modules for optimal bundle sizes

  ### Authentication
  - **MSAL Browser** - SPA/browser authentication with token caching
  - **MSAL Node** - CLI/daemon auth (device code, client credentials)
  - **Azure Identity** - Modern Azure authentication library support

  ### Operations
  - **$batch Operations** - Auto-splitting at 1,000 requests, change sets, error handling
  - **Typed Actions** - 1,356 generated action classes with full type safety
  - **Typed Functions** - 229 generated function classes
  - **Typed Messages** - 1,356 message request/response pairs (direct exports, no namespaces)
  - **Bulk Operations** - CreateMultiple, UpdateMultiple, UpsertMultiple, DeleteMultiple
  - **File Operations** - Chunked upload/download for file and image columns (4MB default chunks)

  ### Metadata
  - **Strict Typing** - Generated from Dataverse v9.2 metadata (Sales + Customer Service)
  - **Read/Create/Update Split** - Separate types prevent invalid writes
  - **Metadata Client** - Type-safe operations for EntityDefinitions, RelationshipDefinitions, etc.
  - **RetrieveMetadataChanges** - Efficient incremental metadata queries

  ### Developer Experience
  - **Two Front Doors** - Choose HTTP fluent API OR OrganizationService patterns
  - **Comprehensive Samples** - Node CLI, daemon, batch ops, file ops, metadata, messages
  - **Fluent Builders** - Chainable OData query building (select, filter, expand, orderby, etc.)
  - **Prefer Headers** - Type-safe helper for returnRepresentation, includeAnnotations, etc.
  - **Paging** - get(), getPage(), iterate(), getAll() with configurable limits

  ### Telemetry & Observability
  - **Application Insights** - Optional adapter package
  - **OpenTelemetry** - Optional adapter package
  - **Custom Telemetry** - Implement TelemetryClient interface
  - **Correlation IDs** - Automatic x-ms-client-request-id propagation

  ## 📦 Packages

  All packages published under `@mohsinonxrm` scope:

  **Foundation:**
  - `dataverse-sdk-core` - Pipeline, middleware, fluent API, request builder
  - `dataverse-sdk-entities-runtime` - Runtime for generated entities

  **Authentication:**
  - `dataverse-sdk-auth-msal-browser` - MSAL browser token provider
  - `dataverse-sdk-auth-msal-node` - MSAL node token provider
  - `dataverse-sdk-auth-azure-identity` - Azure Identity token provider

  **Core Operations:**
  - `dataverse-sdk-batch` - $batch operations with change sets
  - `dataverse-sdk-xrm` - OrganizationService facade
  - `dataverse-sdk-discovery` - Global Discovery Service (Commercial)

  **Typed Operations:**
  - `dataverse-sdk-actions` - 1,356 typed Web API actions
  - `dataverse-sdk-functions` - 229 typed Web API functions
  - `dataverse-sdk-messages` - 1,356 typed messages (direct exports)

  **Advanced:**
  - `dataverse-sdk-metadata` - Metadata operations + strict typing
  - `dataverse-sdk-files` - File/image column operations with chunking

  **Tooling:**
  - `dataverse-sdk-generator` - Early-bound entity generator

  **Telemetry (Optional):**
  - `dataverse-sdk-appinsights` - Application Insights adapter
  - `dataverse-sdk-otel` - OpenTelemetry adapter

  ## 🔄 Breaking Changes from Pre-Release

  ### Direct Exports (No Namespaces)

  **Previous (Pre-Release):**

  ```typescript
  import { XrmSdkMessages, CrmSdkMessages } from "@mohsinonxrm/dataverse-sdk-messages";
  const request = new XrmSdkMessages.WhoAmIRequest();
  ```

  **Now (v1.0):**

  ```typescript
  import { ExecuteWorkflowRequest, MergeRequest } from "@mohsinonxrm/dataverse-sdk-messages";
  const request = new ExecuteWorkflowRequest("workflow-id", "entity-id", {});
  ```

  **Rationale:** Direct named exports enable better tree-shaking, simpler imports, and align with modern ESM practices.

  ### Constructor Signatures

  Auto-generated message/action/function classes use positional constructor parameters rather than options objects. Refer to package READMEs and IntelliSense for specific signatures.

  ## 📚 Documentation
  - **ADRs:** Comprehensive architecture decision records in `docs/adr/`
  - **Mapping Docs:** Web API action/function/message mappings in `docs/mapping/`
  - **Samples:** 7 working samples demonstrating key patterns
  - **Package READMEs:** Installation and usage for each package

  ## ⚡ Quick Start

  ```bash
  # Install core + auth
  pnpm add @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-node

  # For OrganizationService pattern
  pnpm add @mohsinonxrm/dataverse-sdk-xrm @mohsinonxrm/dataverse-sdk-messages

  # For batch operations
  pnpm add @mohsinonxrm/dataverse-sdk-batch

  # For file operations
  pnpm add @mohsinonxrm/dataverse-sdk-files
  ```

  **Fluent API Example:**

  ```typescript
  import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
  import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

  const client = new DataverseClient({
    baseUrl: "https://org.crm.dynamics.com/api/data/v9.2",
    tokenProvider: new MsalNodeTokenProvider(msalConfig),
  });

  const accounts = await client
    .api("/accounts")
    .select(["name", "revenue"])
    .filter("revenue gt 100000")
    .top(10)
    .get();
  ```

  **OrganizationService Example:**

  ```typescript
  import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
  import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

  const service = new OrganizationService(client);

  const request = new ExecuteWorkflowRequest("workflow-id", "entity-id", {});
  const response = await service.execute(request);
  ```

  ## ⚠️ Known Limitations
  1. **Integration Tests:** Unit tests comprehensive; integration tests require live Dataverse environment (deferred to v1.0.1)
  2. **Actions Package Tests:** 18 test failures due to constructor signature mismatches with auto-generated classes (functionality confirmed working in samples)
  3. **SPA Sample:** Skeleton only (deferred to v1.0.1)

  ## 🔮 Roadmap

  **v1.0.1 - Polish Release** (Planned: +2 weeks)
  - Complete SPA Fluent UI v9 sample
  - Enhanced package READMEs
  - Migration guides
  - Troubleshooting documentation
  - Fix actions package test implementation

  **v1.1 - Fast-Follow** (Planned: +3 months)
  - Duplicate detection package
  - Stream-based file operations
  - Elastic table partial success handling
  - Expanded messages coverage
  - Integration tests against live Dataverse

  **v1.2+ - Enterprise Features** (2027+)
  - Circuit breaker middleware
  - Bulk head isolation
  - Audit operations package
  - Async operation polling
  - FetchXML query builder

  ## 📄 License

  GNU Affero General Public License v3.0 (AGPL-3.0)

  ## 🙏 Acknowledgments

  Built with inspiration from:
  - Microsoft Graph SDK for TypeScript/JavaScript
  - dataverse-gen (comparison analysis in docs/architecture/)
  - Microsoft Dataverse Web API documentation
  - C# SDK patterns and naming conventions

  ***

  **Migration Note:** If upgrading from pre-release versions, review breaking changes section above and update imports to use direct exports instead of namespaces.

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @mohsinonxrm/dataverse-sdk-core@1.0.0
