---
"@mohsinonxrm/dataverse-sdk-core": minor
"@mohsinonxrm/dataverse-sdk-entities-runtime": patch
"@mohsinonxrm/dataverse-sdk-functions": patch
---

One OData literal serializer (#254).

- **Core** adds `odataLiteral.parameter(value, odataType, kind?)`, which writes an operation parameter from its OData type, and the helpers it needs: `odataLiteral.json` (record references become `@odata.id`), `odataLiteral.reference`, `odataLiteral.recordPath`, `odataLiteral.duration` and `odataLiteral.binary`. `odataLiteral.enum` also splits a string on commas (`"Entity, Attributes"`). New types: `ODataParameterKind`, `ODataRecordReference`.
- **entities-runtime** `formatParameterAlias` and `formatRecordPath`, and the generated `internal/odataLiteral.ts` in the functions package, now call core instead of holding their own copies. Their names and signatures are unchanged.
- Values the Web API can't read now throw `DataverseInvalidRequestError` before the request instead of being written through: a GUID that isn't one (the Web API answered 500), `NaN` or `Infinity` (written as `null`), a fraction for an integer type, a date-time without a zone, an enum member with a quote, an invalid duration or base64 text. A `bigint` for `Edm.Int64` is written in full (it used to throw a `TypeError`).
