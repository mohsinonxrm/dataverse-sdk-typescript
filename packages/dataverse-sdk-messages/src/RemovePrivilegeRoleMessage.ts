import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { privilege } from "./types/index.js";

/**
 * RemovePrivilegeRole request message
 *
 * Web API Action: RemovePrivilegeRole
 */
export class RemovePrivilegeRoleRequest
  extends OrganizationRequest
  implements Executable<RemovePrivilegeRoleResponse>
{
  constructor(
    public roleId: string,
    public privilege: privilege
  ) {
    super("RemovePrivilegeRole");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RemovePrivilegeRoleResponse> {
    // No return value (204 No Content)
    return new RemovePrivilegeRoleResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.roleId,
      Privilege: this.privilege,
    };
  }
}

/**
 * RemovePrivilegeRole response message
 */
export class RemovePrivilegeRoleResponse extends OrganizationResponse {
  constructor() {
    super("RemovePrivilegeRole");
  }

  static fromResponse(_data: unknown): RemovePrivilegeRoleResponse {
    return new RemovePrivilegeRoleResponse();
  }
}
