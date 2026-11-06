import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveUserPrivilegeByPrivilegeId function
 */
export interface RetrieveUserPrivilegeByPrivilegeIdResponse {
  RolePrivileges: RolePrivilege[];
}

/**
 * Parameters of the RetrieveUserPrivilegeByPrivilegeId function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveUserPrivilegeByPrivilegeIdFunctionParameters {
  PrivilegeId: string;
  ExcludeTeamBasic?: boolean;
}

/**
 * RetrieveUserPrivilegeByPrivilegeId function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserPrivilegeByPrivilegeIdFunction implements Executable<RetrieveUserPrivilegeByPrivilegeIdResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: RetrieveUserPrivilegeByPrivilegeIdFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserPrivilegeByPrivilegeId`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.PrivilegeId !== undefined) {
      aliases.push(`PrivilegeId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.PrivilegeId, "Edm.Guid"));
    }
    if (this.parameters.ExcludeTeamBasic !== undefined) {
      aliases.push(`ExcludeTeamBasic=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.ExcludeTeamBasic, "Edm.Boolean"));
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

  async parseResponse(response: Response): Promise<RetrieveUserPrivilegeByPrivilegeIdResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveUserPrivilegeByPrivilegeIdResponse;
    return (await response.json()) as RetrieveUserPrivilegeByPrivilegeIdResponse;
  }
}
