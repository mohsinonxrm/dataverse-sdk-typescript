import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { privilege } from "./types/index.js";

/**
 * Parameters of the RemovePrivilegeRole message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemovePrivilegeRoleRequestParameters {
  Privilege: EntityReference | EntityPayload<privilege>;
}

/**
 * RemovePrivilegeRole request message
 *
 * Web API Action: RemovePrivilegeRole
 *
 * The first argument is the id of the role record to call it on.
 */
export class RemovePrivilegeRoleRequest
  extends OrganizationRequest
  implements Executable<RemovePrivilegeRoleResponse>
{
  declare readonly Parameters: Readonly<RemovePrivilegeRoleRequestParameters>;

  constructor(
    public roleId: string,
    parameters: RemovePrivilegeRoleRequestParameters
  ) {
    super("RemovePrivilegeRole", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/roles(${this.roleId})/Microsoft.Dynamics.CRM.RemovePrivilegeRole`;

    const body = requestBody({
      Privilege: this.Parameters.Privilege,
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
    // No return value (204 No Content)
    return new RemovePrivilegeRoleResponse();
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
