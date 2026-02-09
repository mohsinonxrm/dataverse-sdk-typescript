import { DataverseError } from "./DataverseError.js";

export interface DuplicateRecord {
  "@odata.id": string;
  "@odata.type": string;
  [key: string]: unknown;
}

export class DataverseDuplicateError extends DataverseError {
  public readonly duplicates: DuplicateRecord[];
  public readonly duplicateRuleId?: string;

  constructor(
    message: string,
    duplicates: DuplicateRecord[],
    duplicateRuleId?: string,
    status?: number
  ) {
    super(message, { status: status ?? 412 });
    this.name = "DataverseDuplicateError";
    this.duplicates = duplicates;
    this.duplicateRuleId = duplicateRuleId;
  }
}
