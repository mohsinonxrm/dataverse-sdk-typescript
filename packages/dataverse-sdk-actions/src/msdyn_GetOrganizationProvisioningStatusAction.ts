import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetOrganizationProvisioningStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOrganizationProvisioningStatusResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetOrganizationProvisioningStatusResponse;
  }
}
