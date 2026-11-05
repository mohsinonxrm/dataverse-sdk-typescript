---
"@mohsinonxrm/dataverse-sdk-generator": minor
"@mohsinonxrm/dataverse-sdk-entities-runtime": minor
---

Generated functions send valid parameters, and bound actions and functions call the bound URL (#77).

- Function parameters were written with `String()`, so strings went unquoted, enums as bare numbers and complex values as `[object Object]`. Every function with a string, enum or complex parameter failed. Each value is now written as the OData literal for its type, by the new `formatParameterAlias(value, odataType, kind)` in entities-runtime:
  - strings are quoted, with `'` doubled;
  - GUIDs, numbers and booleans are written bare, and `Date` values as ISO strings (`Edm.Date` takes only the date part);
  - enum values become `Microsoft.Dynamics.CRM.<Enum>'<value>'`;
  - collections and complex values become JSON, and entity references `{"@odata.id":"<set>(<id>)"}`.

  The aliases are numbered (`@p1`) and URL-encoded into the URL. Functions without parameters are called with `()`.
- Bound operations were called as unbound (`/<Name>`). They now use `/<set>(<id>)/Microsoft.Dynamics.CRM.<Name>` for one record and `/<set>/Microsoft.Dynamics.CRM.<Name>` for a collection. The constructor takes `targetId` first, or a `target: EntityReference` (or `entitySetName`) when the bound type has no entity set.
- An operation bound to several tables gets one class per binding (`RetrieveUnpublished_savedqueryFunction`) instead of each overload overwriting the same file. `ActionMetadata` and `FunctionMetadata` are keyed the same way.
- Trailing nullable parameters are optional, and `undefined` ones are left out of the call.
- A function's entity-typed parameter accepts an `EntityReference`. `getStructuralType()` recognises entity types that aren't generated (`crmbaseentity`).
- New in entities-runtime: `formatParameterAlias`, `formatRecordPath` and `ParameterKind`.
