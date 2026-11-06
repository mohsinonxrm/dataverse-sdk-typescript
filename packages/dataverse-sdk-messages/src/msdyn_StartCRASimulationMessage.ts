import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_StartCRASimulation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartCRASimulationRequestParameters {
  SimulationResultId: string;
}

/**
 * msdyn_StartCRASimulation request message
 *
 * Web API Action: msdyn_StartCRASimulation
 */
export class msdyn_StartCRASimulationRequest
  extends OrganizationRequest
  implements Executable<msdyn_StartCRASimulationResponse>
{
  declare readonly Parameters: Readonly<msdyn_StartCRASimulationRequestParameters>;

  constructor(parameters: msdyn_StartCRASimulationRequestParameters) {
    super("msdyn_StartCRASimulation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartCRASimulation`;

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

  async parseResponse(response: Response): Promise<msdyn_StartCRASimulationResponse> {
    // No return value (204 No Content)
    return new msdyn_StartCRASimulationResponse();
  }
}

/**
 * msdyn_StartCRASimulation response message
 */
export class msdyn_StartCRASimulationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_StartCRASimulation");
  }

  static fromResponse(_data: unknown): msdyn_StartCRASimulationResponse {
    return new msdyn_StartCRASimulationResponse();
  }
}
