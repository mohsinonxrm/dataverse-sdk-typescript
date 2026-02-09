import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    public members: systemuser[]
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RemoveMembersTeamResponse> {
    // No return value (204 No Content)
    return new RemoveMembersTeamResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.teamId,
      Members: this.members,
    };
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
