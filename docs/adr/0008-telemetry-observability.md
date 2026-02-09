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

#### **1. Core Abstractions (Zero Dependencies)**

`@mohsinonxrm/dataverse-sdk-core` defines interfaces without implementations:

```typescript
// Logger interface
export interface Logger {
  debug(message: string, context?: Record<string, unknown>): void;
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, context?: Record<string, unknown>): void;
}

// Telemetry client interface
export interface TelemetryClient {
  trackRequest(request: TelemetryRequest): void;
  trackDependency(dependency: TelemetryDependency): void;
  trackException(exception: TelemetryException): void;
  trackMetric(metric: TelemetryMetric): void;
  trackTrace(trace: TelemetryTrace): void;
  flush(): Promise<void>;
}

// Default console logger
export class ConsoleLogger implements Logger {
  debug(message: string, context?: Record<string, unknown>): void {
    console.debug(message, context);
  }
  // ... other methods
}
```

#### **2. Default Behavior**

- **Logger:** `ConsoleLogger` (logs to console.debug/info/warn/error)
- **TelemetryClient:** `NoOpTelemetryClient` (does nothing)
- Developers opt-in to telemetry by providing implementations

#### **3. Optional Telemetry Packages (v1.0)**

**Application Insights Adapter:**

```typescript
// @mohsinonxrm/dataverse-sdk-appinsights
import { ApplicationInsightsTelemetryClient } from "@mohsinonxrm/dataverse-sdk-appinsights";
import { ApplicationInsights } from "@azure/monitor-opentelemetry";

const appInsights = new ApplicationInsights({
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
});

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com/api/data/v9.2",
  telemetryClient: new ApplicationInsightsTelemetryClient(appInsights),
});
```

**OpenTelemetry Adapter:**

```typescript
// @mohsinonxrm/dataverse-sdk-otel
import { OpenTelemetryClient } from "@mohsinonxrm/dataverse-sdk-otel";
import { trace } from "@opentelemetry/api";

const tracer = trace.getTracer("dataverse-sdk");

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com/api/data/v9.2",
  telemetryClient: new OpenTelemetryClient(tracer),
});
```

#### **4. Instrumentation Points**

**TelemetryMiddleware** in core pipeline tracks:

1. **Request start/end:**
   - Timestamp, duration
   - HTTP method, URL
   - Success/failure status
   - Status code

2. **Retry attempts:**
   - Retry count
   - Retry reason (429, 503, etc.)
   - Retry-After value
   - Backoff duration

3. **Throttle events:**
   - Service protection limit type (requests, time, concurrency)
   - Retry-After duration
   - x-ms-dop-hint value

4. **Concurrency:**
   - Active concurrent requests
   - Semaphore acquisitions/releases
   - Adaptive concurrency adjustments

5. **Batch operations:**
   - Batch size
   - Auto-split occurrences
   - Per-part success/failure counts

6. **Errors:**
   - Exception type (DataverseError, ODataError, ThrottleError)
   - Error message
   - Stack trace
   - Request context

#### **5. Correlation ID Propagation**

- Generate unique `x-ms-client-request-id` for each request
- Propagate `traceparent` header for distributed tracing (W3C Trace Context)
- Include session ID for correlated request batches

```typescript
// Middleware auto-generates correlation IDs
client
  .api("/accounts")
  .header("x-ms-correlation-id", userSessionId) // Optional user-provided
  .get();
// Automatically includes:
// - x-ms-client-request-id: <guid>
// - traceparent: 00-<trace-id>-<span-id>-01
```

#### **6. Custom Telemetry**

Developers can implement custom telemetry:

```typescript
class CustomTelemetryClient implements TelemetryClient {
  trackRequest(request: TelemetryRequest): void {
    // Send to custom backend
    myBackend.logRequest(request);
  }
  // ... other methods
}

const client = new DataverseClient({
  telemetryClient: new CustomTelemetryClient(),
});
```

#### **7. Privacy & Security**

- **No PII in telemetry by default:**
  - Request bodies not logged
  - Response bodies not logged
  - Query parameters sanitized (IDs only)
- **Opt-in verbose logging:**

  ```typescript
  const logger = new ConsoleLogger({ includeRequestBodies: true });
  ```

- **Credential masking:**
  - Authorization headers redacted
  - API keys redacted

### Consequences

**Pros:**

- Core remains zero-dependency (minimal bundle size)
- Flexibility: developers choose telemetry backend
- Default console logging works out-of-box
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
