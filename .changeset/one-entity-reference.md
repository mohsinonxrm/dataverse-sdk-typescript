---
"@mohsinonxrm/dataverse-sdk-entities-runtime": minor
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
"@mohsinonxrm/dataverse-sdk-xrm": minor
"@mohsinonxrm/dataverse-sdk-metadata": minor
---

One `EntityReference` for the whole SDK (#295).

The actions, functions, messages, entities-runtime and xrm packages each defined their own `EntityReference`, and the actions and messages ones each had their own `unique symbol` brand, so a reference from one package's `createEntityReference` didn't type-check where another package wanted one.

- **entities-runtime defines it:** `EntityReference`, `createEntityReference`, `getEntitySetNameFromReference`, `EntityReferenceOptions`, `WebApiEntityReference` and `isEntityReference`. It depends only on core, so every package can import it without a cycle.
- **actions, functions, messages and xrm import and re-export the same ones** (they now depend on entities-runtime), so existing imports keep working and a reference from any package is accepted by every package. The generator no longer writes an `EntityReference.ts` into actions, functions or messages; it writes the entity sets and primary keys `createEntityReference` reads to entities-runtime's `src/generated/entity-tables.ts` (the new `references` target).
- **Breaking: one signature,** `createEntityReference(logicalName, id, { primaryIdAttribute?, entitySetName?, name? })`. The display name is an option: `createEntityReference("contact", id, "Jane")` becomes `createEntityReference("contact", id, { name: "Jane" })`.
- **Breaking: always the Web API shape.** entities-runtime's and xrm's references were plain `{ logicalName, id, name?, entitySetName? }` objects. Now every reference is `{ "@odata.type", <primary key> }` with `logicalName`, `id`, `entitySetName` and `name` not enumerable, and `entitySetName` is filled in for the tables in the `$metadata` snapshot, so `formatEntityForWrite()` and `associate()` need no lookup for them.
- **Breaking: only `createEntityReference` makes one.** A hand-written `{ logicalName, id }` no longer type-checks as a function parameter, an xrm `associate()` reference or an entities-runtime lookup, and `isEntityReference()` (so `formatEntityForWrite()`) also requires `@odata.type`.
- **metadata:** `src/types` is regenerated from the committed `$metadata` snapshot by `regen`, and CI checks it like the other generated packages. The response types of operations the snapshot doesn't have are removed (`QuerySalesforceUnstructuredDataResponse`, `QueryZendeskUnstructuredArticlesResponse`, the Field Service `msdyn_…Response` types and others), the types the snapshot adds are new, and interface members are in name order.
