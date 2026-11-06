import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { teamtemplate } from "./types/index.js";

/**
 * Response from AddUserToRecordTeam action
 */
export interface AddUserToRecordTeamResponse {
  AccessTeamId: string;
}

/**
 * AddUserToRecordTeam action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 */
export class AddUserToRecordTeamAction implements Executable<AddUserToRecordTeamResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly record: EntityReference | AnyEntityPayload,
    public readonly teamTemplate: EntityReference | EntityPayload<teamtemplate>
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.AddUserToRecordTeam`;

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

  async parseResponse(response: Response): Promise<AddUserToRecordTeamResponse> {
    const data = await response.json();
    return data as AddUserToRecordTeamResponse;
  }
}
