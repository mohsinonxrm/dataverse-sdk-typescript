---
"@mohsinonxrm/dataverse-sdk-metadata": patch
---

`retrieveMetadataChanges()`, `canBeReferenced()`, `canBeReferencing()` and `canManyToMany()` now reach Dataverse (#62, #63).

- **`retrieveMetadataChanges()` sends a GET.** `RetrieveMetadataChanges` is a Web API function, so the old POST got 404. The query goes as a JSON parameter alias (`GET /RetrieveMetadataChanges(Query=@p1,…)?@p1=<json>`), the version stamp as a string literal, and `DeletedMetadataFilters` as an enum literal (`"Default"`, `"All"`, a comma-separated list of names, or the numeric flag value). Numeric `FilterOperator` and `ConditionOperator` values are sent by name, because Dataverse rejects numbers there.
- **The eligibility checks send POST.** `CanBeReferenced`, `CanBeReferencing` and `CanManyToMany` are actions, so the old GET with a key predicate got 400. They now send `POST` with `{ "EntityName": "…" }` and still return a `boolean`.
- **Docs.** The README and `docs/api/metadata-operations.md` show the positional `(query, clientVersionStamp?, deletedMetadataFilters?)` signature, `{ Type, Value }` condition values, and the `boolean` and `string[]` return types.
