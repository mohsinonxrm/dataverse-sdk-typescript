# @mohsinonxrm/dataverse-sdk-generator

## 2.0.0-beta.1

### Minor Changes

- f5c5226: Generated tables get `<Entity>Create` and `<Entity>Update` types (#347): only the columns Dataverse accepts in a create or an update (`IsValidForCreate` / `IsValidForUpdate` from RetrieveMetadataChanges), so read-only and server-set columns are left out. A lookup is keyed by the navigation property it's bound through (a custom lookup's `contoso_ParentAccountId`, a polymorphic lookup's `parentcustomerid`) and takes an `EntityReference`, which `formatEntityForWrite()` sends as `@odata.bind`. The schema model's `PropertyType` has `IsValidForCreate` and `IsValidForUpdate`, and `NavigationPropertyType` has `ReferentialProperty`, `LookupAttribute`, `LookupTargets`, `IsValidForCreate` and `IsValidForUpdate`.
- caaba87: Typed `Xrm.FormContext` for model-driven form scripts, behind `"formContext": true` (#347). Each table gets `forms/<Entity>Form.ts` with `<Entity>Attributes` and `<Entity>Controls` (its columns by logical name, typed with their `@types/xrm` attribute and control types; choice columns with their enum) and `<Entity>FormContext`, whose `getAttribute()` and `getControl()` take those names (`header_<name>` and `header_process_<name>` for controls). `@types/xrm` is an optional peer dependency. `DataverseGenConfig` has `formContext`, and `dataverse-gen validate` checks it.
- 5f59b36: Incremental generation and custom templates (#347).

  - `"output": { "incremental": true }` regenerates only the tables whose schema model changed: a stamp file in the output folder (`.dataverse-gen-stamp.json`) records a hash of each table and of the settings, and a table whose hash is unchanged keeps its files untouched. A change of options, templates, generator version or of the set of generated types regenerates every table; files the previous run wrote that this one doesn't are removed. `generateCode()` resolves `unchangedTables`, `TypescriptGenerator` has `unchangedTables`, and the CLI prints them.
  - `"templates": "<dir>"` uses the EJS templates in that directory instead of the built-in ones of the same name. `dataverse-gen eject [dir] [--force]` and `ejectTemplates()` copy the built-in templates there; `TEMPLATE_NAMES` lists them.
  - `dataverse-gen validate` checks `output.incremental` and `templates`.

- ba9e84a: Typed request builders per entity set, Graph (Kiota) style (#312).

  - **entities-runtime**: `EntitySetClient<TEntity, TCreate, TUpdate, TColumn>` (`byId(key)`, `list({ select, expand, filter, orderBy, top, maxItems })`, `create(entity)`, `query()`) and `EntityRecordClient` (`get({ select, expand })`, `update(entity, { etag })`, `delete({ etag })`, `request()`), built on core's request builder. Writes go through `formatEntityForWrite()`; `update()` sends `If-Match: *` (or the etag) so it never creates a record; `byId()` takes a GUID or an alternate key. Option types: `GetRecordOptions`, `ListRecordsOptions`, `WriteRecordOptions`.
  - **generator**: `"typedClient": true` generates `client.ts` with `createTypedClient(client)` → `TypedDataverseClient`, one `EntitySetClient` per generated table keyed by entity set name (`typed.accounts.byId(id).get({ select: ["name"] })`), typed by the table's interface, `<Entity>Create`, `<Entity>Update` and a generated `<Entity>Column` union. `DataverseGenConfig` has `typedClient`; `TEMPLATE_NAMES` includes `client.ejs`.

- 63ec4bf: Validation rules from metadata, checked by an opt-in `validateEntity()` (#347).

  - **entities-runtime**: `validateEntity(entity, metadata, { mode })` returns the `ValidationIssue`s of a create or update body: a business-required column or lookup missing or `null`, a column or lookup the mode can't set, text over `maxLength`, a number outside `minValue`/`maxValue` or a fraction in a whole-number column, a value that isn't one of a choice column's options, and a value of the wrong type. `AttributeMetadata` has `maxLength`, `minValue`, `maxValue`, `optionValues`, `isValidForCreate` and `isValidForUpdate`; `NavigationMetadata` has `lookupAttribute`, `isRequired`, `requiredLevel`, `isValidForCreate` and `isValidForUpdate`.
  - **generator**: the generated entity metadata carries those constraints (`MinValue` and `MaxValue` are now read from RetrieveMetadataChanges too). The schema model's `PropertyType` has `MaxLength`, `MinValue`, `MaxValue` and `OptionValues`, and `NavigationPropertyType` has `RequiredLevel`.

### Patch Changes

- f988456: README: `client.api()` and the typed operations (the actions and functions packages, and what `dataverse-gen` writes) are the documented main path, and `OrganizationService` with the messages is the compatibility layer for code ported from the .NET SDK (#311). The core README lists change tracking, `waitForAsyncOperation()`, the opt-in resilience middleware and telemetry among its features; README examples import what they use.
- 5c2c98f: `dataverse-gen` writes a table's columns and navigation properties, and a complex type's properties, in name order. They followed the order of the org's `$metadata`, which isn't fixed from one request to the next, so two runs over the same schema could write different files, and incremental generation (`output.incremental`) saw every table as changed. A column a table declares itself still wins over an inherited one of the same name.
- 454b2e3: `dataverse-gen` retries its metadata requests when the org is busy: `$metadata` after a 400 (an org whose schema is changing has answered 400 for a few seconds while it rebuilds the document), a 429 or a 5xx, and `RetrieveMetadataChanges` after a 429 or a 5xx, up to five tries with backoff (or `Retry-After`). A request that still fails reports the response body. A `RetrieveMetadataChanges` query Dataverse refuses (400) isn't retried.
- 0fac2a9: **Breaking.** `UpsertMultiple` resolves `null` for Dataverse's `204 No Content` instead of throwing "Unexpected end of JSON input" after the records were written. `$metadata` declares a `mscrm.UpsertMultipleResponse` return, but ["the `UpsertMultiple` action returns `204 NoContent`"](https://learn.microsoft.com/power-apps/developer/data-platform/bulk-operations#examples).

  - `UpsertMultipleResponse` (actions) and `UpsertMultipleResult` (messages) are now `{ "@odata.context"?, Results } | null` types instead of interfaces. `client.execute(new UpsertMultipleAction(...))` resolves `null`, and `UpsertMultipleRequest`'s `result` is `null`; a body is still read if Dataverse ever sends one.
  - dataverse-gen does the same: an operation Dataverse answers with a 204 although `$metadata` declares a primitive or complex return (today `UpsertMultiple`) has a `<Class>Response` of `<Type> | null`, and resolves `null` for the 204.

- Updated dependencies [9bb1db9]
- Updated dependencies [83f2256]
- Updated dependencies [f780438]
- Updated dependencies [e606f24]
- Updated dependencies [f363a6f]
- Updated dependencies [f988456]
- Updated dependencies [ba9e84a]
- Updated dependencies [63ec4bf]
- Updated dependencies [1ca3a58]
- Updated dependencies [92c6fc9]
- Updated dependencies [ff655da]
- Updated dependencies [b1bd587]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0-beta.1
  - @mohsinonxrm/dataverse-sdk-auth-msal-node@2.0.0-beta.1
  - @mohsinonxrm/dataverse-sdk-entities-runtime@2.0.0-beta.1
  - @mohsinonxrm/dataverse-sdk-metadata@2.0.0-beta.1

## 2.0.0-beta.0

### Major Changes

- 0d9923b: **Breaking.** dataverse-gen types `Edm.DateTimeOffset` as `string`, sends action bodies the way the Web API reads them, and generates inherited columns (#360, #361).

  - `Edm.DateTimeOffset` is `string` wherever a value is read: entity columns, complex types and operation returns. The Web API sends ISO 8601 strings and nothing converted them, so a `Date`-typed `createdon.getTime()` compiled and threw. Action and function parameters take `string | Date`.
  - Action request bodies go through a generated `internal/actionBody.ts`, as the in-repo actions do: enum values are sent as member names (`"ReadAccess, WriteAccess"`; a number got a 400), and an entity parameter is sent as an entity. A reference from `createEntityReference()` is `@odata.type` and its primary key, and a record's lookups set with an `EntityReference` become `<navigation property>@odata.bind`. Entity parameters of actions are typed `<Entity> | EntityReference`.
  - Enum values inside a function's complex or collection parameter are sent as member names in the JSON parameter alias (`?@p1={"Rights":"ReadAccess"}`), through a generated `internal/functionParameters.ts` (#358). An enum parameter itself is still an enum literal.
  - Complex types have their navigation properties, typed `<Entity> | EntityReference`, so `PrincipalAccess` has `Principal`.
  - An entity type gets the properties and navigation properties of its base types, up to `crmbaseentity`: the activity tables (`email`, `task`, …) leave out the `activitypointer` columns in `$metadata`, so `subject`, `regardingobjectid` and the others were missing. A derived type without its own key uses its base type's.
  - With no `entities` list, only types that derive from `crmbaseentity` are tables (`EntityDefinitions`, `GlobalOptionSetDefinitions` and `ManagedPropertyDefinitions` are not), and a table RetrieveMetadataChanges returns nothing for is skipped with a warning instead of failing the run.
  - `dataverse-gen --version` prints the package's version, not `1.0.0`.
  - Generating the `entity` table compiles: the runtime `EntityMetadata` type is imported as `RuntimeEntityMetadata` where the table's `EntityMetadata` const would clash with it.

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

- bf38170: Every type the public API uses is now exported, so an app can name it, for example to type a wrapper or a mock (#397):

  - core: `DependencyTelemetry` (what `TelemetryClient.trackDependency` receives, now a named interface), `BuiltInMiddlewareOptions`, and `EqValue` (the values `odata.eq()` / `odata.ne()` take). The per-request retry options are the same `RetryOptions` type as the client's, so there is one `RetryOptions`.
  - batch: `DataverseBatchErrorConstructor`.
  - files: `FileSource` (what `upload()` accepts).
  - generator: `EntityKeyType`, and `RetrieveMetadataChangesResponse` with the metadata detail types it uses.
  - otel, appinsights: their dependency data is core's `DependencyTelemetry`.
  - metadata: `RequiredEntityProperty`.

- 5b49972: `dataverse-gen generate` signs in with the configured `auth` (#81). Before, a config with `auth` (which `init` writes) stopped with "Authentication not implemented yet. Please provide --token manually."

  - `auth.flow: "deviceCode"` signs in with a `PublicClientApplication` and prints the device code instructions. `"clientCredentials"` (or `"clientSecret"`) uses a `ConfidentialClientApplication` with a client secret. Both go through `MsalNodeTokenProvider` from `@mohsinonxrm/dataverse-sdk-auth-msal-node`, for the `<environmentUrl>/.default` scope.
  - The token is acquired once per run, and `--token` still takes precedence.
  - `tenantId`, `clientId` and `clientSecret` fall back to `DATAVERSE_TENANT_ID`, `DATAVERSE_CLIENT_ID` and `DATAVERSE_CLIENT_SECRET`, so the config file can be committed without them. `auth.authority` sets the authority for sovereign clouds.
  - `"interactive"` is rejected with a pointer to `"deviceCode"`. With neither `auth` nor `--token`, `generate` says so instead of calling Dataverse unauthenticated.
  - `validate` checks the auth settings, and warns when the client secret is in the file.
  - `generateCode(config)` signs in the same way when no access token is passed. `createCliTokenProvider()`, `acquireCliToken()` and `dataverseScope()` are exported.
  - The generator now depends on `@mohsinonxrm/dataverse-sdk-auth-msal-node` and `@azure/msal-node`.

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

- 535d590: dataverse-gen doesn't generate the Web API's query functions (#342). **Breaking.**

  `$metadata` declares `LastXDays`, `Between`, `In`, `EqualUserId` and the other query functions as functions, so dataverse-gen wrote a class for each, and `client.execute()` on any of them got a 404: Dataverse runs them only inside `$filter`. They are left out now, also when `functions` in the configuration lists them. The CLI prints a warning for each one listed, and `generateCode()` returns it in `warnings` (it resolved `void` before). Write them with `queryFunctions` from `@mohsinonxrm/dataverse-sdk-functions`.

  A query function is an unbound function that returns `Edm.Boolean`, takes `PropertyName` (`Edm.String`) first, and has no `_` in its name. Custom APIs have a publisher prefix, so one of the same shape (`contoso_IsVip`) is still generated. `SchemaModel` has `QueryFunctionNames` (the ones it found) and `Warnings`.

- 8bba318: dataverse-gen: opt-in strict nulls (#305). `--strict-nulls`, `"strictNulls": true` in the configuration file, or `strictNulls: true` passed to `generateCode()` types operation responses exactly as `$metadata` declares them. Each complex type an operation returns (directly, nested, or as a base type) gets a `<Name>Output` interface. In it every property is there, and it's `T | null` unless the CSDL declares it `Nullable="false"`. `<Class>Response` and nested properties use it. A primitive, enum or complex return without `Nullable="false"` is `T | null` (a 204 is `null`), and so are the items of such a collection. Entity returns stay `Record | null`, and parameters keep the `<Name>` interfaces with optional properties. The option is off by default, and the default output is unchanged.
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

### Patch Changes

- bb5ede9: Operations bound to one record put its id in the URL as a GUID literal (#386), as dataverse-gen's classes already did: `new QualifyLeadAction("{…}", …)` with a braced id from Xrm calls `/leads(…)` without the braces instead of getting a 400, and an id that isn't a GUID throws `DataverseInvalidRequestError` before the request is sent. The generators also sort by UTF-16 code unit instead of the machine's locale, so the package indexes list their exports in that order (`Zed` before `beta`), and dataverse-gen writes its imports the same way on every machine.
- 40ed643: Raise the minimum versions of runtime dependencies to current releases within the same major version: `@azure/monitor-opentelemetry` ^1.20.1, `@azure/msal-browser` ^3.30.0, `@azure/msal-node` ^2.16.3, and `chalk`/`commander`/`ora` for the generator CLI. Installs then resolve to releases without known high or critical advisories. The MSAL and Azure Monitor packages later became peer dependencies (#24, #85, #159), and these versions are the lowest their peer ranges accept.
- 8e21c83: The package now ships `THIRD_PARTY_NOTICES.md` with the MIT copyright and permission notice of [scottdurow/dataverse-gen](https://github.com/scottdurow/dataverse-gen) (Copyright (c) 2020 Scott Durow), which parts of the generator are adapted from (#82). The adapted source files and templates have a header pointing to it, and the README's acknowledgments list what was adapted.
- 00f78a6: `dataverse-gen` now marks business-required columns: the Web API sends `RequiredLevel.Value` as the member name (`"ApplicationRequired"`), which was compared to the number `2`, so no generated column was ever `isRequired`. Generated attribute metadata also gets `requiredLevel` (`SystemRequired`, `ApplicationRequired` or `Recommended`) for any level other than `None`; `AttributeMetadata` in entities-runtime has the new optional field.
- 9c7cf74: Generated entities have unique member names (#244). A table whose lookup also has `<lookup>_<table>` collection navigation properties (`systemuser`: `createdby` and `createdby_sdkmessage`) no longer gets a second, collection-typed `createdby` merged in, which made `SystemUser.ts` fail strict `tsc` with duplicate members. Only single-valued `<lookup>_<target>` properties are merged into a polymorphic lookup, and a lookup that already has a navigation property of its own name is left alone. Any remaining duplicate navigation name is suffixed with its relationship name.
- 254a8ec: No `any` in the public API. **Breaking for TypeScript callers.**

  - **batch:** `BatchResponseStep.body` and `BatchResponsePart.body` are `unknown`. Both types take a generic for the body, `BatchResponseStep<TBody = unknown>`, so name the type of a response you know (`result.responses.get("who") as BatchResponseStep<WhoAmIResponse> | undefined`) or check the value. The request body of `addRequest()` and `BatchRequestStep` is `unknown`; every value is still accepted.
  - **entities-runtime:** `IEntity`'s index signature is `[key: string]: unknown`. Declared columns keep their types; any other property must be checked before use.
  - **core:** `DataverseServiceError.fromResponse(response, body?)` takes `body` as `unknown` and reads `code` and `message` only when they are strings. A response body that isn't JSON is kept as the text instead of making `fromResponse()` throw. `DataverseBatchError<TResult, TStep>` defaults its type parameters to `unknown` instead of `any` (the batch package still narrows them).
  - **auth-msal-node, generator:** internal `as any` casts replaced with narrowing; no behaviour change.

- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- Updated dependencies [ca11ddf]
- Updated dependencies [aec5a48]
- Updated dependencies [0a43f6d]
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
- Updated dependencies [40ed643]
- Updated dependencies [39b3917]
- Updated dependencies [bd2407e]
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
- Updated dependencies [f804b33]
- Updated dependencies [00f78a6]
- Updated dependencies [ff4060e]
- Updated dependencies [a45b788]
- Updated dependencies [757305a]
- Updated dependencies [6425990]
- Updated dependencies [8c50fec]
- Updated dependencies [5d6a139]
- Updated dependencies [8956dad]
- Updated dependencies [d3fb786]
- Updated dependencies [38eecbe]
- Updated dependencies [31b3531]
- Updated dependencies [87994ff]
- Updated dependencies [bc53abf]
- Updated dependencies [254a8ec]
- Updated dependencies [6bbb784]
- Updated dependencies [ab96b11]
- Updated dependencies [dd2acd8]
- Updated dependencies [3387804]
- Updated dependencies [652ad75]
- Updated dependencies [329c0b0]
- Updated dependencies [05a489a]
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
  - @mohsinonxrm/dataverse-sdk-entities-runtime@2.0.0-beta.0
  - @mohsinonxrm/dataverse-sdk-auth-msal-node@2.0.0-beta.0
  - @mohsinonxrm/dataverse-sdk-metadata@2.0.0-beta.0

## 1.0.0

### Major Changes

- 78fc1e1: Initial v1.0.0 release of Dataverse SDK for TypeScript

### Patch Changes

- Updated dependencies [78fc1e1]
  - @mohsinonxrm/dataverse-sdk-entities-runtime@1.0.0
  - @mohsinonxrm/dataverse-sdk-metadata@1.0.0
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
  - @mohsinonxrm/dataverse-sdk-metadata@1.0.0
  - @mohsinonxrm/dataverse-sdk-entities-runtime@1.0.0
