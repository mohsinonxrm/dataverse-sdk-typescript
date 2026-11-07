import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the ConvertOwnerTeamToAccessTeam action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ConvertOwnerTeamToAccessTeamResponse = void;

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
    const url = `${baseUrl}/teams(${odataLiteral.guid(this.teamId)})/Microsoft.Dynamics.CRM.ConvertOwnerTeamToAccessTeam`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<ConvertOwnerTeamToAccessTeamResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
