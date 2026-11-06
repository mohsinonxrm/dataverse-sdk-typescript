# @mohsinonxrm/dataverse-sdk-otel

> OpenTelemetry adapter for Dataverse SDK

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

## Status

**Optional package.** It records the SDK's telemetry as OpenTelemetry spans, using only
`@opentelemetry/api`, so it works with any OpenTelemetry SDK and exporter, in Node.js and in
browsers. You set up the SDK and exporter; this package only creates spans.

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-otel @opentelemetry/api
```

`@opentelemetry/api` (`^1.9.0`) is a **peer dependency**: install it in your app, next to your
OpenTelemetry SDK. The adapter then uses your app's copy, so its spans go to the tracer provider
and context your SDK registered, and join the active trace. With a second copy, a span can end up
in a no-op tracer (`npm ls @opentelemetry/api` should show one version).

## Usage

Pass the adapter as the `telemetry` option:

```typescript
import { trace } from "@opentelemetry/api";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { OpenTelemetryClient } from "@mohsinonxrm/dataverse-sdk-otel";

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  tokenProvider,
  telemetry: new OpenTelemetryClient({ tracer: trace.getTracer("my-dataverse-app") }),
});
```

With no options (`new OpenTelemetryClient()`), the adapter uses the global tracer provider with
the instrumentation scope `@mohsinonxrm/dataverse-sdk-otel`.

A telemetry failure never changes the outcome of a Dataverse request: every method catches its
own errors.

## Configuration

The constructor takes one optional config object.

| Option             | Type             | Description                                                                                                                                 |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `tracer`           | `Tracer`         | Tracer for every span. Takes precedence over `tracerProvider`.                                                                              |
| `tracerProvider`   | `TracerProvider` | Provider to get the tracer from. Defaults to the global provider.                                                                           |
| `disableTelemetry` | `boolean`        | Make every method a no-op. Defaults to `false`.                                                                                             |
| `serviceName`      | `string`         | Deprecated and ignored. `service.name` is a resource attribute: set it on your SDK (`new NodeSDK({ serviceName })` or `OTEL_SERVICE_NAME`). |

## What gets recorded

| `TelemetryClient` call | OpenTelemetry output                                                                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `trackDependency`      | A `CLIENT` span per Dataverse HTTP call, named `<METHOD> dataverse`, covering the call's duration.                          |
| `trackException`       | An `INTERNAL` span `dataverse.exception` (a child of the active span, if any) with an `exception` event and status `ERROR`. |
| `trackEvent`           | An event on the active span; when no span is active, a short `INTERNAL` span named after the event.                         |

The SDK's `TelemetryMiddleware` calls `trackDependency` for every request and `trackException`
when a request fails without a response (for example a network error).

### Dependency span attributes

| Attribute                   | Value                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------- |
| `http.request.method`       | `GET`, `POST`, `PATCH`, ...                                                            |
| `url.full`                  | The request URL, redacted (see [Privacy](#privacy))                                    |
| `server.address`            | Host name, e.g. `org.crm.dynamics.com`                                                 |
| `server.port`               | Port, e.g. `443`                                                                       |
| `http.response.status_code` | Response status, when there is a response                                              |
| `error.type`                | On failure: the status code, or the error name when there is no response               |
| `dataverse.correlation_id`  | The `x-ms-correlation-id` sent with the request                                        |
| `dataverse.*`               | Other properties from the SDK, e.g. `dataverse.sdk.version`, `dataverse.retry.attempt` |

Failed calls (`success: false`, or a 4xx/5xx status) get span status `ERROR`. Successful calls
leave the status unset, as the OpenTelemetry HTTP conventions recommend for client spans.

## Example: full setup with OTLP

The Jaeger exporter is deprecated upstream; Jaeger, Grafana Tempo, Honeycomb and most other
backends accept OTLP.

```typescript
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { trace } from "@opentelemetry/api";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { OpenTelemetryClient } from "@mohsinonxrm/dataverse-sdk-otel";

const sdk = new NodeSDK({
  serviceName: "my-dataverse-app",
  traceExporter: new OTLPTraceExporter({ url: "http://localhost:4318/v1/traces" }),
});
sdk.start();

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  tokenProvider,
  telemetry: new OpenTelemetryClient({ tracer: trace.getTracer("my-dataverse-app") }),
});

// On shutdown, flush pending spans.
await sdk.shutdown();
```

## Privacy

URLs are redacted before they are recorded, in `url.full`, in property values and in exception
messages and stack traces:

- every query parameter value becomes `REDACTED` and only the names are kept, so
  `?$filter=emailaddress1 eq 'jane@contoso.com'&$top=5` is recorded as
  `?$filter=REDACTED&$top=REDACTED`;
- quoted string literals in the path, such as alternate keys or function parameters, become
  `'REDACTED'`: `contacts(emailaddress1='jane@contoso.com')` is recorded as
  `contacts(emailaddress1='REDACTED')`;
- user info (`user:password@`) and the `#fragment` are dropped.

Record GUIDs in the path are kept. No headers, request bodies or response bodies are recorded.
Properties you pass to `trackEvent` or `trackException` yourself are recorded as they are (with
URLs redacted), so don't put personal data in them.

## License

AGPL-3.0
