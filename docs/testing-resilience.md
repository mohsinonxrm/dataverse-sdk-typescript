# Testing your app's resilience

Dataverse throttles busy clients (service-protection 429s), gateways have bad minutes (502, 503,
504), connections drop and some orgs are slow. The SDK retries, waits and times out for you, but
your app still decides what the user sees, how long a job may take and what happens when a
request finally fails. This guide shows how to make those failures happen on purpose, with
`ChaosMiddleware` and its presets, so you can watch your app cope with them.

> **Dev and test environments only.** Chaos testing belongs in unit tests, local runs and shared
> dev or test environments. Never run it in a live production environment: always set `enabled`
> from something that is off there.

## Switch it on and off

`ChaosMiddleware` sits in your client setup; `enabled` decides whether it does anything. Read it
from an environment variable (or a feature flag) that only your dev and test environments set:

```typescript
import { ChaosMiddleware, ChaosPresets, DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const client = new DataverseClient({
  baseUrl,
  tokenProvider,
  middleware: {
    // append: it runs last, inside retry, concurrency and telemetry, so its faults are handled
    // like real ones
    append: [
      new ChaosMiddleware({
        enabled: process.env.DATAVERSE_SDK_CHAOS === "1",
        percentage: 2,
        faults: [...ChaosPresets.serviceProtection(), ...ChaosPresets.gatewayOutage()],
      }),
    ],
  },
});
```

- `enabled: false` (or a function that returns anything but `true`) lets every request through
  untouched.
- `enabled` can be a function of the request, asked for each attempt: a feature flag, a header
  your test client sets, or only some entity sets.
- Without `enabled`, chaos is on (the 2.0 behaviour) and the middleware logs a warning once
  through the client's `logger`. In 3.0 it is planned to default to off; set it explicitly now.
- Keep `percentage` low in a shared environment. The default is 10 in 2.x; Polly's chaos
  strategies default to 0.1%. In a unit test use 100, or a `script`, so the outcome is certain.

`client.describePipeline()` returns the middleware names in order, for example to assert in a
test that a production configuration has no `ChaosMiddleware`, or that it runs last.

## The presets

`ChaosPresets` returns `faults` that look like Dataverse failures. Spread several into one list.

| Preset                                     | Faults                                                                                                                                                                                                                |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `serviceProtection({ retryAfterSeconds })` | The three service-protection 429s, each with `Retry-After` (1 s by default) and Dataverse's error body: `0x80072322` (number of requests), `0x80072321` (combined execution time), `0x80072326` (concurrent requests) |
| `gatewayOutage()`                          | 502, 503 and 504                                                                                                                                                                                                      |
| `flakyNetwork()`                           | A dropped connection: a `DataverseNetworkError` named `ConnectionFailed`, as when `fetch` rejects with `TypeError: fetch failed`                                                                                      |
| `slowOrg({ delayMs })`                     | Latency: the request is sent after `delayMs` (2 s by default)                                                                                                                                                         |

Two more fault kinds are useful on their own:

- `{ status: "latency", delayMs }`: a slow answer. With `attemptTimeoutMs` set and a delay at
  least that long, the attempt times out (`RequestTimeout`), as a slow response would.
- `{ status: "hang" }`: no answer at all. The request ends only when its `signal` aborts or
  `timeoutMs` / `attemptTimeoutMs` passes: a direct test of your time limits.

## In a unit test

A unit test wants every request to fail the same way, and no real waiting. Use `percentage: 100`
(or a `script`), and a fake clock or your test runner's fake timers for latency:

```typescript
import { describe, expect, it, vi } from "vitest";
import {
  ChaosMiddleware,
  ChaosPresets,
  DataverseClient,
  DataverseThrottleError,
} from "@mohsinonxrm/dataverse-sdk-core";

function clientWith(chaos: ChaosMiddleware, retry = { maxRetries: 0 }) {
  return new DataverseClient({ baseUrl, tokenProvider, retry, middleware: { append: [chaos] } });
}

describe("account import", () => {
  it("reports throttling to the user instead of failing silently", async () => {
    const client = clientWith(
      new ChaosMiddleware({
        enabled: true,
        percentage: 100,
        faults: ChaosPresets.serviceProtection(),
      })
    );
    await expect(importAccounts(client)).rejects.toBeInstanceOf(DataverseThrottleError);
  });

  it("gives up on a hanging org after its time limit", async () => {
    const client = clientWith(
      new ChaosMiddleware({ enabled: true, percentage: 100, faults: [{ status: "hang" }] })
    );
    await expect(client.api("accounts").get({ timeoutMs: 50 })).rejects.toMatchObject({
      name: "RequestTimeout",
    });
  });

  it("survives a slow org without real waiting", async () => {
    vi.useFakeTimers();
    try {
      const client = clientWith(
        new ChaosMiddleware({ enabled: true, percentage: 100, faults: ChaosPresets.slowOrg() })
      );
      const pending = client.api("WhoAmI").get();
      await vi.advanceTimersByTimeAsync(2000);
      await pending;
    } finally {
      vi.useRealTimers();
    }
  });
});
```

To recover from a fault instead, turn retries on and use a `script` that fails only the first
attempts: `script: (_request, { attempt }) => (attempt < 2 ? { status: 503 } : undefined)`.

The waits of `ChaosMiddleware` run on a `Clock` (`now()` and `sleep(ms, signal)`). It is
`systemClock` by default, which fake timers control; pass `clock` to use your own instead.

## In a dev or test environment

Run the app with `DATAVERSE_SDK_CHAOS=1` and a low `percentage`, then use it as people do. Watch
for:

- requests that should retry but fail at once, or retry far too long;
- screens that hang instead of showing that the server is busy;
- jobs that give up without saying which records were done;
- logs and alerts that fire on a single 503.

## Tell injected faults from real ones

With a telemetry client (`@mohsinonxrm/dataverse-sdk-otel`, `@mohsinonxrm/dataverse-sdk-appinsights`
or your own), each injected fault is a `dataverse.chaos.injected` event (`TelemetryEvents.chaosInjected`)
with `chaos.fault` (`status`, `network`, `latency` or `hang`), `request.method` and
`correlation.id`, and the measurements `retry.attempt`, `status` and `chaos.delay_ms`. The
attempt's dependency, and its exception or `dataverse.throttle` event, carry
`chaos.injected = "true"` and `chaos.fault`: filter them out of dashboards and alerts on real
failures.

See the [core README](../packages/dataverse-sdk-core/README.md#fault-injection-chaosmiddleware) for every
option.
