import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_AcceptConversation request message
 *
 * Web API Action: CCaaS_AcceptConversation
 */
export class CCaaS_AcceptConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_AcceptConversationResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string,
    public sessionId: string
  ) {
    super("CCaaS_AcceptConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_AcceptConversation`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      SessionId: this.sessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_AcceptConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_AcceptConversationResponse();
  }
}

/**
 * CCaaS_AcceptConversation response message
 */
export class CCaaS_AcceptConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_AcceptConversation");
  }

  static fromResponse(_data: unknown): CCaaS_AcceptConversationResponse {
    return new CCaaS_AcceptConversationResponse();
  }
}
