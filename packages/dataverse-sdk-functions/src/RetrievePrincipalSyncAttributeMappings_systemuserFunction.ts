import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { AttributeMapping } from "./types/index.js";

/**
 * Response from the RetrievePrincipalSyncAttributeMappings function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrievePrincipalSyncAttributeMappings_systemuserResponse {
  "@odata.context"?: string;
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
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrievePrincipalSyncAttributeMappings`;

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrievePrincipalSyncAttributeMappings_systemuserResponse;
  }
}
