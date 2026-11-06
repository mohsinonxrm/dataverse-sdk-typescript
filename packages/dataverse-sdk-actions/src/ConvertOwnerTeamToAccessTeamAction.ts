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
 *
 * The first argument is the id of the team record to call it on.
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ConvertOwnerTeamToAccessTeamResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ConvertOwnerTeamToAccessTeamResponse;
  }
}
