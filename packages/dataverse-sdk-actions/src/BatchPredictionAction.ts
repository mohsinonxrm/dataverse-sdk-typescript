import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from BatchPrediction action
 */
export interface BatchPredictionResponse {
  response: string;
}

/**
 * Parameters of the BatchPrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BatchPredictionActionParameters {
  version: string;
}

/**
 * BatchPrediction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class BatchPredictionAction implements Executable<BatchPredictionResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly parameters: BatchPredictionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.BatchPrediction`;

    const body = requestBody({
      version: this.parameters.version,
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

  async parseResponse(response: Response): Promise<BatchPredictionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as BatchPredictionResponse;
    return (await response.json()) as BatchPredictionResponse;
  }
}
