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
 *
 * The first argument is the id of the systemuser record to call it on.
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as RetrievePrincipalSyncAttributeMappings_systemuserResponse;
    return (await response.json()) as RetrievePrincipalSyncAttributeMappings_systemuserResponse;
  }
}
