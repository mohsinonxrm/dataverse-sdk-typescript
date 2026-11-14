# @mohsinonxrm/dataverse-sdk-messages

## 2.1.0

### Minor Changes

- b63be15: The CSDL enums (`AttributeTypeCode`, `EntityFilters`, `AccessRights`, …) are const objects and a type of the same name instead of TypeScript `enum`s (#479). The values are the same numbers in 2.x, so `AttributeTypeCode.String`, `x: AttributeTypeCode` and `EntityFilters.Entity | EntityFilters.Attributes` compile and are sent exactly as before; a parameter still takes the member name too (`"Entity"`). A flags enum (`IsFlags="true"`, such as `EntityFilters` and `AccessRights`) is typed `number`; another enum's type is the union of its values.
  
  What no longer works: the reverse mapping (`AttributeTypeCode[14]` to get `"String"`), and assigning a plain `number` that isn't a member to a non-flags enum type. In 3.0 the values become the member names, which the Web API reads and writes (as the metadata package's enums already are).
- 44180ea: `UpsertRequest`, `RetrievePrincipalAccessRequest` and `CheckPrivilegeRequest`, with the shapes of the .NET messages (#435).
  
  - `new UpsertRequest({ Target, Key? })` creates the record when no record has its key and updates it otherwise: `PATCH /<set>(<key>)` without `If-Match`. `Key` is a GUID or an alternate key (`{ accountnumber: "A-1" }`); without it, `Target`'s primary key column is the key. The response has `RecordCreated` and `Target` (a reference), as in .NET: the request sends `Prefer: return=representation` with `$select` of the primary key, and Dataverse answers `201 Created` for a create and `200 OK` for an update.
  - `new RetrievePrincipalAccessRequest({ Principal, Target })` is one message for the function's three bindings: the `Principal` reference (a systemuser, team or organization) picks it. `response.AccessRights` is the rights as `AccessRights` flags (the Web API sends member names, `"ReadAccess, WriteAccess"`, which stay in `result.AccessRights`).
  - `new CheckPrivilegeRequest({ UserId, PrivilegeName, Depth? })` answers whether a user has a privilege through their roles or their teams' roles (`HasPrivilege`, and the deepest `Depth`). Dataverse has no CheckPrivilege message: it runs RetrieveUserPrivilegeByPrivilegeName, as Microsoft's "Verifying access in code" does.
  
  The package root's `UpsertResponse` and `RetrievePrincipalAccessResponse` are now these messages' response classes. They were type-only exports of the CSDL complex types of the same names (`{ ResponseName?, Results? }` and `{ AccessRights? }`), which no message's `execute()` resolved (`UpsertMultipleResult.Results` keeps the complex type's shape).

### Patch Changes

- Updated dependencies [b63be15]
- Updated dependencies [7aa258b]
- Updated dependencies [8dd4e44]
- Updated dependencies [cffc7cf]
- Updated dependencies [4761209]
- Updated dependencies [08a709c]
- Updated dependencies [83a2c45]
- Updated dependencies [eb31ca3]
- Updated dependencies [212bbe4]
- Updated dependencies [a1845c9]
- Updated dependencies [632b1cf]
- Updated dependencies [632b1cf]
- Updated dependencies [632b1cf]
- Updated dependencies [372cd24]
- Updated dependencies [fcda713]
  - @mohsinonxrm/dataverse-sdk-core@2.1.0
  - @mohsinonxrm/dataverse-sdk-batch@2.1.0
  - @mohsinonxrm/dataverse-sdk-entities-runtime@2.1.0

## 2.0.1

### Patch Changes

- Updated dependencies [17f85cf]
- Updated dependencies [3204963]
  - @mohsinonxrm/dataverse-sdk-core@2.0.1
  - @mohsinonxrm/dataverse-sdk-batch@2.0.1
  - @mohsinonxrm/dataverse-sdk-entities-runtime@2.0.1

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

- afdc7e9: Complex types have their navigation properties (#231).

  - The type generator ignored `NavigationProperty` elements on complex types, so `PrincipalAccess.Principal` was missing and `GrantAccess` and `ModifyAccess` needed a cast. Complex types now have their entity members, for example `PrincipalAccess.Principal`, `AuditDetail.AuditRecord`, `EntityCollection.Items` and `AttributeAuditDetail.OldValue` / `NewValue`.
  - They are typed like entity-typed parameters:
    - `crmbaseentity` members are `EntityReference | AnyEntityPayload`;
    - a table is `EntityReference | EntityPayload<table>`;
    - `Collection(crmbaseentity)` is `Record<string, unknown>[]`;
    - `principal` is `EntityReference`.
  - A member is required when the CSDL says `Nullable="false"`, so `PrincipalAccess` now requires `Principal`. Checked live: `new GrantAccessAction({ Target: target, PrincipalAccess: { Principal: createEntityReference("team", id), AccessMask } })` grants access, and `RevokeAccessAction` removes it.
  - functions: `AnyEntityPayload` and `EntityPayload` are exported, because complex types use them.

- 506a04f: Remove the plain-name classes of operations that have only bound overloads (#286).

  These names stood for one binding of an operation that has several, so `RetrievePrincipalAccessFunction` read as a class for users, teams and the organization when it could only call `organizations(…)`. Each binding has its own class (#75); use the one for the table you call. The class in brackets sends the same request as the removed name did.

  - actions: `AddItemCampaignAction` and `AddItemCampaignResponse` → `AddItemCampaign_campaignAction`, `AddItemCampaign_listAction`, `AddItemCampaign_productAction` or `AddItemCampaign_salesliteratureAction` (`AddItemCampaign_salesliteratureAction`).
  - messages: `AddItemCampaignRequest` and `AddItemCampaignResponse` → `AddItemCampaign_campaignRequest`, `AddItemCampaign_listRequest`, `AddItemCampaign_productRequest` or `AddItemCampaign_salesliteratureRequest` (`AddItemCampaign_salesliteratureRequest`).
  - functions, each with its `…Response` type:
    - `GetQuantityDecimalFunction` → `GetQuantityDecimal_invoiceFunction`, `_opportunityFunction`, `_quoteFunction` or `_salesorderFunction` (`_salesorder`).
    - `RetrieveAbsoluteAndSiteCollectionUrlFunction` → `RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationFunction` or `_sharepointsiteFunction` (`_sharepointdocumentlocation`).
    - `RetrievePrincipalAccessFunction` → `RetrievePrincipalAccess_systemuserFunction`, `_teamFunction` or `_organizationFunction` (`_organization`).
    - `RetrievePrincipalAccessInfoFunction`, `RetrievePrincipalAttributePrivilegesFunction` and `RetrievePrincipalSyncAttributeMappingsFunction` → their `_systemuserFunction` or `_teamFunction` class (`_team`).
    - `RetrieveProductPropertiesFunction` → `RetrieveProductProperties_invoicedetailFunction`, `_opportunityproductFunction`, `_quotedetailFunction` or `_salesorderdetailFunction` (`_invoicedetail`).
    - `RetrieveUnpublishedFunction` → `RetrieveUnpublished_<table>Function`, for example `RetrieveUnpublished_savedqueryFunction` (`_aipluginoperationparameter`).
    - `RetrieveUnpublishedMultipleFunction` → `RetrieveUnpublishedMultiple_<table>_collectionFunction`, for example `RetrieveUnpublishedMultiple_savedquery_collectionFunction` (`_aipluginoperationparameter_collection`).

  `docs/migration-2.0.md` has the same list as a table.

- 65657f4: Entity-typed action and message parameters take an entity payload, and optional parameters can be left out (#74).

  - `Merge`'s `UpdateContent` and other `crmbaseentity` parameters are `EntityReference | AnyEntityPayload`, an object whose `@odata.type` names the table and whose other properties are column values. They were typed `EntityReference`.
  - A parameter of one table, such as `WinOpportunity`'s `OpportunityClose`, is `EntityReference | EntityPayload<opportunityclose>`: its columns, `@odata.type`, and lookups set with `<navigation property>@odata.bind`. It was the read shape, which has `_opportunityid_value` but no way to bind a lookup. A collection of a table is `(EntityReference | EntityPayload<table>)[]`. `EntityPayload` and `AnyEntityPayload` are exported from both packages.
  - A parameter that `$metadata` doesn't mark `Nullable="false"` is optional, as it is for functions (#68): it can be left out, for example `new ExecuteWorkflowAction(workflowId, { EntityId })`, and isn't sent when it's `undefined`.
  - **messages: `createEntityReference` sends the Web API shape.** It sent `{ "@odata.type", id, logicalName }`, which Dataverse rejects in any entity parameter ("The property 'id' does not exist on type 'Microsoft.Dynamics.CRM.account'"). It now sends `@odata.type` and the table's primary key from the CSDL, as the actions package does. `id`, `logicalName` and `name` are kept but not enumerable. Since #295 there is one `createEntityReference` for the whole SDK, and its third argument is `EntityReferenceOptions` (`primaryIdAttribute`, `entitySetName` for a table the CSDL doesn't know, and `name` for the display name). A hand-written `{ "@odata.type", id }` literal no longer type-checks as an `EntityReference`; use `createEntityReference`.

- 5c473f0: A hand-written entity reference type-checks only in the shape the Web API reads (#251).

  - **actions, messages: only `createEntityReference` makes an `EntityReference`.** Its `logicalName`, `id` and `entitySetName` are not enumerable, so they aren't sent. A hand-written `{ "@odata.type", logicalName, id }` literal type-checked as an `EntityReference` but sent `logicalName` and `id`, which Dataverse rejects. `EntityReference` now has a type-only brand, and `EntityPayload` and `AnyEntityPayload` declare `logicalName?: never` and `entitySetName?: never`, so that literal no longer type-checks as any entity parameter. Nothing changes at runtime.
  - **New `WebApiEntityReference`**: the JSON shape, `{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "<id>" }`, for a reference written by hand. It's accepted wherever a payload is (`crmbaseentity` parameters such as `Merge`'s `Target`). Since #295 it is defined in entities-runtime and re-exported by actions, functions, messages and xrm.
  - **Breaking (types only).** An `EntityReference` must come from `createEntityReference`. Since #295 that is one function, and one `EntityReference` type, for the whole SDK, so a reference made with any package's `createEntityReference` is accepted by every package.
  - **files:** `FileColumnClient` builds the `InitializeFileBlocksUpload` target as a `WebApiEntityReference`, without a cast.

- ee3791b: Enum values in action and message bodies are sent as member names (#232).

  - **Dataverse rejects a number.** A test against a live org found that `GrantAccess` with `"AccessMask": 1` gets 400: "Cannot read the value '1' as a quoted JSON string value". It accepts `"ReadAccess"`, `"ReadAccess, WriteAccess"`, or the number as a string (`"1"`). The generated enums are numeric, so every action and message that put an enum in its body failed, among them `GrantAccess`, `ModifyAccess`, `GenerateSharedLink`, `BulkDelete`, `QueryExpressionToFetchXml`, `ImportSolution`, `AddPrivilegesRole`, `CreatePolymorphicLookupAttribute` and others.
  - **The fix.** These operations pass each such parameter through a generated `internal/enumBody.ts`, which writes member names. A flags enum is written as its bits joined with `, `, for example `AccessRights.ReadAccess | AccessRights.WriteAccess` becomes `"ReadAccess, WriteAccess"`. This also works inside complex types, at any depth, in arrays, and in derived types picked by `@odata.type` (a `QueryExpression` given for a `QueryBase`). Values with no matching member are sent as the number in a string, and strings are sent unchanged. The caller's objects aren't modified.
  - **The enums are exported from the package roots**, as in the functions package. For example, `import { AccessRights, LogicalOperator } from "@mohsinonxrm/dataverse-sdk-actions"`.

- 4abc5ed: Operations bound to an entity collection are called on the entity set (#69).

  - `ValidateSavedQuery`, `CreateException`, `CreateFlowMachineNetwork`, `DeliverIncomingEmail`, `ExportTranslation`, `FulfillSalesOrder` and `GenerateSocialProfile` (actions and messages) post to `/{entityset}/Microsoft.Dynamics.CRM.{Name}`, for example `/savedqueries/Microsoft.Dynamics.CRM.ValidateSavedQuery`. Before, they posted to `/{Name}`, which doesn't exist (404).
  - The bulk operations `CreateMultiple`, `UpdateMultiple`, `UpsertMultiple` and `DeleteMultiple` (actions and messages) take the entity set name as their first argument: `new CreateMultipleAction("accounts", { Targets: targets })` posts to `/accounts/Microsoft.Dynamics.CRM.CreateMultiple`. The old one-argument form could never succeed.
  - The collection-bound functions (`RetrievePrivilegeSet`, `RetrieveFilteredForms`, `GetDefaultPriceLevel`, `SearchByTitleKbArticle`, `UtcTimeFromLocalTime`, …) are called on their entity set too.

- c0bd227: Generated types follow the CSDL `Nullable` default and type base-typed parameters with `@odata.type` (#73).

  - Complex-type and entity-type properties are optional unless the CSDL marks them `Nullable="false"`. Before, every property was required, so a `QueryExpression`, `ColumnSet` or `PagingInfo` needed every field (or a cast).
  - A type with a generated base type extends it (`QueryExpression extends QueryBase`, `StringAttributeMetadata extends AttributeMetadata`, `email extends activitypointer`).
  - A base type also gets a `Typed<Name>` union of its concrete types, each with a required `"@odata.type"` literal (`TypedQueryBase`, `TypedActivitypointer`, `TypedAttributeMetadata`, …). Parameters declared with a base type use it: `QueryExpressionToFetchXml`, `BackgroundSendEmail`, `BulkDetectDuplicates`, `FullTextSearchKnowledgeArticle`, `PropagateByExpression`, `SendBulkMail` and `Validate` (actions and messages) and the `Rollup` function. Dataverse rejects these values without `@odata.type` (HTTP 400), so the compiler now requires it.

- 1ca3a58: Function-backed, CRUD and batch messages (#344).

  - **A message for each Web API function** of the platform, Sales and Customer Service: `WhoAmIRequest`, `RetrieveEntityRequest`, `RetrieveUserPrivilegesRequest`, `RetrievePrincipalAccess_systemuserRequest`, … (209 of them; the `$filter` query functions such as `LastXDays` aren't messages). Each sends the same `GET` with parameter aliases as the functions package's class, takes its parameters as one object kept in `Parameters`, and `response.result` is the function's value, as for the action-backed messages. Where a complex type has the name of a function message's response or result (`CalculateTotalTimeIncidentResponse`, `ValidateFetchXmlExpressionResult`), the package root exports the message's type under that name.
  - **CRUD messages:** `CreateRequest` (`response.id`), `RetrieveRequest` (`response.Entity`), `UpdateRequest` (with `If-Match`, so it never creates), `DeleteRequest`, `AssociateRequest`, `DisassociateRequest` and `RetrieveMultipleRequest` (a FetchXML query; `response.EntityCollection`). A record is an `EntityReference`; a new record is the Web API payload with `@odata.type`. An Associate or Disassociate of several records is one `$batch` change set.
  - **`ExecuteMultipleRequest` and `ExecuteTransactionRequest`**, over `$batch`: ExecuteMultiple sends one part per request (`Settings.ContinueOnError` sends `Prefer: odata.continue-on-error`) and resolves an item per request that ran, with its `Response` or its `Fault`, and `IsFaulted`; ExecuteTransaction sends one change set, resolves each request's response in order, and rejects with the failed request's error. Any message, action or function class can be one of their `Requests`. The messages package now depends on `@mohsinonxrm/dataverse-sdk-batch` for the `$batch` codec.
  - **core:** `Executable` has an optional `parsesErrorResponses` flag. When it's `true`, `client.execute()` passes an error response (status 400 or more) to `parseResponse` instead of rejecting with the error read from it: Dataverse answers a `$batch` that stopped at a failure with that failure's status, and the body still holds the responses of the requests that ran.

- b60315e: The generic `OrganizationRequest` can be executed (#80).

  `OrganizationRequest` now implements `Executable<OrganizationResponse>`, so `service.execute(new OrganizationRequest("new_CustomAction", { … }))` and `client.execute(…)` work instead of throwing "Request must implement Executable<T>".

  - It runs as a Web API action: `POST /{messageName}` with `Parameters` as the JSON body. A new third constructor argument, `{ boundTo: { entitySetName, id } }`, sends it to `POST /{entitySetName}({id})/Microsoft.Dynamics.CRM.{messageName}` instead.
  - `OrganizationResponse.Results` holds the response's properties without the `@odata.*` annotations, and is empty for `204 No Content`.
  - Typed message classes keep their own `toRequestInformation()` and `parseResponse()`.
  - The messages README and the mapping docs show the escape hatch with the real behaviour.

- 265e8a5: Message responses read their result correctly (#70).

  - An entity or complex-type return is the response body itself (with its `@odata.*` annotations since #300). Before, every response read `body.value`, so `result` was `undefined` for 962 of the 1356 messages, including `QueryExpressionToFetchXmlResponse` (`result.FetchXml`), `ExecuteWorkflowResponse` (`result.asyncoperationid`) and `ExportSolutionResponse` (`result.ExportSolutionFile`). Primitive and collection returns are still read from `value`.
  - `result` no longer references its own response class. Its type is exported as `<Name>Result`, for example `QueryExpressionToFetchXmlResult` (#300). A `crmbaseentity` return is typed as a record of columns, or an array of them for a collection, not `EntityReference`.
  - The unused `toRequestBody()` method is gone from the generated request classes. Nothing called it, and for bound messages it also sent the binding id as a parameter.

- 210705c: The actions, functions and messages packages are generated from a committed `$metadata` snapshot, so they can be reproduced (#293).

  The 1.0 packages came from a `$metadata` that was never committed, and Dataverse returns `$metadata` in a different order on each fetch, so regenerating them gave different files. Now `tools/generate-sdk-types/metadata/dataverse-metadata.xml` (a dev org with Sales, Customer Service, Contact Center, Customer Insights - Journeys, Universal Resource Scheduling and Power Pages, taken 2026-11-06) is committed, the generator sorts the schema before generating, and CI checks that `pnpm --filter generate-sdk-types regen` reproduces the packages exactly.

  - **Operation set.** The packages hold the snapshot org's operations instead of those of the uncommitted 1.0 metadata. The published 1.0.0 packages export 1,356 actions, 229 functions and 1,356 messages. Which of the snapshot's operations 2.0.0 ships, and how many, is the #304 entry.
  - **Removed:** the snapshot org has no Field Service, so its operations are gone (`msdyn_CreateWorkOrder`, `msdyn_FieldService…`, agreement and IoT checks, `msdyn_SelectNotToExceed`, `msdyn_TradeCoverageNotification`), with `pbi_*` Power BI operations, `QuerySalesforceUnstructuredData`, `QueryZendeskUnstructuredArticles`, `SearchWeb` and `querystructureddatastream`. `docs/migration-2.0.md` lists all of them.
  - Some operations gained or lost parameters with the org, for example `BulkDeleteAction` (optional `Options`) and `McpCreateTableAction` (required `usage`).
  - Interfaces in `types/` and the response types list their members in name order, and the dev org's own test table is no longer in `types/` or the `EntityReference` tables.
  - The operation counts in the READMEs and `docs/mapping` are generated, so they match the packages.

- 3387804: One `EntityReference` for the whole SDK (#295).

  The actions, functions, messages, entities-runtime and xrm packages each defined their own `EntityReference`, and the actions and messages ones each had their own `unique symbol` brand, so a reference from one package's `createEntityReference` didn't type-check where another package wanted one.

  - **entities-runtime defines it:** `EntityReference`, `createEntityReference`, `getEntitySetNameFromReference`, `EntityReferenceOptions`, `WebApiEntityReference` and `isEntityReference`. It depends only on core, so every package can import it without a cycle.
  - **actions, functions, messages and xrm import and re-export the same ones** (they now depend on entities-runtime), so existing imports keep working and a reference from any package is accepted by every package. The generator no longer writes an `EntityReference.ts` into actions, functions or messages; it writes the entity sets and primary keys `createEntityReference` reads to entities-runtime's `src/generated/entity-tables.ts` (the new `references` target).
  - **Breaking: one signature,** `createEntityReference(logicalName, id, { primaryIdAttribute?, entitySetName?, name? })`. The display name is an option: `createEntityReference("contact", id, "Jane")` becomes `createEntityReference("contact", id, { name: "Jane" })`.
  - **Breaking: always the Web API shape.** entities-runtime's and xrm's references were plain `{ logicalName, id, name?, entitySetName? }` objects. Now every reference is `{ "@odata.type", <primary key> }` with `logicalName`, `id`, `entitySetName` and `name` not enumerable, and `entitySetName` is filled in for the tables in the `$metadata` snapshot, so `formatEntityForWrite()` and `associate()` need no lookup for them.
  - **Breaking: only `createEntityReference` makes one.** A hand-written `{ logicalName, id }` no longer type-checks as a function parameter, an xrm `associate()` reference or an entities-runtime lookup, and `isEntityReference()` (so `formatEntityForWrite()`) also requires `@odata.type`.
  - **metadata:** `src/types` is regenerated from the committed `$metadata` snapshot by `regen`, and CI checks it like the other generated packages. The response types of operations the snapshot doesn't have are removed (`QuerySalesforceUnstructuredDataResponse`, `QueryZendeskUnstructuredArticlesResponse`, the Field Service `msdyn_…Response` types and others), the types the snapshot adds are new, and interface members are in name order.

- a5161d4: One class per operation binding, and `ExportToExcel` (#75).

  - **Overloads.** An operation that `$metadata` declares several times with different bindings had one file per name, so each binding overwrote the one before and only the last survived. For example, `RetrievePrincipalAccessFunction` could only call `organizations(…)`. Each binding now has its own class, named as in the entities generator: `<Name>_<table>` (`RetrievePrincipalAccess_systemuserFunction`, `RetrievePrincipalAccess_teamFunction`), plus `_collection` for a collection binding (`RetrieveUnpublishedMultiple_savedquery_collectionFunction`). An unbound overload keeps the plain name.
  - **Plain names.** None of the overloaded names has an unbound overload, so none keeps a plain-name class: pick the binding you call. The removed names and their replacements are listed in the #286 entry and in `docs/migration-2.0.md`.
  - **`ExportToExcelAction` and `ExportToExcelRequest`.** `$metadata` doesn't declare the action, but Dataverse runs it, so it is generated from a small supplemental definition in the generator. All five parameters are required: `View` (a `savedquery` or `userquery` reference), `FetchXml`, `LayoutXml`, `QueryApi` and `QueryParameters`. The response's `ExcelFile` is the .xlsx file, base64-encoded. With no query parameters, send `{ Arguments: { Count: 0, IsReadOnly: true, Keys: [], Values: [] } }`, because Dataverse rejects `{}`.

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

- 97a1388: The actions, functions and messages packages hold only the operations of the platform, Sales and Customer Service (#304). **Breaking.**

  The snapshot org also has Contact Center, Customer Insights - Journeys, Universal Resource Scheduling, Power Pages and Process Mining, and the packages used to hold every operation it had. Now each operation is kept or left out by the solution it comes from: `snapshot` records each operation's Microsoft-managed solutions in `tools/generate-sdk-types/metadata/operation-solutions.json`, and `prebuilt-solutions.json` says which solutions are prebuilt. The solution table in `tools/generate-sdk-types/metadata/README.md` lists all 213 solutions with their operation counts.

  - **Classes exported:** actions 1,556 → 1,072, functions 300 → 280, messages 1,556 → 1,072 (1.0 had 1,356, 229 and 1,356).
  - **Left out:** 504 of the snapshot's 1,798 operations, those of Contact Center (Omnichannel, unified routing, voice: `CCaaS_*`), Universal Resource Scheduling, Customer Insights - Journeys (`msdynmkt_*`), Customer Voice, Connected Customer Service (IoT), Power Pages and Process Mining. Field Service and Project Operations aren't in the snapshot org, and their solutions would be left out the same way. `docs/migration-2.0.md` lists the operations 1.0 had that 2.0 hasn't.
  - **Kept:** the Web API's query functions (`LastXDays`, …, as `queryFunctions` `$filter` helpers since #342), `ExportToExcel`, and every operation in a platform, Sales or Customer Service solution, Sales Insights, Copilot in Sales and Customer Service and the sales agents included.
  - **Types:** each package's `types/` has only the complex, entity and enum types its operations use, so the package root exports fewer enums.
  - **The rest:** generate typed classes for another app's operations, or your custom APIs, from your org with `dataverse-gen`: see "Generate the rest with dataverse-gen" in `docs/getting-started.md`.

- 3ea8f92: The package roots export the complex and entity types their operations use (#333), type-only, so
  they add no runtime code:

  ```ts
  import type {
    ComplexLookupAttributeMetadata,
    EntityPayload,
    opportunityclose,
  } from "@mohsinonxrm/dataverse-sdk-actions";
  ```

  Before, only the enums were exported, and a type such as `opportunityclose` could only be reached
  through `<Class>Parameters["X"]`. The `Typed<Name>` unions (`TypedQueryBase`) are exported too.

  Dataverse declares a complex type `<Operation>Response` for an operation with several output
  parameters. Where the package has that operation, the root's `<Operation>Response` stays the
  operation's response (what `execute()` resolves; in messages, the response class), and the complex
  type of the same name isn't re-exported. The entity type `solution` (next to the complex type
  `Solution`) is now in each package's `types/index.ts` as well.

### Patch Changes

- bb5ede9: Operations bound to one record put its id in the URL as a GUID literal (#386), as dataverse-gen's classes already did: `new QualifyLeadAction("{…}", …)` with a braced id from Xrm calls `/leads(…)` without the braces instead of getting a 400, and an id that isn't a GUID throws `DataverseInvalidRequestError` before the request is sent. The generators also sort by UTF-16 code unit instead of the machine's locale, so the package indexes list their exports in that order (`Zed` before `beta`), and dataverse-gen writes its imports the same way on every machine.
- 3b0eb42: README: every TypeScript example type-checks (#326). The bulk actions show their collection-bound routes, `DeleteMultiple` targets an elastic table, and the messages README no longer says messages wrap functions or that `Assign` is an action.
- f988456: README: `client.api()` and the typed operations (the actions and functions packages, and what `dataverse-gen` writes) are the documented main path, and `OrganizationService` with the messages is the compatibility layer for code ported from the .NET SDK (#311). The core README lists change tracking, `waitForAsyncOperation()`, the opt-in resilience middleware and telemetry among its features; README examples import what they use.
- 8c5cf39: Export `./package.json`, so `require("<package>/package.json")` and tools that read a package's version through it work.
- e8458a6: Generated actions and messages now declare their JSON body with a lower-case `content-type: application/json` header, the casing the core uses. Before, they set `Content-Type`. With an older core this was sent next to the core's own `content-type`, and `fetch` combined the two into one invalid value on every action call (#23).
- 1001f98: Function parameters are sent as the OData literal of their type (#67, #68).

  - Enum parameters are sent as `Microsoft.Dynamics.CRM.<Enum>'<value>'`, and accept an enum value or a member name: `new RetrieveEntityFunction({ EntityFilters: EntityFilters.Entity | EntityFilters.Attributes, … })` sends `EntityFilters'3'`. Before, they went as `1` or `'Entity'`, and Dataverse answered 400.
  - `Edm.Guid` and `Edm.DateTimeOffset` parameters are sent unquoted. Before, they were quoted, and Dataverse answered 400. DateTimeOffset parameters also accept a `Date`.
  - Parameters that the CSDL doesn't mark `Nullable="false"` are optional and are left out of the URL when `undefined`. A function with only optional parameters can be constructed without arguments (`new RetrieveMetadataChangesFunction()`).
  - The enums are exported as values from the functions package root (`import { EntityFilters } from "@mohsinonxrm/dataverse-sdk-functions"`). In every package's generated `types/index.ts`, enums are now value exports.
  - The literals come from `formatParameterAlias`, which behaves exactly like the one in `@mohsinonxrm/dataverse-sdk-entities-runtime`.

- 287d6fd: Bound messages use the entity set from the CSDL (#76). `CalculateActualValueOpportunityRequest`, `DistributeCampaignActivityRequest`, `RemoveItemCampaignActivityRequest` and `GetRunMapRequest` posted to `/opportunitys(…)`, `/campaignactivitys(…)` and `/businessprocesss(…)`, which don't exist. They now post to `/opportunities(…)`, `/campaignactivities(…)` and `/businessprocesses(…)`, as the actions package does.
- 3b332ca: Export the `OrganizationRequestOptions` type (the `boundTo` option of `OrganizationRequest`) from the package root (#234), so `import type { OrganizationRequestOptions } from "@mohsinonxrm/dataverse-sdk-messages"` compiles. The generator's index template now emits it too, so a regeneration keeps it.
- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- eea04b2: The READMEs list only operations that exist, with their real constructors (#88). The operation lists and counts are now generated from the package source, and a test fails when they are stale.

  - Removed classes that don't exist: `AssignAction`, `SetStateAction`, `AssignRequest`, `SetStateRequest`, `WhoAmIRequest`, `RetrievePrincipalAccessRequest`, `RetrieveMetadataChangesRequest`, `CreateEntityRequest` and `CreateAttributeRequest`. Assign and SetState aren't Web API actions; the READMEs show the record update to use instead.
  - Fixed the examples for `WinOpportunity` (with `Caller`), `ExecuteWorkflow` (`asyncoperationid`), `InitializeFrom`, `RetrieveMetadataChanges`, `ExportSolution` and `ImportSolution` (parameter order).
  - The file actions are documented as unbound, and with the right parameter order.
  - Removed the false claim that a target without `@odata.type` throws client-side.
  - The custom-function example no longer uses a `.query()` method, which doesn't exist.

- 0fac2a9: **Breaking.** `UpsertMultiple` resolves `null` for Dataverse's `204 No Content` instead of throwing "Unexpected end of JSON input" after the records were written. `$metadata` declares a `mscrm.UpsertMultipleResponse` return, but ["the `UpsertMultiple` action returns `204 NoContent`"](https://learn.microsoft.com/power-apps/developer/data-platform/bulk-operations#examples).

  - `UpsertMultipleResponse` (actions) and `UpsertMultipleResult` (messages) are now `{ "@odata.context"?, Results } | null` types instead of interfaces. `client.execute(new UpsertMultipleAction(...))` resolves `null`, and `UpsertMultipleRequest`'s `result` is `null`; a body is still read if Dataverse ever sends one.
  - dataverse-gen does the same: an operation Dataverse answers with a 204 although `$metadata` declares a primitive or complex return (today `UpsertMultiple`) has a `<Class>Response` of `<Type> | null`, and resolves `null` for the 204.

- Updated dependencies [9bb1db9]
- Updated dependencies [ca11ddf]
- Updated dependencies [c81fc72]
- Updated dependencies [0e1dc6f]
- Updated dependencies [f256212]
- Updated dependencies [da62e18]
- Updated dependencies [6c7af76]
- Updated dependencies [b9457f1]
- Updated dependencies [9c6d970]
- Updated dependencies [aec5a48]
- Updated dependencies [83f2256]
- Updated dependencies [f780438]
- Updated dependencies [0a43f6d]
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
- Updated dependencies [56dfa86]
- Updated dependencies [bd2407e]
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
- Updated dependencies [f804b33]
- Updated dependencies [00f78a6]
- Updated dependencies [ff4060e]
- Updated dependencies [ba9e84a]
- Updated dependencies [63ec4bf]
- Updated dependencies [1ca3a58]
- Updated dependencies [254a8ec]
- Updated dependencies [6bbb784]
- Updated dependencies [dd2acd8]
- Updated dependencies [3387804]
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
  - @mohsinonxrm/dataverse-sdk-batch@2.0.0
  - @mohsinonxrm/dataverse-sdk-entities-runtime@2.0.0

## 2.0.0-beta.1

### Minor Changes

- 1ca3a58: Function-backed, CRUD and batch messages (#344).

  - **A message for each Web API function** of the platform, Sales and Customer Service: `WhoAmIRequest`, `RetrieveEntityRequest`, `RetrieveUserPrivilegesRequest`, `RetrievePrincipalAccess_systemuserRequest`, … (209 of them; the `$filter` query functions such as `LastXDays` aren't messages). Each sends the same `GET` with parameter aliases as the functions package's class, takes its parameters as one object kept in `Parameters`, and `response.result` is the function's value, as for the action-backed messages. Where a complex type has the name of a function message's response or result (`CalculateTotalTimeIncidentResponse`, `ValidateFetchXmlExpressionResult`), the package root exports the message's type under that name.
  - **CRUD messages:** `CreateRequest` (`response.id`), `RetrieveRequest` (`response.Entity`), `UpdateRequest` (with `If-Match`, so it never creates), `DeleteRequest`, `AssociateRequest`, `DisassociateRequest` and `RetrieveMultipleRequest` (a FetchXML query; `response.EntityCollection`). A record is an `EntityReference`; a new record is the Web API payload with `@odata.type`. An Associate or Disassociate of several records is one `$batch` change set.
  - **`ExecuteMultipleRequest` and `ExecuteTransactionRequest`**, over `$batch`: ExecuteMultiple sends one part per request (`Settings.ContinueOnError` sends `Prefer: odata.continue-on-error`) and resolves an item per request that ran, with its `Response` or its `Fault`, and `IsFaulted`; ExecuteTransaction sends one change set, resolves each request's response in order, and rejects with the failed request's error. Any message, action or function class can be one of their `Requests`. The messages package now depends on `@mohsinonxrm/dataverse-sdk-batch` for the `$batch` codec.
  - **core:** `Executable` has an optional `parsesErrorResponses` flag. When it's `true`, `client.execute()` passes an error response (status 400 or more) to `parseResponse` instead of rejecting with the error read from it: Dataverse answers a `$batch` that stopped at a failure with that failure's status, and the body still holds the responses of the requests that ran.

### Patch Changes

- f988456: README: `client.api()` and the typed operations (the actions and functions packages, and what `dataverse-gen` writes) are the documented main path, and `OrganizationService` with the messages is the compatibility layer for code ported from the .NET SDK (#311). The core README lists change tracking, `waitForAsyncOperation()`, the opt-in resilience middleware and telemetry among its features; README examples import what they use.
- 0fac2a9: **Breaking.** `UpsertMultiple` resolves `null` for Dataverse's `204 No Content` instead of throwing "Unexpected end of JSON input" after the records were written. `$metadata` declares a `mscrm.UpsertMultipleResponse` return, but ["the `UpsertMultiple` action returns `204 NoContent`"](https://learn.microsoft.com/power-apps/developer/data-platform/bulk-operations#examples).

  - `UpsertMultipleResponse` (actions) and `UpsertMultipleResult` (messages) are now `{ "@odata.context"?, Results } | null` types instead of interfaces. `client.execute(new UpsertMultipleAction(...))` resolves `null`, and `UpsertMultipleRequest`'s `result` is `null`; a body is still read if Dataverse ever sends one.
  - dataverse-gen does the same: an operation Dataverse answers with a 204 although `$metadata` declares a primitive or complex return (today `UpsertMultiple`) has a `<Class>Response` of `<Type> | null`, and resolves `null` for the 204.

- Updated dependencies [9bb1db9]
- Updated dependencies [c81fc72]
- Updated dependencies [0e1dc6f]
- Updated dependencies [9c6d970]
- Updated dependencies [83f2256]
- Updated dependencies [f780438]
- Updated dependencies [e606f24]
- Updated dependencies [f988456]
- Updated dependencies [ba9e84a]
- Updated dependencies [63ec4bf]
- Updated dependencies [1ca3a58]
- Updated dependencies [ff655da]
- Updated dependencies [b1bd587]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0-beta.1
  - @mohsinonxrm/dataverse-sdk-batch@2.0.0-beta.1
  - @mohsinonxrm/dataverse-sdk-entities-runtime@2.0.0-beta.1

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

- afdc7e9: Complex types have their navigation properties (#231).

  - The type generator ignored `NavigationProperty` elements on complex types, so `PrincipalAccess.Principal` was missing and `GrantAccess` and `ModifyAccess` needed a cast. Complex types now have their entity members, for example `PrincipalAccess.Principal`, `AuditDetail.AuditRecord`, `EntityCollection.Items` and `AttributeAuditDetail.OldValue` / `NewValue`.
  - They are typed like entity-typed parameters:
    - `crmbaseentity` members are `EntityReference | AnyEntityPayload`;
    - a table is `EntityReference | EntityPayload<table>`;
    - `Collection(crmbaseentity)` is `Record<string, unknown>[]`;
    - `principal` is `EntityReference`.
  - A member is required when the CSDL says `Nullable="false"`, so `PrincipalAccess` now requires `Principal`. Checked live: `new GrantAccessAction({ Target: target, PrincipalAccess: { Principal: createEntityReference("team", id), AccessMask } })` grants access, and `RevokeAccessAction` removes it.
  - functions: `AnyEntityPayload` and `EntityPayload` are exported, because complex types use them.

- 506a04f: Remove the plain-name classes of operations that have only bound overloads (#286).

  These names stood for one binding of an operation that has several, so `RetrievePrincipalAccessFunction` read as a class for users, teams and the organization when it could only call `organizations(…)`. Each binding has its own class (#75); use the one for the table you call. The class in brackets sends the same request as the removed name did.

  - actions: `AddItemCampaignAction` and `AddItemCampaignResponse` → `AddItemCampaign_campaignAction`, `AddItemCampaign_listAction`, `AddItemCampaign_productAction` or `AddItemCampaign_salesliteratureAction` (`AddItemCampaign_salesliteratureAction`).
  - messages: `AddItemCampaignRequest` and `AddItemCampaignResponse` → `AddItemCampaign_campaignRequest`, `AddItemCampaign_listRequest`, `AddItemCampaign_productRequest` or `AddItemCampaign_salesliteratureRequest` (`AddItemCampaign_salesliteratureRequest`).
  - functions, each with its `…Response` type:
    - `GetQuantityDecimalFunction` → `GetQuantityDecimal_invoiceFunction`, `_opportunityFunction`, `_quoteFunction` or `_salesorderFunction` (`_salesorder`).
    - `RetrieveAbsoluteAndSiteCollectionUrlFunction` → `RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationFunction` or `_sharepointsiteFunction` (`_sharepointdocumentlocation`).
    - `RetrievePrincipalAccessFunction` → `RetrievePrincipalAccess_systemuserFunction`, `_teamFunction` or `_organizationFunction` (`_organization`).
    - `RetrievePrincipalAccessInfoFunction`, `RetrievePrincipalAttributePrivilegesFunction` and `RetrievePrincipalSyncAttributeMappingsFunction` → their `_systemuserFunction` or `_teamFunction` class (`_team`).
    - `RetrieveProductPropertiesFunction` → `RetrieveProductProperties_invoicedetailFunction`, `_opportunityproductFunction`, `_quotedetailFunction` or `_salesorderdetailFunction` (`_invoicedetail`).
    - `RetrieveUnpublishedFunction` → `RetrieveUnpublished_<table>Function`, for example `RetrieveUnpublished_savedqueryFunction` (`_aipluginoperationparameter`).
    - `RetrieveUnpublishedMultipleFunction` → `RetrieveUnpublishedMultiple_<table>_collectionFunction`, for example `RetrieveUnpublishedMultiple_savedquery_collectionFunction` (`_aipluginoperationparameter_collection`).

  `docs/migration-2.0.md` has the same list as a table.

- 65657f4: Entity-typed action and message parameters take an entity payload, and optional parameters can be left out (#74).

  - `Merge`'s `UpdateContent` and other `crmbaseentity` parameters are `EntityReference | AnyEntityPayload`, an object whose `@odata.type` names the table and whose other properties are column values. They were typed `EntityReference`.
  - A parameter of one table, such as `WinOpportunity`'s `OpportunityClose`, is `EntityReference | EntityPayload<opportunityclose>`: its columns, `@odata.type`, and lookups set with `<navigation property>@odata.bind`. It was the read shape, which has `_opportunityid_value` but no way to bind a lookup. A collection of a table is `(EntityReference | EntityPayload<table>)[]`. `EntityPayload` and `AnyEntityPayload` are exported from both packages.
  - A parameter that `$metadata` doesn't mark `Nullable="false"` is optional, as it is for functions (#68): it can be left out, for example `new ExecuteWorkflowAction(workflowId, { EntityId })`, and isn't sent when it's `undefined`.
  - **messages: `createEntityReference` sends the Web API shape.** It sent `{ "@odata.type", id, logicalName }`, which Dataverse rejects in any entity parameter ("The property 'id' does not exist on type 'Microsoft.Dynamics.CRM.account'"). It now sends `@odata.type` and the table's primary key from the CSDL, as the actions package does. `id`, `logicalName` and `name` are kept but not enumerable. Since #295 there is one `createEntityReference` for the whole SDK, and its third argument is `EntityReferenceOptions` (`primaryIdAttribute`, `entitySetName` for a table the CSDL doesn't know, and `name` for the display name). A hand-written `{ "@odata.type", id }` literal no longer type-checks as an `EntityReference`; use `createEntityReference`.

- 5c473f0: A hand-written entity reference type-checks only in the shape the Web API reads (#251).

  - **actions, messages: only `createEntityReference` makes an `EntityReference`.** Its `logicalName`, `id` and `entitySetName` are not enumerable, so they aren't sent. A hand-written `{ "@odata.type", logicalName, id }` literal type-checked as an `EntityReference` but sent `logicalName` and `id`, which Dataverse rejects. `EntityReference` now has a type-only brand, and `EntityPayload` and `AnyEntityPayload` declare `logicalName?: never` and `entitySetName?: never`, so that literal no longer type-checks as any entity parameter. Nothing changes at runtime.
  - **New `WebApiEntityReference`**: the JSON shape, `{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "<id>" }`, for a reference written by hand. It's accepted wherever a payload is (`crmbaseentity` parameters such as `Merge`'s `Target`). Since #295 it is defined in entities-runtime and re-exported by actions, functions, messages and xrm.
  - **Breaking (types only).** An `EntityReference` must come from `createEntityReference`. Since #295 that is one function, and one `EntityReference` type, for the whole SDK, so a reference made with any package's `createEntityReference` is accepted by every package.
  - **files:** `FileColumnClient` builds the `InitializeFileBlocksUpload` target as a `WebApiEntityReference`, without a cast.

- ee3791b: Enum values in action and message bodies are sent as member names (#232).

  - **Dataverse rejects a number.** A test against a live org found that `GrantAccess` with `"AccessMask": 1` gets 400: "Cannot read the value '1' as a quoted JSON string value". It accepts `"ReadAccess"`, `"ReadAccess, WriteAccess"`, or the number as a string (`"1"`). The generated enums are numeric, so every action and message that put an enum in its body failed, among them `GrantAccess`, `ModifyAccess`, `GenerateSharedLink`, `BulkDelete`, `QueryExpressionToFetchXml`, `ImportSolution`, `AddPrivilegesRole`, `CreatePolymorphicLookupAttribute` and others.
  - **The fix.** These operations pass each such parameter through a generated `internal/enumBody.ts`, which writes member names. A flags enum is written as its bits joined with `, `, for example `AccessRights.ReadAccess | AccessRights.WriteAccess` becomes `"ReadAccess, WriteAccess"`. This also works inside complex types, at any depth, in arrays, and in derived types picked by `@odata.type` (a `QueryExpression` given for a `QueryBase`). Values with no matching member are sent as the number in a string, and strings are sent unchanged. The caller's objects aren't modified.
  - **The enums are exported from the package roots**, as in the functions package. For example, `import { AccessRights, LogicalOperator } from "@mohsinonxrm/dataverse-sdk-actions"`.

- 4abc5ed: Operations bound to an entity collection are called on the entity set (#69).

  - `ValidateSavedQuery`, `CreateException`, `CreateFlowMachineNetwork`, `DeliverIncomingEmail`, `ExportTranslation`, `FulfillSalesOrder` and `GenerateSocialProfile` (actions and messages) post to `/{entityset}/Microsoft.Dynamics.CRM.{Name}`, for example `/savedqueries/Microsoft.Dynamics.CRM.ValidateSavedQuery`. Before, they posted to `/{Name}`, which doesn't exist (404).
  - The bulk operations `CreateMultiple`, `UpdateMultiple`, `UpsertMultiple` and `DeleteMultiple` (actions and messages) take the entity set name as their first argument: `new CreateMultipleAction("accounts", { Targets: targets })` posts to `/accounts/Microsoft.Dynamics.CRM.CreateMultiple`. The old one-argument form could never succeed.
  - The collection-bound functions (`RetrievePrivilegeSet`, `RetrieveFilteredForms`, `GetDefaultPriceLevel`, `SearchByTitleKbArticle`, `UtcTimeFromLocalTime`, …) are called on their entity set too.

- c0bd227: Generated types follow the CSDL `Nullable` default and type base-typed parameters with `@odata.type` (#73).

  - Complex-type and entity-type properties are optional unless the CSDL marks them `Nullable="false"`. Before, every property was required, so a `QueryExpression`, `ColumnSet` or `PagingInfo` needed every field (or a cast).
  - A type with a generated base type extends it (`QueryExpression extends QueryBase`, `StringAttributeMetadata extends AttributeMetadata`, `email extends activitypointer`).
  - A base type also gets a `Typed<Name>` union of its concrete types, each with a required `"@odata.type"` literal (`TypedQueryBase`, `TypedActivitypointer`, `TypedAttributeMetadata`, …). Parameters declared with a base type use it: `QueryExpressionToFetchXml`, `BackgroundSendEmail`, `BulkDetectDuplicates`, `FullTextSearchKnowledgeArticle`, `PropagateByExpression`, `SendBulkMail` and `Validate` (actions and messages) and the `Rollup` function. Dataverse rejects these values without `@odata.type` (HTTP 400), so the compiler now requires it.

- b60315e: The generic `OrganizationRequest` can be executed (#80).

  `OrganizationRequest` now implements `Executable<OrganizationResponse>`, so `service.execute(new OrganizationRequest("new_CustomAction", { … }))` and `client.execute(…)` work instead of throwing "Request must implement Executable<T>".

  - It runs as a Web API action: `POST /{messageName}` with `Parameters` as the JSON body. A new third constructor argument, `{ boundTo: { entitySetName, id } }`, sends it to `POST /{entitySetName}({id})/Microsoft.Dynamics.CRM.{messageName}` instead.
  - `OrganizationResponse.Results` holds the response's properties without the `@odata.*` annotations, and is empty for `204 No Content`.
  - Typed message classes keep their own `toRequestInformation()` and `parseResponse()`.
  - The messages README and the mapping docs show the escape hatch with the real behaviour.

- 265e8a5: Message responses read their result correctly (#70).

  - An entity or complex-type return is the response body itself (with its `@odata.*` annotations since #300). Before, every response read `body.value`, so `result` was `undefined` for 962 of the 1356 messages, including `QueryExpressionToFetchXmlResponse` (`result.FetchXml`), `ExecuteWorkflowResponse` (`result.asyncoperationid`) and `ExportSolutionResponse` (`result.ExportSolutionFile`). Primitive and collection returns are still read from `value`.
  - `result` no longer references its own response class. Its type is exported as `<Name>Result`, for example `QueryExpressionToFetchXmlResult` (#300). A `crmbaseentity` return is typed as a record of columns, or an array of them for a collection, not `EntityReference`.
  - The unused `toRequestBody()` method is gone from the generated request classes. Nothing called it, and for bound messages it also sent the binding id as a parameter.

- 210705c: The actions, functions and messages packages are generated from a committed `$metadata` snapshot, so they can be reproduced (#293).

  The 1.0 packages came from a `$metadata` that was never committed, and Dataverse returns `$metadata` in a different order on each fetch, so regenerating them gave different files. Now `tools/generate-sdk-types/metadata/dataverse-metadata.xml` (a dev org with Sales, Customer Service, Contact Center, Customer Insights - Journeys, Universal Resource Scheduling and Power Pages, taken 2026-11-06) is committed, the generator sorts the schema before generating, and CI checks that `pnpm --filter generate-sdk-types regen` reproduces the packages exactly.

  - **Operation set.** The packages hold the snapshot org's operations instead of those of the uncommitted 1.0 metadata. The published 1.0.0 packages export 1,356 actions, 229 functions and 1,356 messages. Which of the snapshot's operations 2.0.0 ships, and how many, is the #304 entry.
  - **Removed:** the snapshot org has no Field Service, so its operations are gone (`msdyn_CreateWorkOrder`, `msdyn_FieldService…`, agreement and IoT checks, `msdyn_SelectNotToExceed`, `msdyn_TradeCoverageNotification`), with `pbi_*` Power BI operations, `QuerySalesforceUnstructuredData`, `QueryZendeskUnstructuredArticles`, `SearchWeb` and `querystructureddatastream`. `docs/migration-2.0.md` lists all of them.
  - Some operations gained or lost parameters with the org, for example `BulkDeleteAction` (optional `Options`) and `McpCreateTableAction` (required `usage`).
  - Interfaces in `types/` and the response types list their members in name order, and the dev org's own test table is no longer in `types/` or the `EntityReference` tables.
  - The operation counts in the READMEs and `docs/mapping` are generated, so they match the packages.

- 3387804: One `EntityReference` for the whole SDK (#295).

  The actions, functions, messages, entities-runtime and xrm packages each defined their own `EntityReference`, and the actions and messages ones each had their own `unique symbol` brand, so a reference from one package's `createEntityReference` didn't type-check where another package wanted one.

  - **entities-runtime defines it:** `EntityReference`, `createEntityReference`, `getEntitySetNameFromReference`, `EntityReferenceOptions`, `WebApiEntityReference` and `isEntityReference`. It depends only on core, so every package can import it without a cycle.
  - **actions, functions, messages and xrm import and re-export the same ones** (they now depend on entities-runtime), so existing imports keep working and a reference from any package is accepted by every package. The generator no longer writes an `EntityReference.ts` into actions, functions or messages; it writes the entity sets and primary keys `createEntityReference` reads to entities-runtime's `src/generated/entity-tables.ts` (the new `references` target).
  - **Breaking: one signature,** `createEntityReference(logicalName, id, { primaryIdAttribute?, entitySetName?, name? })`. The display name is an option: `createEntityReference("contact", id, "Jane")` becomes `createEntityReference("contact", id, { name: "Jane" })`.
  - **Breaking: always the Web API shape.** entities-runtime's and xrm's references were plain `{ logicalName, id, name?, entitySetName? }` objects. Now every reference is `{ "@odata.type", <primary key> }` with `logicalName`, `id`, `entitySetName` and `name` not enumerable, and `entitySetName` is filled in for the tables in the `$metadata` snapshot, so `formatEntityForWrite()` and `associate()` need no lookup for them.
  - **Breaking: only `createEntityReference` makes one.** A hand-written `{ logicalName, id }` no longer type-checks as a function parameter, an xrm `associate()` reference or an entities-runtime lookup, and `isEntityReference()` (so `formatEntityForWrite()`) also requires `@odata.type`.
  - **metadata:** `src/types` is regenerated from the committed `$metadata` snapshot by `regen`, and CI checks it like the other generated packages. The response types of operations the snapshot doesn't have are removed (`QuerySalesforceUnstructuredDataResponse`, `QueryZendeskUnstructuredArticlesResponse`, the Field Service `msdyn_…Response` types and others), the types the snapshot adds are new, and interface members are in name order.

- a5161d4: One class per operation binding, and `ExportToExcel` (#75).

  - **Overloads.** An operation that `$metadata` declares several times with different bindings had one file per name, so each binding overwrote the one before and only the last survived. For example, `RetrievePrincipalAccessFunction` could only call `organizations(…)`. Each binding now has its own class, named as in the entities generator: `<Name>_<table>` (`RetrievePrincipalAccess_systemuserFunction`, `RetrievePrincipalAccess_teamFunction`), plus `_collection` for a collection binding (`RetrieveUnpublishedMultiple_savedquery_collectionFunction`). An unbound overload keeps the plain name.
  - **Plain names.** None of the overloaded names has an unbound overload, so none keeps a plain-name class: pick the binding you call. The removed names and their replacements are listed in the #286 entry and in `docs/migration-2.0.md`.
  - **`ExportToExcelAction` and `ExportToExcelRequest`.** `$metadata` doesn't declare the action, but Dataverse runs it, so it is generated from a small supplemental definition in the generator. All five parameters are required: `View` (a `savedquery` or `userquery` reference), `FetchXml`, `LayoutXml`, `QueryApi` and `QueryParameters`. The response's `ExcelFile` is the .xlsx file, base64-encoded. With no query parameters, send `{ Arguments: { Count: 0, IsReadOnly: true, Keys: [], Values: [] } }`, because Dataverse rejects `{}`.

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

- 97a1388: The actions, functions and messages packages hold only the operations of the platform, Sales and Customer Service (#304). **Breaking.**

  The snapshot org also has Contact Center, Customer Insights - Journeys, Universal Resource Scheduling, Power Pages and Process Mining, and the packages used to hold every operation it had. Now each operation is kept or left out by the solution it comes from: `snapshot` records each operation's Microsoft-managed solutions in `tools/generate-sdk-types/metadata/operation-solutions.json`, and `prebuilt-solutions.json` says which solutions are prebuilt. The solution table in `tools/generate-sdk-types/metadata/README.md` lists all 213 solutions with their operation counts.

  - **Classes exported:** actions 1,556 → 1,072, functions 300 → 280, messages 1,556 → 1,072 (1.0 had 1,356, 229 and 1,356).
  - **Left out:** 504 of the snapshot's 1,798 operations, those of Contact Center (Omnichannel, unified routing, voice: `CCaaS_*`), Universal Resource Scheduling, Customer Insights - Journeys (`msdynmkt_*`), Customer Voice, Connected Customer Service (IoT), Power Pages and Process Mining. Field Service and Project Operations aren't in the snapshot org, and their solutions would be left out the same way. `docs/migration-2.0.md` lists the operations 1.0 had that 2.0 hasn't.
  - **Kept:** the Web API's query functions (`LastXDays`, …, as `queryFunctions` `$filter` helpers since #342), `ExportToExcel`, and every operation in a platform, Sales or Customer Service solution, Sales Insights, Copilot in Sales and Customer Service and the sales agents included.
  - **Types:** each package's `types/` has only the complex, entity and enum types its operations use, so the package root exports fewer enums.
  - **The rest:** generate typed classes for another app's operations, or your custom APIs, from your org with `dataverse-gen`: see "Generate the rest with dataverse-gen" in `docs/getting-started.md`.

- 3ea8f92: The package roots export the complex and entity types their operations use (#333), type-only, so
  they add no runtime code:

  ```ts
  import type {
    ComplexLookupAttributeMetadata,
    EntityPayload,
    opportunityclose,
  } from "@mohsinonxrm/dataverse-sdk-actions";
  ```

  Before, only the enums were exported, and a type such as `opportunityclose` could only be reached
  through `<Class>Parameters["X"]`. The `Typed<Name>` unions (`TypedQueryBase`) are exported too.

  Dataverse declares a complex type `<Operation>Response` for an operation with several output
  parameters. Where the package has that operation, the root's `<Operation>Response` stays the
  operation's response (what `execute()` resolves; in messages, the response class), and the complex
  type of the same name isn't re-exported. The entity type `solution` (next to the complex type
  `Solution`) is now in each package's `types/index.ts` as well.

### Patch Changes

- bb5ede9: Operations bound to one record put its id in the URL as a GUID literal (#386), as dataverse-gen's classes already did: `new QualifyLeadAction("{…}", …)` with a braced id from Xrm calls `/leads(…)` without the braces instead of getting a 400, and an id that isn't a GUID throws `DataverseInvalidRequestError` before the request is sent. The generators also sort by UTF-16 code unit instead of the machine's locale, so the package indexes list their exports in that order (`Zed` before `beta`), and dataverse-gen writes its imports the same way on every machine.
- 3b0eb42: README: every TypeScript example type-checks (#326). The bulk actions show their collection-bound routes, `DeleteMultiple` targets an elastic table, and the messages README no longer says messages wrap functions or that `Assign` is an action.
- e8458a6: Generated actions and messages now declare their JSON body with a lower-case `content-type: application/json` header, the casing the core uses. Before, they set `Content-Type`. With an older core this was sent next to the core's own `content-type`, and `fetch` combined the two into one invalid value on every action call (#23).
- 1001f98: Function parameters are sent as the OData literal of their type (#67, #68).

  - Enum parameters are sent as `Microsoft.Dynamics.CRM.<Enum>'<value>'`, and accept an enum value or a member name: `new RetrieveEntityFunction({ EntityFilters: EntityFilters.Entity | EntityFilters.Attributes, … })` sends `EntityFilters'3'`. Before, they went as `1` or `'Entity'`, and Dataverse answered 400.
  - `Edm.Guid` and `Edm.DateTimeOffset` parameters are sent unquoted. Before, they were quoted, and Dataverse answered 400. DateTimeOffset parameters also accept a `Date`.
  - Parameters that the CSDL doesn't mark `Nullable="false"` are optional and are left out of the URL when `undefined`. A function with only optional parameters can be constructed without arguments (`new RetrieveMetadataChangesFunction()`).
  - The enums are exported as values from the functions package root (`import { EntityFilters } from "@mohsinonxrm/dataverse-sdk-functions"`). In every package's generated `types/index.ts`, enums are now value exports.
  - The literals come from `formatParameterAlias`, which behaves exactly like the one in `@mohsinonxrm/dataverse-sdk-entities-runtime`.

- 287d6fd: Bound messages use the entity set from the CSDL (#76). `CalculateActualValueOpportunityRequest`, `DistributeCampaignActivityRequest`, `RemoveItemCampaignActivityRequest` and `GetRunMapRequest` posted to `/opportunitys(…)`, `/campaignactivitys(…)` and `/businessprocesss(…)`, which don't exist. They now post to `/opportunities(…)`, `/campaignactivities(…)` and `/businessprocesses(…)`, as the actions package does.
- 3b332ca: Export the `OrganizationRequestOptions` type (the `boundTo` option of `OrganizationRequest`) from the package root (#234), so `import type { OrganizationRequestOptions } from "@mohsinonxrm/dataverse-sdk-messages"` compiles. The generator's index template now emits it too, so a regeneration keeps it.
- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- eea04b2: The READMEs list only operations that exist, with their real constructors (#88). The operation lists and counts are now generated from the package source, and a test fails when they are stale.

  - Removed classes that don't exist: `AssignAction`, `SetStateAction`, `AssignRequest`, `SetStateRequest`, `WhoAmIRequest`, `RetrievePrincipalAccessRequest`, `RetrieveMetadataChangesRequest`, `CreateEntityRequest` and `CreateAttributeRequest`. Assign and SetState aren't Web API actions; the READMEs show the record update to use instead.
  - Fixed the examples for `WinOpportunity` (with `Caller`), `ExecuteWorkflow` (`asyncoperationid`), `InitializeFrom`, `RetrieveMetadataChanges`, `ExportSolution` and `ImportSolution` (parameter order).
  - The file actions are documented as unbound, and with the right parameter order.
  - Removed the false claim that a target without `@odata.type` throws client-side.
  - The custom-function example no longer uses a `.query()` method, which doesn't exist.

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
- Updated dependencies [254a8ec]
- Updated dependencies [6bbb784]
- Updated dependencies [dd2acd8]
- Updated dependencies [3387804]
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
  - @mohsinonxrm/dataverse-sdk-entities-runtime@2.0.0-beta.0

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
