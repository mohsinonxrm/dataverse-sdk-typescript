import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetOpportunityPainPointsAndNeeds action
 */
export interface msdyn_GetOpportunityPainPointsAndNeedsResponse {
  ErrorMessage: string;
  IsSuccess: boolean;
  Result: string;
}

/**
 * Parameters of the msdyn_GetOpportunityPainPointsAndNeeds action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOpportunityPainPointsAndNeedsActionParameters {
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetOpportunityPainPointsAndNeeds action
 *
 * Unbound action
 */
export class msdyn_GetOpportunityPainPointsAndNeedsAction implements Executable<msdyn_GetOpportunityPainPointsAndNeedsResponse> {
  constructor(public readonly parameters: msdyn_GetOpportunityPainPointsAndNeedsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOpportunityPainPointsAndNeeds`;

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

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityPainPointsAndNeedsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetOpportunityPainPointsAndNeedsResponse;
    return (await response.json()) as msdyn_GetOpportunityPainPointsAndNeedsResponse;
  }
}
