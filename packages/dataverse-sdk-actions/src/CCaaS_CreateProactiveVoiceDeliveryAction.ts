import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_CreateProactiveVoiceDelivery action
 */
export interface CCaaS_CreateProactiveVoiceDeliveryResponse {
  DeliveryId: string;
}

/**
 * Parameters of the CCaaS_CreateProactiveVoiceDelivery action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateProactiveVoiceDeliveryActionParameters {
  ExpirationDate?: string;
  DestinationPhoneNumber: string;
  RequestId?: string;
  ProactiveEngagementConfigId: string;
  ContactId?: string;
  ApiVersion: string;
  Windows?: string;
  InputAttributes?: string;
}

/**
 * CCaaS_CreateProactiveVoiceDelivery action
 *
 * Unbound action
 */
export class CCaaS_CreateProactiveVoiceDeliveryAction implements Executable<CCaaS_CreateProactiveVoiceDeliveryResponse> {
  constructor(public readonly parameters: CCaaS_CreateProactiveVoiceDeliveryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateProactiveVoiceDelivery`;

    const body = requestBody({
      ExpirationDate: this.parameters.ExpirationDate,
      DestinationPhoneNumber: this.parameters.DestinationPhoneNumber,
      RequestId: this.parameters.RequestId,
      ProactiveEngagementConfigId: this.parameters.ProactiveEngagementConfigId,
      ContactId: this.parameters.ContactId,
      ApiVersion: this.parameters.ApiVersion,
      Windows: this.parameters.Windows,
      InputAttributes: this.parameters.InputAttributes,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateProactiveVoiceDeliveryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_CreateProactiveVoiceDeliveryResponse;
    return (await response.json()) as CCaaS_CreateProactiveVoiceDeliveryResponse;
  }
}
