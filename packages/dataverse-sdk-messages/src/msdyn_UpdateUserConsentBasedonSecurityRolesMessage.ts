import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateUserConsentBasedonSecurityRoles request message
 *
 * Web API Action: msdyn_UpdateUserConsentBasedonSecurityRoles
 */
export class msdyn_UpdateUserConsentBasedonSecurityRolesRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateUserConsentBasedonSecurityRolesResponse>
{
  constructor(public securityRolesList: string) {
    super("msdyn_UpdateUserConsentBasedonSecurityRoles");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateUserConsentBasedonSecurityRoles`;

    const body: Record<string, unknown> = {
      SecurityRolesList: this.securityRolesList,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_UpdateUserConsentBasedonSecurityRolesResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateUserConsentBasedonSecurityRolesResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SecurityRolesList: this.securityRolesList,
    };
  }
}

/**
 * msdyn_UpdateUserConsentBasedonSecurityRoles response message
 */
export class msdyn_UpdateUserConsentBasedonSecurityRolesResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateUserConsentBasedonSecurityRoles");
  }

  static fromResponse(_data: unknown): msdyn_UpdateUserConsentBasedonSecurityRolesResponse {
    return new msdyn_UpdateUserConsentBasedonSecurityRolesResponse();
  }
}
