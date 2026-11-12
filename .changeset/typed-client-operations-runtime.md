---
"@mohsinonxrm/dataverse-sdk-entities-runtime": minor
---

`EntitySetClient` gains record navigation, associate/disassociate, upsert, bound operations and paging (#432), each on top of core's request builder:

- `byId(key).nav(name)`: a `RelatedCollectionClient` for a collection-valued navigation property (`list()`, `iterate()`, `listPage()` typed by the related table, `associate()` through core's `associate()` / `bindMany()` with an optional `$batch` executor, `disassociate()`), or a `RelatedRecordClient` for a lookup (`get()`, `null` for an empty lookup; `set()` with `@odata.bind`; `clear()` with `DELETE $ref`). `byId(key).associate(name, target)` and `.disassociate(name, …)` do the same by name, typed so that only a collection takes several records or needs one to remove. A target is an id or alternate key of the related table (entity set from the generated metadata) or an `EntityReference`.
- `upsert(key, entity, { mode })`: `PATCH` without `If-Match` (`"createOnly"`: `If-None-Match: *`, `"updateOnly"`: `If-Match: *`), taking the columns valid in both a create and an update; resolves the id.
- `iterate(options)` (core's `iterate()`, with `pageSize` and `maxItems`) and `listPage(options)` (`{ records, nextLink, count }`; pass `nextLink` back for the next page).
- Bound actions and functions: a sixth type argument and the `operations` option (`{ record, collection }` of generated classes) add `byId(id).actions.<name>(parameters, requestOptions?)` / `.functions` and `actions` / `functions` on the set, typed from the classes' constructors and responses, run with `client.execute()`.

New exports: `RelatedCollectionClient`, `RelatedRecordClient`, `RelatedClient`, `EntitySetClientOptions`, `IterateRecordsOptions`, `ListPageOptions`, `RecordPage`, `UpsertMode`, `UpsertRecordOptions`, `UpsertEntity`, `AssociateTarget`, `AssociateTargets`, `AssociateOptions`, `DisassociateArguments`, `BoundOperations`, `OperationGroup`, `OperationClass`, `OperationClasses`, `NoOperationClasses`, `BoundOperationMethod`, `RecordOperationMethods`, `CollectionOperationMethods`. Existing code compiles as before: the new type arguments have defaults and the constructor option is optional.
