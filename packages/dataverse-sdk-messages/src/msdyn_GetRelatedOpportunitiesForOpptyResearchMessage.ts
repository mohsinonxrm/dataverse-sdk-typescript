import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetRelatedOpportunitiesForOpptyResearch message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRelatedOpportunitiesForOpptyResearchRequestParameters {
  msdyn_OpportunityId: string;
  msdyn_TopCount: number;
}

/**
 * msdyn_GetRelatedOpportunitiesForOpptyResearch request message
 *
 * Web API Action: msdyn_GetRelatedOpportunitiesForOpptyResearch
 */
export class msdyn_GetRelatedOpportunitiesForOpptyResearchRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRelatedOpportunitiesForOpptyResearchResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetRelatedOpportunitiesForOpptyResearchRequestParameters>;

  constructor(parameters: msdyn_GetRelatedOpportunitiesForOpptyResearchRequestParameters) {
    super("msdyn_GetRelatedOpportunitiesForOpptyResearch", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRelatedOpportunitiesForOpptyResearch`;

    const body = requestBody({
      msdyn_OpportunityId: this.Parameters.msdyn_OpportunityId,
      msdyn_TopCount: this.Parameters.msdyn_TopCount,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetRelatedOpportunitiesForOpptyResearchResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetRelatedOpportunitiesForOpptyResearchResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_GetRelatedOpportunitiesForOpptyResearch action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRelatedOpportunitiesForOpptyResearchResult {
  "@odata.context"?: string;
}

/**
 * msdyn_GetRelatedOpportunitiesForOpptyResearch response message
 *
 * `result` is the value the msdyn_GetRelatedOpportunitiesForOpptyResearch action returns (see {@link msdyn_GetRelatedOpportunitiesForOpptyResearchResult}).
 */
export class msdyn_GetRelatedOpportunitiesForOpptyResearchResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRelatedOpportunitiesForOpptyResearchResult) {
    super("msdyn_GetRelatedOpportunitiesForOpptyResearch");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetRelatedOpportunitiesForOpptyResearchResponse {
    return new msdyn_GetRelatedOpportunitiesForOpptyResearchResponse(
      data as msdyn_GetRelatedOpportunitiesForOpptyResearchResult
    );
  }
}
