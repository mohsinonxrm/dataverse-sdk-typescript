import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SaveOpportunityResearchResult action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SaveOpportunityResearchResultResponse {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * Parameters of the msdyn_SaveOpportunityResearchResult action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveOpportunityResearchResultActionParameters {
  OpportunityResearchResultPayload: string;
}

/**
 * msdyn_SaveOpportunityResearchResult action
 *
 * Unbound action
 */
export class msdyn_SaveOpportunityResearchResultAction implements Executable<msdyn_SaveOpportunityResearchResultResponse> {
  constructor(public readonly parameters: msdyn_SaveOpportunityResearchResultActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveOpportunityResearchResult`;

    const body = requestBody({
      OpportunityResearchResultPayload: this.parameters.OpportunityResearchResultPayload,
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

  async parseResponse(response: Response): Promise<msdyn_SaveOpportunityResearchResultResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SaveOpportunityResearchResultResponse;
  }
}
