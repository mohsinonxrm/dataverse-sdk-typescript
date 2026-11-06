import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_governanceAgentSimulation action
 */
export interface msdyn_governanceAgentSimulationResponse {
  msdyn_HasMoreRecords: string;
  msdyn_NeedThrottling: string;
}

/**
 * Parameters of the msdyn_governanceAgentSimulation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_governanceAgentSimulationActionParameters {
  msdyn_CallerSource?: string;
  msdyn_simulationRunId: string;
}

/**
 * msdyn_governanceAgentSimulation action
 *
 * Unbound action
 */
export class msdyn_governanceAgentSimulationAction implements Executable<msdyn_governanceAgentSimulationResponse> {
  constructor(public readonly parameters: msdyn_governanceAgentSimulationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_governanceAgentSimulation`;

    const body = requestBody({
      msdyn_CallerSource: this.parameters.msdyn_CallerSource,
      msdyn_simulationRunId: this.parameters.msdyn_simulationRunId,
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
    if (response.status === 204) return {} as msdyn_governanceAgentSimulationResponse;
    return (await response.json()) as msdyn_governanceAgentSimulationResponse;
  }
}
