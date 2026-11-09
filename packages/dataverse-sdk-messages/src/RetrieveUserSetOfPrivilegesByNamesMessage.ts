import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Parameters of the RetrieveUserSetOfPrivilegesByNames message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveUserSetOfPrivilegesByNamesRequestParameters {
  PrivilegeNames: string[];
  ExcludeTeamBasic?: boolean;
}

/**
 * RetrieveUserSetOfPrivilegesByNames request message
 *
 * Web API Function: RetrieveUserSetOfPrivilegesByNames
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserSetOfPrivilegesByNamesRequest
  extends OrganizationRequest
  implements Executable<RetrieveUserSetOfPrivilegesByNamesResponse>
{
  declare readonly Parameters: Readonly<RetrieveUserSetOfPrivilegesByNamesRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: RetrieveUserSetOfPrivilegesByNamesRequestParameters
  ) {
    super("RetrieveUserSetOfPrivilegesByNames", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrieveUserSetOfPrivilegesByNames`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.PrivilegeNames !== undefined) {
      aliases.push(`PrivilegeNames=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.PrivilegeNames, "Collection(Edm.String)", "Collection")
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

  async parseResponse(response: Response): Promise<RetrieveUserSetOfPrivilegesByNamesResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveUserSetOfPrivilegesByNamesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUserSetOfPrivilegesByNames function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveUserSetOfPrivilegesByNamesResult {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveUserSetOfPrivilegesByNames response message
 *
 * `result` is the value the RetrieveUserSetOfPrivilegesByNames function returns (see {@link RetrieveUserSetOfPrivilegesByNamesResult}).
 */
export class RetrieveUserSetOfPrivilegesByNamesResponse extends OrganizationResponse {
  constructor(public result: RetrieveUserSetOfPrivilegesByNamesResult) {
    super("RetrieveUserSetOfPrivilegesByNames");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUserSetOfPrivilegesByNamesResponse {
    return new RetrieveUserSetOfPrivilegesByNamesResponse(
      data as RetrieveUserSetOfPrivilegesByNamesResult
    );
  }
}
