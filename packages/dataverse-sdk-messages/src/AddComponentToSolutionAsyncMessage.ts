import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AddComponentToSolutionAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddComponentToSolutionAsyncRequestParameters {
  LogicalName: string;
  Id: string;
  SolutionUniqueName: string;
  AddRequiredComponents: boolean;
  IncludeChildComponents?: boolean;
  IncludeEntityMetadata?: boolean;
}

/**
 * AddComponentToSolutionAsync request message
 *
 * Web API Action: AddComponentToSolutionAsync
 */
export class AddComponentToSolutionAsyncRequest
  extends OrganizationRequest
  implements Executable<AddComponentToSolutionAsyncResponse>
{
  declare readonly Parameters: Readonly<AddComponentToSolutionAsyncRequestParameters>;

  constructor(parameters: AddComponentToSolutionAsyncRequestParameters) {
    super("AddComponentToSolutionAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddComponentToSolutionAsync`;

    const body = requestBody({
      LogicalName: this.Parameters.LogicalName,
      Id: this.Parameters.Id,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      AddRequiredComponents: this.Parameters.AddRequiredComponents,
      IncludeChildComponents: this.Parameters.IncludeChildComponents,
      IncludeEntityMetadata: this.Parameters.IncludeEntityMetadata,
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

  async parseResponse(response: Response): Promise<AddComponentToSolutionAsyncResponse> {
    // The body is the complex value, with its @odata.context
    return AddComponentToSolutionAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AddComponentToSolutionAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AddComponentToSolutionAsyncResult {
  "@odata.context"?: string;
  AsyncOperationId: string;
}

/**
 * AddComponentToSolutionAsync response message
 *
 * `result` is the value the AddComponentToSolutionAsync action returns (see {@link AddComponentToSolutionAsyncResult}).
 */
export class AddComponentToSolutionAsyncResponse extends OrganizationResponse {
  constructor(public result: AddComponentToSolutionAsyncResult) {
    super("AddComponentToSolutionAsync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AddComponentToSolutionAsyncResponse {
    return new AddComponentToSolutionAsyncResponse(data as AddComponentToSolutionAsyncResult);
  }
}
