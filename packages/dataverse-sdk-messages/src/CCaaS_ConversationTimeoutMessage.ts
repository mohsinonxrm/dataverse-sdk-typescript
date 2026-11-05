import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_ConversationTimeout request message
 *
 * Web API Action: CCaaS_ConversationTimeout
 */
export class CCaaS_ConversationTimeoutRequest
  extends OrganizationRequest
  implements Executable<CCaaS_ConversationTimeoutResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string,
    public sessionId: string
  ) {
    super("CCaaS_ConversationTimeout");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_ConversationTimeout`;

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

  async parseResponse(response: Response): Promise<CCaaS_ConversationTimeoutResponse> {
    // No return value (204 No Content)
    return new CCaaS_ConversationTimeoutResponse();
  }
}

/**
 * CCaaS_ConversationTimeout response message
 */
export class CCaaS_ConversationTimeoutResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_ConversationTimeout");
  }

  static fromResponse(_data: unknown): CCaaS_ConversationTimeoutResponse {
    return new CCaaS_ConversationTimeoutResponse();
  }
}
