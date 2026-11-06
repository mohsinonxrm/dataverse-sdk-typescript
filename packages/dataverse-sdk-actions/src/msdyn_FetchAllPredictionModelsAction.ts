import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FetchAllPredictionModels action
 */
export interface msdyn_FetchAllPredictionModelsResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_FetchAllPredictionModelsResponse;
  }
}
