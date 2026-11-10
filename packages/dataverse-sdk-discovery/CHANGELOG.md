# @mohsinonxrm/dataverse-sdk-discovery

## 2.0.1

### Patch Changes

- Updated dependencies [17f85cf]
- Updated dependencies [3204963]
  - @mohsinonxrm/dataverse-sdk-core@2.0.1

## 2.0.0

### Major Changes

- 4a845bf: **Breaking.** `listOrganizations({ select })` is typed by what comes back (#381). With `select`, the rows are `Pick<OrganizationDetail, K>[]` for the selected properties `K`, so `listOrganizations({ select: ["FriendlyName", "ApiUrl"] })` no longer claims `Url` and the other properties are there. `DiscoveryOptions.select` takes `OrganizationDetail` property names (`readonly (keyof OrganizationDetail)[]`) instead of any `string[]`. Options whose `select` may or may not be set (a `DiscoveryOptions` variable) resolve `Partial<OrganizationDetail>[]`; calls without `select` still resolve `OrganizationDetail[]`.

  `toEnvironment()` throws `DataverseInvalidRequestError` for a row without `Url` or `ApiUrl` (one listed with a `$select` that leaves them out) instead of a `TypeError`. The `listOrganizations()` JSDoc now says an abort rejects with `DataverseAbortError`, as it does, not a `DOMException`.

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

- 2a0fb40: `DiscoveryClient` now supports every Global Discovery Service cloud (#29). `new DiscoveryClient(tokenProvider, { cloud })` with `cloud` set to `"public"` (default), `"gcc"`, `"usg"` (GCC High), `"dod"` or `"china"` selects that cloud's endpoint and requests a token for its `https://<host>/.default` scope. Before, the token scope was always the Commercial one, even with a sovereign `baseUrl`, so the token had the wrong audience. A custom `baseUrl` now gets a scope derived from its host, `scopes` overrides the scope, and a host-only `baseUrl` gets `/api/discovery/v2.0` appended. The `(tokenProvider, baseUrl)` signature still works. New exports: `DISCOVERY_CLOUDS`, `DiscoveryCloud`, `DiscoveryCloudEndpoint`, `DiscoveryClientOptions`, and `getBaseUrl()` / `getScopes()` on the client.
- 2a9cc5a: `DiscoveryClient` now sends its requests through the SDK pipeline instead of the global `fetch` (#30). New `DiscoveryClientOptions` are `fetchProvider`, `logger`, `telemetry` and `retry`, and every method takes a `signal`, which also cancels a retry wait. 429/502/503/504 responses are retried, honouring `Retry-After`. Errors are the core's typed errors: `DataverseODataError`, or `DataverseThrottleError` for 429, both `DataverseError`s with `status`, `code` and `requestId`. Before, a plain `Error` was thrown with the status pasted into its message, so the message no longer contains the status code. `getOrganization()` and `getOrganizationsByRegion()` now escape quotes in their arguments (`o'brien` → `'o''brien'`). `$select` names are percent-encoded like the other query options. `@odata.nextLink` pages are followed. The token is never sent to a next link on another host. New type export: `DiscoveryRequestOptions`.
- 190556d: `OrganizationDetail` now matches the Global Discovery Service v2.0 `Instance` response (#28). The response is flat: `Url`, `ApiUrl`, integer `State` (`0` = enabled, `1` = disabled), `Version`, `UrlName`, `UniqueName`, `FriendlyName`, `Region`, `EnvironmentId`, `TenantId`, `LastUpdated`, the other documented properties, and `FinOpsUrl` (returned live, though not documented). The old type had an `Endpoints` object, a `Geo` property and a string `State`, none of which the service returns, so `org.Endpoints.WebApiUrl` threw at runtime. The unused `OrganizationEndpoints` type is removed.

  `getEnabledOrganizations()` now sends `$filter=State eq 0` instead of `State eq 'Enabled'`, and `getOrganizationsByRegion()` filters on `Region` instead of the nonexistent `Geo`.

  New: `getOrganizationByUrl(url)` finds an environment by its application URL or `ApiUrl` (origins compared case-insensitively), `toEnvironment(org)` returns a camel-cased `DiscoveredEnvironment` (`url`, `apiUrl`, `webApiUrl`, `name`, `uniqueName`, `enabled`, `version`, `region`, `environmentId`), and `OrganizationState` names the `State` values.

- 2d4323f: Small API additions (#274):

  - core: `buildUrl(request)` is exported. It returns the exact URL `fetch` receives for a `RequestInformation` (the URL plus `request.query`, encoded the SDK's way), so middleware can log or inspect it without re-encoding the query.
  - discovery: `DiscoveryClientOptions.middleware` customises the discovery pipeline (`prepend`, `append`, `replace`), as `DataverseClientOptions.middleware` does, so requests can be recorded without wrapping `fetchProvider`.
  - batch: `entityIdFromBatchResponse(part, options?)` returns the id of the record a create in a `$batch` made, from a `BatchResponseStep` or a decoded `BatchResponsePart`. A plain create's id comes from its `OData-EntityId` (or `Location`) header. A create sent with `Prefer: return=representation` is answered `201` with no id header (verified live, inside and outside a change set), so pass `{ primaryIdAttribute: "contactid" }` to read the id from the returned record. It throws `DataverseInvalidRequestError` saying what is missing when neither has an id.

### Patch Changes

- f363a6f: README: every TypeScript example type-checks against the 2.0 packages (#311); signature listings are marked as such. The msal-browser README drops MSAL's `storeAuthStateInCookie` (for Internet Explorer 11, deprecated in MSAL 4 and removed in MSAL 5) and describes Dataverse's CORS behaviour as the browser guide does; the appinsights `/browser` example passes a connection string it defines.
- 8c5cf39: Export `./package.json`, so `require("<package>/package.json")` and tools that read a package's version through it work.
- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- Updated dependencies [9bb1db9]
- Updated dependencies [ca11ddf]
- Updated dependencies [aec5a48]
- Updated dependencies [83f2256]
- Updated dependencies [f780438]
- Updated dependencies [c262ad7]
- Updated dependencies [f900b0c]
- Updated dependencies [9d1e26d]
- Updated dependencies [78e7716]
- Updated dependencies [a32fd68]
- Updated dependencies [b1f2738]
- Updated dependencies [e606f24]
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
- Updated dependencies [f988456]
- Updated dependencies [bf38170]
- Updated dependencies [8c5cf39]
- Updated dependencies [2bb4ed3]
- Updated dependencies [7b1ef12]
- Updated dependencies [c426eac]
- Updated dependencies [0bfa5fe]
- Updated dependencies [02038b3]
- Updated dependencies [7e13e73]
- Updated dependencies [4f96909]
- Updated dependencies [ac42045]
- Updated dependencies [e3dcff1]
- Updated dependencies [1ca3a58]
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
- Updated dependencies [ff655da]
- Updated dependencies [6df2528]
- Updated dependencies [a464f3a]
- Updated dependencies [b1bd587]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0

## 2.0.0-beta.1

### Patch Changes

- f363a6f: README: every TypeScript example type-checks against the 2.0 packages (#311); signature listings are marked as such. The msal-browser README drops MSAL's `storeAuthStateInCookie` (for Internet Explorer 11, deprecated in MSAL 4 and removed in MSAL 5) and describes Dataverse's CORS behaviour as the browser guide does; the appinsights `/browser` example passes a connection string it defines.
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

- 4a845bf: **Breaking.** `listOrganizations({ select })` is typed by what comes back (#381). With `select`, the rows are `Pick<OrganizationDetail, K>[]` for the selected properties `K`, so `listOrganizations({ select: ["FriendlyName", "ApiUrl"] })` no longer claims `Url` and the other properties are there. `DiscoveryOptions.select` takes `OrganizationDetail` property names (`readonly (keyof OrganizationDetail)[]`) instead of any `string[]`. Options whose `select` may or may not be set (a `DiscoveryOptions` variable) resolve `Partial<OrganizationDetail>[]`; calls without `select` still resolve `OrganizationDetail[]`.

  `toEnvironment()` throws `DataverseInvalidRequestError` for a row without `Url` or `ApiUrl` (one listed with a `$select` that leaves them out) instead of a `TypeError`. The `listOrganizations()` JSDoc now says an abort rejects with `DataverseAbortError`, as it does, not a `DOMException`.

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

- 2a0fb40: `DiscoveryClient` now supports every Global Discovery Service cloud (#29). `new DiscoveryClient(tokenProvider, { cloud })` with `cloud` set to `"public"` (default), `"gcc"`, `"usg"` (GCC High), `"dod"` or `"china"` selects that cloud's endpoint and requests a token for its `https://<host>/.default` scope. Before, the token scope was always the Commercial one, even with a sovereign `baseUrl`, so the token had the wrong audience. A custom `baseUrl` now gets a scope derived from its host, `scopes` overrides the scope, and a host-only `baseUrl` gets `/api/discovery/v2.0` appended. The `(tokenProvider, baseUrl)` signature still works. New exports: `DISCOVERY_CLOUDS`, `DiscoveryCloud`, `DiscoveryCloudEndpoint`, `DiscoveryClientOptions`, and `getBaseUrl()` / `getScopes()` on the client.
- 2a9cc5a: `DiscoveryClient` now sends its requests through the SDK pipeline instead of the global `fetch` (#30). New `DiscoveryClientOptions` are `fetchProvider`, `logger`, `telemetry` and `retry`, and every method takes a `signal`, which also cancels a retry wait. 429/502/503/504 responses are retried, honouring `Retry-After`. Errors are the core's typed errors: `DataverseODataError`, or `DataverseThrottleError` for 429, both `DataverseError`s with `status`, `code` and `requestId`. Before, a plain `Error` was thrown with the status pasted into its message, so the message no longer contains the status code. `getOrganization()` and `getOrganizationsByRegion()` now escape quotes in their arguments (`o'brien` → `'o''brien'`). `$select` names are percent-encoded like the other query options. `@odata.nextLink` pages are followed. The token is never sent to a next link on another host. New type export: `DiscoveryRequestOptions`.
- 190556d: `OrganizationDetail` now matches the Global Discovery Service v2.0 `Instance` response (#28). The response is flat: `Url`, `ApiUrl`, integer `State` (`0` = enabled, `1` = disabled), `Version`, `UrlName`, `UniqueName`, `FriendlyName`, `Region`, `EnvironmentId`, `TenantId`, `LastUpdated`, the other documented properties, and `FinOpsUrl` (returned live, though not documented). The old type had an `Endpoints` object, a `Geo` property and a string `State`, none of which the service returns, so `org.Endpoints.WebApiUrl` threw at runtime. The unused `OrganizationEndpoints` type is removed.

  `getEnabledOrganizations()` now sends `$filter=State eq 0` instead of `State eq 'Enabled'`, and `getOrganizationsByRegion()` filters on `Region` instead of the nonexistent `Geo`.

  New: `getOrganizationByUrl(url)` finds an environment by its application URL or `ApiUrl` (origins compared case-insensitively), `toEnvironment(org)` returns a camel-cased `DiscoveredEnvironment` (`url`, `apiUrl`, `webApiUrl`, `name`, `uniqueName`, `enabled`, `version`, `region`, `environmentId`), and `OrganizationState` names the `State` values.

- 2d4323f: Small API additions (#274):

  - core: `buildUrl(request)` is exported. It returns the exact URL `fetch` receives for a `RequestInformation` (the URL plus `request.query`, encoded the SDK's way), so middleware can log or inspect it without re-encoding the query.
  - discovery: `DiscoveryClientOptions.middleware` customises the discovery pipeline (`prepend`, `append`, `replace`), as `DataverseClientOptions.middleware` does, so requests can be recorded without wrapping `fetchProvider`.
  - batch: `entityIdFromBatchResponse(part, options?)` returns the id of the record a create in a `$batch` made, from a `BatchResponseStep` or a decoded `BatchResponsePart`. A plain create's id comes from its `OData-EntityId` (or `Location`) header. A create sent with `Prefer: return=representation` is answered `201` with no id header (verified live, inside and outside a change set), so pass `{ primaryIdAttribute: "contactid" }` to read the id from the returned record. It throws `DataverseInvalidRequestError` saying what is missing when neither has an id.

### Patch Changes

- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
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
