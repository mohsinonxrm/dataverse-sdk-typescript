import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { role } from "./types/index.js";

/**
 * Response from RetrieveAadUserRoles function
 */
export interface RetrieveAadUserRolesResponse {
  value: role[];
}

/**
 * RetrieveAadUserRoles function
 *
 * Unbound function
 */
export class RetrieveAadUserRolesFunction implements Executable<RetrieveAadUserRolesResponse> {
  constructor(public readonly directoryObjectId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAadUserRoles`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.directoryObjectId !== undefined) {
      aliases.push(`DirectoryObjectId=@p1`);
      params.append("@p1", formatAliasValue(this.directoryObjectId));
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
    const data = await response.json();
    return data as RetrieveAadUserRolesResponse;
  }
}
