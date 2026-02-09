import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from AddWorkQueueItemProcessingHistoryEntry action
 */
export interface AddWorkQueueItemProcessingHistoryEntryResponse {
  // No content returned
}

/**
 * AddWorkQueueItemProcessingHistoryEntry action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workqueueitem)
 */
export class AddWorkQueueItemProcessingHistoryEntryAction implements Executable<AddWorkQueueItemProcessingHistoryEntryResponse> {
  constructor(
    public readonly workqueueitemId: string,
    public readonly item: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueueitems(${this.workqueueitemId})/Microsoft.Dynamics.CRM.AddWorkQueueItemProcessingHistoryEntry`;

    const body: Record<string, unknown> = {
      item: this.item,
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

  async parseResponse(response: Response): Promise<AddWorkQueueItemProcessingHistoryEntryResponse> {
    // No return value (204 No Content)
    return {};
  }
}
