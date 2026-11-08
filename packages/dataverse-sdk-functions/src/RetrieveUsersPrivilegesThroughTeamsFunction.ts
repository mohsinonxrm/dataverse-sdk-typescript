import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from the RetrieveUsersPrivilegesThroughTeams function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveUsersPrivilegesThroughTeamsResponse {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * Parameters of the RetrieveUsersPrivilegesThroughTeams function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveUsersPrivilegesThroughTeamsFunctionParameters {
  ExcludeOrgDisabledPrivileges: boolean;
  IncludeSetupUserFiltering: boolean;
}

/**
 * RetrieveUsersPrivilegesThroughTeams function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUsersPrivilegesThroughTeamsFunction implements Executable<RetrieveUsersPrivilegesThroughTeamsResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: RetrieveUsersPrivilegesThroughTeamsFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrieveUsersPrivilegesThroughTeams`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ExcludeOrgDisabledPrivileges !== undefined) {
      aliases.push(`ExcludeOrgDisabledPrivileges=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.ExcludeOrgDisabledPrivileges, "Edm.Boolean")
      );
    }
    if (this.parameters.IncludeSetupUserFiltering !== undefined) {
      aliases.push(`IncludeSetupUserFiltering=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.parameters.IncludeSetupUserFiltering, "Edm.Boolean")
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

  async parseResponse(response: Response): Promise<RetrieveUsersPrivilegesThroughTeamsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveUsersPrivilegesThroughTeamsResponse;
  }
}
