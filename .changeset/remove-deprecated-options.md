---
"@mohsinonxrm/dataverse-sdk-core": minor
"@mohsinonxrm/dataverse-sdk-otel": minor
---

Remove the deprecated and no-op options (#285). Passing any of them is now a type error.

- **core, retries:** `RetryOptions.delay` is removed: use `baseDelayMs`. `RetryOptions.useExponentialBackoff` is removed: it had no effect, because backoff is always exponential.
- **core, client options:** `circuitBreaker` and `bulkhead` are removed, with their `CircuitBreakerOptions` and `BulkheadOptions` types. They were never implemented and only logged a warning. Circuit breaker and bulkhead middleware are planned in #100; until then, add your own through the `middleware` option.
- **core, errors:** `DataverseError.statusCode` is removed: read `status`.
- **otel:** `OpenTelemetryConfig.serviceName` is removed. It was ignored. `service.name` is a resource attribute: set it on your OpenTelemetry SDK (`new NodeSDK({ serviceName })` or `OTEL_SERVICE_NAME`).
