import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveAadUserSetOfPrivilegesByIds function
 */
export interface RetrieveAadUserSetOfPrivilegesByIdsResponse {
  RolePrivileges: RolePrivilege[];
}

/**
 * Parameters of the RetrieveAadUserSetOfPrivilegesByIds function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAadUserSetOfPrivilegesByIdsFunctionParameters {
  DirectoryObjectId: string;
  PrivilegeIds: string[];
}

/**
 * RetrieveAadUserSetOfPrivilegesByIds function
 *
 * Unbound function
 */
export class RetrieveAadUserSetOfPrivilegesByIdsFunction implements Executable<RetrieveAadUserSetOfPrivilegesByIdsResponse> {
  constructor(public readonly parameters: RetrieveAadUserSetOfPrivilegesByIdsFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAadUserSetOfPrivilegesByIds`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.DirectoryObjectId !== undefined) {
      aliases.push(`DirectoryObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.DirectoryObjectId, "Edm.Guid"));
    }
    if (this.parameters.PrivilegeIds !== undefined) {
      aliases.push(`PrivilegeIds=@p2`);
      params.append("@p2", JSON.stringify(this.parameters.PrivilegeIds));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveAadUserSetOfPrivilegesByIdsResponse;
    return (await response.json()) as RetrieveAadUserSetOfPrivilegesByIdsResponse;
  }
}
