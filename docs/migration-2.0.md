# Migrating to 2.0

Every package moves from 1.0.x to 2.0.0 together. Most of 2.0 fixes code that didn't work against Dataverse in 1.0: files uploads, OrganizationService CRUD, generated functions, metadata creates and `$batch`. If your code worked around those bugs, the workaround may now get in the way. This page lists the changes you may have to act on, grouped by package. Each package's `CHANGELOG.md` has the full list.

## Install

- **Node 22 or later.** Node 18 and 20 are end of life, and CI tests on Node 22, 24 and 26.
- **New peer dependencies.** Install these next to the SDK packages that use them:

  | Package                                        | Install                                                                            |
  | ---------------------------------------------- | ---------------------------------------------------------------------------------- |
  | `@mohsinonxrm/dataverse-sdk-auth-msal-browser` | `@azure/msal-browser` (3.x, 4.x or 5.x)                                            |
  | `@mohsinonxrm/dataverse-sdk-auth-msal-node`    | `@azure/msal-node`                                                                 |
  | `@mohsinonxrm/dataverse-sdk-otel`              | `@opentelemetry/api`                                                               |
  | `@mohsinonxrm/dataverse-sdk-appinsights`       | `@azure/monitor-opentelemetry` and the OpenTelemetry packages listed in its README |

## One `EntityReference` (all packages)

In 1.0 the actions, functions, messages, entities-runtime and xrm packages each defined their own `EntityReference`, and the actions and messages ones were branded with their own `unique symbol`. A reference made by one package's `createEntityReference` didn't type-check where another package wanted one, so mixing actions and messages in one app needed a cast (#295).

- **`EntityReference`, `createEntityReference`, `getEntitySetNameFromReference`, `EntityReferenceOptions` and `WebApiEntityReference` now live in `@mohsinonxrm/dataverse-sdk-entities-runtime`.** The actions, functions, messages and xrm packages depend on it and re-export the same ones, so your imports keep working and a reference from any package is accepted everywhere: action and message parameters, function parameters, `formatEntityForWrite()` lookups and `OrganizationService.associate()`.
- **One signature:** `createEntityReference(logicalName, id, options?)`, with `options` `{ primaryIdAttribute?, entitySetName?, name? }`. The display name moved into the options: `createEntityReference("contact", id, "Jane")` (messages and entities-runtime in 1.0) is now `createEntityReference("contact", id, { name: "Jane" })`.
- **Always the Web API shape.** The reference's enumerable properties are `@odata.type` and the primary key from the SDK's `$metadata` snapshot (activities use `activityid`); `logicalName`, `id`, `entitySetName` and `name` are there but not enumerable. The entity set is filled in for every table the snapshot knows, so `associate()` and `formatEntityForWrite()` no longer look up `contact` or `account`; pass `entitySetName` for a custom table.
- **Only `createEntityReference` makes one.** A hand-written `{ logicalName, id }` no longer type-checks as an xrm `associate()` reference, a function parameter or an entities-runtime lookup. Replace it with `createEntityReference(logicalName, id)`. At run time, `isEntityReference()` and `formatEntityForWrite()` recognise a reference by its `@odata.type`, `logicalName` and `id`, so a plain `{ logicalName, id }` value is sent as it is instead of being bound.
- **xrm's `EntityReference`** is the same type; `@mohsinonxrm/dataverse-sdk-xrm` also exports `createEntityReference`.

## core

- **Nothing is logged by default.** Pass `logger: new ConsoleLogger()` to see request logs. URLs in logs and telemetry are redacted unless you set `logging: { fullUrls: true }` or your own `redactUrl`.
- **Retries.**
  - A 429 or 503 whose `Retry-After` is longer than `retry.maxRetryAfterMs` (default 30 s) is returned at once instead of being waited out. A 429 throws `DataverseThrottleError` with `retryAfterMs`. Set `maxRetryAfterMs: Infinity` for the old behaviour.
  - POST, and PATCH without `If-Match`, are no longer replayed after a 502, 503 or 504, because Dataverse may already have applied them. A 429 is still retried for every method.
  - A `$batch` answered with a 429 and a multipart body is handed back instead of replayed.
  - Idempotent requests (GET, HEAD, OPTIONS, PUT, DELETE, and PATCH with `If-Match`) are retried with backoff when `fetch` itself fails, such as on a dropped connection or a reset socket (#351). In 1.0 the error was thrown at once. POST and other PATCHes aren't retried after a network error. Set `retry: { retryNetworkErrors: false }` for the 1.0 behaviour.
- **`timeoutMs` is a deadline for the whole request**, including every retry wait and the wait for a concurrency slot. Use the new `attemptTimeoutMs` for a per-attempt limit. A caller's signal that times out (`AbortSignal.timeout()`) rejects the same way: `DataverseNetworkError` named `RequestTimeout`, not `DataverseAbortError`.
- **Errors.**
  - Every SDK error extends `DataverseError`.
  - Failed `fetch` calls throw `DataverseNetworkError` instead of `TypeError`.
  - Aborts throw `DataverseAbortError`, whose `name` is still `"AbortError"`.
  - `statusCode` is removed: read `status`.
  - With `.detectDuplicates()`, only error `0x80040333` is a `DataverseDuplicateError`. Any other 412, such as a stale `If-Match`, is a plain `DataverseODataError`.
  - `DataverseServiceError.fromResponse(response, body?)` takes `body` as `unknown`. It reads `code` and `message` only from an OData error body whose fields are strings, and a response body that isn't JSON is kept as the text (in 1.0 it threw).
  - `DataverseBatchError<TResult, TStep>` from core defaults both type parameters to `unknown` (was `any`). Import it from the batch package, or pass the types, to get typed `result` and `requestErrors`.
- **Removed options.** Passing any of these is now a type error.
  - `retry.delay`: use `baseDelayMs`.
  - `retry.useExponentialBackoff`: it had no effect, because backoff is always exponential.
  - `circuitBreaker` and `bulkhead`, with their `CircuitBreakerOptions` and `BulkheadOptions` types: they had no effect. 2.0 adds opt-in `CircuitBreakerMiddleware` and `BulkheadMiddleware` instead, added through the `middleware` option ([#343](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/343)). Their `CircuitBreakerOptions` and `BulkheadOptions` reuse those names, with new fields (no `enabled`).
  - The `MiddlewareRetryOptions` export: it was a second name for `RetryOptions`. Import `RetryOptions` instead; the options themselves are unchanged.
- **Auth.**
  - A token is fetched for every attempt, and a 401 triggers one token refresh and one retry.
  - The token is only attached to requests for the client's own origin.
  - Non-HTTPS base URLs are rejected, except `localhost`.
- **Default middleware order:** ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging. A request waiting to be retried no longer holds a concurrency slot. If you replace the pipeline with the `middleware` option, keep this order.
- **Query encoding.** Query options are encoded like `encodeURIComponent`: spaces become `%20`, not `+`. A query string you put in the path yourself is left as written.
- **`expand()`.** Calls add up instead of replacing each other, and `expand(nav, { select, filter, orderBy, top, expand })` takes options.
- **`skip()` is removed (#357).** Dataverse doesn't support `$skip`, so a request with it failed with 400. Page with `@odata.nextLink`: `iterate()` or `getAll()`, or `getPage()` and then `client.api(nextLink).getPage()`, with `.prefer().maxPageSize(n)` for the page size.

  <!-- no-check -->

  ```typescript
  // 1.0: a 400 from Dataverse
  const page = await client.api("accounts").top(50).skip(100).get();
  ```

  ```typescript
  // 2.0
  for await (const account of client.api("accounts").prefer().maxPageSize(50).done().iterate()) {
    console.log(account);
  }
  ```

- **`search()` is removed (#378).** Dataverse's Web API doesn't support `$search`, so a request with it failed. For full-text search use Dataverse search (the `searchquery` message); for a column match, `$filter` with `contains()`.
- **Paging takes request options (#378).** `getAll()` and `iterate()` accept `RequestOptions` and apply them to every page (`timeoutMs` and `attemptTimeoutMs` per page). `getAll({ maxItems: 0 })` returns `[]`. If you construct a `PageIterator` yourself, its third argument is now the request options (`{ signal }`), not the signal.
- **`TelemetryClient`: `trackDependency` is replaced by `startDependency` (#97).** The SDK now calls `startDependency(name, data)` before each request attempt, with what is known then (`target`, `method`, redacted `url`, `properties`), and calls `end(data)` on the handle it returns once the attempt is done, with the whole record (`durationMs`, `success`, `resultCode`, and `error.type` when it threw). The handle may also carry `headers` (W3C `traceparent` / `tracestate`, which the SDK sends to Dataverse) and `run(fn)` (run the attempt with the dependency as the active span). If you implement `TelemetryClient` yourself, move the body of `trackDependency` into `end`:

  <!-- no-check -->

  ```typescript
  // 1.0
  const telemetry: TelemetryClient = {
    trackDependency(name, data) {
      record(name, data);
    },
    // trackEvent, trackException unchanged
  };
  ```

  ```typescript
  // 2.0
  const telemetry: TelemetryClient = {
    startDependency(name) {
      return { end: (data) => record(name, data) };
    },
    // trackEvent, trackException unchanged
  };
  ```

  `trackEvent` now also receives the SDK's own events (`TelemetryEvents`: `dataverse.throttle`, `dataverse.retry`, `dataverse.concurrency.wait`, `dataverse.concurrency.limit`, and `dataverse.batch` from the batch package); filter by name if you only want your own. A request with `{ type: "telemetry", disable: true }` sends none of them.

- **`traceparent` is sent when the telemetry client provides it (#97).** With the otel or appinsights (Node.js) adapter and a registered propagator, each request carries the `traceparent` of its dependency span, only to origins that may receive the token. `diagnosticHeaders: { traceContext: false }` turns it off. In a browser, the Dataverse origin's CORS preflight must allow it.
- **Telemetry treats 3xx as success (#378).** A `304 Not Modified` is a successful dependency in the otel and appinsights adapters; in 1.0 it was a failure.
- **Concurrency settings are honoured (#356).** `concurrency.maxConcurrentRequests` is used exactly; in 1.0 it was clamped to 2..16, so `1` sent two requests at once. When you set it, `max` defaults to it, so the `x-ms-dop-hint` header can lower your limit but no longer raise it: add `max` (for example `{ maxConcurrentRequests: 4, max: 16 }`) to let it rise. Settings that aren't whole numbers of at least 1, or don't fit `min <= maxConcurrentRequests <= max`, throw `DataverseInvalidRequestError` when the client is created. The per-request `{ type: "concurrency", maxConcurrent }` option is removed: it never had an effect.
- **`associate()`, `disassociate()` and `bindMany()` keep the builder's impersonation and headers (#355).** In 1.0, `client.api(…).impersonate(userId).associate(…)` ran as the calling identity. If you worked around that by sending the `$ref` request yourself, you can go back to `associate()`. A custom `BindManyExecutor` now gets a sixth argument with those headers and the request options; send them with your requests.

## auth-msal-browser and auth-msal-node

- A configured `account` object no longer overrides MSAL's active account (browser). Pass `account: () => x` to pin one account.
- **Configured `claims` don't bypass the token cache any more (#382).** In 1.0 they were sent on every silent and client-credentials call, and MSAL fetches a new token whenever a request has claims, so every Dataverse request went to Entra ID. They are now sent on sign-in or interaction, on the first token for a scope set, tenant and account, and on a forced refresh. The claims of a 401 challenge are always sent.
- **`tenantId` is validated and keeps your cloud (#382).** A malformed `tenantId` throws `InvalidTenantId`. The authority for another tenant uses your configured authority's host (GCC High, China), not `login.microsoftonline.com`. msal-node honours `TokenOptions.tenantId` in every flow, so a guest-tenant request gets that tenant's token.
- **msal-node errors are `MsalNodeAuthenticationError`** (still a `DataverseAuthenticationError`), with MSAL's `errorCode`, `subError`, `correlationId` and `errorNo`, as in the browser package.
- **Browser:** a silent token request that times out in the hidden iframe (`monitor_window_timeout`, usual when third-party cookies are blocked) now falls back to the popup or redirect instead of throwing.

## batch

- **`execute({ continueOnError: true })` no longer throws** when a request fails. It returns the result, with `success: false` and the failures in `errors`. Without `continueOnError`, `DataverseBatchError` now carries `result`.
- **Large batches are split** automatically to stay within Dataverse's limit.
- **`execute()` can be cancelled (#379).** It takes `signal`, `timeoutMs` (for the whole execution, every `$batch` of a split included), `attemptTimeoutMs` and `correlationId`. An abort after the first `$batch` ran rejects with a `DataverseBatchError` whose `cause` is the abort and whose `result` holds what ran.
- **`addRequest()` checks its input (#379).** It throws `DataverseInvalidRequestError` for a GET inside a changeset (Dataverse refuses it), a line break in a header value or URL, an invalid header name or method, and a `$<contentId>` URL outside a changeset or naming no earlier request in it. A path that starts with `$` but isn't a reference, such as `$metadata`, must be written `/$metadata`.
- **Bodies are `unknown`, not `any`.** `BatchResponseStep.body` and `BatchResponsePart.body` are `unknown`, so `result.responses.get("who")?.body.UserId` no longer compiles. Name the type of a response you know with the new generic, `result.responses.get("who") as BatchResponseStep<WhoAmIResponse> | undefined`, or check the value first. The request body of `addRequest()` and `BatchRequestStep` is `unknown` too; every value is still accepted.

## files

- `new FileColumnClient(client)` takes a `DataverseClient`. The constructor that takes an adapter has no invalid default base URL any more.
- `upload()` accepts a `Blob`, `ArrayBuffer`, typed array or `Buffer`, and doesn't need `Buffer` in browsers.
- `download()` returns a `Blob`.
- `delete()` sends `DELETE`.
- Every failed step rejects with a typed error.
- **File names go in the query string (#362).** The `single` and `patch-chunked` uploads send the name as the `?x-ms-file-name=` query parameter instead of the `x-ms-file-name` header, which can't carry names outside ASCII (`合同.pdf` made `fetch` throw). A proxy or custom fetch provider that reads the header should read the query parameter instead.

## otel

- `serviceName` is removed from `OpenTelemetryConfig`: it was ignored. `service.name` is a resource attribute, so set it on your OpenTelemetry SDK (`new NodeSDK({ serviceName })` or `OTEL_SERVICE_NAME`).
- **Span attributes and URLs (#384, otel and appinsights).** `server.address` is the host name without the port (`server.port` carries it). `url.full` is the URL as core redacted it with your `redactUrl`; the adapters no longer redact it again, so a custom `redactUrl` (one that keeps `$top`, say) now shows in telemetry. A status of 400 or more is a failure; a 304 isn't.
- **Dependency spans are live (#97, otel and appinsights).** `trackDependency` is replaced by `startDependency` (see core). The CLIENT span starts before the attempt and is the active span while it runs, so `fetch` auto-instrumentation spans are its children rather than its siblings, and its `traceparent` goes to Dataverse. Each retry and each resend after a 401 is a span of its own under your span, with `http.request.resend_count` on retries. If you called `trackDependency` yourself, call `startDependency(name, data).end(data)`.
- **appinsights** warns when a second client asks for a different `connectionString`: Azure Monitor is started once per process, with the first one.
- **appinsights in browsers (#158):** import `ApplicationInsightsBrowserTelemetryClient` from `@mohsinonxrm/dataverse-sdk-appinsights/browser` and pass your `ApplicationInsights` instance (`@microsoft/applicationinsights-web`, an optional peer dependency). The main entry point is still Node.js only.

## metadata

- **Enums are string member names**, for example `OwnershipTypes.UserOwned === "UserOwned"`, because the Web API rejects numbers in metadata bodies. Replace numeric comparisons such as `OwnershipType === 1` with the enum member.
- **New create types.** `*AttributeMetadataCreate` types, discriminated on `@odata.type`, model what a create needs.
- **Accurate create and option-value types (#324).** Create types no longer require or accept properties Dataverse sets, such as a date column's `MinSupportedValue` or `AttributeType`: remove them from your payloads. A choice column takes `OptionSet` (with `IsGlobal: false`) or `"GlobalOptionSet@odata.bind"`, exactly one. The option-value parameters take `OptionSetName` or `EntityLogicalName` and `AttributeLogicalName`, exactly one, `UpdateOptionValueParams` requires `MergeLabels`, and `InsertStatusValueParams` takes no `OptionSetName`. The parameter types are now type aliases, not interfaces, so `extends` them with `&` instead.
- **Ids come from the response header.** `create*` methods return the new `MetadataId` from `OData-EntityId`, and creates and updates take `{ solutionUniqueName }`.
- **The types follow the 2.0 `$metadata` snapshot** (#295), like the actions, functions and messages packages. The response types of the operations the snapshot doesn't have are removed, for example `QuerySalesforceUnstructuredDataResponse`, `QueryZendeskUnstructuredArticlesResponse` and the Field Service `msdyn_…Response` types, and the types of the operations 2.0 adds are new. Interface members are in name order.
- **Escaping and validation.** Key values are escaped, and invalid `MetadataId` keys or `DeletedMetadataFilters` values throw `DataverseInvalidRequestError`.
- **Table creates require what Dataverse requires (#385).** `EntityMetadataCreate` requires `SchemaName`, `DisplayName`, `DisplayCollectionName`, `OwnershipType`, `IsActivity`, `HasActivities`, `HasNotes` and `Attributes`, with the primary name text column (`IsPrimaryName: true`) first; other columns can't set `IsPrimaryName: true`. Create a lookup column with `createOneToManyRelationship()` (its `Lookup`), not `createAttributeDefinition()`.
- **Only metadata types are exported (#385).** 1.0's barrel also re-exported about 1,400 Web API message types; import those (such as `WhoAmIResponse`) from the actions, functions or messages packages. The package no longer depends on `@mohsinonxrm/dataverse-sdk-messages`.
- **Updates take the whole definition (#359).** A metadata update is a PUT that replaces the definition, so `updateAttributeDefinition`, `updateGlobalOptionSet` and the entity and relationship updates take a full definition with `@odata.type` required; a partial body no longer compiles. To change a few properties, use the merge helpers, which read the current definition (with `Consistency: Strong`), merge your changes and PUT the result: `mergeAndUpdateEntityDefinition`, `mergeAndUpdateAttributeDefinition`, `mergeAndUpdateRelationship` and `mergeAndUpdateGlobalOptionSet`. The type of `mergeAndUpdateEntityDefinition`'s changes is `EntityMetadataChanges` (was `EntityMetadataUpdate`).

  <!-- no-check -->

  ```typescript
  // 1.0: compiled, then reset the column's other properties (or failed)
  await md.updateAttributeDefinition("new_project", "new_note", { DisplayName });
  ```

  <!-- no-check -->

  ```typescript
  // 2.0: only the changes
  await md.mergeAndUpdateAttributeDefinition("new_project", "new_note", {
    "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
    DisplayName,
  });
  ```

## xrm

- `create()`, `retrieve()`, `retrieveMultiple()` and `update()` now work: in 1.0 they threw `TypeError`.
- `assign()`, `setState()` and the `EntityReference`s of `associate()` take logical names. The entity set is read from metadata instead of being guessed as a plural. `associate()` takes references from `createEntityReference`, which carry the entity set of the tables in the SDK's `$metadata` snapshot (see [One `EntityReference`](#one-entityreference-all-packages)).
- Record ids must be GUIDs. A malformed id throws `DataverseInvalidRequestError` before any request is sent.
- **`retrieveMultiple({ skip })` is replaced by `maxPageSize` (#357).** Dataverse doesn't support `$skip`. `{ maxPageSize: 50 }` sends `Prefer: odata.maxpagesize=50`; read the next page from the result's `@odata.nextLink` with `client.api(nextLink).get()`.
- **No made-up records (#381).** `create()` and `update()` with `returnRepresentation` reject with `DataverseInvalidRequestError` when Dataverse sends no record back; in 1.0 they resolved `{}`. The entity-set lookup and `execute()` with something that isn't an `Executable` throw `DataverseInvalidRequestError` instead of a plain `Error`.
- **Typed results.** `execute(request)` returns the request's response type (`await service.execute(new WhoAmIFunction())` is a `WhoAmIResponse`), and takes only an `Executable<T>`; drop type arguments it can now infer. `retrieve()`, `retrieveMultiple()`, and `create()`/`update()` with `returnRepresentation` return an `EntityRecord` instead of `any` when you pass no type, so a column is `unknown` until you narrow it: pass your record type (`service.retrieve<Account>(…)`) where you read columns. `update()` without `returnRepresentation` returns `Promise<void>`.

## discovery

- `OrganizationDetail` matches the Global Discovery Service v2.0 response: flat `Url` and `ApiUrl`, and an integer `State`. `Endpoints`, `Geo` and `OrganizationEndpoints` are removed.
- **`select` narrows the result (#381).** `listOrganizations({ select: ["FriendlyName", "Url"] })` returns `Pick<OrganizationDetail, "FriendlyName" | "Url">[]`, and `select` accepts only `OrganizationDetail` names. Read only the properties you selected. With a `DiscoveryOptions` variable the rows are `Partial<OrganizationDetail>`. `toEnvironment()` throws `DataverseInvalidRequestError` for a row without `Url` or `ApiUrl`.

## actions, functions, messages

These packages are generated by `tools/generate-sdk-types`.

- **Bound operations check the record id (#386).** The id goes into the URL as a GUID literal: braces are stripped (`"{…}"` from Xrm works), and a value that isn't a GUID throws `DataverseInvalidRequestError` before the request is sent.
- **Constructors take one object with the parameters, by name (#96).** In 1.0 every parameter was a positional argument in `$metadata` order, so it was easy to swap two of the same type (`RetrieveEntityFunction` takes `LogicalName` before `MetadataId`) and `ImportSolutionAction` took 17 arguments, all typed as required. Now each operation with parameters has a `<Class>Parameters` interface (`ImportSolutionActionParameters`, `RetrieveEntityFunctionParameters`, `MergeRequestParameters`), keyed by the `$metadata` parameter names. A parameter `$metadata` marks `Nullable="false"` is required, any other is optional, and one that is left out or `undefined` isn't sent. The record id or entity set of a bound operation is still the first argument, before the object. An operation without parameters still takes no arguments (`new WhoAmIFunction()`), and one with only optional parameters can be called without arguments.

  <!-- no-check -->

  ```typescript
  // 1.0
  new ImportSolutionAction(true, false, customizationFile, importJobId);
  new RetrieveEntityFunction(EntityFilters.Entity, "account", EMPTY_GUID, false);
  new ExecuteWorkflowAction(workflowId, recordId, {});
  new CreateMultipleAction("accounts", targets);
  new MergeRequest(target, subordinate, undefined, false);
  ```

  ```typescript
  // 2.0
  import {
    CreateMultipleAction,
    ExecuteWorkflowAction,
    ImportSolutionAction,
  } from "@mohsinonxrm/dataverse-sdk-actions";
  import { EntityFilters, RetrieveEntityFunction } from "@mohsinonxrm/dataverse-sdk-functions";
  import { MergeRequest } from "@mohsinonxrm/dataverse-sdk-messages";

  new ImportSolutionAction({
    CustomizationFile: customizationFile, // the solution .zip, base64-encoded
    ImportJobId: importJobId,
    OverwriteUnmanagedCustomizations: true,
    PublishWorkflows: false,
  });
  new RetrieveEntityFunction({
    EntityFilters: EntityFilters.Entity,
    LogicalName: "account",
    MetadataId: "00000000-0000-0000-0000-000000000000", // required; empty when LogicalName is set
    RetrieveAsIfPublished: false,
  });
  new ExecuteWorkflowAction(workflowId, { EntityId: recordId });
  new CreateMultipleAction("accounts", { Targets: targets });
  new MergeRequest({ Target: target, Subordinate: subordinate, PerformParentingChecks: false });
  ```

  - The parameters are in `action.parameters` (`function.parameters`), not in one property each (`action.targets` is now `action.parameters.Targets`). A message keeps them in `request.Parameters`, as the .NET `OrganizationRequest` does, instead of one public property each.
  - A `MessageName` parameter (`GenerateAutomatedPluginRequest`) is an ordinary property of the parameters object. It used to clash with `OrganizationRequest.messageName`, so it was always required, even where `$metadata` makes it optional.

- **Bulk operations take the entity set first.** `CreateMultiple`, `UpdateMultiple`, `UpsertMultiple` and `DeleteMultiple` now take it as their first argument, for example `new CreateMultipleAction("accounts", { Targets: targets })`.
- **Collection-bound and bound operations call their bound URL.**
- **Entity references** from `createEntityReference(logicalName, id, options?)` have the Web API shape (`{ "@odata.type", <primary key> }`). The third argument is now an options object. The three packages share one `EntityReference`; see [One `EntityReference`](#one-entityreference-all-packages).
- **Function parameters** are sent as OData literals: strings are quoted with `'` doubled, enums are `Microsoft.Dynamics.CRM.<Enum>'<value>'`, and GUIDs and dates are bare. Nullable parameters are optional.
- **Return values (#300).** `client.execute()` resolves the value the operation returns, never the OData envelope around it, and `<Name>Response` is exactly that value's type. A message's `result` is the same value as the action's, typed `<Name>Result`. dataverse-gen generates the same values (see the generator section).

  | Return type in `$metadata`                       | Web API response                                          | 2.0 value                                                 | 1.0 value                                                |
  | ------------------------------------------------ | --------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------- |
  | none                                             | `204 No Content`                                          | `undefined` (`void`)                                      | `{}`                                                     |
  | primitive or enum (`Edm.Boolean`, …)             | `{ "@odata.context", "value": true }`                     | `true`; an enum is its member name                        | `{ value: true }` (message: `true`)                      |
  | collection (`Collection(mscrm.role)`, …)         | `{ "@odata.context", "value": [ … ] }`, or 204 when unset | the array, each record with `@odata.etag`; `[]` for a 204 | `{ value: [ … ] }` (message: the array)                  |
  | complex type (`mscrm.WhoAmIResponse`)            | the properties, with `@odata.context`                     | the body, with `@odata.context`                           | the body (message: without `@odata.*`)                   |
  | entity (`mscrm.asyncoperation`, `crmbaseentity`) | the record, with `@odata.etag`, or 204 when unset         | the record, with its annotations; `null` for a 204        | the record, `{}` for a 204 (message: without `@odata.*`) |

  <!-- no-check -->

  ```typescript
  // 1.0
  const { value: roles } = await client.execute(
    new RetrieveAadUserRolesFunction({ DirectoryObjectId: id })
  );
  const job = await client.execute(new ExecuteWorkflowAction(workflowId, { EntityId: recordId }));
  console.log(job.asyncoperationid);
  const { value: emails } = await client.execute(
    new InstantiateTemplateAction({ TemplateId, ObjectType, ObjectId })
  ); // typed EntityReference[]
  ```

  ```typescript
  // 2.0
  import {
    ExecuteWorkflowAction,
    InstantiateTemplateAction,
  } from "@mohsinonxrm/dataverse-sdk-actions";
  import { RetrieveAadUserRolesFunction } from "@mohsinonxrm/dataverse-sdk-functions";

  const roles = await client.execute(new RetrieveAadUserRolesFunction({ DirectoryObjectId: id })); // role records
  const job = await client.execute(new ExecuteWorkflowAction(workflowId, { EntityId: recordId }));
  console.log(job?.asyncoperationid); // job is null if the Web API answered 204
  const emails = await client.execute(
    new InstantiateTemplateAction({
      TemplateId: templateId,
      ObjectType: "account",
      ObjectId: accountId,
    })
  ); // email records
  console.log(roles.length, emails.length);
  ```

  - An operation without a return type resolves `undefined`, and its `<Name>Response` is `void`.
  - A single entity return is `<Entity> | null`: Dataverse answers `204 No Content` for an entity output that wasn't set, although `$metadata` says `Nullable="false"`. Check for `null` (`job?.asyncoperationid`).
  - `Collection(mscrm.crmbaseentity)` returns are records (`{ "@odata.etag"?, "@odata.type"?, [column]: unknown }[]`), not `EntityReference[]`.
  - Message results keep the annotations (`@odata.context`, `@odata.etag`, `@odata.type`), as the action's value and `retrieve()` do; in 1.0 a message dropped them. `@odata.type` says which table a `crmbaseentity` record is. The generic `OrganizationRequest` still drops them from `Results`.
  - `<Name>Response.fromResponse(data)` takes the parsed body, or `undefined` for a 204.
  - The internal `responseData` helpers of the messages package are gone.

- **Query functions are `$filter` helpers, not classes (#342).** `$metadata` declares the Web API's query functions (`LastXDays`, `InFiscalYear`, `Between`, `In`, `Under`, `EqualUserId`, …) as functions, so 1.0 had a class for each (70 of them: `LastXDaysFunction`, `AboveFunction`, `TodayFunction`, …). Dataverse runs them only inside `$filter`: `client.execute(new LastXDaysFunction(...))` sent `GET /LastXDays(...)` and got a 404, so no 1.0 code can have used them that way. The classes, their `<Name>FunctionParameters` and their `<Name>Response` types are gone (the counts below don't include them). `queryFunctions` from `@mohsinonxrm/dataverse-sdk-functions` has a helper per query function instead, named in camelCase (`In` → `queryFunctions.in`), with the same parameters, that returns the `$filter` expression. Values are written by core's `odataLiteral`, so a hand-written filter string with a quote in it is safe to replace.

  <!-- no-check -->

  ```typescript
  // 1.0: answered 404
  await client.execute(new LastXDaysFunction("createdon", 7));

  // 1.0: the working form, written by hand
  await client
    .api("accounts")
    .filter(
      "Microsoft.Dynamics.CRM.LastXDays(PropertyName='createdon',PropertyValue=7) and " +
        "Microsoft.Dynamics.CRM.EqualUserId(PropertyName='ownerid')"
    )
    .get();
  ```

  ```typescript
  // 2.0
  import { odata } from "@mohsinonxrm/dataverse-sdk-core";
  import { queryFunctions } from "@mohsinonxrm/dataverse-sdk-functions";

  await client
    .api("accounts")
    .filter(
      odata.and(
        queryFunctions.lastXDays({ PropertyName: "createdon", PropertyValue: 7 }),
        queryFunctions.equalUserId({ PropertyName: "ownerid" })
      )
    )
    .get();
  ```

  Dataverse refuses `not` around a query function (`odata.not(queryFunctions.in(...))`): use the negative one, such as `notIn`, `notBetween`, `notUnder` or `notEqualUserId`. The [functions README](../packages/dataverse-sdk-functions/README.md#query-functions-in-filter) lists every helper.

- **Removed:** `toRequestBody()`, which nothing called.
- **One class per binding.** An operation that `$metadata` declares with several bindings has a class per binding, `<Name>_<table>` (`_collection` for a collection binding), for example `RetrievePrincipalAccess_teamFunction`. An unbound overload keeps the plain name. A name with only bound overloads has no plain-name class any more: in 1.0 it was whichever binding was generated last, so it could call only that one. Pick the binding you call. The "1.0 request" column is the class that sends the same request as the 1.0 name.

  | Package   | Removed                                                                                            | Use                                                                                                                                                                          | 1.0 request                                                                 |
  | --------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
  | actions   | `AddItemCampaignAction`, `AddItemCampaignResponse`                                                 | `AddItemCampaign_campaignAction`, `AddItemCampaign_listAction`, `AddItemCampaign_productAction`, `AddItemCampaign_salesliteratureAction` (and their `…Response` types)       | `AddItemCampaign_salesliteratureAction`                                     |
  | messages  | `AddItemCampaignRequest`, `AddItemCampaignResponse`                                                | `AddItemCampaign_campaignRequest`, `AddItemCampaign_listRequest`, `AddItemCampaign_productRequest`, `AddItemCampaign_salesliteratureRequest` (and their `…Response` classes) | `AddItemCampaign_salesliteratureRequest`                                    |
  | functions | `GetQuantityDecimalFunction`, `GetQuantityDecimalResponse`                                         | `GetQuantityDecimal_invoiceFunction`, `_opportunityFunction`, `_quoteFunction`, `_salesorderFunction`                                                                        | `GetQuantityDecimal_salesorderFunction`                                     |
  | functions | `RetrieveAbsoluteAndSiteCollectionUrlFunction`, `RetrieveAbsoluteAndSiteCollectionUrlResponse`     | `RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationFunction`, `_sharepointsiteFunction`                                                                         | `RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationFunction`   |
  | functions | `RetrievePrincipalAccessFunction`, `RetrievePrincipalAccessResponse`                               | `RetrievePrincipalAccess_systemuserFunction`, `_teamFunction`, `_organizationFunction`                                                                                       | `RetrievePrincipalAccess_organizationFunction`                              |
  | functions | `RetrievePrincipalAccessInfoFunction`, `RetrievePrincipalAccessInfoResponse`                       | `RetrievePrincipalAccessInfo_systemuserFunction`, `_teamFunction`                                                                                                            | `RetrievePrincipalAccessInfo_teamFunction`                                  |
  | functions | `RetrievePrincipalAttributePrivilegesFunction`, `RetrievePrincipalAttributePrivilegesResponse`     | `RetrievePrincipalAttributePrivileges_systemuserFunction`, `_teamFunction`                                                                                                   | `RetrievePrincipalAttributePrivileges_teamFunction`                         |
  | functions | `RetrievePrincipalSyncAttributeMappingsFunction`, `RetrievePrincipalSyncAttributeMappingsResponse` | `RetrievePrincipalSyncAttributeMappings_systemuserFunction`, `_teamFunction`                                                                                                 | `RetrievePrincipalSyncAttributeMappings_teamFunction`                       |
  | functions | `RetrieveProductPropertiesFunction`, `RetrieveProductPropertiesResponse`                           | `RetrieveProductProperties_invoicedetailFunction`, `_opportunityproductFunction`, `_quotedetailFunction`, `_salesorderdetailFunction`                                        | `RetrieveProductProperties_invoicedetailFunction`                           |
  | functions | `RetrieveUnpublishedFunction`, `RetrieveUnpublishedResponse`                                       | `RetrieveUnpublished_<table>Function`, one per table it's bound to, for example `RetrieveUnpublished_savedqueryFunction`, `RetrieveUnpublished_systemformFunction`           | `RetrieveUnpublished_aipluginoperationparameterFunction`                    |
  | functions | `RetrieveUnpublishedMultipleFunction`, `RetrieveUnpublishedMultipleResponse`                       | `RetrieveUnpublishedMultiple_<table>_collectionFunction`, for example `RetrieveUnpublishedMultiple_savedquery_collectionFunction`                                            | `RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionFunction` |

  Each `…Response` type is renamed the same way, for example `RetrievePrincipalAccess_teamResponse`.

- **Platform, Sales and Customer Service only (#293, #304).** The packages are generated from a committed `$metadata` snapshot (`tools/generate-sdk-types/metadata/`), and hold only the operations of the platform (Dataverse and the Power Platform solutions every environment has) and of Sales and Customer Service. They are chosen by the solution each operation comes from, not by what the snapshot org has installed; the [solution table](../tools/generate-sdk-types/metadata/README.md#which-operations-are-prebuilt) lists every solution and whether its operations are in. 1.0 held every operation of the org it came from, Field Service included. 2.0 leaves out the operations of Contact Center (Omnichannel, unified routing, voice: `CCaaS_*`), Field Service, Project Operations, Universal Resource Scheduling, Customer Insights - Journeys (`msdynmkt_*`), Customer Voice, Connected Customer Service (IoT), Power Pages and Process Mining. Compared with 1.0, 433 actions (and their messages) and 12 functions are gone, besides the overloads above. To call one, generate it from your org with dataverse-gen ([Generate the rest with dataverse-gen](./getting-started.md#generate-the-rest-with-dataverse-gen)), or send the request yourself (`client.api("/msdyn_CreateWorkOrder").post(body)`).

  Classes each package exports (one per operation and binding; `messages` counts the generated `…Request` classes, not `OrganizationRequest`):

  | Package   | 1.0   | 2.0 snapshot, every operation | 2.0 (platform, Sales, Customer Service) |
  | --------- | ----- | ----------------------------- | --------------------------------------- |
  | actions   | 1,356 | 1,556                         | 1,072                                   |
  | functions | 229   | 229                           | 209                                     |
  | messages  | 1,356 | 1,556                         | 1,072                                   |

  The snapshot org has 1,798 operations (1,294 platform, Sales and Customer Service, 504 of other apps). The 504 are left to dataverse-gen: 484 actions (with their messages) and 20 functions. Of the 433 actions and 12 functions below that 1.0 had and 2.0 hasn't, 358 actions and 9 functions are such operations of other apps; the other 75 actions and 3 functions aren't in the snapshot org at all (mostly Field Service, which it doesn't have). The rest of the 504 are newer than 1.0, so no 1.0 code uses them.

  <details><summary>Removed functions (12)</summary>

  `CCaaS_GetAgentsForConsultAndTransferFunction`, `CCaaS_GetAgentsFunction`, `CCaaS_GetClientLWIContextFunction`, `CCaaS_GetPresenceFunction`, `CCaaS_GuidedAgentGroupTransferConsultFunction`, `msdyn_SelectNotToExceedFunction`, `msdyn_TradeCoverageNotificationFunction`, `msdyn_getchannelendpointurlFunction`, `msdyn_getinboundurlFunction`, `msdyn_getnotificationurlFunction`, `msdynmkt_retrievegdprconfigurationFunction`, `pbi_GetEnvironmentWorkspaceAccessForUserFunction`

  </details>

  <details><summary>Removed actions (433), with their <code>…Request</code> messages</summary>

  `AnalyzeAction`, `CCaaS_AcceptConversationAction`, `CCaaS_AddChannelToConversationAction`, `CCaaS_AgentEndConversationAction`, `CCaaS_AssignConversationAction`, `CCaaS_BroadcastMessageAction`, `CCaaS_BulkForceCloseAction`, `CCaaS_BulkQueueAssignmentAction`, `CCaaS_CancelConsultAction`, `CCaaS_CloseConsultAction`, `CCaaS_CloseConversationAction`, `CCaaS_ConversationTimeoutAction`, `CCaaS_CreateConnectionAction`, `CCaaS_EndSecondaryChannelAction`, `CCaaS_EndSessionAction`, `CCaaS_ForceCloseConversationAction`, `CCaaS_GetAvailabilityForConversationAction`, `CCaaS_GetAvailabilityForSimulatedConversationAction`, `CCaaS_GetRepresentativeAvailabilityBeforeConversationAction`, `CCaaS_GetRepresentativeAvailabilityForConversationAction`, `CCaaS_InitiateAgentConsultAction`, `CCaaS_InitiateAgentConsultExternalAction`, `CCaaS_InitiateAgentGroupAssignmentAction`, `CCaaS_InitiateAgentGroupConsultAction`, `CCaaS_InitiateAgentGroupTransferAction`, `CCaaS_InitiateAgentTransferAction`, `CCaaS_InitiateAgentTransferBySupervisorAction`, `CCaaS_InitiateAgentTransferExternalAction`, `CCaaS_InitiateQueueAssignmentAction`, `CCaaS_InitiateQueueConsultAction`, `CCaaS_InitiateQueueTransferAction`, `CCaaS_JoinConversationAction`, `CCaaS_LeavePublicConsultAction`, `CCaaS_MaskMessageAction`, `CCaaS_ModifyAgentPresenceAction`, `CCaaS_MonitorConversationAction`, `CCaaS_NotifyAgentAction`, `CCaaS_PickConversationAction`, `CCaaS_RaiseSecondaryChannelEventAction`, `CCaaS_RejectConversationAction`, `CCaaS_RejoinConversationAction`, `CCaaS_ResetAgentPresenceAction`, `CCaaS_SendAHTEventsAction`, `CCaaS_SendAgentTypingIndicatorAction`, `CCaaS_SendHeartbeatAction`, `CCaaS_SetPresenceAction`, `CCaaS_StartSecondaryChannelAction`, `CCaaS_UserLogoutAction`, `IngestAction`, `IsPmEnabledAction`, `QuerySalesforceUnstructuredDataAction`, `QueryZendeskUnstructuredArticlesAction`, `SearchWebAction`, `ShareAction`, `adx_AzureBlobStorageEnabledAction`, `adx_AzureBlobStorageUrlAction`, `adx_GenerateSharedAccessSignatureAction`, `adx_SendEmailConfirmationToContactAction`, `adx_SendEmailTwoFactorCodeToContactAction`, `adx_SendPasswordResetToContactAction`, `cv_UpdateInviteAction`, `msdn_evaluationplanorchestratorAction`, `msdyn_AcquireTokenAction`, `msdyn_AcsForceSyncActionAction`, `msdyn_ActivateRoutingRuleAction`, `msdyn_ActivateWorkflowAction`, `msdyn_AddBotUserAction`, `msdyn_AgentscriptDataMigrationCustomActionAction`, `msdyn_AnalyzeServiceHealthAction`, `msdyn_AnalyzeServiceHealthAsyncAction`, `msdyn_ApplyRoutingRuleEntityRecordAction`, `msdyn_AsExchangeEventAction`, `msdyn_AutoCloseExpiredConversationsAction`, `msdyn_BookRequirementGroupAction`, `msdyn_BookingResourceAction`, `msdyn_BookingResourceRequirementAction`, `msdyn_BusinessClosureDeleteAction`, `msdyn_BusinessClosureRetrieveAction`, `msdyn_BusinessClosureSaveAction`, `msdyn_CECLiveDataMigrationCustomActionAction`, `msdyn_CalculateAndUpdateBookingTravelAction`, `msdyn_CalendarBulkDeleteAction`, `msdyn_CancelBookingsAction`, `msdyn_CapacityProfilesToUsersAction`, `msdyn_CascadeBookingChangesAction`, `msdyn_CascadeCrewBookingsAction`, `msdyn_CascadeCrewMembershipsAction`, `msdyn_CheckAlertFieldsAction`, `msdyn_CheckBookingCustomControlUsageAction`, `msdyn_CheckCharacteristicHasMatchingResourceAction`, `msdyn_CheckCompatibilityBetweenFSAndPSASolutionAction`, `msdyn_CheckDefaultValueForLineStatusAction`, `msdyn_CheckFieldServiceDBVersionAction`, `msdyn_CheckForActiveAgreementsHavingPastEndDatesAction`, `msdyn_CheckForActiveLayersOnProcessesAction`, `msdyn_CheckForDeletedBSMRecordsAction`, `msdyn_CheckForFailingDeleteUniqueNumberWorkflowAction`, `msdyn_CheckForFailingWorkflowRelatedToAgreementAction`, `msdyn_CheckForFieldServiceSettingRecordAction`, `msdyn_CheckForRemovedFormLibrariesAction`, `msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersAction`, `msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersAction`, `msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsAction`, `msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsAction`, `msdyn_CheckForSolutionVersionAction`, `msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementAction`, `msdyn_CheckForWorkOrderTypesAction`, `msdyn_CheckGeolocationEnabledAction`, `msdyn_CheckIfAutoNumberingIsOptedAction`, `msdyn_CheckIfExecutionContextIsPassedAction`, `msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountAction`, `msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSAction`, `msdyn_CheckIfRequiredLevelOfFieldIsChangedAction`, `msdyn_CheckIfTerritoryRecordsExistAction`, `msdyn_CheckIfWorkOrderGeneratedFromABSAction`, `msdyn_CheckIoTDeviceCategoryOfDeviceAction`, `msdyn_CheckIoTSettingsAndAlertParentingConfigAction`, `msdyn_CheckMobileUserSecurityRoleAction`, `msdyn_CheckMultiplePrimaryIncidentForWorkOrderAction`, `msdyn_CheckServiceEndPointAction`, `msdyn_CheckVolumeOfAlertsAction`, `msdyn_CleanupDiagnosticsWrappersAction`, `msdyn_CloneMultipleAction`, `msdyn_ConversationConductorEnablerAction`, `msdyn_ConvertDateTimeOnCalendarTimeZoneAction`, `msdyn_CopyEventAppleChannelsCleanupAction`, `msdyn_CopyEventBotRegistrationsCleanupAction`, `msdyn_CopyEventCustomChannelsCleanupAction`, `msdyn_CopyEventFacebookChannelsCleanupAction`, `msdyn_CopyEventGoogleChannelsCleanupAction`, `msdyn_CopyEventLineChannelsCleanupAction`, `msdyn_CopyEventSMSChannelsCleanupAction`, `msdyn_CopyEventTwitterChannelsCleanupAction`, `msdyn_CopyEventWechatChannelCleanupAction`, `msdyn_CopyEventWhatsAppChannelCleanupAction`, `msdyn_CreateBSMRecordAction`, `msdyn_CreateEvaluationRecordsForPlanAction`, `msdyn_CreatePublishAIConfigAction`, `msdyn_CreatePublishAIModelAction`, `msdyn_CreateRequirementGroupBookingsAction`, `msdyn_CreateRequirementModelAction`, `msdyn_CreateResourceOptimizationRequestAction`, `msdyn_CreateTechniciansAction`, `msdyn_CreateTrainConfigAction`, `msdyn_CreateTrainEffortModelConfigAction`, `msdyn_CreateWorkOrderAction`, `msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleAction`, `msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleAction`, `msdyn_D365ChannelsInboundAction`, `msdyn_D365ChannelsNotificationAction`, `msdyn_DecommissionFieldServiceSolutionHealthRulesAction`, `msdyn_DeprovisionUnifiedRoutingAction`, `msdyn_DisableBotUserAction`, `msdyn_EffortModelPredictionAction`, `msdyn_EnableUnifiedRoutingAction`, `msdyn_EvaluateConversationAction`, `msdyn_EvaluateMasterEntityRoutingConfigurationAction`, `msdyn_ExecuteAggregateAndUpdateIntentMetricsAction`, `msdyn_ExpandOperatingHoursForEntityCollectionAction`, `msdyn_ExternalContextCommitTranscriptUploadAction`, `msdyn_ExternalContextInitiateTranscriptUploadAction`, `msdyn_ExternalContextUploadTranscriptBlocksAction`, `msdyn_FSDemoDataRequestAction`, `msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleAction`, `msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleAction`, `msdyn_FetchDiagnosticEntitiesAndCountAction`, `msdyn_FetchEvaluatedEntityInputConfigAction`, `msdyn_FetchFCSValueAction`, `msdyn_FieldServiceAgreementBookingIncidentCopyActionAction`, `msdyn_FieldServiceAgreementBookingIncidentStatusActionAction`, `msdyn_FieldServiceAgreementSystemStatusActionAction`, `msdyn_FieldServiceBookableResourceBookingAssociateActionAction`, `msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalAction`, `msdyn_FieldServiceQuoteBookingIncidentCopyActionAction`, `msdyn_FieldServiceSolutionHealthRulesRegistrationAction`, `msdyn_FieldServiceSystemActionAction`, `msdyn_FieldServiceSystemJobWOShareUnshareActionAction`, `msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionAction`, `msdyn_FieldServiceWorkOrderIncidentCopyActionAction`, `msdyn_FieldServiceWorkOrderIncidentStatusActionAction`, `msdyn_FieldServiceWorkOrderSystemStatusActionAction`, `msdyn_FindRulesetDependenciesAction`, `msdyn_FpsActionAction`, `msdyn_GBMConfigurationShouldHaveWorkStreamRuleAction`, `msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleAction`, `msdyn_GenerateGeofenceEventAction`, `msdyn_GeocodeAddressAction`, `msdyn_GeolocationLocationTrackingDataAction`, `msdyn_GeolocationLocationTrackingEnabledAction`, `msdyn_GetAdditionalPropertiesMetadataAction`, `msdyn_GetAvailabilitySummaryFromDemandAction`, `msdyn_GetAzureTokenAction`, `msdyn_GetBookableResourcesAction`, `msdyn_GetBookingDetailsByRequirementIdsAction`, `msdyn_GetBoolFCSValueAction`, `msdyn_GetBotConfigurationAction`, `msdyn_GetCaseAggregationAction`, `msdyn_GetCecCompatibilityForOmniChannelAction`, `msdyn_GetChildResourcesAction`, `msdyn_GetChildrensForHierarchyAction`, `msdyn_GetExpandedContractAction`, `msdyn_GetFCBValueAction`, `msdyn_GetHierarchyDataAction`, `msdyn_GetIoTAlertAggregationAction`, `msdyn_GetIoTCommandMetadataAction`, `msdyn_GetIoTVisualizationSummaryAction`, `msdyn_GetMultipleResourceBookingDetailsAction`, `msdyn_GetOCSharedServiceURIAction`, `msdyn_GetOrCreateBookableResourcesAction`, `msdyn_GetOrganizationalUnitsWithinRadiusAction`, `msdyn_GetRelatedIoTDevicesByEntityAction`, `msdyn_GetRequirementChartDataAction`, `msdyn_GetRequirementDemandAction`, `msdyn_GetRequirementDemandDisplayAction`, `msdyn_GetRequirementDependencySetAction`, `msdyn_GetRequirementModelsAction`, `msdyn_GetResourceBookingDetailsAction`, `msdyn_GetResourceBookingFormParametersAction`, `msdyn_GetResourceGroupMembershipsAction`, `msdyn_GetResourcePopupDetailsAction`, `msdyn_GetResourceUtilizationGridAction`, `msdyn_GetResourceWorkHoursForTimeFrameAction`, `msdyn_GetResourcesAction`, `msdyn_GetSummaryBookingsAction`, `msdyn_GetWorkOrderAggregationAction`, `msdyn_InitEntityRoutingAction`, `msdyn_InitEntityRoutingFlowAction`, `msdyn_InitializeSessionChannelAction`, `msdyn_InitiateCCaaSAPIsAsyncAction`, `msdyn_InitiateCCaaSCloseConversationAction`, `msdyn_InitiateCCaaSPickConversationAction`, `msdyn_InsertTrainingRecordsAction`, `msdyn_IntentServiceAPICallProxyAction`, `msdyn_InvokeEvaluationActionAction`, `msdyn_InvokeOutboundAPIAction`, `msdyn_InvokeStoredProcAction`, `msdyn_IoTCheckIfRecordExistsInEntityAction`, `msdyn_IoTGetDeviceEventsAction`, `msdyn_IoTGetEditablePropertiesMetadataAction`, `msdyn_IoTGetIoTAlertCustomAttributesAction`, `msdyn_IoTGetModelStatusInternalAction`, `msdyn_IoTGetTagsMetadataAction`, `msdyn_IoTHubGetAggregatedDeviceReadingsAction`, `msdyn_IoTHubPullDeviceDataAction`, `msdyn_IoTHubQueryDeviceReadingsAction`, `msdyn_IoTHubRegisterDeviceAction`, `msdyn_IoTNewPrimaryAlertAction`, `msdyn_IoTPullDeviceDataActionHandlerAction`, `msdyn_IoTRegisterActionHandlerAction`, `msdyn_IoTSendTestAlertAction`, `msdyn_IoTSetConfigurationAction`, `msdyn_IsAdvancedUnifiedRoutingEnabledAction`, `msdyn_IsBotUserConfiguredAction`, `msdyn_JsonGetBooleanAction`, `msdyn_JsonGetNumberAction`, `msdyn_JsonGetStringAction`, `msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleAction`, `msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleAction`, `msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleAction`, `msdyn_MarkAgreementAsExpiredAction`, `msdyn_OCResetInviteParamsInfoAction`, `msdyn_OCResetLastMessageInfoAction`, `msdyn_OcAgentsShouldHaveCapacityRuleAction`, `msdyn_OcBotsShouldHaveCapacityRuleAction`, `msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleAction`, `msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleAction`, `msdyn_OcQueuesShouldHaveAgentsRuleAction`, `msdyn_OcSdkShouldBeActiveRuleAction`, `msdyn_OcServiceEndpointShouldBeConfiguredRuleAction`, `msdyn_OperatingHoursUpgradeFlowAction`, `msdyn_OrphanCalendarCleanupAction`, `msdyn_OverflowMigrationAPIAction`, `msdyn_ParentIoTAlertsAction`, `msdyn_ProvisionIoTSuggestionsMLModelAction`, `msdyn_ProvisionIoTSuggestionsMLModelInternalAction`, `msdyn_ProvisionUnifiedRoutingAction`, `msdyn_PublishAIModelAction`, `msdyn_PublishEffortAIModelAction`, `msdyn_PullDataForIoTDeviceAction`, `msdyn_QueueItemCreateOperationAction`, `msdyn_QueueItemOperationsOnLwiDeleteOrClosureAction`, `msdyn_RegisterCustomEntityAction`, `msdyn_RegisterIoTDeviceAction`, `msdyn_RemoveRequirementModelAction`, `msdyn_RequirementGroupOverviewAction`, `msdyn_ResetOmnichannelProviderAction`, `msdyn_ResetWorkDistributionFlowAction`, `msdyn_ResetWorkstreamChannelScenarioAction`, `msdyn_ResolveTimezoneAction`, `msdyn_RestartAgreementRelatedWorkflowAction`, `msdyn_RestartUniqueNumberWorkflowAction`, `msdyn_RetrieveAppointmentsByAttendeesAction`, `msdyn_RetrieveConversationPayloadAction`, `msdyn_RetrieveCustomMessagingApplicationSecretAction`, `msdyn_RetrieveDistanceMatrixAction`, `msdyn_RetrieveEvaluationCriteriaAction`, `msdyn_RetrieveOutlookSchedulesAction`, `msdyn_RetrieveRequirementGroupCandidatesAction`, `msdyn_RetrieveResourceAvailabilityAction`, `msdyn_RouteToOperationAction`, `msdyn_SaveMicrosoftCopilotStudioSurveyResponseAction`, `msdyn_ScheduleRequirementGroupAction`, `msdyn_SearchResourceAvailabilityAction`, `msdyn_SearchResourceAvailabilityForRequirementGroupAction`, `msdyn_SendEmailToTechniciansAction`, `msdyn_SendEmailsToOptedInResourcesAction`, `msdyn_SendMCSSurveyAction`, `msdyn_SendMessageToOCServiceAction`, `msdyn_SetAutoBlockedFlagAction`, `msdyn_SetupRelationshipForEnablingEntityRoutingAction`, `msdyn_ShouldEnableRoutingCommandAction`, `msdyn_ShowConsumerCredentialsAction`, `msdyn_ShowPrivacyTermsAction`, `msdyn_SimulateBookingResourceAction`, `msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleAction`, `msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleAction`, `msdyn_StoreQualityEvaluationResultAction`, `msdyn_TeamsChannelCleanupAction`, `msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleAction`, `msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleAction`, `msdyn_TelephonyACSResourceUsageDetailsActionAction`, `msdyn_TelephonyACSSyncPhoneNumbersActionAction`, `msdyn_TelephonyPhoneNumberAreaCodeActionAction`, `msdyn_TelephonyPhoneNumberPlanUpgradeActionAction`, `msdyn_TelephonyPhoneNumberReservationActionAction`, `msdyn_TelephonyPhoneNumberReservationStatusActionAction`, `msdyn_TelephonyPhoneNumbersDeprovisionActionAction`, `msdyn_TelephonyPhoneNumbersProvisionActionAction`, `msdyn_TelephonyPlanLocationDetailsActionAction`, `msdyn_TelephonyResourceDeprovisionActionAction`, `msdyn_TelephonyResourceProvisionActionAction`, `msdyn_TelephonySupportedCountryActionAction`, `msdyn_TelephonySupportedPlansActionAction`, `msdyn_TrainAIModelAction`, `msdyn_TrainEffortModelAction`, `msdyn_TrainModelAction`, `msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleAction`, `msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleAction`, `msdyn_TwitterSigninAction`, `msdyn_URFirstPartyIntegrationApiAction`, `msdyn_UnifiedRoutingQueueItemOperationsAction`, `msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckAction`, `msdyn_UpdateBookingsStatusAction`, `msdyn_UpdateEffortModelStatusAction`, `msdyn_UpdateModelStatusAction`, `msdyn_UpdatePrivacyTermsAction`, `msdyn_UpdateRequirementDemandAction`, `msdyn_UpdateRequirementModelAction`, `msdyn_UpdateSurveyBotTopicsAction`, `msdyn_UpdateSurveyJsonAction`, `msdyn_UpsertEvaluationCriteriaAction`, `msdyn_ValidateCustomMessagingApplicationAction`, `msdyn_ValidateTSIKeyAction`, `msdyn_ValidateTSISecretExpiryAction`, `msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleAction`, `msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleAction`, `msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleAction`, `msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleAction`, `msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleAction`, `msdyn_WorkstreamShouldHaveNotificationTemplatesRuleAction`, `msdyn_WorkstreamShouldHaveSessionTemplatesRuleAction`, `msdyn_WorkstreamShouldNotHaveDuplicateContextRuleAction`, `msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleAction`, `msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleAction`, `msdyn_applyworktemplateforresourcesAction`, `msdyn_autonomousCaseCreateUpdateAction`, `msdyn_cloneentityAction`, `msdyn_conversationclosecasesentimentAction`, `msdyn_createevaluationplanbatchAction`, `msdyn_createtemplatecvrelationshipsAction`, `msdyn_fetchAutonomousCaseCreateUpdateRuleAction`, `msdyn_fetchEntityMetadataAction`, `msdyn_initializedefaultclonequeryAction`, `msdyn_msdyn_ValidateWorkStreamSMSConnectionAction`, `msdyn_transformentityAction`, `msdyn_updateevaluationdetailsAction`, `msdyn_updatelivechatconfigsAction`, `msdyncrm_GetFileAttributesFromConfigurationAction`, `msdyncrm_MigrateFilesCustomActionAction`, `msdyncrm_UpsertFileAction`, `msdynmkt_ChannelContentPersonalizeAction`, `msdynmkt_ChartWidgetDataCustomActionAction`, `msdynmkt_ContactabilitySnapshotCustomActionAction`, `msdynmkt_DateTimeFormatOptionsAction`, `msdynmkt_DiscoverPlaceholdersAction`, `msdynmkt_EnableDoubleOptInComplianceV2Action`, `msdynmkt_GetAllCjoEventsMetadataItemsAction`, `msdynmkt_GetAllLegalMetadataItemsAction`, `msdynmkt_GetCjoEventsMetadataItemsByNamesAction`, `msdynmkt_GetDataverseTableMetadataItemsAction`, `msdynmkt_GetMetadataItemsForAction`, `msdynmkt_GetPublicConfigurationCustomActionAction`, `msdynmkt_ListWidgetDataCustomActionAction`, `msdynmkt_PersonalizationDynamicTextAiAction`, `msdynmkt_PersonalizationGetEntityAttributesAction`, `msdynmkt_PersonalizationGetEntityProvidersAction`, `msdynmkt_PersonalizationGetEntityTypesAction`, `msdynmkt_PersonalizationGetEventsByNameAction`, `msdynmkt_PredefinedPlaceholderAddCountAction`, `msdynmkt_RetrieveAllFeatureConfigurationsAction`, `msdynmkt_RetrieveAnalyitcsAriaCountsAction`, `msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryAction`, `msdynmkt_RetrieveServiceFeatureFlagsAction`, `msdynmkt_StartLoadConsentV4CustomActionAction`, `msdynmkt_StartMigrationCustomActionAction`, `msdynmkt_ValidatePlaceholdersAction`, `msdynmkt_ValueWidgetDataCustomActionAction`, `msdynmkt_checkconsentAction`, `msdynmkt_checkconsentbatchAction`, `msdynmkt_consentprovidervalidateAction`, `msdynmkt_consentsubmissionAction`, `msdynmkt_consentvalidateformAction`, `msdynmkt_contactablefieldsactionAction`, `msdynmkt_doubleoptinstatusAction`, `msdynmkt_enabledoubleoptincomplianceAction`, `msdynmkt_getObmDeprecationConfigurationAction`, `msdynmkt_getdigitalassetcdnurlv2Action`, `msdynmkt_getsuppressionlistentriesAction`, `msdynmkt_getsuppressionlistentryAction`, `msdynmkt_getunsubscribelinkAction`, `msdynmkt_leadcapturev3submissionAction`, `msdynmkt_leadcapturev4submissionAction`, `msdynmkt_normalizecontactpointAction`, `msdynmkt_optoutofallvoicecommunicationAction`, `msdynmkt_optoutofvoicecommunicationAction`, `msdynmkt_purposecreationandassociationAction`, `msdynmkt_removesuppressionlistentryAction`, `msdynmkt_updategdprconfigurationAction`, `pbi_CloneAndAddPowerBIDatasetAction`, `pbi_CloneAndAddPowerBIReportAction`, `pm_CreateProcessAction`, `pm_RefreshProcessMiningLicensingCapacityAction`, `querystructureddatastreamAction`

  </details>

  Besides the classes per binding, 2.0 adds 146 actions and messages and 8 functions, operations of the platform, Sales and Customer Service that are newer than 1.0, among them `ExportToExcel`, `Mcp*`, Copilot in Sales and the sales agents (`msdyn_SalesAgent_*`) and the case management agents. The package root also exports the complex and entity types (type-only), not only the enums. Where Dataverse declares a complex type with the same name as an operation's `<Operation>Response`, that name is the operation's response type (#333). Some operations gained or lost parameters as `$metadata` changed, for example `BulkDeleteAction` (a new optional `Options`) and `McpCreateTableAction` (a new required `usage`). Interfaces in `types/` list their members in name order.

## generator (dataverse-gen) and entities-runtime

- **`generate` works against a real org.** It signs in with the configured `auth` (`deviceCode` or `clientCredentials`), or uses `--token`.
- **Generated code type-checks under strict settings.** Entity names follow the schema name, for example `Account`.
- **Overloads.** Operations with the same name but different bindings each get their own class.
- **Operation constructors take a parameters object**, as in the actions, functions and messages packages (#96): `new contoso_ApproveAction(recordId, { Comment: "ok" })` instead of `new contoso_ApproveAction(recordId, "ok")`. Each class has a `<Class>Parameters` interface keyed by the custom API's parameter names; a nullable parameter is optional (and may be `null`), and one left out or `undefined` isn't sent. The record id of an operation bound to a table is now named after the table (`accountId`), not `targetId`.
- **Function parameters** use `formatParameterAlias` from entities-runtime.
- **Return values are the ones the actions and functions packages resolve (#300).** Each operation with a return type has a `<Class>Response` type, and `execute()` resolves: the value itself for a primitive or an enum (an enum is its member name, a `string`); the array for a collection, `[]` for a 204, with each record's `@odata.etag` and `@odata.type`; the body for a complex type (`interface WhoAmIFunctionResponse extends WhoAmIResponse { "@odata.context"?: string }`); the record for an entity, or `null` for a 204. An operation without a return type resolves `undefined`. In 1.0 a 204 gave `{}` for an entity and `undefined` for a collection, and annotations were untyped.

  <!-- no-check -->

  ```typescript
  // 1.0
  const job = await client.execute(new contoso_StartJobAction(accountId)); // Account, {} for a 204
  ```

  ```typescript
  // 2.0: contoso_StartJob is a custom API bound to account that returns an account
  import { contoso_StartJobAction } from "./generated/actions/contoso_StartJobAction.js";

  const job = await client.execute(new contoso_StartJobAction(accountId)); // contoso_StartJobActionResponse: (Account & annotations) | null
  if (job) console.log(job.accountid, job["@odata.etag"]);
  ```

- **Query functions aren't generated (#342).** 1.0 wrote a class for each of the Web API's query functions (`LastXDaysFunction`, `BetweenFunction`, `EqualUserIdFunction`, …), and each one got a 404 from `execute()`. dataverse-gen leaves them out now, even when `functions` lists them (it prints a warning, and `generateCode()` returns it in `warnings`). Write them in `$filter` with `queryFunctions` from `@mohsinonxrm/dataverse-sdk-functions` (see "Query functions are `$filter` helpers" above). A custom API keeps its class: its name has a publisher prefix (`contoso_`), which no query function has.

- **Strict nulls, opt-in (#305).** `--strict-nulls` (or `"strictNulls": true`) types complex responses exactly as `$metadata` declares them. Every property is there, and it's `T | null` unless the CSDL says `Nullable="false"`, instead of an optional `T | null`. Each returned complex type gets a `<Name>Output` interface for this. Parameters keep the `<Name>` interfaces. It's off by default, and the default output doesn't change. The prebuilt actions, functions and messages packages keep their non-null response properties. See the generator README's "Strict nulls" section.

- **Regenerate after upgrading (#360, #361).**
  - **Date-and-time columns are `string`** (ISO 8601), not `Date`: `Edm.DateTimeOffset` values arrive as JSON strings and nothing converted them, so `record.createdon.getTime()` compiled and then threw. Use `new Date(record.createdon)` where you need a `Date`. Parameters accept `string | Date`.
  - **Activity tables have their inherited columns.** `email`, `task`, `phonecall` and the other tables based on `activitypointer` now include `subject`, `regardingobjectid`, `scheduledend` and the rest.
  - **All-tables mode works.** With no `entities` list, only real tables are generated (not `EntityDefinitions` or the other metadata sets), and a table the org doesn't describe is skipped with a warning.
  - **Action bodies are sent as the Web API reads them.** Enum values inside action parameters go out by member name, and lookups in entity parameters as `@odata.bind`; complex types keep their navigation properties (`PrincipalAccess.Principal`). Enum values inside complex and collection function parameters are sent by name too (#358).
  - `dataverse-gen --version` prints the installed version.
- **`IEntity.logicalName` is optional.** `formatEntityForWrite()` drops it and binds lookups (`EntityReference` → `@odata.bind`).
- **`IEntity`'s other properties are `unknown`, not `any`** (`[key: string]: unknown`). The columns a generated interface declares keep their types; a property it doesn't declare must be checked (`typeof record.name === "string"`) or typed before use.
