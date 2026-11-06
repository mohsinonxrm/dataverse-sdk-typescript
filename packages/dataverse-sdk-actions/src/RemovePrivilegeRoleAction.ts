import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { privilege } from "./types/index.js";

/**
 * Response from RemovePrivilegeRole action
 */
export interface RemovePrivilegeRoleResponse {
  // No content returned
}

/**
 * Parameters of the RemovePrivilegeRole action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemovePrivilegeRoleActionParameters {
  Privilege: EntityReference | EntityPayload<privilege>;
}

/**
 * RemovePrivilegeRole action
 *
 * Bound action
 * Binding parameter: entity (mscrm.role)
 *
 * The first argument is the id of the role record to call it on.
 */
export class RemovePrivilegeRoleAction implements Executable<RemovePrivilegeRoleResponse> {
  constructor(
    public readonly roleId: string,
    public readonly parameters: RemovePrivilegeRoleActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/roles(${this.roleId})/Microsoft.Dynamics.CRM.RemovePrivilegeRole`;

    const body = requestBody({
      Privilege: this.parameters.Privilege,
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

  async parseResponse(response: Response): Promise<RemovePrivilegeRoleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RemovePrivilegeRoleResponse;
    return (await response.json()) as RemovePrivilegeRoleResponse;
  }
}
