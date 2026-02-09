import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_StartODOSDeprovisioning action
 */
export interface msdyn_StartODOSDeprovisioningResponse {
  // No content returned
}

/**
 * msdyn_StartODOSDeprovisioning action
 *
 * Unbound action
 */
export class msdyn_StartODOSDeprovisioningAction implements Executable<msdyn_StartODOSDeprovisioningResponse> {
  constructor(
    public readonly featureName: string,
    public readonly isDeprecationDeprovisioning: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartODOSDeprovisioning`;

    const body: Record<string, unknown> = {
      FeatureName: this.featureName,
      IsDeprecationDeprovisioning: this.isDeprecationDeprovisioning,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_StartODOSDeprovisioningResponse> {
    // No return value (204 No Content)
    return {};
  }
}
