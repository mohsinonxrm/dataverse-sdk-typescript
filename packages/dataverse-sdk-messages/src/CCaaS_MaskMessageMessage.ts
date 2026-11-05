import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CCaaS_MaskMessageResponse as CCaaS_MaskMessageResponseData } from "./types/index.js";

/**
 * CCaaS_MaskMessage request message
 *
 * Web API Action: CCaaS_MaskMessage
 */
export class CCaaS_MaskMessageRequest
  extends OrganizationRequest
  implements Executable<CCaaS_MaskMessageResponse>
{
  constructor(
    public widgetId: string,
    public messageId: string,
    public apiVersion: string,
    public conversationId: string
  ) {
    super("CCaaS_MaskMessage");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_MaskMessage`;

    const body: Record<string, unknown> = {
      WidgetId: this.widgetId,
      MessageId: this.messageId,
      ApiVersion: this.apiVersion,
      ConversationId: this.conversationId,
    };

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
    const data = await response.json();
    return CCaaS_MaskMessageResponse.fromResponse(data);
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
