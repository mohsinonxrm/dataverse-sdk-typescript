import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_SendHeartbeat message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_SendHeartbeatRequestParameters {
  ApiVersion: string;
  ClientSessionId: string;
}

/**
 * CCaaS_SendHeartbeat request message
 *
 * Web API Action: CCaaS_SendHeartbeat
 */
export class CCaaS_SendHeartbeatRequest
  extends OrganizationRequest
  implements Executable<CCaaS_SendHeartbeatResponse>
{
  declare readonly Parameters: Readonly<CCaaS_SendHeartbeatRequestParameters>;

  constructor(parameters: CCaaS_SendHeartbeatRequestParameters) {
    super("CCaaS_SendHeartbeat", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SendHeartbeat`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      ClientSessionId: this.Parameters.ClientSessionId,
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
    return CCaaS_SendHeartbeatResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_SendHeartbeat action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_SendHeartbeatResult {
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
 * CCaaS_SendHeartbeat response message
 *
 * `result` is the value the CCaaS_SendHeartbeat action returns (see {@link CCaaS_SendHeartbeatResult}).
 */
export class CCaaS_SendHeartbeatResponse extends OrganizationResponse {
  constructor(public result: CCaaS_SendHeartbeatResult) {
    super("CCaaS_SendHeartbeat");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_SendHeartbeatResponse {
    return new CCaaS_SendHeartbeatResponse(data as CCaaS_SendHeartbeatResult);
  }
}
