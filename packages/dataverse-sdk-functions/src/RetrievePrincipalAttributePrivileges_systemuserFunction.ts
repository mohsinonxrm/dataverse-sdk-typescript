import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AttributePrivilege } from "./types/index.js";

/**
 * Response from the RetrievePrincipalAttributePrivileges function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrievePrincipalAttributePrivileges_systemuserResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrievePrincipalAttributePrivileges_systemuserResponse;
  }
}
