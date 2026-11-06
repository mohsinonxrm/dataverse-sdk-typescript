import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_OSCreatePrediction action
 */
export interface msdyn_OSCreatePredictionResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_OSCreatePrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSCreatePredictionActionParameters {
  ModelState?: string;
}

/**
 * msdyn_OSCreatePrediction action
 *
 * Unbound action
 */
export class msdyn_OSCreatePredictionAction implements Executable<msdyn_OSCreatePredictionResponse> {
  constructor(public readonly parameters: msdyn_OSCreatePredictionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSCreatePrediction`;

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

  async parseResponse(response: Response): Promise<msdyn_OSCreatePredictionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_OSCreatePredictionResponse;
    return (await response.json()) as msdyn_OSCreatePredictionResponse;
  }
}
