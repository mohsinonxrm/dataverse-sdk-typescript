/**
 * CCaaS_GetAvailabilityForConversationResponse complex type
 */
export interface CCaaS_GetAvailabilityForConversationResponse {
  AverageWaitTime?: number;
  EndTimeOfNextOperatingHour?: string;
  IsAgentAvailable?: boolean;
  IsQueueAvailable?: boolean;
  NextTransitionTime?: string;
  PositionInQueue?: number;
  QueueId?: string;
  StartTimeOfNextOperatingHour?: string;
}
