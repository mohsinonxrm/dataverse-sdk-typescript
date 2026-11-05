import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_PostOrganizationProvisioningStatus action
 */
export interface msdyn_PostOrganizationProvisioningStatusResponse {
  // No content returned
}

/**
 * msdyn_PostOrganizationProvisioningStatus action
 *
 * Unbound action
 */
export class msdyn_PostOrganizationProvisioningStatusAction implements Executable<msdyn_PostOrganizationProvisioningStatusResponse> {
  constructor(
    public readonly autoCaptureSettings: string,
    public readonly autoCaptureRules: string,
    public readonly orgProvisioningDetails: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PostOrganizationProvisioningStatus`;

    const body: Record<string, unknown> = {
      autoCaptureSettings: this.autoCaptureSettings,
      autoCaptureRules: this.autoCaptureRules,
      orgProvisioningDetails: this.orgProvisioningDetails,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_PostOrganizationProvisioningStatusResponse> {
    // No return value (204 No Content)
    return {};
  }
}
