import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type {
  AddComponentToSolutionParametersCollection,
  AddComponentsToSolutionAsyncResponse as AddComponentsToSolutionAsyncResponseData,
} from "./types/index.js";

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
    public solutionComponentParameters: AddComponentToSolutionParametersCollection | undefined,
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<AddComponentsToSolutionAsyncResponse> {
    const data = await response.json();
    return AddComponentsToSolutionAsyncResponse.fromResponse(data);
  }
}

/**
 * AddComponentsToSolutionAsync response message
 */
export class AddComponentsToSolutionAsyncResponse extends OrganizationResponse {
  constructor(public result: AddComponentsToSolutionAsyncResponseData) {
    super("AddComponentsToSolutionAsync");
  }

  static fromResponse(data: unknown): AddComponentsToSolutionAsyncResponse {
    return new AddComponentsToSolutionAsyncResponse(
      responseObject<AddComponentsToSolutionAsyncResponseData>(data)
    );
  }
}
