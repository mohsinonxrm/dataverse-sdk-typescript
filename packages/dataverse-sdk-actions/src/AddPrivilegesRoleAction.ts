import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { enumBody } from "./internal/enumBody.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from AddPrivilegesRole action
 */
export interface AddPrivilegesRoleResponse {
  // No content returned
}

/**
 * AddPrivilegesRole action
 *
 * Bound action
 * Binding parameter: entity (mscrm.role)
 */
export class AddPrivilegesRoleAction implements Executable<AddPrivilegesRoleResponse> {
  constructor(
    public readonly roleId: string,
    public readonly privileges?: RolePrivilege[]
  ) {}

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
    return {};
  }
}
