/**
 * CCaaS_GetRepresentativeAvailabilityForConversationResponse
 */
export interface CCaaS_GetRepresentativeAvailabilityForConversationResponse {
  AverageWaitTimeInSeconds?: number;
  QueueId?: string;
  IsAgentAvailable?: boolean;
  NextTransitionTime?: string;
  StartTimeOfNextOperatingHour?: string;
  EndTimeOfNextOperatingHour?: string;
  AverageWaitTime?: number;
  PositionInQueue?: number;
  IsQueueAvailable?: boolean;
}
