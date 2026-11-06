import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AttributeMapping } from "./types/index.js";

/**
 * Response from RetrievePrincipalSyncAttributeMappings function
 */
export interface RetrievePrincipalSyncAttributeMappings_systemuserResponse {
  AttributeMappings: AttributeMapping[];
}

/**
 * RetrievePrincipalSyncAttributeMappings function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 */
export class RetrievePrincipalSyncAttributeMappings_systemuserFunction implements Executable<RetrievePrincipalSyncAttributeMappings_systemuserResponse> {
  constructor(public readonly systemuserId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrievePrincipalSyncAttributeMappings`;

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
  ): Promise<RetrievePrincipalSyncAttributeMappings_systemuserResponse> {
    const data = await response.json();
    return data as RetrievePrincipalSyncAttributeMappings_systemuserResponse;
  }
}
