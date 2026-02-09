/**
 * CCaaS_GetAvailabilityForSimulatedConversationResponse
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
