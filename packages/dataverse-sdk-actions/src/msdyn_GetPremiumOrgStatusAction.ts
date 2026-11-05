import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetPremiumOrgStatus action
 */
export interface msdyn_GetPremiumOrgStatusResponse {
  PremiumOrgStatus: boolean;
}

/**
 * msdyn_GetPremiumOrgStatus action
 *
 * Unbound action
 */
export class msdyn_GetPremiumOrgStatusAction implements Executable<msdyn_GetPremiumOrgStatusResponse> {
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
    return data as msdyn_GetPremiumOrgStatusResponse;
  }
}
