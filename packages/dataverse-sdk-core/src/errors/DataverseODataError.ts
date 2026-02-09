import { DataverseError } from "./DataverseError.js";

export class DataverseODataError extends DataverseError {
  constructor(message: string, init?: ConstructorParameters<typeof DataverseError>[1]) {
    super(message, init);
    this.name = "DataverseODataError";
  }
}
