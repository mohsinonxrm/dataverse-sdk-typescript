import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from SchedulePrediction action
 */
export interface SchedulePredictionResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SchedulePredictionResponse;
    return (await response.json()) as SchedulePredictionResponse;
  }
}
