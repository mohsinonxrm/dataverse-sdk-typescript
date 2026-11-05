import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * ReassignObjectsSystemUser request message
 *
 * Web API Action: ReassignObjectsSystemUser
 */
export class ReassignObjectsSystemUserRequest
  extends OrganizationRequest
  implements Executable<ReassignObjectsSystemUserResponse>
{
  constructor(
    public systemuserId: string,
    public reassignPrincipal: EntityReference,
    public objectType: number
  ) {
    super("ReassignObjectsSystemUser");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.ReassignObjectsSystemUser`;

    const body: Record<string, unknown> = {
      ReassignPrincipal: this.reassignPrincipal,
      objectType: this.objectType,
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

  async parseResponse(response: Response): Promise<ReassignObjectsSystemUserResponse> {
    // No return value (204 No Content)
    return new ReassignObjectsSystemUserResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.systemuserId,
      ReassignPrincipal: this.reassignPrincipal,
      objectType: this.objectType,
    };
  }
}

/**
 * ReassignObjectsSystemUser response message
 */
export class ReassignObjectsSystemUserResponse extends OrganizationResponse {
  constructor() {
    super("ReassignObjectsSystemUser");
  }

  static fromResponse(_data: unknown): ReassignObjectsSystemUserResponse {
    return new ReassignObjectsSystemUserResponse();
  }
}
