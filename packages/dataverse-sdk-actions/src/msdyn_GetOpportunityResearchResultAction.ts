import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetOpportunityResearchResult action
 */
export interface msdyn_GetOpportunityResearchResultResponse {
  ChainOfThoughtsResult: string;
  RefreshFrequency: string;
  FormattedMonetaryValue: string;
  FormattedCloseDate: string;
  IsResearchStale: boolean;
  AccountInsightsResult: string;
  OpportunityResearchCompletionTime: string;
  MacroAgentOrchestrationId: string;
  OpportunityResearchStatus: string;
  Result: string;
  OpportunityResearchLastVisitedTime: string;
  StakeholderInsightsResult: string;
  IsOpportunityResearchAgentOn: boolean;
  CompetitorInsightsResult: string;
}

/**
 * msdyn_GetOpportunityResearchResult action
 *
 * Unbound action
 */
export class msdyn_GetOpportunityResearchResultAction implements Executable<msdyn_GetOpportunityResearchResultResponse> {
  constructor(public readonly opportunityId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOpportunityResearchResult`;

    const body: Record<string, unknown> = {
      OpportunityId: this.opportunityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityResearchResultResponse> {
    const data = await response.json();
    return data as msdyn_GetOpportunityResearchResultResponse;
  }
}
