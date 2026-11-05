import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_SendHeartbeat action
 */
export interface CCaaS_SendHeartbeatResponse {
  AgentId: string;
  ActiveBrowserSessions: number;
  DisabledChannels: string[];
  PresenceId: string;
  CurrentPresenceStatusInfo: string;
  Timestamp: number;
  AgentName: string;
  AllowedChannels: string[];
}

/**
 * CCaaS_SendHeartbeat action
 *
 * Unbound action
 */
export class CCaaS_SendHeartbeatAction implements Executable<CCaaS_SendHeartbeatResponse> {
  constructor(
    public readonly apiVersion: string,
    public readonly clientSessionId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SendHeartbeat`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      ClientSessionId: this.clientSessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_SendHeartbeatResponse> {
    const data = await response.json();
    return data as CCaaS_SendHeartbeatResponse;
  }
}
