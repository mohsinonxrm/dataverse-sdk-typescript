import { DataverseError } from "./DataverseError.js";

export class DataverseUrlError extends DataverseError {
  public readonly actualLength: number;
  public readonly maxLength: number;
  public readonly url: string;

  constructor(message: string, actualLength: number, maxLength: number, url: string) {
    super(message, { status: 400 });
    this.name = "DataverseUrlError";
    this.actualLength = actualLength;
    this.maxLength = maxLength;
    this.url = url;
  }
}
