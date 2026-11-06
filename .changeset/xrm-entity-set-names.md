---
"@mohsinonxrm/dataverse-sdk-xrm": minor
---

`OrganizationService` resolves entity set names from metadata instead of guessing a plural (#76).

`assign()`, `setState()` and the `EntityReference`s of `associate()` take logical names. They used a small built-in map and otherwise appended "s", so custom tables and irregular names (and `logicalName: "contacts"`, which became `contactss`) produced wrong URLs.

- **Metadata lookup.** The entity set name is read from `EntityDefinitions(LogicalName='…')?$select=EntitySetName` once per logical name and cached on the service; concurrent calls share one request, and a failed lookup is not cached. An unknown table rejects with the 404 `DataverseError`.
- **Overrides.** `new OrganizationService(client, { entitySetNames: { new_widget: "new_widgets" } })`, `service.setEntitySetName(logicalName, entitySetName)`, or `entitySetName` on an `EntityReference` skip the lookup.
- **New API.** `service.getEntitySetName(logicalName)` resolves a name. `OrganizationServiceOptions` is exported.
