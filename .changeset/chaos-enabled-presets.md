---
"@mohsinonxrm/dataverse-sdk-core": minor
---

`ChaosMiddleware` gets an off-switch, telemetry, and latency and hang faults (#475); Dataverse chaos presets, a clock and `describePipeline()` (#478). Chaos is for dev and test environments only, never a live production environment.

- **core:** `ChaosOptions.enabled` (`boolean` or a function of the request, asked per attempt). Set it, for example `enabled: process.env.DATAVERSE_SDK_CHAOS === "1"`. Without it chaos stays on, as in 2.0, and the middleware logs a warning once through the client's `logger`; in 3.0 it is planned to default to off.
- **core:** new fault kinds: `{ status: "latency", delayMs }` sends the request after a delay, `{ status: "hang" }` never answers (the request ends when its `signal` aborts, `timeoutMs` or `attemptTimeoutMs` passes). `delayMs` on a status or network fault makes it a slow failure. Both waits are abort-aware, and run on `ChaosOptions.clock`.
- **core:** each injected fault is tracked as a `dataverse.chaos.injected` event (`TelemetryEvents.chaosInjected`), and the attempt's dependency (and its exception or `dataverse.throttle` event) carries `chaos.injected: "true"` and `chaos.fault`. `MiddlewareContext.chaos` carries the mark from the chaos middleware to the telemetry middleware.
- **core:** `ChaosPresets.serviceProtection()` (the three service-protection 429s, `0x80072322`, `0x80072321` and `0x80072326`, with `Retry-After` and Dataverse's error body), `gatewayOutage()` (502/503/504), `flakyNetwork()` (dropped connections) and `slowOrg()` (latency).
- **core:** the `Clock` type (`now()`, `sleep(ms, signal)`) and `systemClock`; `client.describePipeline()` lists the middleware names in order.
- **testing** (the private, unpublished test harness): `fakeClock()`, `serviceProtectionError()`, `gatewayError()`, `connectionReset` and `slowResponse()` for the fake fetch.
