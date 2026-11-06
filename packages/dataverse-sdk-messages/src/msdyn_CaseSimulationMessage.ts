import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CaseSimulationResponse as msdyn_CaseSimulationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CaseSimulation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CaseSimulationRequestParameters {
  msdyn_CallerSource?: string;
  msdyn_SimulationRunId: string;
}

/**
 * msdyn_CaseSimulation request message
 *
 * Web API Action: msdyn_CaseSimulation
 */
export class msdyn_CaseSimulationRequest
  extends OrganizationRequest
  implements Executable<msdyn_CaseSimulationResponse>
{
  declare readonly Parameters: Readonly<msdyn_CaseSimulationRequestParameters>;

  constructor(parameters: msdyn_CaseSimulationRequestParameters) {
    super("msdyn_CaseSimulation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CaseSimulation`;

    const body = requestBody({
      msdyn_CallerSource: this.Parameters.msdyn_CallerSource,
      msdyn_SimulationRunId: this.Parameters.msdyn_SimulationRunId,
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

  async parseResponse(response: Response): Promise<msdyn_CaseSimulationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CaseSimulationResponse.fromResponse({});
    return msdyn_CaseSimulationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CaseSimulation response message
 */
export class msdyn_CaseSimulationResponse extends OrganizationResponse {
  constructor(public result: msdyn_CaseSimulationResponseData) {
    super("msdyn_CaseSimulation");
  }

  static fromResponse(data: unknown): msdyn_CaseSimulationResponse {
    return new msdyn_CaseSimulationResponse(responseObject<msdyn_CaseSimulationResponseData>(data));
  }
}
