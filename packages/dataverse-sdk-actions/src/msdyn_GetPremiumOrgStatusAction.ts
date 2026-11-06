import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetPremiumOrgStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetPremiumOrgStatusResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetPremiumOrgStatusResponse;
  }
}
