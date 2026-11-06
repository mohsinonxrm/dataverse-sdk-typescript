import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_GetRepresentativeAvailabilityForConversation action
 */
export interface CCaaS_GetRepresentativeAvailabilityForConversationResponse {
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
 * Parameters of the CCaaS_GetRepresentativeAvailabilityForConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetRepresentativeAvailabilityForConversationActionParameters {
  CustomContextItems?: string;
  ConversationId?: string;
  ApiVersion: string;
}

/**
 * CCaaS_GetRepresentativeAvailabilityForConversation action
 *
 * Unbound action
 */
export class CCaaS_GetRepresentativeAvailabilityForConversationAction implements Executable<CCaaS_GetRepresentativeAvailabilityForConversationResponse> {
  constructor(
    public readonly parameters: CCaaS_GetRepresentativeAvailabilityForConversationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetRepresentativeAvailabilityForConversation`;

    const body = requestBody({
      CustomContextItems: this.parameters.CustomContextItems,
      ConversationId: this.parameters.ConversationId,
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
  ): Promise<CCaaS_GetRepresentativeAvailabilityForConversationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as CCaaS_GetRepresentativeAvailabilityForConversationResponse;
    return (await response.json()) as CCaaS_GetRepresentativeAvailabilityForConversationResponse;
  }
}
