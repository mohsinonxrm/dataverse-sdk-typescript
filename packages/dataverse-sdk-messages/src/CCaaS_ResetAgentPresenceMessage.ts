import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_ResetAgentPresence message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ResetAgentPresenceRequestParameters {
  ApiVersion: string;
}

/**
 * CCaaS_ResetAgentPresence request message
 *
 * Web API Action: CCaaS_ResetAgentPresence
 */
export class CCaaS_ResetAgentPresenceRequest
  extends OrganizationRequest
  implements Executable<CCaaS_ResetAgentPresenceResponse>
{
  declare readonly Parameters: Readonly<CCaaS_ResetAgentPresenceRequestParameters>;

  constructor(parameters: CCaaS_ResetAgentPresenceRequestParameters) {
    super("CCaaS_ResetAgentPresence", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_ResetAgentPresence`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<CCaaS_ResetAgentPresenceResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_ResetAgentPresenceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_ResetAgentPresence action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_ResetAgentPresenceResult {
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
 * CCaaS_ResetAgentPresence response message
 *
 * `result` is the value the CCaaS_ResetAgentPresence action returns (see {@link CCaaS_ResetAgentPresenceResult}).
 */
export class CCaaS_ResetAgentPresenceResponse extends OrganizationResponse {
  constructor(public result: CCaaS_ResetAgentPresenceResult) {
    super("CCaaS_ResetAgentPresence");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_ResetAgentPresenceResponse {
    return new CCaaS_ResetAgentPresenceResponse(data as CCaaS_ResetAgentPresenceResult);
  }
}
