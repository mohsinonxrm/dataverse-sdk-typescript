## ADR 0003 — Typed Actions & Typed Functions (Client-Side Executables)

**File:** `docs/adr/0003-actions-functions.md`  
**Status:** Accepted  
**Date:** 2026-01-24  
**Decision Owners:** SDK maintainers

### Context

Dataverse Web API supports named operations via **actions** and **functions** defined in the CSDL `$metadata`. Actions represent operations with side effects and are invoked using **POST**. Functions represent operations without side effects and are invoked using **GET**, with Microsoft recommending **parameter aliases** when passing parameters to avoid URL limits and encoding pitfalls.

Some actions/functions are bound to entity types; for example, `ExecuteWorkflow` is a bound action on the `workflow` entity and returns an `asyncoperation`.

We must avoid a design where callers specify operation type with error-prone flags (e.g., `isFunction: boolean`) because it is easy to mis-classify operations and cause runtime failures.

### Decision

1.  **Separate packages:**
    - `@mohsinonxrm/dataverse-sdk-actions` for typed action requests,
    - `@mohsinonxrm/dataverse-sdk-functions` for typed function requests.
2.  **Executable request contract:** Both action and function requests implement a shared `Executable<TResponse>` interface consumable by `dataverse-sdk-core` via `client.execute(request)`.
3.  **No user-specified operation type:** The request class itself determines:
    - HTTP method (POST for actions, GET for functions),
    - URL path (bound vs unbound),
    - parameter serialization (query aliases for functions),
    - response parsing into the typed response.
4.  **Initial scope:** Start with a minimal “common operations” set to validate architecture, docs, and samples; expand toward full coverage before v1 release if desired.
5.  **Capability-based docs:** Maintain “supported actions/functions” lists and show how to call unsupported operations using raw `client.api(...)` until typed wrappers are added.

### Consequences

- **Pros:** Strongly typed, safe invocation; no `isFunction` mistakes; clear client-side story for web/node developers; consistent with Dataverse definition of actions/functions and their invocation rules.
- **Cons:** Requires ongoing work to cover more actions/functions; requires strong documentation and lists; bound operation variants can multiply quickly.

### Alternatives considered

- **Single “operations” package for actions+functions:** Rejected per requirement to keep them separate and because their invocation rules differ (POST vs GET, payload vs query aliases).
- **Raw `.api()` only:** Rejected because typed wrappers are a core usability goal and should prevent common mistakes.
- **Expose `operationType` boolean/enum:** Rejected because it reintroduces user error; the type system should enforce correct invocation.
