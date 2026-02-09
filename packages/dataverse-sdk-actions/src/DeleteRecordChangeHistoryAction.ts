import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from DeleteRecordChangeHistory action
 */
export interface DeleteRecordChangeHistoryResponse {
  DeletedEntriesCount: number;
}

/**
 * DeleteRecordChangeHistory action
 *
 * Unbound action
 */
export class DeleteRecordChangeHistoryAction implements Executable<DeleteRecordChangeHistoryResponse> {
  constructor(public readonly target: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteRecordChangeHistory`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<DeleteRecordChangeHistoryResponse> {
    const data = await response.json();
    return data as DeleteRecordChangeHistoryResponse;
  }
}
