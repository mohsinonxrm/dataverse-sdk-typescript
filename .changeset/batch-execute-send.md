---
"@mohsinonxrm/dataverse-sdk-batch": patch
---

`BatchRequestBuilder.execute()` works against Dataverse (#54). It sent the batch through `client.api("/$batch").post(body, headers)`, which took the headers as request options and dropped them, sent the body as `application/json` and parsed the multipart response as JSON, so every batch failed. It now sends one `POST $batch` through `client.send()` with the multipart body unchanged, `Content-Type: multipart/mixed; boundary=…` and, with `continueOnError`, `Prefer: odata.continue-on-error` (combined with any `Prefer` in `options.headers`). It decodes the multipart response whatever its status, because Dataverse answers a batch whose first failure is a 4xx with that status but still a multipart body. A batch that fails as a whole (JSON error) throws the typed `DataverseODataError`, or `DataverseThrottleError` for 429. `createBindManyExecutor()` works through it.
