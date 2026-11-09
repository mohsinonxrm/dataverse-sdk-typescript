import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpsertAISimulationResult action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpsertAISimulationResultResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_UpsertAISimulationResult action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpsertAISimulationResultActionParameters {
  SimulationResultId?: string;
  SimulationStatus: string;
  SimulationScenario: string;
  SimulationRunId?: string;
  IntentFamilyId?: string;
  SimulationResultDetail?: string;
  RecordId: string;
  EntityLogicalName?: string;
}

/**
 * msdyn_UpsertAISimulationResult action
 *
 * Unbound action
 */
export class msdyn_UpsertAISimulationResultAction implements Executable<msdyn_UpsertAISimulationResultResponse> {
  constructor(public readonly parameters: msdyn_UpsertAISimulationResultActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpsertAISimulationResult`;

    const body = requestBody({
      SimulationResultId: this.parameters.SimulationResultId,
      SimulationStatus: this.parameters.SimulationStatus,
      SimulationScenario: this.parameters.SimulationScenario,
      SimulationRunId: this.parameters.SimulationRunId,
      IntentFamilyId: this.parameters.IntentFamilyId,
      SimulationResultDetail: this.parameters.SimulationResultDetail,
      RecordId: this.parameters.RecordId,
      EntityLogicalName: this.parameters.EntityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_UpsertAISimulationResultResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_UpsertAISimulationResultResponse;
  }
}
