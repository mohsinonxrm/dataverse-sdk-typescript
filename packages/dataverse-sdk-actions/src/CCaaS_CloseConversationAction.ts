import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_CloseConversation action
 */
export interface CCaaS_CloseConversationResponse {
  // No content returned
}

/**
 * CCaaS_CloseConversation action
 *
 * Unbound action
 */
export class CCaaS_CloseConversationAction implements Executable<CCaaS_CloseConversationResponse> {
  constructor(
    public readonly agentId: string,
    public readonly liveworkitemId: string,
    public readonly activityStatusCode: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CloseConversation`;

    const body: Record<string, unknown> = {
      AgentId: this.agentId,
      LiveworkitemId: this.liveworkitemId,
      ActivityStatusCode: this.activityStatusCode,
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

  async parseResponse(response: Response): Promise<CCaaS_CloseConversationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
