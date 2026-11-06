import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_ResetAgentNextPresence message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ResetAgentNextPresenceRequestParameters {
  AgentId: string;
  ApiVersion: string;
}

/**
 * CCaaS_ResetAgentNextPresence request message
 *
 * Web API Action: CCaaS_ResetAgentNextPresence
 */
export class CCaaS_ResetAgentNextPresenceRequest
  extends OrganizationRequest
  implements Executable<CCaaS_ResetAgentNextPresenceResponse>
{
  declare readonly Parameters: Readonly<CCaaS_ResetAgentNextPresenceRequestParameters>;

  constructor(parameters: CCaaS_ResetAgentNextPresenceRequestParameters) {
    super("CCaaS_ResetAgentNextPresence", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_ResetAgentNextPresence`;

    const body = requestBody({
      AgentId: this.Parameters.AgentId,
      ApiVersion: this.Parameters.ApiVersion,
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
    return CCaaS_ResetAgentNextPresenceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_ResetAgentNextPresence action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_ResetAgentNextPresenceResult {
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
 * CCaaS_ResetAgentNextPresence response message
 *
 * `result` is the value the CCaaS_ResetAgentNextPresence action returns (see {@link CCaaS_ResetAgentNextPresenceResult}).
 */
export class CCaaS_ResetAgentNextPresenceResponse extends OrganizationResponse {
  constructor(public result: CCaaS_ResetAgentNextPresenceResult) {
    super("CCaaS_ResetAgentNextPresence");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_ResetAgentNextPresenceResponse {
    return new CCaaS_ResetAgentNextPresenceResponse(data as CCaaS_ResetAgentNextPresenceResult);
  }
}
