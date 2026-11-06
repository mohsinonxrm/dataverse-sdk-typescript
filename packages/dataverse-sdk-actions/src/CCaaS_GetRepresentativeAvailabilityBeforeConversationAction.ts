import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
 * Parameters of the CCaaS_GetRepresentativeAvailabilityBeforeConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetRepresentativeAvailabilityBeforeConversationActionParameters {
  ApiVersion: string;
  LiveWorkStreamId?: string;
  ChannelEngagementContext?: string;
  CustomContextItems?: string;
}

/**
 * CCaaS_GetRepresentativeAvailabilityBeforeConversation action
 *
 * Unbound action
 */
export class CCaaS_GetRepresentativeAvailabilityBeforeConversationAction implements Executable<CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse> {
  constructor(
    public readonly parameters: CCaaS_GetRepresentativeAvailabilityBeforeConversationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetRepresentativeAvailabilityBeforeConversation`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      LiveWorkStreamId: this.parameters.LiveWorkStreamId,
      ChannelEngagementContext: this.parameters.ChannelEngagementContext,
      CustomContextItems: this.parameters.CustomContextItems,
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
  ): Promise<CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse;
  }
}
