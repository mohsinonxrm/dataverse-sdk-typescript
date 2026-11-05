import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const data = await response.json();
    return msdyn_GetPremiumOrgStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetPremiumOrgStatus response message
 */
export class msdyn_GetPremiumOrgStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetPremiumOrgStatusResponse) {
    super("msdyn_GetPremiumOrgStatus");
  }

  static fromResponse(data: unknown): msdyn_GetPremiumOrgStatusResponse {
    return new msdyn_GetPremiumOrgStatusResponse((data as any).value);
  }
}
