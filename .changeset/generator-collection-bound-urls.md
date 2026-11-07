---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
---

Operations bound to an entity collection are called on the entity set (#69).

- `ValidateSavedQuery`, `CreateException`, `CreateFlowMachineNetwork`, `DeliverIncomingEmail`, `ExportTranslation`, `FulfillSalesOrder` and `GenerateSocialProfile` (actions and messages) post to `/{entityset}/Microsoft.Dynamics.CRM.{Name}`, for example `/savedqueries/Microsoft.Dynamics.CRM.ValidateSavedQuery`. Before, they posted to `/{Name}`, which doesn't exist (404).
- The bulk operations `CreateMultiple`, `UpdateMultiple`, `UpsertMultiple` and `DeleteMultiple` (actions and messages) take the entity set name as their first argument: `new CreateMultipleAction("accounts", { Targets: targets })` posts to `/accounts/Microsoft.Dynamics.CRM.CreateMultiple`. The old one-argument form could never succeed.
- The collection-bound functions (`RetrievePrivilegeSet`, `RetrieveFilteredForms`, `GetDefaultPriceLevel`, `SearchByTitleKbArticle`, `UtcTimeFromLocalTime`, …) are called on their entity set too.
