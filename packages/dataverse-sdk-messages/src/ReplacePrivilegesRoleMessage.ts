import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Parameters of the ReplacePrivilegesRole message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ReplacePrivilegesRoleRequestParameters {
  Privileges?: RolePrivilege[];
}

/**
 * ReplacePrivilegesRole request message
 *
 * Web API Action: ReplacePrivilegesRole
 *
 * The first argument is the id of the role record to call it on.
 */
export class ReplacePrivilegesRoleRequest
  extends OrganizationRequest
  implements Executable<ReplacePrivilegesRoleResponse>
{
  declare readonly Parameters: Readonly<ReplacePrivilegesRoleRequestParameters>;

  constructor(
    public roleId: string,
    parameters: ReplacePrivilegesRoleRequestParameters = {}
  ) {
    super("ReplacePrivilegesRole", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/roles(${this.roleId})/Microsoft.Dynamics.CRM.ReplacePrivilegesRole`;

    const body = requestBody({
      Privileges: enumBody(this.Parameters.Privileges, "RolePrivilege"),
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

  parseResponse(_response: Response): Promise<ReplacePrivilegesRoleResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new ReplacePrivilegesRoleResponse());
  }
}

/**
 * ReplacePrivilegesRole response message
 */
export class ReplacePrivilegesRoleResponse extends OrganizationResponse {
  constructor() {
    super("ReplacePrivilegesRole");
  }

  static fromResponse(_data?: unknown): ReplacePrivilegesRoleResponse {
    return new ReplacePrivilegesRoleResponse();
  }
}
