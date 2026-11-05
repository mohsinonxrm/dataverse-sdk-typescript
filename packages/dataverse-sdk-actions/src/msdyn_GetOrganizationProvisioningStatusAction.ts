import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetOrganizationProvisioningStatus action
 */
export interface msdyn_GetOrganizationProvisioningStatusResponse {
  OrgProvisioningStatus: string;
}

/**
 * msdyn_GetOrganizationProvisioningStatus action
 *
 * Unbound action
 */
export class msdyn_GetOrganizationProvisioningStatusAction implements Executable<msdyn_GetOrganizationProvisioningStatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrganizationProvisioningStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetOrganizationProvisioningStatusResponse> {
    const data = await response.json();
    return data as msdyn_GetOrganizationProvisioningStatusResponse;
  }
}
