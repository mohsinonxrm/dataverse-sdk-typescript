import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { AttributePrivilege } from "./types/index.js";

/**
 * RetrievePrincipalAttributePrivileges request message
 *
 * Web API Function: RetrievePrincipalAttributePrivileges
 *
 * The first argument is the id of the team record to call it on.
 */
export class RetrievePrincipalAttributePrivileges_teamRequest
  extends OrganizationRequest
  implements Executable<RetrievePrincipalAttributePrivileges_teamResponse>
{
  constructor(public teamId: string) {
    super("RetrievePrincipalAttributePrivileges");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/teams(${odataLiteral.guid(this.teamId)})/Microsoft.Dynamics.CRM.RetrievePrincipalAttributePrivileges`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<RetrievePrincipalAttributePrivileges_teamResponse> {
    // The body is the complex value, with its @odata.context
    return RetrievePrincipalAttributePrivileges_teamResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrievePrincipalAttributePrivileges function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrievePrincipalAttributePrivileges_teamResult {
  "@odata.context"?: string;
  AttributePrivileges: AttributePrivilege[];
}

/**
 * RetrievePrincipalAttributePrivileges response message
 *
 * `result` is the value the RetrievePrincipalAttributePrivileges function returns (see {@link RetrievePrincipalAttributePrivileges_teamResult}).
 */
export class RetrievePrincipalAttributePrivileges_teamResponse extends OrganizationResponse {
  constructor(public result: RetrievePrincipalAttributePrivileges_teamResult) {
    super("RetrievePrincipalAttributePrivileges");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrievePrincipalAttributePrivileges_teamResponse {
    return new RetrievePrincipalAttributePrivileges_teamResponse(
      data as RetrievePrincipalAttributePrivileges_teamResult
    );
  }
}
