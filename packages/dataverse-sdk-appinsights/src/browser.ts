/**
 * Application Insights telemetry adapter for Dataverse SDK, for browsers: built on the app's
 * `ApplicationInsights` instance from `@microsoft/applicationinsights-web`. Imports nothing from
 * Node.js or OpenTelemetry.
 * @packageDocumentation
 */

export { ApplicationInsightsBrowserTelemetryClient } from "./browser/ApplicationInsightsBrowserTelemetryClient.js";
export type { ApplicationInsightsBrowserConfig } from "./browser/types.js";
