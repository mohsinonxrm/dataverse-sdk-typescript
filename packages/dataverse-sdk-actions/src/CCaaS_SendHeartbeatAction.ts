import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_SendHeartbeat action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_SendHeartbeatResponse {
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
 * Parameters of the CCaaS_SendHeartbeat action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_SendHeartbeatActionParameters {
  ApiVersion: string;
  ClientSessionId: string;
}

/**
 * CCaaS_SendHeartbeat action
 *
 * Unbound action
 */
export class CCaaS_SendHeartbeatAction implements Executable<CCaaS_SendHeartbeatResponse> {
  constructor(public readonly parameters: CCaaS_SendHeartbeatActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SendHeartbeat`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      ClientSessionId: this.parameters.ClientSessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_SendHeartbeatResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_SendHeartbeatResponse;
  }
}
