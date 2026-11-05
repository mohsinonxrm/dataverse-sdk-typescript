import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_CloseConversation request message
 *
 * Web API Action: CCaaS_CloseConversation
 */
export class CCaaS_CloseConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CloseConversationResponse>
{
  constructor(
    public agentId: string,
    public liveworkitemId: string,
    public activityStatusCode: string
  ) {
    super("CCaaS_CloseConversation");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_CloseConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_CloseConversationResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AgentId: this.agentId,
      LiveworkitemId: this.liveworkitemId,
      ActivityStatusCode: this.activityStatusCode,
    };
  }
}

/**
 * CCaaS_CloseConversation response message
 */
export class CCaaS_CloseConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_CloseConversation");
  }

  static fromResponse(_data: unknown): CCaaS_CloseConversationResponse {
    return new CCaaS_CloseConversationResponse();
  }
}
