import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreatePrediction action
 */
export interface msdyn_CreatePredictionResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_CreatePrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreatePredictionActionParameters {
  ModelState?: string;
}

/**
 * msdyn_CreatePrediction action
 *
 * Unbound action
 */
export class msdyn_CreatePredictionAction implements Executable<msdyn_CreatePredictionResponse> {
  constructor(public readonly parameters: msdyn_CreatePredictionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreatePrediction`;

    const body = requestBody({
      ModelState: this.parameters.ModelState,
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

  async parseResponse(response: Response): Promise<msdyn_CreatePredictionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CreatePredictionResponse;
  }
}
