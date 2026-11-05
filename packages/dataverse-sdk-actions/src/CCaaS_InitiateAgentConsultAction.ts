import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_InitiateAgentConsult action
 */
export interface CCaaS_InitiateAgentConsultResponse {
  // No content returned
}

/**
 * CCaaS_InitiateAgentConsult action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_InitiateAgentConsultAction implements Executable<CCaaS_InitiateAgentConsultResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly consultType: string,
    public readonly conversationAccess: string,
    public readonly queueId: string,
    public readonly agentId: string,
    public readonly apiVersion: string
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentConsultResponse> {
    // No return value (204 No Content)
    return {};
  }
}
