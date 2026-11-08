---
"@mohsinonxrm/dataverse-sdk-core": major
"@mohsinonxrm/dataverse-sdk-otel": major
"@mohsinonxrm/dataverse-sdk-appinsights": major
"@mohsinonxrm/dataverse-sdk-batch": minor
---

**Breaking.** Telemetry events and W3C trace context (#97).

- **`TelemetryClient.trackDependency` is replaced by `startDependency(name, data)`** (core). The SDK calls it before each request attempt and calls `end(data)` on the `DependencyHandle` it returns once the attempt is done, with `durationMs`, `success` and `resultCode`. The handle can carry `headers` (`traceparent`, `tracestate`), which the SDK sends with the attempt, and `run(fn)`, which makes the dependency the active span while the attempt runs. A custom client moves its `trackDependency` body into `end` (see the 2.0 migration guide). Each retry and each resend after a 401 is its own dependency, started in the caller's context.
- **Trace context goes to Dataverse.** Only a valid `traceparent` and its `tracestate` are sent, only to origins that may receive the access token (`baseUrl` and `allowedTokenOrigins`), and `diagnosticHeaders: false` or the new `diagnosticHeaders: { traceContext: false }` turns it off.
- **Events.** `trackEvent` now receives `dataverse.throttle` (each 429, with the limit hit, `Retry-After` and `x-ms-dop-hint`), `dataverse.retry` (before each retry wait), `dataverse.concurrency.wait` (a request waited for a slot) and `dataverse.concurrency.limit` (`x-ms-dop-hint` changed the limit). The names are exported as `TelemetryEvents`. A request with telemetry turned off sends none.
- **`DataverseClient.trackEvent(name, props, measurements)`** sends an event to the client's telemetry, guarded like the SDK's own calls. The batch package uses it to report `dataverse.batch` for each `$batch` (requests, succeeded, failed, duration, status, correlation id); `execute()` now generates the `$batch` correlation id itself when you don't pass one.
- **otel and appinsights:** `OpenTelemetryClient` and `ApplicationInsightsTelemetryClient` implement `startDependency`: the CLIENT span starts with the active context, is active while the attempt runs (so `fetch` auto-instrumentation spans are its children), carries `http.request.resend_count` on retries, and its context is injected with the registered propagator, so the request carries its `traceparent`. `trackDependency` is removed from both.
