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
- **Coverage gaps.** Messages are generated from the Web API's actions only. Function-backed and CRUD messages (`WhoAmIRequest`, `RetrieveEntityRequest`, `RetrievePrincipalAccessRequest`, Associate/Disassociate, ExecuteMultiple/ExecuteTransaction) are planned (#100); use the functions package, `OrganizationService` or the batch package instead.
- **Parameters.** Request constructors take one object with the parameters by name, kept in `OrganizationRequest.Parameters` (#96), and `response.result` is the value the action of the same name resolves (#300).

### Consequences

- **Pros:** Familiar for C# Dataverse developers; complete message contracts; safe escape hatch via generic OrganizationRequest; clear mapping to Web API actions/functions and CRUD semantics; direct imports provide better tree-shaking and IDE autocomplete; all messages implement Executable<T> for consistent execution pattern.
- **Cons:** Implementation workload grows with message coverage (1,356+ messages generated); must keep mapping docs up to date; some messages depend on installed first-party solutions and may not exist in all tenants (must handle capability checks gracefully); no namespace grouping means developers must know exact message name.

### Alternatives considered

- **Only Web API actions/functions:** Rejected because .NET developer expectations and module-specific message usage are a primary adoption driver.
- **Only generic OrganizationRequest:** Rejected because typed message classes improve correctness and discoverability.
- **Use namespaces (CrmSdkMessages._, XrmSdkMessages._):** Rejected in favor of direct exports for better tree-shaking, simpler imports, and alignment with modern ESM patterns. The message naming convention (`<MessageName>Request`) provides sufficient discoverability without namespace containers.
