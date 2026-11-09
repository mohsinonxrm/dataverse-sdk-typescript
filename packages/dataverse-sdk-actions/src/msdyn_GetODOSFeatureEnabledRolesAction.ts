import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetODOSFeatureEnabledRoles action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetODOSFeatureEnabledRolesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetODOSFeatureEnabledRolesResponse;
  }
}
