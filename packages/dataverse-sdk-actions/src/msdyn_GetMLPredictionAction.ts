import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetMLPrediction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetMLPredictionResponse {
  "@odata.context"?: string;
  msdyn_prediction: string;
  msdyn_status: number;
}

/**
 * Parameters of the msdyn_GetMLPrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMLPredictionActionParameters {
  msdyn_input: string;
  msdyn_predictiontype: number;
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

  async parseResponse(response: Response): Promise<msdyn_GetMLPredictionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetMLPredictionResponse;
  }
}
