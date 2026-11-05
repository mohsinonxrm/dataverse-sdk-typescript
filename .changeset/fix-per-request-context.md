---
"@mohsinonxrm/dataverse-sdk-core": minor
---

Every request now gets its own middleware context (#15). Before, a `DataverseClient` created one context and shared it across all requests, so every request from a client carried the **same `x-ms-correlation-id` for the client's lifetime**, and concurrent requests overwrote each other's retry-attempt numbers in logs and telemetry. Each request now has a fresh correlation id, which stays the same across its retries. Feature-usage flags are tracked per client instead of in a process-wide tracker. You can pass your own correlation id with the new `correlationId` field on `RequestInformation` (for `send()`) and on `RequestOptions` (for builder terminals and `execute()`).
