import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_ModifyAgentPresence action
 */
export interface CCaaS_ModifyAgentPresenceResponse {
  // No content returned
}

/**
 * CCaaS_ModifyAgentPresence action
 *
 * Unbound action
 */
export class CCaaS_ModifyAgentPresenceAction implements Executable<CCaaS_ModifyAgentPresenceResponse> {
  constructor(
    public readonly presenceId: string,
    public readonly agentId: string,
    public readonly apiVersion: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_ModifyAgentPresence`;

    const body: Record<string, unknown> = {
      PresenceId: this.presenceId,
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

  async parseResponse(response: Response): Promise<CCaaS_ModifyAgentPresenceResponse> {
    // No return value (204 No Content)
    return {};
  }
}
