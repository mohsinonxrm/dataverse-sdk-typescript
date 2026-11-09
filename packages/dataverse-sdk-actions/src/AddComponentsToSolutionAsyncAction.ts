import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { AddComponentToSolutionParametersCollection } from "./types/index.js";

/**
 * Response from the AddComponentsToSolutionAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AddComponentsToSolutionAsyncResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as AddComponentsToSolutionAsyncResponse;
  }
}
