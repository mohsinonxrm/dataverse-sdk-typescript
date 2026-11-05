import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { teamtemplate } from "./types/index.js";

/**
 * Response from RemoveUserFromRecordTeam action
 */
export interface RemoveUserFromRecordTeamResponse {
  AccessTeamId: string;
}

/**
 * RemoveUserFromRecordTeam action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 */
export class RemoveUserFromRecordTeamAction implements Executable<RemoveUserFromRecordTeamResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly record: EntityReference,
    public readonly teamTemplate: teamtemplate
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RemoveUserFromRecordTeam`;

    const body: Record<string, unknown> = {
      Record: this.record,
      TeamTemplate: this.teamTemplate,
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

  async parseResponse(response: Response): Promise<RemoveUserFromRecordTeamResponse> {
    const data = await response.json();
    return data as RemoveUserFromRecordTeamResponse;
  }
}
