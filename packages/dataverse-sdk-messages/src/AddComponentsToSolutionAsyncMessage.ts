import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AddComponentToSolutionParametersCollection } from "./types/index.js";

/**
 * AddComponentsToSolutionAsync request message
 *
 * Web API Action: AddComponentsToSolutionAsync
 */
export class AddComponentsToSolutionAsyncRequest
  extends OrganizationRequest
  implements Executable<AddComponentsToSolutionAsyncResponse>
{
  constructor(
    public solutionComponentParameters: AddComponentToSolutionParametersCollection,
    public solutionUniqueName: string,
    public continueOnError: boolean
  ) {
    super("AddComponentsToSolutionAsync");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<AddComponentsToSolutionAsyncResponse> {
    const data = await response.json();
    return AddComponentsToSolutionAsyncResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionComponentParameters: this.solutionComponentParameters,
      SolutionUniqueName: this.solutionUniqueName,
      ContinueOnError: this.continueOnError,
    };
  }
}

/**
 * AddComponentsToSolutionAsync response message
 */
export class AddComponentsToSolutionAsyncResponse extends OrganizationResponse {
  constructor(public result: AddComponentsToSolutionAsyncResponse) {
    super("AddComponentsToSolutionAsync");
  }

  static fromResponse(data: unknown): AddComponentsToSolutionAsyncResponse {
    return new AddComponentsToSolutionAsyncResponse((data as any).value);
  }
}
