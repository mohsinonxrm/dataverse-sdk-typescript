import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_CreateConnection action
 */
export interface CCaaS_CreateConnectionResponse {
  AllowedChannels: string[];
  CurrentPresenceStatusInfo: string;
  ActiveBrowserSessions: number;
  AgentId: string;
  Timestamp: number;
  DisabledChannels: string[];
  PresenceId: string;
  AgentName: string;
}

/**
 * CCaaS_CreateConnection action
 *
 * Unbound action
 */
export class CCaaS_CreateConnectionAction implements Executable<CCaaS_CreateConnectionResponse> {
  constructor(
    public readonly clientSessionId: string,
    public readonly apiVersion: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateConnection`;

    const body: Record<string, unknown> = {
      ClientSessionId: this.clientSessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateConnectionResponse> {
    const data = await response.json();
    return data as CCaaS_CreateConnectionResponse;
  }
}
