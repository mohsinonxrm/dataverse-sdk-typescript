import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_InitiateAgentConsult request message
 *
 * Web API Action: CCaaS_InitiateAgentConsult
 */
export class CCaaS_InitiateAgentConsultRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentConsultResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public consultType: string,
    public conversationAccess: string,
    public queueId: string,
    public agentId: string,
    public apiVersion: string
  ) {
    super("CCaaS_InitiateAgentConsult");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentConsult`;

    const body: Record<string, unknown> = {
      ConsultType: this.consultType,
      ConversationAccess: this.conversationAccess,
      QueueId: this.queueId,
      AgentId: this.agentId,
      ApiVersion: this.apiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentConsultResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentConsultResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      ConsultType: this.consultType,
      ConversationAccess: this.conversationAccess,
      QueueId: this.queueId,
      AgentId: this.agentId,
      ApiVersion: this.apiVersion,
    };
  }
}

/**
 * CCaaS_InitiateAgentConsult response message
 */
export class CCaaS_InitiateAgentConsultResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentConsult");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateAgentConsultResponse {
    return new CCaaS_InitiateAgentConsultResponse();
  }
}
