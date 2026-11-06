import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { enumBody } from "./internal/enumBody.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * ReplacePrivilegesRole request message
 *
 * Web API Action: ReplacePrivilegesRole
 */
export class ReplacePrivilegesRoleRequest
  extends OrganizationRequest
  implements Executable<ReplacePrivilegesRoleResponse>
{
  constructor(
    public roleId: string,
    public privileges?: RolePrivilege[]
  ) {
    super("ReplacePrivilegesRole");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/roles(${this.roleId})/Microsoft.Dynamics.CRM.ReplacePrivilegesRole`;

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

  async parseResponse(response: Response): Promise<ReplacePrivilegesRoleResponse> {
    // No return value (204 No Content)
    return new ReplacePrivilegesRoleResponse();
  }
}

/**
 * ReplacePrivilegesRole response message
 */
export class ReplacePrivilegesRoleResponse extends OrganizationResponse {
  constructor() {
    super("ReplacePrivilegesRole");
  }

  static fromResponse(_data: unknown): ReplacePrivilegesRoleResponse {
    return new ReplacePrivilegesRoleResponse();
  }
}
