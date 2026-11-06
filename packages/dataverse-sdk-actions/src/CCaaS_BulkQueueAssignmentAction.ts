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
  ApiVersion: string;
  ConversationIds: string[];
  TargetQueueId: string;
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
      ApiVersion: this.parameters.ApiVersion,
      ConversationIds: this.parameters.ConversationIds,
      TargetQueueId: this.parameters.TargetQueueId,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CCaaS_BulkQueueAssignmentResponse;
  }
}
