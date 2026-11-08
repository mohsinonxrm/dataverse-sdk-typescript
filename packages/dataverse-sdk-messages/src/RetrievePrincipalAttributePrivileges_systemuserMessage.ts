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
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrievePrincipalAttributePrivileges_systemuserRequest
  extends OrganizationRequest
  implements Executable<RetrievePrincipalAttributePrivileges_systemuserResponse>
{
  constructor(public systemuserId: string) {
    super("RetrievePrincipalAttributePrivileges");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrievePrincipalAttributePrivileges`;

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
  ): Promise<RetrievePrincipalAttributePrivileges_systemuserResponse> {
    // The body is the complex value, with its @odata.context
    return RetrievePrincipalAttributePrivileges_systemuserResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the RetrievePrincipalAttributePrivileges function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrievePrincipalAttributePrivileges_systemuserResult {
  "@odata.context"?: string;
  AttributePrivileges: AttributePrivilege[];
}

/**
 * RetrievePrincipalAttributePrivileges response message
 *
 * `result` is the value the RetrievePrincipalAttributePrivileges function returns (see {@link RetrievePrincipalAttributePrivileges_systemuserResult}).
 */
export class RetrievePrincipalAttributePrivileges_systemuserResponse extends OrganizationResponse {
  constructor(public result: RetrievePrincipalAttributePrivileges_systemuserResult) {
    super("RetrievePrincipalAttributePrivileges");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrievePrincipalAttributePrivileges_systemuserResponse {
    return new RetrievePrincipalAttributePrivileges_systemuserResponse(
      data as RetrievePrincipalAttributePrivileges_systemuserResult
    );
  }
}
