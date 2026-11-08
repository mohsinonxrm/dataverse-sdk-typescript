import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CreateRoleWithPrivilegeCheckerRun action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateRoleWithPrivilegeCheckerRunResponse {
  "@odata.context"?: string;
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
    const url = `${baseUrl}/privilegecheckerruns(${odataLiteral.guid(this.privilegecheckerrunId)})/Microsoft.Dynamics.CRM.CreateRoleWithPrivilegeCheckerRun`;

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CreateRoleWithPrivilegeCheckerRunResponse;
  }
}
