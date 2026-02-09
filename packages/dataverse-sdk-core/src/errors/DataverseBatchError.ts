import { DataverseError } from "./DataverseError.js";

export class DataverseBatchError extends DataverseError {
  public readonly partErrors?: Array<{ index: number; status: number; error: DataverseError }>;

  constructor(
    message: string,
    init?: ConstructorParameters<typeof DataverseError>[1] & {
      partErrors?: Array<{ index: number; status: number; error: DataverseError }>;
    }
  ) {
    super(message, init);
    this.name = "DataverseBatchError";
    this.partErrors = init?.partErrors;
  }
}
