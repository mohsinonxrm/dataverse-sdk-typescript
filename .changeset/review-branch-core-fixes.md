---
"@mohsinonxrm/dataverse-sdk-core": minor
"@mohsinonxrm/dataverse-sdk-batch": minor
---

Land the repository review fixes.

- `DataverseClient` now rejects non-HTTPS base URLs with `DataverseInvalidRequestError` (`InvalidBaseUrl`). Plain `http://` is still allowed for `localhost`, `127.0.0.1` and `[::1]`.
- `getAll({ maxPages })` now stops after `maxPages` requests (previously the limit was ignored), and `maxItems` stops paging as soon as it is reached.
- A request that exceeds `timeoutMs` now rejects with `DataverseNetworkError` (`RequestTimeout`) instead of a raw `AbortError`.
- `iterate()` and `getPage()` accept a `signal`, which is passed to every follow-up page request.
- New `odata` filter helper (`odata.eq`, `contains`, `and`, …) that escapes single quotes in string literals.
- `AccessTokenProvider.getToken()` now declares `scopes` as optional, which matches every built-in provider.
- **Behaviour change:** `bindMany()` no longer loads the batch package with `new Function("import(...)")`, which failed under a strict Content-Security-Policy and in bundlers. To send the associations as one `$batch`, pass an executor: `bindMany(nav, entitySet, ids, createBindManyExecutor())`, using the new `createBindManyExecutor` from `@mohsinonxrm/dataverse-sdk-batch`. Without an executor, `bindMany()` sends one request per id (#20).
