---
"@mohsinonxrm/dataverse-sdk-core": major
---

**Breaking.** `concurrency` settings now do what they say (#356):

- `maxConcurrentRequests` is used exactly. Before, it was clamped to `min`/`max` (2 and 16 by default), so `maxConcurrentRequests: 1` still sent 2 requests at once and `32` sent 16.
- When `maxConcurrentRequests` is set, `max` defaults to it, so the `x-ms-dop-hint` header can lower your limit but no longer raise it. Set `max` as well to let the hint raise it. Without `maxConcurrentRequests`, nothing changes: the limit starts at 8 and follows the hint within 2..16.
- Settings that aren't whole numbers of at least 1, or don't fit `min <= maxConcurrentRequests <= max`, throw `DataverseInvalidRequestError` when the client is created.
- The per-request `maxConcurrent` option (`MiddlewareConcurrencyOptions`), which was never read, is removed; `bypass` stays.
