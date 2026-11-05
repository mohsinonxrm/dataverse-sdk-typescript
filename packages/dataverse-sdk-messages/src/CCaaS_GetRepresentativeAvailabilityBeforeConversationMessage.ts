import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse as CCaaS_GetRepresentativeAvailabilityBeforeConversationResponseData } from "./types/index.js";

/**
 * CCaaS_GetRepresentativeAvailabilityBeforeConversation request message
 *
 * Web API Action: CCaaS_GetRepresentativeAvailabilityBeforeConversation
 */
export class CCaaS_GetRepresentativeAvailabilityBeforeConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse>
{
  constructor(
    public apiVersion: string,
    public liveWorkStreamId: string,
    public channelEngagementContext: string,
    public customContextItems: string
  ) {
    super("CCaaS_GetRepresentativeAvailabilityBeforeConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetRepresentativeAvailabilityBeforeConversation`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      LiveWorkStreamId: this.liveWorkStreamId,
      ChannelEngagementContext: this.channelEngagementContext,
      CustomContextItems: this.customContextItems,
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
  ): Promise<CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse> {
    const data = await response.json();
    return CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse.fromResponse(data);
  }
}

/**
 * CCaaS_GetRepresentativeAvailabilityBeforeConversation response message
 */
export class CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetRepresentativeAvailabilityBeforeConversationResponseData) {
    super("CCaaS_GetRepresentativeAvailabilityBeforeConversation");
  }

  static fromResponse(
    data: unknown
  ): CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse {
    return new CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse(
      responseObject<CCaaS_GetRepresentativeAvailabilityBeforeConversationResponseData>(data)
    );
  }
}
