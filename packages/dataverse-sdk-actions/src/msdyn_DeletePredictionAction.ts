import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_DeletePrediction action
 */
export interface msdyn_DeletePredictionResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_DeletePrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DeletePredictionActionParameters {
  ModelId?: string;
  IsCrmDeleteOnly?: boolean;
  PredictionName?: string;
  IsActiveModel?: boolean;
}

/**
 * msdyn_DeletePrediction action
 *
 * Unbound action
 */
export class msdyn_DeletePredictionAction implements Executable<msdyn_DeletePredictionResponse> {
  constructor(public readonly parameters: msdyn_DeletePredictionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeletePrediction`;

    const body = requestBody({
      ModelId: this.parameters.ModelId,
      IsCrmDeleteOnly: this.parameters.IsCrmDeleteOnly,
      PredictionName: this.parameters.PredictionName,
      IsActiveModel: this.parameters.IsActiveModel,
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

  async parseResponse(response: Response): Promise<msdyn_DeletePredictionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_DeletePredictionResponse;
    return (await response.json()) as msdyn_DeletePredictionResponse;
  }
}
