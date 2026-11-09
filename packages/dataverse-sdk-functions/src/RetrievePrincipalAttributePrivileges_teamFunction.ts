import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { AttributePrivilege } from "./types/index.js";

/**
 * Response from the RetrievePrincipalAttributePrivileges function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrievePrincipalAttributePrivileges_teamResponse {
  "@odata.context"?: string;
  AttributePrivileges: AttributePrivilege[];
}

/**
 * RetrievePrincipalAttributePrivileges function
 *
 * Bound function
 * Binding parameter: entity (mscrm.team)
 *
 * The first argument is the id of the team record to call it on.
 */
export class RetrievePrincipalAttributePrivileges_teamFunction implements Executable<RetrievePrincipalAttributePrivileges_teamResponse> {
  constructor(public readonly teamId: string) {}

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
    return (await response.json()) as RetrievePrincipalAttributePrivileges_teamResponse;
  }
}
