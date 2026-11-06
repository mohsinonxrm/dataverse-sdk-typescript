import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
 * Parameters of the CCaaS_CreateConnection action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateConnectionActionParameters {
  ClientSessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_CreateConnection action
 *
 * Unbound action
 */
export class CCaaS_CreateConnectionAction implements Executable<CCaaS_CreateConnectionResponse> {
  constructor(public readonly parameters: CCaaS_CreateConnectionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateConnection`;

    const body = requestBody({
      ClientSessionId: this.parameters.ClientSessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateConnectionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CCaaS_CreateConnectionResponse;
  }
}
