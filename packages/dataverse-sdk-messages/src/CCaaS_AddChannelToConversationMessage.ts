import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_AddChannelToConversationResponse as CCaaS_AddChannelToConversationResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_AddChannelToConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_AddChannelToConversationRequestParameters {
  AgentId?: string;
  ChannelType: string;
  DestinationPhoneNumber?: string;
  ApiVersion: string;
}

/**
 * CCaaS_AddChannelToConversation request message
 *
 * Web API Action: CCaaS_AddChannelToConversation
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_AddChannelToConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_AddChannelToConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_AddChannelToConversationRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_AddChannelToConversationRequestParameters
  ) {
    super("CCaaS_AddChannelToConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_AddChannelToConversation`;

    const body = requestBody({
      AgentId: this.Parameters.AgentId,
      ChannelType: this.Parameters.ChannelType,
      DestinationPhoneNumber: this.Parameters.DestinationPhoneNumber,
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

  async parseResponse(response: Response): Promise<CCaaS_AddChannelToConversationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_AddChannelToConversationResponse.fromResponse({});
    return CCaaS_AddChannelToConversationResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_AddChannelToConversation response message
 */
export class CCaaS_AddChannelToConversationResponse extends OrganizationResponse {
  constructor(public result: CCaaS_AddChannelToConversationResponseData) {
    super("CCaaS_AddChannelToConversation");
  }

  static fromResponse(data: unknown): CCaaS_AddChannelToConversationResponse {
    return new CCaaS_AddChannelToConversationResponse(
      responseObject<CCaaS_AddChannelToConversationResponseData>(data)
    );
  }
}
