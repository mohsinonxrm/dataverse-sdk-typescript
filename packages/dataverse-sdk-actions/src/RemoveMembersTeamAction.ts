import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { systemuser } from "./types/index.js";

/**
 * Response from RemoveMembersTeam action
 */
export interface RemoveMembersTeamResponse {
  // No content returned
}

/**
 * RemoveMembersTeam action
 *
 * Bound action
 * Binding parameter: entity (mscrm.team)
 */
export class RemoveMembersTeamAction implements Executable<RemoveMembersTeamResponse> {
  constructor(
    public readonly teamId: string,
    public readonly members: systemuser[]
  ) {}

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
    return {};
  }
}
