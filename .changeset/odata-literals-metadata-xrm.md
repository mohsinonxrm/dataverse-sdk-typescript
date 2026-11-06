---
"@mohsinonxrm/dataverse-sdk-metadata": patch
"@mohsinonxrm/dataverse-sdk-xrm": patch
---

Keys and literals are built with core's `odataKey` / `odataLiteral` (#53).

- **metadata.** The local key escaper is gone. Relationship `MetadataId` keys must be GUIDs, and `DeletedMetadataFilters` must be enum member names or numbers (comma-separated for several); anything else throws `DataverseInvalidRequestError` instead of reaching the URL.
- **xrm.** Record ids (including related ids and the `assign` owner bind) must be GUIDs, with or without braces, and a malformed one throws `DataverseInvalidRequestError` before a request is sent. `disassociate` with an empty `relatedId` is now rejected instead of removing the whole navigation reference. The `EntityDefinitions` lookup uses `odataKey`.
