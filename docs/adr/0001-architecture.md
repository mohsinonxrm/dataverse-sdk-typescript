## ADR 0001 — Monorepo Architecture & Core SDK Design

**File:** `docs/adr/0001-architecture.md`  
**Status:** Accepted  
**Date:** 2026-01-24  
**Decision Owners:** SDK maintainers

### Context

We are building a TypeScript SDK for Microsoft Dataverse (Online only) that is usable in both Node and browsers with **ESM-only** distribution and **Node 18+** baseline (native `fetch`). We need a resilient and scalable HTTP client that follows a **Graph SDK–like architecture** with middleware policies (retry, throttling awareness, concurrency control, circuit breaker/bulkhead optional), and exposes two developer entry points: a fluent HTTP/OData front door and a C#-familiar OrganizationService-style front door.

Dataverse publishes a recommended **degree of parallelism** via the `x-ms-dop-hint` response header and recommends using it rather than guessing a fixed concurrency level. Service protection limits include concurrency enforcement and return specific errors when exceeded, so the SDK must include throttling/resiliency guidance and controls.

Dataverse supports `$batch` operations with **up to 1000** individual requests per batch, including transactional **change sets** (equivalent to ExecuteMultiple / ExecuteTransaction semantics).

### Decision

1.  **Monorepo + packages:** Use a monorepo (pnpm workspaces + changesets) publishing packages under `@mohsinonxrm/dataverse-sdk-*`.
2.  **Core client:** Implement `@mohsinonxrm/dataverse-sdk-core` as the smallest stable layer providing:
    - Fetch-based request adapter (Node 18+ + browsers).
    - Middleware pipeline (Graph-style): auth adapter, OData headers, retry, concurrency limiter, telemetry/logging, optional circuit breaker/bulkhead.
    - Fluent request builder `client.api(path)` supporting full OData query options (select/filter/expand/orderby/top/skip/count/search/apply), Prefer header helpers, paging helpers (single page by default).
3.  **Two front doors:**
    - **HTTP/OData fluent API** in `dataverse-sdk-core` (for web/node developers).
    - **OrganizationService facade** in `@mohsinonxrm/dataverse-sdk-xrm` (for C# Dataverse developers), implemented on top of the core HTTP execution primitives.
4.  **Typed Web API operations:** Implement separate packages:
    - `@mohsinonxrm/dataverse-sdk-actions` for typed Web API actions (POST).
    - `@mohsinonxrm/dataverse-sdk-functions` for typed Web API functions (GET).  
      Typed actions/functions are executed from the client via `client.execute(executableRequest)` to avoid error-prone `isFunction:boolean` flags.
5.  **Resiliency defaults:**
    - Retry transient failures: `429` and `>=502`, honoring `Retry-After` and using exponential backoff with jitter.
    - Adaptive global concurrency using `x-ms-dop-hint` when present; otherwise conservative defaults; user override allowed but bounded.
6.  **Batching:** Provide `$batch` + changeset support in `@mohsinonxrm/dataverse-sdk-batch` with:
    - auto-splitting into several `$batch` requests of at most `batchSize` (default 1000) without splitting a change set,
    - hard cap at 1000 per Dataverse limit, and change set support.
    - (Updated in v1.2.0: the default was planned as 10 but never used; the default is now the Dataverse limit.)

### Consequences

- **Pros:** Clean separation of concerns; stable core; extensible middleware; two onboarding paths; scalable defaults aligned to Dataverse guidance; safe typed invocation of actions/functions without user-specified operation type.
- **Cons:** More packages to maintain; documentation must clearly guide when to use fluent API vs actions/functions vs org/messages; middleware complexity requires good defaults and presets.

### Alternatives considered

- **Single monolithic package:** Rejected due to bundling cost, slower iteration, and coupling concerns.
- **Only one front door:** Rejected because adoption requires both Dataverse/C# familiarity and modern JS ergonomics.
- **No adaptive concurrency:** Rejected because Microsoft explicitly recommends using `x-ms-dop-hint` to avoid unnecessary throttling.
