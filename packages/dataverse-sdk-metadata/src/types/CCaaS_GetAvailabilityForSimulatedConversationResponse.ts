/**
 * CCaaS_GetAvailabilityForSimulatedConversationResponse
 */
export interface CCaaS_GetAvailabilityForSimulatedConversationResponse {
  AverageWaitTime?: number;
  EndTimeOfNextOperatingHour?: string;
  IsAgentAvailable?: boolean;
  IsQueueAvailable?: boolean;
  NextTransitionTime?: string;
  PositionInQueue?: number;
  QueueId?: string;
  StartTimeOfNextOperatingHour?: string;
}
