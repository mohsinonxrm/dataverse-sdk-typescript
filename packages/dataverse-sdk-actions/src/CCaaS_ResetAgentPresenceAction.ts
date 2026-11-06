import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_ResetAgentPresence action
 */
export interface CCaaS_ResetAgentPresenceResponse {
  ActiveBrowserSessions: number;
  AgentId: string;
  AgentName: string;
  AllowedChannels: string[];
  CurrentPresenceStatusInfo: string;
  DisabledChannels: string[];
  PresenceId: string;
  Timestamp: number;
}

/**
 * Parameters of the CCaaS_ResetAgentPresence action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ResetAgentPresenceActionParameters {
  ApiVersion: string;
}

/**
 * CCaaS_ResetAgentPresence action
 *
 * Unbound action
 */
export class CCaaS_ResetAgentPresenceAction implements Executable<CCaaS_ResetAgentPresenceResponse> {
  constructor(public readonly parameters: CCaaS_ResetAgentPresenceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_ResetAgentPresence`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_ResetAgentPresenceResponse;
    return (await response.json()) as CCaaS_ResetAgentPresenceResponse;
  }
}
