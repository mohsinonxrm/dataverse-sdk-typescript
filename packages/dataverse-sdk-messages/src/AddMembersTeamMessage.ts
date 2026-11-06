import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { systemuser } from "./types/index.js";

/**
 * AddMembersTeam request message
 *
 * Web API Action: AddMembersTeam
 */
export class AddMembersTeamRequest
  extends OrganizationRequest
  implements Executable<AddMembersTeamResponse>
{
  constructor(
    public teamId: string,
    public members: systemuser[]
  ) {
    super("AddMembersTeam");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.AddMembersTeam`;

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

  async parseResponse(response: Response): Promise<AddMembersTeamResponse> {
    // No return value (204 No Content)
    return new AddMembersTeamResponse();
  }
}

/**
 * AddMembersTeam response message
 */
export class AddMembersTeamResponse extends OrganizationResponse {
  constructor() {
    super("AddMembersTeam");
  }

  static fromResponse(_data: unknown): AddMembersTeamResponse {
    return new AddMembersTeamResponse();
  }
}
