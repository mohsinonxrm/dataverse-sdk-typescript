import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_AgentEndConversation request message
 *
 * Web API Action: CCaaS_AgentEndConversation
 */
export class CCaaS_AgentEndConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_AgentEndConversationResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string,
    public sessionId: string
  ) {
    super("CCaaS_AgentEndConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_AgentEndConversation`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      SessionId: this.sessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_AgentEndConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_AgentEndConversationResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      ApiVersion: this.apiVersion,
      SessionId: this.sessionId,
    };
  }
}

/**
 * CCaaS_AgentEndConversation response message
 */
export class CCaaS_AgentEndConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_AgentEndConversation");
  }

  static fromResponse(_data: unknown): CCaaS_AgentEndConversationResponse {
    return new CCaaS_AgentEndConversationResponse();
  }
}
