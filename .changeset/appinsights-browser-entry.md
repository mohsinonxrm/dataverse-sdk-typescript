---
"@mohsinonxrm/dataverse-sdk-appinsights": minor
---

Browser entry point (#158): `@mohsinonxrm/dataverse-sdk-appinsights/browser` exports `ApplicationInsightsBrowserTelemetryClient`, built on the app's own `ApplicationInsights` instance from `@microsoft/applicationinsights-web` (a new optional peer dependency, `^3.0.0`). Each request attempt is one `Fetch` dependency (`trackDependencyData`) with the URL as core redacted it, the correlation id and the Node adapter's `success` rule; events and exceptions go to `trackEvent` and `trackException`, with URLs redacted. `propagateTraceContext: true` sends a W3C `traceparent` naming the dependency (off by default because of the CORS preflight). The entry imports nothing from Node.js, OpenTelemetry or `@azure/monitor-opentelemetry`; the bundle-size check enforces it. The main entry point is unchanged.
