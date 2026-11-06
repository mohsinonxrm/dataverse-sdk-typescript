import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_ResetAgentPresenceResponse as CCaaS_ResetAgentPresenceResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_ResetAgentPresenceResponse.fromResponse({});
    return CCaaS_ResetAgentPresenceResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_ResetAgentPresence response message
 */
export class CCaaS_ResetAgentPresenceResponse extends OrganizationResponse {
  constructor(public result: CCaaS_ResetAgentPresenceResponseData) {
    super("CCaaS_ResetAgentPresence");
  }

  static fromResponse(data: unknown): CCaaS_ResetAgentPresenceResponse {
    return new CCaaS_ResetAgentPresenceResponse(
      responseObject<CCaaS_ResetAgentPresenceResponseData>(data)
    );
  }
}
