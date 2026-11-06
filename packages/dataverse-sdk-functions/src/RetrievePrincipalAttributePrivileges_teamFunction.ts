import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AttributePrivilege } from "./types/index.js";

/**
 * Response from RetrievePrincipalAttributePrivileges function
 */
export interface RetrievePrincipalAttributePrivileges_teamResponse {
  AttributePrivileges: AttributePrivilege[];
}

/**
 * RetrievePrincipalAttributePrivileges function
 *
 * Bound function
 * Binding parameter: entity (mscrm.team)
 */
export class RetrievePrincipalAttributePrivileges_teamFunction implements Executable<RetrievePrincipalAttributePrivileges_teamResponse> {
  constructor(public readonly teamId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.RetrievePrincipalAttributePrivileges`;

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
    const data = await response.json();
    return data as RetrievePrincipalAttributePrivileges_teamResponse;
  }
}
