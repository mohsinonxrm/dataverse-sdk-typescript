import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveUserSetOfPrivilegesByNames function
 */
export interface RetrieveUserSetOfPrivilegesByNamesResponse {
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveUserSetOfPrivilegesByNames function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 */
export class RetrieveUserSetOfPrivilegesByNamesFunction implements Executable<RetrieveUserSetOfPrivilegesByNamesResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly privilegeNames: string[],
    public readonly excludeTeamBasic: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserSetOfPrivilegesByNames`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.privilegeNames !== undefined) {
      aliases.push(`PrivilegeNames=@p1`);
      params.append("@p1", JSON.stringify(this.privilegeNames));
    }
    if (this.excludeTeamBasic !== undefined) {
      aliases.push(`ExcludeTeamBasic=@p2`);
      params.append(
        "@p2",
        typeof this.excludeTeamBasic === "string"
          ? `'${this.excludeTeamBasic}'`
          : String(this.excludeTeamBasic)
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

  async parseResponse(response: Response): Promise<RetrieveUserSetOfPrivilegesByNamesResponse> {
    const data = await response.json();
    return data as RetrieveUserSetOfPrivilegesByNamesResponse;
  }
}
