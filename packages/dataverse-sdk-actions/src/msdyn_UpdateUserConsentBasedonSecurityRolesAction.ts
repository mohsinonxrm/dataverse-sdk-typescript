import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateUserConsentBasedonSecurityRoles action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdateUserConsentBasedonSecurityRolesResponse = void;

/**
 * Parameters of the msdyn_UpdateUserConsentBasedonSecurityRoles action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateUserConsentBasedonSecurityRolesActionParameters {
  SecurityRolesList: string;
}

/**
 * msdyn_UpdateUserConsentBasedonSecurityRoles action
 *
 * Unbound action
 */
export class msdyn_UpdateUserConsentBasedonSecurityRolesAction implements Executable<msdyn_UpdateUserConsentBasedonSecurityRolesResponse> {
  constructor(
    public readonly parameters: msdyn_UpdateUserConsentBasedonSecurityRolesActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateUserConsentBasedonSecurityRoles`;

    const body = requestBody({
      SecurityRolesList: this.parameters.SecurityRolesList,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateUserConsentBasedonSecurityRolesResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
