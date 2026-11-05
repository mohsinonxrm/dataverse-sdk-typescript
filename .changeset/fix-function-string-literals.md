---
"@mohsinonxrm/dataverse-sdk-functions": patch
---

String parameters of the generated functions are now sent as valid OData string literals: every `'` in the value is doubled (`O'Brien` becomes `'O''Brien'`). Before, the literal ended at the first `'`, so FetchXML with single-quoted attributes (`<entity name='account'>`) or a value such as `O'Brien` made `FetchXmlToQueryExpression`, `ValidateFetchXmlExpression` and every other function with a string parameter fail with HTTP 400 (#22).
