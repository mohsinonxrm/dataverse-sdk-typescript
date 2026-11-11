## ADR 0008 — Telemetry & Observability Strategy

**File:** `docs/adr/0008-telemetry-observability.md`  
**Status:** Accepted  
**Date:** 2026-01-25  
**Decision Owners:** SDK maintainers

### Context

Production applications need observability for debugging, performance monitoring, and error tracking. The SDK makes HTTP requests to Dataverse that may fail, retry, or be throttled. Developers need:

1. **Logging:** Request/response details, errors, retry attempts
2. **Metrics:** Success rates, latencies, throttle events, concurrency levels
3. **Tracing:** Distributed trace propagation (correlation IDs)
4. **Flexibility:** Integration with various telemetry backends (console, App Insights, OpenTelemetry, custom)

Microsoft recommends Application Insights for Azure applications, but OpenTelemetry is the industry standard for vendor-neutral observability.

Core SDK must remain dependency-free (no MSAL, no telemetry SDKs) to keep bundle size minimal and prevent forced dependencies.

### Decision

> The code samples and interfaces below describe the SDK as implemented. The decision itself (core
> abstractions without dependencies, opt-in adapters) is unchanged.

#### **1. Core Abstractions (Zero Dependencies)**

`@mohsinonxrm/dataverse-sdk-core` defines the interfaces, plus one small implementation
(`ConsoleLogger`):

```typescript
// Logger interface
export interface Logger {
  debug(message: string, meta?: unknown): void;
  info(message: string, meta?: unknown): void;
  warn(message: string, meta?: unknown): void;
  error(message: string, meta?: unknown): void;
}

// Telemetry client interface (2.0, #97)
export interface TelemetryClient {
  trackEvent(
    name: string,
    props?: Record<string, string>,
    measurements?: Record<string, number>
  ): void;
  // Called before each request attempt, in the caller's context
  startDependency(name: string, data: DependencyTelemetry): DependencyHandle;
  trackException(error: unknown, props?: Record<string, string>): void;
}

export interface DependencyTelemetry {
  target?: string; // host
  method?: string;
  url?: string; // redacted (see Privacy & Security)
  durationMs?: number; // on end
  success?: boolean; // on end
  resultCode?: string; // on end: HTTP status, as a string
  properties?: Record<string, string>;
}

export interface DependencyHandle {
  headers?: Record<string, string>; // W3C traceparent / tracestate to send
  run?<T>(fn: () => Promise<T>): Promise<T>; // run the attempt with the dependency active
  end(data: DependencyTelemetry): void; // the full record, once the attempt is done
}

// Console logger, opt-in. `level` drops messages below it (default "debug").
export class ConsoleLogger implements Logger {
  constructor(options?: { level?: "debug" | "info" | "warn" | "error" });
  // debug/info/warn/error write to console.debug/info/warn/error, with meta as its own argument
}
```

#### **2. Default Behavior**

- **Logger:** none. The SDK logs nothing unless you pass `logger` (for example
  `new ConsoleLogger()`), because request URLs carry filters, record ids and alternate keys.
- **Telemetry:** none. Without a `telemetry` client nothing is tracked; the diagnostic request
  headers (below) are still sent.
- Developers opt in by providing implementations.

#### **3. Optional Telemetry Packages (v1.0)**

**Application Insights Adapter** (Node.js; it emits OpenTelemetry spans and log records that the
Azure Monitor OpenTelemetry distro exports. Browsers use the `/browser` entry point, on the app's own
`ApplicationInsights` instance from `@microsoft/applicationinsights-web`, an optional peer
dependency; it imports nothing from Node.js or OpenTelemetry, which the bundle-size check enforces):

```typescript
// @mohsinonxrm/dataverse-sdk-appinsights
import { ApplicationInsightsTelemetryClient } from "@mohsinonxrm/dataverse-sdk-appinsights";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com/api/data/v9.2",
  tokenProvider,
  // Either pass a connection string (the adapter calls useAzureMonitor() once), or call
  // useAzureMonitor() in your app and pass no options.
  telemetry: new ApplicationInsightsTelemetryClient({
    connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
  }),
});
```

**OpenTelemetry Adapter:**

```typescript
// @mohsinonxrm/dataverse-sdk-otel
import { OpenTelemetryClient } from "@mohsinonxrm/dataverse-sdk-otel";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { trace } from "@opentelemetry/api";

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com/api/data/v9.2",
  tokenProvider,
  // Without options the adapter uses the global tracer provider
  telemetry: new OpenTelemetryClient({ tracer: trace.getTracer("dataverse-sdk") }),
});
```

#### **4. Instrumentation Points**

**TelemetryMiddleware** in the core pipeline reports, when a `telemetry` client is set:

1. **One dependency per request attempt** (`startDependency("dataverse", …)` before the attempt,
   `end(…)` after it): `target` (host), `method` and redacted `url` at the start; `durationMs`,
   `success` and `resultCode` at the end; the properties `sdk.version`, `correlation.id`,
   `feature.usage` and `retry.attempt` (and `error.type` when the attempt threw). Retries and the
   resend after a 401 run outside it, so each is its own dependency, started in the caller's
   context: siblings under the caller's span, never children of an earlier attempt.
2. **Exceptions** (`trackException`): network failures, aborts and timeouts, with
   `correlation.id`, `request.method` and `request.url`.
3. **Events** (`trackEvent`, names in `TelemetryEvents`): `dataverse.throttle` for each 429 (the
   limit hit, from the error code, with `Retry-After` and `x-ms-dop-hint`), `dataverse.retry`
   before each retry wait (from the retry middleware), `dataverse.concurrency.wait` when a request
   waited for a slot and `dataverse.concurrency.limit` when `x-ms-dop-hint` changed the limit (from
   the concurrency middleware), `dataverse.batch` for each `$batch` (from the batch package,
   through `DataverseClient.trackEvent`), and `dataverse.circuit.state` when an opt-in
   `CircuitBreakerMiddleware` changes state (closed, open, half-open or isolated, with the reason).
4. **Per request:** `new MiddlewareRequestOptions([{ type: "telemetry", disable: true }])` turns
   tracking (and the events) off for one request; `customProperties` adds properties to its
   dependency.

Calls into the telemetry client are guarded: if a method, or a handle's `run` or `end`, throws, the
error is logged with `logger.warn` and dropped, and the request carries on. A `run` that misbehaves
still runs the attempt exactly once.

Retry details are also available without telemetry: `retry.onRetry(info)` runs before each retry
(attempt, status, delay, `Retry-After`), and `getRetryAttempts(response)` lists the attempts behind
a response.

#### **5. Correlation and Trace Context**

- Each request gets a correlation id, sent as `x-ms-correlation-id` and the same on every retry.
  Pass your own with the request option `correlationId`.
- The SDK also sends `x-ms-sdk-version` and `x-ms-feature-usage`, and `retry-attempt` on retries.
- **W3C Trace Context (#97).** When the dependency handle carries `headers`, the SDK sends its
  `traceparent` (and `tracestate`) with that attempt, so the request is a child of the attempt's
  dependency. Only those two names are sent, only a valid `traceparent`, and only to origins that
  may receive the access token (`baseUrl` and `allowedTokenOrigins`, the same rule as the token).
  The OpenTelemetry adapters start a CLIENT span with the active context, inject it with the app's
  registered propagator and make it active (`run`) while the attempt runs. The browser App
  Insights adapter sends trace context only with `propagateTraceContext: true` (CORS preflight).
- `diagnosticHeaders: false` (or an object, one header at a time, including `traceContext`) turns
  these headers off; telemetry still records the correlation id and the dependencies.

```typescript
// Use your own correlation id for one request
await client.api("/accounts").get({ correlationId: userSessionId });
// Sent: x-ms-correlation-id: <userSessionId>
```

#### **6. Custom Telemetry**

Developers can implement custom telemetry:

```typescript
import type { DependencyHandle, TelemetryClient } from "@mohsinonxrm/dataverse-sdk-core";

// Send each call to your own backend; this one writes to the console
class CustomTelemetryClient implements TelemetryClient {
  trackEvent(name: string, props?: Record<string, string>) {
    console.info("event", name, props);
  }
  startDependency(name: string): DependencyHandle {
    // No trace context: no `headers`, no `run`. `end` gets the outcome.
    return {
      end: (data) => console.info("dependency", name, data.resultCode, data.durationMs, data.url),
    };
  }
  trackException(error: unknown, props?: Record<string, string>) {
    console.error("exception", error, props);
  }
}

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  tokenProvider,
  telemetry: new CustomTelemetryClient(),
});
```

#### **7. Privacy & Security**

- **No PII in telemetry or logs by default:**
  - Request and response bodies are never logged or tracked
  - URLs are redacted: origin and path, with GUID keys as `({id})`, other keys as `(…)` and the
    query as `?…`. `redactUrl: (url) => …` on the client changes this (`defaultRedactUrl` is exported)
- **Opt-in full URLs in logs** while debugging:

  ```typescript
  new DataverseClient({
    baseUrl,
    tokenProvider,
    logger: new ConsoleLogger(),
    logging: { fullUrls: true },
  });
  ```

- **Credentials:** request headers, including `authorization`, are not logged or tracked.

### Consequences

**Pros:**

- Core remains zero-dependency (minimal bundle size)
- Flexibility: developers choose telemetry backend
- Console logging is one option away (`logger: new ConsoleLogger()`), and silent by default
- Industry-standard OpenTelemetry support
- Azure-native App Insights support
- Privacy-first (no PII by default)

**Cons:**

- Developers must opt-in to rich telemetry
- Multiple packages to understand (core + telemetry adapter)
- Telemetry adapters have external dependencies

### Alternatives Considered

**Built-in App Insights:** Rejected because it forces dependency on all users, increases bundle size, and couples to Azure.

**Only OpenTelemetry:** Rejected because App Insights is common in Azure applications and direct integration provides better defaults.

**No telemetry interfaces:** Rejected because production applications require observability, and providing no guidance leads to inconsistent implementations.
