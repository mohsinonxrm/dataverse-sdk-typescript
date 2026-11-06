import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
 * Parameters of the msdyn_GetOpportunityResearchResult action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOpportunityResearchResultActionParameters {
  OpportunityId: string;
}

/**
 * msdyn_GetOpportunityResearchResult action
 *
 * Unbound action
 */
export class msdyn_GetOpportunityResearchResultAction implements Executable<msdyn_GetOpportunityResearchResultResponse> {
  constructor(public readonly parameters: msdyn_GetOpportunityResearchResultActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOpportunityResearchResult`;

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

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityResearchResultResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetOpportunityResearchResultResponse;
  }
}
