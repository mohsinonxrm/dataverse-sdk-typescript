import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_JoinConversation action
 */
export interface CCaaS_JoinConversationResponse {
  // No content returned
}

/**
 * CCaaS_JoinConversation action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_JoinConversationAction implements Executable<CCaaS_JoinConversationResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly clientId: string,
    public readonly conversationAccess: number,
    public readonly sessionId: string,
    public readonly apiVersion: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_JoinConversation`;

    const body: Record<string, unknown> = {
      ClientId: this.clientId,
      ConversationAccess: this.conversationAccess,
      SessionId: this.sessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_JoinConversationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
