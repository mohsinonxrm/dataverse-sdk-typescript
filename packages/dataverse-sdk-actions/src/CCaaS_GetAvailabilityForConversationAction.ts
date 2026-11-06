import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_GetAvailabilityForConversation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetAvailabilityForConversationResponse {
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_GetAvailabilityForConversationResponse;
  }
}
