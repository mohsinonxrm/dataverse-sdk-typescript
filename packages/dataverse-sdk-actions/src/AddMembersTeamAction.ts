import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemuser } from "./types/index.js";

/**
 * Response from AddMembersTeam action
 */
export interface AddMembersTeamResponse {
  // No content returned
}

/**
 * Parameters of the AddMembersTeam action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddMembersTeamActionParameters {
  Members: (EntityReference | EntityPayload<systemuser>)[];
}

/**
 * AddMembersTeam action
 *
 * Bound action
 * Binding parameter: entity (mscrm.team)
 *
 * The first argument is the id of the team record to call it on.
 */
export class AddMembersTeamAction implements Executable<AddMembersTeamResponse> {
  constructor(
    public readonly teamId: string,
    public readonly parameters: AddMembersTeamActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.AddMembersTeam`;

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

  async parseResponse(response: Response): Promise<AddMembersTeamResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AddMembersTeamResponse;
  }
}
