/**
 * msdyn_GetOpportunityResearchResultResponse
 */
export interface msdyn_GetOpportunityResearchResultResponse {
  AccountInsightsResult?: string;
  AgentProfileId?: string;
  ChainOfThoughtsResult?: string;
  CompetitorInsightsResult?: string;
  CustomInsightsResult?: string;
  DeeperInsightsConfigurationVersion?: number;
  ErrorMessage?: string;
  FormattedCloseDate?: string;
  FormattedMonetaryValue?: string;
  HistoricalPatternsResult?: string;
  IsAccountInsightsEnabled?: boolean;
  IsCompetitorInsightsEnabled?: boolean;
  IsDataverseSearchEnabled?: boolean;
  IsDealHealthEnabled?: boolean;
  IsNeedsAndPainPointsEnabled?: boolean;
  IsOpportunityResearchAgentOn?: boolean;
  IsRefreshEnabled?: boolean;
  IsResearchStale?: boolean;
  IsStakeholderInsightsEnabled?: boolean;
  IsSuccess?: boolean;
  MacroAgentOrchestrationId?: string;
  OpportunityResearchCompletionTime?: string;
  OpportunityResearchLastVisitedTime?: string;
  OpportunityResearchStatus?: string;
  ProcessingStateCode?: number;
  ProcessingStateRecordId?: string;
  RefreshFrequency?: string;
  Result?: string;
  StakeholderInsightsResult?: string;
}
