import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * AddWorkQueueItemProcessingHistoryEntry request message
 *
 * Web API Action: AddWorkQueueItemProcessingHistoryEntry
 */
export class AddWorkQueueItemProcessingHistoryEntryRequest
  extends OrganizationRequest
  implements Executable<AddWorkQueueItemProcessingHistoryEntryResponse>
{
  constructor(
    public workqueueitemId: string,
    public item: EntityReference
  ) {
    super("AddWorkQueueItemProcessingHistoryEntry");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<AddWorkQueueItemProcessingHistoryEntryResponse> {
    // No return value (204 No Content)
    return new AddWorkQueueItemProcessingHistoryEntryResponse();
  }
}

/**
 * AddWorkQueueItemProcessingHistoryEntry response message
 */
export class AddWorkQueueItemProcessingHistoryEntryResponse extends OrganizationResponse {
  constructor() {
    super("AddWorkQueueItemProcessingHistoryEntry");
  }

  static fromResponse(_data: unknown): AddWorkQueueItemProcessingHistoryEntryResponse {
    return new AddWorkQueueItemProcessingHistoryEntryResponse();
  }
}
