import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from the ReplacePrivilegesRole action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ReplacePrivilegesRoleResponse = void;

/**
 * Parameters of the ReplacePrivilegesRole action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ReplacePrivilegesRoleActionParameters {
  Privileges?: RolePrivilege[];
}

/**
 * ReplacePrivilegesRole action
 *
 * Bound action
 * Binding parameter: entity (mscrm.role)
 *
 * The first argument is the id of the role record to call it on.
 */
export class ReplacePrivilegesRoleAction implements Executable<ReplacePrivilegesRoleResponse> {
  constructor(
    public readonly roleId: string,
    public readonly parameters: ReplacePrivilegesRoleActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/roles(${this.roleId})/Microsoft.Dynamics.CRM.ReplacePrivilegesRole`;

    const body = requestBody({
      Privileges: enumBody(this.parameters.Privileges, "RolePrivilege"),
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

  parseResponse(_response: Response): Promise<ReplacePrivilegesRoleResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
