import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_InitiateAgentGroupConsult action
 */
export interface CCaaS_InitiateAgentGroupConsultResponse {
  // No content returned
}

/**
 * CCaaS_InitiateAgentGroupConsult action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_InitiateAgentGroupConsultAction implements Executable<CCaaS_InitiateAgentGroupConsultResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly intentId: string,
    public readonly intentGroupId: string,
    public readonly apiVersion: string,
    public readonly conversationAccess: string,
    public readonly agentGroupId: string | undefined,
    public readonly intentFamilyId: string,
    public readonly consultType: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentGroupConsult`;

    const body: Record<string, unknown> = {
      IntentId: this.intentId,
      IntentGroupId: this.intentGroupId,
      ApiVersion: this.apiVersion,
      ConversationAccess: this.conversationAccess,
      AgentGroupId: this.agentGroupId,
      IntentFamilyId: this.intentFamilyId,
      ConsultType: this.consultType,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentGroupConsultResponse> {
    // No return value (204 No Content)
    return {};
  }
}
