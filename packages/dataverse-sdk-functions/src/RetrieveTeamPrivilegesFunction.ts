import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveTeamPrivileges function
 */
export interface RetrieveTeamPrivilegesResponse {
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
    let url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.RetrieveTeamPrivileges`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveTeamPrivilegesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveTeamPrivilegesResponse;
  }
}
