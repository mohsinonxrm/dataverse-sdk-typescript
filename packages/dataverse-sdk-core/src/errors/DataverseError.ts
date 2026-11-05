/** Dataverse's `error.innererror` (present when the org returns details, e.g. in dev orgs). */
export interface DataverseInnerError {
  message?: string;
  type?: string;
  stacktrace?: string;
  [key: string]: unknown;
}

export interface DataverseErrorInit {
  /** HTTP status code. */
  status?: number;
  /** Dataverse error code, e.g. `"0x80040217"`. */
  code?: string;
  /** Dataverse's id for the request (`x-ms-service-request-id`, then `req_id`, then `x-ms-request-id`). */
  requestId?: string;
  /** The SDK's correlation id for the request (`x-ms-correlation-id`). */
  correlationId?: string;
  /** Response body: parsed JSON, or the text when it isn't JSON. */
  raw?: unknown;
  /** Response headers, names lower-cased. */
  headers?: Record<string, string>;
  innerError?: DataverseInnerError;
  /** The underlying error. */
  cause?: unknown;
}

/**
 * Base class of every error the SDK throws, so `err instanceof DataverseError` catches all of
 * them. HTTP errors carry `status`, `code`, `headers`, `body`, `requestId` and `correlationId`.
 */
export class DataverseError extends Error {
  status?: number;
  code?: string;
  requestId?: string;
  correlationId?: string;
  /** Response body: parsed JSON, or the text when it isn't JSON. Same value as `body`. */
  raw?: unknown;
  headers?: Record<string, string>;
  innerError?: DataverseInnerError;
  /** When the error was created. */
  date: Date;

  /**
   * @param init - Error details, or (older form) the underlying error, which becomes `cause`.
   */
  constructor(message?: string, init?: DataverseErrorInit | Error) {
    const details: DataverseErrorInit | undefined = init instanceof Error ? { cause: init } : init;
    super(
      message ?? (init instanceof Error ? init.message : ""),
      details?.cause !== undefined ? { cause: details.cause } : undefined
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "DataverseError";
    this.date = new Date();
    this.status = details?.status;
    this.code = details?.code;
    this.requestId = details?.requestId;
    this.correlationId = details?.correlationId;
    this.raw = details?.raw;
    this.headers = details?.headers;
    this.innerError = details?.innerError;
    // Older form `(message, error)`: keep the wrapped error's stack, as before.
    if (init instanceof Error && init.stack) this.stack = init.stack;
  }

  /** Response body: parsed JSON, or the text when it isn't JSON. */
  get body(): unknown {
    return this.raw;
  }
  set body(value: unknown) {
    this.raw = value;
  }

  /** @deprecated Use `status`. */
  get statusCode(): number | undefined {
    return this.status;
  }
  set statusCode(value: number | undefined) {
    this.status = value;
  }
}
