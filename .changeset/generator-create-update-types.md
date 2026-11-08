---
"@mohsinonxrm/dataverse-sdk-generator": minor
---

Generated tables get `<Entity>Create` and `<Entity>Update` types (#347): only the columns Dataverse accepts in a create or an update (`IsValidForCreate` / `IsValidForUpdate` from RetrieveMetadataChanges), so read-only and server-set columns are left out. A lookup is keyed by the navigation property it's bound through (a custom lookup's `contoso_ParentAccountId`, a polymorphic lookup's `parentcustomerid`) and takes an `EntityReference`, which `formatEntityForWrite()` sends as `@odata.bind`. The schema model's `PropertyType` has `IsValidForCreate` and `IsValidForUpdate`, and `NavigationPropertyType` has `ReferentialProperty`, `LookupAttribute`, `LookupTargets`, `IsValidForCreate` and `IsValidForUpdate`.
