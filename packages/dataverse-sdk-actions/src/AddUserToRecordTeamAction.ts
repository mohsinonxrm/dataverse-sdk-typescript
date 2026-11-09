import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { teamtemplate } from "./types/index.js";

/**
 * Response from the AddUserToRecordTeam action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AddUserToRecordTeamResponse {
  "@odata.context"?: string;
  AccessTeamId: string;
}

/**
 * Parameters of the AddUserToRecordTeam action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddUserToRecordTeamActionParameters {
  Record: EntityReference | AnyEntityPayload;
  TeamTemplate: EntityReference | EntityPayload<teamtemplate>;
}

/**
 * AddUserToRecordTeam action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class AddUserToRecordTeamAction implements Executable<AddUserToRecordTeamResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: AddUserToRecordTeamActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.AddUserToRecordTeam`;

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

  async parseResponse(response: Response): Promise<AddUserToRecordTeamResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as AddUserToRecordTeamResponse;
  }
}
