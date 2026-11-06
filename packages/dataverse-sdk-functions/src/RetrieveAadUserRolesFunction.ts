import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { role } from "./types/index.js";

/**
 * Response from RetrieveAadUserRoles function
 */
export interface RetrieveAadUserRolesResponse {
  value: role[];
}

/**
 * Parameters of the RetrieveAadUserRoles function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAadUserRolesFunctionParameters {
  DirectoryObjectId: string;
}

/**
 * RetrieveAadUserRoles function
 *
 * Unbound function
 */
export class RetrieveAadUserRolesFunction implements Executable<RetrieveAadUserRolesResponse> {
  constructor(public readonly parameters: RetrieveAadUserRolesFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAadUserRoles`;

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

  async parseResponse(response: Response): Promise<RetrieveAadUserRolesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveAadUserRolesResponse;
  }
}
