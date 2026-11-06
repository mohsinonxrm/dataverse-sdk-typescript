import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_StoreSimulationResult action
 */
export interface msdyn_StoreSimulationResultResponse {
  SimulationResult: string;
}

/**
 * Parameters of the msdyn_StoreSimulationResult action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StoreSimulationResultActionParameters {
  EvaluationInsight: string;
  SimulationContext: string;
  EvaluationCriteria?: string;
}

/**
 * msdyn_StoreSimulationResult action
 *
 * Unbound action
 */
export class msdyn_StoreSimulationResultAction implements Executable<msdyn_StoreSimulationResultResponse> {
  constructor(public readonly parameters: msdyn_StoreSimulationResultActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StoreSimulationResult`;

    const body = requestBody({
      EvaluationInsight: this.parameters.EvaluationInsight,
      SimulationContext: this.parameters.SimulationContext,
      EvaluationCriteria: this.parameters.EvaluationCriteria,
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

  async parseResponse(response: Response): Promise<msdyn_StoreSimulationResultResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_StoreSimulationResultResponse;
    return (await response.json()) as msdyn_StoreSimulationResultResponse;
  }
}
