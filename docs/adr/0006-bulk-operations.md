## ADR 0006 — Bulk Operations Strategy

**File:** `docs/adr/0006-bulk-operations.md`  
**Status:** Accepted  
**Date:** 2026-01-25  
**Decision Owners:** SDK maintainers

### Context

Dataverse provides two distinct patterns for bulk data operations:

1. **$batch operations** (OData standard):
   - Multipart/mixed HTTP format
   - Supports mixed operation types (GET, POST, PATCH, DELETE)
   - Transactional change sets (all succeed or all fail)
   - Content-ID references between operations
   - Maximum 1000 requests per batch

2. **Bulk operation actions** (Dataverse-specific):
   - `CreateMultiple`, `UpdateMultiple`, `UpsertMultiple`, `DeleteMultiple`
   - Simple JSON array payloads with `@odata.type` annotations
   - Standard tables: atomic (all-or-nothing), 100-1000 records recommended
   - Elastic tables: partial success possible, up to 100 records recommended
   - Returns immediate response (not queued)

Microsoft introduced bulk operations as a simpler alternative to $batch for common scenarios. Developers coming from .NET SDK are familiar with ExecuteMultiple (message-based), while web developers expect modern batch APIs.

### Decision

1. **Support both patterns in v1.0:**
   - $batch via `@mohsinonxrm/dataverse-sdk-batch` (Phase 3)
   - Bulk operations via typed actions in `@mohsinonxrm/dataverse-sdk-actions` (Phase 7)

2. **Bulk operation actions to implement:**
   - `CreateMultipleAction` — Bulk create, returns `{ Ids: string[] }`
   - `UpdateMultipleAction` — Bulk update, returns 204 No Content
   - `UpsertMultipleAction` — Bulk upsert, returns `{ Results: UpsertResponse[] }`
   - `DeleteMultipleAction` — Bulk delete (elastic tables only), returns 204 No Content

3. **API surface:**

   ```typescript
   import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

   const response = await client.execute(
     new CreateMultipleAction("accounts", {
       Targets: [
         { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Contoso" },
         { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Fabrikam" },
       ],
     })
   );
   // response.Ids: string[]
   ```

4. **When to use bulk operations vs $batch:**

   **Use bulk operations when:**
   - Single entity type, single operation type (all creates or all updates)
   - 100-1000 records (standard tables) or up to 100 (elastic tables)
   - Need simple API with minimal setup
   - Want immediate response

   **Use $batch when:**
   - Mixed operation types (creates + updates + deletes)
   - Cross-entity operations with references (create account → create contacts)
   - Need transactional semantics across different entities
   - Want to bundle unrelated operations to reduce HTTP requests
   - Need Content-ID references

5. **Validation and error handling:**
   - Validate `@odata.type` is present for all entities
   - For elastic tables with `Prefer: odata.include-annotations=Microsoft.PowerApps.CDS.ErrorDetails.*`:
     - Parse per-entity errors from response
     - Return partial success information
   - For standard tables:
     - Atomic failure (entire operation fails on first error)
     - Return single error response

6. **Documentation requirements:**
   - Document table compatibility (query sdkmessagefilters to detect support)
   - Provide decision matrix (bulk operations vs $batch)
   - Show elastic vs standard table differences
   - Include performance guidance (batch size recommendations)

### Status update (2026-11-07, 2.0.0)

- **Implemented:** the four bulk actions (and their messages), which take the entity set first: `new CreateMultipleAction("accounts", { Targets })` posts to `/accounts/Microsoft.Dynamics.CRM.CreateMultiple` (#69). `$batch` with change sets, `continueOnError` and auto-splitting is in `@mohsinonxrm/dataverse-sdk-batch`.
- **Implemented (#310):** `createMultiple()` / `updateMultiple()` in `@mohsinonxrm/dataverse-sdk-batch` chunk the records, add `@odata.type` to every target that lacks it, parse elastic-table partial success from `Microsoft.PowerApps.CDS.ErrorDetails.*` into per-record results (decision 5), and can send the records with `$batch` instead (`strategy: "batch"`).
- **Implemented (#346):** `getBulkOperationSupport()` in `@mohsinonxrm/dataverse-sdk-batch` detects which tables support bulk operations through `sdkmessagefilters` and the table's `TableType` (decision 6), cached per client and table; the helpers use it with `strategy: "auto"` to choose between the bulk message and `$batch`.

### Consequences

**Pros:**

- Developers have choice: simple bulk operations or powerful $batch
- Modern API aligned with Dataverse latest capabilities
- Performance optimization for common scenarios (bulk creates/updates)
- Type-safe with `@odata.type` validation

**Cons:**

- Two similar but distinct patterns may confuse users
- Requires clear documentation on when to use each
- Elastic table vs standard table differences add complexity
- Not all tables support bulk operations (must detect capability)

### Alternatives Considered

**Only $batch:** Rejected because bulk operations provide simpler API for common scenarios and better performance characteristics for single-entity operations.

**Only bulk operations:** Rejected because $batch provides essential transactional semantics and cross-entity reference capabilities that bulk operations cannot.

**Combine into single API:** Rejected because the underlying HTTP patterns are fundamentally different (multipart/mixed vs JSON array) and attempting to unify would hide important differences.
