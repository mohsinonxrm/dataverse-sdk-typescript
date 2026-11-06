import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { businessunit } from "./types/index.js";

/**
 * Response from SetParentTeam action
 */
export interface SetParentTeamResponse {
  // No content returned
}

/**
 * Parameters of the SetParentTeam action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetParentTeamActionParameters {
  BusinessUnit: EntityReference | EntityPayload<businessunit>;
  DoNotMoveAllRecords?: boolean;
}

/**
 * SetParentTeam action
 *
 * Bound action
 * Binding parameter: entity (mscrm.team)
 *
 * The first argument is the id of the team record to call it on.
 */
export class SetParentTeamAction implements Executable<SetParentTeamResponse> {
  constructor(
    public readonly teamId: string,
    public readonly parameters: SetParentTeamActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.SetParentTeam`;

    const body = requestBody({
      BusinessUnit: this.parameters.BusinessUnit,
      DoNotMoveAllRecords: this.parameters.DoNotMoveAllRecords,
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

  async parseResponse(response: Response): Promise<SetParentTeamResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SetParentTeamResponse;
    return (await response.json()) as SetParentTeamResponse;
  }
}
