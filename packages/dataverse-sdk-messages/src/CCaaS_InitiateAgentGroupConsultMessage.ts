import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_InitiateAgentGroupConsult request message
 *
 * Web API Action: CCaaS_InitiateAgentGroupConsult
 */
export class CCaaS_InitiateAgentGroupConsultRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentGroupConsultResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public intentId: string,
    public intentGroupId: string,
    public apiVersion: string,
    public conversationAccess: string,
    public agentGroupId: string,
    public intentFamilyId: string,
    public consultType: string
  ) {
    super("CCaaS_InitiateAgentGroupConsult");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentGroupConsultResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentGroupConsultResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      IntentId: this.intentId,
      IntentGroupId: this.intentGroupId,
      ApiVersion: this.apiVersion,
      ConversationAccess: this.conversationAccess,
      AgentGroupId: this.agentGroupId,
      IntentFamilyId: this.intentFamilyId,
      ConsultType: this.consultType,
    };
  }
}

/**
 * CCaaS_InitiateAgentGroupConsult response message
 */
export class CCaaS_InitiateAgentGroupConsultResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentGroupConsult");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateAgentGroupConsultResponse {
    return new CCaaS_InitiateAgentGroupConsultResponse();
  }
}
