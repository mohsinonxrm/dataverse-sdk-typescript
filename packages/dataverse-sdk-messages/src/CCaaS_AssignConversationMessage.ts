import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_AssignConversation request message
 *
 * Web API Action: CCaaS_AssignConversation
 */
export class CCaaS_AssignConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_AssignConversationResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string,
    public agentId: string
  ) {
    super("CCaaS_AssignConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_AssignConversation`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      AgentId: this.agentId,
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

  async parseResponse(response: Response): Promise<CCaaS_AssignConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_AssignConversationResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      ApiVersion: this.apiVersion,
      AgentId: this.agentId,
    };
  }
}

/**
 * CCaaS_AssignConversation response message
 */
export class CCaaS_AssignConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_AssignConversation");
  }

  static fromResponse(_data: unknown): CCaaS_AssignConversationResponse {
    return new CCaaS_AssignConversationResponse();
  }
}
