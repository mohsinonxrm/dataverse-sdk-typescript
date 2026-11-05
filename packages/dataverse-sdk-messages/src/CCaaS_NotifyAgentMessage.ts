import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CCaaS_NotifyAgentResponse as CCaaS_NotifyAgentResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_NotifyAgentResponse> {
    const data = await response.json();
    return CCaaS_NotifyAgentResponse.fromResponse(data);
  }
}

/**
 * CCaaS_NotifyAgent response message
 */
export class CCaaS_NotifyAgentResponse extends OrganizationResponse {
  constructor(public result: CCaaS_NotifyAgentResponseData) {
    super("CCaaS_NotifyAgent");
  }

  static fromResponse(data: unknown): CCaaS_NotifyAgentResponse {
    return new CCaaS_NotifyAgentResponse(responseObject<CCaaS_NotifyAgentResponseData>(data));
  }
}
