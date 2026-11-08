import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { RolePrivilege } from "./types/index.js";

/**
 * RetrieveTeamPrivileges request message
 *
 * Web API Function: RetrieveTeamPrivileges
 *
 * The first argument is the id of the team record to call it on.
 */
export class RetrieveTeamPrivilegesRequest
  extends OrganizationRequest
  implements Executable<RetrieveTeamPrivilegesResponse>
{
  constructor(public teamId: string) {
    super("RetrieveTeamPrivileges");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/teams(${odataLiteral.guid(this.teamId)})/Microsoft.Dynamics.CRM.RetrieveTeamPrivileges`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveTeamPrivilegesResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveTeamPrivilegesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveTeamPrivileges function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveTeamPrivilegesResult {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveTeamPrivileges response message
 *
 * `result` is the value the RetrieveTeamPrivileges function returns (see {@link RetrieveTeamPrivilegesResult}).
 */
export class RetrieveTeamPrivilegesResponse extends OrganizationResponse {
  constructor(public result: RetrieveTeamPrivilegesResult) {
    super("RetrieveTeamPrivileges");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveTeamPrivilegesResponse {
    return new RetrieveTeamPrivilegesResponse(data as RetrieveTeamPrivilegesResult);
  }
}
