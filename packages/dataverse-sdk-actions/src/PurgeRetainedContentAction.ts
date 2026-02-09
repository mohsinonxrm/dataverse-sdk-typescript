import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Response from PurgeRetainedContent action
 */
export interface PurgeRetainedContentResponse {
  HasMoreRecords: boolean;
  EntityCountCollection: EntityRecordCountCollection;
}

/**
 * PurgeRetainedContent action
 *
 * Unbound action
 */
export class PurgeRetainedContentAction implements Executable<PurgeRetainedContentResponse> {
  constructor(
    public readonly entityName: string,
    public readonly pageSize: number,
    public readonly operationId: string,
    public readonly maxVersionToPurge: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PurgeRetainedContent`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
      PageSize: this.pageSize,
      OperationId: this.operationId,
      MaxVersionToPurge: this.maxVersionToPurge,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<PurgeRetainedContentResponse> {
    const data = await response.json();
    return data as PurgeRetainedContentResponse;
  }
}
