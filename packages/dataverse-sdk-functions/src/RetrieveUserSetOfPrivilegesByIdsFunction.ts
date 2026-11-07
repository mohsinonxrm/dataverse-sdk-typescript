import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from the RetrieveUserSetOfPrivilegesByIds function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveUserSetOfPrivilegesByIdsResponse {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * Parameters of the RetrieveUserSetOfPrivilegesByIds function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveUserSetOfPrivilegesByIdsFunctionParameters {
  PrivilegeIds: string[];
  ExcludeTeamBasic?: boolean;
}

/**
 * RetrieveUserSetOfPrivilegesByIds function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserSetOfPrivilegesByIdsFunction implements Executable<RetrieveUserSetOfPrivilegesByIdsResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: RetrieveUserSetOfPrivilegesByIdsFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserSetOfPrivilegesByIds`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.PrivilegeIds !== undefined) {
      aliases.push(`PrivilegeIds=@p1`);
      params.append("@p1", JSON.stringify(this.parameters.PrivilegeIds));
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

  async parseResponse(response: Response): Promise<RetrieveUserSetOfPrivilegesByIdsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveUserSetOfPrivilegesByIdsResponse;
  }
}
