import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_GetAvailabilityForSimulatedConversation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetAvailabilityForSimulatedConversationResponse {
  "@odata.context"?: string;
  AverageWaitTime: number;
  EndTimeOfNextOperatingHour: string;
  IsAgentAvailable: boolean;
  IsQueueAvailable: boolean;
  NextTransitionTime: string;
  PositionInQueue: number;
  QueueId: string;
  StartTimeOfNextOperatingHour: string;
}

/**
 * Parameters of the CCaaS_GetAvailabilityForSimulatedConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetAvailabilityForSimulatedConversationActionParameters {
  CustomContextItems?: string;
  ChannelEngagementContext?: string;
  ApiVersion: string;
  LiveWorkStreamId?: string;
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
      CustomContextItems: this.parameters.CustomContextItems,
      ChannelEngagementContext: this.parameters.ChannelEngagementContext,
      ApiVersion: this.parameters.ApiVersion,
      LiveWorkStreamId: this.parameters.LiveWorkStreamId,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_GetAvailabilityForSimulatedConversationResponse;
  }
}
