# @mohsinonxrm/dataverse-sdk-xrm

## 2.1.0

### Patch Changes

- Updated dependencies [b63be15]
- Updated dependencies [b63be15]
- Updated dependencies [7aa258b]
- Updated dependencies [cffc7cf]
- Updated dependencies [4761209]
- Updated dependencies [08a709c]
- Updated dependencies [83a2c45]
- Updated dependencies [44180ea]
- Updated dependencies [eb31ca3]
- Updated dependencies [212bbe4]
- Updated dependencies [a1845c9]
- Updated dependencies [632b1cf]
- Updated dependencies [632b1cf]
- Updated dependencies [372cd24]
- Updated dependencies [fcda713]
  - @mohsinonxrm/dataverse-sdk-messages@2.1.0
  - @mohsinonxrm/dataverse-sdk-core@2.1.0
  - @mohsinonxrm/dataverse-sdk-entities-runtime@2.1.0

## 2.0.1

### Patch Changes

- Updated dependencies [17f85cf]
- Updated dependencies [3204963]
  - @mohsinonxrm/dataverse-sdk-core@2.0.1
  - @mohsinonxrm/dataverse-sdk-entities-runtime@2.0.1
  - @mohsinonxrm/dataverse-sdk-messages@2.0.1

## 2.0.0

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

- 3d4614d: **Breaking.** `$skip` is gone, because Dataverse doesn't support it: a request with `$skip` fails with 400 (#357).

  - core: `DataverseRequestBuilder.skip()` and `QueryState.$skip` are removed. Page with `@odata.nextLink`: `iterate()`, `getAll()`, or `getPage()` and then `client.api(nextLink).getPage()`, with `.prefer().maxPageSize(n)` for the page size.
  - xrm: `RetrieveMultipleOptions.skip` is replaced by `maxPageSize` (`Prefer: odata.maxpagesize`). Follow the result's `@odata.nextLink` for the next page.

- 4a845bf: **Breaking.** `OrganizationService` no longer makes up a record or throws a plain `Error` (#381). `create()` and `update()` with `returnRepresentation: true` reject with `DataverseInvalidRequestError` when the response has no record (a `204 No Content` or an empty body), instead of resolving `{}` typed as `T`. `getEntitySetName()` (and the `assign()`, `setState()` and `associate()` calls that use it) rejects with `DataverseInvalidRequestError` when `EntityDefinitions` returns no `EntitySetName`, and `execute()` rejects a request that isn't an `Executable<T>` with `DataverseInvalidRequestError`; both were plain `Error`s. Every error `OrganizationService` throws is now a `DataverseError`.

### Minor Changes

- 3387804: One `EntityReference` for the whole SDK (#295).

  The actions, functions, messages, entities-runtime and xrm packages each defined their own `EntityReference`, and the actions and messages ones each had their own `unique symbol` brand, so a reference from one package's `createEntityReference` didn't type-check where another package wanted one.

  - **entities-runtime defines it:** `EntityReference`, `createEntityReference`, `getEntitySetNameFromReference`, `EntityReferenceOptions`, `WebApiEntityReference` and `isEntityReference`. It depends only on core, so every package can import it without a cycle.
  - **actions, functions, messages and xrm import and re-export the same ones** (they now depend on entities-runtime), so existing imports keep working and a reference from any package is accepted by every package. The generator no longer writes an `EntityReference.ts` into actions, functions or messages; it writes the entity sets and primary keys `createEntityReference` reads to entities-runtime's `src/generated/entity-tables.ts` (the new `references` target).
  - **Breaking: one signature,** `createEntityReference(logicalName, id, { primaryIdAttribute?, entitySetName?, name? })`. The display name is an option: `createEntityReference("contact", id, "Jane")` becomes `createEntityReference("contact", id, { name: "Jane" })`.
  - **Breaking: always the Web API shape.** entities-runtime's and xrm's references were plain `{ logicalName, id, name?, entitySetName? }` objects. Now every reference is `{ "@odata.type", <primary key> }` with `logicalName`, `id`, `entitySetName` and `name` not enumerable, and `entitySetName` is filled in for the tables in the `$metadata` snapshot, so `formatEntityForWrite()` and `associate()` need no lookup for them.
  - **Breaking: only `createEntityReference` makes one.** A hand-written `{ logicalName, id }` no longer type-checks as a function parameter, an xrm `associate()` reference or an entities-runtime lookup, and `isEntityReference()` (so `formatEntityForWrite()`) also requires `@odata.type`.
  - **metadata:** `src/types` is regenerated from the committed `$metadata` snapshot by `regen`, and CI checks it like the other generated packages. The response types of operations the snapshot doesn't have are removed (`QuerySalesforceUnstructuredDataResponse`, `QueryZendeskUnstructuredArticlesResponse`, the Field Service `msdyn_…Response` types and others), the types the snapshot adds are new, and interface members are in name order.

- 159f05d: Every `OrganizationService` method now takes an `AbortSignal` (#273). `create()`, `retrieve()`, `update()`, `delete()`, `retrieveMultiple()`, `associate()` and `disassociate()` read `signal` from their options; `execute()`, `whoAmI()`, `getEntitySetName()`, `assign()` and `setState()` take a new optional last argument, `{ signal }` (the new exported `OperationOptions` type). Aborting the signal cancels the request in flight, and the entity set name lookups `assign()`, `setState()` and `associate()` make, and the call rejects with `DataverseAbortError`. A shared `getEntitySetName()` lookup is cancelled only when every caller waiting on it has aborted. Existing calls are unchanged. The `execute()` JSDoc no longer imports a `WhoAmIRequest` that doesn't exist.
- 5556c69: `OrganizationService.create()` now has precise overloads: it resolves `Promise<string>` (the new id) by default and `Promise<T>` only with `{ returnRepresentation: true }`, instead of `Promise<string | any>`.
- 72b4a7b: `OrganizationService` resolves entity set names from metadata instead of guessing a plural (#76).

  `assign()`, `setState()` and the `EntityReference`s of `associate()` take logical names. They used a small built-in map and otherwise appended "s", so custom tables and irregular names (and `logicalName: "contacts"`, which became `contactss`) produced wrong URLs.

  - **Metadata lookup.** The entity set name is read from `EntityDefinitions(LogicalName='…')?$select=EntitySetName` once per logical name and cached on the service; concurrent calls share one request, and a failed lookup is not cached. An unknown table rejects with the 404 `DataverseError`.
  - **Overrides.** `new OrganizationService(client, { entitySetNames: { new_widget: "new_widgets" } })`, `service.setEntitySetName(logicalName, entitySetName)`, or `entitySetName` on an `EntityReference` skip the lookup.
  - **New API.** `service.getEntitySetName(logicalName)` resolves a name. `OrganizationServiceOptions` is exported.

- 8f25e45: `OrganizationService` works against the real request builder (#83, #84).

  - **CRUD works.** `create()`, `retrieve()`, `retrieveMultiple()` and `update()` no longer throw `TypeError`: they used the builder's terminals as if they returned a raw `Response`. `create()` now returns the id from `OData-EntityId` (via `createAndGetId()`), and `returnRepresentation` returns the record.
  - **Headers are sent.** `Prefer`, `If-Match`, `MSCRMCallerID` and custom `headers` were passed where `RequestOptions` was expected, so they never reached the wire. An `update()` with `etag` was unconditional. They are now set through the builder (`prefer()`, `ifMatch()`, `impersonate()`) and `RequestOptions.headers`.
  - **`update()` no longer creates records.** It sends `If-Match: *` when no `etag` is given, so a missing record rejects with 404, like the C# `Update`. Use `client.api(...).patch()` for an upsert.
  - **Duplicate detection can be turned on.** New `detectDuplicates` option on `create()` and `update()` (sends `MSCRM.SuppressDuplicateDetection: false`; a duplicate rejects with `DataverseDuplicateError`). `suppressDuplicateDetection: false` does the same; `true` remains the Web API default.
  - **All expands apply.** A list of expand options becomes one `$expand` (`nav($select=…;$filter=…;$orderby=…;$top=…),…`); before, each one replaced the previous and the options were serialised as `[object Object]`. `ExpandOption` is now exported.
  - **`associate()` sends an absolute `@odata.id`**, which Dataverse requires.
  - The README, getting-started and usage-pattern docs show the real signatures.

- 9b8a123: `OrganizationService` results are typed (#284). `execute()` is now `execute<T>(request: Executable<T>, options?)`, like `client.execute()`, so `await service.execute(new WhoAmIFunction())` is a `WhoAmIResponse` with no type argument; a request that isn't an `Executable<T>` is a compile error (and still throws at run time for JavaScript callers). `retrieve()`, `retrieveMultiple()`, `RetrieveMultipleResult` and `create()`/`update()` with `returnRepresentation` default to the new exported `EntityRecord` type (`@odata.etag`, `@odata.context`, and `unknown` columns) instead of `any`. `update()` has the same overloads as `create()`: `Promise<void>` by default, `Promise<T>` with `{ returnRepresentation: true }`. `create()` and `update()` take the record as `object` instead of `Record<string, any>`, which accepts the same values (object literals and your own record interfaces) without `any`.

### Patch Changes

- f988456: README: `client.api()` and the typed operations (the actions and functions packages, and what `dataverse-gen` writes) are the documented main path, and `OrganizationService` with the messages is the compatibility layer for code ported from the .NET SDK (#311). The core README lists change tracking, `waitForAsyncOperation()`, the opt-in resilience middleware and telemetry among its features; README examples import what they use.
- 8c5cf39: Export `./package.json`, so `require("<package>/package.json")` and tools that read a package's version through it work.
- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- ab96b11: Keys and literals are built with core's `odataKey` / `odataLiteral` (#53).

  - **metadata.** The local key escaper is gone. Relationship `MetadataId` keys must be GUIDs, and `DeletedMetadataFilters` must be enum member names or numbers (comma-separated for several); anything else throws `DataverseInvalidRequestError` instead of reaching the URL.
  - **xrm.** Record ids (including related ids and the `assign` owner bind) must be GUIDs, with or without braces, and a malformed one throws `DataverseInvalidRequestError` before a request is sent. `disassociate` with an empty `relatedId` is now rejected instead of removing the whole navigation reference. The `EntityDefinitions` lookup uses `odataKey`.

- 0cda789: One return contract for every generated operation, in both generators (#300). `client.execute()` resolves the value the operation returns, never the OData envelope, and `<Name>Response` is exactly that value's type. dataverse-gen unwrapped `value` and the actions and functions packages returned `{ value }`, so the same custom API gave differently shaped results.

  | Return type in `$metadata`  | Web API response                                          | Value                                                                               |
  | --------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------- |
  | none                        | `204 No Content`                                          | `undefined`; `<Name>Response` is `void` (was `{}`)                                  |
  | primitive or enum           | `{ "@odata.context", "value": … }`                        | the value (was `{ value }`); an enum is its member name (`string`)                  |
  | collection                  | `{ "@odata.context", "value": [ … ] }`, or 204 when unset | the array (was `{ value }`), `[]` for a 204                                         |
  | complex type                | the properties, with `@odata.context`                     | the body, typed with `@odata.context`                                               |
  | entity (or `crmbaseentity`) | the record, with its annotations, or 204 when unset       | the record, typed with `@odata.etag` and `@odata.type`; `null` for a 204 (was `{}`) |
  - **actions**: a collection return resolves its records, for example `InstantiateTemplateAction` resolves the email records (they were typed `EntityReference[]`).
  - **functions**: `RetrieveAadUserRolesFunction` resolves `role` records. The `$filter` query functions such as `Above`, which the Web API doesn't run on their own, were the only primitive returns; they are `queryFunctions` helpers now, not classes (#342).
  - **messages**: `result` is the value the action of the same name resolves, with the same type, exported as `<Name>Result`. Entity and complex results keep their annotations (they were dropped), entity results are `null` for a 204, and collection results `[]`. `<Name>Response.fromResponse(data)` takes the parsed body, or `undefined` for a 204. The internal `responseData` module is gone.
  - **generator (dataverse-gen)**: each operation with a return type exports `<Class>Response` with the same types and values as above. A 204 is `null` for an entity (was `{}`) and `[]` for a collection (was `undefined`).
  - Dataverse answers `204 No Content` for an entity or entity-collection output that wasn't set, although `$metadata` declares every return `Nullable="false"`, so entity returns are `<Entity> | null`. A complex output that wasn't set is a 200 with the properties `null`.
  - **xrm**: the `execute()` example reads `response.result?.asyncoperationid`.

- 6a61856: `assign()` and `setState()` now send `If-Match: *`. Without it the PATCH was an upsert, so a missing id created a record (confirmed live for `assign()`) instead of failing with 404. `update()` already sent it.
- Updated dependencies [9bb1db9]
- Updated dependencies [ca11ddf]
- Updated dependencies [aec5a48]
- Updated dependencies [bb5ede9]
- Updated dependencies [83f2256]
- Updated dependencies [f780438]
- Updated dependencies [0a43f6d]
- Updated dependencies [afdc7e9]
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
- Updated dependencies [3b0eb42]
- Updated dependencies [f988456]
- Updated dependencies [506a04f]
- Updated dependencies [65657f4]
- Updated dependencies [5c473f0]
- Updated dependencies [bd2407e]
- Updated dependencies [ee3791b]
- Updated dependencies [bf38170]
- Updated dependencies [8c5cf39]
- Updated dependencies [2bb4ed3]
- Updated dependencies [7b1ef12]
- Updated dependencies [e8458a6]
- Updated dependencies [c426eac]
- Updated dependencies [0bfa5fe]
- Updated dependencies [02038b3]
- Updated dependencies [7e13e73]
- Updated dependencies [4f96909]
- Updated dependencies [ac42045]
- Updated dependencies [e3dcff1]
- Updated dependencies [1001f98]
- Updated dependencies [4abc5ed]
- Updated dependencies [f804b33]
- Updated dependencies [c0bd227]
- Updated dependencies [00f78a6]
- Updated dependencies [ff4060e]
- Updated dependencies [ba9e84a]
- Updated dependencies [63ec4bf]
- Updated dependencies [287d6fd]
- Updated dependencies [1ca3a58]
- Updated dependencies [3b332ca]
- Updated dependencies [b60315e]
- Updated dependencies [265e8a5]
- Updated dependencies [210705c]
- Updated dependencies [254a8ec]
- Updated dependencies [6bbb784]
- Updated dependencies [dd2acd8]
- Updated dependencies [3387804]
- Updated dependencies [652ad75]
- Updated dependencies [eea04b2]
- Updated dependencies [a5161d4]
- Updated dependencies [0cda789]
- Updated dependencies [6b6d488]
- Updated dependencies [329c0b0]
- Updated dependencies [97a1388]
- Updated dependencies [608d915]
- Updated dependencies [9728b8c]
- Updated dependencies [d9eebf3]
- Updated dependencies [365ceca]
- Updated dependencies [3d4614d]
- Updated dependencies [61bd4aa]
- Updated dependencies [4e804b4]
- Updated dependencies [b040687]
- Updated dependencies [496b4cb]
- Updated dependencies [3ea8f92]
- Updated dependencies [d3a1a01]
- Updated dependencies [2d4323f]
- Updated dependencies [e237826]
- Updated dependencies [ff655da]
- Updated dependencies [6df2528]
- Updated dependencies [a464f3a]
- Updated dependencies [0fac2a9]
- Updated dependencies [b1bd587]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0
  - @mohsinonxrm/dataverse-sdk-messages@2.0.0
  - @mohsinonxrm/dataverse-sdk-entities-runtime@2.0.0

## 2.0.0-beta.1

### Patch Changes

- f988456: README: `client.api()` and the typed operations (the actions and functions packages, and what `dataverse-gen` writes) are the documented main path, and `OrganizationService` with the messages is the compatibility layer for code ported from the .NET SDK (#311). The core README lists change tracking, `waitForAsyncOperation()`, the opt-in resilience middleware and telemetry among its features; README examples import what they use.
- Updated dependencies [9bb1db9]
- Updated dependencies [83f2256]
- Updated dependencies [f780438]
- Updated dependencies [e606f24]
- Updated dependencies [f988456]
- Updated dependencies [ba9e84a]
- Updated dependencies [63ec4bf]
- Updated dependencies [1ca3a58]
- Updated dependencies [ff655da]
- Updated dependencies [0fac2a9]
- Updated dependencies [b1bd587]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0-beta.1
  - @mohsinonxrm/dataverse-sdk-entities-runtime@2.0.0-beta.1
  - @mohsinonxrm/dataverse-sdk-messages@2.0.0-beta.1

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

- 3d4614d: **Breaking.** `$skip` is gone, because Dataverse doesn't support it: a request with `$skip` fails with 400 (#357).

  - core: `DataverseRequestBuilder.skip()` and `QueryState.$skip` are removed. Page with `@odata.nextLink`: `iterate()`, `getAll()`, or `getPage()` and then `client.api(nextLink).getPage()`, with `.prefer().maxPageSize(n)` for the page size.
  - xrm: `RetrieveMultipleOptions.skip` is replaced by `maxPageSize` (`Prefer: odata.maxpagesize`). Follow the result's `@odata.nextLink` for the next page.

- 4a845bf: **Breaking.** `OrganizationService` no longer makes up a record or throws a plain `Error` (#381). `create()` and `update()` with `returnRepresentation: true` reject with `DataverseInvalidRequestError` when the response has no record (a `204 No Content` or an empty body), instead of resolving `{}` typed as `T`. `getEntitySetName()` (and the `assign()`, `setState()` and `associate()` calls that use it) rejects with `DataverseInvalidRequestError` when `EntityDefinitions` returns no `EntitySetName`, and `execute()` rejects a request that isn't an `Executable<T>` with `DataverseInvalidRequestError`; both were plain `Error`s. Every error `OrganizationService` throws is now a `DataverseError`.

### Minor Changes

- 3387804: One `EntityReference` for the whole SDK (#295).

  The actions, functions, messages, entities-runtime and xrm packages each defined their own `EntityReference`, and the actions and messages ones each had their own `unique symbol` brand, so a reference from one package's `createEntityReference` didn't type-check where another package wanted one.

  - **entities-runtime defines it:** `EntityReference`, `createEntityReference`, `getEntitySetNameFromReference`, `EntityReferenceOptions`, `WebApiEntityReference` and `isEntityReference`. It depends only on core, so every package can import it without a cycle.
  - **actions, functions, messages and xrm import and re-export the same ones** (they now depend on entities-runtime), so existing imports keep working and a reference from any package is accepted by every package. The generator no longer writes an `EntityReference.ts` into actions, functions or messages; it writes the entity sets and primary keys `createEntityReference` reads to entities-runtime's `src/generated/entity-tables.ts` (the new `references` target).
  - **Breaking: one signature,** `createEntityReference(logicalName, id, { primaryIdAttribute?, entitySetName?, name? })`. The display name is an option: `createEntityReference("contact", id, "Jane")` becomes `createEntityReference("contact", id, { name: "Jane" })`.
  - **Breaking: always the Web API shape.** entities-runtime's and xrm's references were plain `{ logicalName, id, name?, entitySetName? }` objects. Now every reference is `{ "@odata.type", <primary key> }` with `logicalName`, `id`, `entitySetName` and `name` not enumerable, and `entitySetName` is filled in for the tables in the `$metadata` snapshot, so `formatEntityForWrite()` and `associate()` need no lookup for them.
  - **Breaking: only `createEntityReference` makes one.** A hand-written `{ logicalName, id }` no longer type-checks as a function parameter, an xrm `associate()` reference or an entities-runtime lookup, and `isEntityReference()` (so `formatEntityForWrite()`) also requires `@odata.type`.
  - **metadata:** `src/types` is regenerated from the committed `$metadata` snapshot by `regen`, and CI checks it like the other generated packages. The response types of operations the snapshot doesn't have are removed (`QuerySalesforceUnstructuredDataResponse`, `QueryZendeskUnstructuredArticlesResponse`, the Field Service `msdyn_…Response` types and others), the types the snapshot adds are new, and interface members are in name order.

- 159f05d: Every `OrganizationService` method now takes an `AbortSignal` (#273). `create()`, `retrieve()`, `update()`, `delete()`, `retrieveMultiple()`, `associate()` and `disassociate()` read `signal` from their options; `execute()`, `whoAmI()`, `getEntitySetName()`, `assign()` and `setState()` take a new optional last argument, `{ signal }` (the new exported `OperationOptions` type). Aborting the signal cancels the request in flight, and the entity set name lookups `assign()`, `setState()` and `associate()` make, and the call rejects with `DataverseAbortError`. A shared `getEntitySetName()` lookup is cancelled only when every caller waiting on it has aborted. Existing calls are unchanged. The `execute()` JSDoc no longer imports a `WhoAmIRequest` that doesn't exist.
- 5556c69: `OrganizationService.create()` now has precise overloads: it resolves `Promise<string>` (the new id) by default and `Promise<T>` only with `{ returnRepresentation: true }`, instead of `Promise<string | any>`.
- 72b4a7b: `OrganizationService` resolves entity set names from metadata instead of guessing a plural (#76).

  `assign()`, `setState()` and the `EntityReference`s of `associate()` take logical names. They used a small built-in map and otherwise appended "s", so custom tables and irregular names (and `logicalName: "contacts"`, which became `contactss`) produced wrong URLs.

  - **Metadata lookup.** The entity set name is read from `EntityDefinitions(LogicalName='…')?$select=EntitySetName` once per logical name and cached on the service; concurrent calls share one request, and a failed lookup is not cached. An unknown table rejects with the 404 `DataverseError`.
  - **Overrides.** `new OrganizationService(client, { entitySetNames: { new_widget: "new_widgets" } })`, `service.setEntitySetName(logicalName, entitySetName)`, or `entitySetName` on an `EntityReference` skip the lookup.
  - **New API.** `service.getEntitySetName(logicalName)` resolves a name. `OrganizationServiceOptions` is exported.

- 8f25e45: `OrganizationService` works against the real request builder (#83, #84).

  - **CRUD works.** `create()`, `retrieve()`, `retrieveMultiple()` and `update()` no longer throw `TypeError`: they used the builder's terminals as if they returned a raw `Response`. `create()` now returns the id from `OData-EntityId` (via `createAndGetId()`), and `returnRepresentation` returns the record.
  - **Headers are sent.** `Prefer`, `If-Match`, `MSCRMCallerID` and custom `headers` were passed where `RequestOptions` was expected, so they never reached the wire. An `update()` with `etag` was unconditional. They are now set through the builder (`prefer()`, `ifMatch()`, `impersonate()`) and `RequestOptions.headers`.
  - **`update()` no longer creates records.** It sends `If-Match: *` when no `etag` is given, so a missing record rejects with 404, like the C# `Update`. Use `client.api(...).patch()` for an upsert.
  - **Duplicate detection can be turned on.** New `detectDuplicates` option on `create()` and `update()` (sends `MSCRM.SuppressDuplicateDetection: false`; a duplicate rejects with `DataverseDuplicateError`). `suppressDuplicateDetection: false` does the same; `true` remains the Web API default.
  - **All expands apply.** A list of expand options becomes one `$expand` (`nav($select=…;$filter=…;$orderby=…;$top=…),…`); before, each one replaced the previous and the options were serialised as `[object Object]`. `ExpandOption` is now exported.
  - **`associate()` sends an absolute `@odata.id`**, which Dataverse requires.
  - The README, getting-started and usage-pattern docs show the real signatures.

- 9b8a123: `OrganizationService` results are typed (#284). `execute()` is now `execute<T>(request: Executable<T>, options?)`, like `client.execute()`, so `await service.execute(new WhoAmIFunction())` is a `WhoAmIResponse` with no type argument; a request that isn't an `Executable<T>` is a compile error (and still throws at run time for JavaScript callers). `retrieve()`, `retrieveMultiple()`, `RetrieveMultipleResult` and `create()`/`update()` with `returnRepresentation` default to the new exported `EntityRecord` type (`@odata.etag`, `@odata.context`, and `unknown` columns) instead of `any`. `update()` has the same overloads as `create()`: `Promise<void>` by default, `Promise<T>` with `{ returnRepresentation: true }`. `create()` and `update()` take the record as `object` instead of `Record<string, any>`, which accepts the same values (object literals and your own record interfaces) without `any`.

### Patch Changes

- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- ab96b11: Keys and literals are built with core's `odataKey` / `odataLiteral` (#53).

  - **metadata.** The local key escaper is gone. Relationship `MetadataId` keys must be GUIDs, and `DeletedMetadataFilters` must be enum member names or numbers (comma-separated for several); anything else throws `DataverseInvalidRequestError` instead of reaching the URL.
  - **xrm.** Record ids (including related ids and the `assign` owner bind) must be GUIDs, with or without braces, and a malformed one throws `DataverseInvalidRequestError` before a request is sent. `disassociate` with an empty `relatedId` is now rejected instead of removing the whole navigation reference. The `EntityDefinitions` lookup uses `odataKey`.

- 0cda789: One return contract for every generated operation, in both generators (#300). `client.execute()` resolves the value the operation returns, never the OData envelope, and `<Name>Response` is exactly that value's type. dataverse-gen unwrapped `value` and the actions and functions packages returned `{ value }`, so the same custom API gave differently shaped results.

  | Return type in `$metadata`  | Web API response                                          | Value                                                                               |
  | --------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------- |
  | none                        | `204 No Content`                                          | `undefined`; `<Name>Response` is `void` (was `{}`)                                  |
  | primitive or enum           | `{ "@odata.context", "value": … }`                        | the value (was `{ value }`); an enum is its member name (`string`)                  |
  | collection                  | `{ "@odata.context", "value": [ … ] }`, or 204 when unset | the array (was `{ value }`), `[]` for a 204                                         |
  | complex type                | the properties, with `@odata.context`                     | the body, typed with `@odata.context`                                               |
  | entity (or `crmbaseentity`) | the record, with its annotations, or 204 when unset       | the record, typed with `@odata.etag` and `@odata.type`; `null` for a 204 (was `{}`) |
  - **actions**: a collection return resolves its records, for example `InstantiateTemplateAction` resolves the email records (they were typed `EntityReference[]`).
  - **functions**: `RetrieveAadUserRolesFunction` resolves `role` records. The `$filter` query functions such as `Above`, which the Web API doesn't run on their own, were the only primitive returns; they are `queryFunctions` helpers now, not classes (#342).
  - **messages**: `result` is the value the action of the same name resolves, with the same type, exported as `<Name>Result`. Entity and complex results keep their annotations (they were dropped), entity results are `null` for a 204, and collection results `[]`. `<Name>Response.fromResponse(data)` takes the parsed body, or `undefined` for a 204. The internal `responseData` module is gone.
  - **generator (dataverse-gen)**: each operation with a return type exports `<Class>Response` with the same types and values as above. A 204 is `null` for an entity (was `{}`) and `[]` for a collection (was `undefined`).
  - Dataverse answers `204 No Content` for an entity or entity-collection output that wasn't set, although `$metadata` declares every return `Nullable="false"`, so entity returns are `<Entity> | null`. A complex output that wasn't set is a 200 with the properties `null`.
  - **xrm**: the `execute()` example reads `response.result?.asyncoperationid`.

- 6a61856: `assign()` and `setState()` now send `If-Match: *`. Without it the PATCH was an upsert, so a missing id created a record (confirmed live for `assign()`) instead of failing with 404. `update()` already sent it.
- Updated dependencies [ca11ddf]
- Updated dependencies [aec5a48]
- Updated dependencies [bb5ede9]
- Updated dependencies [0a43f6d]
- Updated dependencies [afdc7e9]
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
- Updated dependencies [3b0eb42]
- Updated dependencies [506a04f]
- Updated dependencies [65657f4]
- Updated dependencies [5c473f0]
- Updated dependencies [bd2407e]
- Updated dependencies [ee3791b]
- Updated dependencies [bf38170]
- Updated dependencies [2bb4ed3]
- Updated dependencies [7b1ef12]
- Updated dependencies [e8458a6]
- Updated dependencies [c426eac]
- Updated dependencies [0bfa5fe]
- Updated dependencies [02038b3]
- Updated dependencies [7e13e73]
- Updated dependencies [4f96909]
- Updated dependencies [ac42045]
- Updated dependencies [e3dcff1]
- Updated dependencies [1001f98]
- Updated dependencies [4abc5ed]
- Updated dependencies [f804b33]
- Updated dependencies [c0bd227]
- Updated dependencies [00f78a6]
- Updated dependencies [ff4060e]
- Updated dependencies [287d6fd]
- Updated dependencies [3b332ca]
- Updated dependencies [b60315e]
- Updated dependencies [265e8a5]
- Updated dependencies [210705c]
- Updated dependencies [254a8ec]
- Updated dependencies [6bbb784]
- Updated dependencies [dd2acd8]
- Updated dependencies [3387804]
- Updated dependencies [652ad75]
- Updated dependencies [eea04b2]
- Updated dependencies [a5161d4]
- Updated dependencies [0cda789]
- Updated dependencies [6b6d488]
- Updated dependencies [329c0b0]
- Updated dependencies [97a1388]
- Updated dependencies [608d915]
- Updated dependencies [9728b8c]
- Updated dependencies [d9eebf3]
- Updated dependencies [365ceca]
- Updated dependencies [3d4614d]
- Updated dependencies [61bd4aa]
- Updated dependencies [4e804b4]
- Updated dependencies [b040687]
- Updated dependencies [496b4cb]
- Updated dependencies [3ea8f92]
- Updated dependencies [d3a1a01]
- Updated dependencies [2d4323f]
- Updated dependencies [e237826]
- Updated dependencies [6df2528]
- Updated dependencies [a464f3a]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0-beta.0
  - @mohsinonxrm/dataverse-sdk-messages@2.0.0-beta.0
  - @mohsinonxrm/dataverse-sdk-entities-runtime@2.0.0-beta.0

## 1.0.0

### Major Changes

- 78fc1e1: Initial v1.0.0 release of Dataverse SDK for TypeScript

### Patch Changes

- Updated dependencies [78fc1e1]
  - @mohsinonxrm/dataverse-sdk-messages@1.0.0
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
  - @mohsinonxrm/dataverse-sdk-messages@1.0.0
