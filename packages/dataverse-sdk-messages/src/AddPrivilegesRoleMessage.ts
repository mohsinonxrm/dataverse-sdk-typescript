import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { enumBody } from "./internal/enumBody.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * AddPrivilegesRole request message
 *
 * Web API Action: AddPrivilegesRole
 */
export class AddPrivilegesRoleRequest
  extends OrganizationRequest
  implements Executable<AddPrivilegesRoleResponse>
{
  constructor(
    public roleId: string,
    public privileges?: RolePrivilege[]
  ) {
    super("AddPrivilegesRole");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/roles(${this.roleId})/Microsoft.Dynamics.CRM.AddPrivilegesRole`;

    const body: Record<string, unknown> = {
      Privileges: enumBody(this.privileges, "RolePrivilege"),
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

  async parseResponse(response: Response): Promise<AddPrivilegesRoleResponse> {
    // No return value (204 No Content)
    return new AddPrivilegesRoleResponse();
  }
}

/**
 * AddPrivilegesRole response message
 */
export class AddPrivilegesRoleResponse extends OrganizationResponse {
  constructor() {
    super("AddPrivilegesRole");
  }

  static fromResponse(_data: unknown): AddPrivilegesRoleResponse {
    return new AddPrivilegesRoleResponse();
  }
}
