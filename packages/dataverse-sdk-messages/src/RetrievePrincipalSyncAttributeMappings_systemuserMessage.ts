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
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrievePrincipalSyncAttributeMappings_systemuserRequest
  extends OrganizationRequest
  implements Executable<RetrievePrincipalSyncAttributeMappings_systemuserResponse>
{
  constructor(public systemuserId: string) {
    super("RetrievePrincipalSyncAttributeMappings");
  }

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
    return RetrievePrincipalSyncAttributeMappings_systemuserResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the RetrievePrincipalSyncAttributeMappings function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrievePrincipalSyncAttributeMappings_systemuserResult {
  "@odata.context"?: string;
  AttributeMappings: AttributeMapping[];
}

/**
 * RetrievePrincipalSyncAttributeMappings response message
 *
 * `result` is the value the RetrievePrincipalSyncAttributeMappings function returns (see {@link RetrievePrincipalSyncAttributeMappings_systemuserResult}).
 */
export class RetrievePrincipalSyncAttributeMappings_systemuserResponse extends OrganizationResponse {
  constructor(public result: RetrievePrincipalSyncAttributeMappings_systemuserResult) {
    super("RetrievePrincipalSyncAttributeMappings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrievePrincipalSyncAttributeMappings_systemuserResponse {
    return new RetrievePrincipalSyncAttributeMappings_systemuserResponse(
      data as RetrievePrincipalSyncAttributeMappings_systemuserResult
    );
  }
}
