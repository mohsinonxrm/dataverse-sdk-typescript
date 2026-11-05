import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_PickConversation action
 */
export interface CCaaS_PickConversationResponse {
  // No content returned
}

/**
 * CCaaS_PickConversation action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_PickConversationAction implements Executable<CCaaS_PickConversationResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly apiVersion: string
  ) {}

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
    return {};
  }
}
