/**
 * CCaaS_GetAvailabilityForSimulatedConversationResponse complex type
 */
export interface CCaaS_GetAvailabilityForSimulatedConversationResponse {
  AverageWaitTime?: number;
  StartTimeOfNextOperatingHour?: string;
  QueueId?: string;
  NextTransitionTime?: string;
  IsQueueAvailable?: boolean;
  EndTimeOfNextOperatingHour?: string;
  PositionInQueue?: number;
  IsAgentAvailable?: boolean;
}
