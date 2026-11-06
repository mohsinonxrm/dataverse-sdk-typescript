import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CCaaS_BroadcastMessageResponse as CCaaS_BroadcastMessageResponseData } from "./types/index.js";

/**
 * CCaaS_BroadcastMessage request message
 *
 * Web API Action: CCaaS_BroadcastMessage
 */
export class CCaaS_BroadcastMessageRequest
  extends OrganizationRequest
  implements Executable<CCaaS_BroadcastMessageResponse>
{
  constructor(
    public message: string,
    public title: string,
    public apiVersion: string,
    public conversationIds: string[]
  ) {
    super("CCaaS_BroadcastMessage");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_BroadcastMessage`;

    const body: Record<string, unknown> = {
      Message: this.message,
      Title: this.title,
      ApiVersion: this.apiVersion,
      ConversationIds: this.conversationIds,
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

  async parseResponse(response: Response): Promise<CCaaS_BroadcastMessageResponse> {
    const data = await response.json();
    return CCaaS_BroadcastMessageResponse.fromResponse(data);
  }
}

/**
 * CCaaS_BroadcastMessage response message
 */
export class CCaaS_BroadcastMessageResponse extends OrganizationResponse {
  constructor(public result: CCaaS_BroadcastMessageResponseData) {
    super("CCaaS_BroadcastMessage");
  }

  static fromResponse(data: unknown): CCaaS_BroadcastMessageResponse {
    return new CCaaS_BroadcastMessageResponse(
      responseObject<CCaaS_BroadcastMessageResponseData>(data)
    );
  }
}
