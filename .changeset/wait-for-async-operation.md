---
"@mohsinonxrm/dataverse-sdk-core": minor
---

`waitForAsyncOperation(client, job, options?)` waits for a system job (`asyncoperation`): bulk delete, `ExecuteWorkflow`, `ImportSolutionAsync`, data import and so on (#318).

- **Input.** The job's id, or the response that names it: `{ JobId }`, `{ AsyncOperationId }` or the `asyncoperation` record. `null` and values that aren't GUIDs throw `DataverseInvalidRequestError` before anything is sent.
- **Polling.** It reads `asyncoperations(<id>)` through the client (so retry, concurrency and auth apply): at once, then after `intervalMs` (2 s), each wait `backoff` (1.5) times longer, up to `maxIntervalMs` (30 s). `onProgress` sees every read; `select` adds columns; `requestOptions` apply to every read.
- **Outcome.** It resolves with the job when it succeeds. A failed or canceled job rejects with the new `DataverseAsyncOperationError` (`reason` `"failed"` or `"canceled"`, the job's `friendlymessage` as the message, its `errorcode` in hex as `code`, and the job as `operation`). `timeoutMs` rejects with `reason: "timeout"`, and `signal` with `DataverseAbortError`; the job itself keeps running.
- `AsyncOperationStateCode` and `AsyncOperationStatusCode` name the job's `statecode` and `statuscode` values.
