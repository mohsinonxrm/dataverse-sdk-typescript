import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_ModifyAgentPresence message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ModifyAgentPresenceRequestParameters {
  PresenceId: string;
  AgentId: string;
  ApiVersion: string;
}

/**
 * CCaaS_ModifyAgentPresence request message
 *
 * Web API Action: CCaaS_ModifyAgentPresence
 */
export class CCaaS_ModifyAgentPresenceRequest
  extends OrganizationRequest
  implements Executable<CCaaS_ModifyAgentPresenceResponse>
{
  declare readonly Parameters: Readonly<CCaaS_ModifyAgentPresenceRequestParameters>;

  constructor(parameters: CCaaS_ModifyAgentPresenceRequestParameters) {
    super("CCaaS_ModifyAgentPresence", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_ModifyAgentPresence`;

    const body = requestBody({
      PresenceId: this.Parameters.PresenceId,
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

  parseResponse(_response: Response): Promise<CCaaS_ModifyAgentPresenceResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_ModifyAgentPresenceResponse());
  }
}

/**
 * CCaaS_ModifyAgentPresence response message
 */
export class CCaaS_ModifyAgentPresenceResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_ModifyAgentPresence");
  }

  static fromResponse(_data?: unknown): CCaaS_ModifyAgentPresenceResponse {
    return new CCaaS_ModifyAgentPresenceResponse();
  }
}
