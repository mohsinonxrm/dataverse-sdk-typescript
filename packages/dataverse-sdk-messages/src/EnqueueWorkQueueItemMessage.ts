import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { EnqueueWorkQueueItemResponse as EnqueueWorkQueueItemResponseData } from "./types/index.js";

/**
 * Parameters of the EnqueueWorkQueueItem message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface EnqueueWorkQueueItemRequestParameters {
  returnCreated?: boolean;
  workQueueItem: EntityReference | AnyEntityPayload;
}

/**
 * EnqueueWorkQueueItem request message
 *
 * Web API Action: EnqueueWorkQueueItem
 *
 * The first argument is the id of the workqueue record to call it on.
 */
export class EnqueueWorkQueueItemRequest
  extends OrganizationRequest
  implements Executable<EnqueueWorkQueueItemResponse>
{
  declare readonly Parameters: Readonly<EnqueueWorkQueueItemRequestParameters>;

  constructor(
    public workqueueId: string,
    parameters: EnqueueWorkQueueItemRequestParameters
  ) {
    super("EnqueueWorkQueueItem", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueues(${this.workqueueId})/Microsoft.Dynamics.CRM.EnqueueWorkQueueItem`;

    const body = requestBody({
      returnCreated: this.Parameters.returnCreated,
      workQueueItem: this.Parameters.workQueueItem,
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

  async parseResponse(response: Response): Promise<EnqueueWorkQueueItemResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return EnqueueWorkQueueItemResponse.fromResponse({});
    return EnqueueWorkQueueItemResponse.fromResponse(await response.json());
  }
}

/**
 * EnqueueWorkQueueItem response message
 */
export class EnqueueWorkQueueItemResponse extends OrganizationResponse {
  constructor(public result: EnqueueWorkQueueItemResponseData) {
    super("EnqueueWorkQueueItem");
  }

  static fromResponse(data: unknown): EnqueueWorkQueueItemResponse {
    return new EnqueueWorkQueueItemResponse(responseObject<EnqueueWorkQueueItemResponseData>(data));
  }
}
