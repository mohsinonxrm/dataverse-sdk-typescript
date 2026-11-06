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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetPremiumOrgStatusResponse;
  }
}
