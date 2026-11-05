import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { businessunit } from "./types/index.js";

/**
 * Response from SetParentTeam action
 */
export interface SetParentTeamResponse {
  // No content returned
}

/**
 * SetParentTeam action
 *
 * Bound action
 * Binding parameter: entity (mscrm.team)
 */
export class SetParentTeamAction implements Executable<SetParentTeamResponse> {
  constructor(
    public readonly teamId: string,
    public readonly businessUnit: businessunit,
    public readonly doNotMoveAllRecords: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.SetParentTeam`;

    const body: Record<string, unknown> = {
      BusinessUnit: this.businessUnit,
      DoNotMoveAllRecords: this.doNotMoveAllRecords,
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

  async parseResponse(response: Response): Promise<SetParentTeamResponse> {
    // No return value (204 No Content)
    return {};
  }
}
