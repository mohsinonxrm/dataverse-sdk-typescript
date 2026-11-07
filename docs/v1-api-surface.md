# v1-api-surface.md

> **Status**: Reconciled with the exports on `dev` for 2.0.0, November 2026. (The file name dates from 1.0; the content describes 2.0.0.)
>
> **Scope**: The public API surface of every published `@mohsinonxrm/dataverse-sdk-*` package.
>
> **Goal**: List what each package's `index.ts` actually exports. APIs that earlier drafts of this document promised but that don't exist are listed under [Planned](#16-planned-not-exported-yet) with their tracking issue, or were removed.
>
> Notes:
>
> - This is an **API contract**. Changes require an ADR + SemVer discipline.
> - All packages are **ESM-only**, require **Node 22+** (`engines.node: ">=22"`), and the browser-facing ones run in modern browsers (see [browser.md](./browser.md)).
> - Generated packages (actions, functions, messages, metadata types) are described by naming pattern and count rather than every generated name.
> - What changed since 1.0.0 is in [migration-2.0.md](./migration-2.0.md) and each package's CHANGELOG.

---

## 1) `@mohsinonxrm/dataverse-sdk-core`

### 1.1 Client & request builder

- `class DataverseClient`
  - `api(pathOrAbsoluteUrl)`, `execute(executable, options?)`, `send(request)`, `resolveUrl(pathOrUrl)`, `getBaseUrl()`, `bind(navigationProperty, entitySetName, id)`, `fetchXml(entitySetName, fetchXml, options?)`, `savedQuery(entitySetName, id, options?)`, `userQuery(entitySetName, id, options?)`
- `interface DataverseClientOptions`
- `type ApiVersion` (`` `v${number}.${number}` ``)
- `class DataverseRequestBuilder`
- `interface RequestOptions`
- `interface CreateAndGetIdOptions` (`RequestOptions` plus `primaryIdAttribute`, for `createAndGetId()` with `Prefer: return=representation`)
- `class PreferBuilder`
- `const odata` _(OData filter helpers)_
- `const odataLiteral`, `function odataKey(key)`, `type ODataKey`, `type ODataScalar`, `type ODataParameterKind`, `type ODataRecordReference` _(OData literals for keys, filters and operation parameters)_
- `interface ExpandOptions` _(`expand(navigationProperty, { select, filter, orderBy, top, expand })`)_
- FetchXML: `interface FetchXmlPage<T>`, `interface FetchXmlOptions`, `function parsePagingCookie(annotation)`, `function buildPagedFetchXml(xml, paging)`, `interface ParsedPagingCookie`, `interface FetchXmlPaging`

### 1.2 Execution model (typed operations)

- `interface Executable<TResponse>`
  - `toRequestInformation(baseUrl: string): RequestInformation`
  - `parseResponse(response: Response): Promise<TResponse>`

### 1.3 HTTP request abstractions

- `type HttpMethod` (`"GET" | "POST" | "PATCH" | "PUT" | "DELETE"`)
- `interface RequestInformation`
- `interface RequestAdapter` (`send(request, ctx?): Promise<Response>`)
- `interface FetchProvider`
- `class FetchRequestAdapter`
- `type RawBody`
- `function entityIdFromResponse(res: Response): string`
- `function buildUrl(request: RequestInformation): string` _(the exact URL `fetch` receives)_
- Header utilities: `type HeadersLike`, `getRequestHeader`, `setRequestHeader`, `appendRequestHeader`, `normalizeHeaderKey`, `normalizeHeaders`, `headersToObject`, `parseRetryAfter`, `serializeContent`, `isStreamContent`, `generateUUID`

### 1.4 Auth adapter abstraction

- `interface AccessTokenProvider`
- `interface TokenOptions` (`claims`, `tenantId`, `correlationId`, `forceRefresh`)
- `function parseClaimsChallenge(header): string | undefined`

### 1.5 Middleware pipeline (public extension points)

- `interface Middleware`
- `type NextMiddleware`
- `interface MiddlewareContext`
- `interface MiddlewareCustomization` (`DataverseClientOptions.middleware`: `prepend`, `append`, `replace`)
- `class Pipeline`
- `function buildDefaultMiddleware(options)`
- Built-in middleware: `ODataHeadersMiddleware`, `ConcurrencyMiddleware`, `RetryMiddleware`, `AuthMiddleware`, `TelemetryMiddleware`, `LoggingMiddleware`
- `interface RetryOptions`, `interface RetryAttempt`, `interface RetryInfo`, `function getRetryAttempts(res: Response)`
- `interface ConcurrencyOptions`
- `interface DiagnosticHeaderOptions` (`DataverseClientOptions.diagnosticHeaders`)
- `interface LoggingConfig` (`DataverseClientOptions.logging`)
- `type BindManyExecutor`
- Per-request middleware options: `class MiddlewareRequestOptions`, `interface MiddlewareConcurrencyOptions`, `interface TelemetryOptions`, `interface LoggingOptions`, `interface MiddlewareOptions`, `type MiddlewareOptionEntry`

### 1.6 Prefer helpers (typed)

- `type PreferOption`
- `const Prefer`
  - `Prefer.returnRepresentation()`
  - `Prefer.includeAnnotations(term)`
  - `Prefer.continueOnError()`

### 1.7 Logging & telemetry

- `interface Logger`
- `class ConsoleLogger`, `type LogLevel` _(the SDK logs nothing unless a logger is passed)_
- `function defaultRedactUrl(url: URL): string`
- `interface TelemetryClient`
- `const SDK_VERSION`
- Feature usage flags: `enum FeatureUsageFlag`, `class FeatureUsageTracker`, `getGlobalFeatureTracker()`, `resetGlobalFeatureTracker()`

### 1.8 Errors

Every SDK error extends `DataverseError`.

- `class DataverseError`, `interface DataverseErrorInit`, `interface DataverseInnerError`
- `class DataverseODataError`
- `class DataverseThrottleError`
- `class DataverseBatchError`
- `class DataverseDuplicateError`, `interface DuplicateRecord`
- `class DataverseUrlError`
- `class DataverseAuthenticationError`
- `class DataverseInvalidRequestError`
- `class DataverseServiceError`
- `class DataverseNetworkError`
- `class DataverseAbortError`
- `function parseODataError(res: Response, rawText?: string): Promise<Error>`

### 1.9 Paging helpers

- `interface PageResponse<T>` (`{ value: T[]; "@odata.nextLink"?: string }`)
- `class PageIterator<T>` _(returned through `DataverseRequestBuilder.iterate()`; `getAll()` collects pages)_

---

## 2) `@mohsinonxrm/dataverse-sdk-auth-msal-browser`

Peer dependency: `@azure/msal-browser` `^3.30.0 || ^4.0.0 || ^5.0.0`.

### 2.1 Token provider

- `class MsalBrowserTokenProvider implements AccessTokenProvider`
- `interface MsalBrowserTokenProviderOptions`
- `type InteractionType` (`"popup" | "redirect"`)

### 2.2 SPA helpers

- `function initializeMsal(pca: IPublicClientApplication): Promise<AuthenticationResult | null>`
- `function createMsalBrowserProvider(pca: IPublicClientApplication, options: CreateMsalBrowserProviderOptions): MsalBrowserTokenProvider`
- `interface CreateMsalBrowserProviderOptions`
- `function scopesForEnvironment(url: string, kind?: DataverseScopeKind): string[]`, `type DataverseScopeKind`
- `function authorityFor(cloud: EntraCloud, tenant?: string): string`, `type EntraCloud`, `const AUTHORITY_HOSTS`

### 2.3 Errors

- `class MsalBrowserAuthenticationError` _(extends `DataverseAuthenticationError`)_
- `isInteractionRequiredError(error)`, `isPopupBlockedError(error)`, `getMsalErrorCode(error)`
- `const INTERACTION_REQUIRED_ERROR_CODES`, `const POPUP_BLOCKED_ERROR_CODES`
- `interface MsalErrorLike`, `interface MsalErrorDetails`

### 2.4 Re-exported MSAL types

- `AccountInfo`, `AuthenticationResult`, `PopupRequest`, `RedirectRequest`, `SilentRequest`, `EndSessionRequest`

---

## 3) `@mohsinonxrm/dataverse-sdk-auth-msal-node`

### 3.1 Token provider

- `class MsalNodeTokenProvider implements AccessTokenProvider`
  - `new MsalNodeTokenProvider(clientApplication, options)`, where `clientApplication` is an MSAL `PublicClientApplication` or `ConfidentialClientApplication`
- `type MsalNodeTokenProviderOptions`, `interface MsalNodeTokenProviderOptionsBase`

### 3.2 Supported flows

The flow is chosen with `options.flow` (`type AuthFlow`); there are no per-flow helper functions.

- `interface DeviceCodeFlowOptions` (`flow: "deviceCode"`)
- `interface ClientCredentialsFlowOptions` (`flow: "clientCredentials"`)
- `interface AuthorizationCodeFlowOptions` (`flow: "authorizationCode"`)
- `interface UsernamePasswordFlowOptions` (`flow: "usernamePassword"`)
- `interface SilentFlowOptions` (`flow: "silent"`)

### 3.3 Re-exported MSAL types

- `AccountInfo`, `AuthenticationResult`, `DeviceCodeRequest`, `ClientCredentialRequest`, `AuthorizationCodeRequest`, `UsernamePasswordRequest`, `SilentFlowRequest`

---

## 4) `@mohsinonxrm/dataverse-sdk-auth-azure-identity`

- `class AzureIdentityTokenProvider implements AccessTokenProvider` (`new AzureIdentityTokenProvider(credential: TokenCredential, options)`)
- `interface AzureIdentityTokenProviderOptions`

Peer dependency: `@azure/identity` `^4.0.0`.

---

## 5) `@mohsinonxrm/dataverse-sdk-xrm`

### 5.1 OrganizationService facade

- `class OrganizationService` (`new OrganizationService(client: DataverseClient, options?: OrganizationServiceOptions)`)
  - `create(entitySetName: string, entity: object, options?: CreateOptions): Promise<string>`; with `returnRepresentation: true`, `create<T = EntityRecord>(…): Promise<T>`
  - `retrieve<T = EntityRecord>(entitySetName: string, id: string, options?: RetrieveOptions): Promise<T>`
  - `update(entitySetName: string, id: string, entity: object, options?: UpdateOptions): Promise<void>`; with `returnRepresentation: true`, `update<T = EntityRecord>(…): Promise<T>`
  - `delete(entitySetName: string, id: string, options?: DeleteOptions): Promise<void>`
  - `retrieveMultiple<T = EntityRecord>(entitySetName: string, options?: RetrieveMultipleOptions): Promise<RetrieveMultipleResult<T>>`
  - `associate(entitySetName: string, id: string, relationship: string, relatedEntities: EntityReference[], options?: AssociateOptions): Promise<void>`
  - `disassociate(entitySetName: string, id: string, relationship: string, relatedId?: string, options?: DisassociateOptions): Promise<void>`
  - `whoAmI(options?: OperationOptions): Promise<{ UserId: string; BusinessUnitId: string; OrganizationId: string }>`
  - `assign(entityName: string, recordId: string, assigneeId: string, assigneeType?: "systemuser" | "team", options?: OperationOptions): Promise<void>`
  - `setState(entityName: string, recordId: string, stateCode: number, statusCode: number, options?: OperationOptions): Promise<void>`
  - `getEntitySetName(logicalName: string, options?: OperationOptions): Promise<string>`, `setEntitySetName(logicalName: string, entitySetName: string): void`
  - `execute<T>(request: Executable<T>, options?: OperationOptions): Promise<T>` _(the response type comes from the request)_

### 5.2 Types

- `interface EntityRecord` _(a record: `@odata.etag`, `@odata.context`, and `unknown` columns)_
- `interface OrganizationServiceOptions` (`entitySetNames`), `interface OperationOptions` (`signal`), `interface ExpandOption`
- `interface EntityReference`, `function createEntityReference(...)`, `function getEntitySetNameFromReference(...)`, `type EntityReferenceOptions`, `type WebApiEntityReference` _(re-exported from entities-runtime: one `EntityReference` for the whole SDK)_
- `interface CreateOptions`
- `interface RetrieveOptions`
- `interface RetrieveMultipleOptions`
- `interface RetrieveMultipleResult<T = EntityRecord>`
- `interface UpdateOptions`
- `interface DeleteOptions`
- `interface AssociateOptions`
- `interface DisassociateOptions`

---

## 6) `@mohsinonxrm/dataverse-sdk-messages`

> **Note**: All message classes are exported **directly** (no namespaces). Import individual message classes as needed.

### 6.1 Base classes and types

- `class OrganizationRequest` _(generic request: `new OrganizationRequest(messageName, parameters?, { boundTo? })` runs as a Web API action)_, `type OrganizationRequestOptions`
- `class OrganizationResponse` _(generic response)_
- `interface MessageRequest`
- `interface MessageResponse`
- `type EntityReference`, `function createEntityReference(...)`, `function getEntitySetNameFromReference(...)`, `type EntityReferenceOptions`, `type WebApiEntityReference` _(re-exported from entities-runtime)_
- `type EntityPayload<T>`, `type AnyEntityPayload` _(entity-typed parameters)_

### 6.2 Message exports (direct exports, no namespaces)

1,072 generated message pairs, one per Web API **action** of the platform, Sales and Customer Service in the committed `$metadata` snapshot (see [supported-messages.md](./mapping/supported-messages.md)), following the pattern:

- `<MessageName>Request`, with its parameters in a `<MessageName>RequestParameters` object
- `<MessageName>Response`, whose `result` is a `<MessageName>Result` (when the action returns something)

An action bound to several tables has one pair per binding (`AddItemCampaign_campaignRequest`, …).

Function-backed and CRUD messages (for example `WhoAmIRequest`) are not generated yet: see [Planned](#16-planned-not-exported-yet).

**Import pattern**:

```typescript
import {
  ExecuteWorkflowRequest,
  ExecuteWorkflowResponse,
} from "@mohsinonxrm/dataverse-sdk-messages";
```

**Example messages available** (non-exhaustive):

- `ExecuteWorkflowRequest`, `ExecuteWorkflowResponse`
- `WinOpportunityRequest`, `WinOpportunityResponse`
- `MergeRequest`, `MergeResponse`
- `ExportSolutionRequest`, `ExportSolutionResponse`
- `ImportSolutionRequest`, `ImportSolutionResponse`
- `PublishXmlRequest`, `PublishXmlResponse`
- `PublishAllXmlRequest`, `PublishAllXmlResponse`
- ... and about 1,060 more

### 6.3 Execution model

Message classes implement the `Executable<TResponse>` interface from `@mohsinonxrm/dataverse-sdk-core`, so they run through:

- `client.execute(messageRequest)` - Execute via DataverseClient
- `service.execute(messageRequest)` - Execute via OrganizationService

**Implementation details**:

- Each message class encapsulates its own HTTP request construction via `toRequestInformation()`
- Each message class handles its own response parsing via `parseResponse()`
- No routing table needed - self-contained request/response logic

---

## 7) `@mohsinonxrm/dataverse-sdk-batch`

### 7.1 Batch construction and execution

- `class BatchRequestBuilder` (`new BatchRequestBuilder(client: DataverseClient)`)
  - `addRequest(id, method, url, headers?, body?, dependsOn?)`, `beginChangeset()`, `endChangeset()`, `getTotalRequestCount()`, `encode(boundary)`, `execute(options?)`, `clear()`
  - `execute()` splits more than `batchSize` (default and maximum 1000) requests into several `$batch` requests, keeping change sets whole
- `interface BatchRequestStep`, `interface BatchChangeset`, `type BatchItem`
- `interface BatchExecutionOptions` (`continueOnError`, `batchSize`, `headers`)
- `function createBindManyExecutor()` _(lets `DataverseRequestBuilder.bindMany()` use `$batch`)_

### 7.2 Batch results and errors

- `interface BatchResponseStep<TBody = unknown>` _(`body` is `unknown` unless the caller names its type)_
- `interface BatchExecutionResult` (`responses`, `results`, `errors`, `success`, `skippedRequestIds`, `stoppedEarly`, counts)
- `class DataverseBatchError` _(re-exported from core, so `instanceof` works with either import; with `result`, `partErrors`, `requestErrors` and `totalRequests`)_, `interface DataverseBatchErrorInit`
- `function entityIdFromBatchResponse(part, options?)` _(the id a create in the batch made)_

### 7.3 Codec

- `function encodeBatchRequest(items, boundary, options?)`, `interface EncodeBatchOptions`, `const JSON_PART_CONTENT_TYPE`
- `function decodeBatchResponse(body, contentType)`, `interface BatchResponsePart<TBody = unknown>`, `function extractBoundary(contentType)`
- `function generateBoundary()`, `function generateChangesetBoundary()`

---

## 8) `@mohsinonxrm/dataverse-sdk-actions`

> Typed Web API **Actions** (POST) executed via `client.execute(action)`.

### 8.1 Generated actions

1,072 generated classes, one per action of the platform, Sales and Customer Service in the committed `$metadata` snapshot (see [supported-actions.md](./mapping/supported-actions.md)): `class <Name>Action implements Executable<<Name>Response>`, each with a `<Name>ActionParameters` interface when it has parameters, and its `<Name>Response` type (the value `client.execute()` resolves). An action bound to several tables has one class per binding. For example:

- `class ExecuteWorkflowAction`, `type ExecuteWorkflowResponse`
- `class WinOpportunityAction`, `type WinOpportunityResponse`

### 8.2 Helpers

- `function createEntityReference(...)`, `function getEntitySetNameFromReference(...)`, `type EntityReference`, `type EntityReferenceOptions`, `type WebApiEntityReference` _(re-exported from entities-runtime)_
- `type EntityPayload<T>`, `type AnyEntityPayload`
- The enums the actions use, as values (`AccessRights`, …)

---

## 9) `@mohsinonxrm/dataverse-sdk-functions`

> Typed Web API **Functions** (GET) executed via `client.execute(fn)`.

### 9.1 Generated functions

209 generated classes, one per function of the platform, Sales and Customer Service in the committed `$metadata` snapshot, except the query functions (9.2) (see [supported-functions.md](./mapping/supported-functions.md)): `class <Name>Function implements Executable<<Name>Response>`, with a `<Name>FunctionParameters` interface when it has parameters. A function bound to several tables has one class per binding (`RetrievePrincipalAccess_systemuserFunction`, …). For example:

- `class WhoAmIFunction`, `interface WhoAmIResponse`
- `class RetrieveMetadataChangesFunction`, `interface RetrieveMetadataChangesResponse`

### 9.2 Helpers

- `const queryFunctions`: one function per Web API query function (`lastXDays`, `in`, `under`, `equalUserId`, …, 71 in all), taking the `$metadata` parameters and returning the `$filter` expression as a string (#342). The query functions run only inside `$filter`, so they have no `Executable` class.
- `function createEntityReference(...)`, `function getEntitySetNameFromReference(...)`, `type EntityReference`, `type EntityReferenceOptions`, `type WebApiEntityReference` _(re-exported from entities-runtime)_
- The enums the functions use, as values (`EntityFilters`, …)

---

## 10) `@mohsinonxrm/dataverse-sdk-metadata`

> Strict typing for metadata (generated from v9.2 `$metadata`).

### 10.1 Generated types (flat exports)

The generated metadata **EntityTypes**, **ComplexTypes** and **EnumTypes** are exported directly from the package root (there is no `MicrosoftDynamicsCRM` namespace). For example:

- `EntityMetadata`, `AttributeMetadata`, `StringAttributeMetadata`, `Label`, … (read shapes)
- `EntityMetadataCreate`, `EntityMetadataUpdate`, and the other `*Create` / `*Update` variants where they exist
- `EntityQueryExpression`, `LabelQueryExpression`, `RetrieveMetadataChangesResponse`
- Enums such as `AttributeRequiredLevel`, `EntityFilters`, `OwnershipTypes`, `CascadeType`

> We intentionally do not list every generated type name here.

### 10.2 Metadata client

- `class MetadataClient` (`new MetadataClient(client: DataverseClient)`)
  - Entity, attribute, relationship and global option set CRUD (`getEntityDefinitions`, `createAttributeDefinition`, `createOneToManyRelationship`, `createGlobalOptionSet`, …). Creates return the `MetadataId` from `OData-EntityId`; creates and updates take an optional `MetadataWriteOptions` (`{ solutionUniqueName }`)
  - `mergeAndUpdateEntityDefinition(logicalName, changes, options?)`: retrieve, merge and `PUT` a table definition
  - Option value operations (`insertOptionValue`, `updateOptionValue`, `deleteOptionValue`, `orderOptions`, `insertStatusValue`)
  - `retrieveMetadataChanges(query, clientVersionStamp?, deletedMetadataFilters?)`: sends the `RetrieveMetadataChanges` function (GET) and returns `RetrieveMetadataChangesResponse`
  - Relationship eligibility: `canBeReferenced`, `canBeReferencing`, `canManyToMany` (actions, return `boolean`); `getValidReferencingEntities`, `getValidReferencedEntities`, `getValidManyToMany` (functions, return `string[]`)
- `interface MetadataQueryOptions`

Strict metadata builders (`const Metadata`) are [planned](#16-planned-not-exported-yet).

---

## 11) `@mohsinonxrm/dataverse-sdk-discovery`

### 11.1 Client

- `class DiscoveryClient` (`new DiscoveryClient(tokenProvider, options?)`)
  - `listOrganizations()`, `getOrganization()`, `getOrganizationByUrl()`, `getOrganizationsByRegion()`, `getEnabledOrganizations()`
- `interface DiscoveryClientOptions`
- `function toEnvironment(org: OrganizationDetail): DiscoveredEnvironment`

### 11.2 Types and clouds

- `interface OrganizationDetail` _(the Global Discovery Service v2.0 `Instances` shape)_
- `interface DiscoveredEnvironment`
- `interface DiscoveryResponse`, `interface DiscoveryOptions`, `interface DiscoveryRequestOptions`
- `const OrganizationState`
- `type DiscoveryCloud` (`"public" | "gcc" | "usg" | "dod" | "china"`), `const DISCOVERY_CLOUDS`, `interface DiscoveryCloudEndpoint`

---

## 12) `@mohsinonxrm/dataverse-sdk-entities-runtime`

> Tiny runtime used by generated early-bound entity output.

### 12.1 Types

- `interface IEntity`
- `interface EntityReference`, `type EntityReferenceOptions`, `type WebApiEntityReference` _(the SDK's one `EntityReference`; actions, functions, messages and xrm re-export it)_
- `interface EntityMetadata`, `interface AttributeMetadata`, `interface NavigationMetadata`
- `interface EntityOperationOptions`

### 12.2 Base classes and helpers

- `abstract class ActionBase<TResponse>`, `abstract class FunctionBase<TResponse>`
- `createEntityReference(logicalName, id, options?)` (`{ primaryIdAttribute?, entitySetName?, name? }`), `getEntitySetNameFromReference(reference)`, `isEntityReference(value)`, `isEntity(value)`
- `getODataType(entityMetadata)`, `getCollectionUrl(entityMetadata, baseUrl)`, `getEntityUrl(entityMetadata, id, baseUrl)`, `formatEntityForWrite(entity, entityMetadata, options?)`
- `formatParameterAlias(value, odataType, kind)`, `formatRecordPath(reference)`, `type ParameterKind` _(OData literals for generated functions)_

---

## 13) `@mohsinonxrm/dataverse-sdk-generator`

> CLI + programmatic API to generate early-bound entities into a consumer project.

### 13.1 CLI

- `bin` entry: `dataverse-gen` (commands `init`, `generate`, `validate`)

### 13.2 Programmatic API

- `function generateCode(config: DataverseGenConfig, accessToken?: string): Promise<void>`
- `interface DataverseGenConfig`, `const DEFAULT_CONFIG`, `type DataverseGenAuthConfig`
- `function createCliTokenProvider(...)`, `function acquireCliToken(...)`, `function dataverseScope(environmentUrl)`, `type CliAuthOptions` _(the CLI's device code / client credentials sign-in)_
- `class SchemaModel`, `class TypescriptGenerator`, `class MetadataService`
- Schema types: `EntityType`, `EnumType`, `EnumMember`, `ActionType`, `FunctionType`, `ComplexType`, `PropertyType`, `NavigationPropertyType`, `ParameterType`, `TypeScriptType`

---

## 14) `@mohsinonxrm/dataverse-sdk-files`

- `class FileColumnClient` (`new FileColumnClient(client: DataverseClient)`, or `new FileColumnClient(adapter: RequestAdapter, baseUrl?: string)` for your own adapter; the base URL is `client.getBaseUrl()`)
  - `upload(entitySetName, recordId, columnName, file: Blob | ArrayBuffer | ArrayBufferView | ReadableStream<Uint8Array>, fileName, options?): Promise<void>`
  - `download(entitySetName, recordId, columnName, options?): Promise<Blob>`
  - `downloadStream(entitySetName, recordId, columnName, options?): Promise<ReadableStream<Uint8Array>>`
  - `delete(entitySetName, recordId, columnName, options?: { signal?: AbortSignal }): Promise<void>`
- `interface FileUploadOptions`, `interface FileDownloadOptions`, `interface UploadProgress`, `interface DownloadProgress`, `type UploadMethod`, `type DownloadMethod`

---

## 15) Optional telemetry packages

### 15.1 `@mohsinonxrm/dataverse-sdk-appinsights` (Node.js only)

- `class ApplicationInsightsTelemetryClient implements TelemetryClient` (`new ApplicationInsightsTelemetryClient(config?)`)
- `interface ApplicationInsightsConfig`

### 15.2 `@mohsinonxrm/dataverse-sdk-otel`

- `class OpenTelemetryClient implements TelemetryClient` (`new OpenTelemetryClient(config?)`)
- `interface OpenTelemetryConfig`

---

## 16) Planned (not exported yet)

Earlier drafts of this document listed these. They don't exist in the packages today. The roadmap issue is [#100](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/100).

| API                                                                                  | Package     | Tracking                                                                   |
| ------------------------------------------------------------------------------------ | ----------- | -------------------------------------------------------------------------- |
| Circuit breaker and bulkhead middleware, and their client options                    | core        | [#100](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/100) |
| `const Metadata` strict builders (`Label`, `Attribute`, `Entity`, `Relationship`, …) | metadata    | [#100](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/100) |
| Function-backed and CRUD messages (`WhoAmIRequest`, `RetrieveEntityRequest`, …)      | messages    | [#100](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/100) |
| Browser Application Insights adapter                                                 | appinsights | [#158](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/158) |

Removed because the real API has a different shape (see the package sections above):

- `deviceCodeFlow()` / `clientCredentialsFlow()`: use `new MsalNodeTokenProvider(app, { flow: "deviceCode" | "clientCredentials", … })`.
- `generateEntities()` / `GenerateEntitiesOptions` / `GenerateEntitiesResult`: use `generateCode(config, accessToken?)`.
- `entity()`, `EntityDescriptor`, `EntityWithEtag`: the runtime exports `EntityMetadata`, `IEntity` and the helpers in §12.
- `BatchRequest`, `ChangeSet`, `BatchOptions`, `BatchResponse`: use `BatchRequestBuilder`, `BatchExecutionOptions`, `BatchExecutionResult` and `BatchResponseStep` (`BatchResponsePart` exists again, as the codec's decoded part, §7.3).
- `RetrieveMetadataChangesRequest` / `RetrieveMetadataChangesResponse` classes: use `MetadataClient.retrieveMetadataChanges()` or `RetrieveMetadataChangesFunction`; `RetrieveMetadataChangesResponse` is an interface.
- `namespace MicrosoftDynamicsCRM`: the metadata types are flat exports.
- `DiscoveredOrganization`, `type Cloud`: use `OrganizationDetail` / `DiscoveredEnvironment` and `DiscoveryCloud`.
- `createAppInsightsTelemetry()` / `createOpenTelemetryTelemetry()`: use `new ApplicationInsightsTelemetryClient()` / `new OpenTelemetryClient()`.
- `AsyncOperation` (actions): `ExecuteWorkflowAction` returns `ExecuteWorkflowResponse`.
- `AssignRequest` / `SetStateRequest` (messages): use `OrganizationService.assign()` / `setState()`.
- The `dataverse-sdk-generator` bin: the CLI is `dataverse-gen`.

---

## 17) Export style requirements

- All packages use **named exports** (best for tree-shaking)
- Messages package exports all request/response classes directly:
  ```typescript
  import {
    ExecuteWorkflowRequest,
    WinOpportunityRequest,
  } from "@mohsinonxrm/dataverse-sdk-messages";
  ```

---

## 18) Backward-compatibility expectations

- Adding new exports is a **minor** bump.
- Changing signatures/removing exports is **major**.
- Generated type names (metadata types, `<Name>Action`, `<Name>Function`, `<Name>Request` / `<Name>Response`) are stable; the set may expand but must not remove/rename existing exported names without a major bump.
