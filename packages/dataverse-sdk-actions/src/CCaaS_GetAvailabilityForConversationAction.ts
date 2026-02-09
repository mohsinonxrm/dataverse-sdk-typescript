import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_GetAvailabilityForConversation action
 */
export interface CCaaS_GetAvailabilityForConversationResponse {
  IsQueueAvailable: boolean;
  QueueId: string;
  PositionInQueue: number;
  IsAgentAvailable: boolean;
  NextTransitionTime: string;
  StartTimeOfNextOperatingHour: string;
  EndTimeOfNextOperatingHour: string;
  AverageWaitTime: number;
}

/**
 * CCaaS_GetAvailabilityForConversation action
 *
 * Unbound action
 */
export class CCaaS_GetAvailabilityForConversationAction implements Executable<CCaaS_GetAvailabilityForConversationResponse> {
  constructor(
    public readonly customContextItems: string,
    public readonly apiVersion: string,
    public readonly conversationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetAvailabilityForConversation`;

    const body: Record<string, unknown> = {
      CustomContextItems: this.customContextItems,
      ApiVersion: this.apiVersion,
      ConversationId: this.conversationId,
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

  async parseResponse(response: Response): Promise<CCaaS_GetAvailabilityForConversationResponse> {
    const data = await response.json();
    return data as CCaaS_GetAvailabilityForConversationResponse;
  }
}
