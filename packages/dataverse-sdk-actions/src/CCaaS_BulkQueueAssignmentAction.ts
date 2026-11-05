import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_BulkQueueAssignment action
 */
export interface CCaaS_BulkQueueAssignmentResponse {
  BulkActionId: string;
}

/**
 * CCaaS_BulkQueueAssignment action
 *
 * Unbound action
 */
export class CCaaS_BulkQueueAssignmentAction implements Executable<CCaaS_BulkQueueAssignmentResponse> {
  constructor(
    public readonly apiVersion: string,
    public readonly conversationIds: string[],
    public readonly targetQueueId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_BulkQueueAssignment`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      ConversationIds: this.conversationIds,
      TargetQueueId: this.targetQueueId,
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

  async parseResponse(response: Response): Promise<CCaaS_BulkQueueAssignmentResponse> {
    const data = await response.json();
    return data as CCaaS_BulkQueueAssignmentResponse;
  }
}
