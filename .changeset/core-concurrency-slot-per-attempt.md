---
"@mohsinonxrm/dataverse-sdk-core": patch
---

A request waiting to be retried no longer holds a concurrency slot (#44). `RetryMiddleware` now runs outside `ConcurrencyMiddleware`, so each attempt takes a slot and releases it when its response arrives. Before, a request sleeping on `Retry-After` or a backoff kept its slot for the whole wait, so with the defaults a throttling burst could block every slot for minutes while other requests queued behind it. `x-ms-dop-hint` adaptation is unchanged. The default order is now ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging; a `middleware.replace` callback receives the defaults in that order.
