import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_ResetAgentNextPresenceResponse as CCaaS_ResetAgentNextPresenceResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_ResetAgentNextPresenceResponse.fromResponse({});
    return CCaaS_ResetAgentNextPresenceResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_ResetAgentNextPresence response message
 */
export class CCaaS_ResetAgentNextPresenceResponse extends OrganizationResponse {
  constructor(public result: CCaaS_ResetAgentNextPresenceResponseData) {
    super("CCaaS_ResetAgentNextPresence");
  }

  static fromResponse(data: unknown): CCaaS_ResetAgentNextPresenceResponse {
    return new CCaaS_ResetAgentNextPresenceResponse(
      responseObject<CCaaS_ResetAgentNextPresenceResponseData>(data)
    );
  }
}
