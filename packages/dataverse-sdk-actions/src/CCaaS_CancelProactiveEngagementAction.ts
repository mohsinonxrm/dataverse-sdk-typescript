import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_CancelProactiveEngagement action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_CancelProactiveEngagementResponse = void;

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

  parseResponse(_response: Response): Promise<CCaaS_CancelProactiveEngagementResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
