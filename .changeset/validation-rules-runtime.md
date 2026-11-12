---
"@mohsinonxrm/dataverse-sdk-entities-runtime": minor
---

`validateEntity()` checks more (#433), with new issue codes:

- `precision`: more decimal places than a decimal or currency column keeps. A column's metadata has `precision: number`, or, for a currency column whose `PrecisionSource` is the organization's pricing precision or the record currency's precision, `precision: "pricing"` or `"currency"`; those are checked only when you pass the number as the new `pricingPrecision` / `currencyPrecision` options.
- `invalidDate`: a date-only column (`odataType: "Edm.Date"`) given anything but `yyyy-mm-dd` text, or a date and time column given anything but ISO 8601 text or a valid `Date`.
- `dateOutOfRange`: a date before 1753-01-01 or after 9999-12-31, Dataverse's range for every date column (in UTC for a date and time).
- `maxSize`: a file or image (base64 text, `ArrayBuffer`, typed array or `Blob`) larger than the column's new `maxSizeInKB`.
- `invalidStatus`: a body that sets `statecode` and a `statuscode` of another state, from the status reason column's new `optionStates`.

`AttributeMetadata` has the new optional `precision`, `maxSizeInKB` and `optionStates`; `ValidateEntityOptions` has `pricingPrecision` and `currencyPrecision`.

Not breaking: `validateEntity()` is opt-in and reports what Dataverse rejects (or, for decimal places, doesn't store) anyway. The precision, size and status checks need the new metadata, which only a `dataverse-gen` of this version writes. The date checks need nothing new, so a body that `validateEntity()` passed before can now get `invalidDate` or `dateOutOfRange` for a date column; send dates as `yyyy-mm-dd` (date-only) or ISO 8601 text. Code that switches over every `ValidationIssueCode` gets five more members to handle.
