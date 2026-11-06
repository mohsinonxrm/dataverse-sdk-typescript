import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_MaskMessageResponse as CCaaS_MaskMessageResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_MaskMessage message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_MaskMessageRequestParameters {
  WidgetId: string;
  MessageId: string;
  ApiVersion: string;
  ConversationId: string;
}

/**
 * CCaaS_MaskMessage request message
 *
 * Web API Action: CCaaS_MaskMessage
 */
export class CCaaS_MaskMessageRequest
  extends OrganizationRequest
  implements Executable<CCaaS_MaskMessageResponse>
{
  declare readonly Parameters: Readonly<CCaaS_MaskMessageRequestParameters>;

  constructor(parameters: CCaaS_MaskMessageRequestParameters) {
    super("CCaaS_MaskMessage", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_MaskMessage`;

    const body = requestBody({
      WidgetId: this.Parameters.WidgetId,
      MessageId: this.Parameters.MessageId,
      ApiVersion: this.Parameters.ApiVersion,
      ConversationId: this.Parameters.ConversationId,
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

  async parseResponse(response: Response): Promise<CCaaS_MaskMessageResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_MaskMessageResponse.fromResponse({});
    return CCaaS_MaskMessageResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_MaskMessage response message
 */
export class CCaaS_MaskMessageResponse extends OrganizationResponse {
  constructor(public result: CCaaS_MaskMessageResponseData) {
    super("CCaaS_MaskMessage");
  }

  static fromResponse(data: unknown): CCaaS_MaskMessageResponse {
    return new CCaaS_MaskMessageResponse(responseObject<CCaaS_MaskMessageResponseData>(data));
  }
}
