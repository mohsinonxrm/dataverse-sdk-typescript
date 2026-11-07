import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CreateSimilarOpportunitiyPredictionModel action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CreateSimilarOpportunitiyPredictionModelResponse = void;

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

  parseResponse(
    _response: Response
  ): Promise<msdyn_CreateSimilarOpportunitiyPredictionModelResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
