---
"@mohsinonxrm/dataverse-sdk-core": major
"@mohsinonxrm/dataverse-sdk-xrm": major
---

**Breaking.** `$skip` is gone, because Dataverse doesn't support it: a request with `$skip` fails with 400 (#357).

- core: `DataverseRequestBuilder.skip()` and `QueryState.$skip` are removed. Page with `@odata.nextLink`: `iterate()`, `getAll()`, or `getPage()` and then `client.api(nextLink).getPage()`, with `.prefer().maxPageSize(n)` for the page size.
- xrm: `RetrieveMultipleOptions.skip` is replaced by `maxPageSize` (`Prefer: odata.maxpagesize`). Follow the result's `@odata.nextLink` for the next page.
