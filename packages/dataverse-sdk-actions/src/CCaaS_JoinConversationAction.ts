import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_JoinConversation action
 */
export interface CCaaS_JoinConversationResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_JoinConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_JoinConversationActionParameters {
  ApiVersion: string;
  SessionId: string;
  ClientId?: string;
  ConversationAccess?: number;
}

/**
 * CCaaS_JoinConversation action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_JoinConversationAction implements Executable<CCaaS_JoinConversationResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_JoinConversationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_JoinConversation`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      SessionId: this.parameters.SessionId,
      ClientId: this.parameters.ClientId,
      ConversationAccess: this.parameters.ConversationAccess,
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

  async parseResponse(response: Response): Promise<CCaaS_JoinConversationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_JoinConversationResponse;
    return (await response.json()) as CCaaS_JoinConversationResponse;
  }
}
