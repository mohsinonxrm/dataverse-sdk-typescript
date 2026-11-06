import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_GetRepresentativeAvailabilityBeforeConversation action
 */
export interface CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse {
  AverageWaitTime: number;
  AverageWaitTimeInSeconds: number;
  EndTimeOfNextOperatingHour: string;
  IsAgentAvailable: boolean;
  IsOverflowing: boolean;
  IsQueueAvailable: boolean;
  NextTransitionTime: string;
  NumberOfExpertsAvailableInQueue: number;
  OverflowAction: string;
  OverflowChannel: string;
  OverflowCondition: string;
  OverflowSourceQueueId: string;
  OverflowStage: string;
  PositionInQueue: number;
  QueueId: string;
  StartTimeOfNextOperatingHour: string;
}

/**
 * Parameters of the CCaaS_GetRepresentativeAvailabilityBeforeConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetRepresentativeAvailabilityBeforeConversationActionParameters {
  CustomContextItems?: string;
  LiveWorkStreamId?: string;
  ChannelEngagementContext?: string;
  ApiVersion: string;
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
      CustomContextItems: this.parameters.CustomContextItems,
      LiveWorkStreamId: this.parameters.LiveWorkStreamId,
      ChannelEngagementContext: this.parameters.ChannelEngagementContext,
      ApiVersion: this.parameters.ApiVersion,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse;
    return (await response.json()) as CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse;
  }
}
