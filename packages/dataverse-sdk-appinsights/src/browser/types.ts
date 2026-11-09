import type { ApplicationInsights } from "@microsoft/applicationinsights-web";

/**
 * Configuration of {@link ApplicationInsightsBrowserTelemetryClient}.
 *
 * The app creates and loads its own `ApplicationInsights` instance, so it keeps control of the
 * connection string, sampling and cookies; the adapter only calls the methods listed here.
 */
export interface ApplicationInsightsBrowserConfig {
  /**
   * The app's `ApplicationInsights` instance from `@microsoft/applicationinsights-web` (after
   * `loadAppInsights()`), or anything with these methods.
   */
  appInsights: Pick<
    ApplicationInsights,
    "trackDependencyData" | "trackEvent" | "trackException" | "getTraceCtx"
  >;

  /**
   * Send a W3C `traceparent` with each SDK request, naming its dependency, so the request joins
   * the page's trace (defaults to `false`). In a browser this adds `traceparent` to the CORS
   * preflight, which the Dataverse origin must allow; the SDK sends it only to origins that may
   * receive the access token, and `diagnosticHeaders: { traceContext: false }` turns it off.
   * Like `enableCorsCorrelation` in the web SDK's own fetch tracking, it is off by default.
   */
  propagateTraceContext?: boolean;

  /** Turn every method into a no-op (defaults to `false`). */
  disableTelemetry?: boolean;
}
