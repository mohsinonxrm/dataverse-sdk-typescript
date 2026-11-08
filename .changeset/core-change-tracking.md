---
"@mohsinonxrm/dataverse-sdk-core": minor
---

Change tracking (#319).

- **`trackChanges()`** on the request builder sends `Prefer: odata.track-changes`, follows `@odata.nextLink` through every page and returns `TrackedChanges<T>`: `changed` rows, `deleted` rows (`{ id, reason }`, from the `$deletedEntity` entries) and the `deltaLink` to save. `$filter`, `$orderby`, `$expand` and `$top`, which Dataverse doesn't support with change tracking, reject before anything is sent; a response without a delta link (change tracking off for the table) rejects with `NoDeltaLink`.
- **`client.changesSince(deltaLink)`** returns what changed since an earlier sync, across every page, and the next delta link (the same one when Dataverse returns none).
- **Page by page.** `iterateChanges()` and `client.iterateChangesSince(deltaLink)` yield one `TrackedChangesPage<T>` at a time, lazily; the last page carries the delta link. `maxPageSize` sets `odata.maxpagesize`.
- **`isDeltaLinkExpired(err)`** recognises `ExpiredVersionStamp` (`0x80044352`), Dataverse's answer to a delta link older than the org keeps changes (7 days by default): run `trackChanges()` again.
