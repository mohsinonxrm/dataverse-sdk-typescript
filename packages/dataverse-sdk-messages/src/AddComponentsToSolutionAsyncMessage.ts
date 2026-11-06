import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type {
  AddComponentToSolutionParametersCollection,
  AddComponentsToSolutionAsyncResponse as AddComponentsToSolutionAsyncResponseData,
} from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return AddComponentsToSolutionAsyncResponse.fromResponse(text ? JSON.parse(text) : {});
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
