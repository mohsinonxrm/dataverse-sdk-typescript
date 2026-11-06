import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_governanceAgentSimulationResponse as msdyn_governanceAgentSimulationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_governanceAgentSimulation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_governanceAgentSimulationRequestParameters {
  msdyn_CallerSource?: string;
  msdyn_simulationRunId: string;
}

/**
 * msdyn_governanceAgentSimulation request message
 *
 * Web API Action: msdyn_governanceAgentSimulation
 */
export class msdyn_governanceAgentSimulationRequest
  extends OrganizationRequest
  implements Executable<msdyn_governanceAgentSimulationResponse>
{
  declare readonly Parameters: Readonly<msdyn_governanceAgentSimulationRequestParameters>;

  constructor(parameters: msdyn_governanceAgentSimulationRequestParameters) {
    super("msdyn_governanceAgentSimulation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_governanceAgentSimulation`;

    const body = requestBody({
      msdyn_CallerSource: this.Parameters.msdyn_CallerSource,
      msdyn_simulationRunId: this.Parameters.msdyn_simulationRunId,
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

  async parseResponse(response: Response): Promise<msdyn_governanceAgentSimulationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_governanceAgentSimulationResponse.fromResponse({});
    return msdyn_governanceAgentSimulationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_governanceAgentSimulation response message
 */
export class msdyn_governanceAgentSimulationResponse extends OrganizationResponse {
  constructor(public result: msdyn_governanceAgentSimulationResponseData) {
    super("msdyn_governanceAgentSimulation");
  }

  static fromResponse(data: unknown): msdyn_governanceAgentSimulationResponse {
    return new msdyn_governanceAgentSimulationResponse(
      responseObject<msdyn_governanceAgentSimulationResponseData>(data)
    );
  }
}
