import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CCaaS_AddChannelToConversationResponse as CCaaS_AddChannelToConversationResponseData } from "./types/index.js";

/**
 * CCaaS_AddChannelToConversation request message
 *
 * Web API Action: CCaaS_AddChannelToConversation
 */
export class CCaaS_AddChannelToConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_AddChannelToConversationResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public agentId: string | undefined,
    public channelType: string,
    public destinationPhoneNumber: string | undefined,
    public apiVersion: string
  ) {
    super("CCaaS_AddChannelToConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_AddChannelToConversation`;

    const body: Record<string, unknown> = {
      AgentId: this.agentId,
      ChannelType: this.channelType,
      DestinationPhoneNumber: this.destinationPhoneNumber,
      ApiVersion: this.apiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_AddChannelToConversationResponse> {
    const data = await response.json();
    return CCaaS_AddChannelToConversationResponse.fromResponse(data);
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
