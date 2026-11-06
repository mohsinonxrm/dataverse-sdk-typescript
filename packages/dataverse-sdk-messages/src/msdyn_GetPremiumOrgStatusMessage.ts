import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetPremiumOrgStatusResponse as msdyn_GetPremiumOrgStatusResponseData } from "./types/index.js";

/**
 * msdyn_GetPremiumOrgStatus request message
 *
 * Web API Action: msdyn_GetPremiumOrgStatus
 */
export class msdyn_GetPremiumOrgStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetPremiumOrgStatusResponse>
{
  constructor() {
    super("msdyn_GetPremiumOrgStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPremiumOrgStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetPremiumOrgStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetPremiumOrgStatusResponse.fromResponse({});
    return msdyn_GetPremiumOrgStatusResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetPremiumOrgStatus response message
 */
export class msdyn_GetPremiumOrgStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetPremiumOrgStatusResponseData) {
    super("msdyn_GetPremiumOrgStatus");
  }

  static fromResponse(data: unknown): msdyn_GetPremiumOrgStatusResponse {
    return new msdyn_GetPremiumOrgStatusResponse(
      responseObject<msdyn_GetPremiumOrgStatusResponseData>(data)
    );
  }
}
