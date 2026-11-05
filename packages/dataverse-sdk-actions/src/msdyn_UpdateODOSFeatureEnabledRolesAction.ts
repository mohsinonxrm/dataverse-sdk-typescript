import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateODOSFeatureEnabledRoles action
 */
export interface msdyn_UpdateODOSFeatureEnabledRolesResponse {
  // No content returned
}

/**
 * msdyn_UpdateODOSFeatureEnabledRoles action
 *
 * Unbound action
 */
export class msdyn_UpdateODOSFeatureEnabledRolesAction implements Executable<msdyn_UpdateODOSFeatureEnabledRolesResponse> {
  constructor(
    public readonly featureName: string,
    public readonly roles: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateODOSFeatureEnabledRoles`;

    const body: Record<string, unknown> = {
      FeatureName: this.featureName,
      Roles: this.roles,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateODOSFeatureEnabledRolesResponse> {
    // No return value (204 No Content)
    return {};
  }
}
