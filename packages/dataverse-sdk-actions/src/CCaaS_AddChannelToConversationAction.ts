import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_AddChannelToConversation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_AddChannelToConversationResponse {
  "@odata.context"?: string;
  ResponseBody: string;
}

/**
 * Parameters of the CCaaS_AddChannelToConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_AddChannelToConversationActionParameters {
  ApiVersion: string;
  ChannelType: string;
  AgentId?: string;
  DestinationPhoneNumber?: string;
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
      ApiVersion: this.parameters.ApiVersion,
      ChannelType: this.parameters.ChannelType,
      AgentId: this.parameters.AgentId,
      DestinationPhoneNumber: this.parameters.DestinationPhoneNumber,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_AddChannelToConversationResponse;
  }
}
