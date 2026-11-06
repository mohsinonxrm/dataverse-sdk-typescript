import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_StartFollowupSimulation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartFollowupSimulationRequestParameters {
  SimulationResultId: string;
}

/**
 * msdyn_StartFollowupSimulation request message
 *
 * Web API Action: msdyn_StartFollowupSimulation
 */
export class msdyn_StartFollowupSimulationRequest
  extends OrganizationRequest
  implements Executable<msdyn_StartFollowupSimulationResponse>
{
  declare readonly Parameters: Readonly<msdyn_StartFollowupSimulationRequestParameters>;

  constructor(parameters: msdyn_StartFollowupSimulationRequestParameters) {
    super("msdyn_StartFollowupSimulation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartFollowupSimulation`;

    const body = requestBody({
      SimulationResultId: this.Parameters.SimulationResultId,
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

  async parseResponse(response: Response): Promise<msdyn_StartFollowupSimulationResponse> {
    // No return value (204 No Content)
    return new msdyn_StartFollowupSimulationResponse();
  }
}

/**
 * msdyn_StartFollowupSimulation response message
 */
export class msdyn_StartFollowupSimulationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_StartFollowupSimulation");
  }

  static fromResponse(_data: unknown): msdyn_StartFollowupSimulationResponse {
    return new msdyn_StartFollowupSimulationResponse();
  }
}
