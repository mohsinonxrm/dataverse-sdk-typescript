---
"@mohsinonxrm/dataverse-sdk-generator": minor
"@mohsinonxrm/dataverse-sdk-entities-runtime": minor
---

Typed request builders per entity set, Graph (Kiota) style (#312).

- **entities-runtime**: `EntitySetClient<TEntity, TCreate, TUpdate, TColumn>` (`byId(key)`, `list({ select, expand, filter, orderBy, top, maxItems })`, `create(entity)`, `query()`) and `EntityRecordClient` (`get({ select, expand })`, `update(entity, { etag })`, `delete({ etag })`, `request()`), built on core's request builder. Writes go through `formatEntityForWrite()`; `update()` sends `If-Match: *` (or the etag) so it never creates a record; `byId()` takes a GUID or an alternate key. Option types: `GetRecordOptions`, `ListRecordsOptions`, `WriteRecordOptions`.
- **generator**: `"typedClient": true` generates `client.ts` with `createTypedClient(client)` → `TypedDataverseClient`, one `EntitySetClient` per generated table keyed by entity set name (`typed.accounts.byId(id).get({ select: ["name"] })`), typed by the table's interface, `<Entity>Create`, `<Entity>Update` and a generated `<Entity>Column` union. `DataverseGenConfig` has `typedClient`; `TEMPLATE_NAMES` includes `client.ejs`.
