import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfQueueInRTQIsActiveResponse as msdyn_CheckIfQueueInRTQIsActiveResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfQueueInRTQIsActive request message
 *
 * Web API Action: msdyn_CheckIfQueueInRTQIsActive
 */
export class msdyn_CheckIfQueueInRTQIsActiveRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfQueueInRTQIsActiveResponse>
{
  constructor() {
    super("msdyn_CheckIfQueueInRTQIsActive");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfQueueInRTQIsActive`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfQueueInRTQIsActiveResponse> {
    const data = await response.json();
    return msdyn_CheckIfQueueInRTQIsActiveResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckIfQueueInRTQIsActive response message
 */
export class msdyn_CheckIfQueueInRTQIsActiveResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfQueueInRTQIsActiveResponseData) {
    super("msdyn_CheckIfQueueInRTQIsActive");
  }

  static fromResponse(data: unknown): msdyn_CheckIfQueueInRTQIsActiveResponse {
    return new msdyn_CheckIfQueueInRTQIsActiveResponse(
      responseObject<msdyn_CheckIfQueueInRTQIsActiveResponseData>(data)
    );
  }
}
