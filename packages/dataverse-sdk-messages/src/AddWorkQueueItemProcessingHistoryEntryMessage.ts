import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the AddWorkQueueItemProcessingHistoryEntry message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddWorkQueueItemProcessingHistoryEntryRequestParameters {
  item: EntityReference | AnyEntityPayload;
}

/**
 * AddWorkQueueItemProcessingHistoryEntry request message
 *
 * Web API Action: AddWorkQueueItemProcessingHistoryEntry
 *
 * The first argument is the id of the workqueueitem record to call it on.
 */
export class AddWorkQueueItemProcessingHistoryEntryRequest
  extends OrganizationRequest
  implements Executable<AddWorkQueueItemProcessingHistoryEntryResponse>
{
  declare readonly Parameters: Readonly<AddWorkQueueItemProcessingHistoryEntryRequestParameters>;

  constructor(
    public workqueueitemId: string,
    parameters: AddWorkQueueItemProcessingHistoryEntryRequestParameters
  ) {
    super("AddWorkQueueItemProcessingHistoryEntry", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueueitems(${this.workqueueitemId})/Microsoft.Dynamics.CRM.AddWorkQueueItemProcessingHistoryEntry`;

    const body = requestBody({
      item: this.Parameters.item,
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

  parseResponse(_response: Response): Promise<AddWorkQueueItemProcessingHistoryEntryResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new AddWorkQueueItemProcessingHistoryEntryResponse());
  }
}

/**
 * AddWorkQueueItemProcessingHistoryEntry response message
 */
export class AddWorkQueueItemProcessingHistoryEntryResponse extends OrganizationResponse {
  constructor() {
    super("AddWorkQueueItemProcessingHistoryEntry");
  }

  static fromResponse(_data?: unknown): AddWorkQueueItemProcessingHistoryEntryResponse {
    return new AddWorkQueueItemProcessingHistoryEntryResponse();
  }
}
