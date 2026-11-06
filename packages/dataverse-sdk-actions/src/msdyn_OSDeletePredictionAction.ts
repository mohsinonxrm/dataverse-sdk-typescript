import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_OSDeletePrediction action
 */
export interface msdyn_OSDeletePredictionResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_OSDeletePrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSDeletePredictionActionParameters {
  ModelId?: string;
  IsCrmDeleteOnly?: boolean;
  PredictionName?: string;
  IsActiveModel?: boolean;
}

/**
 * msdyn_OSDeletePrediction action
 *
 * Unbound action
 */
export class msdyn_OSDeletePredictionAction implements Executable<msdyn_OSDeletePredictionResponse> {
  constructor(public readonly parameters: msdyn_OSDeletePredictionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSDeletePrediction`;

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

  async parseResponse(response: Response): Promise<msdyn_OSDeletePredictionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_OSDeletePredictionResponse;
    return (await response.json()) as msdyn_OSDeletePredictionResponse;
  }
}
