import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_InitiateAgentConsult action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_InitiateAgentConsultResponse = void;

/**
 * Parameters of the CCaaS_InitiateAgentConsult action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentConsultActionParameters {
  ConsultType: string;
  ParticipantType?: string;
  ApiVersion: string;
  QueueId: string;
  AgentId: string;
  ConversationAccess: string;
}

/**
 * CCaaS_InitiateAgentConsult action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateAgentConsultAction implements Executable<CCaaS_InitiateAgentConsultResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_InitiateAgentConsultActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentConsult`;

    const body = requestBody({
      ConsultType: this.parameters.ConsultType,
      ParticipantType: this.parameters.ParticipantType,
      ApiVersion: this.parameters.ApiVersion,
      QueueId: this.parameters.QueueId,
      AgentId: this.parameters.AgentId,
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

  parseResponse(_response: Response): Promise<CCaaS_InitiateAgentConsultResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
