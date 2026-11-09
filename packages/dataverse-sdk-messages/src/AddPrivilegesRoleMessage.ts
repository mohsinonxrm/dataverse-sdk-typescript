import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Parameters of the AddPrivilegesRole message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddPrivilegesRoleRequestParameters {
  Privileges?: RolePrivilege[];
}

/**
 * AddPrivilegesRole request message
 *
 * Web API Action: AddPrivilegesRole
 *
 * The first argument is the id of the role record to call it on.
 */
export class AddPrivilegesRoleRequest
  extends OrganizationRequest
  implements Executable<AddPrivilegesRoleResponse>
{
  declare readonly Parameters: Readonly<AddPrivilegesRoleRequestParameters>;

  constructor(
    public roleId: string,
    parameters: AddPrivilegesRoleRequestParameters = {}
  ) {
    super("AddPrivilegesRole", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/roles(${odataLiteral.guid(this.roleId)})/Microsoft.Dynamics.CRM.AddPrivilegesRole`;

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

  parseResponse(_response: Response): Promise<AddPrivilegesRoleResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new AddPrivilegesRoleResponse());
  }
}

/**
 * AddPrivilegesRole response message
 */
export class AddPrivilegesRoleResponse extends OrganizationResponse {
  constructor() {
    super("AddPrivilegesRole");
  }

  static fromResponse(_data?: unknown): AddPrivilegesRoleResponse {
    return new AddPrivilegesRoleResponse();
  }
}
