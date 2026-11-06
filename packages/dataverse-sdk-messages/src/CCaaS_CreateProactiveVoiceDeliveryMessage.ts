import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_CreateProactiveVoiceDeliveryResponse as CCaaS_CreateProactiveVoiceDeliveryResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_CreateProactiveVoiceDelivery message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateProactiveVoiceDeliveryRequestParameters {
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
 * CCaaS_CreateProactiveVoiceDelivery request message
 *
 * Web API Action: CCaaS_CreateProactiveVoiceDelivery
 */
export class CCaaS_CreateProactiveVoiceDeliveryRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CreateProactiveVoiceDeliveryResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CreateProactiveVoiceDeliveryRequestParameters>;

  constructor(parameters: CCaaS_CreateProactiveVoiceDeliveryRequestParameters) {
    super("CCaaS_CreateProactiveVoiceDelivery", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateProactiveVoiceDelivery`;

    const body = requestBody({
      ExpirationDate: this.Parameters.ExpirationDate,
      DestinationPhoneNumber: this.Parameters.DestinationPhoneNumber,
      RequestId: this.Parameters.RequestId,
      ProactiveEngagementConfigId: this.Parameters.ProactiveEngagementConfigId,
      ContactId: this.Parameters.ContactId,
      ApiVersion: this.Parameters.ApiVersion,
      Windows: this.Parameters.Windows,
      InputAttributes: this.Parameters.InputAttributes,
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
    if (response.status === 204) return CCaaS_CreateProactiveVoiceDeliveryResponse.fromResponse({});
    return CCaaS_CreateProactiveVoiceDeliveryResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_CreateProactiveVoiceDelivery response message
 */
export class CCaaS_CreateProactiveVoiceDeliveryResponse extends OrganizationResponse {
  constructor(public result: CCaaS_CreateProactiveVoiceDeliveryResponseData) {
    super("CCaaS_CreateProactiveVoiceDelivery");
  }

  static fromResponse(data: unknown): CCaaS_CreateProactiveVoiceDeliveryResponse {
    return new CCaaS_CreateProactiveVoiceDeliveryResponse(
      responseObject<CCaaS_CreateProactiveVoiceDeliveryResponseData>(data)
    );
  }
}
