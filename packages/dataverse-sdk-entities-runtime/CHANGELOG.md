# @mohsinonxrm/dataverse-sdk-entities-runtime

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

- bd2407e: Entities can be sent to the Web API as documented, and lookups are bound (#79).

  - `IEntity.logicalName` is optional, and generated entity interfaces no longer declare it. The README examples posted entities with a `logicalName` property, which the Web API rejects with HTTP 400 ("Error identified in Payload provided by the user"). `formatEntityForWrite()` drops it.
  - `formatEntityForWrite(entity, metadata, options?)` turns lookups into `@odata.bind`. An `EntityReference` value becomes `"<navigation property>@odata.bind": "/<entity set>(<id>)"`, and an array of references becomes an array of paths. A polymorphic lookup (`customerid`, `parentcustomerid`) is bound through the navigation property for the reference's table (`parentcustomerid_account`). The entity set comes from the new `EntityReference.entitySetName`, then `options.entitySetNames`, then `options.metadataCache` (pass the generated `EntityMetadataCache`). If none of them has it, it throws a `DataverseInvalidRequestError`. It now returns `Record<string, unknown>`.
  - Generated single-valued navigation properties are typed `Target | EntityReference`, so `primarycontactid: createEntityReference("contact", id)` type-checks.

- f804b33: Generated functions send valid parameters, and bound actions and functions call the bound URL (#77).

  - Function parameters were written with `String()`, so strings went unquoted, enums as bare numbers and complex values as `[object Object]`. Every function with a string, enum or complex parameter failed. Each value is now written as the OData literal for its type, by the new `formatParameterAlias(value, odataType, kind)` in entities-runtime:
    - strings are quoted, with `'` doubled;
    - GUIDs, numbers and booleans are written bare, and `Date` values as ISO strings (`Edm.Date` takes only the date part);
    - enum values become `Microsoft.Dynamics.CRM.<Enum>'<value>'`;
    - collections and complex values become JSON, and entity references `{"@odata.id":"<set>(<id>)"}`.

    The aliases are numbered (`@p1`) and URL-encoded into the URL. Functions without parameters are called with `()`.

  - Bound operations were called as unbound (`/<Name>`). They now use `/<set>(<id>)/Microsoft.Dynamics.CRM.<Name>` for one record and `/<set>/Microsoft.Dynamics.CRM.<Name>` for a collection. The constructor takes the record id first (`<table>Id`), or a `target: EntityReference` (or `entitySetName`) when the bound type has no entity set.
  - An operation bound to several tables gets one class per binding (`RetrieveUnpublished_savedqueryFunction`) instead of each overload overwriting the same file. `ActionMetadata` and `FunctionMetadata` are keyed the same way.
  - Trailing nullable parameters are optional, and `undefined` ones are left out of the call.
  - A function's entity-typed parameter accepts an `EntityReference`. `getStructuralType()` recognises entity types that aren't generated (`crmbaseentity`).
  - New in entities-runtime: `formatParameterAlias`, `formatRecordPath` and `ParameterKind`.

- 00f78a6: `dataverse-gen` now marks business-required columns: the Web API sends `RequiredLevel.Value` as the member name (`"ApplicationRequired"`), which was compared to the number `2`, so no generated column was ever `isRequired`. Generated attribute metadata also gets `requiredLevel` (`SystemRequired`, `ApplicationRequired` or `Recommended`) for any level other than `None`; `AttributeMetadata` in entities-runtime has the new optional field.
- ff4060e: `dataverse-gen` now runs against a real org, and the code it generates type-checks (#78).

  Generator:

  - `RetrieveMetadataChanges` is called as the function it is (`GET RetrieveMetadataChanges(Query=@q)`). Before, the generator POSTed to it, Dataverse answered 404, and generation stopped at the first entity.
  - `enum.ejs` used the reserved word `enum` as a variable, so rendering any enum threw. Every org has enum types in `$metadata`, so generation never got past that point.
  - Types written with the schema alias (`mscrm.contact`, which is how `$metadata` refers to its own types) are resolved. Navigation properties, option sets, complex types, enums and operation parameters get their generated type, with an import; an entity that isn't generated (or an abstract one such as `crmbaseentity`) becomes `IEntity`.
  - Entity interfaces and files are named after the table's schema name (`Account` in `entities/Account.ts`, with `AccountMetadata`), as the README and the CLI's own output already said. Reserved words (`import`, `package`) are made safe.
  - Option labels become valid, unique enum member names (`Financial Services` becomes `FinancialServices`).
  - Entity metadata now matches `EntityMetadata`: `attributeTypes` maps each column to its OData type, and the details go in `attributes`.
  - Actions and functions return their result type directly: the complex type or entity for structured results, the response's `value` for primitives and collections. The `<Name>Response` wrapper interfaces (`{ result }`) are gone; they also clashed with the complex types of the same name in the root `index.ts`. (Since #300, `<Class>Response` is exported again as the type of the value itself, not a wrapper.)
  - `metadata.ts` and the root `index.ts` honour `output.fileSuffix`; an empty folder gets an `export {}` index.
  - With no `entities` list, only tables are generated (abstract types and types without an entity set are skipped).
  - Comments and string literals are escaped, so labels with `*/` or quotes can't break the output.

  Entities runtime:

  - `ActionBase` and `FunctionBase` implement core's `Executable`, and `toRequestInformation()` returns core's `RequestInformation`, so generated operations can be passed to `client.execute()` without a cast. The package now depends on `@mohsinonxrm/dataverse-sdk-core` and re-exports `Executable` and `RequestInformation`. A hand-written subclass whose `toRequestInformation()` returned `method: string` must now return an `HttpMethod` (annotate the return type as `RequestInformation`).
  - `AttributeMetadata` has optional `odataType`, `isRequired`, `sourceType` and `isMultiSelect`; `NavigationMetadata` has optional `fullName`, `isPolymorphic` and `targets`.

- 254a8ec: No `any` in the public API. **Breaking for TypeScript callers.**

  - **batch:** `BatchResponseStep.body` and `BatchResponsePart.body` are `unknown`. Both types take a generic for the body, `BatchResponseStep<TBody = unknown>`, so name the type of a response you know (`result.responses.get("who") as BatchResponseStep<WhoAmIResponse> | undefined`) or check the value. The request body of `addRequest()` and `BatchRequestStep` is `unknown`; every value is still accepted.
  - **entities-runtime:** `IEntity`'s index signature is `[key: string]: unknown`. Declared columns keep their types; any other property must be checked before use.
  - **core:** `DataverseServiceError.fromResponse(response, body?)` takes `body` as `unknown` and reads `code` and `message` only when they are strings. A response body that isn't JSON is kept as the text instead of making `fromResponse()` throw. `DataverseBatchError<TResult, TStep>` defaults its type parameters to `unknown` instead of `any` (the batch package still narrows them).
  - **auth-msal-node, generator:** internal `as any` casts replaced with narrowing; no behaviour change.

- 3387804: One `EntityReference` for the whole SDK (#295).

  The actions, functions, messages, entities-runtime and xrm packages each defined their own `EntityReference`, and the actions and messages ones each had their own `unique symbol` brand, so a reference from one package's `createEntityReference` didn't type-check where another package wanted one.

  - **entities-runtime defines it:** `EntityReference`, `createEntityReference`, `getEntitySetNameFromReference`, `EntityReferenceOptions`, `WebApiEntityReference` and `isEntityReference`. It depends only on core, so every package can import it without a cycle.
  - **actions, functions, messages and xrm import and re-export the same ones** (they now depend on entities-runtime), so existing imports keep working and a reference from any package is accepted by every package. The generator no longer writes an `EntityReference.ts` into actions, functions or messages; it writes the entity sets and primary keys `createEntityReference` reads to entities-runtime's `src/generated/entity-tables.ts` (the new `references` target).
  - **Breaking: one signature,** `createEntityReference(logicalName, id, { primaryIdAttribute?, entitySetName?, name? })`. The display name is an option: `createEntityReference("contact", id, "Jane")` becomes `createEntityReference("contact", id, { name: "Jane" })`.
  - **Breaking: always the Web API shape.** entities-runtime's and xrm's references were plain `{ logicalName, id, name?, entitySetName? }` objects. Now every reference is `{ "@odata.type", <primary key> }` with `logicalName`, `id`, `entitySetName` and `name` not enumerable, and `entitySetName` is filled in for the tables in the `$metadata` snapshot, so `formatEntityForWrite()` and `associate()` need no lookup for them.
  - **Breaking: only `createEntityReference` makes one.** A hand-written `{ logicalName, id }` no longer type-checks as a function parameter, an xrm `associate()` reference or an entities-runtime lookup, and `isEntityReference()` (so `formatEntityForWrite()`) also requires `@odata.type`.
  - **metadata:** `src/types` is regenerated from the committed `$metadata` snapshot by `regen`, and CI checks it like the other generated packages. The response types of operations the snapshot doesn't have are removed (`QuerySalesforceUnstructuredDataResponse`, `QueryZendeskUnstructuredArticlesResponse`, the Field Service `msdyn_…Response` types and others), the types the snapshot adds are new, and interface members are in name order.

### Patch Changes

- 0a43f6d: `formatEntityForWrite()` clears a lookup set to `null` the way Dataverse expects: `{ primarycontactid: null }` becomes `"primarycontactid@odata.bind": null` (#363). Before, it was sent as `"primarycontactid": null`, which Dataverse rejects because a lookup's logical name isn't a writable property. A polymorphic lookup such as `parentcustomerid` is cleared through the navigation property of each of its targets (`parentcustomerid_account`, `parentcustomerid_contact`).
- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- 652ad75: One OData literal serializer (#254).

  - **Core** adds `odataLiteral.parameter(value, odataType, kind?)`, which writes an operation parameter from its OData type, and the helpers it needs: `odataLiteral.json` (record references become `@odata.id`), `odataLiteral.reference`, `odataLiteral.recordPath`, `odataLiteral.duration` and `odataLiteral.binary`. `odataLiteral.enum` also splits a string on commas (`"Entity, Attributes"`). New types: `ODataParameterKind`, `ODataRecordReference`.
  - **entities-runtime** `formatParameterAlias` and `formatRecordPath`, and the generated `internal/odataLiteral.ts` in the functions package, now call core instead of holding their own copies. Their names and signatures are unchanged.
  - Values the Web API can't read now throw `DataverseInvalidRequestError` before the request instead of being written through: a GUID that isn't one (the Web API answered 500), `NaN` or `Infinity` (written as `null`), a fraction for an integer type, a date-time without a zone, an enum member with a quote, an invalid duration or base64 text. A `bigint` for `Edm.Int64` is written in full (it used to throw a `TypeError`).

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
