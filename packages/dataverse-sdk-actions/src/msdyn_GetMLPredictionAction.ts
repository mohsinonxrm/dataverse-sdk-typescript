import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetMLPrediction action
 */
export interface msdyn_GetMLPredictionResponse {
  msdyn_prediction: string;
  msdyn_status: number;
}

/**
 * Parameters of the msdyn_GetMLPrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMLPredictionActionParameters {
  msdyn_predictiontype: number;
  msdyn_input: string;
}

/**
 * msdyn_GetMLPrediction action
 *
 * Unbound action
 */
export class msdyn_GetMLPredictionAction implements Executable<msdyn_GetMLPredictionResponse> {
  constructor(public readonly parameters: msdyn_GetMLPredictionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMLPrediction`;

    const body = requestBody({
      msdyn_predictiontype: this.parameters.msdyn_predictiontype,
      msdyn_input: this.parameters.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_GetMLPredictionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetMLPredictionResponse;
  }
}
