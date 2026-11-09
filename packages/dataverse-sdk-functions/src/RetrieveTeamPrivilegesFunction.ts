import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from the RetrieveTeamPrivileges function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveTeamPrivilegesResponse {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveTeamPrivileges function
 *
 * Bound function
 * Binding parameter: entity (mscrm.team)
 *
 * The first argument is the id of the team record to call it on.
 */
export class RetrieveTeamPrivilegesFunction implements Executable<RetrieveTeamPrivilegesResponse> {
  constructor(public readonly teamId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/teams(${odataLiteral.guid(this.teamId)})/Microsoft.Dynamics.CRM.RetrieveTeamPrivileges`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveTeamPrivilegesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveTeamPrivilegesResponse;
  }
}
