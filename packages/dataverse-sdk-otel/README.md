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

| Option             | Type             | Description                                                       |
| ------------------ | ---------------- | ----------------------------------------------------------------- |
| `tracer`           | `Tracer`         | Tracer for every span. Takes precedence over `tracerProvider`.    |
| `tracerProvider`   | `TracerProvider` | Provider to get the tracer from. Defaults to the global provider. |
| `disableTelemetry` | `boolean`        | Make every method a no-op. Defaults to `false`.                   |

The adapter doesn't set `service.name`: it is a resource attribute, so set it on your OpenTelemetry
SDK (`new NodeSDK({ serviceName })` or the `OTEL_SERVICE_NAME` environment variable).

## What gets recorded

| `TelemetryClient` call | OpenTelemetry output                                                                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `startDependency`      | A `CLIENT` span per Dataverse request attempt, named `<METHOD> dataverse`, active while the attempt runs.                   |
| `trackException`       | An `INTERNAL` span `dataverse.exception` (a child of the active span, if any) with an `exception` event and status `ERROR`. |
| `trackEvent`           | An event on the active span; when no span is active, a short `INTERNAL` span named after the event.                         |

The SDK calls `trackEvent` for throttling, retries, concurrency waits and `$batch` executions
(`dataverse.throttle`, `dataverse.retry`, `dataverse.concurrency.wait`,
`dataverse.concurrency.limit`, `dataverse.batch`; see `TelemetryEvents` in core). They are emitted
in your context, so they become events on your span, with their measurements as `dataverse.*`
attributes.

The SDK's `TelemetryMiddleware` calls `startDependency` for every request attempt (each retry and
each resend after a 401 is its own span) and `trackException` when a request fails without a
response (for example a network error).

### Dependency span attributes

| Attribute                   | Value                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------- |
| `http.request.method`       | `GET`, `POST`, `PATCH`, ...                                                            |
| `url.full`                  | The request URL as the SDK redacted it (see [Privacy](#privacy))                       |
| `server.address`            | Host name without the port, e.g. `org.crm.dynamics.com`                                |
| `server.port`               | Port, e.g. `443`, or `8443` for `org.example.com:8443`                                 |
| `http.response.status_code` | Response status, when there is a response                                              |
| `error.type`                | On failure: the status code, or the error name when there is no response               |
| `dataverse.correlation_id`  | The `x-ms-correlation-id` sent with the request                                        |
| `http.request.resend_count` | On a retry: the retry number (`dataverse.retry.attempt`)                               |
| `dataverse.*`               | Other properties from the SDK, e.g. `dataverse.sdk.version`, `dataverse.retry.attempt` |

A call with a response fails when its status is 4xx or 5xx (so a `304 Not Modified` is not an
error); a call without one (a network error) fails when `success` is `false`. Failed calls get
span status `ERROR`. Successful calls leave the status unset, as the OpenTelemetry HTTP
conventions recommend for client spans.

### Span model and trace context

The SDK calls `startDependency` before it sends an attempt and ends the handle when the response
or the error is in. So:

- the dependency span is a child of the span that is active when the request is made (your app's
  span), in the same trace. Each retry, and the resend after a 401, is a span of its own, a sibling
  under your span, never a child of an earlier attempt;
- the span is the active span while the attempt runs, so spans from HTTP auto-instrumentation (for
  example `@opentelemetry/instrumentation-undici` for `fetch`) are its children;
- the adapter injects the span's context with your registered propagator
  (`propagation.inject`), and the SDK sends the resulting `traceparent` and `tracestate` to
  Dataverse. `NodeSDK` registers the W3C Trace Context propagator; with a bare tracer provider,
  call `propagation.setGlobalPropagator(new W3CTraceContextPropagator())` (from
  `@opentelemetry/core`), or no header is sent. Other headers a propagator adds (such as
  `baggage`) are not sent.

The SDK sends trace context only to origins that may receive the access token (`baseUrl` and
`allowedTokenOrigins`). `diagnosticHeaders: { traceContext: false }` (or `false`) turns it off; the
spans are still recorded. In a browser, `traceparent` and `tracestate` are part of the CORS
preflight, so the Dataverse origin must allow them.

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

The SDK redacts the request URL before the adapter sees it: its `TelemetryMiddleware` runs the
URL through the client's `redactUrl` option and passes the result, which the adapter records as
is in `url.full` and in the exception's `dataverse.request.url`. The default keeps the origin and
path, turns a GUID key into `({id})`, any other key into `(…)` and the query into `?…`, so
`accounts(00000000-…)?$filter=name eq 'x'` is recorded as `…/accounts({id})?…`. A custom
`redactUrl` (for example one that keeps `$top`) decides what is recorded.

Exception messages and stack traces, and other property values, can contain URLs the SDK did not
redact, so the adapter redacts every URL in them:

- every query parameter value becomes `REDACTED` and only the names are kept, so
  `?$filter=emailaddress1 eq 'jane@contoso.com'&$top=5` is recorded as
  `?$filter=REDACTED&$top=REDACTED`;
- quoted string literals in the path, such as alternate keys or function parameters, become
  `'REDACTED'`: `contacts(emailaddress1='jane@contoso.com')` is recorded as
  `contacts(emailaddress1='REDACTED')`;
- user info (`user:password@`) and the `#fragment` are dropped.

No headers, request bodies or response bodies are recorded. If you call `startDependency`
yourself, `url` is recorded as you pass it, so redact it first. Properties you pass to
`trackEvent` or `trackException` yourself are recorded as they are (with URLs redacted), so don't
put personal data in them.

## License

AGPL-3.0
