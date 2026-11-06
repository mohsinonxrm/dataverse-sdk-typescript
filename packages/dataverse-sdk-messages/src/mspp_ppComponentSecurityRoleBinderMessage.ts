import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the mspp_ppComponentSecurityRoleBinder message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface mspp_ppComponentSecurityRoleBinderRequestParameters {
  mspp_EntityLogicalName: string;
}

/**
 * mspp_ppComponentSecurityRoleBinder request message
 *
 * Web API Action: mspp_ppComponentSecurityRoleBinder
 *
 * The first argument is the id of the powerpagecomponent record to call it on.
 */
export class mspp_ppComponentSecurityRoleBinderRequest
  extends OrganizationRequest
  implements Executable<mspp_ppComponentSecurityRoleBinderResponse>
{
  declare readonly Parameters: Readonly<mspp_ppComponentSecurityRoleBinderRequestParameters>;

  constructor(
    public powerpagecomponentId: string,
    parameters: mspp_ppComponentSecurityRoleBinderRequestParameters
  ) {
    super("mspp_ppComponentSecurityRoleBinder", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/powerpagecomponents(${this.powerpagecomponentId})/Microsoft.Dynamics.CRM.mspp_ppComponentSecurityRoleBinder`;

    const body = requestBody({
      mspp_EntityLogicalName: this.Parameters.mspp_EntityLogicalName,
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

  async parseResponse(response: Response): Promise<mspp_ppComponentSecurityRoleBinderResponse> {
    // No return value (204 No Content)
    return new mspp_ppComponentSecurityRoleBinderResponse();
  }
}

/**
 * mspp_ppComponentSecurityRoleBinder response message
 */
export class mspp_ppComponentSecurityRoleBinderResponse extends OrganizationResponse {
  constructor() {
    super("mspp_ppComponentSecurityRoleBinder");
  }

  static fromResponse(_data: unknown): mspp_ppComponentSecurityRoleBinderResponse {
    return new mspp_ppComponentSecurityRoleBinderResponse();
  }
}
