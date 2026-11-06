import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_FetchAllPredictionModels action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FetchAllPredictionModelsResponse {
  "@odata.context"?: string;
  Response: string;
}

/**
 * Parameters of the msdyn_FetchAllPredictionModels action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchAllPredictionModelsActionParameters {
  PredictionType: string;
}

/**
 * msdyn_FetchAllPredictionModels action
 *
 * Unbound action
 */
export class msdyn_FetchAllPredictionModelsAction implements Executable<msdyn_FetchAllPredictionModelsResponse> {
  constructor(public readonly parameters: msdyn_FetchAllPredictionModelsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchAllPredictionModels`;

    const body = requestBody({
      PredictionType: this.parameters.PredictionType,
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

  async parseResponse(response: Response): Promise<msdyn_FetchAllPredictionModelsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_FetchAllPredictionModelsResponse;
  }
}
