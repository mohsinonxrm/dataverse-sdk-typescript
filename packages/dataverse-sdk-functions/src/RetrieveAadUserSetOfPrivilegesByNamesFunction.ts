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
 * Parameters of the RetrieveAadUserSetOfPrivilegesByNames function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAadUserSetOfPrivilegesByNamesFunctionParameters {
  DirectoryObjectId: string;
  PrivilegeNames: string[];
}

/**
 * RetrieveAadUserSetOfPrivilegesByNames function
 *
 * Unbound function
 */
export class RetrieveAadUserSetOfPrivilegesByNamesFunction implements Executable<RetrieveAadUserSetOfPrivilegesByNamesResponse> {
  constructor(
    public readonly parameters: RetrieveAadUserSetOfPrivilegesByNamesFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAadUserSetOfPrivilegesByNames`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.DirectoryObjectId !== undefined) {
      aliases.push(`DirectoryObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.DirectoryObjectId, "Edm.Guid"));
    }
    if (this.parameters.PrivilegeNames !== undefined) {
      aliases.push(`PrivilegeNames=@p2`);
      params.append("@p2", JSON.stringify(this.parameters.PrivilegeNames));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveAadUserSetOfPrivilegesByNamesResponse;
    return (await response.json()) as RetrieveAadUserSetOfPrivilegesByNamesResponse;
  }
}
