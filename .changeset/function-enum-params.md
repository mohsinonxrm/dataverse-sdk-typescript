---
"@mohsinonxrm/dataverse-sdk-functions": patch
---

Enum values inside complex and collection function parameters are sent as member names (#358).

Dataverse reads an enum member in a JSON parameter alias only by name. The generated functions wrote complex and collection parameters with `JSON.stringify`, so typed enum values went out as numbers: `RetrieveMetadataChangesFunction`'s `Query` sent `"ConditionOperator":0` and `"FilterOperator":0`, and `QueryScheduleFunction` / `QueryMultipleSchedulesFunction` sent `TimeCodes` as `[0]`. These parameters now go through the same enum-name conversion the generated actions use for bodies (#232), then core's `odataLiteral.parameter()`, so they are sent as `"ConditionOperator":"Equals"` and `["Available"]`. A record reference (`{ logicalName, id, entitySetName }`) inside such a parameter is now written as `{"@odata.id":"<entity set>(<id>)"}`.
