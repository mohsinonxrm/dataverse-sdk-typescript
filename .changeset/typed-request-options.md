---
"@mohsinonxrm/dataverse-sdk-core": minor
---

Typed per-request options for every built-in middleware (#436, #480).

- **core:** `BuiltInMiddlewareOptions` and `MiddlewareOptionEntry` now cover `chaos` (`ChaosRequestOptions`), `bulkhead` (`BulkheadRequestOptions`), `circuitBreaker` (new `CircuitBreakerRequestOptions`) and `adaptiveThrottling` (new `AdaptiveThrottlingRequestOptions`), next to `retry`, `concurrency`, `telemetry` and `logging`. `ctx.middlewareOptions.get("chaos")` returns `ChaosRequestOptions | undefined`, and so on.
- **core:** the `MiddlewareRequestOptions` constructor checks each built-in entry against its options: a misspelt or mistyped field, such as `{ type: "retry", maxRetriez: 5 }`, is now a compile error (it used to pass as a custom middleware's entry). Any other `type` still takes any fields. The class has a type parameter for this, inferred from the entries; `MiddlewareRequestOptions` as a type is unchanged. `set("chaos", options)` checks the options the same way.
- **core:** `get`, `set`, `has` and `delete` take a `MiddlewareOptionKey` (`keyof BuiltInMiddlewareOptions | (string & {})`): editors suggest the built-in types, and custom keys still work.
- **core:** new per-request `bypass` for `CircuitBreakerMiddleware` (sends the request whatever the circuit's state, and leaves its outcome out of the count) and `AdaptiveThrottlingMiddleware` (no wait for the spacing or a 429's pause; its response still updates the budgets).
- **core:** `CircuitBreakerOptions.clock` and `AdaptiveThrottlingOptions.clock` take a `Clock` (default `systemClock`), like `ChaosOptions.clock`, so tests can move time without fake timers. The breaker's `now` still works and takes precedence.
