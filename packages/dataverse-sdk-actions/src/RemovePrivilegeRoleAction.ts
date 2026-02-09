import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { privilege } from "./types/index.js";

/**
 * Response from RemovePrivilegeRole action
 */
export interface RemovePrivilegeRoleResponse {
  // No content returned
}

/**
 * RemovePrivilegeRole action
 *
 * Bound action
 * Binding parameter: entity (mscrm.role)
 */
export class RemovePrivilegeRoleAction implements Executable<RemovePrivilegeRoleResponse> {
  constructor(
    public readonly roleId: string,
    public readonly privilege: privilege
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/roles(${this.roleId})/Microsoft.Dynamics.CRM.RemovePrivilegeRole`;

    const body: Record<string, unknown> = {
      Privilege: this.privilege,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RemovePrivilegeRoleResponse> {
    // No return value (204 No Content)
    return {};
  }
}
