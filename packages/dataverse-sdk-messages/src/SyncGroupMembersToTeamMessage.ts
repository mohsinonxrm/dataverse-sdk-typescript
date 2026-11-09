import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * SyncGroupMembersToTeam request message
 *
 * Web API Action: SyncGroupMembersToTeam
 *
 * The first argument is the id of the team record to call it on.
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
    const url = `${baseUrl}/teams(${odataLiteral.guid(this.teamId)})/Microsoft.Dynamics.CRM.SyncGroupMembersToTeam`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<SyncGroupMembersToTeamResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new SyncGroupMembersToTeamResponse());
  }
}

/**
 * SyncGroupMembersToTeam response message
 */
export class SyncGroupMembersToTeamResponse extends OrganizationResponse {
  constructor() {
    super("SyncGroupMembersToTeam");
  }

  static fromResponse(_data?: unknown): SyncGroupMembersToTeamResponse {
    return new SyncGroupMembersToTeamResponse();
  }
}
