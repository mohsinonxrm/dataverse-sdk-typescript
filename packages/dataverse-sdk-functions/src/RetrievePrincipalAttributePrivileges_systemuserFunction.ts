import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AttributePrivilege } from "./types/index.js";

/**
 * Response from RetrievePrincipalAttributePrivileges function
 */
export interface RetrievePrincipalAttributePrivileges_systemuserResponse {
  AttributePrivileges: AttributePrivilege[];
}

/**
 * RetrievePrincipalAttributePrivileges function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 */
export class RetrievePrincipalAttributePrivileges_systemuserFunction implements Executable<RetrievePrincipalAttributePrivileges_systemuserResponse> {
  constructor(public readonly systemuserId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrievePrincipalAttributePrivileges`;

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
    const data = await response.json();
    return data as RetrievePrincipalAttributePrivileges_systemuserResponse;
  }
}
