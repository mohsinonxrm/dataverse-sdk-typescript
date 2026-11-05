import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_InitiateAgentGroupTransfer action
 */
export interface CCaaS_InitiateAgentGroupTransferResponse {
  // No content returned
}

/**
 * CCaaS_InitiateAgentGroupTransfer action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_InitiateAgentGroupTransferAction implements Executable<CCaaS_InitiateAgentGroupTransferResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly agentGroupId: string,
    public readonly apiVersion: string,
    public readonly intentId: string,
    public readonly intentGroupId: string,
    public readonly intentFamilyId: string
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentGroupTransferResponse> {
    // No return value (204 No Content)
    return {};
  }
}
