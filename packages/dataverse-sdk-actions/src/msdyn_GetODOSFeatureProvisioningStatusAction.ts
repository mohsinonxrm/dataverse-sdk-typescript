import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetODOSFeatureProvisioningStatus action
 */
export interface msdyn_GetODOSFeatureProvisioningStatusResponse {
  Status: string;
}

/**
 * msdyn_GetODOSFeatureProvisioningStatus action
 *
 * Unbound action
 */
export class msdyn_GetODOSFeatureProvisioningStatusAction implements Executable<msdyn_GetODOSFeatureProvisioningStatusResponse> {
  constructor(public readonly featureName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetODOSFeatureProvisioningStatus`;

    const body: Record<string, unknown> = {
      FeatureName: this.featureName,
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

  async parseResponse(response: Response): Promise<msdyn_GetODOSFeatureProvisioningStatusResponse> {
    const data = await response.json();
    return data as msdyn_GetODOSFeatureProvisioningStatusResponse;
  }
}
