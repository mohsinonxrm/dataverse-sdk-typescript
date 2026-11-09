import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_OSGetTrainingResults action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OSGetTrainingResultsResponse {
  "@odata.context"?: string;
  TrainingResults: string;
}

/**
 * Parameters of the msdyn_OSGetTrainingResults action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSGetTrainingResultsActionParameters {
  PredictionName?: string;
}

/**
 * msdyn_OSGetTrainingResults action
 *
 * Unbound action
 */
export class msdyn_OSGetTrainingResultsAction implements Executable<msdyn_OSGetTrainingResultsResponse> {
  constructor(public readonly parameters: msdyn_OSGetTrainingResultsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSGetTrainingResults`;

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

  async parseResponse(response: Response): Promise<msdyn_OSGetTrainingResultsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_OSGetTrainingResultsResponse;
  }
}
