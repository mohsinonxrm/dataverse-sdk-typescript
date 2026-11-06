---
"@mohsinonxrm/dataverse-sdk-files": patch
---

`upload()` sends the `InitializeFileBlocksUpload` `Target` that Dataverse expects (#60).

- **Typed entity reference.** The `Target` was `{ "@odata.type": "Microsoft.Dynamics.CRM.EntityReference", "logicalName": "<entity set name>", "id": … }`, which Dataverse rejects with a 400 (`0x80048d19`), so no upload ever worked. It is now the documented `{ "@odata.type": "Microsoft.Dynamics.CRM.account", "accountid": "…" }`.
- **Table lookup.** `upload()` still takes the entity set name. The first upload to a table looks up its logical name and primary key (for example `email` and `activityid` for `emails`) with one `EntityDefinitions` request. The result is cached per `DataverseClient` (or adapter) and entity set; a failed lookup is not cached. An unknown entity set rejects with a `DataverseInvalidRequestError`, and a failed lookup with the parsed `DataverseODataError`, before the upload starts.
