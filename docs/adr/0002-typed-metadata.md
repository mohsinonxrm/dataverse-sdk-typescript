## ADR 0002 — Strict Typed Metadata (Generated) + Read/Create/Update Split

**File:** `docs/adr/0002-typed-metadata.md`  
**Status:** Accepted  
**Date:** 2026-01-24  
**Decision Owners:** SDK maintainers

### Context

Dataverse metadata operations are performed via definition endpoints (EntityDefinitions, RelationshipDefinitions, GlobalOptionSetDefinitions) and use extensive inheritance across metadata entity types and complex/enum types. Metadata entity types like `AttributeMetadata` and derived types (`StringAttributeMetadata`, `LookupAttributeMetadata`, etc.) have stable documented schemas.

Create/update of column definitions requires sending a JSON payload with the appropriate `@odata.type` (e.g., `Microsoft.Dynamics.CRM.StringAttributeMetadata`) and strongly typed nested complex types (labels, managed properties, etc.).

Microsoft also highlights `RetrieveMetadataChanges` as an approach to query schema definitions via an object-based query (EntityQueryExpression) and to capture changes over time.

### Decision

1.  **Strict typing coverage:** Provide **strict TypeScript typings for all metadata** (EntityTypes + ComplexTypes + EnumTypes) required to perform metadata operations, but **not** for business entity record data (accounts/contacts/custom tables), which remains late-bound unless generated per org.
2.  **Source of truth:** Generate metadata typings from the Dataverse Web API **CSDL `$metadata`** for **v9.2** using a Dataverse environment with **Sales + Customer Service installed**. Actions/functions are defined in CSDL, and metadata entity types are reflected there.
3.  **Read vs Write split:**
    - `*Read` types model GET responses (including read-only fields),
    - `*Create` and `*Update` types model write payloads (only writable properties),
    - exclude “For internal use only” properties from write types.
4.  **No “internal use” in write surface:** Write types will not include internal-only fields to prevent invalid payload composition.
5.  **Typed builders:** `@mohsinonxrm/dataverse-sdk-metadata` includes builders that return **strict `*Create` / `*Update`** payload types (no extra properties).
6.  **Typed metadata client:** `dataverse-sdk-metadata` provides a `MetadataClient` that exposes strongly typed methods and endpoints for:
    - querying definitions,
    - retrieving by name/id,
    - create/update entity/attribute/relationship/optionsets,
    - `RetrieveMetadataChanges` (typed) support.
7.  **Type generation cadence:** Type generation is an **optional internal step** (manual/CI-on-demand), not required for every build.

### Consequences

- **Pros:** Developers get compile-time correctness for metadata payloads; avoids “guesswork” for metadata shapes; write payloads cannot include read-only/internal fields; aligns with the documented inheritance model and required `@odata.type` payload patterns.
- **Cons:** Initial investment in generator + split logic is non-trivial; requires a maintained typing environment; future Dataverse schema changes require regeneration (though expected to be infrequent).

### Alternatives considered

- **Handwritten typings:** Rejected due to drift risk and maintenance burden compared to generating from `$metadata`.
- **Loose typing + escape hatch:** Rejected because requirement is 100% strict typing and no guesswork for developers.
- **No Read/Write split:** Rejected because it allows invalid payload composition (write payloads including read-only/internal fields).
