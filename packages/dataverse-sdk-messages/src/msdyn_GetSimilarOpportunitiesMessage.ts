import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetSimilarOpportunities message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSimilarOpportunitiesRequestParameters {
  OpportunityId: string;
}

/**
 * msdyn_GetSimilarOpportunities request message
 *
 * Web API Action: msdyn_GetSimilarOpportunities
 */
export class msdyn_GetSimilarOpportunitiesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSimilarOpportunitiesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSimilarOpportunitiesRequestParameters>;

  constructor(parameters: msdyn_GetSimilarOpportunitiesRequestParameters) {
    super("msdyn_GetSimilarOpportunities", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSimilarOpportunities`;

    const body = requestBody({
      OpportunityId: this.Parameters.OpportunityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetSimilarOpportunitiesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSimilarOpportunitiesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSimilarOpportunities action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSimilarOpportunitiesResult {
  "@odata.context"?: string;
  MatchCount: number;
  Matches: string;
}

/**
 * msdyn_GetSimilarOpportunities response message
 *
 * `result` is the value the msdyn_GetSimilarOpportunities action returns (see {@link msdyn_GetSimilarOpportunitiesResult}).
 */
export class msdyn_GetSimilarOpportunitiesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSimilarOpportunitiesResult) {
    super("msdyn_GetSimilarOpportunities");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSimilarOpportunitiesResponse {
    return new msdyn_GetSimilarOpportunitiesResponse(data as msdyn_GetSimilarOpportunitiesResult);
  }
}
