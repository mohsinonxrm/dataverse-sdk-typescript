import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_RejoinConversation request message
 *
 * Web API Action: CCaaS_RejoinConversation
 */
export class CCaaS_RejoinConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_RejoinConversationResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public clientId: string,
    public apiVersion: string,
    public sessionId: string
  ) {
    super("CCaaS_RejoinConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_RejoinConversation`;

    const body: Record<string, unknown> = {
      ClientId: this.clientId,
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

  async parseResponse(response: Response): Promise<CCaaS_RejoinConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_RejoinConversationResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      ClientId: this.clientId,
      ApiVersion: this.apiVersion,
      SessionId: this.sessionId,
    };
  }
}

/**
 * CCaaS_RejoinConversation response message
 */
export class CCaaS_RejoinConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_RejoinConversation");
  }

  static fromResponse(_data: unknown): CCaaS_RejoinConversationResponse {
    return new CCaaS_RejoinConversationResponse();
  }
}
