---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
---

Remove the plain-name classes of operations that have only bound overloads (#286).

These names stood for one binding of an operation that has several, so `RetrievePrincipalAccessFunction` read as a class for users, teams and the organization when it could only call `organizations(…)`. Each binding has its own class (#75); use the one for the table you call. The class in brackets sends the same request as the removed name did.

- actions: `AddItemCampaignAction` and `AddItemCampaignResponse` → `AddItemCampaign_campaignAction`, `AddItemCampaign_listAction`, `AddItemCampaign_productAction` or `AddItemCampaign_salesliteratureAction` (`AddItemCampaign_salesliteratureAction`).
- messages: `AddItemCampaignRequest` and `AddItemCampaignResponse` → `AddItemCampaign_campaignRequest`, `AddItemCampaign_listRequest`, `AddItemCampaign_productRequest` or `AddItemCampaign_salesliteratureRequest` (`AddItemCampaign_salesliteratureRequest`).
- functions, each with its `…Response` type:
  - `GetQuantityDecimalFunction` → `GetQuantityDecimal_invoiceFunction`, `_opportunityFunction`, `_quoteFunction` or `_salesorderFunction` (`_salesorder`).
  - `RetrieveAbsoluteAndSiteCollectionUrlFunction` → `RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationFunction` or `_sharepointsiteFunction` (`_sharepointdocumentlocation`).
  - `RetrievePrincipalAccessFunction` → `RetrievePrincipalAccess_systemuserFunction`, `_teamFunction` or `_organizationFunction` (`_organization`).
  - `RetrievePrincipalAccessInfoFunction`, `RetrievePrincipalAttributePrivilegesFunction` and `RetrievePrincipalSyncAttributeMappingsFunction` → their `_systemuserFunction` or `_teamFunction` class (`_team`).
  - `RetrieveProductPropertiesFunction` → `RetrieveProductProperties_invoicedetailFunction`, `_opportunityproductFunction`, `_quotedetailFunction` or `_salesorderdetailFunction` (`_invoicedetail`).
  - `RetrieveUnpublishedFunction` → `RetrieveUnpublished_<table>Function`, for example `RetrieveUnpublished_savedqueryFunction` (`_aipluginoperationparameter`).
  - `RetrieveUnpublishedMultipleFunction` → `RetrieveUnpublishedMultiple_<table>_collectionFunction`, for example `RetrieveUnpublishedMultiple_savedquery_collectionFunction` (`_aipluginoperationparameter_collection`).

`docs/migration-2.0.md` has the same list as a table.
