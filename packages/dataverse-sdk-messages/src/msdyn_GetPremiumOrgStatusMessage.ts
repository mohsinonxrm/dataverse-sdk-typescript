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
    // The body is the complex value, with its @odata.context
    return msdyn_GetPremiumOrgStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetPremiumOrgStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetPremiumOrgStatusResult {
  "@odata.context"?: string;
  PremiumOrgStatus: boolean;
}

/**
 * msdyn_GetPremiumOrgStatus response message
 *
 * `result` is the value the msdyn_GetPremiumOrgStatus action returns (see {@link msdyn_GetPremiumOrgStatusResult}).
 */
export class msdyn_GetPremiumOrgStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetPremiumOrgStatusResult) {
    super("msdyn_GetPremiumOrgStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetPremiumOrgStatusResponse {
    return new msdyn_GetPremiumOrgStatusResponse(data as msdyn_GetPremiumOrgStatusResult);
  }
}
