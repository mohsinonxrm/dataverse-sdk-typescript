import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemuser } from "./types/index.js";

/**
 * RemoveMembersTeam request message
 *
 * Web API Action: RemoveMembersTeam
 */
export class RemoveMembersTeamRequest
  extends OrganizationRequest
  implements Executable<RemoveMembersTeamResponse>
{
  constructor(
    public teamId: string,
    public members: (EntityReference | EntityPayload<systemuser>)[]
  ) {
    super("RemoveMembersTeam");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.RemoveMembersTeam`;

    const body: Record<string, unknown> = {
      Members: this.members,
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

  async parseResponse(response: Response): Promise<RemoveMembersTeamResponse> {
    // No return value (204 No Content)
    return new RemoveMembersTeamResponse();
  }
}

/**
 * RemoveMembersTeam response message
 */
export class RemoveMembersTeamResponse extends OrganizationResponse {
  constructor() {
    super("RemoveMembersTeam");
  }

  static fromResponse(_data: unknown): RemoveMembersTeamResponse {
    return new RemoveMembersTeamResponse();
  }
}
