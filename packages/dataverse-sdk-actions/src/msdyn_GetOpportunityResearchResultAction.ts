import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetOpportunityResearchResult action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOpportunityResearchResultResponse {
  "@odata.context"?: string;
  AccountInsightsResult: string;
  AgentProfileId: string;
  ChainOfThoughtsResult: string;
  CompetitorInsightsResult: string;
  CustomInsightsResult: string;
  DeeperInsightsConfigurationVersion: number;
  ErrorMessage: string;
  FormattedCloseDate: string;
  FormattedMonetaryValue: string;
  HistoricalPatternsResult: string;
  IsAccountInsightsEnabled: boolean;
  IsCompetitorInsightsEnabled: boolean;
  IsDataverseSearchEnabled: boolean;
  IsDealHealthEnabled: boolean;
  IsNeedsAndPainPointsEnabled: boolean;
  IsOpportunityResearchAgentOn: boolean;
  IsRefreshEnabled: boolean;
  IsResearchStale: boolean;
  IsStakeholderInsightsEnabled: boolean;
  IsSuccess: boolean;
  MacroAgentOrchestrationId: string;
  OpportunityResearchCompletionTime: string;
  OpportunityResearchLastVisitedTime: string;
  OpportunityResearchStatus: string;
  ProcessingStateCode: number;
  ProcessingStateRecordId: string;
  RefreshFrequency: string;
  Result: string;
  StakeholderInsightsResult: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetOpportunityResearchResultResponse;
  }
}
