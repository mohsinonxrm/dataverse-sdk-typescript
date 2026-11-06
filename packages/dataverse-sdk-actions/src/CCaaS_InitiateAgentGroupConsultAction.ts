import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_InitiateAgentGroupConsult action
 */
export interface CCaaS_InitiateAgentGroupConsultResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_InitiateAgentGroupConsult action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentGroupConsultActionParameters {
  IntentId: string;
  AgentGroupId?: string;
  IntentFamilyId: string;
  ApiVersion: string;
  IntentGroupId: string;
  ConversationAccess: string;
  ConsultType: string;
}

/**
 * CCaaS_InitiateAgentGroupConsult action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateAgentGroupConsultAction implements Executable<CCaaS_InitiateAgentGroupConsultResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_InitiateAgentGroupConsultActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentGroupConsult`;

    const body = requestBody({
      IntentId: this.parameters.IntentId,
      AgentGroupId: this.parameters.AgentGroupId,
      IntentFamilyId: this.parameters.IntentFamilyId,
      ApiVersion: this.parameters.ApiVersion,
      IntentGroupId: this.parameters.IntentGroupId,
      ConversationAccess: this.parameters.ConversationAccess,
      ConsultType: this.parameters.ConsultType,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentGroupConsultResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_InitiateAgentGroupConsultResponse;
    return (await response.json()) as CCaaS_InitiateAgentGroupConsultResponse;
  }
}
