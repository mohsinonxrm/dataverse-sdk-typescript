import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { RolePrivilege } from "./types/index.js";

/**
 * RetrieveUserPrivileges request message
 *
 * Web API Function: RetrieveUserPrivileges
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserPrivilegesRequest
  extends OrganizationRequest
  implements Executable<RetrieveUserPrivilegesResponse>
{
  constructor(public systemuserId: string) {
    super("RetrieveUserPrivileges");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrieveUserPrivileges`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUserPrivilegesResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveUserPrivilegesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUserPrivileges function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveUserPrivilegesResult {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveUserPrivileges response message
 *
 * `result` is the value the RetrieveUserPrivileges function returns (see {@link RetrieveUserPrivilegesResult}).
 */
export class RetrieveUserPrivilegesResponse extends OrganizationResponse {
  constructor(public result: RetrieveUserPrivilegesResult) {
    super("RetrieveUserPrivileges");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUserPrivilegesResponse {
    return new RetrieveUserPrivilegesResponse(data as RetrieveUserPrivilegesResult);
  }
}
