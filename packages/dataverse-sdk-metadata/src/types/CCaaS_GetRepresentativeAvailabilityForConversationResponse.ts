/**
 * CCaaS_GetRepresentativeAvailabilityForConversationResponse
 */
export interface CCaaS_GetRepresentativeAvailabilityForConversationResponse {
  AverageWaitTime?: number;
  AverageWaitTimeInSeconds?: number;
  EndTimeOfNextOperatingHour?: string;
  IsAgentAvailable?: boolean;
  IsOverflowing?: boolean;
  IsQueueAvailable?: boolean;
  NextTransitionTime?: string;
  NumberOfExpertsAvailableInQueue?: number;
  OverflowAction?: string;
  OverflowChannel?: string;
  OverflowCondition?: string;
  OverflowSourceQueueId?: string;
  OverflowStage?: string;
  PositionInQueue?: number;
  QueueId?: string;
  StartTimeOfNextOperatingHour?: string;
}
