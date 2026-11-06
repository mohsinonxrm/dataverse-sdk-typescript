import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_getsimulationstatus action
 */
export interface msdyn_getsimulationstatusResponse {
  endtime: string;
  starttime: string;
  status: string;
}

/**
 * Parameters of the msdyn_getsimulationstatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getsimulationstatusActionParameters {
  simulationid: string;
}

/**
 * msdyn_getsimulationstatus action
 *
 * Unbound action
 */
export class msdyn_getsimulationstatusAction implements Executable<msdyn_getsimulationstatusResponse> {
  constructor(public readonly parameters: msdyn_getsimulationstatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getsimulationstatus`;

    const body = requestBody({
      simulationid: this.parameters.simulationid,
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

  async parseResponse(response: Response): Promise<msdyn_getsimulationstatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_getsimulationstatusResponse;
    return (await response.json()) as msdyn_getsimulationstatusResponse;
  }
}
