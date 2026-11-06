---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
---

One class per operation binding, and `ExportToExcel` (#75).

- **Overloads.** An operation that `$metadata` declares several times with different bindings had one file per name, so each binding overwrote the one before and only the last survived. For example, `RetrievePrincipalAccessFunction` could only call `organizations(…)`. Each binding now has its own class, named as in the entities generator: `<Name>_<table>` (`RetrievePrincipalAccess_systemuserFunction`, `RetrievePrincipalAccess_teamFunction`), plus `_collection` for a collection binding (`RetrieveUnpublishedMultiple_savedquery_collectionFunction`). An unbound overload keeps the plain name.
- **No breaking renames.** None of the overloaded names has an unbound overload. The plain names stay exported as `@deprecated` aliases of the binding they exported before, so existing imports compile and call the same URL. Lint and editors flag them. The aliases are:
  - actions: `AddItemCampaignAction` → `AddItemCampaign_salesliteratureAction`;
  - messages: `AddItemCampaignRequest`/`Response` → `AddItemCampaign_salesliterature…`;
  - functions:
    - `GetQuantityDecimalFunction` → `_salesorder`;
    - `RetrieveAbsoluteAndSiteCollectionUrlFunction` → `_sharepointdocumentlocation`;
    - `RetrievePrincipalAccessFunction` → `_organization`;
    - `RetrievePrincipalAccessInfoFunction`, `RetrievePrincipalAttributePrivilegesFunction` and `RetrievePrincipalSyncAttributeMappingsFunction` → `_team`;
    - `RetrieveProductPropertiesFunction` → `_invoicedetail`;
    - `RetrieveUnpublishedFunction` → `_aipluginoperationparameter`;
    - `RetrieveUnpublishedMultipleFunction` → `_aipluginoperationparameter_collection`.
- **`ExportToExcelAction` and `ExportToExcelRequest`.** `$metadata` doesn't declare the action, but Dataverse runs it, so it is generated from a small supplemental definition in the generator. All five parameters are required: `View` (a `savedquery` or `userquery` reference), `FetchXml`, `LayoutXml`, `QueryApi` and `QueryParameters`. The response's `ExcelFile` is the .xlsx file, base64-encoded. With no query parameters, send `{ Arguments: { Count: 0, IsReadOnly: true, Keys: [], Values: [] } }`, because Dataverse rejects `{}`.
