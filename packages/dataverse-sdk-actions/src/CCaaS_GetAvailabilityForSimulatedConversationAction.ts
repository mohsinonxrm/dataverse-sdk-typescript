import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_GetAvailabilityForSimulatedConversation action
 */
export interface CCaaS_GetAvailabilityForSimulatedConversationResponse {
  AverageWaitTime: number;
  StartTimeOfNextOperatingHour: string;
  QueueId: string;
  NextTransitionTime: string;
  IsQueueAvailable: boolean;
  EndTimeOfNextOperatingHour: string;
  PositionInQueue: number;
  IsAgentAvailable: boolean;
}

/**
 * CCaaS_GetAvailabilityForSimulatedConversation action
 *
 * Unbound action
 */
export class CCaaS_GetAvailabilityForSimulatedConversationAction implements Executable<CCaaS_GetAvailabilityForSimulatedConversationResponse> {
  constructor(
    public readonly liveWorkStreamId: string,
    public readonly customContextItems: string,
    public readonly apiVersion: string,
    public readonly channelEngagementContext: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetAvailabilityForSimulatedConversation`;

    const body: Record<string, unknown> = {
      LiveWorkStreamId: this.liveWorkStreamId,
      CustomContextItems: this.customContextItems,
      ApiVersion: this.apiVersion,
      ChannelEngagementContext: this.channelEngagementContext,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<CCaaS_GetAvailabilityForSimulatedConversationResponse> {
    const data = await response.json();
    return data as CCaaS_GetAvailabilityForSimulatedConversationResponse;
  }
}
