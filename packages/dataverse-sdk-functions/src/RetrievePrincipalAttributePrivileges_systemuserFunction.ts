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
 *
 * The first argument is the id of the systemuser record to call it on.
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as RetrievePrincipalAttributePrivileges_systemuserResponse;
    return (await response.json()) as RetrievePrincipalAttributePrivileges_systemuserResponse;
  }
}
