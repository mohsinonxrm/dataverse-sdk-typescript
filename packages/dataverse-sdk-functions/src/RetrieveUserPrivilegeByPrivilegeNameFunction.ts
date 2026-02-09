import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveUserPrivilegeByPrivilegeName function
 */
export interface RetrieveUserPrivilegeByPrivilegeNameResponse {
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveUserPrivilegeByPrivilegeName function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 */
export class RetrieveUserPrivilegeByPrivilegeNameFunction implements Executable<RetrieveUserPrivilegeByPrivilegeNameResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly privilegeName: string,
    public readonly excludeTeamBasic: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserPrivilegeByPrivilegeName`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.privilegeName !== undefined) {
      aliases.push(`PrivilegeName=@p1`);
      params.append(
        "@p1",
        typeof this.privilegeName === "string"
          ? `'${this.privilegeName}'`
          : String(this.privilegeName)
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

  async parseResponse(response: Response): Promise<RetrieveUserPrivilegeByPrivilegeNameResponse> {
    const data = await response.json();
    return data as RetrieveUserPrivilegeByPrivilegeNameResponse;
  }
}
