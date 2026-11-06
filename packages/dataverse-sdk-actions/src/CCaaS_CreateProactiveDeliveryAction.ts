import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_CreateProactiveDelivery action
 */
export interface CCaaS_CreateProactiveDeliveryResponse {
  DeliveryId: string;
  DeliveryTaskId: string;
}

/**
 * Parameters of the CCaaS_CreateProactiveDelivery action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateProactiveDeliveryActionParameters {
  ApiVersion: string;
  EarliestScheduleDate?: string;
  TrackingId?: string;
  RequestId?: string;
  Priority?: string;
  Contacts: string;
  Message?: string;
  ProactiveEngagementConfigId: string;
  ParentConversationId?: string;
  MessageAttributes?: string;
  ExpirationDate?: string;
}

/**
 * CCaaS_CreateProactiveDelivery action
 *
 * Unbound action
 */
export class CCaaS_CreateProactiveDeliveryAction implements Executable<CCaaS_CreateProactiveDeliveryResponse> {
  constructor(public readonly parameters: CCaaS_CreateProactiveDeliveryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateProactiveDelivery`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      EarliestScheduleDate: this.parameters.EarliestScheduleDate,
      TrackingId: this.parameters.TrackingId,
      RequestId: this.parameters.RequestId,
      Priority: this.parameters.Priority,
      Contacts: this.parameters.Contacts,
      Message: this.parameters.Message,
      ProactiveEngagementConfigId: this.parameters.ProactiveEngagementConfigId,
      ParentConversationId: this.parameters.ParentConversationId,
      MessageAttributes: this.parameters.MessageAttributes,
      ExpirationDate: this.parameters.ExpirationDate,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateProactiveDeliveryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_CreateProactiveDeliveryResponse;
    return (await response.json()) as CCaaS_CreateProactiveDeliveryResponse;
  }
}
