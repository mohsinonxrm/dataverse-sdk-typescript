---
"@mohsinonxrm/dataverse-sdk-files": minor
---

`new FileColumnClient(client)` takes a `DataverseClient` (#59).

- **New overload.** `new FileColumnClient(client)` sends every request through `client.send()`, so the client's auth, retry, logging and telemetry apply, and builds URLs on `client.getBaseUrl()`. The docs showed `new FileColumnClient(client.requestAdapter)`, which doesn't exist.
- **No invalid default.** `new FileColumnClient(adapter, baseUrl)` still works. The base URL can be left out when the adapter has a `getBaseUrl()` method. Otherwise the constructor now throws a `DataverseInvalidRequestError` (name `MissingParameter`), instead of defaulting to `""` and sending relative URLs that a plain fetch adapter rejects. A trailing `/` on the base URL is dropped.
- **Docs.** The README, the JSDoc example and ADR 0005 show the new constructor, the `fileName` argument and the `onProgress(progress)` callback.
