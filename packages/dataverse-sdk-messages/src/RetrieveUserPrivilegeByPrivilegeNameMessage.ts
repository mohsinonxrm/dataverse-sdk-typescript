import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Parameters of the RetrieveUserPrivilegeByPrivilegeName message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveUserPrivilegeByPrivilegeNameRequestParameters {
  PrivilegeName: string;
  ExcludeTeamBasic?: boolean;
}

/**
 * RetrieveUserPrivilegeByPrivilegeName request message
 *
 * Web API Function: RetrieveUserPrivilegeByPrivilegeName
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserPrivilegeByPrivilegeNameRequest
  extends OrganizationRequest
  implements Executable<RetrieveUserPrivilegeByPrivilegeNameResponse>
{
  declare readonly Parameters: Readonly<RetrieveUserPrivilegeByPrivilegeNameRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: RetrieveUserPrivilegeByPrivilegeNameRequestParameters
  ) {
    super("RetrieveUserPrivilegeByPrivilegeName", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrieveUserPrivilegeByPrivilegeName`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.PrivilegeName !== undefined) {
      aliases.push(`PrivilegeName=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.PrivilegeName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrieveUserPrivilegeByPrivilegeNameResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveUserPrivilegeByPrivilegeNameResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUserPrivilegeByPrivilegeName function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveUserPrivilegeByPrivilegeNameResult {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveUserPrivilegeByPrivilegeName response message
 *
 * `result` is the value the RetrieveUserPrivilegeByPrivilegeName function returns (see {@link RetrieveUserPrivilegeByPrivilegeNameResult}).
 */
export class RetrieveUserPrivilegeByPrivilegeNameResponse extends OrganizationResponse {
  constructor(public result: RetrieveUserPrivilegeByPrivilegeNameResult) {
    super("RetrieveUserPrivilegeByPrivilegeName");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUserPrivilegeByPrivilegeNameResponse {
    return new RetrieveUserPrivilegeByPrivilegeNameResponse(
      data as RetrieveUserPrivilegeByPrivilegeNameResult
    );
  }
}
