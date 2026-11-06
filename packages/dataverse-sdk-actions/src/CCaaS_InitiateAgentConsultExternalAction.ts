import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_InitiateAgentConsultExternal action
 */
export interface CCaaS_InitiateAgentConsultExternalResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_InitiateAgentConsultExternal action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentConsultExternalActionParameters {
  ExternalReferenceType?: string;
  ExternalParticipantChannel: string;
  ApiVersion: string;
  QueueId: string;
  ExternalReferenceId?: string;
  ConsultType: string;
  ExternalParticipantChannelType: string;
  AgentName?: string;
  ConversationAccess: string;
}

/**
 * CCaaS_InitiateAgentConsultExternal action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateAgentConsultExternalAction implements Executable<CCaaS_InitiateAgentConsultExternalResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_InitiateAgentConsultExternalActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentConsultExternal`;

    const body = requestBody({
      ExternalReferenceType: this.parameters.ExternalReferenceType,
      ExternalParticipantChannel: this.parameters.ExternalParticipantChannel,
      ApiVersion: this.parameters.ApiVersion,
      QueueId: this.parameters.QueueId,
      ExternalReferenceId: this.parameters.ExternalReferenceId,
      ConsultType: this.parameters.ConsultType,
      ExternalParticipantChannelType: this.parameters.ExternalParticipantChannelType,
      AgentName: this.parameters.AgentName,
      ConversationAccess: this.parameters.ConversationAccess,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CCaaS_InitiateAgentConsultExternalResponse;
  }
}
