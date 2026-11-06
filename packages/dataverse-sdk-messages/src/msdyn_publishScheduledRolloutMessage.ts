import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_publishScheduledRollout message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_publishScheduledRolloutRequestParameters {
  RolloutPlanId: string;
}

/**
 * msdyn_publishScheduledRollout request message
 *
 * Web API Action: msdyn_publishScheduledRollout
 */
export class msdyn_publishScheduledRolloutRequest
  extends OrganizationRequest
  implements Executable<msdyn_publishScheduledRolloutResponse>
{
  declare readonly Parameters: Readonly<msdyn_publishScheduledRolloutRequestParameters>;

  constructor(parameters: msdyn_publishScheduledRolloutRequestParameters) {
    super("msdyn_publishScheduledRollout", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_publishScheduledRollout`;

    const body = requestBody({
      RolloutPlanId: this.Parameters.RolloutPlanId,
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

  async parseResponse(response: Response): Promise<msdyn_publishScheduledRolloutResponse> {
    // No return value (204 No Content)
    return new msdyn_publishScheduledRolloutResponse();
  }
}

/**
 * msdyn_publishScheduledRollout response message
 */
export class msdyn_publishScheduledRolloutResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_publishScheduledRollout");
  }

  static fromResponse(_data: unknown): msdyn_publishScheduledRolloutResponse {
    return new msdyn_publishScheduledRolloutResponse();
  }
}
