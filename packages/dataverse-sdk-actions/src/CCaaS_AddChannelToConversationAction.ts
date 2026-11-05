import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_AddChannelToConversation action
 */
export interface CCaaS_AddChannelToConversationResponse {
  ResponseBody: string;
}

/**
 * CCaaS_AddChannelToConversation action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_AddChannelToConversationAction implements Executable<CCaaS_AddChannelToConversationResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly agentId: string,
    public readonly channelType: string,
    public readonly destinationPhoneNumber: string,
    public readonly apiVersion: string
  ) {}

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
    return data as CCaaS_AddChannelToConversationResponse;
  }
}
