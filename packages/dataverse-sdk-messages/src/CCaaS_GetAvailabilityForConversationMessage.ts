import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_GetAvailabilityForConversationResponse as CCaaS_GetAvailabilityForConversationResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_GetAvailabilityForConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetAvailabilityForConversationRequestParameters {
  CustomContextItems?: string;
  ApiVersion: string;
  ConversationId?: string;
}

/**
 * CCaaS_GetAvailabilityForConversation request message
 *
 * Web API Action: CCaaS_GetAvailabilityForConversation
 */
export class CCaaS_GetAvailabilityForConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetAvailabilityForConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_GetAvailabilityForConversationRequestParameters>;

  constructor(parameters: CCaaS_GetAvailabilityForConversationRequestParameters) {
    super("CCaaS_GetAvailabilityForConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetAvailabilityForConversation`;

    const body = requestBody({
      CustomContextItems: this.Parameters.CustomContextItems,
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

  async parseResponse(response: Response): Promise<CCaaS_GetAvailabilityForConversationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CCaaS_GetAvailabilityForConversationResponse.fromResponse(text ? JSON.parse(text) : {});
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
