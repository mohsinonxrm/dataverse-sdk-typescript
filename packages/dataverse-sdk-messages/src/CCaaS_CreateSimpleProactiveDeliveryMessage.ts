import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_CreateSimpleProactiveDeliveryResponse as CCaaS_CreateSimpleProactiveDeliveryResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_CreateSimpleProactiveDelivery message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateSimpleProactiveDeliveryRequestParameters {
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
 * CCaaS_CreateSimpleProactiveDelivery request message
 *
 * Web API Action: CCaaS_CreateSimpleProactiveDelivery
 */
export class CCaaS_CreateSimpleProactiveDeliveryRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CreateSimpleProactiveDeliveryResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CreateSimpleProactiveDeliveryRequestParameters>;

  constructor(parameters: CCaaS_CreateSimpleProactiveDeliveryRequestParameters) {
    super("CCaaS_CreateSimpleProactiveDelivery", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateSimpleProactiveDelivery`;

    const body = requestBody({
      City: this.Parameters.City,
      MobilePhoneNumber: this.Parameters.MobilePhoneNumber,
      EarliestScheduleDate: this.Parameters.EarliestScheduleDate,
      PostalCode: this.Parameters.PostalCode,
      TimeZone: this.Parameters.TimeZone,
      Country: this.Parameters.Country,
      Windows: this.Parameters.Windows,
      InputAttributes: this.Parameters.InputAttributes,
      LastName: this.Parameters.LastName,
      ParentConversationId: this.Parameters.ParentConversationId,
      BusinessPhoneNumber: this.Parameters.BusinessPhoneNumber,
      ApiVersion: this.Parameters.ApiVersion,
      ProactiveEngagementConfigId: this.Parameters.ProactiveEngagementConfigId,
      HomePhoneNumber: this.Parameters.HomePhoneNumber,
      Message: this.Parameters.Message,
      RequestId: this.Parameters.RequestId,
      Priority: this.Parameters.Priority,
      AddressLine: this.Parameters.AddressLine,
      UniqueIdentifier: this.Parameters.UniqueIdentifier,
      ExpirationDate: this.Parameters.ExpirationDate,
      MessageAttributes: this.Parameters.MessageAttributes,
      State: this.Parameters.State,
      Email: this.Parameters.Email,
      FirstName: this.Parameters.FirstName,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return CCaaS_CreateSimpleProactiveDeliveryResponse.fromResponse({});
    return CCaaS_CreateSimpleProactiveDeliveryResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_CreateSimpleProactiveDelivery response message
 */
export class CCaaS_CreateSimpleProactiveDeliveryResponse extends OrganizationResponse {
  constructor(public result: CCaaS_CreateSimpleProactiveDeliveryResponseData) {
    super("CCaaS_CreateSimpleProactiveDelivery");
  }

  static fromResponse(data: unknown): CCaaS_CreateSimpleProactiveDeliveryResponse {
    return new CCaaS_CreateSimpleProactiveDeliveryResponse(
      responseObject<CCaaS_CreateSimpleProactiveDeliveryResponseData>(data)
    );
  }
}
