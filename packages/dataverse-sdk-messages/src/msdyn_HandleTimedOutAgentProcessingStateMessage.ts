import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_HandleTimedOutAgentProcessingState message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_HandleTimedOutAgentProcessingStateRequestParameters {
  msdyn_agentprofileid: string;
}

/**
 * msdyn_HandleTimedOutAgentProcessingState request message
 *
 * Web API Action: msdyn_HandleTimedOutAgentProcessingState
 */
export class msdyn_HandleTimedOutAgentProcessingStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_HandleTimedOutAgentProcessingStateResponse>
{
  declare readonly Parameters: Readonly<msdyn_HandleTimedOutAgentProcessingStateRequestParameters>;

  constructor(parameters: msdyn_HandleTimedOutAgentProcessingStateRequestParameters) {
    super("msdyn_HandleTimedOutAgentProcessingState", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_HandleTimedOutAgentProcessingState`;

    const body = requestBody({
      msdyn_agentprofileid: this.Parameters.msdyn_agentprofileid,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_HandleTimedOutAgentProcessingStateResponse> {
    // No return value (204 No Content)
    return new msdyn_HandleTimedOutAgentProcessingStateResponse();
  }
}

/**
 * msdyn_HandleTimedOutAgentProcessingState response message
 */
export class msdyn_HandleTimedOutAgentProcessingStateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_HandleTimedOutAgentProcessingState");
  }

  static fromResponse(_data: unknown): msdyn_HandleTimedOutAgentProcessingStateResponse {
    return new msdyn_HandleTimedOutAgentProcessingStateResponse();
  }
}
