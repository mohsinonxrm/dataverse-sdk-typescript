---
"@mohsinonxrm/dataverse-sdk-otel": patch
"@mohsinonxrm/dataverse-sdk-appinsights": patch
---

Dependency spans follow the OpenTelemetry HTTP client conventions and the app's URL redaction (#384):

- `server.address` is the host name without the port (`org.example.com`, not `org.example.com:8443`); the port is in `server.port`.
- `url.full` and the exception's `dataverse.request.url` are recorded as the SDK passes them, already redacted with the client's `redactUrl` option, so a custom `redactUrl` (for example one that keeps `$top`) takes effect. URLs inside exception messages, stack traces and other property values are still redacted by the adapter.
- A call with a response fails when its status is 4xx or 5xx, whatever `success` says, so a `304 Not Modified` is not an error; a call without a response fails when `success` is `false`.

The READMEs now explain that the dependency span is recorded after the call, so it is never the active span: the adapters send no `traceparent`, and HTTP auto-instrumentation spans are its siblings, not its children.
