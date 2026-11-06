import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { teamtemplate } from "./types/index.js";

/**
 * Response from RemoveUserFromRecordTeam action
 */
export interface RemoveUserFromRecordTeamResponse {
  AccessTeamId: string;
}

/**
 * Parameters of the RemoveUserFromRecordTeam action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveUserFromRecordTeamActionParameters {
  Record: EntityReference | AnyEntityPayload;
  TeamTemplate: EntityReference | EntityPayload<teamtemplate>;
}

/**
 * RemoveUserFromRecordTeam action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RemoveUserFromRecordTeamAction implements Executable<RemoveUserFromRecordTeamResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: RemoveUserFromRecordTeamActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RemoveUserFromRecordTeam`;

    const body = requestBody({
      Record: this.parameters.Record,
      TeamTemplate: this.parameters.TeamTemplate,
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

  async parseResponse(response: Response): Promise<RemoveUserFromRecordTeamResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RemoveUserFromRecordTeamResponse;
    return (await response.json()) as RemoveUserFromRecordTeamResponse;
  }
}
