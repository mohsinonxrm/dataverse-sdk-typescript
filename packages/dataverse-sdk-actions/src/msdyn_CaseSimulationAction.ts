import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CaseSimulation action
 */
export interface msdyn_CaseSimulationResponse {
  msdyn_AccuracyPercentage: number;
  msdyn_HasMoreRecords: string;
  msdyn_NeedThrottling: string;
  msdyn_Predictions: string;
}

/**
 * Parameters of the msdyn_CaseSimulation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CaseSimulationActionParameters {
  msdyn_CallerSource?: string;
  msdyn_SimulationRunId: string;
}

/**
 * msdyn_CaseSimulation action
 *
 * Unbound action
 */
export class msdyn_CaseSimulationAction implements Executable<msdyn_CaseSimulationResponse> {
  constructor(public readonly parameters: msdyn_CaseSimulationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CaseSimulation`;

    const body = requestBody({
      msdyn_CallerSource: this.parameters.msdyn_CallerSource,
      msdyn_SimulationRunId: this.parameters.msdyn_SimulationRunId,
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
    if (response.status === 204) return {} as msdyn_CaseSimulationResponse;
    return (await response.json()) as msdyn_CaseSimulationResponse;
  }
}
