import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetOpportunityPainPointsAndNeeds action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOpportunityPainPointsAndNeedsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetOpportunityPainPointsAndNeedsResponse;
  }
}
