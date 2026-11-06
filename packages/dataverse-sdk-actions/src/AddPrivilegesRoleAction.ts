import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from the AddPrivilegesRole action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type AddPrivilegesRoleResponse = void;

/**
 * Parameters of the AddPrivilegesRole action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddPrivilegesRoleActionParameters {
  Privileges?: RolePrivilege[];
}

/**
 * AddPrivilegesRole action
 *
 * Bound action
 * Binding parameter: entity (mscrm.role)
 *
 * The first argument is the id of the role record to call it on.
 */
export class AddPrivilegesRoleAction implements Executable<AddPrivilegesRoleResponse> {
  constructor(
    public readonly roleId: string,
    public readonly parameters: AddPrivilegesRoleActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/roles(${this.roleId})/Microsoft.Dynamics.CRM.AddPrivilegesRole`;

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

  parseResponse(_response: Response): Promise<AddPrivilegesRoleResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
