import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemuser } from "./types/index.js";

/**
 * Response from AddMembersTeam action
 */
export interface AddMembersTeamResponse {
  // No content returned
}

/**
 * AddMembersTeam action
 *
 * Bound action
 * Binding parameter: entity (mscrm.team)
 */
export class AddMembersTeamAction implements Executable<AddMembersTeamResponse> {
  constructor(
    public readonly teamId: string,
    public readonly members: (EntityReference | EntityPayload<systemuser>)[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.AddMembersTeam`;

    const body: Record<string, unknown> = {
      Members: this.members,
    };

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
    // No return value (204 No Content)
    return {};
  }
}
