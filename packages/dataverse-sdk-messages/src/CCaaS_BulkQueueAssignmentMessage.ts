import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CCaaS_BulkQueueAssignmentResponse as CCaaS_BulkQueueAssignmentResponseData } from "./types/index.js";

/**
 * CCaaS_BulkQueueAssignment request message
 *
 * Web API Action: CCaaS_BulkQueueAssignment
 */
export class CCaaS_BulkQueueAssignmentRequest
  extends OrganizationRequest
  implements Executable<CCaaS_BulkQueueAssignmentResponse>
{
  constructor(
    public apiVersion: string,
    public conversationIds: string[],
    public targetQueueId: string
  ) {
    super("CCaaS_BulkQueueAssignment");
  }

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
    return CCaaS_BulkQueueAssignmentResponse.fromResponse(data);
  }
}

/**
 * CCaaS_BulkQueueAssignment response message
 */
export class CCaaS_BulkQueueAssignmentResponse extends OrganizationResponse {
  constructor(public result: CCaaS_BulkQueueAssignmentResponseData) {
    super("CCaaS_BulkQueueAssignment");
  }

  static fromResponse(data: unknown): CCaaS_BulkQueueAssignmentResponse {
    return new CCaaS_BulkQueueAssignmentResponse(
      responseObject<CCaaS_BulkQueueAssignmentResponseData>(data)
    );
  }
}
