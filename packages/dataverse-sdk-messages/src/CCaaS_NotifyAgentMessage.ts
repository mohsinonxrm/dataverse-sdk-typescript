import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_NotifyAgent request message
 *
 * Web API Action: CCaaS_NotifyAgent
 */
export class CCaaS_NotifyAgentRequest
  extends OrganizationRequest
  implements Executable<CCaaS_NotifyAgentResponse>
{
  constructor(
    public apiVersion: string,
    public title: string,
    public message: string,
    public agentIds: string[]
  ) {
    super("CCaaS_NotifyAgent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_NotifyAgent`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      Title: this.title,
      Message: this.message,
      AgentIds: this.agentIds,
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

  async parseResponse(response: Response): Promise<CCaaS_NotifyAgentResponse> {
    const data = await response.json();
    return CCaaS_NotifyAgentResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ApiVersion: this.apiVersion,
      Title: this.title,
      Message: this.message,
      AgentIds: this.agentIds,
    };
  }
}

/**
 * CCaaS_NotifyAgent response message
 */
export class CCaaS_NotifyAgentResponse extends OrganizationResponse {
  constructor(public result: CCaaS_NotifyAgentResponse) {
    super("CCaaS_NotifyAgent");
  }

  static fromResponse(data: unknown): CCaaS_NotifyAgentResponse {
    return new CCaaS_NotifyAgentResponse((data as any).value);
  }
}
