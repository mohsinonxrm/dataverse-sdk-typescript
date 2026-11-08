export * from "./abstractions/http.js";
export * from "./abstractions/middleware.js";
export * from "./abstractions/executable.js";
export * from "./abstractions/options.js";

export * from "./client/index.js";
export * from "./errors/index.js";
export * from "./paging/index.js";

// Waiting for system jobs (#318)
export * from "./asyncoperation/waitForAsyncOperation.js";
export * from "./errors/DataverseAsyncOperationError.js";

// New exports for enhanced patterns
export {
  RequestOptions as MiddlewareRequestOptions,
  ConcurrencyOptions as MiddlewareConcurrencyOptions,
  TelemetryOptions,
  LoggingOptions,
  type MiddlewareOptions,
  type MiddlewareOptionEntry,
  type BuiltInMiddlewareOptions,
} from "./middleware/RequestOptions.js";

export * from "./utils/HeaderUtils.js";
export { entityIdFromResponse } from "./utils/response.js";
export { ConsoleLogger, type LogLevel } from "./utils/consoleLogger.js";
export { defaultRedactUrl } from "./utils/redact.js";
export { buildUrl } from "./utils/url.js";
export { SDK_VERSION } from "./version.js";
export { parseClaimsChallenge } from "./utils/claimsChallenge.js";

// Pipeline building blocks, for `DataverseClientOptions.middleware` (#18).
export { Pipeline } from "./pipeline/Pipeline.js";
export { FetchRequestAdapter } from "./pipeline/FetchRequestAdapter.js";
export { buildDefaultMiddleware } from "./pipeline/DefaultMiddleware.js";
export { AuthMiddleware } from "./middleware/AuthMiddleware.js";
export { ODataHeadersMiddleware } from "./middleware/ODataHeadersMiddleware.js";
export { ConcurrencyMiddleware } from "./middleware/ConcurrencyMiddleware.js";
export { RetryMiddleware } from "./middleware/RetryMiddleware.js";
export { TelemetryMiddleware } from "./middleware/TelemetryMiddleware.js";
export { LoggingMiddleware } from "./middleware/LoggingMiddleware.js";
// Fault injection for resilience tests; never in the default pipeline (#308).
export {
  ChaosMiddleware,
  type ChaosFault,
  type ChaosOptions,
  type ChaosRequestOptions,
  type ChaosScriptInfo,
} from "./middleware/ChaosMiddleware.js";
export { getRetryAttempts } from "./middleware/RetryMiddleware.js";
export type { RawBody } from "./utils/body.js";
// Opt-in resilience middleware (#343).
export {
  CircuitBreakerMiddleware,
  type CircuitBreakerOptions,
  type CircuitState,
  type CircuitStateChange,
} from "./middleware/CircuitBreakerMiddleware.js";
export {
  BulkheadMiddleware,
  type BulkheadOptions,
  type BulkheadRequestOptions,
} from "./middleware/BulkheadMiddleware.js";
export {
  DataverseBulkheadRejectedError,
  DataverseCircuitOpenError,
} from "./errors/DataverseResilienceErrors.js";

export {
  DataverseAuthenticationError,
  DataverseInvalidRequestError,
  DataverseServiceError,
  DataverseNetworkError,
  DataverseAbortError,
} from "./errors/NamedErrors.js";

export * from "./telemetry/FeatureUsageTracker.js";

export { odata, type EqValue } from "./odata/filter.js";
export type { ExpandOptions } from "./odata/expand.js";
export {
  odataLiteral,
  odataKey,
  type ODataKey,
  type ODataParameterKind,
  type ODataRecordReference,
  type ODataScalar,
} from "./odata/literal.js";

// FetchXML (#51)
export type { FetchXmlPage, FetchXmlOptions } from "./fetchxml/page.js";
export {
  parsePagingCookie,
  buildPagedFetchXml,
  type ParsedPagingCookie,
  type FetchXmlPaging,
} from "./fetchxml/pagingCookie.js";
