import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_InitiateAgentConsult action
 */
export interface CCaaS_InitiateAgentConsultResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_InitiateAgentConsult action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentConsultActionParameters {
  ConsultType: string;
  ConversationAccess: string;
  QueueId: string;
  AgentId: string;
  ApiVersion: string;
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
      ConversationAccess: this.parameters.ConversationAccess,
      QueueId: this.parameters.QueueId,
      AgentId: this.parameters.AgentId,
      ApiVersion: this.parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentConsultResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CCaaS_InitiateAgentConsultResponse;
  }
}
