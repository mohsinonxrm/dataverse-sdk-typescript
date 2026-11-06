import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveAadUserSetOfPrivilegesByNames function
 */
export interface RetrieveAadUserSetOfPrivilegesByNamesResponse {
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveAadUserSetOfPrivilegesByNames function
 *
 * Unbound function
 */
export class RetrieveAadUserSetOfPrivilegesByNamesFunction implements Executable<RetrieveAadUserSetOfPrivilegesByNamesResponse> {
  constructor(
    public readonly directoryObjectId: string,
    public readonly privilegeNames: string[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAadUserSetOfPrivilegesByNames`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.directoryObjectId !== undefined) {
      aliases.push(`DirectoryObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.directoryObjectId, "Edm.Guid"));
    }
    if (this.privilegeNames !== undefined) {
      aliases.push(`PrivilegeNames=@p2`);
      params.append("@p2", JSON.stringify(this.privilegeNames));
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

  async parseResponse(response: Response): Promise<RetrieveAadUserSetOfPrivilegesByNamesResponse> {
    const data = await response.json();
    return data as RetrieveAadUserSetOfPrivilegesByNamesResponse;
  }
}
