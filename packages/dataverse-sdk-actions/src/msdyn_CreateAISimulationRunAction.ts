import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateAISimulationRun action
 */
export interface msdyn_CreateAISimulationRunResponse {
  Result: string;
  SimulationRunId: string;
}

/**
 * Parameters of the msdyn_CreateAISimulationRun action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateAISimulationRunActionParameters {
  RecordIds?: string;
  SimulationInputFile?: string;
  EntityLogicalName: string;
  SimulationCriteria?: string;
  ConditionExpressionXml?: string;
  SimulationArea?: string;
  SimulationScenarios?: string;
  Name: string;
  Mode: string;
}

/**
 * msdyn_CreateAISimulationRun action
 *
 * Unbound action
 */
export class msdyn_CreateAISimulationRunAction implements Executable<msdyn_CreateAISimulationRunResponse> {
  constructor(public readonly parameters: msdyn_CreateAISimulationRunActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAISimulationRun`;

    const body = requestBody({
      RecordIds: this.parameters.RecordIds,
      SimulationInputFile: this.parameters.SimulationInputFile,
      EntityLogicalName: this.parameters.EntityLogicalName,
      SimulationCriteria: this.parameters.SimulationCriteria,
      ConditionExpressionXml: this.parameters.ConditionExpressionXml,
      SimulationArea: this.parameters.SimulationArea,
      SimulationScenarios: this.parameters.SimulationScenarios,
      Name: this.parameters.Name,
      Mode: this.parameters.Mode,
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

  async parseResponse(response: Response): Promise<msdyn_CreateAISimulationRunResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreateAISimulationRunResponse;
    return (await response.json()) as msdyn_CreateAISimulationRunResponse;
  }
}
