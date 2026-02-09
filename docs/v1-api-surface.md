# v1-api-surface.md

> **Status**: Draft (Implementation Target)
>
> **Scope**: Minimal v1 _public_ API surface for `dataverse-sdk-typescript`.
>
> **Goal**: Enumerate **every exported symbol** (types, functions, classes, namespaces) per package that is intended to be public in **v1**.
>
> Notes:
>
> - This is an **API contract**. Changes require an ADR + SemVer discipline.
> - All packages are **ESM-only** and target **Node 18+** and modern browsers.
> - “Generated” exports (metadata types) are listed as stable namespaces/entrypoints rather than every individual generated type name.

---

## 1) `@mohsinonxrm/dataverse-sdk-core`

### 1.1 Client & request builder

- `class DataverseClient`
- `interface DataverseClientOptions`
- `class DataverseRequestBuilder`
- `interface RequestOptions`

### 1.2 Execution model (typed operations)

- `interface Executable<TResponse>`
  - `toRequestInformation(baseUrl: string): RequestInformation`
  - `parseResponse(response: Response): Promise<TResponse>`

### 1.3 HTTP request abstractions

- `type HttpMethod` (`"GET" | "POST" | "PATCH" | "PUT" | "DELETE"`)
- `interface RequestInformation`
- `interface RequestAdapter`
- `interface FetchProvider`

### 1.4 Auth adapter abstraction

- `interface AccessTokenProvider`
- `interface TokenOptions`

### 1.5 Middleware pipeline (public extension points)

- `interface Middleware`
- `type NextMiddleware`
- `interface MiddlewareContext`
- `interface RetryOptions`
- `interface ConcurrencyOptions`
- `interface CircuitBreakerOptions` _(optional middleware, v1-ready)_
- `interface BulkheadOptions` _(optional middleware, v1-ready)_

> Note: concrete middleware implementations are exported only if they are intended for user composition. Otherwise they remain internal.

### 1.6 Prefer helpers (typed)

- `type PreferOption`
- `const Prefer`
  - `Prefer.returnRepresentation()`
  - `Prefer.includeAnnotations(term)`
  - `Prefer.continueOnError()`

### 1.7 Logging & telemetry (interfaces only)

- `interface Logger`
- `interface TelemetryClient`

### 1.8 Errors

- `class DataverseError`
- `class DataverseODataError`
- `class DataverseThrottleError`
- `class DataverseBatchError`

### 1.9 Paging helpers

- `type PageResponse<T>` (`{ value: T[]; "@odata.nextLink"?: string }`)
- `class PageIterator<T>` _(or equivalent `iterate()` return type)_

---

## 2) `@mohsinonxrm/dataverse-sdk-auth-msal-browser`

### 2.1 Token provider

- `class MsalBrowserTokenProvider implements AccessTokenProvider`
- `interface MsalBrowserTokenProviderOptions`

### 2.2 Utilities

- `function createMsalBrowserProvider(options: MsalBrowserTokenProviderOptions): MsalBrowserTokenProvider` _(optional helper export)_

---

## 3) `@mohsinonxrm/dataverse-sdk-auth-msal-node`

### 3.1 Token provider

- `class MsalNodeTokenProvider implements AccessTokenProvider`
- `interface MsalNodeTokenProviderOptions`

### 3.2 Supported flows (exported helpers)

- `function deviceCodeFlow(options): MsalNodeTokenProvider`
- `function clientCredentialsFlow(options): MsalNodeTokenProvider`

> Additional flows (auth code + PKCE for Electron) may be added later without breaking v1.

---

## 4) `@mohsinonxrm/dataverse-sdk-xrm`

### 4.1 OrganizationService facade

- `class OrganizationService`
  - `create<T>(entitySetName: string, entity: Record<string, any>, options?: CreateOptions): Promise<string | T>`
  - `retrieve<T>(entitySetName: string, id: string, options?: RetrieveOptions): Promise<T>`
  - `update<T>(entitySetName: string, id: string, entity: Record<string, any>, options?: UpdateOptions): Promise<void | T>`
  - `delete(entitySetName: string, id: string, options?: DeleteOptions): Promise<void>`
  - `retrieveMultiple<T>(entitySetName: string, options?: RetrieveMultipleOptions): Promise<RetrieveMultipleResult<T>>`
  - `associate(entitySetName: string, id: string, relationshipName: string, relatedEntities: EntityReference[], options?: AssociateOptions): Promise<void>`
  - `disassociate(entitySetName: string, id: string, relationshipName: string, relatedEntityId: string, options?: DisassociateOptions): Promise<void>`
  - `setState(entityName: string, recordId: string, stateCode: number, statusCode: number): Promise<void>`
  - `execute<TRequest, TResponse>(request: TRequest): Promise<TResponse>` _(works with Executable<T> classes only)_

### 4.2 Types

- `interface EntityReference`
- `interface CreateOptions`
- `interface RetrieveOptions`
- `interface RetrieveMultipleOptions`
- `interface RetrieveMultipleResult<T>`
- `interface UpdateOptions`
- `interface DeleteOptions`
- `interface AssociateOptions`
- `interface DisassociateOptions`

---

## 5) `@mohsinonxrm/dataverse-sdk-messages`

> **Note**: All message classes are exported **directly** (no namespaces). Import individual message classes as needed.

### 5.1 Base classes and types

- `class OrganizationRequest` _(generic request escape hatch)_
- `class OrganizationResponse` _(generic response)_
- `interface MessageRequest`
- `interface MessageResponse`
- `type EntityReference`
- `function createEntityReference(logicalName: string, id: string): EntityReference`

### 5.2 Message exports (direct exports, no namespaces)

All 1,350+ generated message classes follow the pattern:

- `<MessageName>Request`
- `<MessageName>Response`

**Import pattern**:

```typescript
import { WhoAmIRequest, WhoAmIResponse } from "@mohsinonxrm/dataverse-sdk-messages";
import {
  ExecuteWorkflowRequest,
  ExecuteWorkflowResponse,
} from "@mohsinonxrm/dataverse-sdk-messages";
```

**Example messages available** (non-exhaustive):

- `WhoAmIRequest`, `WhoAmIResponse`
- `AssignRequest`, `AssignResponse`
- `SetStateRequest`, `SetStateResponse`
- `ExecuteWorkflowRequest`, `ExecuteWorkflowResponse`
- `WinOpportunityRequest`, `WinOpportunityResponse`
- `MergeRequest`, `MergeResponse`
- `ExportSolutionRequest`, `ExportSolutionResponse`
- `ImportSolutionRequest`, `ImportSolutionResponse`
- `PublishXmlRequest`, `PublishXmlResponse`
- `PublishAllXmlRequest`, `PublishAllXmlResponse`
- ... and 1,300+ more

### 5.3 Execution model

All message classes implement the `Executable<TResponse>` interface from `@mohsinonxrm/dataverse-sdk-core`, allowing them to be executed via:

- `client.execute(messageRequest)` - Execute via DataverseClient
- `service.execute(messageRequest)` - Execute via OrganizationService

**Usage example**:

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { ExecuteWorkflowRequest, createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

const service = new OrganizationService(client);

const request = new ExecuteWorkflowRequest(workflowId, recordId, {});
const response = await service.execute(request);
console.log(`Async operation: ${response.result.asyncoperationid}`);
```

**Implementation details**:

- Each message class encapsulates its own HTTP request construction via `toRequestInformation()`
- Each message class handles its own response parsing via `parseResponse()`
- No routing table needed - self-contained request/response logic

---

## 6) `@mohsinonxrm/dataverse-sdk-batch`

### 6.1 Batch construction

- `class BatchRequest`
- `class ChangeSet`
- `interface BatchOptions`
- `interface BatchExecuteOptions`

### 6.2 Batch results

- `interface BatchResponsePart<T = unknown>`
- `interface BatchResponse`

---

## 7) `@mohsinonxrm/dataverse-sdk-actions`

> Typed Web API **Actions** (POST) executed via `client.execute(action)`.

### 7.1 Minimal v1 typed actions

- `class ExecuteWorkflowAction implements Executable<AsyncOperation>`
- `class WinOpportunityAction implements Executable<void>`

### 7.2 Types

- `interface AsyncOperation` _(minimal typed shape for returned asyncoperation entity; may be expanded)_

---

## 8) `@mohsinonxrm/dataverse-sdk-functions`

> Typed Web API **Functions** (GET) executed via `client.execute(fn)`.

### 8.1 Minimal v1 typed functions

- `class WhoAmIFunction implements Executable<WhoAmIResponse>`

### 8.2 Types

- `interface WhoAmIResponse` _(Web API function response type)_

---

## 9) `@mohsinonxrm/dataverse-sdk-metadata`

> Strict typing for metadata only (generated from v9.2 `$metadata`).

### 9.1 Generated type entrypoints (stable exports)

- `namespace MicrosoftDynamicsCRM`
  - Contains **generated** Metadata **EntityTypes**, **ComplexTypes**, **EnumTypes**.
  - Types are split into:
    - `*Read` (GET)
    - `*Create` (POST)
    - `*Update` (PUT/PATCH)

> We intentionally do not list every generated type name here; the namespace is the contract.

### 9.2 Builders (strict)

- `const Metadata`
  - `Metadata.Label` helpers (e.g., `enUS(...)`)
  - `Metadata.Attribute.*` builders returning `*Create` / `*Update` types
  - `Metadata.Entity.*` builders returning `*Create` / `*Update` types
  - `Metadata.Relationship.*` builders returning `*Create` / `*Update` types
  - `Metadata.OptionSet.*` builders returning `*Create` / `*Update` types

### 9.3 Metadata client

- `class MetadataClient`

### 9.4 RetrieveMetadataChanges

- `class RetrieveMetadataChangesRequest`
- `class RetrieveMetadataChangesResponse`
- `type EntityQueryExpression` _(or generated complex type export under `MicrosoftDynamicsCRM`)_

---

## 10) `@mohsinonxrm/dataverse-sdk-discovery`

### 10.1 Client

- `class DiscoveryClient`
- `interface DiscoveryClientOptions`

### 10.2 Types

- `interface DiscoveredOrganization`
- `type Cloud = "Commercial"` _(v1 only)_

---

## 11) `@mohsinonxrm/dataverse-sdk-entities-runtime`

> Tiny runtime used by generated early-bound entity output.

### 11.1 Entity descriptors

- `interface EntityDescriptor`
- `function entity(descriptor: EntityDescriptor): EntityDescriptor`

### 11.2 Utility types

- `type EntityWithEtag<T>`
- `interface EntityReference`

---

## 12) `@mohsinonxrm/dataverse-sdk-generator`

> CLI + programmatic API to generate early-bound entities into a consumer project.

### 12.1 CLI

- `bin` entry: `dataverse-sdk-generator`

### 12.2 Programmatic API

- `function generateEntities(options: GenerateEntitiesOptions): Promise<GenerateEntitiesResult>`
- `interface GenerateEntitiesOptions`
- `interface GenerateEntitiesResult`

---

## 13) Optional telemetry packages (v1+)

### 13.1 `@mohsinonxrm/dataverse-sdk-appinsights`

- `function createAppInsightsTelemetry(connectionString: string): TelemetryClient`

### 13.2 `@mohsinonxrm/dataverse-sdk-otel`

- `function createOpenTelemetryTelemetry(tracer: unknown): TelemetryClient`

---

## 14) Export style requirements

- All packages use **named exports** (best for tree-shaking)
- Messages package exports all request/response classes directly:
  ```typescript
  import { WhoAmIRequest, ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";
  ```

---

## 15) Backward-compatibility expectations (v1)

- Adding new exports is a **minor** bump.
- Changing signatures/removing exports is **major**.
- Generated metadata namespace contract (`MicrosoftDynamicsCRM`) is stable; internal contents may expand but must not remove/rename existing exported type names without major bump.
