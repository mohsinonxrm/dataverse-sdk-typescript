import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_EmailResolutionAgentSimulation action
 */
export interface msdyn_EmailResolutionAgentSimulationResponse {
  msdyn_HasMoreRecords: string;
  msdyn_NeedThrottling: string;
}

/**
 * Parameters of the msdyn_EmailResolutionAgentSimulation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailResolutionAgentSimulationActionParameters {
  msdyn_SimulationRunId: string;
  msdyn_CallerSource?: string;
}

/**
 * msdyn_EmailResolutionAgentSimulation action
 *
 * Unbound action
 */
export class msdyn_EmailResolutionAgentSimulationAction implements Executable<msdyn_EmailResolutionAgentSimulationResponse> {
  constructor(public readonly parameters: msdyn_EmailResolutionAgentSimulationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailResolutionAgentSimulation`;

    const body = requestBody({
      msdyn_SimulationRunId: this.parameters.msdyn_SimulationRunId,
      msdyn_CallerSource: this.parameters.msdyn_CallerSource,
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
    if (response.status === 204) return {} as msdyn_EmailResolutionAgentSimulationResponse;
    return (await response.json()) as msdyn_EmailResolutionAgentSimulationResponse;
  }
}
