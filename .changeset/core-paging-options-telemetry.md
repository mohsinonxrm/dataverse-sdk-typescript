---
"@mohsinonxrm/dataverse-sdk-core": major
---

**Breaking.** Paging, telemetry and pipeline fixes (#378):

- `search()` is removed: Dataverse's Web API doesn't support `$search`, so the request failed. Use Dataverse search (the `searchquery` message) for full-text search, or `$filter` with `contains()`.
- `getAll()` and `iterate()` take `RequestOptions` (plus `maxItems` / `maxPages` for `getAll()`), and every page gets them: `signal`, `timeoutMs` and `attemptTimeoutMs` per page, `correlationId`, `middlewareOptions`, `headers` and `prefer`. Before, only `signal` was accepted. `getAll({ maxItems: 0 })` returns `[]` instead of everything.
- `new PageIterator(client, firstPage, options)` takes request options as its third argument; it was a signal (and a fourth argument for headers).
- Telemetry reports a 304 (and any status below 400) as a successful dependency, so `If-None-Match` reads no longer count as failures.
- After a 401, the response body is released even when getting the new token throws.
- `RequestInformation.idempotent` marks a request that can be replayed whatever its method. The FetchXML query that is sent as a `$batch` (a POST carrying one GET) uses it, so it is retried after a 502/503/504 or a dropped connection like the GET itself.
