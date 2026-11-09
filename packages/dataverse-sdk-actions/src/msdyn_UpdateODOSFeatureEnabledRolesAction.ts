import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateODOSFeatureEnabledRoles action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdateODOSFeatureEnabledRolesResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_UpdateODOSFeatureEnabledRolesResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
