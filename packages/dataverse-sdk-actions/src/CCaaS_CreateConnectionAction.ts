import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_CreateConnection action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_CreateConnectionResponse {
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_CreateConnectionResponse;
  }
}
