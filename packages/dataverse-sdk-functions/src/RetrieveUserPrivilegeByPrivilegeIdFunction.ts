import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveUserPrivilegeByPrivilegeId function
 */
export interface RetrieveUserPrivilegeByPrivilegeIdResponse {
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveUserPrivilegeByPrivilegeId function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 */
export class RetrieveUserPrivilegeByPrivilegeIdFunction implements Executable<RetrieveUserPrivilegeByPrivilegeIdResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly privilegeId: string,
    public readonly excludeTeamBasic: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserPrivilegeByPrivilegeId`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.privilegeId !== undefined) {
      aliases.push(`PrivilegeId=@p1`);
      params.append(
        "@p1",
        typeof this.privilegeId === "string" ? `'${this.privilegeId}'` : String(this.privilegeId)
      );
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

  async parseResponse(response: Response): Promise<RetrieveUserPrivilegeByPrivilegeIdResponse> {
    const data = await response.json();
    return data as RetrieveUserPrivilegeByPrivilegeIdResponse;
  }
}
