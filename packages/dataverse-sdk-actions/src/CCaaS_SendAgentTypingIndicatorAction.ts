import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_SendAgentTypingIndicator action
 */
export interface CCaaS_SendAgentTypingIndicatorResponse {
  ResponseBody: string;
}

/**
 * CCaaS_SendAgentTypingIndicator action
 *
 * Unbound action
 */
export class CCaaS_SendAgentTypingIndicatorAction implements Executable<CCaaS_SendAgentTypingIndicatorResponse> {
  constructor(
    public readonly agentChatId: string,
    public readonly apiVersion: string,
    public readonly agentDisplayName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SendAgentTypingIndicator`;

    const body: Record<string, unknown> = {
      AgentChatId: this.agentChatId,
      ApiVersion: this.apiVersion,
      AgentDisplayName: this.agentDisplayName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_SendAgentTypingIndicatorResponse> {
    const data = await response.json();
    return data as CCaaS_SendAgentTypingIndicatorResponse;
  }
}
