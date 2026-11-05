import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_GetAvailabilityForSimulatedConversation request message
 *
 * Web API Action: CCaaS_GetAvailabilityForSimulatedConversation
 */
export class CCaaS_GetAvailabilityForSimulatedConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetAvailabilityForSimulatedConversationResponse>
{
  constructor(
    public liveWorkStreamId: string,
    public customContextItems: string,
    public apiVersion: string,
    public channelEngagementContext: string
  ) {
    super("CCaaS_GetAvailabilityForSimulatedConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetAvailabilityForSimulatedConversation`;

    const body: Record<string, unknown> = {
      LiveWorkStreamId: this.liveWorkStreamId,
      CustomContextItems: this.customContextItems,
      ApiVersion: this.apiVersion,
      ChannelEngagementContext: this.channelEngagementContext,
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

  async parseResponse(
    response: Response
  ): Promise<CCaaS_GetAvailabilityForSimulatedConversationResponse> {
    const data = await response.json();
    return CCaaS_GetAvailabilityForSimulatedConversationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      LiveWorkStreamId: this.liveWorkStreamId,
      CustomContextItems: this.customContextItems,
      ApiVersion: this.apiVersion,
      ChannelEngagementContext: this.channelEngagementContext,
    };
  }
}

/**
 * CCaaS_GetAvailabilityForSimulatedConversation response message
 */
export class CCaaS_GetAvailabilityForSimulatedConversationResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetAvailabilityForSimulatedConversationResponse) {
    super("CCaaS_GetAvailabilityForSimulatedConversation");
  }

  static fromResponse(data: unknown): CCaaS_GetAvailabilityForSimulatedConversationResponse {
    return new CCaaS_GetAvailabilityForSimulatedConversationResponse((data as any).value);
  }
}
