---
"@mohsinonxrm/dataverse-sdk-core": minor
---

Typed fields and parameters where plain strings or numbers remained (#480, #482):

- New types: `TelemetryEventName` (the values of `TelemetryEvents`), `AsyncOperationStateCode` and `AsyncOperationStatusCode` (union types named like their constant objects), `EdmPrimitiveType` (`Edm.String`, `Edm.Int32`, …) and `ODataTypeName` (`EdmPrimitiveType | (string & {})`).
- `TelemetryClient.trackEvent()` and `DataverseClient.trackEvent()` take `TelemetryEventName | (string & {})`: the SDK's event names are suggested, and any other name still compiles. A telemetry client written with `name: string` still implements the interface.
- `odataLiteral.parameter()` takes an `ODataTypeName` (any string still compiles).
- `LoggingOptions.logLevel` is a `LogLevel` (the same four values as before).
- `DataverseRequestBuilder.response()` takes an `HttpMethod` (the same five methods as before).

What narrows: `DependencyTelemetry.method` is an `HttpMethod` instead of a `string`, so code that builds one with an arbitrary string (for example a custom middleware calling `startDependency`) no longer compiles. `AsyncOperation.statecode` and `statuscode` are `AsyncOperationStateCode | (number & {})` and `AsyncOperationStatusCode | (number & {})`: the known values are suggested and any number still compiles, so they don't narrow. Nothing changes at run time.
