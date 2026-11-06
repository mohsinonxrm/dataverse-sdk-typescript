import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse as CCaaS_GetRepresentativeAvailabilityBeforeConversationResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_GetRepresentativeAvailabilityBeforeConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetRepresentativeAvailabilityBeforeConversationRequestParameters {
  ApiVersion: string;
  LiveWorkStreamId?: string;
  ChannelEngagementContext?: string;
  CustomContextItems?: string;
}

/**
 * CCaaS_GetRepresentativeAvailabilityBeforeConversation request message
 *
 * Web API Action: CCaaS_GetRepresentativeAvailabilityBeforeConversation
 */
export class CCaaS_GetRepresentativeAvailabilityBeforeConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_GetRepresentativeAvailabilityBeforeConversationRequestParameters>;

  constructor(parameters: CCaaS_GetRepresentativeAvailabilityBeforeConversationRequestParameters) {
    super("CCaaS_GetRepresentativeAvailabilityBeforeConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetRepresentativeAvailabilityBeforeConversation`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      LiveWorkStreamId: this.Parameters.LiveWorkStreamId,
      ChannelEngagementContext: this.Parameters.ChannelEngagementContext,
      CustomContextItems: this.Parameters.CustomContextItems,
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

  async parseResponse(
    response: Response
  ): Promise<CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
