import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetTrainingResults action
 */
export interface msdyn_GetTrainingResultsResponse {
  TrainingResults: string;
}

/**
 * Parameters of the msdyn_GetTrainingResults action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetTrainingResultsActionParameters {
  PredictionName?: string;
}

/**
 * msdyn_GetTrainingResults action
 *
 * Unbound action
 */
export class msdyn_GetTrainingResultsAction implements Executable<msdyn_GetTrainingResultsResponse> {
  constructor(public readonly parameters: msdyn_GetTrainingResultsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTrainingResults`;

    const body = requestBody({
      PredictionName: this.parameters.PredictionName,
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

  async parseResponse(response: Response): Promise<msdyn_GetTrainingResultsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetTrainingResultsResponse;
  }
}
