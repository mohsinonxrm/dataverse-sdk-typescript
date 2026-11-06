import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_MonitorConversation request message
 *
 * Web API Action: CCaaS_MonitorConversation
 */
export class CCaaS_MonitorConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_MonitorConversationResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string,
    public clientId?: string
  ) {
    super("CCaaS_MonitorConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_MonitorConversation`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      ClientId: this.clientId,
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

  async parseResponse(response: Response): Promise<CCaaS_MonitorConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_MonitorConversationResponse();
  }
}

/**
 * CCaaS_MonitorConversation response message
 */
export class CCaaS_MonitorConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_MonitorConversation");
  }

  static fromResponse(_data: unknown): CCaaS_MonitorConversationResponse {
    return new CCaaS_MonitorConversationResponse();
  }
}
