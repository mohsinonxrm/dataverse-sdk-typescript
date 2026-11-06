import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SyncGroupMembersToTeam action
 */
export interface SyncGroupMembersToTeamResponse {
  // No content returned
}

/**
 * SyncGroupMembersToTeam action
 *
 * Bound action
 * Binding parameter: entity (mscrm.team)
 *
 * The first argument is the id of the team record to call it on.
 */
export class SyncGroupMembersToTeamAction implements Executable<SyncGroupMembersToTeamResponse> {
  constructor(public readonly teamId: string) {}

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SyncGroupMembersToTeamResponse;
    return (await response.json()) as SyncGroupMembersToTeamResponse;
  }
}
