import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetOpportunityResearchResult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOpportunityResearchResultRequestParameters {
  OpportunityId: string;
}

/**
 * msdyn_GetOpportunityResearchResult request message
 *
 * Web API Action: msdyn_GetOpportunityResearchResult
 */
export class msdyn_GetOpportunityResearchResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOpportunityResearchResultResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetOpportunityResearchResultRequestParameters>;

  constructor(parameters: msdyn_GetOpportunityResearchResultRequestParameters) {
    super("msdyn_GetOpportunityResearchResult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOpportunityResearchResult`;

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

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityResearchResultResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetOpportunityResearchResultResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetOpportunityResearchResult action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOpportunityResearchResultResult {
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
 * msdyn_GetOpportunityResearchResult response message
 *
 * `result` is the value the msdyn_GetOpportunityResearchResult action returns (see {@link msdyn_GetOpportunityResearchResultResult}).
 */
export class msdyn_GetOpportunityResearchResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOpportunityResearchResultResult) {
    super("msdyn_GetOpportunityResearchResult");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetOpportunityResearchResultResponse {
    return new msdyn_GetOpportunityResearchResultResponse(
      data as msdyn_GetOpportunityResearchResultResult
    );
  }
}
