---
"@mohsinonxrm/dataverse-sdk-core": patch
---

Paging fixes (#47).

- **`iterate()` is lazy.** It sends nothing until the first `next()`. Before, the first request went out as soon as `iterate()` was called, so an iterable that was never consumed still sent a request and could leave an unhandled rejection.
- **Later pages carry the first request's headers.** Pages after the first, from `iterate()`, `getAll()` or `PageIterator`, are requested with the first request's `Prefer`, impersonation and custom headers. `odata.maxpagesize`, formatted values and `MSCRMCallerID` now hold on every page; before, page 2 onward came back at the default page size, without annotations, and as the calling user. `If-Match` / `If-None-Match` are sent with the first page only.
- **Other additions.** `getAll()` accepts a `signal`. `PageIterator` takes an optional fourth `headers` argument.
