import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CCaaS_GetAvailabilityForConversationResponse as CCaaS_GetAvailabilityForConversationResponseData } from "./types/index.js";

/**
 * CCaaS_GetAvailabilityForConversation request message
 *
 * Web API Action: CCaaS_GetAvailabilityForConversation
 */
export class CCaaS_GetAvailabilityForConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetAvailabilityForConversationResponse>
{
  constructor(
    public customContextItems: string,
    public apiVersion: string,
    public conversationId: string
  ) {
    super("CCaaS_GetAvailabilityForConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetAvailabilityForConversation`;

    const body: Record<string, unknown> = {
      CustomContextItems: this.customContextItems,
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

  async parseResponse(response: Response): Promise<CCaaS_GetAvailabilityForConversationResponse> {
    const data = await response.json();
    return CCaaS_GetAvailabilityForConversationResponse.fromResponse(data);
  }
}

/**
 * CCaaS_GetAvailabilityForConversation response message
 */
export class CCaaS_GetAvailabilityForConversationResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetAvailabilityForConversationResponseData) {
    super("CCaaS_GetAvailabilityForConversation");
  }

  static fromResponse(data: unknown): CCaaS_GetAvailabilityForConversationResponse {
    return new CCaaS_GetAvailabilityForConversationResponse(
      responseObject<CCaaS_GetAvailabilityForConversationResponseData>(data)
    );
  }
}
