/**
 * CCaaS_GetAvailabilityForConversationResponse
 */
export interface CCaaS_GetAvailabilityForConversationResponse {
  IsQueueAvailable?: boolean;
  QueueId?: string;
  PositionInQueue?: number;
  IsAgentAvailable?: boolean;
  NextTransitionTime?: string;
  StartTimeOfNextOperatingHour?: string;
  EndTimeOfNextOperatingHour?: string;
  AverageWaitTime?: number;
}
