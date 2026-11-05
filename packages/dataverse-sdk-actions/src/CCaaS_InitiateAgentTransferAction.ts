import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_InitiateAgentTransfer action
 */
export interface CCaaS_InitiateAgentTransferResponse {
  // No content returned
}

/**
 * CCaaS_InitiateAgentTransfer action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_InitiateAgentTransferAction implements Executable<CCaaS_InitiateAgentTransferResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly agentId: string,
    public readonly apiVersion: string,
    public readonly queueId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentTransfer`;

    const body: Record<string, unknown> = {
      AgentId: this.agentId,
      ApiVersion: this.apiVersion,
      QueueId: this.queueId,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentTransferResponse> {
    // No return value (204 No Content)
    return {};
  }
}
