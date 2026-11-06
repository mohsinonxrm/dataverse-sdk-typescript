import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateODOSFeatureEnabledRoles action
 */
export interface msdyn_UpdateODOSFeatureEnabledRolesResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_UpdateODOSFeatureEnabledRoles action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateODOSFeatureEnabledRolesActionParameters {
  FeatureName: string;
  Roles: string;
}

/**
 * msdyn_UpdateODOSFeatureEnabledRoles action
 *
 * Unbound action
 */
export class msdyn_UpdateODOSFeatureEnabledRolesAction implements Executable<msdyn_UpdateODOSFeatureEnabledRolesResponse> {
  constructor(public readonly parameters: msdyn_UpdateODOSFeatureEnabledRolesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateODOSFeatureEnabledRoles`;

    const body = requestBody({
      FeatureName: this.parameters.FeatureName,
      Roles: this.parameters.Roles,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateODOSFeatureEnabledRolesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_UpdateODOSFeatureEnabledRolesResponse;
  }
}
