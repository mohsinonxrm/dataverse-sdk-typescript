import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_InitiateAgentConsultExternal action
 */
export interface CCaaS_InitiateAgentConsultExternalResponse {
  // No content returned
}

/**
 * CCaaS_InitiateAgentConsultExternal action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_InitiateAgentConsultExternalAction implements Executable<CCaaS_InitiateAgentConsultExternalResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly externalReferenceType: string,
    public readonly externalParticipantChannel: string,
    public readonly apiVersion: string,
    public readonly queueId: string,
    public readonly externalReferenceId: string,
    public readonly consultType: string,
    public readonly externalParticipantChannelType: string,
    public readonly agentName: string,
    public readonly conversationAccess: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentConsultExternal`;

    const body: Record<string, unknown> = {
      ExternalReferenceType: this.externalReferenceType,
      ExternalParticipantChannel: this.externalParticipantChannel,
      ApiVersion: this.apiVersion,
      QueueId: this.queueId,
      ExternalReferenceId: this.externalReferenceId,
      ConsultType: this.consultType,
      ExternalParticipantChannelType: this.externalParticipantChannelType,
      AgentName: this.agentName,
      ConversationAccess: this.conversationAccess,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentConsultExternalResponse> {
    // No return value (204 No Content)
    return {};
  }
}
