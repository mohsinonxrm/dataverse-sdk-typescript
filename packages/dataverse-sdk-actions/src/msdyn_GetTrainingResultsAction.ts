import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetTrainingResults action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetTrainingResultsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetTrainingResultsResponse;
  }
}
