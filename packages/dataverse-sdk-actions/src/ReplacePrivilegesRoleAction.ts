import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from ReplacePrivilegesRole action
 */
export interface ReplacePrivilegesRoleResponse {
  // No content returned
}

/**
 * ReplacePrivilegesRole action
 *
 * Bound action
 * Binding parameter: entity (mscrm.role)
 */
export class ReplacePrivilegesRoleAction implements Executable<ReplacePrivilegesRoleResponse> {
  constructor(
    public readonly roleId: string,
    public readonly privileges: RolePrivilege[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/roles(${this.roleId})/Microsoft.Dynamics.CRM.ReplacePrivilegesRole`;

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

  async parseResponse(response: Response): Promise<ReplacePrivilegesRoleResponse> {
    // No return value (204 No Content)
    return {};
  }
}
