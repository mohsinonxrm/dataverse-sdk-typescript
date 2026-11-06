import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForCustomizedWebResourcesResponse as msdyn_CheckForCustomizedWebResourcesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForCustomizedWebResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForCustomizedWebResourcesRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckForCustomizedWebResources request message
 *
 * Web API Action: msdyn_CheckForCustomizedWebResources
 */
export class msdyn_CheckForCustomizedWebResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForCustomizedWebResourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForCustomizedWebResourcesRequestParameters>;

  constructor(parameters: msdyn_CheckForCustomizedWebResourcesRequestParameters = {}) {
    super("msdyn_CheckForCustomizedWebResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedWebResources`;

    const body = requestBody({
      EntityIds: this.Parameters.EntityIds,
      SolutionId: this.Parameters.SolutionId,
      ExcludeSolutionIds: this.Parameters.ExcludeSolutionIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedWebResourcesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckForCustomizedWebResourcesResponse.fromResponse({});
    return msdyn_CheckForCustomizedWebResourcesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckForCustomizedWebResources response message
 */
export class msdyn_CheckForCustomizedWebResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForCustomizedWebResourcesResponseData) {
    super("msdyn_CheckForCustomizedWebResources");
  }

  static fromResponse(data: unknown): msdyn_CheckForCustomizedWebResourcesResponse {
    return new msdyn_CheckForCustomizedWebResourcesResponse(
      responseObject<msdyn_CheckForCustomizedWebResourcesResponseData>(data)
    );
  }
}
