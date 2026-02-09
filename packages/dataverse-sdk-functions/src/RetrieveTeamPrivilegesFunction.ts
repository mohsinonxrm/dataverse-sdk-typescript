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
    const data = await response.json();
    return data as RetrieveTeamPrivilegesResponse;
  }
}
