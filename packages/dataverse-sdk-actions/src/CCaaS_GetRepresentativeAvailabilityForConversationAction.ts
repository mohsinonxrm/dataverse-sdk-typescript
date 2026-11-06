import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_GetRepresentativeAvailabilityForConversation action
 */
export interface CCaaS_GetRepresentativeAvailabilityForConversationResponse {
  AverageWaitTimeInSeconds: number;
  QueueId: string;
  IsAgentAvailable: boolean;
  NextTransitionTime: string;
  StartTimeOfNextOperatingHour: string;
  EndTimeOfNextOperatingHour: string;
  AverageWaitTime: number;
  PositionInQueue: number;
  IsQueueAvailable: boolean;
}

/**
 * CCaaS_GetRepresentativeAvailabilityForConversation action
 *
 * Unbound action
 */
export class CCaaS_GetRepresentativeAvailabilityForConversationAction implements Executable<CCaaS_GetRepresentativeAvailabilityForConversationResponse> {
  constructor(
    public readonly conversationId: string | undefined,
    public readonly apiVersion: string,
    public readonly customContextItems?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetRepresentativeAvailabilityForConversation`;

    const body: Record<string, unknown> = {
      ConversationId: this.conversationId,
      ApiVersion: this.apiVersion,
      CustomContextItems: this.customContextItems,
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
  ): Promise<CCaaS_GetRepresentativeAvailabilityForConversationResponse> {
    const data = await response.json();
    return data as CCaaS_GetRepresentativeAvailabilityForConversationResponse;
  }
}
