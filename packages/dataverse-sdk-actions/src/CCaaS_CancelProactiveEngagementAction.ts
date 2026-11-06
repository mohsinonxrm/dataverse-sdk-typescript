import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_CancelProactiveEngagement action
 */
export interface CCaaS_CancelProactiveEngagementResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_CancelProactiveEngagement action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CancelProactiveEngagementActionParameters {
  ExternalContactId?: string;
  DeliveryTaskId?: string;
  CallbackConversationId?: string;
  ContactId?: string;
  ApiVersion: string;
  ProactiveEngagementConfigId?: string;
}

/**
 * CCaaS_CancelProactiveEngagement action
 *
 * Unbound action
 */
export class CCaaS_CancelProactiveEngagementAction implements Executable<CCaaS_CancelProactiveEngagementResponse> {
  constructor(public readonly parameters: CCaaS_CancelProactiveEngagementActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CancelProactiveEngagement`;

    const body = requestBody({
      ExternalContactId: this.parameters.ExternalContactId,
      DeliveryTaskId: this.parameters.DeliveryTaskId,
      CallbackConversationId: this.parameters.CallbackConversationId,
      ContactId: this.parameters.ContactId,
      ApiVersion: this.parameters.ApiVersion,
      ProactiveEngagementConfigId: this.parameters.ProactiveEngagementConfigId,
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

  async parseResponse(response: Response): Promise<CCaaS_CancelProactiveEngagementResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_CancelProactiveEngagementResponse;
    return (await response.json()) as CCaaS_CancelProactiveEngagementResponse;
  }
}
