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

## core

- **Nothing is logged by default.** Pass `logger: new ConsoleLogger()` to see request logs. URLs in logs and telemetry are redacted unless you set `logging: { fullUrls: true }` or your own `redactUrl`.
- **Retries.**
  - A 429 or 503 whose `Retry-After` is longer than `retry.maxRetryAfterMs` (default 30 s) is returned at once instead of being waited out. A 429 throws `DataverseThrottleError` with `retryAfterMs`. Set `maxRetryAfterMs: Infinity` for the old behaviour.
  - POST, and PATCH without `If-Match`, are no longer replayed after a 502, 503 or 504, because Dataverse may already have applied them. A 429 is still retried for every method.
  - A `$batch` answered with a 429 and a multipart body is handed back instead of replayed.
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
  - `circuitBreaker` and `bulkhead`, with their `CircuitBreakerOptions` and `BulkheadOptions` types: they had no effect. Circuit breaker and bulkhead middleware are planned in [#100](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/100).
  - The `MiddlewareRetryOptions` export: it was a second name for `RetryOptions`. Import `RetryOptions` instead; the options themselves are unchanged.
- **Auth.**
  - A token is fetched for every attempt, and a 401 triggers one token refresh and one retry.
  - The token is only attached to requests for the client's own origin.
  - Non-HTTPS base URLs are rejected, except `localhost`.
- **Default middleware order:** ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging. A request waiting to be retried no longer holds a concurrency slot. If you replace the pipeline with the `middleware` option, keep this order.
- **Query encoding.** Query options are encoded like `encodeURIComponent`: spaces become `%20`, not `+`. A query string you put in the path yourself is left as written.
- **`expand()`.** Calls add up instead of replacing each other, and `expand(nav, { select, filter, orderBy, top, expand })` takes options.

## auth-msal-browser

A configured `account` object no longer overrides MSAL's active account. Pass `account: () => x` to pin one account.

## batch

- **`execute({ continueOnError: true })` no longer throws** when a request fails. It returns the result, with `success: false` and the failures in `errors`. Without `continueOnError`, `DataverseBatchError` now carries `result`.
- **Large batches are split** automatically to stay within Dataverse's limit.
- **Bodies are `unknown`, not `any`.** `BatchResponseStep.body` and `BatchResponsePart.body` are `unknown`, so `result.responses.get("who")?.body.UserId` no longer compiles. Name the type of a response you know with the new generic, `result.responses.get("who") as BatchResponseStep<WhoAmIResponse> | undefined`, or check the value first. The request body of `addRequest()` and `BatchRequestStep` is `unknown` too; every value is still accepted.

## files

- `new FileColumnClient(client)` takes a `DataverseClient`. The constructor that takes an adapter has no invalid default base URL any more.
- `upload()` accepts a `Blob`, `ArrayBuffer`, typed array or `Buffer`, and doesn't need `Buffer` in browsers.
- `download()` returns a `Blob`.
- `delete()` sends `DELETE`.
- Every failed step rejects with a typed error.

## otel

`serviceName` is removed from `OpenTelemetryConfig`: it was ignored. `service.name` is a resource attribute, so set it on your OpenTelemetry SDK (`new NodeSDK({ serviceName })` or `OTEL_SERVICE_NAME`).

## metadata

- **Enums are string member names**, for example `OwnershipTypes.UserOwned === "UserOwned"`, because the Web API rejects numbers in metadata bodies. Replace numeric comparisons such as `OwnershipType === 1` with the enum member.
- **New create types.** `*AttributeMetadataCreate` types, discriminated on `@odata.type`, model what a create needs.
- **Ids come from the response header.** `create*` methods return the new `MetadataId` from `OData-EntityId`, and creates and updates take `{ solutionUniqueName }`.
- **Escaping and validation.** Key values are escaped, and invalid `MetadataId` keys or `DeletedMetadataFilters` values throw `DataverseInvalidRequestError`.

## xrm

- `create()`, `retrieve()`, `retrieveMultiple()` and `update()` now work: in 1.0 they threw `TypeError`.
- `assign()`, `setState()` and the `EntityReference`s of `associate()` take logical names. The entity set is read from metadata instead of being guessed as a plural.
- Record ids must be GUIDs. A malformed id throws `DataverseInvalidRequestError` before any request is sent.
- **Typed results.** `execute(request)` returns the request's response type (`await service.execute(new WhoAmIFunction())` is a `WhoAmIResponse`), and takes only an `Executable<T>`; drop type arguments it can now infer. `retrieve()`, `retrieveMultiple()`, and `create()`/`update()` with `returnRepresentation` return an `EntityRecord` instead of `any` when you pass no type, so a column is `unknown` until you narrow it: pass your record type (`service.retrieve<Account>(…)`) where you read columns. `update()` without `returnRepresentation` returns `Promise<void>`.

## discovery

`OrganizationDetail` matches the Global Discovery Service v2.0 response: flat `Url` and `ApiUrl`, and an integer `State`. `Endpoints`, `Geo` and `OrganizationEndpoints` are removed.

## actions, functions, messages

These packages are generated by `tools/generate-sdk-types`.

- **Constructors take one object with the parameters, by name (#96).** In 1.0 every parameter was a positional argument in `$metadata` order, so it was easy to swap two of the same type (`RetrieveEntityFunction` takes `LogicalName` before `MetadataId`) and `ImportSolutionAction` took 17 arguments, all typed as required. Now each operation with parameters has a `<Class>Parameters` interface (`ImportSolutionActionParameters`, `RetrieveEntityFunctionParameters`, `MergeRequestParameters`), keyed by the `$metadata` parameter names. A parameter `$metadata` marks `Nullable="false"` is required, any other is optional, and one that is left out or `undefined` isn't sent. The record id or entity set of a bound operation is still the first argument, before the object. An operation without parameters still takes no arguments (`new WhoAmIFunction()`), and one with only optional parameters can be called without arguments.

  ```typescript
  // 1.0
  new ImportSolutionAction(true, false, customizationFile, importJobId);
  new RetrieveEntityFunction(EntityFilters.Entity, "account", EMPTY_GUID, false);
  new ExecuteWorkflowAction(workflowId, recordId, {});
  new CreateMultipleAction("accounts", targets);
  new MergeRequest(target, subordinate, undefined, false);

  // 2.0
  new ImportSolutionAction({
    CustomizationFile: customizationFile,
    ImportJobId: importJobId,
    OverwriteUnmanagedCustomizations: true,
    PublishWorkflows: false,
  });
  new RetrieveEntityFunction({
    EntityFilters: EntityFilters.Entity,
    LogicalName: "account",
    MetadataId: EMPTY_GUID,
    RetrieveAsIfPublished: false,
  });
  new ExecuteWorkflowAction(workflowId, { EntityId: recordId });
  new CreateMultipleAction("accounts", { Targets: targets });
  new MergeRequest({ Target: target, Subordinate: subordinate, PerformParentingChecks: false });
  ```

  - The parameters are in `action.parameters` (`function.parameters`), not in one property each (`action.targets` is now `action.parameters.Targets`). A message keeps them in `request.Parameters`, as the .NET `OrganizationRequest` does, instead of one public property each.
  - A `MessageName` parameter (`GenerateAutomatedPluginRequest`, `msdyn_CascadeBookingChangesRequest`) is an ordinary property of the parameters object. It used to clash with `OrganizationRequest.messageName`, so it was always required, even where `$metadata` makes it optional.

- **Bulk operations take the entity set first.** `CreateMultiple`, `UpdateMultiple`, `UpsertMultiple` and `DeleteMultiple` now take it as their first argument, for example `new CreateMultipleAction("accounts", { Targets: targets })`.
- **Collection-bound and bound operations call their bound URL.**
- **Entity references** from `createEntityReference(logicalName, id, options?)` have the Web API shape (`{ "@odata.type", <primary key> }`). The third argument is now an options object.
- **Function parameters** are sent as OData literals: strings are quoted with `'` doubled, enums are `Microsoft.Dynamics.CRM.<Enum>'<value>'`, and GUIDs and dates are bare. Nullable parameters are optional.
- **Return values (#300).** `client.execute()` resolves the value the operation returns, never the OData envelope around it, and `<Name>Response` is exactly that value's type. A message's `result` is the same value as the action's, typed `<Name>Result`. dataverse-gen generates the same values (see the generator section).

  | Return type in `$metadata`                       | Web API response                                          | 2.0 value                                                 | 1.0 value                                                |
  | ------------------------------------------------ | --------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------- |
  | none                                             | `204 No Content`                                          | `undefined` (`void`)                                      | `{}`                                                     |
  | primitive or enum (`Edm.Boolean`, …)             | `{ "@odata.context", "value": true }`                     | `true`; an enum is its member name                        | `{ value: true }` (message: `true`)                      |
  | collection (`Collection(mscrm.role)`, …)         | `{ "@odata.context", "value": [ … ] }`, or 204 when unset | the array, each record with `@odata.etag`; `[]` for a 204 | `{ value: [ … ] }` (message: the array)                  |
  | complex type (`mscrm.WhoAmIResponse`)            | the properties, with `@odata.context`                     | the body, with `@odata.context`                           | the body (message: without `@odata.*`)                   |
  | entity (`mscrm.asyncoperation`, `crmbaseentity`) | the record, with `@odata.etag`, or 204 when unset         | the record, with its annotations; `null` for a 204        | the record, `{}` for a 204 (message: without `@odata.*`) |

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

  // 2.0
  const roles = await client.execute(new RetrieveAadUserRolesFunction({ DirectoryObjectId: id })); // role records
  const job = await client.execute(new ExecuteWorkflowAction(workflowId, { EntityId: recordId }));
  console.log(job?.asyncoperationid); // null if the Web API answered 204
  const emails = await client.execute(
    new InstantiateTemplateAction({ TemplateId, ObjectType, ObjectId })
  ); // email records
  ```

  - An operation without a return type resolves `undefined`, and its `<Name>Response` is `void`.
  - A single entity return is `<Entity> | null`: Dataverse answers `204 No Content` for an entity output that wasn't set, although `$metadata` says `Nullable="false"`. Check for `null` (`job?.asyncoperationid`).
  - `Collection(mscrm.crmbaseentity)` returns are records (`{ "@odata.etag"?, "@odata.type"?, [column]: unknown }[]`), not `EntityReference[]`.
  - Message results keep the annotations (`@odata.context`, `@odata.etag`, `@odata.type`), as the action's value and `retrieve()` do; in 1.0 a message dropped them. `@odata.type` says which table a `crmbaseentity` record is. The generic `OrganizationRequest` still drops them from `Results`.
  - `<Name>Response.fromResponse(data)` takes the parsed body, or `undefined` for a 204.
  - The internal `responseData` helpers of the messages package are gone.

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

- **Operations not in 2.0 (#293).** The packages are now generated from a committed `$metadata` snapshot (`tools/generate-sdk-types/metadata/`), taken from an org without Field Service. 75 actions (and their messages) and 3 functions that 1.0 had are gone, most of them Field Service. To call one on an org that has it, send the request yourself (`client.api("/msdyn_CreateWorkOrder").post(body)`) or generate it with dataverse-gen.

  <details><summary>Removed functions (3)</summary>

  `msdyn_SelectNotToExceedFunction`, `msdyn_TradeCoverageNotificationFunction`, `pbi_GetEnvironmentWorkspaceAccessForUserFunction`

  </details>

  <details><summary>Removed actions (75), with their <code>…Request</code> messages</summary>

  `QuerySalesforceUnstructuredDataAction`, `QueryZendeskUnstructuredArticlesAction`, `SearchWebAction`, `msdyn_AcquireTokenAction`, `msdyn_AsExchangeEventAction`, `msdyn_CheckAlertFieldsAction`, `msdyn_CheckBookingCustomControlUsageAction`, `msdyn_CheckCharacteristicHasMatchingResourceAction`, `msdyn_CheckCompatibilityBetweenFSAndPSASolutionAction`, `msdyn_CheckDefaultValueForLineStatusAction`, `msdyn_CheckFieldServiceDBVersionAction`, `msdyn_CheckForActiveAgreementsHavingPastEndDatesAction`, `msdyn_CheckForActiveLayersOnProcessesAction`, `msdyn_CheckForDeletedBSMRecordsAction`, `msdyn_CheckForFailingDeleteUniqueNumberWorkflowAction`, `msdyn_CheckForFailingWorkflowRelatedToAgreementAction`, `msdyn_CheckForFieldServiceSettingRecordAction`, `msdyn_CheckForRemovedFormLibrariesAction`, `msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersAction`, `msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersAction`, `msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsAction`, `msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsAction`, `msdyn_CheckForSolutionVersionAction`, `msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementAction`, `msdyn_CheckForWorkOrderTypesAction`, `msdyn_CheckIfAutoNumberingIsOptedAction`, `msdyn_CheckIfExecutionContextIsPassedAction`, `msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountAction`, `msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSAction`, `msdyn_CheckIfRequiredLevelOfFieldIsChangedAction`, `msdyn_CheckIfTerritoryRecordsExistAction`, `msdyn_CheckIfWorkOrderGeneratedFromABSAction`, `msdyn_CheckIoTDeviceCategoryOfDeviceAction`, `msdyn_CheckIoTSettingsAndAlertParentingConfigAction`, `msdyn_CheckMobileUserSecurityRoleAction`, `msdyn_CheckMultiplePrimaryIncidentForWorkOrderAction`, `msdyn_CheckServiceEndPointAction`, `msdyn_CheckVolumeOfAlertsAction`, `msdyn_CreateBSMRecordAction`, `msdyn_CreateTechniciansAction`, `msdyn_CreateWorkOrderAction`, `msdyn_DecommissionFieldServiceSolutionHealthRulesAction`, `msdyn_FSDemoDataRequestAction`, `msdyn_FieldServiceAgreementBookingIncidentCopyActionAction`, `msdyn_FieldServiceAgreementBookingIncidentStatusActionAction`, `msdyn_FieldServiceAgreementSystemStatusActionAction`, `msdyn_FieldServiceBookableResourceBookingAssociateActionAction`, `msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalAction`, `msdyn_FieldServiceQuoteBookingIncidentCopyActionAction`, `msdyn_FieldServiceSolutionHealthRulesRegistrationAction`, `msdyn_FieldServiceSystemActionAction`, `msdyn_FieldServiceSystemJobWOShareUnshareActionAction`, `msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionAction`, `msdyn_FieldServiceWorkOrderIncidentCopyActionAction`, `msdyn_FieldServiceWorkOrderIncidentStatusActionAction`, `msdyn_FieldServiceWorkOrderSystemStatusActionAction`, `msdyn_GenerateGeofenceEventAction`, `msdyn_GeolocationLocationTrackingDataAction`, `msdyn_GeolocationLocationTrackingEnabledAction`, `msdyn_GetWorkOrderAggregationAction`, `msdyn_InvokeStoredProcAction`, `msdyn_MarkAgreementAsExpiredAction`, `msdyn_OCResetInviteParamsInfoAction`, `msdyn_OCResetLastMessageInfoAction`, `msdyn_ProvisionIoTSuggestionsMLModelAction`, `msdyn_ProvisionIoTSuggestionsMLModelInternalAction`, `msdyn_RestartAgreementRelatedWorkflowAction`, `msdyn_RestartUniqueNumberWorkflowAction`, `msdyn_SendEmailToTechniciansAction`, `msdyn_UpdateSurveyJsonAction`, `msdyn_ValidateTSISecretExpiryAction`, `msdyn_conversationclosecasesentimentAction`, `pbi_CloneAndAddPowerBIDatasetAction`, `pbi_CloneAndAddPowerBIReportAction`, `querystructureddatastreamAction`

  </details>

  2.0 adds 271 actions and messages and 22 functions, among them `CCaaS_*` (Contact Center), `Mcp*` and `RetrieveUnpublished_computeruseagent`. Some operations gained or lost parameters as the org's `$metadata` changed, for example `BulkDeleteAction` (a new optional `Options`) and `McpCreateTableAction` (a new required `usage`). Interfaces in `types/` list their members in name order.

## generator (dataverse-gen) and entities-runtime

- **`generate` works against a real org.** It signs in with the configured `auth` (`deviceCode` or `clientCredentials`), or uses `--token`.
- **Generated code type-checks under strict settings.** Entity names follow the schema name, for example `Account`.
- **Overloads.** Operations with the same name but different bindings each get their own class.
- **Operation constructors take a parameters object**, as in the actions, functions and messages packages (#96): `new contoso_ApproveAction(recordId, { Comment: "ok" })` instead of `new contoso_ApproveAction(recordId, "ok")`. Each class has a `<Class>Parameters` interface keyed by the custom API's parameter names; a nullable parameter is optional (and may be `null`), and one left out or `undefined` isn't sent. The record id of an operation bound to a table is now named after the table (`accountId`), not `targetId`.
- **Function parameters** use `formatParameterAlias` from entities-runtime.
- **Return values are the ones the actions and functions packages resolve (#300).** Each operation with a return type has a `<Class>Response` type, and `execute()` resolves: the value itself for a primitive or an enum (an enum is its member name, a `string`); the array for a collection, `[]` for a 204, with each record's `@odata.etag` and `@odata.type`; the body for a complex type (`interface WhoAmIFunctionResponse extends WhoAmIResponse { "@odata.context"?: string }`); the record for an entity, or `null` for a 204. An operation without a return type resolves `undefined`. In 1.0 a 204 gave `{}` for an entity and `undefined` for a collection, and annotations were untyped.

  ```typescript
  // 1.0
  const job = await client.execute(new contoso_StartJobAction(accountId)); // Account, {} for a 204
  // 2.0
  const job = await client.execute(new contoso_StartJobAction(accountId)); // contoso_StartJobActionResponse: (Account & annotations) | null
  if (job) console.log(job.accountid, job["@odata.etag"]);
  ```

- **`IEntity.logicalName` is optional.** `formatEntityForWrite()` drops it and binds lookups (`EntityReference` → `@odata.bind`).
- **`IEntity`'s other properties are `unknown`, not `any`** (`[key: string]: unknown`). The columns a generated interface declares keep their types; a property it doesn't declare must be checked (`typeof record.name === "string"`) or typed before use.
