import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
 * Parameters of the CCaaS_GetAvailabilityForConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetAvailabilityForConversationActionParameters {
  CustomContextItems?: string;
  ApiVersion: string;
  ConversationId?: string;
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
      CustomContextItems: this.parameters.CustomContextItems,
      ApiVersion: this.parameters.ApiVersion,
      ConversationId: this.parameters.ConversationId,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CCaaS_GetAvailabilityForConversationResponse;
  }
}
