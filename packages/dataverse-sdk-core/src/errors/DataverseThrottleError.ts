import { DataverseError } from "./DataverseError.js";

export class DataverseThrottleError extends DataverseError {
  public readonly retryAfterMs?: number;

  constructor(
    message: string,
    init?: ConstructorParameters<typeof DataverseError>[1] & { retryAfterMs?: number }
  ) {
    super(message, init);
    this.name = "DataverseThrottleError";
    this.retryAfterMs = init?.retryAfterMs;
  }
}
