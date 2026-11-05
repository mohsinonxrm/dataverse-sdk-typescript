import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveAadUserSetOfPrivilegesByIds function
 */
export interface RetrieveAadUserSetOfPrivilegesByIdsResponse {
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveAadUserSetOfPrivilegesByIds function
 *
 * Unbound function
 */
export class RetrieveAadUserSetOfPrivilegesByIdsFunction implements Executable<RetrieveAadUserSetOfPrivilegesByIdsResponse> {
  constructor(
    public readonly directoryObjectId: string,
    public readonly privilegeIds: string[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAadUserSetOfPrivilegesByIds`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.directoryObjectId !== undefined) {
      aliases.push(`DirectoryObjectId=@p1`);
      params.append("@p1", formatAliasValue(this.directoryObjectId));
    }
    if (this.privilegeIds !== undefined) {
      aliases.push(`PrivilegeIds=@p2`);
      params.append("@p2", JSON.stringify(this.privilegeIds));
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

  async parseResponse(response: Response): Promise<RetrieveAadUserSetOfPrivilegesByIdsResponse> {
    const data = await response.json();
    return data as RetrieveAadUserSetOfPrivilegesByIdsResponse;
  }
}
