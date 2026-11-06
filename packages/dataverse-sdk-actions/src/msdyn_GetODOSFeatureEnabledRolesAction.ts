import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetODOSFeatureEnabledRoles action
 */
export interface msdyn_GetODOSFeatureEnabledRolesResponse {
  Roles: string;
}

/**
 * Parameters of the msdyn_GetODOSFeatureEnabledRoles action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetODOSFeatureEnabledRolesActionParameters {
  FeatureName: string;
}

/**
 * msdyn_GetODOSFeatureEnabledRoles action
 *
 * Unbound action
 */
export class msdyn_GetODOSFeatureEnabledRolesAction implements Executable<msdyn_GetODOSFeatureEnabledRolesResponse> {
  constructor(public readonly parameters: msdyn_GetODOSFeatureEnabledRolesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetODOSFeatureEnabledRoles`;

    const body = requestBody({
      FeatureName: this.parameters.FeatureName,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetODOSFeatureEnabledRolesResponse;
    return (await response.json()) as msdyn_GetODOSFeatureEnabledRolesResponse;
  }
}
