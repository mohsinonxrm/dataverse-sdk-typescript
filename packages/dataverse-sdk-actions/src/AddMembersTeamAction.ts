import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemuser } from "./types/index.js";

/**
 * Response from the AddMembersTeam action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type AddMembersTeamResponse = void;

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
    const url = `${baseUrl}/teams(${odataLiteral.guid(this.teamId)})/Microsoft.Dynamics.CRM.AddMembersTeam`;

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

  parseResponse(_response: Response): Promise<AddMembersTeamResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
