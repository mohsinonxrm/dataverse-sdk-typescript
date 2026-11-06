import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveUserSetOfPrivilegesByNames function
 */
export interface RetrieveUserSetOfPrivilegesByNamesResponse {
  RolePrivileges: RolePrivilege[];
}

/**
 * Parameters of the RetrieveUserSetOfPrivilegesByNames function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveUserSetOfPrivilegesByNamesFunctionParameters {
  PrivilegeNames: string[];
  ExcludeTeamBasic?: boolean;
}

/**
 * RetrieveUserSetOfPrivilegesByNames function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserSetOfPrivilegesByNamesFunction implements Executable<RetrieveUserSetOfPrivilegesByNamesResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: RetrieveUserSetOfPrivilegesByNamesFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserSetOfPrivilegesByNames`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.PrivilegeNames !== undefined) {
      aliases.push(`PrivilegeNames=@p1`);
      params.append("@p1", JSON.stringify(this.parameters.PrivilegeNames));
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

  async parseResponse(response: Response): Promise<RetrieveUserSetOfPrivilegesByNamesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveUserSetOfPrivilegesByNamesResponse;
  }
}
