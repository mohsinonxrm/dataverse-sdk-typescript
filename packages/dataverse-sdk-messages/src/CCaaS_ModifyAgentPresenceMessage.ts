import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_ModifyAgentPresence request message
 *
 * Web API Action: CCaaS_ModifyAgentPresence
 */
export class CCaaS_ModifyAgentPresenceRequest
  extends OrganizationRequest
  implements Executable<CCaaS_ModifyAgentPresenceResponse>
{
  constructor(
    public presenceId: string,
    public agentId: string,
    public apiVersion: string
  ) {
    super("CCaaS_ModifyAgentPresence");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_ModifyAgentPresence`;

    const body: Record<string, unknown> = {
      PresenceId: this.presenceId,
      AgentId: this.agentId,
      ApiVersion: this.apiVersion,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_ModifyAgentPresenceResponse> {
    // No return value (204 No Content)
    return new CCaaS_ModifyAgentPresenceResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      PresenceId: this.presenceId,
      AgentId: this.agentId,
      ApiVersion: this.apiVersion,
    };
  }
}

/**
 * CCaaS_ModifyAgentPresence response message
 */
export class CCaaS_ModifyAgentPresenceResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_ModifyAgentPresence");
  }

  static fromResponse(_data: unknown): CCaaS_ModifyAgentPresenceResponse {
    return new CCaaS_ModifyAgentPresenceResponse();
  }
}
