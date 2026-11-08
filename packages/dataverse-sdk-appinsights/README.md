# @mohsinonxrm/dataverse-sdk-appinsights

> Application Insights telemetry adapter for Dataverse SDK

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

## Status

**Optional package with two entry points:**

- `@mohsinonxrm/dataverse-sdk-appinsights` (Node.js) sends the SDK's telemetry to Azure Application
  Insights through the [Azure Monitor OpenTelemetry distro](https://learn.microsoft.com/azure/azure-monitor/app/opentelemetry-enable?tabs=nodejs)
  (`@azure/monitor-opentelemetry`): the adapter emits OpenTelemetry spans and log records, and the
  distro exports them. The distro does not run in browsers.
- `@mohsinonxrm/dataverse-sdk-appinsights/browser` (browsers) records it on your app's own
  `ApplicationInsights` instance from `@microsoft/applicationinsights-web`. See
  [Browser entry point](#browser-entry-point). It imports nothing from Node.js, OpenTelemetry or the
  Azure Monitor distro, so a browser bundle never pulls them in.

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-appinsights @azure/monitor-opentelemetry @opentelemetry/api @opentelemetry/api-logs
```

The OpenTelemetry and Azure packages are **peer dependencies**, so the adapter uses your app's
copies. Its spans and log records then go to the providers your `useAzureMonitor()` registered,
and join the active trace.

| Package                              | Range      | Needed                                                                                      |
| ------------------------------------ | ---------- | ------------------------------------------------------------------------------------------- |
| `@opentelemetry/api`                 | `^1.9.0`   | Always                                                                                      |
| `@opentelemetry/api-logs`            | `^0.221.0` | Always (events and exceptions are log records). `@azure/monitor-opentelemetry` 1.20 uses it |
| `@azure/monitor-opentelemetry`       | `^1.20.1`  | Optional: in your app to call `useAzureMonitor()`, or for the `connectionString` option     |
| `@opentelemetry/resources`           | `^2.0.0`   | Optional: only for `cloudRoleName`; `@azure/monitor-opentelemetry` already depends on it    |
| `@microsoft/applicationinsights-web` | `^3.0.0`   | Optional: only for the `/browser` entry point (your app's `ApplicationInsights` instance)   |

Without `@azure/monitor-opentelemetry` the adapter still works with another OpenTelemetry setup
(pass `tracer` / `logger`, or register global providers). Passing `connectionString` without it
throws a `DataverseInvalidRequestError` that names the package to install.

## Usage

Start Azure Monitor once, at the top of your app, then pass the adapter as the `telemetry`
option (recommended):

```typescript
import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { ApplicationInsightsTelemetryClient } from "@mohsinonxrm/dataverse-sdk-appinsights";

useAzureMonitor({
  azureMonitorExporterOptions: {
    connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
  },
});

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  tokenProvider,
  telemetry: new ApplicationInsightsTelemetryClient(),
});
```

If your app does not use Azure Monitor otherwise, the adapter can start it for you. Pass the
connection string, and don't also call `useAzureMonitor()` yourself:

```typescript
const telemetry = new ApplicationInsightsTelemetryClient({
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
  cloudRoleName: "my-dataverse-app",
});

const client = new DataverseClient({ baseUrl, tokenProvider, telemetry });
```

The adapter calls `useAzureMonitor()` at most once per process; later clients reuse that setup.
A later client can't change it: if it passes a different `connectionString`, its telemetry
still goes to the first resource (and its `cloudRoleName` is ignored), and the adapter warns, with
a `WARN` log record through the `logger` or `loggerProvider` you passed, or else once per process
with `console.warn`. To send to several resources, set up OpenTelemetry yourself and pass each
client its own `tracerProvider` and `loggerProvider`. To flush pending telemetry on shutdown, call `shutdownAzureMonitor()` from
`@azure/monitor-opentelemetry`.

A telemetry failure never changes the outcome of a Dataverse request: every method catches its
own errors.

## Configuration

The constructor takes one optional config object.

| Option             | Type             | Description                                                                                                                                                   |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `connectionString` | `string`         | When set, the adapter calls `useAzureMonitor()` with it. Omit it when your app calls `useAzureMonitor()` itself.                                              |
| `cloudRoleName`    | `string`         | Cloud role name (`service.name`). Only used with `connectionString`; otherwise set it on your own `useAzureMonitor()` `resource` or with `OTEL_SERVICE_NAME`. |
| `tracer`           | `Tracer`         | Tracer for dependency spans. Defaults to the global tracer provider, which `useAzureMonitor()` registers.                                                     |
| `tracerProvider`   | `TracerProvider` | Provider to get the tracer from, instead of the global one.                                                                                                   |
| `logger`           | `Logger`         | Logger (`@opentelemetry/api-logs`) for events and exceptions. Defaults to the global logger provider.                                                         |
| `loggerProvider`   | `LoggerProvider` | Provider to get the logger from, instead of the global one.                                                                                                   |
| `disableTelemetry` | `boolean`        | Make every method a no-op and never start Azure Monitor. Defaults to `false`.                                                                                 |

## What gets tracked

| `TelemetryClient` call | Emitted as                                                                               | Application Insights table |
| ---------------------- | ---------------------------------------------------------------------------------------- | -------------------------- |
| `startDependency`      | An OpenTelemetry `CLIENT` span per Dataverse request attempt                             | `dependencies` (HTTP)      |
| `trackEvent`           | A log record with `microsoft.custom_event.name`; measurements become custom measurements | `customEvents`             |
| `trackException`       | A log record with `exception.type`, `exception.message`, `exception.stacktrace`          | `exceptions`               |

The SDK's `TelemetryMiddleware` calls `startDependency` for every request attempt and
`trackException` when a request fails without a response (for example a network error). Its
events (`dataverse.throttle`, `dataverse.retry`, `dataverse.concurrency.wait`,
`dataverse.concurrency.limit`, and `dataverse.batch` from the batch package; see `TelemetryEvents`
in core) are custom events with their measurements as custom measurements.

Dependency spans carry `http.request.method`, `url.full` (as the SDK redacted it),
`server.address` (the host name, without the port), `server.port`,
`http.response.status_code`, `dataverse.correlation_id` (the `x-ms-correlation-id` sent with
the request) and the SDK's other properties under `dataverse.*` (for example
`dataverse.sdk.version`, `dataverse.retry.attempt`). A call with a response is a failed
dependency when its status is 4xx or 5xx (so a `304 Not Modified` is not a failure); a call
without one (a network error) when `success` is `false`.

### Dependency timing and trace context

The SDK calls `startDependency` before it sends an attempt and ends the handle when the response
or the error is in. So:

- the dependency is a child of the span that is active when the request is made (your app's
  request or span), in the same operation. Each retry, and the resend after a 401, is a dependency
  of its own under that parent;
- the span is active while the attempt runs, so spans from HTTP auto-instrumentation (for example
  `@opentelemetry/instrumentation-undici` for `fetch`) are its children;
- the request carries the dependency's W3C `traceparent` (injected with the propagator that
  `useAzureMonitor()` registers), sent only to origins that may receive the access token.
  `diagnosticHeaders: { traceContext: false }` on the client turns it off.

## Browser entry point

`@mohsinonxrm/dataverse-sdk-appinsights/browser` exports `ApplicationInsightsBrowserTelemetryClient`,
built on the `ApplicationInsights` instance your app already creates with
`@microsoft/applicationinsights-web` (`^3.0.0`, an optional peer dependency). Your app keeps
control of the connection string, sampling and cookies.

```bash
pnpm add @mohsinonxrm/dataverse-sdk-appinsights @microsoft/applicationinsights-web
```

The package's OpenTelemetry peer dependencies are for the Node.js entry point. Your package
manager may install them or report them as missing; the browser entry never imports them, so they
don't reach your bundle (the repository's bundle check fails if it would).

```typescript
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { ApplicationInsightsBrowserTelemetryClient } from "@mohsinonxrm/dataverse-sdk-appinsights/browser";

const appInsights = new ApplicationInsights({ config: { connectionString } });
appInsights.loadAppInsights();

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  tokenProvider,
  telemetry: new ApplicationInsightsBrowserTelemetryClient({ appInsights }),
});
```

| Option                  | Type                  | Description                                                                                                |
| ----------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------- |
| `appInsights`           | `ApplicationInsights` | Your loaded instance (only `trackDependencyData`, `trackEvent`, `trackException`, `getTraceCtx` are used). |
| `propagateTraceContext` | `boolean`             | Send a W3C `traceparent` naming each dependency. Defaults to `false` (see below).                          |
| `disableTelemetry`      | `boolean`             | Make every method a no-op. Defaults to `false`.                                                            |

| `TelemetryClient` call    | Web SDK call                                                                  |
| ------------------------- | ----------------------------------------------------------------------------- |
| `startDependency` / `end` | `trackDependencyData`: one `Fetch` dependency per request attempt             |
| `trackEvent`              | `trackEvent`, with the measurements as custom measurements                    |
| `trackException`          | `trackException`, severity Error, with URLs in the message and stack redacted |

Each dependency has the redacted URL as `data`, the host as `target`, `GET /api/data/v9.2/...` as
`name`, the status as `responseCode` (0 when no response came back), the Node adapter's `success`
rule (a 4xx or 5xx fails; a 304 doesn't), and the SDK's properties as custom dimensions
(`dataverse.correlation_id`, `dataverse.retry.attempt`, ...). Its id is
`|<operation id>.<span id>`, in the page's current operation, like the web SDK's own fetch
dependencies.

**Trace context** is off by default, like the web SDK's `enableCorsCorrelation`: Dataverse is
another origin, and `traceparent` becomes part of the CORS preflight, which the Dataverse origin must
allow. With `propagateTraceContext: true`, each request carries a `traceparent` whose parent id is
its dependency's span id, sent only to origins that may receive the access token.

**The web SDK's own fetch tracking** also records the SDK's requests if it is on, so each request
would show up twice. To keep only this adapter's dependencies (which carry the correlation id and
the redacted URL), exclude the Dataverse host from automatic tracking, for example
`excludeRequestFromAutoTrackingPatterns: [/\.dynamics\.com\//]` in the web SDK config.

The browser adapter never throws, like the Node one.

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
yourself, `url` is recorded as you pass it, so redact it first. Properties you pass to `trackEvent` or `trackException` yourself are recorded as they are (with
URLs redacted), so don't put personal data in them.

## License

AGPL-3.0
