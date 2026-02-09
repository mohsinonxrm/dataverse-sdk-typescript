import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateUserConsentBasedonSecurityRoles action
 */
export interface msdyn_UpdateUserConsentBasedonSecurityRolesResponse {
  // No content returned
}

/**
 * msdyn_UpdateUserConsentBasedonSecurityRoles action
 *
 * Unbound action
 */
export class msdyn_UpdateUserConsentBasedonSecurityRolesAction implements Executable<msdyn_UpdateUserConsentBasedonSecurityRolesResponse> {
  constructor(public readonly securityRolesList: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateUserConsentBasedonSecurityRoles`;

    const body: Record<string, unknown> = {
      SecurityRolesList: this.securityRolesList,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_UpdateUserConsentBasedonSecurityRolesResponse> {
    // No return value (204 No Content)
    return {};
  }
}
