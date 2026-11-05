import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ClearWorkQueueResponse as ClearWorkQueueResponseData } from "./types/index.js";

/**
 * ClearWorkQueue request message
 *
 * Web API Action: ClearWorkQueue
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
    const data = await response.json();
    return ClearWorkQueueResponse.fromResponse(data);
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
