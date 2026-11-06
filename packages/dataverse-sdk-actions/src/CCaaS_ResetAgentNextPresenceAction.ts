import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_ResetAgentNextPresence action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_ResetAgentNextPresenceResponse {
  "@odata.context"?: string;
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
 * Parameters of the CCaaS_ResetAgentNextPresence action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ResetAgentNextPresenceActionParameters {
  AgentId: string;
  ApiVersion: string;
}

/**
 * CCaaS_ResetAgentNextPresence action
 *
 * Unbound action
 */
export class CCaaS_ResetAgentNextPresenceAction implements Executable<CCaaS_ResetAgentNextPresenceResponse> {
  constructor(public readonly parameters: CCaaS_ResetAgentNextPresenceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_ResetAgentNextPresence`;

    const body = requestBody({
      AgentId: this.parameters.AgentId,
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

  async parseResponse(response: Response): Promise<CCaaS_ResetAgentNextPresenceResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_ResetAgentNextPresenceResponse;
  }
}
