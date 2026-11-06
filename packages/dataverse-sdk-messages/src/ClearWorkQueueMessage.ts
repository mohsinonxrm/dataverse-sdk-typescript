import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ClearWorkQueueResponse as ClearWorkQueueResponseData } from "./types/index.js";

/**
 * ClearWorkQueue request message
 *
 * Web API Action: ClearWorkQueue
 *
 * The first argument is the id of the workqueue record to call it on.
 */
export class ClearWorkQueueRequest
  extends OrganizationRequest
  implements Executable<ClearWorkQueueResponse>
{
  constructor(public workqueueId: string) {
    super("ClearWorkQueue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueues(${this.workqueueId})/Microsoft.Dynamics.CRM.ClearWorkQueue`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ClearWorkQueueResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return ClearWorkQueueResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * ClearWorkQueue response message
 */
export class ClearWorkQueueResponse extends OrganizationResponse {
  constructor(public result: ClearWorkQueueResponseData) {
    super("ClearWorkQueue");
  }

  static fromResponse(data: unknown): ClearWorkQueueResponse {
    return new ClearWorkQueueResponse(responseObject<ClearWorkQueueResponseData>(data));
  }
}
