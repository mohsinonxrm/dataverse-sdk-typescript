import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { businessunit } from "./types/index.js";

/**
 * SetBusinessSystemUser request message
 *
 * Web API Action: SetBusinessSystemUser
 */
export class SetBusinessSystemUserRequest
  extends OrganizationRequest
  implements Executable<SetBusinessSystemUserResponse>
{
  constructor(
    public systemuserId: string,
    public businessUnit: businessunit,
    public reassignPrincipal: EntityReference,
    public doNotMoveAllRecords: boolean
  ) {
    super("SetBusinessSystemUser");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.SetBusinessSystemUser`;

    const body: Record<string, unknown> = {
      BusinessUnit: this.businessUnit,
      ReassignPrincipal: this.reassignPrincipal,
      DoNotMoveAllRecords: this.doNotMoveAllRecords,
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

  async parseResponse(response: Response): Promise<SetBusinessSystemUserResponse> {
    // No return value (204 No Content)
    return new SetBusinessSystemUserResponse();
  }
}

/**
 * SetBusinessSystemUser response message
 */
export class SetBusinessSystemUserResponse extends OrganizationResponse {
  constructor() {
    super("SetBusinessSystemUser");
  }

  static fromResponse(_data: unknown): SetBusinessSystemUserResponse {
    return new SetBusinessSystemUserResponse();
  }
}
