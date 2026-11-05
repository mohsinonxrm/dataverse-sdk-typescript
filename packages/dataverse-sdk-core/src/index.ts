export * from "./abstractions/http.js";
export * from "./abstractions/middleware.js";
export * from "./abstractions/executable.js";
export * from "./abstractions/options.js";

export * from "./client/index.js";
export * from "./errors/index.js";
export * from "./paging/index.js";

// New exports for enhanced patterns
export {
  RequestOptions as MiddlewareRequestOptions,
  RetryOptions as MiddlewareRetryOptions,
  ConcurrencyOptions as MiddlewareConcurrencyOptions,
  TelemetryOptions,
  LoggingOptions,
  type MiddlewareOptions,
  type MiddlewareOptionEntry,
} from "./middleware/RequestOptions.js";

export * from "./utils/HeaderUtils.js";
export { entityIdFromResponse } from "./utils/response.js";
export { getRetryAttempts } from "./middleware/RetryMiddleware.js";
export type { RawBody } from "./utils/body.js";

export {
  DataverseAuthenticationError,
  DataverseInvalidRequestError,
  DataverseServiceError,
  DataverseNetworkError,
} from "./errors/NamedErrors.js";

export * from "./telemetry/FeatureUsageTracker.js";

export { odata } from "./odata/filter.js";
