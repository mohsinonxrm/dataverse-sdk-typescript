import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_RejoinConversation action
 */
export interface CCaaS_RejoinConversationResponse {
  // No content returned
}

/**
 * CCaaS_RejoinConversation action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_RejoinConversationAction implements Executable<CCaaS_RejoinConversationResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly clientId: string,
    public readonly apiVersion: string,
    public readonly sessionId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_RejoinConversation`;

    const body: Record<string, unknown> = {
      ClientId: this.clientId,
      ApiVersion: this.apiVersion,
      SessionId: this.sessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_RejoinConversationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
