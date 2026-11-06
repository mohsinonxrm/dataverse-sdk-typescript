import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemuser } from "./types/index.js";

/**
 * Response from RemoveMembersTeam action
 */
export interface RemoveMembersTeamResponse {
  // No content returned
}

/**
 * Parameters of the RemoveMembersTeam action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveMembersTeamActionParameters {
  Members: (EntityReference | EntityPayload<systemuser>)[];
}

/**
 * RemoveMembersTeam action
 *
 * Bound action
 * Binding parameter: entity (mscrm.team)
 *
 * The first argument is the id of the team record to call it on.
 */
export class RemoveMembersTeamAction implements Executable<RemoveMembersTeamResponse> {
  constructor(
    public readonly teamId: string,
    public readonly parameters: RemoveMembersTeamActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.RemoveMembersTeam`;

    const body = requestBody({
      Members: this.parameters.Members,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RemoveMembersTeamResponse;
  }
}
