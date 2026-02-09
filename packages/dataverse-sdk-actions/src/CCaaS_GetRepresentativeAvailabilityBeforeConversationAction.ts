import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_GetRepresentativeAvailabilityBeforeConversation action
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

/**
 * CCaaS_GetRepresentativeAvailabilityBeforeConversation action
 *
 * Unbound action
 */
export class CCaaS_GetRepresentativeAvailabilityBeforeConversationAction implements Executable<CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse> {
  constructor(
    public readonly apiVersion: string,
    public readonly liveWorkStreamId: string,
    public readonly channelEngagementContext: string,
    public readonly customContextItems: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetRepresentativeAvailabilityBeforeConversation`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      LiveWorkStreamId: this.liveWorkStreamId,
      ChannelEngagementContext: this.channelEngagementContext,
      CustomContextItems: this.customContextItems,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse> {
    const data = await response.json();
    return data as CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse;
  }
}
