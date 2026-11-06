---
"@mohsinonxrm/dataverse-sdk-core": minor
---

OData literal helpers (#53).

- **`odataLiteral`** formats values for keys, function parameters and filters: `string` (wraps in `'` and doubles every embedded `'`), `guid` (unquoted; anything but a GUID throws), `int`, `number`, `bool`, `datetime`, `date`, `enum` (including flags) and `value` (picks one from the JavaScript type). A value that doesn't fit throws `DataverseInvalidRequestError` (`InvalidParameter`) instead of producing a broken URL.
- **`odataKey(key)`** formats a record key: a GUID (braces removed), or an alternate key object such as `{ accountnumber: "O'Brien" }` → `accountnumber='O''Brien'`, percent-encoded so it is safe in a URL path. Other strings are used as written.
- **Core uses them.** `bind()`, `client.bind()`, `associate()` and `disassociate()` accept an alternate key object as well as a GUID, and format the key with `odataKey`. The `odata` filter helpers write their values with `odataLiteral`: `eq`/`ne`/`gt`/`ge`/`lt`/`le` also take a `Date`, and a non-finite number now throws instead of producing `NaN` in the filter.
