import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetGPT3Prediction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetGPT3PredictionResponse {
  "@odata.context"?: string;
  msdyn_prediction: string;
  msdyn_status: number;
}

/**
 * Parameters of the msdyn_GetGPT3Prediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetGPT3PredictionActionParameters {
  msdyn_input: string;
  msdyn_predictiontype: number;
}

/**
 * msdyn_GetGPT3Prediction action
 *
 * Unbound action
 */
export class msdyn_GetGPT3PredictionAction implements Executable<msdyn_GetGPT3PredictionResponse> {
  constructor(public readonly parameters: msdyn_GetGPT3PredictionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetGPT3Prediction`;

    const body = requestBody({
      msdyn_input: this.parameters.msdyn_input,
      msdyn_predictiontype: this.parameters.msdyn_predictiontype,
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

  async parseResponse(response: Response): Promise<msdyn_GetGPT3PredictionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetGPT3PredictionResponse;
  }
}
