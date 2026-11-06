import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_GetRepresentativeAvailabilityForConversationResponse as CCaaS_GetRepresentativeAvailabilityForConversationResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_GetRepresentativeAvailabilityForConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetRepresentativeAvailabilityForConversationRequestParameters {
  CustomContextItems?: string;
  ConversationId?: string;
  ApiVersion: string;
}

/**
 * CCaaS_GetRepresentativeAvailabilityForConversation request message
 *
 * Web API Action: CCaaS_GetRepresentativeAvailabilityForConversation
 */
export class CCaaS_GetRepresentativeAvailabilityForConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetRepresentativeAvailabilityForConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_GetRepresentativeAvailabilityForConversationRequestParameters>;

  constructor(parameters: CCaaS_GetRepresentativeAvailabilityForConversationRequestParameters) {
    super("CCaaS_GetRepresentativeAvailabilityForConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetRepresentativeAvailabilityForConversation`;

    const body = requestBody({
      CustomContextItems: this.Parameters.CustomContextItems,
      ConversationId: this.Parameters.ConversationId,
      ApiVersion: this.Parameters.ApiVersion,
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
  ): Promise<CCaaS_GetRepresentativeAvailabilityForConversationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return CCaaS_GetRepresentativeAvailabilityForConversationResponse.fromResponse({});
    return CCaaS_GetRepresentativeAvailabilityForConversationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * CCaaS_GetRepresentativeAvailabilityForConversation response message
 */
export class CCaaS_GetRepresentativeAvailabilityForConversationResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetRepresentativeAvailabilityForConversationResponseData) {
    super("CCaaS_GetRepresentativeAvailabilityForConversation");
  }

  static fromResponse(data: unknown): CCaaS_GetRepresentativeAvailabilityForConversationResponse {
    return new CCaaS_GetRepresentativeAvailabilityForConversationResponse(
      responseObject<CCaaS_GetRepresentativeAvailabilityForConversationResponseData>(data)
    );
  }
}
