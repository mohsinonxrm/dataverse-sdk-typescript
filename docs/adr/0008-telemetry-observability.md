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

// Telemetry client interface
export interface TelemetryClient {
  trackEvent(
    name: string,
    props?: Record<string, string>,
    measurements?: Record<string, number>
  ): void;
  trackDependency(
    name: string,
    data: {
      target?: string; // host
      method?: string;
      url?: string; // redacted (see Privacy & Security)
      durationMs?: number;
      success?: boolean;
      resultCode?: string; // HTTP status, as a string
      properties?: Record<string, string>;
    }
  ): void;
  trackException(error: unknown, props?: Record<string, string>): void;
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
Azure Monitor OpenTelemetry distro exports):

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

1. **One dependency per request attempt** (`trackDependency("dataverse", …)`): `target` (host),
   `method`, redacted `url`, `durationMs`, `success` and `resultCode`, with the properties
   `sdk.version`, `correlation.id`, `feature.usage` and `retry.attempt` (and `error.type` when the
   attempt threw). Retries run outside it, so each retry is its own dependency.
2. **Exceptions** (`trackException`): network failures, aborts and timeouts, with
   `correlation.id`, `request.method` and `request.url`.
3. **Per request:** `new MiddlewareRequestOptions([{ type: "telemetry", disable: true }])` turns
   tracking off for one request; `customProperties` adds properties to its dependency.

Calls into the telemetry client are guarded: if it throws, the error is logged with `logger.warn`
and dropped, and the request carries on.

Retry details are available without telemetry: `retry.onRetry(info)` runs before each retry
(attempt, status, delay, `Retry-After`), and `getRetryAttempts(response)` lists the attempts behind
a response. Throttle, concurrency and batch metrics are not emitted.

#### **5. Correlation ID Propagation**

- Each request gets a correlation id, sent as `x-ms-correlation-id` and the same on every retry.
  Pass your own with the request option `correlationId`.
- The SDK also sends `x-ms-sdk-version` and `x-ms-feature-usage`, and `retry-attempt` on retries.
  `diagnosticHeaders: false` (or an object, one header at a time) turns them off; telemetry still
  records the correlation id.
- The SDK doesn't send W3C `traceparent` headers.

```typescript
// Use your own correlation id for one request
await client.api("/accounts").get({ correlationId: userSessionId });
// Sent: x-ms-correlation-id: <userSessionId>
```

#### **6. Custom Telemetry**

Developers can implement custom telemetry:

```typescript
import type { TelemetryClient } from "@mohsinonxrm/dataverse-sdk-core";

class CustomTelemetryClient implements TelemetryClient {
  trackEvent(name: string, props?: Record<string, string>) {
    myBackend.logEvent(name, props);
  }
  trackDependency(name: string, data: Parameters<TelemetryClient["trackDependency"]>[1]) {
    // Send to custom backend
    myBackend.logDependency(name, data);
  }
  trackException(error: unknown, props?: Record<string, string>) {
    myBackend.logError(error, props);
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
