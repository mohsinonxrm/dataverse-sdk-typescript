## ADR 0004 — Messages (direct exports) + Generic OrganizationRequest

**File:** `docs/adr/0004-messages.md`  
**Status:** Accepted  
**Date:** 2026-01-24  
**Decision Owners:** SDK maintainers

### Context

Dataverse is fundamentally message-based; many Organization Service messages map to Web API actions/functions, while CRUD messages map to HTTP verbs (GET/POST/PATCH/DELETE). Microsoft explains that the organization service defines operations as messages and the Web API exposes many as functions or actions, with CRUD implemented via HTTP methods.

Some messages are module-specific (Sales/Customer Service). For example, `WinOpportunityRequest` maps to the `WinOpportunity` Web API action for opportunities. `ExecuteWorkflowRequest` maps to the `ExecuteWorkflow` Web API action (bound to workflow) which returns an `asyncoperation`.

Developers coming from .NET expect:

- message classes grouped as in the .NET SDK (CrmSdk vs XrmSdk namespaces; see the decision below for why this SDK does not use them),
- request/response pairs,
- a generic `OrganizationRequest` escape hatch when a message isn’t strongly typed.

### Decision

1.  **Messages package:** Provide `@mohsinonxrm/dataverse-sdk-messages` exporting **all message request/response classes directly** (no namespaces). Import pattern:
    ```typescript
    import { ExecuteWorkflowRequest, MergeRequest } from "@mohsinonxrm/dataverse-sdk-messages";
    ```
    All 1,356+ message classes follow the `<MessageName>Request` / `<MessageName>Response` naming convention, making them easy to discover and import.
2.  **Request/Response parity:** For each implemented message, implement both:
    - `*Request` (parameters and mapping)
    - `*Response` (complete response contract as documented),
      not “headline-only” responses.
3.  **Complete message set:** Implement all 1,356+ messages generated from Dataverse metadata (Sales + Customer Service modules installed). All messages available in v1.0.
4.  **Generic request support:** Include `OrganizationRequest` / `OrganizationResponse` types for custom actions/custom APIs or unimplemented messages, matching .NET patterns.
5.  **Execution surface:** All messages implement `Executable<T>` interface and execute via:
    - `OrganizationService.execute(request)` (in `dataverse-sdk-xrm`)
    - `client.execute(request)` (in `dataverse-sdk-core`)
      Both execution paths use the same middleware pipeline and HTTP adapter.
6.  **Mapping documentation:** Maintain `docs/mapping/message-to-webapi.md` describing:
    - message ↔ Web API action/function mapping when it exists,
    - fallback to HTTP CRUD when it does not,
    - bound/unbound invocation and examples
7.  **OptionSet values:** Message constructors and properties take plain `number` values for choice fields (for example `new WinOpportunityRequest({ OpportunityClose: opportunityClose, Status: 3 })`), matching the Web API wire format. An `OptionSetValue`-style `{ Value }` wrapper is not implemented; responses match documented contracts.

### Status update (2026-11-07, 2.0.0)

- **Message set (decisions 1 and 3).** The 1,356 messages are the 1.0.0 set. In 2.0.0 the messages are generated from a committed `$metadata` snapshot (#293) and cover the platform, Sales and Customer Service (#304); `docs/mapping/supported-messages.md` lists them. For other operations use `OrganizationRequest`, or generate classes with `dataverse-gen`.
- **Function-backed messages (#344).** Messages are generated from the Web API's actions and functions. A function's message (`WhoAmIRequest`, `RetrieveEntityRequest`, `RetrievePrincipalAccess_systemuserRequest`, …) sends the same `GET` with parameter aliases as the functions package's class (one generator implementation, `tools/generate-sdk-types/src/utils/function-request.ts`), takes its parameters as one object kept in `Parameters`, and `response.result` is the function's value. The `$filter` query functions (`LastXDays`, …) have no message. An overloaded function has one message per binding (`RetrievePrincipalAccess_systemuserRequest`, `_teamRequest`), as in the functions package, rather than one `RetrievePrincipalAccessRequest`. The generator refuses two operations (or an operation and a hand-written message) with the same message name.
- **CRUD and batch messages (#344).** `CreateRequest`, `RetrieveRequest`, `UpdateRequest`, `DeleteRequest`, `AssociateRequest`, `DisassociateRequest`, `RetrieveMultipleRequest` (FetchXML), `ExecuteMultipleRequest` and `ExecuteTransactionRequest` aren't in the CSDL, so they are hand-written, in `packages/dataverse-sdk-messages/src/handwritten` (the generator keeps the folder and re-exports it from the index). A record is an `EntityReference`; a new record is the Web API payload with `@odata.type`. Each response has `result`, plus the .NET property name (`CreateResponse.id`, `RetrieveResponse.Entity`, `RetrieveMultipleResponse.EntityCollection`, `ExecuteMultipleResponse.Responses` / `IsFaulted`, `ExecuteTransactionResponse.Responses`).
- **Where ExecuteMultiple and ExecuteTransaction live (#344).** In the messages package, where .NET developers look for them, built on the batch package's codec (`encodeBatchRequest`, `decodeBatchResponse`): `@mohsinonxrm/dataverse-sdk-messages` depends on `@mohsinonxrm/dataverse-sdk-batch`, which depends only on core. So the dependency goes one way, messages → batch → core, and batch must never depend on messages (it takes any `Executable`, never a message class). Putting them in the batch package instead would have made batch depend on messages (for `OrganizationRequest`) and kept them out of the messages import. Each request runs through its own `toRequestInformation()` / `parseResponse()`, so any message or action/function class can be one. ExecuteMultiple sends one part per request (`Prefer: odata.continue-on-error` for `ContinueOnError`); ExecuteTransaction sends one change set and rejects with the failed request's error. Dataverse answers a `$batch` that stopped at a failure with that failure's status, so core's `Executable` has an optional `parsesErrorResponses` flag: `client.execute()` then passes the error response to `parseResponse` instead of rejecting.
- **Parameters.** Request constructors take one object with the parameters by name, kept in `OrganizationRequest.Parameters` (#96), and `response.result` is the value the action of the same name resolves (#300).

### Consequences

- **Pros:** Familiar for C# Dataverse developers; complete message contracts; safe escape hatch via generic OrganizationRequest; clear mapping to Web API actions/functions and CRUD semantics; direct imports provide better tree-shaking and IDE autocomplete; all messages implement Executable<T> for consistent execution pattern.
- **Cons:** Implementation workload grows with message coverage (1,356+ messages generated); must keep mapping docs up to date; some messages depend on installed first-party solutions and may not exist in all tenants (must handle capability checks gracefully); no namespace grouping means developers must know exact message name.

### Alternatives considered

- **Only Web API actions/functions:** Rejected because .NET developer expectations and module-specific message usage are a primary adoption driver.
- **Only generic OrganizationRequest:** Rejected because typed message classes improve correctness and discoverability.
- **Use namespaces (CrmSdkMessages._, XrmSdkMessages._):** Rejected in favor of direct exports for better tree-shaking, simpler imports, and alignment with modern ESM patterns. The message naming convention (`<MessageName>Request`) provides sufficient discoverability without namespace containers.
