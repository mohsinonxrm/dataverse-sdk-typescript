import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_ResetAgentPresence action
 */
export interface CCaaS_ResetAgentPresenceResponse {
  ActiveBrowserSessions: number;
  DisabledChannels: string[];
  AllowedChannels: string[];
  AgentId: string;
  AgentName: string;
  CurrentPresenceStatusInfo: string;
  PresenceId: string;
  Timestamp: number;
}

/**
 * CCaaS_ResetAgentPresence action
 *
 * Unbound action
 */
export class CCaaS_ResetAgentPresenceAction implements Executable<CCaaS_ResetAgentPresenceResponse> {
  constructor(public readonly apiVersion: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_ResetAgentPresence`;

    const body: Record<string, unknown> = {
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

  async parseResponse(response: Response): Promise<CCaaS_ResetAgentPresenceResponse> {
    const data = await response.json();
    return data as CCaaS_ResetAgentPresenceResponse;
  }
}
