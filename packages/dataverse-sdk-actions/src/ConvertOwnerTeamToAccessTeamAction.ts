import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ConvertOwnerTeamToAccessTeam action
 */
export interface ConvertOwnerTeamToAccessTeamResponse {
  // No content returned
}

/**
 * ConvertOwnerTeamToAccessTeam action
 *
 * Bound action
 * Binding parameter: entity (mscrm.team)
 */
export class ConvertOwnerTeamToAccessTeamAction implements Executable<ConvertOwnerTeamToAccessTeamResponse> {
  constructor(public readonly teamId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.ConvertOwnerTeamToAccessTeam`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ConvertOwnerTeamToAccessTeamResponse> {
    // No return value (204 No Content)
    return {};
  }
}
