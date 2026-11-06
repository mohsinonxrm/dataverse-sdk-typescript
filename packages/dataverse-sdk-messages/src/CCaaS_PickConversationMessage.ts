import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_PickConversation request message
 *
 * Web API Action: CCaaS_PickConversation
 */
export class CCaaS_PickConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_PickConversationResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string
  ) {
    super("CCaaS_PickConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_PickConversation`;

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

  async parseResponse(response: Response): Promise<CCaaS_PickConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_PickConversationResponse();
  }
}

/**
 * CCaaS_PickConversation response message
 */
export class CCaaS_PickConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_PickConversation");
  }

  static fromResponse(_data: unknown): CCaaS_PickConversationResponse {
    return new CCaaS_PickConversationResponse();
  }
}
