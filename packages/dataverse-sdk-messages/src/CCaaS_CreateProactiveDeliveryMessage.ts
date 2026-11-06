import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_CreateProactiveDeliveryResponse as CCaaS_CreateProactiveDeliveryResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_CreateProactiveDelivery message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateProactiveDeliveryRequestParameters {
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
 * CCaaS_CreateProactiveDelivery request message
 *
 * Web API Action: CCaaS_CreateProactiveDelivery
 */
export class CCaaS_CreateProactiveDeliveryRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CreateProactiveDeliveryResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CreateProactiveDeliveryRequestParameters>;

  constructor(parameters: CCaaS_CreateProactiveDeliveryRequestParameters) {
    super("CCaaS_CreateProactiveDelivery", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateProactiveDelivery`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      EarliestScheduleDate: this.Parameters.EarliestScheduleDate,
      TrackingId: this.Parameters.TrackingId,
      RequestId: this.Parameters.RequestId,
      Priority: this.Parameters.Priority,
      Contacts: this.Parameters.Contacts,
      Message: this.Parameters.Message,
      ProactiveEngagementConfigId: this.Parameters.ProactiveEngagementConfigId,
      ParentConversationId: this.Parameters.ParentConversationId,
      MessageAttributes: this.Parameters.MessageAttributes,
      ExpirationDate: this.Parameters.ExpirationDate,
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
    if (response.status === 204) return CCaaS_CreateProactiveDeliveryResponse.fromResponse({});
    return CCaaS_CreateProactiveDeliveryResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_CreateProactiveDelivery response message
 */
export class CCaaS_CreateProactiveDeliveryResponse extends OrganizationResponse {
  constructor(public result: CCaaS_CreateProactiveDeliveryResponseData) {
    super("CCaaS_CreateProactiveDelivery");
  }

  static fromResponse(data: unknown): CCaaS_CreateProactiveDeliveryResponse {
    return new CCaaS_CreateProactiveDeliveryResponse(
      responseObject<CCaaS_CreateProactiveDeliveryResponseData>(data)
    );
  }
}
