---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
"@mohsinonxrm/dataverse-sdk-generator": minor
"@mohsinonxrm/dataverse-sdk-xrm": patch
---

One return contract for every generated operation, in both generators (#300). `client.execute()` resolves the value the operation returns, never the OData envelope, and `<Name>Response` is exactly that value's type. dataverse-gen unwrapped `value` and the actions and functions packages returned `{ value }`, so the same custom API gave differently shaped results.

| Return type in `$metadata`                       | Web API response                                          | Value                                                              |
| ------------------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------ |
| none                                             | `204 No Content`                                          | `undefined`; `<Name>Response` is `void` (was `{}`)                 |
| primitive or enum                                | `{ "@odata.context", "value": … }`                        | the value (was `{ value }`); an enum is its member name (`string`) |
| collection                                       | `{ "@odata.context", "value": [ … ] }`, or 204 when unset | the array (was `{ value }`), `[]` for a 204                        |
| complex type                                     | the properties, with `@odata.context`                     | the body, typed with `@odata.context`                              |
| entity (or `crmbaseentity`)                      | the record, with its annotations, or 204 when unset       | the record, typed with `@odata.etag` and `@odata.type`; `null` for a 204 (was `{}`) |

- **actions** (1,556): 434 return nothing, 39 a collection (`InstantiateTemplateAction` resolves the email records; they were typed `EntityReference[]`), 65 an entity and 1,018 a complex type.
- **functions** (300): 71 return a primitive (the `$filter` query functions such as `Above`, which the Web API doesn't run on their own), 65 a collection (`RetrieveAadUserRolesFunction` resolves `role` records), 28 an entity and 136 a complex type.
- **messages**: `result` is the value the action of the same name resolves, with the same type, exported as `<Name>Result`. Entity and complex results keep their annotations (they were dropped), entity results are `null` for a 204, and collection results `[]`. `<Name>Response.fromResponse(data)` takes the parsed body, or `undefined` for a 204. The internal `responseData` module is gone.
- **generator (dataverse-gen)**: each operation with a return type exports `<Class>Response` with the same types and values as above. A 204 is `null` for an entity (was `{}`) and `[]` for a collection (was `undefined`).
- Dataverse answers `204 No Content` for an entity or entity-collection output that wasn't set, although `$metadata` declares every return `Nullable="false"`, so entity returns are `<Entity> | null`. A complex output that wasn't set is a 200 with the properties `null`.
- **xrm**: the `execute()` example reads `response.result?.asyncoperationid`.
