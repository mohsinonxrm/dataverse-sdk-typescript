import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_SendAgentTypingIndicator action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_SendAgentTypingIndicatorResponse {
  "@odata.context"?: string;
  ResponseBody: string;
}

/**
 * Parameters of the CCaaS_SendAgentTypingIndicator action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_SendAgentTypingIndicatorActionParameters {
  ApiVersion: string;
  AgentDisplayName: string;
  AgentChatId: string;
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
      ApiVersion: this.parameters.ApiVersion,
      AgentDisplayName: this.parameters.AgentDisplayName,
      AgentChatId: this.parameters.AgentChatId,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_SendAgentTypingIndicatorResponse;
  }
}
