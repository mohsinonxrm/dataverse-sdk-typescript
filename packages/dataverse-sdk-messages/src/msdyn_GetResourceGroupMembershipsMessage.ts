import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetResourceGroupMembershipsResponse as msdyn_GetResourceGroupMembershipsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetResourceGroupMemberships message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourceGroupMembershipsRequestParameters {
  Start: string;
  End: string;
  ResourceIds: string;
}

/**
 * msdyn_GetResourceGroupMemberships request message
 *
 * Web API Action: msdyn_GetResourceGroupMemberships
 */
export class msdyn_GetResourceGroupMembershipsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourceGroupMembershipsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetResourceGroupMembershipsRequestParameters>;

  constructor(parameters: msdyn_GetResourceGroupMembershipsRequestParameters) {
    super("msdyn_GetResourceGroupMemberships", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceGroupMemberships`;

    const body = requestBody({
      Start: this.Parameters.Start,
      End: this.Parameters.End,
      ResourceIds: this.Parameters.ResourceIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceGroupMembershipsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetResourceGroupMembershipsResponse.fromResponse({});
    return msdyn_GetResourceGroupMembershipsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetResourceGroupMemberships response message
 */
export class msdyn_GetResourceGroupMembershipsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourceGroupMembershipsResponseData) {
    super("msdyn_GetResourceGroupMemberships");
  }

  static fromResponse(data: unknown): msdyn_GetResourceGroupMembershipsResponse {
    return new msdyn_GetResourceGroupMembershipsResponse(
      responseObject<msdyn_GetResourceGroupMembershipsResponseData>(data)
    );
  }
}
