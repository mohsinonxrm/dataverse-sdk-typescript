import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    public privileges: RolePrivilege[]
  ) {
    super("AddPrivilegesRole");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/roles(${this.roleId})/Microsoft.Dynamics.CRM.AddPrivilegesRole`;

    const body: Record<string, unknown> = {
      Privileges: this.privileges,
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

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.roleId,
      Privileges: this.privileges,
    };
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
