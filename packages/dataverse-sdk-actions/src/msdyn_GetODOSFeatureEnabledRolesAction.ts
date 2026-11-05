import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetODOSFeatureEnabledRoles action
 */
export interface msdyn_GetODOSFeatureEnabledRolesResponse {
  Roles: string;
}

/**
 * msdyn_GetODOSFeatureEnabledRoles action
 *
 * Unbound action
 */
export class msdyn_GetODOSFeatureEnabledRolesAction implements Executable<msdyn_GetODOSFeatureEnabledRolesResponse> {
  constructor(public readonly featureName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetODOSFeatureEnabledRoles`;

    const body: Record<string, unknown> = {
      FeatureName: this.featureName,
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

  async parseResponse(response: Response): Promise<msdyn_GetODOSFeatureEnabledRolesResponse> {
    const data = await response.json();
    return data as msdyn_GetODOSFeatureEnabledRolesResponse;
  }
}
