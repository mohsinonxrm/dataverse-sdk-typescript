import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { AddComponentToSolutionParametersCollection } from "./types/index.js";

/**
 * Parameters of the AddComponentsToSolutionAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddComponentsToSolutionAsyncRequestParameters {
  SolutionComponentParameters?: AddComponentToSolutionParametersCollection;
  SolutionUniqueName: string;
  ContinueOnError: boolean;
}

/**
 * AddComponentsToSolutionAsync request message
 *
 * Web API Action: AddComponentsToSolutionAsync
 */
export class AddComponentsToSolutionAsyncRequest
  extends OrganizationRequest
  implements Executable<AddComponentsToSolutionAsyncResponse>
{
  declare readonly Parameters: Readonly<AddComponentsToSolutionAsyncRequestParameters>;

  constructor(parameters: AddComponentsToSolutionAsyncRequestParameters) {
    super("AddComponentsToSolutionAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddComponentsToSolutionAsync`;

    const body = requestBody({
      SolutionComponentParameters: this.Parameters.SolutionComponentParameters,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      ContinueOnError: this.Parameters.ContinueOnError,
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
    return AddComponentsToSolutionAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AddComponentsToSolutionAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AddComponentsToSolutionAsyncResult {
  "@odata.context"?: string;
  AsyncOperationId: string;
}

/**
 * AddComponentsToSolutionAsync response message
 *
 * `result` is the value the AddComponentsToSolutionAsync action returns (see {@link AddComponentsToSolutionAsyncResult}).
 */
export class AddComponentsToSolutionAsyncResponse extends OrganizationResponse {
  constructor(public result: AddComponentsToSolutionAsyncResult) {
    super("AddComponentsToSolutionAsync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AddComponentsToSolutionAsyncResponse {
    return new AddComponentsToSolutionAsyncResponse(data as AddComponentsToSolutionAsyncResult);
  }
}
