import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Parameters of the RetrieveUserSetOfPrivilegesByIds message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveUserSetOfPrivilegesByIdsRequestParameters {
  PrivilegeIds: string[];
  ExcludeTeamBasic?: boolean;
}

/**
 * RetrieveUserSetOfPrivilegesByIds request message
 *
 * Web API Function: RetrieveUserSetOfPrivilegesByIds
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserSetOfPrivilegesByIdsRequest
  extends OrganizationRequest
  implements Executable<RetrieveUserSetOfPrivilegesByIdsResponse>
{
  declare readonly Parameters: Readonly<RetrieveUserSetOfPrivilegesByIdsRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: RetrieveUserSetOfPrivilegesByIdsRequestParameters
  ) {
    super("RetrieveUserSetOfPrivilegesByIds", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrieveUserSetOfPrivilegesByIds`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.PrivilegeIds !== undefined) {
      aliases.push(`PrivilegeIds=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.PrivilegeIds, "Collection(Edm.Guid)", "Collection")
      );
    }
    if (this.Parameters.ExcludeTeamBasic !== undefined) {
      aliases.push(`ExcludeTeamBasic=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.ExcludeTeamBasic, "Edm.Boolean"));
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
    return RetrieveUserSetOfPrivilegesByIdsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUserSetOfPrivilegesByIds function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveUserSetOfPrivilegesByIdsResult {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveUserSetOfPrivilegesByIds response message
 *
 * `result` is the value the RetrieveUserSetOfPrivilegesByIds function returns (see {@link RetrieveUserSetOfPrivilegesByIdsResult}).
 */
export class RetrieveUserSetOfPrivilegesByIdsResponse extends OrganizationResponse {
  constructor(public result: RetrieveUserSetOfPrivilegesByIdsResult) {
    super("RetrieveUserSetOfPrivilegesByIds");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUserSetOfPrivilegesByIdsResponse {
    return new RetrieveUserSetOfPrivilegesByIdsResponse(
      data as RetrieveUserSetOfPrivilegesByIdsResult
    );
  }
}
