# @mohsinonxrm/dataverse-sdk-otel

> OpenTelemetry adapter for Dataverse SDK

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

## Status

⚠️ **v1.0 - Optional Package** - This package is optional and provides integration with OpenTelemetry for distributed tracing and observability.

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-otel
```

## Usage

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { OpenTelemetryClient } from "@mohsinonxrm/dataverse-sdk-otel";
import { trace } from "@opentelemetry/api";

const tracer = trace.getTracer("dataverse-sdk");
const telemetryClient = new OpenTelemetryClient({
  tracer,
  serviceName: "my-dataverse-app",
});

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  telemetryClient,
});
```

## Features

- **Distributed tracing** - W3C Trace Context propagation
- **Span creation** - Automatic spans for HTTP requests
- **Custom events** - Track retry attempts, throttle events
- **Metrics** - Request duration, success rate, concurrency levels
- **Flexible backends** - Works with Jaeger, Zipkin, Honeycomb, etc.

## Configuration

| Option             | Type      | Required | Description                           |
| ------------------ | --------- | -------- | ------------------------------------- |
| `tracer`           | `Tracer`  | Yes      | OpenTelemetry tracer instance         |
| `serviceName`      | `string`  | No       | Service name for spans                |
| `disableTelemetry` | `boolean` | No       | Disable telemetry (defaults to false) |

## Instrumentation

The client automatically creates spans for:

- **HTTP requests** to Dataverse Web API
- **Retry attempts** (as span events)
- **Throttle events** (429 responses)
- **Batch operations** (parent span with child spans per request)

### Span Attributes

All spans include:

- `http.method` - HTTP method (GET, POST, etc.)
- `http.url` - Sanitized request URL
- `http.status_code` - Response status code
- `dataverse.operation` - Operation type (query, create, update, etc.)
- `dataverse.entity` - Entity logical name

## Example: Full Setup with Jaeger

```typescript
import { NodeSDK } from "@opentelemetry/sdk-node";
import { JaegerExporter } from "@opentelemetry/exporter-jaeger";
import { trace } from "@opentelemetry/api";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { OpenTelemetryClient } from "@mohsinonxrm/dataverse-sdk-otel";

// Initialize OpenTelemetry SDK
const sdk = new NodeSDK({
  traceExporter: new JaegerExporter({
    endpoint: "http://localhost:14268/api/traces",
  }),
  serviceName: "my-dataverse-app",
});

sdk.start();

// Create Dataverse client with OpenTelemetry
const tracer = trace.getTracer("dataverse-sdk");
const telemetryClient = new OpenTelemetryClient({ tracer });

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  telemetryClient,
});
```

## Privacy

- ✅ No PII is sent by default
- ✅ Credentials are masked in URLs
- ✅ Entity IDs are sanitized
- ✅ Only metadata (durations, status codes) is tracked

## License

AGPL-3.0
