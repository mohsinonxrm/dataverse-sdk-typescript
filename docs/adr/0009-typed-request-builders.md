## ADR 0009 — Typed Per-Entity-Set Request Builders (Generated, Opt-In)

**File:** `docs/adr/0009-typed-request-builders.md`  
**Status:** Accepted  
**Date:** 2026-11-07  
**Decision Owners:** SDK maintainers  
**Issue:** #312

### Context

The core client is string-based: `client.api("accounts(<id>)").select("name").get<T>()`. The Graph
SDKs generated with Kiota offer a typed path per entity set (`client.users.byUserId(id).get()`)
instead. #312 asked what the SDK already supports and to fill the gap.

What already existed before this decision:

- core's `DataverseRequestBuilder`: every OData query option, `Prefer`, `If-Match`, paging
  (`getAll`, `iterate`), `createAndGetId`, impersonation, `odataKey()` for ids and alternate keys;
- `dataverse-gen`: per-table interfaces (`Account`), `<Entity>Create` / `<Entity>Update` (#347),
  `AccountMetadata` and `EntityMetadataCache`;
- entities-runtime: `formatEntityForWrite()` (lookups as `EntityReference` → `@odata.bind`).

The SDK can't ship typed builders for business tables itself: each org has different tables and
columns, so the types must come from the org's metadata, i.e. from `dataverse-gen`.

### Decision

1. **Generated, opt-in.** `"typedClient": true` makes `dataverse-gen` write `client.ts`:
   `createTypedClient(client)` returns a `TypedDataverseClient` with one `EntitySetClient` per
   generated table, keyed by entity set name (`typed.accounts`, `typed.contoso_widgets`). Without
   the option nothing changes.
2. **Generic runtime classes, thin generated code.** The behaviour lives in entities-runtime:
   `EntitySetClient<TEntity, TCreate, TUpdate, TColumn>` (`byId`, `list`, `create`, `query`) and
   `EntityRecordClient` (`get`, `update`, `delete`, `request`). The generated file only binds the
   type arguments and the metadata, so generated output stays small and the behaviour is unit-tested
   once, not per org.
3. **Built on core's request builder.** Each method is a few calls on `client.api(...)`;
   `query()` / `request()` hand out the builder for anything not covered (`$apply`, `$count`,
   `Prefer`, impersonation, `fetchXml`, `iterate`, …), so the typed path never blocks a request.
4. **Typed by the generated types:** `get` / `list` resolve `TEntity` (`Account`); `create` takes
   `TCreate` (`AccountCreate`), `update` takes `TUpdate` (`AccountUpdate`), so read-only columns
   are compile errors; `select` takes `TColumn`, a generated union of the table's property names
   (`AccountColumn`), because `keyof Account` is `string` (the `IEntity` index signature).
5. **Write semantics:** writes go through `formatEntityForWrite()` with the generated
   `EntityMetadataCache`. `update()` sends `If-Match: *` (or a given `etag`), so an update never
   becomes an upsert; `delete()` sends `If-Match` only for an `etag`. `create()` returns the id
   (`createAndGetId`, with the primary key for `return=representation`).
6. **Keys:** `byId()` takes what core's `odataKey()` takes: a GUID (braces and case normalized)
   or an alternate key object (`{ accountnumber: "A-1" }`).
7. **`list()` returns every page** (following `@odata.nextLink`) unless `top` or `maxItems`
   bounds it, like core's `getAll`.

### Not in this first version (follow-ups)

- `expand` is `string[]`, not a typed union of navigation properties, and `select` doesn't narrow
  the result type (`Pick<Account, …>`).
- Navigation from a record (`typed.accounts.byId(id).contact_customer_accounts.list()`),
  associate/disassociate, `upsert()`, and bound actions/functions on the builders
  (`typed.accounts.byId(id).contoso_Recalculate(...)`).
- `iterate()` (async iteration) and a single-page `listPage()`; today they're reachable through
  `query()`.
- Builders for the SDK's own `$metadata` snapshot tables without running the generator.

### Consequences

- Apps that generate types get a typed, discoverable path for CRUD with no new transport
  behaviour: everything still goes through `DataverseClient`, its middleware and errors.
- entities-runtime gains a runtime dependency on core's client types it already had (it imports
  core for errors); the new classes are in their own module and tree-shake out when unused.
- `client.ts` imports every generated table's metadata; in all-tables mode it's large, which is why
  the option is off by default.
