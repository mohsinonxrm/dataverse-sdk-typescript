import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_ForceCloseConversation request message
 *
 * Web API Action: CCaaS_ForceCloseConversation
 */
export class CCaaS_ForceCloseConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_ForceCloseConversationResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string
  ) {
    super("CCaaS_ForceCloseConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_ForceCloseConversation`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_ForceCloseConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_ForceCloseConversationResponse();
  }
}

/**
 * CCaaS_ForceCloseConversation response message
 */
export class CCaaS_ForceCloseConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_ForceCloseConversation");
  }

  static fromResponse(_data: unknown): CCaaS_ForceCloseConversationResponse {
    return new CCaaS_ForceCloseConversationResponse();
  }
}
