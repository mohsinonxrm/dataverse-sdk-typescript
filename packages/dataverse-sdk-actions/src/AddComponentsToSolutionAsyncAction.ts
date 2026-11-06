import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AddComponentToSolutionParametersCollection } from "./types/index.js";

/**
 * Response from AddComponentsToSolutionAsync action
 */
export interface AddComponentsToSolutionAsyncResponse {
  AsyncOperationId: string;
}

/**
 * AddComponentsToSolutionAsync action
 *
 * Unbound action
 */
export class AddComponentsToSolutionAsyncAction implements Executable<AddComponentsToSolutionAsyncResponse> {
  constructor(
    public readonly solutionComponentParameters:
      AddComponentToSolutionParametersCollection | undefined,
    public readonly solutionUniqueName: string,
    public readonly continueOnError: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddComponentsToSolutionAsync`;

    const body: Record<string, unknown> = {
      SolutionComponentParameters: this.solutionComponentParameters,
      SolutionUniqueName: this.solutionUniqueName,
      ContinueOnError: this.continueOnError,
    };

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
    const data = await response.json();
    return data as AddComponentsToSolutionAsyncResponse;
  }
}
