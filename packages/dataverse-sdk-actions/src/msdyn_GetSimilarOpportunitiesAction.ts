import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetSimilarOpportunities action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSimilarOpportunitiesResponse {
  "@odata.context"?: string;
  MatchCount: number;
  Matches: string;
}

/**
 * Parameters of the msdyn_GetSimilarOpportunities action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSimilarOpportunitiesActionParameters {
  OpportunityId: string;
}

/**
 * msdyn_GetSimilarOpportunities action
 *
 * Unbound action
 */
export class msdyn_GetSimilarOpportunitiesAction implements Executable<msdyn_GetSimilarOpportunitiesResponse> {
  constructor(public readonly parameters: msdyn_GetSimilarOpportunitiesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSimilarOpportunities`;

    const body = requestBody({
      OpportunityId: this.parameters.OpportunityId,
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
    return (await response.json()) as msdyn_GetSimilarOpportunitiesResponse;
  }
}
