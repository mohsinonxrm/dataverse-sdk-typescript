import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveUserSetOfPrivilegesByIds function
 */
export interface RetrieveUserSetOfPrivilegesByIdsResponse {
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveUserSetOfPrivilegesByIds function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 */
export class RetrieveUserSetOfPrivilegesByIdsFunction implements Executable<RetrieveUserSetOfPrivilegesByIdsResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly privilegeIds: string[],
    public readonly excludeTeamBasic?: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserSetOfPrivilegesByIds`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.privilegeIds !== undefined) {
      aliases.push(`PrivilegeIds=@p1`);
      params.append("@p1", JSON.stringify(this.privilegeIds));
    }
    if (this.excludeTeamBasic !== undefined) {
      aliases.push(`ExcludeTeamBasic=@p2`);
      params.append("@p2", formatParameterAlias(this.excludeTeamBasic, "Edm.Boolean"));
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

  async parseResponse(response: Response): Promise<RetrieveUserSetOfPrivilegesByIdsResponse> {
    const data = await response.json();
    return data as RetrieveUserSetOfPrivilegesByIdsResponse;
  }
}
