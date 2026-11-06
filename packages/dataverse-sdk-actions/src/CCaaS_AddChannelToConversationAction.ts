import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_AddChannelToConversation action
 */
export interface CCaaS_AddChannelToConversationResponse {
  ResponseBody: string;
}

/**
 * Parameters of the CCaaS_AddChannelToConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_AddChannelToConversationActionParameters {
  AgentId?: string;
  ChannelType: string;
  DestinationPhoneNumber?: string;
  ApiVersion: string;
}

/**
 * CCaaS_AddChannelToConversation action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_AddChannelToConversationAction implements Executable<CCaaS_AddChannelToConversationResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_AddChannelToConversationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_AddChannelToConversation`;

    const body = requestBody({
      AgentId: this.parameters.AgentId,
      ChannelType: this.parameters.ChannelType,
      DestinationPhoneNumber: this.parameters.DestinationPhoneNumber,
      ApiVersion: this.parameters.ApiVersion,
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
    if (response.status === 204) return {} as CCaaS_AddChannelToConversationResponse;
    return (await response.json()) as CCaaS_AddChannelToConversationResponse;
  }
}
