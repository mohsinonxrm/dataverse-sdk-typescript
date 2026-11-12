---
"@mohsinonxrm/dataverse-sdk-generator": minor
---

dataverse-gen writes more column constraints into each table's metadata for `validateEntity()` (#433):

- `precision` for decimal and currency columns. A currency column's comes from its `PrecisionSource`: its own `Precision` (`precision: 2`), the organization's pricing decimal precision (`precision: "pricing"`) or the precision of the record's transaction currency (`precision: "currency"`). Floating point columns get none.
- `maxSizeInKB` for file and image columns.
- `optionStates` for the status reason column: the state (`statecode` value) of each status reason, e.g. `optionStates: {"1":0,"2":1}`.

`RetrieveMetadataChanges` now also asks for `PrecisionSource` and `MaxSizeInKB`. A table without such columns is written as before; one with them changes only by these lines. Dates need nothing new: a date-only column is already the one whose `odataType` is `Edm.Date`.
