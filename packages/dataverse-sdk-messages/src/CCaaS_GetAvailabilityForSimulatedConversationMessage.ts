import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_GetAvailabilityForSimulatedConversationResponse as CCaaS_GetAvailabilityForSimulatedConversationResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_GetAvailabilityForSimulatedConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetAvailabilityForSimulatedConversationRequestParameters {
  LiveWorkStreamId?: string;
  CustomContextItems?: string;
  ApiVersion: string;
  ChannelEngagementContext?: string;
}

/**
 * CCaaS_GetAvailabilityForSimulatedConversation request message
 *
 * Web API Action: CCaaS_GetAvailabilityForSimulatedConversation
 */
export class CCaaS_GetAvailabilityForSimulatedConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetAvailabilityForSimulatedConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_GetAvailabilityForSimulatedConversationRequestParameters>;

  constructor(parameters: CCaaS_GetAvailabilityForSimulatedConversationRequestParameters) {
    super("CCaaS_GetAvailabilityForSimulatedConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetAvailabilityForSimulatedConversation`;

    const body = requestBody({
      LiveWorkStreamId: this.Parameters.LiveWorkStreamId,
      CustomContextItems: this.Parameters.CustomContextItems,
      ApiVersion: this.Parameters.ApiVersion,
      ChannelEngagementContext: this.Parameters.ChannelEngagementContext,
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
  ): Promise<CCaaS_GetAvailabilityForSimulatedConversationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return CCaaS_GetAvailabilityForSimulatedConversationResponse.fromResponse({});
    return CCaaS_GetAvailabilityForSimulatedConversationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * CCaaS_GetAvailabilityForSimulatedConversation response message
 */
export class CCaaS_GetAvailabilityForSimulatedConversationResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetAvailabilityForSimulatedConversationResponseData) {
    super("CCaaS_GetAvailabilityForSimulatedConversation");
  }

  static fromResponse(data: unknown): CCaaS_GetAvailabilityForSimulatedConversationResponse {
    return new CCaaS_GetAvailabilityForSimulatedConversationResponse(
      responseObject<CCaaS_GetAvailabilityForSimulatedConversationResponseData>(data)
    );
  }
}
