import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the SchedulePrediction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SchedulePredictionResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * Parameters of the SchedulePrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SchedulePredictionActionParameters {
  version: string;
  predictImmediately?: boolean;
  cleanupRequired?: boolean;
}

/**
 * SchedulePrediction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class SchedulePredictionAction implements Executable<SchedulePredictionResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly parameters: SchedulePredictionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.SchedulePrediction`;

    const body = requestBody({
      version: this.parameters.version,
      predictImmediately: this.parameters.predictImmediately,
      cleanupRequired: this.parameters.cleanupRequired,
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

  async parseResponse(response: Response): Promise<SchedulePredictionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as SchedulePredictionResponse;
  }
}
