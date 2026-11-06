import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_EmailResolutionAgentSimulationResponse as msdyn_EmailResolutionAgentSimulationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_EmailResolutionAgentSimulation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailResolutionAgentSimulationRequestParameters {
  msdyn_SimulationRunId: string;
  msdyn_CallerSource?: string;
}

/**
 * msdyn_EmailResolutionAgentSimulation request message
 *
 * Web API Action: msdyn_EmailResolutionAgentSimulation
 */
export class msdyn_EmailResolutionAgentSimulationRequest
  extends OrganizationRequest
  implements Executable<msdyn_EmailResolutionAgentSimulationResponse>
{
  declare readonly Parameters: Readonly<msdyn_EmailResolutionAgentSimulationRequestParameters>;

  constructor(parameters: msdyn_EmailResolutionAgentSimulationRequestParameters) {
    super("msdyn_EmailResolutionAgentSimulation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailResolutionAgentSimulation`;

    const body = requestBody({
      msdyn_SimulationRunId: this.Parameters.msdyn_SimulationRunId,
      msdyn_CallerSource: this.Parameters.msdyn_CallerSource,
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

  async parseResponse(response: Response): Promise<msdyn_EmailResolutionAgentSimulationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_EmailResolutionAgentSimulationResponse.fromResponse({});
    return msdyn_EmailResolutionAgentSimulationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_EmailResolutionAgentSimulation response message
 */
export class msdyn_EmailResolutionAgentSimulationResponse extends OrganizationResponse {
  constructor(public result: msdyn_EmailResolutionAgentSimulationResponseData) {
    super("msdyn_EmailResolutionAgentSimulation");
  }

  static fromResponse(data: unknown): msdyn_EmailResolutionAgentSimulationResponse {
    return new msdyn_EmailResolutionAgentSimulationResponse(
      responseObject<msdyn_EmailResolutionAgentSimulationResponseData>(data)
    );
  }
}
