import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveRolePrivilegesRole function
 */
export interface RetrieveRolePrivilegesRoleResponse {
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveRolePrivilegesRole function
 *
 * Unbound function
 */
export class RetrieveRolePrivilegesRoleFunction implements Executable<RetrieveRolePrivilegesRoleResponse> {
  constructor(public readonly roleId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveRolePrivilegesRole`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.roleId !== undefined) {
      aliases.push(`RoleId=@p1`);
      params.append("@p1", formatAliasValue(this.roleId));
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

  async parseResponse(response: Response): Promise<RetrieveRolePrivilegesRoleResponse> {
    const data = await response.json();
    return data as RetrieveRolePrivilegesRoleResponse;
  }
}
