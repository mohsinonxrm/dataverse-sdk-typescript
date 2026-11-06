import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_SendAgentTypingIndicator action
 */
export interface CCaaS_SendAgentTypingIndicatorResponse {
  ResponseBody: string;
}

/**
 * Parameters of the CCaaS_SendAgentTypingIndicator action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_SendAgentTypingIndicatorActionParameters {
  AgentChatId: string;
  ApiVersion: string;
  AgentDisplayName: string;
}

/**
 * CCaaS_SendAgentTypingIndicator action
 *
 * Unbound action
 */
export class CCaaS_SendAgentTypingIndicatorAction implements Executable<CCaaS_SendAgentTypingIndicatorResponse> {
  constructor(public readonly parameters: CCaaS_SendAgentTypingIndicatorActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SendAgentTypingIndicator`;

    const body = requestBody({
      AgentChatId: this.parameters.AgentChatId,
      ApiVersion: this.parameters.ApiVersion,
      AgentDisplayName: this.parameters.AgentDisplayName,
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

  async parseResponse(response: Response): Promise<CCaaS_SendAgentTypingIndicatorResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CCaaS_SendAgentTypingIndicatorResponse;
  }
}
