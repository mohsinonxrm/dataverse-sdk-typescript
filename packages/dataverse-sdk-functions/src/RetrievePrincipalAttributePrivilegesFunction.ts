import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AttributePrivilege } from "./types/index.js";

/**
 * Response from RetrievePrincipalAttributePrivileges function
 */
export interface RetrievePrincipalAttributePrivilegesResponse {
  AttributePrivileges: AttributePrivilege[];
}

/**
 * RetrievePrincipalAttributePrivileges function
 *
 * Bound function
 * Binding parameter: entity (mscrm.team)
 */
export class RetrievePrincipalAttributePrivilegesFunction implements Executable<RetrievePrincipalAttributePrivilegesResponse> {
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

  async parseResponse(response: Response): Promise<RetrievePrincipalAttributePrivilegesResponse> {
    const data = await response.json();
    return data as RetrievePrincipalAttributePrivilegesResponse;
  }
}
