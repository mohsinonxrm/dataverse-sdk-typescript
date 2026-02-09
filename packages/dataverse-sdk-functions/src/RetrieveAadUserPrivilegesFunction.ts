import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveAadUserPrivileges function
 */
export interface RetrieveAadUserPrivilegesResponse {
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveAadUserPrivileges function
 *
 * Unbound function
 */
export class RetrieveAadUserPrivilegesFunction implements Executable<RetrieveAadUserPrivilegesResponse> {
  constructor(public readonly directoryObjectId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAadUserPrivileges`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.directoryObjectId !== undefined) {
      aliases.push(`DirectoryObjectId=@p1`);
      params.append(
        "@p1",
        typeof this.directoryObjectId === "string"
          ? `'${this.directoryObjectId}'`
          : String(this.directoryObjectId)
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

  async parseResponse(response: Response): Promise<RetrieveAadUserPrivilegesResponse> {
    const data = await response.json();
    return data as RetrieveAadUserPrivilegesResponse;
  }
}
