import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_JoinConversation request message
 *
 * Web API Action: CCaaS_JoinConversation
 */
export class CCaaS_JoinConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_JoinConversationResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public clientId: string | undefined,
    public conversationAccess: number | undefined,
    public sessionId: string,
    public apiVersion: string
  ) {
    super("CCaaS_JoinConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_JoinConversation`;

    const body: Record<string, unknown> = {
      ClientId: this.clientId,
      ConversationAccess: this.conversationAccess,
      SessionId: this.sessionId,
      ApiVersion: this.apiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_JoinConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_JoinConversationResponse();
  }
}

/**
 * CCaaS_JoinConversation response message
 */
export class CCaaS_JoinConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_JoinConversation");
  }

  static fromResponse(_data: unknown): CCaaS_JoinConversationResponse {
    return new CCaaS_JoinConversationResponse();
  }
}
