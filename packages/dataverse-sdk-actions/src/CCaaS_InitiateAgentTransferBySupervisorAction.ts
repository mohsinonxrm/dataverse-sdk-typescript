import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_InitiateAgentTransferBySupervisor action
 */
export interface CCaaS_InitiateAgentTransferBySupervisorResponse {
  // No content returned
}

/**
 * CCaaS_InitiateAgentTransferBySupervisor action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_InitiateAgentTransferBySupervisorAction implements Executable<CCaaS_InitiateAgentTransferBySupervisorResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly agentId: string,
    public readonly apiVersion: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentTransferBySupervisor`;

    const body: Record<string, unknown> = {
      AgentId: this.agentId,
      ApiVersion: this.apiVersion,
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

  async parseResponse(
    response: Response
  ): Promise<CCaaS_InitiateAgentTransferBySupervisorResponse> {
    // No return value (204 No Content)
    return {};
  }
}
