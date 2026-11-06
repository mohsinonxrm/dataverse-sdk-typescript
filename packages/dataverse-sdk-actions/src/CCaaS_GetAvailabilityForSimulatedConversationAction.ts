import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
 * Parameters of the CCaaS_GetAvailabilityForSimulatedConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetAvailabilityForSimulatedConversationActionParameters {
  LiveWorkStreamId?: string;
  CustomContextItems?: string;
  ApiVersion: string;
  ChannelEngagementContext?: string;
}

/**
 * CCaaS_GetAvailabilityForSimulatedConversation action
 *
 * Unbound action
 */
export class CCaaS_GetAvailabilityForSimulatedConversationAction implements Executable<CCaaS_GetAvailabilityForSimulatedConversationResponse> {
  constructor(
    public readonly parameters: CCaaS_GetAvailabilityForSimulatedConversationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetAvailabilityForSimulatedConversation`;

    const body = requestBody({
      LiveWorkStreamId: this.parameters.LiveWorkStreamId,
      CustomContextItems: this.parameters.CustomContextItems,
      ApiVersion: this.parameters.ApiVersion,
      ChannelEngagementContext: this.parameters.ChannelEngagementContext,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_GetAvailabilityForSimulatedConversationResponse;
    return (await response.json()) as CCaaS_GetAvailabilityForSimulatedConversationResponse;
  }
}
