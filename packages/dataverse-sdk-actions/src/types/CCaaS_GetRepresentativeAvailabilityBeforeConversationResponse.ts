/**
 * CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse complex type
 */
export interface CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse {
  AverageWaitTimeInSeconds: number;
  PositionInQueue: number;
  StartTimeOfNextOperatingHour: string;
  IsQueueAvailable: boolean;
  EndTimeOfNextOperatingHour: string;
  AverageWaitTime: number;
  QueueId: string;
  NextTransitionTime: string;
  IsAgentAvailable: boolean;
}
