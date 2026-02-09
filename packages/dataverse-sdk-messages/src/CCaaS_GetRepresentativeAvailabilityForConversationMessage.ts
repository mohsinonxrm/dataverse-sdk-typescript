import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_GetRepresentativeAvailabilityForConversation request message
 *
 * Web API Action: CCaaS_GetRepresentativeAvailabilityForConversation
 */
export class CCaaS_GetRepresentativeAvailabilityForConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetRepresentativeAvailabilityForConversationResponse>
{
  constructor(
    public conversationId: string,
    public apiVersion: string,
    public customContextItems: string
  ) {
    super("CCaaS_GetRepresentativeAvailabilityForConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetRepresentativeAvailabilityForConversation`;

    const body: Record<string, unknown> = {
      ConversationId: this.conversationId,
      ApiVersion: this.apiVersion,
      CustomContextItems: this.customContextItems,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<CCaaS_GetRepresentativeAvailabilityForConversationResponse> {
    const data = await response.json();
    return CCaaS_GetRepresentativeAvailabilityForConversationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ConversationId: this.conversationId,
      ApiVersion: this.apiVersion,
      CustomContextItems: this.customContextItems,
    };
  }
}

/**
 * CCaaS_GetRepresentativeAvailabilityForConversation response message
 */
export class CCaaS_GetRepresentativeAvailabilityForConversationResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetRepresentativeAvailabilityForConversationResponse) {
    super("CCaaS_GetRepresentativeAvailabilityForConversation");
  }

  static fromResponse(data: unknown): CCaaS_GetRepresentativeAvailabilityForConversationResponse {
    return new CCaaS_GetRepresentativeAvailabilityForConversationResponse((data as any).value);
  }
}
