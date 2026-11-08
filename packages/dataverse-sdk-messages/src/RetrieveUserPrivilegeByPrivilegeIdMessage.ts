import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Parameters of the RetrieveUserPrivilegeByPrivilegeId message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveUserPrivilegeByPrivilegeIdRequestParameters {
  PrivilegeId: string;
  ExcludeTeamBasic?: boolean;
}

/**
 * RetrieveUserPrivilegeByPrivilegeId request message
 *
 * Web API Function: RetrieveUserPrivilegeByPrivilegeId
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserPrivilegeByPrivilegeIdRequest
  extends OrganizationRequest
  implements Executable<RetrieveUserPrivilegeByPrivilegeIdResponse>
{
  declare readonly Parameters: Readonly<RetrieveUserPrivilegeByPrivilegeIdRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: RetrieveUserPrivilegeByPrivilegeIdRequestParameters
  ) {
    super("RetrieveUserPrivilegeByPrivilegeId", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrieveUserPrivilegeByPrivilegeId`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.PrivilegeId !== undefined) {
      aliases.push(`PrivilegeId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.PrivilegeId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveUserPrivilegeByPrivilegeIdResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveUserPrivilegeByPrivilegeIdResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUserPrivilegeByPrivilegeId function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveUserPrivilegeByPrivilegeIdResult {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveUserPrivilegeByPrivilegeId response message
 *
 * `result` is the value the RetrieveUserPrivilegeByPrivilegeId function returns (see {@link RetrieveUserPrivilegeByPrivilegeIdResult}).
 */
export class RetrieveUserPrivilegeByPrivilegeIdResponse extends OrganizationResponse {
  constructor(public result: RetrieveUserPrivilegeByPrivilegeIdResult) {
    super("RetrieveUserPrivilegeByPrivilegeId");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUserPrivilegeByPrivilegeIdResponse {
    return new RetrieveUserPrivilegeByPrivilegeIdResponse(
      data as RetrieveUserPrivilegeByPrivilegeIdResult
    );
  }
}
