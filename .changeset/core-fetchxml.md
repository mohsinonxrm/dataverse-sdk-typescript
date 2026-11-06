---
"@mohsinonxrm/dataverse-sdk-core": minor
---

FetchXML queries (#51).

- **`fetchXml()`** on the request builder and the client (`client.fetchXml("accounts", xml)`) runs a FetchXML query and returns one `FetchXmlPage<T>`: `value`, `pagingCookie`, `moreRecords`, `totalRecordCount`, `totalRecordCountLimitExceeded` and `nextLink`. It sends `Prefer: odata.include-annotations="*"` by default, so records carry formatted values; `annotations` asks for less, and `Microsoft.Dynamics.CRM.*` is always included so the paging annotations come back. The query is encoded with `encodeURIComponent`.
- **Long queries.** A query whose GET URL would be longer than `maxUrlLength` (default 32,768 characters) is sent as a `POST $batch` that carries the GET, and returns the same page.
- **Views.** `savedQuery(id)` and `userQuery(id)` run a system or personal view as one page.
- **Paging helpers.** `parsePagingCookie(annotation)` reads the page number and decodes the cookie; `buildPagedFetchXml(xml, { page, pagingCookie, count })` sets them on the `<fetch>` element. Both are pure.
