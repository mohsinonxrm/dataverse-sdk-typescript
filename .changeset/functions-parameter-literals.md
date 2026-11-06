---
"@mohsinonxrm/dataverse-sdk-functions": minor
"@mohsinonxrm/dataverse-sdk-actions": patch
"@mohsinonxrm/dataverse-sdk-messages": patch
---

Function parameters are sent as the OData literal of their type (#67, #68).

- Enum parameters are sent as `Microsoft.Dynamics.CRM.<Enum>'<value>'`, and accept an enum value or a member name: `new RetrieveEntityFunction({ EntityFilters: EntityFilters.Entity | EntityFilters.Attributes, … })` sends `EntityFilters'3'`. Before, they went as `1` or `'Entity'`, and Dataverse answered 400.
- `Edm.Guid` and `Edm.DateTimeOffset` parameters are sent unquoted. Before, they were quoted, and Dataverse answered 400. DateTimeOffset parameters also accept a `Date`.
- Parameters that the CSDL doesn't mark `Nullable="false"` are optional and are left out of the URL when `undefined`. A function with only optional parameters can be constructed without arguments (`new RetrieveMetadataChangesFunction()`).
- The enums are exported as values from the functions package root (`import { EntityFilters } from "@mohsinonxrm/dataverse-sdk-functions"`). In every package's generated `types/index.ts`, enums are now value exports.
- The literals come from `formatParameterAlias`, which behaves exactly like the one in `@mohsinonxrm/dataverse-sdk-entities-runtime`.
