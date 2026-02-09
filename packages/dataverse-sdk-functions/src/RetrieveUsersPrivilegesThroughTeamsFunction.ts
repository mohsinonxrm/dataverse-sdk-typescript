import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveUsersPrivilegesThroughTeams function
 */
export interface RetrieveUsersPrivilegesThroughTeamsResponse {
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveUsersPrivilegesThroughTeams function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 */
export class RetrieveUsersPrivilegesThroughTeamsFunction implements Executable<RetrieveUsersPrivilegesThroughTeamsResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly excludeOrgDisabledPrivileges: boolean,
    public readonly includeSetupUserFiltering: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveUsersPrivilegesThroughTeams`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.excludeOrgDisabledPrivileges !== undefined) {
      aliases.push(`ExcludeOrgDisabledPrivileges=@p1`);
      params.append(
        "@p1",
        typeof this.excludeOrgDisabledPrivileges === "string"
          ? `'${this.excludeOrgDisabledPrivileges}'`
          : String(this.excludeOrgDisabledPrivileges)
      );
    }
    if (this.includeSetupUserFiltering !== undefined) {
      aliases.push(`IncludeSetupUserFiltering=@p2`);
      params.append(
        "@p2",
        typeof this.includeSetupUserFiltering === "string"
          ? `'${this.includeSetupUserFiltering}'`
          : String(this.includeSetupUserFiltering)
      );
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUsersPrivilegesThroughTeamsResponse> {
    const data = await response.json();
    return data as RetrieveUsersPrivilegesThroughTeamsResponse;
  }
}
