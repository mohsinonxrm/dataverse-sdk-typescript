import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * SyncGroupMembersToTeam request message
 *
 * Web API Action: SyncGroupMembersToTeam
 */
export class SyncGroupMembersToTeamRequest
  extends OrganizationRequest
  implements Executable<SyncGroupMembersToTeamResponse>
{
  constructor(public teamId: string) {
    super("SyncGroupMembersToTeam");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.SyncGroupMembersToTeam`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<SyncGroupMembersToTeamResponse> {
    // No return value (204 No Content)
    return new SyncGroupMembersToTeamResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.teamId,
    };
  }
}

/**
 * SyncGroupMembersToTeam response message
 */
export class SyncGroupMembersToTeamResponse extends OrganizationResponse {
  constructor() {
    super("SyncGroupMembersToTeam");
  }

  static fromResponse(_data: unknown): SyncGroupMembersToTeamResponse {
    return new SyncGroupMembersToTeamResponse();
  }
}
