import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AttributeMapping } from "./types/index.js";

/**
 * Response from RetrievePrincipalSyncAttributeMappings function
 */
export interface RetrievePrincipalSyncAttributeMappings_teamResponse {
  AttributeMappings: AttributeMapping[];
}

/**
 * RetrievePrincipalSyncAttributeMappings function
 *
 * Bound function
 * Binding parameter: entity (mscrm.team)
 *
 * The first argument is the id of the team record to call it on.
 */
export class RetrievePrincipalSyncAttributeMappings_teamFunction implements Executable<RetrievePrincipalSyncAttributeMappings_teamResponse> {
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

  async parseResponse(
    response: Response
  ): Promise<RetrievePrincipalSyncAttributeMappings_teamResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrievePrincipalSyncAttributeMappings_teamResponse;
  }
}
