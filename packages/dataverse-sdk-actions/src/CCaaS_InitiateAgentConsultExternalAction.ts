import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_InitiateAgentConsultExternal action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_InitiateAgentConsultExternalResponse = void;

/**
 * Parameters of the CCaaS_InitiateAgentConsultExternal action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentConsultExternalActionParameters {
  ExternalReferenceId?: string;
  ExternalParticipantChannel: string;
  AgentName?: string;
  ConsultType: string;
  QueueId: string;
  ConversationAccess: string;
  ExternalParticipantChannelType: string;
  ApiVersion: string;
  ExternalReferenceType?: string;
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
      ExternalReferenceId: this.parameters.ExternalReferenceId,
      ExternalParticipantChannel: this.parameters.ExternalParticipantChannel,
      AgentName: this.parameters.AgentName,
      ConsultType: this.parameters.ConsultType,
      QueueId: this.parameters.QueueId,
      ConversationAccess: this.parameters.ConversationAccess,
      ExternalParticipantChannelType: this.parameters.ExternalParticipantChannelType,
      ApiVersion: this.parameters.ApiVersion,
      ExternalReferenceType: this.parameters.ExternalReferenceType,
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

  parseResponse(_response: Response): Promise<CCaaS_InitiateAgentConsultExternalResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
