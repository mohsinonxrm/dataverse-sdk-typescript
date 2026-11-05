import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_AssignConversation action
 */
export interface CCaaS_AssignConversationResponse {
  // No content returned
}

/**
 * CCaaS_AssignConversation action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_AssignConversationAction implements Executable<CCaaS_AssignConversationResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly apiVersion: string,
    public readonly agentId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_AssignConversation`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      AgentId: this.agentId,
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

  async parseResponse(response: Response): Promise<CCaaS_AssignConversationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
