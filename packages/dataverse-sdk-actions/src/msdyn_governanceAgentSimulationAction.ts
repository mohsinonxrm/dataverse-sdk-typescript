import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_governanceAgentSimulation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_governanceAgentSimulationResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_governanceAgentSimulationResponse;
  }
}
