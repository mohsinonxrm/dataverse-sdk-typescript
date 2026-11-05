import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_InitiateAgentConsultExternal request message
 *
 * Web API Action: CCaaS_InitiateAgentConsultExternal
 */
export class CCaaS_InitiateAgentConsultExternalRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentConsultExternalResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public externalReferenceType: string,
    public externalParticipantChannel: string,
    public apiVersion: string,
    public queueId: string,
    public externalReferenceId: string,
    public consultType: string,
    public externalParticipantChannelType: string,
    public agentName: string,
    public conversationAccess: string
  ) {
    super("CCaaS_InitiateAgentConsultExternal");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentConsultExternalResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentConsultExternalResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
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
  }
}

/**
 * CCaaS_InitiateAgentConsultExternal response message
 */
export class CCaaS_InitiateAgentConsultExternalResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentConsultExternal");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateAgentConsultExternalResponse {
    return new CCaaS_InitiateAgentConsultExternalResponse();
  }
}
