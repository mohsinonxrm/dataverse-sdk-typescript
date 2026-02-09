import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_NotifyAgent action
 */
export interface CCaaS_NotifyAgentResponse {
  BulkActionId: string;
}

/**
 * CCaaS_NotifyAgent action
 *
 * Unbound action
 */
export class CCaaS_NotifyAgentAction implements Executable<CCaaS_NotifyAgentResponse> {
  constructor(
    public readonly apiVersion: string,
    public readonly title: string,
    public readonly message: string,
    public readonly agentIds: string[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_NotifyAgent`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      Title: this.title,
      Message: this.message,
      AgentIds: this.agentIds,
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

  async parseResponse(response: Response): Promise<CCaaS_NotifyAgentResponse> {
    const data = await response.json();
    return data as CCaaS_NotifyAgentResponse;
  }
}
