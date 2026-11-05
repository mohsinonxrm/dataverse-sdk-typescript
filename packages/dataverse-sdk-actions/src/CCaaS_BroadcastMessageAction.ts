import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_BroadcastMessage action
 */
export interface CCaaS_BroadcastMessageResponse {
  BulkActionId: string;
}

/**
 * CCaaS_BroadcastMessage action
 *
 * Unbound action
 */
export class CCaaS_BroadcastMessageAction implements Executable<CCaaS_BroadcastMessageResponse> {
  constructor(
    public readonly message: string,
    public readonly title: string,
    public readonly apiVersion: string,
    public readonly conversationIds: string[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_BroadcastMessage`;

    const body: Record<string, unknown> = {
      Message: this.message,
      Title: this.title,
      ApiVersion: this.apiVersion,
      ConversationIds: this.conversationIds,
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

  async parseResponse(response: Response): Promise<CCaaS_BroadcastMessageResponse> {
    const data = await response.json();
    return data as CCaaS_BroadcastMessageResponse;
  }
}
