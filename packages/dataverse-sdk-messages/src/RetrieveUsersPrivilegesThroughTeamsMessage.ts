import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Parameters of the RetrieveUsersPrivilegesThroughTeams message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveUsersPrivilegesThroughTeamsRequestParameters {
  ExcludeOrgDisabledPrivileges: boolean;
  IncludeSetupUserFiltering: boolean;
}

/**
 * RetrieveUsersPrivilegesThroughTeams request message
 *
 * Web API Function: RetrieveUsersPrivilegesThroughTeams
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUsersPrivilegesThroughTeamsRequest
  extends OrganizationRequest
  implements Executable<RetrieveUsersPrivilegesThroughTeamsResponse>
{
  declare readonly Parameters: Readonly<RetrieveUsersPrivilegesThroughTeamsRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: RetrieveUsersPrivilegesThroughTeamsRequestParameters
  ) {
    super("RetrieveUsersPrivilegesThroughTeams", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrieveUsersPrivilegesThroughTeams`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ExcludeOrgDisabledPrivileges !== undefined) {
      aliases.push(`ExcludeOrgDisabledPrivileges=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.ExcludeOrgDisabledPrivileges, "Edm.Boolean")
      );
    }
    if (this.Parameters.IncludeSetupUserFiltering !== undefined) {
      aliases.push(`IncludeSetupUserFiltering=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.Parameters.IncludeSetupUserFiltering, "Edm.Boolean")
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
    return RetrieveUsersPrivilegesThroughTeamsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUsersPrivilegesThroughTeams function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveUsersPrivilegesThroughTeamsResult {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveUsersPrivilegesThroughTeams response message
 *
 * `result` is the value the RetrieveUsersPrivilegesThroughTeams function returns (see {@link RetrieveUsersPrivilegesThroughTeamsResult}).
 */
export class RetrieveUsersPrivilegesThroughTeamsResponse extends OrganizationResponse {
  constructor(public result: RetrieveUsersPrivilegesThroughTeamsResult) {
    super("RetrieveUsersPrivilegesThroughTeams");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUsersPrivilegesThroughTeamsResponse {
    return new RetrieveUsersPrivilegesThroughTeamsResponse(
      data as RetrieveUsersPrivilegesThroughTeamsResult
    );
  }
}
