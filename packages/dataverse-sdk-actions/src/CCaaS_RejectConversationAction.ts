import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_RejectConversation action
 */
export interface CCaaS_RejectConversationResponse {
  // No content returned
}

/**
 * CCaaS_RejectConversation action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_RejectConversationAction implements Executable<CCaaS_RejectConversationResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly apiVersion: string,
    public readonly sessionId: string,
    public readonly rejectReason: string
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_RejectConversationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
