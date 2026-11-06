import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_CreateSimpleProactiveDelivery action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_CreateSimpleProactiveDeliveryResponse {
  "@odata.context"?: string;
  DeliveryId: string;
  DeliveryTaskId: string;
}

/**
 * Parameters of the CCaaS_CreateSimpleProactiveDelivery action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateSimpleProactiveDeliveryActionParameters {
  City?: string;
  MobilePhoneNumber?: string;
  EarliestScheduleDate?: string;
  PostalCode?: string;
  TimeZone?: string;
  Country?: string;
  Windows?: string;
  InputAttributes?: string;
  LastName?: string;
  ParentConversationId?: string;
  BusinessPhoneNumber?: string;
  ApiVersion: string;
  ProactiveEngagementConfigId: string;
  HomePhoneNumber?: string;
  Message?: string;
  RequestId?: string;
  Priority?: string;
  AddressLine?: string;
  UniqueIdentifier?: string;
  ExpirationDate?: string;
  MessageAttributes?: string;
  State?: string;
  Email?: string;
  FirstName?: string;
}

/**
 * CCaaS_CreateSimpleProactiveDelivery action
 *
 * Unbound action
 */
export class CCaaS_CreateSimpleProactiveDeliveryAction implements Executable<CCaaS_CreateSimpleProactiveDeliveryResponse> {
  constructor(public readonly parameters: CCaaS_CreateSimpleProactiveDeliveryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateSimpleProactiveDelivery`;

    const body = requestBody({
      City: this.parameters.City,
      MobilePhoneNumber: this.parameters.MobilePhoneNumber,
      EarliestScheduleDate: this.parameters.EarliestScheduleDate,
      PostalCode: this.parameters.PostalCode,
      TimeZone: this.parameters.TimeZone,
      Country: this.parameters.Country,
      Windows: this.parameters.Windows,
      InputAttributes: this.parameters.InputAttributes,
      LastName: this.parameters.LastName,
      ParentConversationId: this.parameters.ParentConversationId,
      BusinessPhoneNumber: this.parameters.BusinessPhoneNumber,
      ApiVersion: this.parameters.ApiVersion,
      ProactiveEngagementConfigId: this.parameters.ProactiveEngagementConfigId,
      HomePhoneNumber: this.parameters.HomePhoneNumber,
      Message: this.parameters.Message,
      RequestId: this.parameters.RequestId,
      Priority: this.parameters.Priority,
      AddressLine: this.parameters.AddressLine,
      UniqueIdentifier: this.parameters.UniqueIdentifier,
      ExpirationDate: this.parameters.ExpirationDate,
      MessageAttributes: this.parameters.MessageAttributes,
      State: this.parameters.State,
      Email: this.parameters.Email,
      FirstName: this.parameters.FirstName,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateSimpleProactiveDeliveryResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_CreateSimpleProactiveDeliveryResponse;
  }
}
