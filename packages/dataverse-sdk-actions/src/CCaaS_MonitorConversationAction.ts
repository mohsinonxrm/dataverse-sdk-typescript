import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_MonitorConversation action
 */
export interface CCaaS_MonitorConversationResponse {
  // No content returned
}

/**
 * CCaaS_MonitorConversation action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_MonitorConversationAction implements Executable<CCaaS_MonitorConversationResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly apiVersion: string,
    public readonly clientId?: string
  ) {}

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
    return {};
  }
}
