import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_OSApplyPrediction action
 */
export interface msdyn_OSApplyPredictionResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_OSApplyPrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSApplyPredictionActionParameters {
  AutoScheduleTrainingConfig?: string;
}

/**
 * msdyn_OSApplyPrediction action
 *
 * Unbound action
 */
export class msdyn_OSApplyPredictionAction implements Executable<msdyn_OSApplyPredictionResponse> {
  constructor(public readonly parameters: msdyn_OSApplyPredictionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSApplyPrediction`;

    const body = requestBody({
      AutoScheduleTrainingConfig: this.parameters.AutoScheduleTrainingConfig,
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

  async parseResponse(response: Response): Promise<msdyn_OSApplyPredictionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_OSApplyPredictionResponse;
  }
}
