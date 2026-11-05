/**
 * @fileoverview Named error classes for better error handling and discoverability
 * Each error has a .name property for searchability and debugging
 */

import { DataverseError } from "./DataverseError.js";
import { headersToRecord, requestIdFrom } from "./responseDetails.js";

/**
 * Authentication/authorization errors
 * Thrown when token acquisition fails or access is denied
 *
 * @example
 * ```typescript
 * const error = new DataverseAuthenticationError('Access token acquisition failed');
 * error.name; // 'EmptyAccessToken'
 * ```
 */
export class DataverseAuthenticationError extends DataverseError {
  constructor(message?: string, baseError?: Error) {
    super(message, baseError);
    Object.setPrototypeOf(this, DataverseAuthenticationError.prototype);
    this.name = "DataverseAuthenticationError";
  }

  /**
   * Create error for empty/null access token
   */
  static emptyAccessToken(): DataverseAuthenticationError {
    const error = new DataverseAuthenticationError("Access token cannot be null or empty");
    error.name = "EmptyAccessToken";
    return error;
  }

  /**
   * Create error for token acquisition failure
   */
  static tokenAcquisitionFailed(details?: string): DataverseAuthenticationError {
    const error = new DataverseAuthenticationError(
      `Failed to acquire access token${details ? ": " + details : ""}`
    );
    error.name = "TokenAcquisitionFailed";
    return error;
  }

  /**
   * Create error for unauthorized access (401)
   */
  static unauthorized(message?: string): DataverseAuthenticationError {
    const error = new DataverseAuthenticationError(message ?? "Unauthorized access");
    error.name = "Unauthorized";
    error.status = 401;
    return error;
  }

  /**
   * Create error for forbidden access (403)
   */
  static forbidden(message?: string): DataverseAuthenticationError {
    const error = new DataverseAuthenticationError(message ?? "Access forbidden");
    error.name = "Forbidden";
    error.status = 403;
    return error;
  }
}

/**
 * Client-side validation and configuration errors
 * Thrown when request is invalid or client is misconfigured
 *
 * @example
 * ```typescript
 * const error = DataverseInvalidRequestError.emptyScopesError();
 * error.name; // 'EmptyScopes'
 * ```
 */
export class DataverseInvalidRequestError extends DataverseError {
  constructor(message?: string, baseError?: Error) {
    super(message, baseError);
    Object.setPrototypeOf(this, DataverseInvalidRequestError.prototype);
    this.name = "DataverseInvalidRequestError";
  }

  /**
   * Create error for empty scopes
   */
  static emptyScopes(): DataverseInvalidRequestError {
    const error = new DataverseInvalidRequestError(
      "Scopes cannot be empty. Please provide scopes."
    );
    error.name = "EmptyScopes";
    return error;
  }

  /**
   * Create error for invalid base URL
   */
  static invalidBaseUrl(url: string): DataverseInvalidRequestError {
    const error = new DataverseInvalidRequestError(`Invalid base URL: ${url}`);
    error.name = "InvalidBaseUrl";
    return error;
  }

  /**
   * Create error for missing required parameter
   */
  static missingParameter(paramName: string): DataverseInvalidRequestError {
    const error = new DataverseInvalidRequestError(`Missing required parameter: ${paramName}`);
    error.name = "MissingParameter";
    return error;
  }

  /**
   * Create error for invalid parameter value
   */
  static invalidParameter(paramName: string, reason: string): DataverseInvalidRequestError {
    const error = new DataverseInvalidRequestError(`Invalid parameter '${paramName}': ${reason}`);
    error.name = "InvalidParameter";
    return error;
  }

  /**
   * Create error for a request whose URL may not receive the bearer token
   * (another origin, or a URL carrying user info).
   */
  static tokenOriginRefused(reason: string): DataverseInvalidRequestError {
    const error = new DataverseInvalidRequestError(`Request refused: ${reason}`);
    error.name = "TokenOriginRefused";
    return error;
  }

  /**
   * Create error for serialization failures
   */
  static serializationFailed(details?: string): DataverseInvalidRequestError {
    const error = new DataverseInvalidRequestError(
      `Failed to serialize request body${details ? ": " + details : ""}`
    );
    error.name = "SerializationFailed";
    return error;
  }
}

/**
 * Service/server errors from Dataverse Web API
 * Represents errors returned from the server
 *
 * @example
 * ```typescript
 * const error = DataverseServiceError.fromResponse(response, body);
 * error.status; // 400
 * error.code; // 'InvalidRequest'
 * ```
 */
export class DataverseServiceError extends DataverseError {
  constructor(statusCode: number, message?: string, baseError?: Error) {
    super(message, baseError);
    Object.setPrototypeOf(this, DataverseServiceError.prototype);
    this.name = "DataverseServiceError";
    this.status = statusCode;
  }

  /**
   * Create error from HTTP response
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async fromResponse(response: Response, body?: any): Promise<DataverseServiceError> {
    const statusCode = response.status;
    const requestId = requestIdFrom(response.headers);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let errorBody = body;
    if (!errorBody && response.body) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }
    }

    let message = `HTTP ${String(statusCode)}`;
    let code: string | undefined;

    // Parse OData error format
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (errorBody && typeof errorBody === "object" && errorBody.error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      code = errorBody.error.code;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message = errorBody.error.message ?? message;
    }

    const error = new DataverseServiceError(statusCode, message);
    error.code = code;

    error.requestId = requestId;
    error.body = errorBody;
    error.headers = headersToRecord(response.headers);

    // Set specific error names based on status code
    if (statusCode === 400) {
      error.name = "BadRequest";
    } else if (statusCode === 404) {
      error.name = "NotFound";
    } else if (statusCode === 429) {
      error.name = "TooManyRequests";
    } else if (statusCode === 500) {
      error.name = "InternalServerError";
    } else if (statusCode === 503) {
      error.name = "ServiceUnavailable";
    } else if (statusCode >= 400 && statusCode < 500) {
      error.name = "ClientError";
    } else if (statusCode >= 500) {
      error.name = "ServerError";
    }

    return error;
  }

  /**
   * Create error for throttling (429)
   */
  static throttled(retryAfter?: number): DataverseServiceError {
    const message = retryAfter
      ? `Request throttled. Retry after ${String(retryAfter)}ms`
      : "Request throttled";
    const error = new DataverseServiceError(429, message);
    error.name = "TooManyRequests";
    error.code = "Throttled";
    return error;
  }

  /**
   * Create error for not found (404)
   */
  static notFound(entityType?: string, id?: string): DataverseServiceError {
    const message =
      entityType && id ? `${entityType} with id ${id} not found` : "Resource not found";
    const error = new DataverseServiceError(404, message);
    error.name = "NotFound";
    return error;
  }

  /**
   * Create error for bad request (400)
   */
  static badRequest(message: string): DataverseServiceError {
    const error = new DataverseServiceError(400, message);
    error.name = "BadRequest";
    return error;
  }
}

/**
 * Network/connectivity errors
 * Thrown when network request fails or times out
 *
 * @example
 * ```typescript
 * const error = DataverseNetworkError.timeout(30000);
 * error.name; // 'RequestTimeout'
 * ```
 */
export class DataverseNetworkError extends DataverseError {
  constructor(message?: string, baseError?: Error) {
    super(message, baseError);
    Object.setPrototypeOf(this, DataverseNetworkError.prototype);
    this.name = "DataverseNetworkError";
  }

  /**
   * Create error for network failure
   */
  static connectionFailed(details?: string, cause?: unknown): DataverseNetworkError {
    const error = new DataverseNetworkError(
      `Network connection failed${details ? ": " + details : ""}`
    );
    error.name = "ConnectionFailed";
    if (cause !== undefined) error.cause = cause;
    return error;
  }

  /**
   * Create error for request timeout
   */
  static timeout(timeoutMs: number): DataverseNetworkError {
    const error = new DataverseNetworkError(`Request timed out after ${String(timeoutMs)}ms`);
    error.name = "RequestTimeout";
    return error;
  }

  /**
   * Create error for aborted request
   */
  static aborted(): DataverseNetworkError {
    const error = new DataverseNetworkError("Request was aborted");
    error.name = "RequestAborted";
    return error;
  }
}

/**
 * The request was cancelled through its `AbortSignal`. Its `name` is `"AbortError"`, like the
 * `DOMException` fetch throws, so existing `err.name === "AbortError"` checks keep working; the
 * original error is `cause`.
 */
export class DataverseAbortError extends DataverseError {
  constructor(message?: string, cause?: unknown) {
    super(message ?? "The request was aborted", cause !== undefined ? { cause } : undefined);
    Object.setPrototypeOf(this, DataverseAbortError.prototype);
    this.name = "AbortError";
  }
}
