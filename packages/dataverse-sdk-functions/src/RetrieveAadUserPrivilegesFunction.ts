import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveAadUserPrivileges function
 */
export interface RetrieveAadUserPrivilegesResponse {
  RolePrivileges: RolePrivilege[];
}

/**
 * Parameters of the RetrieveAadUserPrivileges function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAadUserPrivilegesFunctionParameters {
  DirectoryObjectId: string;
}

/**
 * RetrieveAadUserPrivileges function
 *
 * Unbound function
 */
export class RetrieveAadUserPrivilegesFunction implements Executable<RetrieveAadUserPrivilegesResponse> {
  constructor(public readonly parameters: RetrieveAadUserPrivilegesFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAadUserPrivileges`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.DirectoryObjectId !== undefined) {
      aliases.push(`DirectoryObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.DirectoryObjectId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveAadUserPrivilegesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveAadUserPrivilegesResponse;
  }
}
