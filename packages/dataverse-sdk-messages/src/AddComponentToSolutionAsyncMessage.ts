import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { AddComponentToSolutionAsyncResponse as AddComponentToSolutionAsyncResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return AddComponentToSolutionAsyncResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * AddComponentToSolutionAsync response message
 */
export class AddComponentToSolutionAsyncResponse extends OrganizationResponse {
  constructor(public result: AddComponentToSolutionAsyncResponseData) {
    super("AddComponentToSolutionAsync");
  }

  static fromResponse(data: unknown): AddComponentToSolutionAsyncResponse {
    return new AddComponentToSolutionAsyncResponse(
      responseObject<AddComponentToSolutionAsyncResponseData>(data)
    );
  }
}
