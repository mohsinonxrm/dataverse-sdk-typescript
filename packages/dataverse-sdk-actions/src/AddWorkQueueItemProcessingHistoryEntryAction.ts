import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from AddWorkQueueItemProcessingHistoryEntry action
 */
export interface AddWorkQueueItemProcessingHistoryEntryResponse {
  // No content returned
}

/**
 * Parameters of the AddWorkQueueItemProcessingHistoryEntry action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddWorkQueueItemProcessingHistoryEntryActionParameters {
  item: EntityReference | AnyEntityPayload;
}

/**
 * AddWorkQueueItemProcessingHistoryEntry action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workqueueitem)
 *
 * The first argument is the id of the workqueueitem record to call it on.
 */
export class AddWorkQueueItemProcessingHistoryEntryAction implements Executable<AddWorkQueueItemProcessingHistoryEntryResponse> {
  constructor(
    public readonly workqueueitemId: string,
    public readonly parameters: AddWorkQueueItemProcessingHistoryEntryActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueueitems(${this.workqueueitemId})/Microsoft.Dynamics.CRM.AddWorkQueueItemProcessingHistoryEntry`;

    const body = requestBody({
      item: this.parameters.item,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<AddWorkQueueItemProcessingHistoryEntryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as AddWorkQueueItemProcessingHistoryEntryResponse;
    return (await response.json()) as AddWorkQueueItemProcessingHistoryEntryResponse;
  }
}
