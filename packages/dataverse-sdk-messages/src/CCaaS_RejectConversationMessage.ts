import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_RejectConversation request message
 *
 * Web API Action: CCaaS_RejectConversation
 */
export class CCaaS_RejectConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_RejectConversationResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string,
    public sessionId: string,
    public rejectReason: string
  ) {
    super("CCaaS_RejectConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_RejectConversation`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      SessionId: this.sessionId,
      RejectReason: this.rejectReason,
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

  async parseResponse(response: Response): Promise<CCaaS_RejectConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_RejectConversationResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      ApiVersion: this.apiVersion,
      SessionId: this.sessionId,
      RejectReason: this.rejectReason,
    };
  }
}

/**
 * CCaaS_RejectConversation response message
 */
export class CCaaS_RejectConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_RejectConversation");
  }

  static fromResponse(_data: unknown): CCaaS_RejectConversationResponse {
    return new CCaaS_RejectConversationResponse();
  }
}
