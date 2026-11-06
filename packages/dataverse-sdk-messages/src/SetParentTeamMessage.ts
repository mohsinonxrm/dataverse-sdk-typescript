import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { businessunit } from "./types/index.js";

/**
 * SetParentTeam request message
 *
 * Web API Action: SetParentTeam
 */
export class SetParentTeamRequest
  extends OrganizationRequest
  implements Executable<SetParentTeamResponse>
{
  constructor(
    public teamId: string,
    public businessUnit: EntityReference | EntityPayload<businessunit>,
    public doNotMoveAllRecords?: boolean
  ) {
    super("SetParentTeam");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.SetParentTeam`;

    const body: Record<string, unknown> = {
      BusinessUnit: this.businessUnit,
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

  async parseResponse(response: Response): Promise<SetParentTeamResponse> {
    // No return value (204 No Content)
    return new SetParentTeamResponse();
  }
}

/**
 * SetParentTeam response message
 */
export class SetParentTeamResponse extends OrganizationResponse {
  constructor() {
    super("SetParentTeam");
  }

  static fromResponse(_data: unknown): SetParentTeamResponse {
    return new SetParentTeamResponse();
  }
}
