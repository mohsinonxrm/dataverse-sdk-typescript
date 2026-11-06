import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_RejoinConversation action
 */
export interface CCaaS_RejoinConversationResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_RejoinConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_RejoinConversationActionParameters {
  ClientId?: string;
  ApiVersion: string;
  SessionId?: string;
}

/**
 * CCaaS_RejoinConversation action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_RejoinConversationAction implements Executable<CCaaS_RejoinConversationResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_RejoinConversationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_RejoinConversation`;

    const body = requestBody({
      ClientId: this.parameters.ClientId,
      ApiVersion: this.parameters.ApiVersion,
      SessionId: this.parameters.SessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_RejoinConversationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_RejoinConversationResponse;
    return (await response.json()) as CCaaS_RejoinConversationResponse;
  }
}
