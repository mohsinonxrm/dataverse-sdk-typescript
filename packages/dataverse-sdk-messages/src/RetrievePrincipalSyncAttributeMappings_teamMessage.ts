import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { AttributeMapping } from "./types/index.js";

/**
 * RetrievePrincipalSyncAttributeMappings request message
 *
 * Web API Function: RetrievePrincipalSyncAttributeMappings
 *
 * The first argument is the id of the team record to call it on.
 */
export class RetrievePrincipalSyncAttributeMappings_teamRequest
  extends OrganizationRequest
  implements Executable<RetrievePrincipalSyncAttributeMappings_teamResponse>
{
  constructor(public teamId: string) {
    super("RetrievePrincipalSyncAttributeMappings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/teams(${odataLiteral.guid(this.teamId)})/Microsoft.Dynamics.CRM.RetrievePrincipalSyncAttributeMappings`;

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
    // The body is the complex value, with its @odata.context
    return RetrievePrincipalSyncAttributeMappings_teamResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrievePrincipalSyncAttributeMappings function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrievePrincipalSyncAttributeMappings_teamResult {
  "@odata.context"?: string;
  AttributeMappings: AttributeMapping[];
}

/**
 * RetrievePrincipalSyncAttributeMappings response message
 *
 * `result` is the value the RetrievePrincipalSyncAttributeMappings function returns (see {@link RetrievePrincipalSyncAttributeMappings_teamResult}).
 */
export class RetrievePrincipalSyncAttributeMappings_teamResponse extends OrganizationResponse {
  constructor(public result: RetrievePrincipalSyncAttributeMappings_teamResult) {
    super("RetrievePrincipalSyncAttributeMappings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrievePrincipalSyncAttributeMappings_teamResponse {
    return new RetrievePrincipalSyncAttributeMappings_teamResponse(
      data as RetrievePrincipalSyncAttributeMappings_teamResult
    );
  }
}
