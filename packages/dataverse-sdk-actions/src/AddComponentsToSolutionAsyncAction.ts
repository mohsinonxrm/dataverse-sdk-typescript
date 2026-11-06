import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { AddComponentToSolutionParametersCollection } from "./types/index.js";

/**
 * Response from AddComponentsToSolutionAsync action
 */
export interface AddComponentsToSolutionAsyncResponse {
  AsyncOperationId: string;
}

/**
 * Parameters of the AddComponentsToSolutionAsync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddComponentsToSolutionAsyncActionParameters {
  SolutionComponentParameters?: AddComponentToSolutionParametersCollection;
  SolutionUniqueName: string;
  ContinueOnError: boolean;
}

/**
 * AddComponentsToSolutionAsync action
 *
 * Unbound action
 */
export class AddComponentsToSolutionAsyncAction implements Executable<AddComponentsToSolutionAsyncResponse> {
  constructor(public readonly parameters: AddComponentsToSolutionAsyncActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddComponentsToSolutionAsync`;

    const body = requestBody({
      SolutionComponentParameters: this.parameters.SolutionComponentParameters,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      ContinueOnError: this.parameters.ContinueOnError,
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

  async parseResponse(response: Response): Promise<AddComponentsToSolutionAsyncResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AddComponentsToSolutionAsyncResponse;
  }
}
