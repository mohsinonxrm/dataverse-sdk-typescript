---
"@mohsinonxrm/dataverse-sdk-generator": minor
---

Incremental generation (`"output": { "incremental": true }`) now reads only the tables whose metadata changed (#429). The stamp file keeps each table's metadata (as RetrieveMetadataChanges returned it, without its `null` properties) and the run's `ServerVersionStamp`; the next run reads `$metadata`, sends one RetrieveMetadataChanges request with that `ClientVersionStamp` and `DeletedMetadataFilters`, and reads again only the tables that changed or whose table or column was deleted. A run over unchanged metadata makes no per-table request.

- A table that uses a global choice whose option values changed is read again: the docs don't say RetrieveMetadataChanges lists such a table, so when a kept table uses a global choice the run also reads the global choices' option values (one `GlobalOptionSetDefinitions` request) and compares them.
- A deleted column's table is read again; a deleted table is gone from `$metadata` too, so it isn't generated and its files are deleted.
- Every table is read again when there is nothing to reuse: no stamp or one written before this version, another generator version, `environmentUrl` or `apiVersion`, or an expired version stamp (`ExpiredVersionStamp`, 0x80044352). If the changes request fails for another reason, every table is read again and a warning says why.
- `generateCode()` also returns `fetchedTables` (the tables whose metadata was read), and the CLI prints them. New: `MetadataService.getMetadataChanges()` and `getGlobalOptionSetValues()`, `SchemaModel.TableMetadata`, `MetadataVersionStamp`, `FetchedTables` and `SkippedTables`, and `AttributeMetadataDetail.MetadataId`.
- The stamp file is larger, since it keeps the metadata: it grows with the number of tables and columns generated, most with `"entities": []`.
