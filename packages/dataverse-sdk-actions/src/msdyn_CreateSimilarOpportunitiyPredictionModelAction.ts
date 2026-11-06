import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateSimilarOpportunitiyPredictionModel action
 */
export interface msdyn_CreateSimilarOpportunitiyPredictionModelResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_CreateSimilarOpportunitiyPredictionModel action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateSimilarOpportunitiyPredictionModelActionParameters {
  ModelState?: string;
}

/**
 * msdyn_CreateSimilarOpportunitiyPredictionModel action
 *
 * Unbound action
 */
export class msdyn_CreateSimilarOpportunitiyPredictionModelAction implements Executable<msdyn_CreateSimilarOpportunitiyPredictionModelResponse> {
  constructor(
    public readonly parameters: msdyn_CreateSimilarOpportunitiyPredictionModelActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSimilarOpportunitiyPredictionModel`;

    const body = requestBody({
      ModelState: this.parameters.ModelState,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CreateSimilarOpportunitiyPredictionModelResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CreateSimilarOpportunitiyPredictionModelResponse;
    return (await response.json()) as msdyn_CreateSimilarOpportunitiyPredictionModelResponse;
  }
}
