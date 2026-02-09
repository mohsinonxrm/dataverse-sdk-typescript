export class DataverseError extends Error {
  public readonly status?: number;
  public readonly code?: string;
  public readonly requestId?: string;
  public readonly correlationId?: string;
  public readonly raw?: unknown;

  constructor(
    message: string,
    init?: {
      status?: number;
      code?: string;
      requestId?: string;
      correlationId?: string;
      raw?: unknown;
    }
  ) {
    super(message);
    this.name = "DataverseError";
    this.status = init?.status;
    this.code = init?.code;
    this.requestId = init?.requestId;
    this.correlationId = init?.correlationId;
    this.raw = init?.raw;
  }
}
