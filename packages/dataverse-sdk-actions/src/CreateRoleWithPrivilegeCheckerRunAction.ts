import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CreateRoleWithPrivilegeCheckerRun action
 */
export interface CreateRoleWithPrivilegeCheckerRunResponse {
  RoleId: string;
}

/**
 * Parameters of the CreateRoleWithPrivilegeCheckerRun action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateRoleWithPrivilegeCheckerRunActionParameters {
  PrivilegeCheckerRunId: string;
  RoleName: string;
}

/**
 * CreateRoleWithPrivilegeCheckerRun action
 *
 * Bound action
 * Binding parameter: entity (mscrm.privilegecheckerrun)
 *
 * The first argument is the id of the privilegecheckerrun record to call it on.
 */
export class CreateRoleWithPrivilegeCheckerRunAction implements Executable<CreateRoleWithPrivilegeCheckerRunResponse> {
  constructor(
    public readonly privilegecheckerrunId: string,
    public readonly parameters: CreateRoleWithPrivilegeCheckerRunActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/privilegecheckerruns(${this.privilegecheckerrunId})/Microsoft.Dynamics.CRM.CreateRoleWithPrivilegeCheckerRun`;

    const body = requestBody({
      PrivilegeCheckerRunId: this.parameters.PrivilegeCheckerRunId,
      RoleName: this.parameters.RoleName,
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

  async parseResponse(response: Response): Promise<CreateRoleWithPrivilegeCheckerRunResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CreateRoleWithPrivilegeCheckerRunResponse;
  }
}
