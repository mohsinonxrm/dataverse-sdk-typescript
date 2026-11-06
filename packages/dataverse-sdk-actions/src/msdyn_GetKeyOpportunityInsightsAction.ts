import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetKeyOpportunityInsights action
 */
export interface msdyn_GetKeyOpportunityInsightsResponse {
  ErrorMessage: string;
  IsSuccess: boolean;
  Result: string;
}

/**
 * Parameters of the msdyn_GetKeyOpportunityInsights action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKeyOpportunityInsightsActionParameters {
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetKeyOpportunityInsights action
 *
 * Unbound action
 */
export class msdyn_GetKeyOpportunityInsightsAction implements Executable<msdyn_GetKeyOpportunityInsightsResponse> {
  constructor(public readonly parameters: msdyn_GetKeyOpportunityInsightsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKeyOpportunityInsights`;

    const body = requestBody({
      msdyn_OpportunityId: this.parameters.msdyn_OpportunityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetKeyOpportunityInsightsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetKeyOpportunityInsightsResponse;
    return (await response.json()) as msdyn_GetKeyOpportunityInsightsResponse;
  }
}
