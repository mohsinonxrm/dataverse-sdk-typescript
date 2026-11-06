---
"@mohsinonxrm/dataverse-sdk-core": minor
---

The middleware pipeline can be customised, and `defaultPrefer` works (#18).

- New client option `middleware: { prepend?, append?, replace? }`. `replace` receives the built-in middleware list and returns the one to use (for example without `LoggingMiddleware`). `prepend` runs first; `append` runs last, right before `fetch`, so it sees the final headers including `authorization`.
- `Pipeline`, `FetchRequestAdapter`, `buildDefaultMiddleware` and the built-in middleware classes (`AuthMiddleware`, `ODataHeadersMiddleware`, `ConcurrencyMiddleware`, `RetryMiddleware`, `TelemetryMiddleware`, `LoggingMiddleware`) are exported.
- `defaultPrefer` was declared but never applied. It is now added to every request's `Prefer` header. Preferences are matched by name, and a request's own value for the same preference wins.
- The README's middleware docs now show the real option, signature and order.
