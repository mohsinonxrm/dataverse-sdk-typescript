import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { enumBody } from "./internal/enumBody.js";
import type { QueryExpression } from "./types/index.js";

/**
 * Response from SyncBulkOperation action
 */
export interface SyncBulkOperationResponse {
  Result: number;
}

/**
 * SyncBulkOperation action
 *
 * Unbound action
 */
export class SyncBulkOperationAction implements Executable<SyncBulkOperationResponse> {
  constructor(
    public readonly querySet: QueryExpression[] | undefined,
    public readonly operationType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SyncBulkOperation`;

    const body: Record<string, unknown> = {
      QuerySet: enumBody(this.querySet, "QueryExpression"),
      OperationType: this.operationType,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<SyncBulkOperationResponse> {
    const data = await response.json();
    return data as SyncBulkOperationResponse;
  }
}
