import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_BulkForceClose action
 */
export interface CCaaS_BulkForceCloseResponse {
  BulkActionId: string;
}

/**
 * CCaaS_BulkForceClose action
 *
 * Unbound action
 */
export class CCaaS_BulkForceCloseAction implements Executable<CCaaS_BulkForceCloseResponse> {
  constructor(
    public readonly conversationIds: string[],
    public readonly apiVersion: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_BulkForceClose`;

    const body: Record<string, unknown> = {
      ConversationIds: this.conversationIds,
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

  async parseResponse(response: Response): Promise<CCaaS_BulkForceCloseResponse> {
    const data = await response.json();
    return data as CCaaS_BulkForceCloseResponse;
  }
}
