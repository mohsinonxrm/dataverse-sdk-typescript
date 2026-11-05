import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CreateRoleWithPrivilegeCheckerRun action
 */
export interface CreateRoleWithPrivilegeCheckerRunResponse {
  RoleId: string;
}

/**
 * CreateRoleWithPrivilegeCheckerRun action
 *
 * Bound action
 * Binding parameter: entity (mscrm.privilegecheckerrun)
 */
export class CreateRoleWithPrivilegeCheckerRunAction implements Executable<CreateRoleWithPrivilegeCheckerRunResponse> {
  constructor(
    public readonly privilegecheckerrunId: string,
    public readonly privilegeCheckerRunId: string,
    public readonly roleName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/privilegecheckerruns(${this.privilegecheckerrunId})/Microsoft.Dynamics.CRM.CreateRoleWithPrivilegeCheckerRun`;

    const body: Record<string, unknown> = {
      PrivilegeCheckerRunId: this.privilegeCheckerRunId,
      RoleName: this.roleName,
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

  async parseResponse(response: Response): Promise<CreateRoleWithPrivilegeCheckerRunResponse> {
    const data = await response.json();
    return data as CreateRoleWithPrivilegeCheckerRunResponse;
  }
}
