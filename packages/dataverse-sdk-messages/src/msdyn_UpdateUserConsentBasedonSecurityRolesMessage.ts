import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateUserConsentBasedonSecurityRoles message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateUserConsentBasedonSecurityRolesRequestParameters {
  SecurityRolesList: string;
}

/**
 * msdyn_UpdateUserConsentBasedonSecurityRoles request message
 *
 * Web API Action: msdyn_UpdateUserConsentBasedonSecurityRoles
 */
export class msdyn_UpdateUserConsentBasedonSecurityRolesRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateUserConsentBasedonSecurityRolesResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateUserConsentBasedonSecurityRolesRequestParameters>;

  constructor(parameters: msdyn_UpdateUserConsentBasedonSecurityRolesRequestParameters) {
    super("msdyn_UpdateUserConsentBasedonSecurityRoles", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateUserConsentBasedonSecurityRoles`;

    const body = requestBody({
      SecurityRolesList: this.Parameters.SecurityRolesList,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_UpdateUserConsentBasedonSecurityRolesResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateUserConsentBasedonSecurityRolesResponse();
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
