# @mohsinonxrm/dataverse-sdk-appinsights

> Application Insights telemetry adapter for Dataverse SDK

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

## Status

⚠️ **v1.0 - Optional Package** - This package is optional and provides integration with Azure Application Insights for monitoring and telemetry.

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-appinsights
```

## Usage

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { ApplicationInsightsTelemetryClient } from "@mohsinonxrm/dataverse-sdk-appinsights";

const telemetryClient = new ApplicationInsightsTelemetryClient({
  connectionString: "InstrumentationKey=your-key-here",
  cloudRoleName: "my-dataverse-app",
});

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  telemetryClient,
});
```

## Features

- **Automatic request tracking** - All HTTP requests to Dataverse are tracked
- **Dependency tracking** - External dependencies are logged
- **Exception tracking** - Errors are automatically reported
- **Custom events** - Track retry attempts, throttle events, etc.
- **Performance metrics** - Request duration, concurrency levels

## Configuration

| Option             | Type      | Required | Description                             |
| ------------------ | --------- | -------- | --------------------------------------- |
| `connectionString` | `string`  | Yes      | Application Insights connection string  |
| `cloudRoleName`    | `string`  | No       | Cloud role name for distributed tracing |
| `disableTelemetry` | `boolean` | No       | Disable telemetry (defaults to false)   |

## What Gets Tracked

- **HTTP Requests**: All Web API calls with duration, status, URL (sanitized)
- **Retry Attempts**: Automatic retry events with reason and delay
- **Throttle Events**: 429 responses with Retry-After header values
- **Errors**: All exceptions with stack traces
- **Concurrency**: Adaptive concurrency level changes

## Privacy

- ✅ No PII is sent by default
- ✅ Credentials are masked in URLs and headers
- ✅ Entity IDs are sanitized in telemetry
- ✅ Only metadata (status codes, durations) is tracked

## License

AGPL-3.0
