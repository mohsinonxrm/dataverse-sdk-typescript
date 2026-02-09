import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_InitiateAgentGroupAssignment action
 */
export interface CCaaS_InitiateAgentGroupAssignmentResponse {
  // No content returned
}

/**
 * CCaaS_InitiateAgentGroupAssignment action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_InitiateAgentGroupAssignmentAction implements Executable<CCaaS_InitiateAgentGroupAssignmentResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly agentGroupId: string,
    public readonly apiVersion: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentGroupAssignment`;

    const body: Record<string, unknown> = {
      AgentGroupId: this.agentGroupId,
      ApiVersion: this.apiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentGroupAssignmentResponse> {
    // No return value (204 No Content)
    return {};
  }
}
