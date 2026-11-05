import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_SendAgentTypingIndicator request message
 *
 * Web API Action: CCaaS_SendAgentTypingIndicator
 */
export class CCaaS_SendAgentTypingIndicatorRequest
  extends OrganizationRequest
  implements Executable<CCaaS_SendAgentTypingIndicatorResponse>
{
  constructor(
    public agentChatId: string,
    public apiVersion: string,
    public agentDisplayName: string
  ) {
    super("CCaaS_SendAgentTypingIndicator");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_SendAgentTypingIndicatorResponse> {
    const data = await response.json();
    return CCaaS_SendAgentTypingIndicatorResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AgentChatId: this.agentChatId,
      ApiVersion: this.apiVersion,
      AgentDisplayName: this.agentDisplayName,
    };
  }
}

/**
 * CCaaS_SendAgentTypingIndicator response message
 */
export class CCaaS_SendAgentTypingIndicatorResponse extends OrganizationResponse {
  constructor(public result: CCaaS_SendAgentTypingIndicatorResponse) {
    super("CCaaS_SendAgentTypingIndicator");
  }

  static fromResponse(data: unknown): CCaaS_SendAgentTypingIndicatorResponse {
    return new CCaaS_SendAgentTypingIndicatorResponse((data as any).value);
  }
}
