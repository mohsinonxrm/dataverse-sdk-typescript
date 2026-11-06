import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_CloseConversation action
 */
export interface CCaaS_CloseConversationResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_CloseConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CloseConversationActionParameters {
  AgentId: string;
  LiveworkitemId: string;
  ActivityStatusCode: string;
}

/**
 * CCaaS_CloseConversation action
 *
 * Unbound action
 */
export class CCaaS_CloseConversationAction implements Executable<CCaaS_CloseConversationResponse> {
  constructor(public readonly parameters: CCaaS_CloseConversationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CloseConversation`;

    const body = requestBody({
      AgentId: this.parameters.AgentId,
      LiveworkitemId: this.parameters.LiveworkitemId,
      ActivityStatusCode: this.parameters.ActivityStatusCode,
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

  async parseResponse(response: Response): Promise<CCaaS_CloseConversationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CCaaS_CloseConversationResponse;
  }
}
