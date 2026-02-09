import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_InitiateAgentGroupTransfer request message
 *
 * Web API Action: CCaaS_InitiateAgentGroupTransfer
 */
export class CCaaS_InitiateAgentGroupTransferRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentGroupTransferResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public agentGroupId: string,
    public apiVersion: string,
    public intentId: string,
    public intentGroupId: string,
    public intentFamilyId: string
  ) {
    super("CCaaS_InitiateAgentGroupTransfer");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentGroupTransfer`;

    const body: Record<string, unknown> = {
      AgentGroupId: this.agentGroupId,
      ApiVersion: this.apiVersion,
      IntentId: this.intentId,
      IntentGroupId: this.intentGroupId,
      IntentFamilyId: this.intentFamilyId,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentGroupTransferResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentGroupTransferResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      AgentGroupId: this.agentGroupId,
      ApiVersion: this.apiVersion,
      IntentId: this.intentId,
      IntentGroupId: this.intentGroupId,
      IntentFamilyId: this.intentFamilyId,
    };
  }
}

/**
 * CCaaS_InitiateAgentGroupTransfer response message
 */
export class CCaaS_InitiateAgentGroupTransferResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentGroupTransfer");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateAgentGroupTransferResponse {
    return new CCaaS_InitiateAgentGroupTransferResponse();
  }
}
