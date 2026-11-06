import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import type {
  AccessTokenProvider,
  DataverseClientOptions,
  FetchProvider,
  Logger,
  TelemetryClient,
} from "@mohsinonxrm/dataverse-sdk-core";
import { activity } from "./activity";
import {
  createInspectingFetch,
  createInspectorMiddleware,
  type ExchangeListener,
} from "./inspector";

/** What every client of a session shares: where to send requests and how to authenticate. */
export interface Connection {
  environmentUrl: string;
  tokenProvider: AccessTokenProvider;
  scopes?: string[];
  fetchProvider?: FetchProvider;
}

/**
 * What a scenario receives. `client` is a `DataverseClient` for the selected environment; its
 * requests show up in the scenario's inspector and its logs on the Telemetry page.
 */
export interface Sdk {
  client: DataverseClient;
  environmentUrl: string;
  tokenProvider: AccessTokenProvider;
  /** The `fetch` the session sends requests with (the browser's, or demo mode's). */
  fetchProvider: FetchProvider;
  /** Options for `new DiscoveryClient(tokenProvider, options)` that record its requests too. */
  discoveryOptions: { fetchProvider: FetchProvider; logger: Logger; telemetry: TelemetryClient };
  /** Another client for the same environment with some options changed (error demos). */
  createClient(overrides?: Partial<DataverseClientOptions>): DataverseClient;
}

/** The SDK's `Logger` hook, writing to the activity log. */
export const activityLogger: Logger = {
  debug: (message, meta) =>
    activity.push({ source: "logger", level: "debug", message, detail: meta }),
  info: (message, meta) =>
    activity.push({ source: "logger", level: "info", message, detail: meta }),
  warn: (message, meta) =>
    activity.push({ source: "logger", level: "warn", message, detail: meta }),
  error: (message, meta) =>
    activity.push({ source: "logger", level: "error", message, detail: meta }),
};

/** The SDK's `TelemetryClient` hook, writing to the activity log. */
export const activityTelemetry: TelemetryClient = {
  trackEvent(name, props, measurements) {
    activity.push({
      source: "telemetry",
      level: "info",
      message: `event ${name}`,
      detail: { props, measurements },
    });
  },
  trackDependency(name, data) {
    activity.push({
      source: "telemetry",
      level: data.success === false ? "warn" : "info",
      message: `dependency ${name}: ${data.method ?? ""} ${data.resultCode ?? "-"} in ${data.durationMs ?? 0} ms`,
      detail: data,
    });
  },
  trackException(error, props) {
    const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    activity.push({
      source: "telemetry",
      level: "error",
      message: `exception ${message}`,
      detail: props,
    });
  },
};

// #region client-setup
export function createClient(
  connection: Connection,
  onExchange: ExchangeListener,
  overrides: Partial<DataverseClientOptions> = {}
): DataverseClient {
  return new DataverseClient({
    baseUrl: connection.environmentUrl,
    tokenProvider: connection.tokenProvider,
    scopes: connection.scopes,
    fetchProvider: connection.fetchProvider,
    // Diagnostics: nothing is logged unless a logger is given.
    logger: activityLogger,
    telemetry: activityTelemetry,
    ...overrides,
    retry: {
      maxRetries: 3,
      onRetry: (info) =>
        activity.push({
          source: "retry",
          level: "warn",
          message: `Retry ${info.attempt}/${info.maxRetries} after status ${info.status}, waiting ${info.delayMs} ms`,
          detail: { correlationId: info.correlationId },
        }),
      ...overrides.retry,
    },
    // Appended middleware runs last, right before fetch: it sees each attempt as sent.
    middleware: {
      ...overrides.middleware,
      append: [...(overrides.middleware?.append ?? []), createInspectorMiddleware(onExchange)],
    },
  });
}
// #endregion

export function createSdk(connection: Connection, onExchange: ExchangeListener): Sdk {
  return {
    client: createClient(connection, onExchange),
    environmentUrl: connection.environmentUrl,
    tokenProvider: connection.tokenProvider,
    fetchProvider: connection.fetchProvider ?? {
      fetch: (input, init) => globalThis.fetch(input, init),
    },
    discoveryOptions: {
      fetchProvider: createInspectingFetch(onExchange, "DiscoveryClient", connection.fetchProvider),
      logger: activityLogger,
      telemetry: activityTelemetry,
    },
    createClient: (overrides) => createClient(connection, onExchange, overrides),
  };
}
