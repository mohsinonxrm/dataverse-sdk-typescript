import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AttributeMapping } from "./types/index.js";

/**
 * Response from RetrievePrincipalSyncAttributeMappings function
 */
export interface RetrievePrincipalSyncAttributeMappingsResponse {
  AttributeMappings: AttributeMapping[];
}

/**
 * RetrievePrincipalSyncAttributeMappings function
 *
 * Bound function
 * Binding parameter: entity (mscrm.team)
 */
export class RetrievePrincipalSyncAttributeMappingsFunction implements Executable<RetrievePrincipalSyncAttributeMappingsResponse> {
  constructor(public readonly teamId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.RetrievePrincipalSyncAttributeMappings`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrievePrincipalSyncAttributeMappingsResponse> {
    const data = await response.json();
    return data as RetrievePrincipalSyncAttributeMappingsResponse;
  }
}
