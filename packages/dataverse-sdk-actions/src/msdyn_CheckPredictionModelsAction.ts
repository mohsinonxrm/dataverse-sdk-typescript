import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CheckPredictionModels action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckPredictionModelsResponse {
  "@odata.context"?: string;
  Exists: string;
}

/**
 * Parameters of the msdyn_CheckPredictionModels action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckPredictionModelsActionParameters {
  PredictionType: string;
}

/**
 * msdyn_CheckPredictionModels action
 *
 * Unbound action
 */
export class msdyn_CheckPredictionModelsAction implements Executable<msdyn_CheckPredictionModelsResponse> {
  constructor(public readonly parameters: msdyn_CheckPredictionModelsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckPredictionModels`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckPredictionModelsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckPredictionModelsResponse;
  }
}
