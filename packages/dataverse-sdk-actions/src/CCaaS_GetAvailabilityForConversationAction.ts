import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_GetAvailabilityForConversation action
 */
export interface CCaaS_GetAvailabilityForConversationResponse {
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
 * Parameters of the CCaaS_GetAvailabilityForConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetAvailabilityForConversationActionParameters {
  ApiVersion: string;
  ConversationId?: string;
  CustomContextItems?: string;
}

/**
 * CCaaS_GetAvailabilityForConversation action
 *
 * Unbound action
 */
export class CCaaS_GetAvailabilityForConversationAction implements Executable<CCaaS_GetAvailabilityForConversationResponse> {
  constructor(public readonly parameters: CCaaS_GetAvailabilityForConversationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetAvailabilityForConversation`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      ConversationId: this.parameters.ConversationId,
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

  async parseResponse(response: Response): Promise<CCaaS_GetAvailabilityForConversationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_GetAvailabilityForConversationResponse;
    return (await response.json()) as CCaaS_GetAvailabilityForConversationResponse;
  }
}
