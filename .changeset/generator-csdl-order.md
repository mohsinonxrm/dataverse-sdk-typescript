---
"@mohsinonxrm/dataverse-sdk-generator": patch
---

`dataverse-gen` writes a table's columns and navigation properties, and a complex type's properties, in name order. They followed the order of the org's `$metadata`, which isn't fixed from one request to the next, so two runs over the same schema could write different files, and incremental generation (`output.incremental`) saw every table as changed. A column a table declares itself still wins over an inherited one of the same name.
