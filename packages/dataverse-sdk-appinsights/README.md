# @mohsinonxrm/dataverse-sdk-appinsights

> Application Insights telemetry adapter for Dataverse SDK

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

## Status

**Optional package, Node.js only.** It sends the SDK's telemetry to Azure Application Insights
through the [Azure Monitor OpenTelemetry distro](https://learn.microsoft.com/azure/azure-monitor/app/opentelemetry-enable?tabs=nodejs)
(`@azure/monitor-opentelemetry`): the adapter emits OpenTelemetry spans and log records, and the
distro exports them. The distro does not run in browsers.

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-appinsights @azure/monitor-opentelemetry @opentelemetry/api @opentelemetry/api-logs
```

The OpenTelemetry and Azure packages are **peer dependencies**, so the adapter uses your app's
copies. Its spans and log records then go to the providers your `useAzureMonitor()` registered,
and join the active trace.

| Package                        | Range      | Needed                                                                                      |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------- |
| `@opentelemetry/api`           | `^1.9.0`   | Always                                                                                      |
| `@opentelemetry/api-logs`      | `^0.221.0` | Always (events and exceptions are log records). `@azure/monitor-opentelemetry` 1.20 uses it |
| `@azure/monitor-opentelemetry` | `^1.20.1`  | Optional: in your app to call `useAzureMonitor()`, or for the `connectionString` option     |
| `@opentelemetry/resources`     | `^2.0.0`   | Optional: only for `cloudRoleName`; `@azure/monitor-opentelemetry` already depends on it    |

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
To flush pending telemetry on shutdown, call `shutdownAzureMonitor()` from
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
| `trackDependency`      | An OpenTelemetry `CLIENT` span per Dataverse HTTP call                                   | `dependencies` (HTTP)      |
| `trackEvent`           | A log record with `microsoft.custom_event.name`; measurements become custom measurements | `customEvents`             |
| `trackException`       | A log record with `exception.type`, `exception.message`, `exception.stacktrace`          | `exceptions`               |

The SDK's `TelemetryMiddleware` calls `trackDependency` for every request and `trackException`
when a request fails without a response (for example a network error).

Dependency spans carry `http.request.method`, `url.full` (redacted), `server.address`,
`server.port`, `http.response.status_code`, `dataverse.correlation_id` (the
`x-ms-correlation-id` sent with the request) and the SDK's other properties under `dataverse.*`
(for example `dataverse.sdk.version`, `dataverse.retry.attempt`). Failed calls are marked as
failed dependencies.

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
