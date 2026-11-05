import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Response from BulkRetain action
 */
export interface BulkRetainResponse {
  PagingCookie: string;
  HasMoreRecords: boolean;
  FailedRecords: number;
  EntityCountCollection: EntityRecordCountCollection;
}

/**
 * BulkRetain action
 *
 * Unbound action
 */
export class BulkRetainAction implements Executable<BulkRetainResponse> {
  constructor(
    public readonly entityName: string,
    public readonly fetchXml: string,
    public readonly pageSize: number,
    public readonly operationId: string,
    public readonly pagingCookie: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BulkRetain`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
      FetchXml: this.fetchXml,
      PageSize: this.pageSize,
      OperationId: this.operationId,
      PagingCookie: this.pagingCookie,
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

  async parseResponse(response: Response): Promise<BulkRetainResponse> {
    const data = await response.json();
    return data as BulkRetainResponse;
  }
}
