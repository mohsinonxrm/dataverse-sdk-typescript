---
"@mohsinonxrm/dataverse-sdk-core": minor
---

New `diagnosticHeaders` client option (#13). The SDK's own request headers (`x-ms-sdk-version`, `x-ms-correlation-id`, `x-ms-feature-usage`, and `retry-attempt` on retries) were always sent. They are still sent by default; `diagnosticHeaders: false` turns all of them off, and an object (`{ sdkVersion, correlationId, featureUsage, retryAttempt }`) turns them off one by one. Telemetry keeps the correlation id when its header is off. The README's browser section explains the CORS side.
