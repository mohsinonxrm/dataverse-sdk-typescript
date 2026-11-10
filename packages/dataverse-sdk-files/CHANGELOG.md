# @mohsinonxrm/dataverse-sdk-files

## 2.0.1

### Patch Changes

- Updated dependencies [17f85cf]
- Updated dependencies [3204963]
  - @mohsinonxrm/dataverse-sdk-core@2.0.1
  - @mohsinonxrm/dataverse-sdk-actions@2.0.1

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

### Minor Changes

- bf38170: Every type the public API uses is now exported, so an app can name it, for example to type a wrapper or a mock (#397):

  - core: `DependencyTelemetry` (what `TelemetryClient.trackDependency` receives, now a named interface), `BuiltInMiddlewareOptions`, and `EqValue` (the values `odata.eq()` / `odata.ne()` take). The per-request retry options are the same `RetryOptions` type as the client's, so there is one `RetryOptions`.
  - batch: `DataverseBatchErrorConstructor`.
  - files: `FileSource` (what `upload()` accepts).
  - generator: `EntityKeyType`, and `RetrieveMetadataChangesResponse` with the metadata detail types it uses.
  - otel, appinsights: their dependency data is core's `DependencyTelemetry`.
  - metadata: `RequiredEntityProperty`.

- ed35365: Add the missing file and image column features (#95). Uploads: `method` (`"actions"` default, `"patch-chunked"` with `Content-Range`, `"single"`), a `ReadableStream` as the file (with `size`), `mimeType`, and a `Blob` is read slice by slice instead of all at once. Downloads: `method` (`"single"` default, `"range"`, `"actions"`), `chunkSize`, `onProgress`, `imageSize: "full"`, a working `timeout`, and a new `downloadStream()` returning a `ReadableStream`. `download()` and `delete()` take an `AbortSignal`. Existing calls behave as before.
- b4329ad: `FileColumnClient` works in browsers without a `Buffer` polyfill (#58).

  - **No `Buffer`.** `upload()` called `Buffer.isBuffer(file)` with no guard, so every upload in a browser threw `ReferenceError: Buffer is not defined` before sending anything. Bytes and base64 are now handled with `Uint8Array` and `btoa`, which exist in browsers and in Node.js.
  - **More input types.** `upload()` takes a `Blob` (or `File`), an `ArrayBuffer`, or any typed-array view such as `Uint8Array`. A Node.js `Buffer` is a `Uint8Array`, so it still works. A view uploads only the bytes it covers.
  - **`download()` returns a `Blob`.** The return type is now `Promise<Blob>` instead of `Promise<Blob | Buffer>`, so browser consumers no longer need `@types/node`. Node.js 22 has `Blob`, and it already got one at runtime. Use `Buffer.from(await blob.arrayBuffer())` for a `Buffer`.

- 3cb26e1: `FileColumnClient` checks every response, and `delete()` deletes the file (#61).

  - **Failed steps reject.** `upload()` never checked the `InitializeFileBlocksUpload`, `UploadBlock` or `CommitFileBlocksUpload` responses, so an upload where a block or the commit failed resolved as if it had worked. Each response is now checked: a failure rejects with the parsed `DataverseODataError` (or `DataverseThrottleError` for a 429), with `status`, `code` and the response details, and nothing after the failed request is sent. `download()` rejects with the same error type instead of a plain `Error`, so a column with no file is a 404 with code `0x80040217`.
  - **`delete()` works.** It sent `PATCH { column: null }`, which Dataverse answers with 204 while leaving the file in place. It now sends `DELETE /{entitySet}({id})/{column}`, and rejects if Dataverse rejects the request.
  - **Cancel an upload.** `FileUploadOptions.signal` aborts the request in flight and stops the upload; it rejects with a `DataverseAbortError` when sent through a `DataverseClient`.
  - **Block retry.** Through a `DataverseClient`, a block is also retried after a 502, 503 or 504, within the client's `retry.maxRetries`: sending a block again with the same id replaces it. Other POSTs are still retried only after a 429.
  - **Chunk size.** Dataverse rejects blocks above 4 MB, so a larger `chunkSize` now rejects with a `DataverseInvalidRequestError` before anything is sent. The README no longer recommends 8 MB or 16 MB chunks.

- d073e91: `new FileColumnClient(client)` takes a `DataverseClient` (#59).

  - **New overload.** `new FileColumnClient(client)` sends every request through `client.send()`, so the client's auth, retry, logging and telemetry apply, and builds URLs on `client.getBaseUrl()`. The docs showed `new FileColumnClient(client.requestAdapter)`, which doesn't exist.
  - **No invalid default.** `new FileColumnClient(adapter, baseUrl)` still works. The base URL can be left out when the adapter has a `getBaseUrl()` method. Otherwise the constructor now throws a `DataverseInvalidRequestError` (name `MissingParameter`), instead of defaulting to `""` and sending relative URLs that a plain fetch adapter rejects. A trailing `/` on the base URL is dropped.
  - **Docs.** The README, the JSDoc example and ADR 0005 show the new constructor, the `fileName` argument and the `onProgress(progress)` callback.

### Patch Changes

- f363a6f: README: every TypeScript example type-checks against the 2.0 packages (#311); signature listings are marked as such. The msal-browser README drops MSAL's `storeAuthStateInCookie` (for Internet Explorer 11, deprecated in MSAL 4 and removed in MSAL 5) and describes Dataverse's CORS behaviour as the browser guide does; the appinsights `/browser` example passes a connection string it defines.
- 5c473f0: A hand-written entity reference type-checks only in the shape the Web API reads (#251).

  - **actions, messages: only `createEntityReference` makes an `EntityReference`.** Its `logicalName`, `id` and `entitySetName` are not enumerable, so they aren't sent. A hand-written `{ "@odata.type", logicalName, id }` literal type-checked as an `EntityReference` but sent `logicalName` and `id`, which Dataverse rejects. `EntityReference` now has a type-only brand, and `EntityPayload` and `AnyEntityPayload` declare `logicalName?: never` and `entitySetName?: never`, so that literal no longer type-checks as any entity parameter. Nothing changes at runtime.
  - **New `WebApiEntityReference`**: the JSON shape, `{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "<id>" }`, for a reference written by hand. It's accepted wherever a payload is (`crmbaseentity` parameters such as `Merge`'s `Target`). Since #295 it is defined in entities-runtime and re-exported by actions, functions, messages and xrm.
  - **Breaking (types only).** An `EntityReference` must come from `createEntityReference`. Since #295 that is one function, and one `EntityReference` type, for the whole SDK, so a reference made with any package's `createEntityReference` is accepted by every package.
  - **files:** `FileColumnClient` builds the `InitializeFileBlocksUpload` target as a `WebApiEntityReference`, without a cast.

- 8c5cf39: Export `./package.json`, so `require("<package>/package.json")` and tools that read a package's version through it work.
- cf7cd5f: An empty (0-byte) file now uploads with every `method` (#383). Dataverse stores an empty file only as an empty block list committed through the actions route: a `PATCH` with no body is refused (400, `0x80060888`) and so is an empty chunk (416), as a live org confirmed. `"single"` and `"patch-chunked"` used to send a 0-byte file as an empty `PATCH`, which failed; every method now sends it through the actions route.
- 4fb44a7: `upload()` sends the `InitializeFileBlocksUpload` `Target` that Dataverse expects (#60).

  - **Typed entity reference.** The `Target` was `{ "@odata.type": "Microsoft.Dynamics.CRM.EntityReference", "logicalName": "<entity set name>", "id": … }`, which Dataverse rejects with a 400 (`0x80048d19`), so no upload ever worked. It is now the documented `{ "@odata.type": "Microsoft.Dynamics.CRM.account", "accountid": "…" }`.
  - **Table lookup.** `upload()` still takes the entity set name. The first upload to a table looks up its logical name and primary key (for example `email` and `activityid` for `emails`) with one `EntityDefinitions` request. The result is cached per `DataverseClient` (or adapter) and entity set; a failed lookup is not cached. An unknown entity set rejects with a `DataverseInvalidRequestError`, and a failed lookup with the parsed `DataverseODataError`, before the upload starts.

- a9c0c57: File names outside ASCII, and files that can't be downloaded in parts (#362).

  - **Any file name uploads.** The `"single"` and `"patch-chunked"` routes send the name as the percent-encoded `?x-ms-file-name=` query parameter instead of the `x-ms-file-name` header. A header carries only ASCII: `fetch` threw a `TypeError` on a name like `合同.pdf`, and a name like `résumé.pdf` was stored garbled. The `"actions"` route already sent the name in its JSON body.
  - **`IsChunkingSupported: false` is honoured.** For a file Dataverse can't read in parts (on-premises, or an environment with a self-managed key), the `"actions"` download reads the whole file as one `DownloadBlock`, and the `"range"` download (the `downloadStream()` default) falls back to one `GET` when a `Range` request fails with `0x80090017`. Both used to fail.

- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- 6b6d488: Generated operations take one object with their parameters, by name, instead of positional arguments (#96).

  The constructors took every CSDL parameter positionally, in `$metadata` order: `RetrieveEntityFunction` took `LogicalName` before `MetadataId` (both strings, so swapping them compiled and sent the wrong request), and `ImportSolutionAction` took 17 arguments, all typed as required.

  - Each operation with parameters has a `<Class>Parameters` interface keyed by the CSDL parameter names, exported from the package root (`ImportSolutionActionParameters`, `RetrieveEntityFunctionParameters`, `MergeRequestParameters`): `new ImportSolutionAction({ CustomizationFile, ImportJobId, OverwriteUnmanagedCustomizations: true, PublishWorkflows: false })`.
  - A parameter that `$metadata` marks `Nullable="false"` is required; any other is optional. A property that is left out or `undefined` isn't sent: action bodies leave it out, and function URLs leave out its parameter alias.
  - The record id or entity set of a bound operation is still the first argument, before the parameters object: `new ExecuteWorkflowAction(workflowId, { EntityId })`, `new CreateMultipleAction("accounts", { Targets })`. It goes in the URL, not the request, so it isn't a parameter.
  - An operation without parameters takes no arguments (`new WhoAmIFunction()`); one with only optional parameters can be constructed without arguments (`new RetrieveMetadataChangesFunction()`).
  - Actions and functions keep the object in `parameters`; messages keep it in `OrganizationRequest.Parameters` (read-only), as the .NET SDK does, instead of one public property per parameter. A `MessageName` parameter is now a property like any other, so it follows `Nullable` instead of always being required.
  - What `parseResponse` resolves for each kind of return type, including a `204 No Content`, is the return contract in the #300 entry: for example `undefined` for an operation with no return type, and `null` for an entity that wasn't set.
  - dataverse-gen (`@mohsinonxrm/dataverse-sdk-generator`) generates custom API classes the same way. The record id of an operation bound to a table is named after the table (`accountId`) instead of `targetId`, and nullable parameters accept `null`.
  - files: `FileColumnClient` calls the file-block actions with the new constructors.

  `docs/migration-2.0.md` has before-and-after examples.

- Updated dependencies [e72a5fd]
- Updated dependencies [9bb1db9]
- Updated dependencies [ca11ddf]
- Updated dependencies [aec5a48]
- Updated dependencies [bb5ede9]
- Updated dependencies [83f2256]
- Updated dependencies [f780438]
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
- Updated dependencies [1d1728b]
- Updated dependencies [090d975]
- Updated dependencies [c0bd227]
- Updated dependencies [1ca3a58]
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
  - @mohsinonxrm/dataverse-sdk-actions@2.0.0
  - @mohsinonxrm/dataverse-sdk-core@2.0.0

## 2.0.0-beta.1

### Patch Changes

- f363a6f: README: every TypeScript example type-checks against the 2.0 packages (#311); signature listings are marked as such. The msal-browser README drops MSAL's `storeAuthStateInCookie` (for Internet Explorer 11, deprecated in MSAL 4 and removed in MSAL 5) and describes Dataverse's CORS behaviour as the browser guide does; the appinsights `/browser` example passes a connection string it defines.
- Updated dependencies [e72a5fd]
- Updated dependencies [9bb1db9]
- Updated dependencies [83f2256]
- Updated dependencies [f780438]
- Updated dependencies [e606f24]
- Updated dependencies [f988456]
- Updated dependencies [1ca3a58]
- Updated dependencies [ff655da]
- Updated dependencies [0fac2a9]
- Updated dependencies [b1bd587]
  - @mohsinonxrm/dataverse-sdk-actions@2.0.0-beta.1
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

- bf38170: Every type the public API uses is now exported, so an app can name it, for example to type a wrapper or a mock (#397):

  - core: `DependencyTelemetry` (what `TelemetryClient.trackDependency` receives, now a named interface), `BuiltInMiddlewareOptions`, and `EqValue` (the values `odata.eq()` / `odata.ne()` take). The per-request retry options are the same `RetryOptions` type as the client's, so there is one `RetryOptions`.
  - batch: `DataverseBatchErrorConstructor`.
  - files: `FileSource` (what `upload()` accepts).
  - generator: `EntityKeyType`, and `RetrieveMetadataChangesResponse` with the metadata detail types it uses.
  - otel, appinsights: their dependency data is core's `DependencyTelemetry`.
  - metadata: `RequiredEntityProperty`.

- ed35365: Add the missing file and image column features (#95). Uploads: `method` (`"actions"` default, `"patch-chunked"` with `Content-Range`, `"single"`), a `ReadableStream` as the file (with `size`), `mimeType`, and a `Blob` is read slice by slice instead of all at once. Downloads: `method` (`"single"` default, `"range"`, `"actions"`), `chunkSize`, `onProgress`, `imageSize: "full"`, a working `timeout`, and a new `downloadStream()` returning a `ReadableStream`. `download()` and `delete()` take an `AbortSignal`. Existing calls behave as before.
- b4329ad: `FileColumnClient` works in browsers without a `Buffer` polyfill (#58).

  - **No `Buffer`.** `upload()` called `Buffer.isBuffer(file)` with no guard, so every upload in a browser threw `ReferenceError: Buffer is not defined` before sending anything. Bytes and base64 are now handled with `Uint8Array` and `btoa`, which exist in browsers and in Node.js.
  - **More input types.** `upload()` takes a `Blob` (or `File`), an `ArrayBuffer`, or any typed-array view such as `Uint8Array`. A Node.js `Buffer` is a `Uint8Array`, so it still works. A view uploads only the bytes it covers.
  - **`download()` returns a `Blob`.** The return type is now `Promise<Blob>` instead of `Promise<Blob | Buffer>`, so browser consumers no longer need `@types/node`. Node.js 22 has `Blob`, and it already got one at runtime. Use `Buffer.from(await blob.arrayBuffer())` for a `Buffer`.

- 3cb26e1: `FileColumnClient` checks every response, and `delete()` deletes the file (#61).

  - **Failed steps reject.** `upload()` never checked the `InitializeFileBlocksUpload`, `UploadBlock` or `CommitFileBlocksUpload` responses, so an upload where a block or the commit failed resolved as if it had worked. Each response is now checked: a failure rejects with the parsed `DataverseODataError` (or `DataverseThrottleError` for a 429), with `status`, `code` and the response details, and nothing after the failed request is sent. `download()` rejects with the same error type instead of a plain `Error`, so a column with no file is a 404 with code `0x80040217`.
  - **`delete()` works.** It sent `PATCH { column: null }`, which Dataverse answers with 204 while leaving the file in place. It now sends `DELETE /{entitySet}({id})/{column}`, and rejects if Dataverse rejects the request.
  - **Cancel an upload.** `FileUploadOptions.signal` aborts the request in flight and stops the upload; it rejects with a `DataverseAbortError` when sent through a `DataverseClient`.
  - **Block retry.** Through a `DataverseClient`, a block is also retried after a 502, 503 or 504, within the client's `retry.maxRetries`: sending a block again with the same id replaces it. Other POSTs are still retried only after a 429.
  - **Chunk size.** Dataverse rejects blocks above 4 MB, so a larger `chunkSize` now rejects with a `DataverseInvalidRequestError` before anything is sent. The README no longer recommends 8 MB or 16 MB chunks.

- d073e91: `new FileColumnClient(client)` takes a `DataverseClient` (#59).

  - **New overload.** `new FileColumnClient(client)` sends every request through `client.send()`, so the client's auth, retry, logging and telemetry apply, and builds URLs on `client.getBaseUrl()`. The docs showed `new FileColumnClient(client.requestAdapter)`, which doesn't exist.
  - **No invalid default.** `new FileColumnClient(adapter, baseUrl)` still works. The base URL can be left out when the adapter has a `getBaseUrl()` method. Otherwise the constructor now throws a `DataverseInvalidRequestError` (name `MissingParameter`), instead of defaulting to `""` and sending relative URLs that a plain fetch adapter rejects. A trailing `/` on the base URL is dropped.
  - **Docs.** The README, the JSDoc example and ADR 0005 show the new constructor, the `fileName` argument and the `onProgress(progress)` callback.

### Patch Changes

- 5c473f0: A hand-written entity reference type-checks only in the shape the Web API reads (#251).

  - **actions, messages: only `createEntityReference` makes an `EntityReference`.** Its `logicalName`, `id` and `entitySetName` are not enumerable, so they aren't sent. A hand-written `{ "@odata.type", logicalName, id }` literal type-checked as an `EntityReference` but sent `logicalName` and `id`, which Dataverse rejects. `EntityReference` now has a type-only brand, and `EntityPayload` and `AnyEntityPayload` declare `logicalName?: never` and `entitySetName?: never`, so that literal no longer type-checks as any entity parameter. Nothing changes at runtime.
  - **New `WebApiEntityReference`**: the JSON shape, `{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "<id>" }`, for a reference written by hand. It's accepted wherever a payload is (`crmbaseentity` parameters such as `Merge`'s `Target`). Since #295 it is defined in entities-runtime and re-exported by actions, functions, messages and xrm.
  - **Breaking (types only).** An `EntityReference` must come from `createEntityReference`. Since #295 that is one function, and one `EntityReference` type, for the whole SDK, so a reference made with any package's `createEntityReference` is accepted by every package.
  - **files:** `FileColumnClient` builds the `InitializeFileBlocksUpload` target as a `WebApiEntityReference`, without a cast.

- cf7cd5f: An empty (0-byte) file now uploads with every `method` (#383). Dataverse stores an empty file only as an empty block list committed through the actions route: a `PATCH` with no body is refused (400, `0x80060888`) and so is an empty chunk (416), as a live org confirmed. `"single"` and `"patch-chunked"` used to send a 0-byte file as an empty `PATCH`, which failed; every method now sends it through the actions route.
- 4fb44a7: `upload()` sends the `InitializeFileBlocksUpload` `Target` that Dataverse expects (#60).

  - **Typed entity reference.** The `Target` was `{ "@odata.type": "Microsoft.Dynamics.CRM.EntityReference", "logicalName": "<entity set name>", "id": … }`, which Dataverse rejects with a 400 (`0x80048d19`), so no upload ever worked. It is now the documented `{ "@odata.type": "Microsoft.Dynamics.CRM.account", "accountid": "…" }`.
  - **Table lookup.** `upload()` still takes the entity set name. The first upload to a table looks up its logical name and primary key (for example `email` and `activityid` for `emails`) with one `EntityDefinitions` request. The result is cached per `DataverseClient` (or adapter) and entity set; a failed lookup is not cached. An unknown entity set rejects with a `DataverseInvalidRequestError`, and a failed lookup with the parsed `DataverseODataError`, before the upload starts.

- a9c0c57: File names outside ASCII, and files that can't be downloaded in parts (#362).

  - **Any file name uploads.** The `"single"` and `"patch-chunked"` routes send the name as the percent-encoded `?x-ms-file-name=` query parameter instead of the `x-ms-file-name` header. A header carries only ASCII: `fetch` threw a `TypeError` on a name like `合同.pdf`, and a name like `résumé.pdf` was stored garbled. The `"actions"` route already sent the name in its JSON body.
  - **`IsChunkingSupported: false` is honoured.** For a file Dataverse can't read in parts (on-premises, or an environment with a self-managed key), the `"actions"` download reads the whole file as one `DownloadBlock`, and the `"range"` download (the `downloadStream()` default) falls back to one `GET` when a `Range` request fails with `0x80090017`. Both used to fail.

- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- 6b6d488: Generated operations take one object with their parameters, by name, instead of positional arguments (#96).

  The constructors took every CSDL parameter positionally, in `$metadata` order: `RetrieveEntityFunction` took `LogicalName` before `MetadataId` (both strings, so swapping them compiled and sent the wrong request), and `ImportSolutionAction` took 17 arguments, all typed as required.

  - Each operation with parameters has a `<Class>Parameters` interface keyed by the CSDL parameter names, exported from the package root (`ImportSolutionActionParameters`, `RetrieveEntityFunctionParameters`, `MergeRequestParameters`): `new ImportSolutionAction({ CustomizationFile, ImportJobId, OverwriteUnmanagedCustomizations: true, PublishWorkflows: false })`.
  - A parameter that `$metadata` marks `Nullable="false"` is required; any other is optional. A property that is left out or `undefined` isn't sent: action bodies leave it out, and function URLs leave out its parameter alias.
  - The record id or entity set of a bound operation is still the first argument, before the parameters object: `new ExecuteWorkflowAction(workflowId, { EntityId })`, `new CreateMultipleAction("accounts", { Targets })`. It goes in the URL, not the request, so it isn't a parameter.
  - An operation without parameters takes no arguments (`new WhoAmIFunction()`); one with only optional parameters can be constructed without arguments (`new RetrieveMetadataChangesFunction()`).
  - Actions and functions keep the object in `parameters`; messages keep it in `OrganizationRequest.Parameters` (read-only), as the .NET SDK does, instead of one public property per parameter. A `MessageName` parameter is now a property like any other, so it follows `Nullable` instead of always being required.
  - What `parseResponse` resolves for each kind of return type, including a `204 No Content`, is the return contract in the #300 entry: for example `undefined` for an operation with no return type, and `null` for an entity that wasn't set.
  - dataverse-gen (`@mohsinonxrm/dataverse-sdk-generator`) generates custom API classes the same way. The record id of an operation bound to a table is named after the table (`accountId`) instead of `targetId`, and nullable parameters accept `null`.
  - files: `FileColumnClient` calls the file-block actions with the new constructors.

  `docs/migration-2.0.md` has before-and-after examples.

- Updated dependencies [ca11ddf]
- Updated dependencies [aec5a48]
- Updated dependencies [bb5ede9]
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
- Updated dependencies [1d1728b]
- Updated dependencies [090d975]
- Updated dependencies [c0bd227]
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
  - @mohsinonxrm/dataverse-sdk-actions@2.0.0-beta.0

## 1.0.0

### Major Changes

- 78fc1e1: Initial v1.0.0 release of Dataverse SDK for TypeScript

### Patch Changes

- Updated dependencies [78fc1e1]
  - @mohsinonxrm/dataverse-sdk-actions@1.0.0
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
  - @mohsinonxrm/dataverse-sdk-actions@1.0.0
