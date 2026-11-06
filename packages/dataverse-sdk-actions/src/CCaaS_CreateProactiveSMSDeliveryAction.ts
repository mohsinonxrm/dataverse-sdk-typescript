import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_CreateProactiveSMSDelivery action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_CreateProactiveSMSDeliveryResponse {
  "@odata.context"?: string;
  SMSDeliveryId: string;
}

/**
 * Parameters of the CCaaS_CreateProactiveSMSDelivery action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateProactiveSMSDeliveryActionParameters {
  RequestId?: string;
  Windows?: string;
  DestinationPhoneNumber: string;
  ExpirationDate?: string;
  InputAttributes?: string;
  ProactiveEngagementConfigId: string;
  FirstResponseTimeoutMins?: string;
  Message: string;
  ContactId?: string;
  ApiVersion: string;
}

/**
 * CCaaS_CreateProactiveSMSDelivery action
 *
 * Unbound action
 */
export class CCaaS_CreateProactiveSMSDeliveryAction implements Executable<CCaaS_CreateProactiveSMSDeliveryResponse> {
  constructor(public readonly parameters: CCaaS_CreateProactiveSMSDeliveryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateProactiveSMSDelivery`;

    const body = requestBody({
      RequestId: this.parameters.RequestId,
      Windows: this.parameters.Windows,
      DestinationPhoneNumber: this.parameters.DestinationPhoneNumber,
      ExpirationDate: this.parameters.ExpirationDate,
      InputAttributes: this.parameters.InputAttributes,
      ProactiveEngagementConfigId: this.parameters.ProactiveEngagementConfigId,
      FirstResponseTimeoutMins: this.parameters.FirstResponseTimeoutMins,
      Message: this.parameters.Message,
      ContactId: this.parameters.ContactId,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateProactiveSMSDeliveryResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_CreateProactiveSMSDeliveryResponse;
  }
}
