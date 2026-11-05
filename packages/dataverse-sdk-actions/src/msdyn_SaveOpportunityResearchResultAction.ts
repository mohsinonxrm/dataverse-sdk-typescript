import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SaveOpportunityResearchResult action
 */
export interface msdyn_SaveOpportunityResearchResultResponse {
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * msdyn_SaveOpportunityResearchResult action
 *
 * Unbound action
 */
export class msdyn_SaveOpportunityResearchResultAction implements Executable<msdyn_SaveOpportunityResearchResultResponse> {
  constructor(public readonly opportunityResearchResultPayload: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveOpportunityResearchResult`;

    const body: Record<string, unknown> = {
      OpportunityResearchResultPayload: this.opportunityResearchResultPayload,
    };

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
    const data = await response.json();
    return data as msdyn_SaveOpportunityResearchResultResponse;
  }
}
