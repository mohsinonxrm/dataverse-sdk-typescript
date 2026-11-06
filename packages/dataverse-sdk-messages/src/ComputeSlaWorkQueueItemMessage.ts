import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ComputeSlaWorkQueueItem request message
 *
 * Web API Action: ComputeSlaWorkQueueItem
 *
 * The first argument is the id of the workqueue record to call it on.
 */
export class ComputeSlaWorkQueueItemRequest
  extends OrganizationRequest
  implements Executable<ComputeSlaWorkQueueItemResponse>
{
  constructor(public workqueueId: string) {
    super("ComputeSlaWorkQueueItem");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueues(${this.workqueueId})/Microsoft.Dynamics.CRM.ComputeSlaWorkQueueItem`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<ComputeSlaWorkQueueItemResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new ComputeSlaWorkQueueItemResponse());
  }
}

/**
 * ComputeSlaWorkQueueItem response message
 */
export class ComputeSlaWorkQueueItemResponse extends OrganizationResponse {
  constructor() {
    super("ComputeSlaWorkQueueItem");
  }

  static fromResponse(_data?: unknown): ComputeSlaWorkQueueItemResponse {
    return new ComputeSlaWorkQueueItemResponse();
  }
}
