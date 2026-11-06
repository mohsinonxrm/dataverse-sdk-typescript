import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_BulkQueueAssignment action
 */
export interface CCaaS_BulkQueueAssignmentResponse {
  BulkActionId: string;
}

/**
 * Parameters of the CCaaS_BulkQueueAssignment action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_BulkQueueAssignmentActionParameters {
  ConversationIds: string[];
  TargetQueueId: string;
  ApiVersion: string;
}

/**
 * CCaaS_BulkQueueAssignment action
 *
 * Unbound action
 */
export class CCaaS_BulkQueueAssignmentAction implements Executable<CCaaS_BulkQueueAssignmentResponse> {
  constructor(public readonly parameters: CCaaS_BulkQueueAssignmentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_BulkQueueAssignment`;

    const body = requestBody({
      ConversationIds: this.parameters.ConversationIds,
      TargetQueueId: this.parameters.TargetQueueId,
      ApiVersion: this.parameters.ApiVersion,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_BulkQueueAssignmentResponse;
    return (await response.json()) as CCaaS_BulkQueueAssignmentResponse;
  }
}
