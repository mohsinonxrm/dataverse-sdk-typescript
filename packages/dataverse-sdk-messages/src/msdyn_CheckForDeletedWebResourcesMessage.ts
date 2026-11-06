import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForDeletedWebResourcesResponse as msdyn_CheckForDeletedWebResourcesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForDeletedWebResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForDeletedWebResourcesRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckForDeletedWebResources request message
 *
 * Web API Action: msdyn_CheckForDeletedWebResources
 */
export class msdyn_CheckForDeletedWebResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForDeletedWebResourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForDeletedWebResourcesRequestParameters>;

  constructor(parameters: msdyn_CheckForDeletedWebResourcesRequestParameters = {}) {
    super("msdyn_CheckForDeletedWebResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedWebResources`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForDeletedWebResourcesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CheckForDeletedWebResourcesResponse.fromResponse({});
    return msdyn_CheckForDeletedWebResourcesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckForDeletedWebResources response message
 */
export class msdyn_CheckForDeletedWebResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForDeletedWebResourcesResponseData) {
    super("msdyn_CheckForDeletedWebResources");
  }

  static fromResponse(data: unknown): msdyn_CheckForDeletedWebResourcesResponse {
    return new msdyn_CheckForDeletedWebResourcesResponse(
      responseObject<msdyn_CheckForDeletedWebResourcesResponseData>(data)
    );
  }
}
